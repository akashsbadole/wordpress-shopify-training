import { format } from "date-fns";
import { z } from "zod";
import { BaseForm, FormInput, FormTextarea, SubmitButton } from "./ui/BaseForm";

interface DemoBookingFormProps {
  courseName: string;
  courseType: string;
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "07:00 PM",
  "08:00 PM",
];

const demoBookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  specialRequirements: z.string().optional(),
});

type DemoBookingFormData = z.infer<typeof demoBookingSchema>;

export default function DemoBookingForm({
  courseName,
  courseType,
}: DemoBookingFormProps) {
  const handleSubmit = async (data: DemoBookingFormData) => {
    const response = await fetch("/api/demo-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        courseName,
        courseType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to book demo");
    }
  };

  const minDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Book a Free Demo Class
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Course Details</h3>
        <p className="text-gray-600">Course: {courseName}</p>
        <p className="text-gray-600">Type: {courseType}</p>
      </div>

      <BaseForm
        schema={demoBookingSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          specialRequirements: "",
        }}
      >
        {({ register, errors, isSubmitting }) => (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="First Name"
                {...register("firstName")}
                error={errors.firstName?.message}
              />

              <FormInput
                label="Last Name"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <FormInput
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Preferred Date"
                type="date"
                min={minDate}
                {...register("preferredDate")}
                error={errors.preferredDate?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select
                  {...register("preferredTime")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.preferredTime ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.preferredTime.message}
                  </p>
                )}
              </div>
            </div>

            <FormTextarea
              label="Special Requirements or Learning Goals"
              {...register("specialRequirements")}
              rows={4}
              placeholder="Tell us about your learning goals or any specific topics you'd like to focus on..."
              error={errors.specialRequirements?.message}
            />

            <SubmitButton isSubmitting={isSubmitting}>
              Book Demo Class
            </SubmitButton>
          </>
        )}
      </BaseForm>
    </div>
  );
}
