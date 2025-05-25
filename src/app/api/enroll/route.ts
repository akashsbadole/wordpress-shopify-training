import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '../../../lib/prisma';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY || '');
process.env.NODE_ENV === 'development' && (process.env.RESEND_API_KEY = 'test');

interface EnrollmentFormData {
  name: string;
  email: string;
  course: string;
  schedule: string;
  startDate: string;
}

export async function POST(request: Request) {
  try {
    const data: EnrollmentFormData = await request.json();
    const { name, email, course, schedule, startDate } = data;

    // Validate required fields
    if (!name || !email || !course || !schedule || !startDate) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    let enrollment;
    try {
      // Create enrollment in database
      enrollment = await prisma.courseEnrollment.create({
        data: {
          name,
          email,
          course,
          schedule,
          startDate: new Date(startDate),
          status: 'pending'
        }
      });
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to create enrollment record' },
        { status: 500 }
      );
    }

    // Store data to CSV and JSON files
    try {
      const enrollmentsDir = path.join(process.cwd(), 'data', 'enrollments');
      if (!fs.existsSync(enrollmentsDir)) {
        fs.mkdirSync(enrollmentsDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const jsonFilename = path.join(enrollmentsDir, `enrollment-${timestamp}.json`);
      const csvFilename = path.join(enrollmentsDir, `enrollment-${timestamp}.csv`);

      // Convert data to CSV format
      const csvData = `Name,Email,Course,Schedule,StartDate\n${name},${email},${course},${schedule},${startDate}`;

      // Write to JSON file
      fs.writeFileSync(jsonFilename, JSON.stringify(data, null, 2));

      // Write to CSV file
      fs.writeFileSync(csvFilename, csvData);

      console.log(`Enrollment data saved to ${jsonFilename} and ${csvFilename}`);
    } catch (error) {
      console.error('File writing error:', error);
    }

    try {
      // Send confirmation email to student
      await resend.emails.send({
        from: 'noreply@wpmastery.com',
        to: email,
        subject: 'Course Enrollment Confirmation',
        html: [
          `<h2>Thank you for enrolling!</h2>`,
          `<p>Dear ${name},</p>`,
          `<p>We have received your enrollment request for the ${course} course.</p>`,
          `<p>Here are your enrollment details:</p>`,
          `<ul>`,
          `  <li>Course: ${course}</li>`,
          `  <li>Schedule: ${schedule}</li>`,
          `  <li>Start Date: ${new Date(startDate).toLocaleDateString()}</li>`,
          `</ul>`,
          `<p>Your enrollment is currently under review. We will notify you once it has been approved.</p>`,
          `<p>Best regards,<br>WP Mastery Team</p>`
        ].join('\n')
      });

      // Send email using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'example@gmail.com',
          pass: 'password',
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: 'Course Enrollment Confirmation',
        html: [
          `<h2>Thank you for enrolling!</h2>`,
          `<p>Dear ${name},</p>`,
          `<p>We have received your enrollment request for the ${course} course.</p>`,
          `<p>Here are your enrollment details:</p>`,
          `<ul>`,
          `  <li>Course: ${course}</li>`,
          `  <li>Schedule: ${schedule}</li>`,
          `  <li>Start Date: ${new Date(startDate).toLocaleDateString()}</li>`,
          `</ul>`,
          `<p>Your enrollment is currently under review. We will notify you once it has been approved.</p>`,
          `<p>Best regards,<br>WP Mastery Team</p>`
        ].join('\n')
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Nodemailer email sending error:', error);
        } else {
          console.log('Nodemailer email sent:', info.response);
        }
      });

      // Send notification to admin
      await resend.emails.send({
        from: 'noreply@wpmastery.com',
        to: process.env.ADMIN_EMAIL || 'admin@wpmastery.com',
        subject: 'New Course Enrollment Request',
        html: [
          `<h2>New Course Enrollment Request</h2>`,
          `<p>Student Details:</p>`,
          `<ul>`,
          `  <li>Name: ${name}</li>`,
          `  <li>Email: ${email}</li>`,
          `  <li>Course: ${course}</li>`,
          `  <li>Schedule: ${schedule}</li>`,
          `  <li>Start Date: ${new Date(startDate).toLocaleDateString()}</li>`,
          `</ul>`,
          `<p>Please review this enrollment request in the admin dashboard.</p>`
        ].join('\n')
      });
    } catch (error) {
      console.error('Email sending error:', error);
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Enrollment request submitted successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json(
      { error: 'Failed to process enrollment request' },
      { status: 500 }
    );
  }
}