// const prisma = new PrismaClient();
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { google } from 'googleapis';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';
import { prisma } from '../../../lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

// Google Calendar API setup
const calendar = google.calendar({
  version: 'v3',
  auth: new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/calendar']
  )
});

async function createGoogleMeet(booking: any) {
  const event = {
    summary: `Demo Class: ${booking.courseName}`,
    description: `Demo class for ${booking.firstName} ${booking.lastName}\nCourse: ${booking.courseName}\nSpecial Requirements: ${booking.specialRequirements || 'None'}`,
    start: {
      dateTime: `${booking.preferredDate}T${booking.preferredTime}`,
      timeZone: 'UTC',
    },
    end: {
      dateTime: `${booking.preferredDate}T${booking.preferredTime}`,
      timeZone: 'UTC',
    },
    attendees: [
      { email: booking.email },
      { email: process.env.TUTOR_EMAIL },
    ],
    conferenceData: {
      createRequest: {
        requestId: booking.id,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink;
}

async function updateCSV(booking: any) {
  const csvPath = path.join(process.cwd(), 'data', 'demo-bookings.csv');
  const csvWriter = createObjectCsvWriter({
    path: csvPath,
    header: [
      { id: 'date', title: 'Date' },
      { id: 'time', title: 'Time' },
      { id: 'firstName', title: 'First Name' },
      { id: 'lastName', title: 'Last Name' },
      { id: 'email', title: 'Email' },
      { id: 'phone', title: 'Phone' },
      { id: 'courseName', title: 'Course' },
      { id: 'courseType', title: 'Course Type' },
      { id: 'specialRequirements', title: 'Special Requirements' },
      { id: 'meetLink', title: 'Google Meet Link' },
    ],
    append: true,
  });

  await csvWriter.writeRecords([booking]);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      courseName,
      courseType,
      specialRequirements,
      preferredDate,
      preferredTime,
    } = body;

    // Create booking in database
    const booking = await prisma.demoBooking.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        courseName,
        courseType,
        specialRequirements,
        preferredDate: new Date(preferredDate),
        preferredTime,
      },
    });

    // Create Google Meet link
    const meetLink = await createGoogleMeet(booking);

    // Update booking with meet link
    await prisma.demoBooking.update({
      where: { id: booking.id },
      data: { meetLink },
    });

    // Update CSV file
    await updateCSV({ ...booking, meetLink });

    // Send email to student
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: email,
      subject: 'Demo Class Confirmation',
      html: `
        <h2>Your Demo Class is Confirmed!</h2>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Your demo class for ${courseName} has been scheduled for:</p>
        <p>Date: ${preferredDate}</p>
        <p>Time: ${preferredTime}</p>
        <p>Join the class using this Google Meet link: <a href="${meetLink}">${meetLink}</a></p>
        <p>We look forward to seeing you!</p>
      `,
    });

    // Send email to tutor
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: process.env.TUTOR_EMAIL!,
      subject: `New Demo Class Booking - ${courseName}`,
      html: `
        <h2>New Demo Class Booking</h2>
        <p>Student Details:</p>
        <ul>
          <li>Name: ${firstName} ${lastName}</li>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
          <li>Course: ${courseName}</li>
          <li>Special Requirements: ${specialRequirements || 'None'}</li>
        </ul>
        <p>Schedule:</p>
        <p>Date: ${preferredDate}</p>
        <p>Time: ${preferredTime}</p>
        <p>Google Meet link: <a href="${meetLink}">${meetLink}</a></p>
      `,
    });

    return NextResponse.json({ 
      message: 'Demo class booked successfully',
      meetLink 
    });
  } catch (error) {
    console.error('Demo booking error:', error);
    return NextResponse.json(
      { error: 'Failed to book demo class' },
      { status: 500 }
    );
  }
}