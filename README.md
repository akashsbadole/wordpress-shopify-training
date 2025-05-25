# WordPress Tutorial Website - Demo Booking System

This project includes a comprehensive demo booking system that allows students to schedule demo classes for WordPress courses. The system integrates with Google Calendar for meeting scheduling and uses Resend for email notifications.

## Features

- Demo class booking form with:
  - Student details (name, email, phone)
  - Course selection
  - Date and time slot selection
  - Special requirements/learning goals
- Automated Google Meet link generation
- Email notifications for both students and tutors
- Database storage (SQLite)
- CSV export of bookings
- Google Calendar integration

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- A Google Cloud Platform account
- A Resend account for email notifications

## Setup Instructions

1. **Install Dependencies**

   ```bash
   npm install @prisma/client googleapis csv-writer resend date-fns react-hook-form react-hot-toast
   ```

2. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with:

   ```env
   RESEND_API_KEY="your_resend_api_key"
   GOOGLE_CLIENT_EMAIL="your_service_account_email@project.iam.gserviceaccount.com"
   GOOGLE_PRIVATE_KEY="your_private_key"
   TUTOR_EMAIL="tutor@yourdomain.com"
   ```

4. **Google Calendar API Setup**

   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable Google Calendar API
   - Create a service account
   - Download the JSON key file
   - Add the service account email to your Google Calendar's sharing settings

5. **Resend Setup**
   - Sign up at [Resend](https://resend.com)
   - Get your API key
   - Update the `RESEND_API_KEY` in your `.env` file

## Project Structure

```
├── src/
│   ├── components/
│   │   └── DemoBookingForm.tsx    # Demo booking form component
│   └── app/
│       └── api/
│           └── demo-booking/
│               └── route.ts        # API route for handling bookings
├── prisma/
│   └── schema.prisma              # Database schema
└── data/
    └── demo-bookings.csv         # CSV export of bookings
```

## Database Schema

```prisma
model DemoBooking {
  id                String   @id @default(cuid())
  firstName         String
  lastName          String
  email            String
  phone            String
  courseName       String
  courseType       String
  specialRequirements String?
  preferredDate    DateTime
  preferredTime    String
  meetLink         String?
  status           String   @default("pending")
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

## Usage

1. **Import the Demo Booking Form**

   ```tsx
   import DemoBookingForm from "@/components/DemoBookingForm";

   // In your course page component:
   <DemoBookingForm
     courseName="WordPress Development"
     courseType="Professional"
   />;
   ```

2. **Available Time Slots**
   The system offers the following time slots:

   - Morning: 09:00 AM, 10:00 AM, 11:00 AM
   - Afternoon: 02:00 PM, 03:00 PM, 04:00 PM
   - Evening: 07:00 PM, 08:00 PM

3. **Booking Process**
   - Student fills out the booking form
   - System creates a database entry
   - Generates Google Meet link
   - Sends confirmation emails
   - Updates CSV record
   - Creates calendar event

## Email Templates

1. **Student Confirmation Email**

   - Booking confirmation
   - Date and time details
   - Google Meet link
   - Course information

2. **Tutor Notification Email**
   - Student details
   - Course selection
   - Special requirements
   - Google Meet link

## CSV Export

The system automatically maintains a CSV file with all bookings at `data/demo-bookings.csv` with the following columns:

- Date
- Time
- First Name
- Last Name
- Email
- Phone
- Course
- Course Type
- Special Requirements
- Google Meet Link

## Error Handling

The system includes comprehensive error handling for:

- Form validation
- API errors
- Google Calendar integration
- Email sending
- Database operations

## Development

To run the development server:

```bash
npm run dev
```

## Production

For production deployment:

1. Ensure all environment variables are set
2. Run database migrations
3. Build the project:
   ```bash
   npm run build
   npm start
   ```

## Support

For any issues or questions:

1. Check the error logs
2. Verify environment variables
3. Ensure Google Calendar API is properly configured
4. Check Resend dashboard for email delivery status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
