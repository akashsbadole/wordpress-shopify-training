import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  services?: string[];
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      company, 
      projectType, 
      budget, 
      timeline, 
      services, 
      message 
    }: ContactFormData = body;

    // Validate required fields
    if (!name || !email || !projectType || !budget || !timeline) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Send email notification
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL || 'your-email@example.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget Range:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        ${services?.length ? `
          <p><strong>Services Required:</strong></p>
          <ul>
            ${services.map((service: string) => `<li>${service}</li>`).join('')}
          </ul>
        ` : ''}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'We received your message',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Here's a summary of your request:</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget Range:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        ${services?.length ? `
          <p><strong>Services Required:</strong></p>
          <ul>
            ${services.map((service: string) => `<li>${service}</li>`).join('')}
          </ul>
        ` : ''}
        <p>Best regards,</p>
        <p>Your Team</p>
      `,
    });

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 