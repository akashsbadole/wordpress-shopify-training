import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = params;
    const { status } = await request.json();

    const enrollment = await prisma.courseEnrollment.update({
      where: { id },
      data: { status },
    });

    // Send email notification about status change
    if (enrollment) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: enrollment.email,
        subject: `Course Enrollment Status Update - ${enrollment.course}`,
        text: `
          Dear ${enrollment.name},

          Your enrollment status for the ${enrollment.course} course has been updated to: ${status}

          ${status === 'approved' 
            ? 'Congratulations! You can now start your learning journey with us. We will send you further details shortly.'
            : status === 'rejected'
            ? 'We regret to inform you that your enrollment request could not be approved at this time. Please contact us for more information.'
            : 'Your enrollment is currently under review. We will notify you once a decision has been made.'}

          Best regards,
          The Education Team
        `,
        html: `
          <h2>Course Enrollment Status Update</h2>
          <p>Dear ${enrollment.name},</p>
          <p>Your enrollment status for the <strong>${enrollment.course}</strong> course has been updated to: <strong>${status}</strong></p>
          <p>
            ${status === 'approved'
              ? 'Congratulations! You can now start your learning journey with us. We will send you further details shortly.'
              : status === 'rejected'
              ? 'We regret to inform you that your enrollment request could not be approved at this time. Please contact us for more information.'
              : 'Your enrollment is currently under review. We will notify you once a decision has been made.'}
          </p>
          <br>
          <p>Best regards,<br>The Education Team</p>
        `,
      });
    }

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    );
  }
} 