"use client";

import React from "react";
import { format } from "date-fns";
import { z } from "zod";
import { BaseForm, FormInput, SubmitButton } from "./ui/BaseForm";
import { api } from "../lib/api";

const enrollmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(1, "Please select a course"),
  schedule: z.enum(["morning", "evening"], {
    required_error: "Please select a schedule",
  }),
  startDate: z.string().min(1, "Please select a start date"),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

export default function CourseEnrollment() {
  const handleSubmit = async (data: EnrollmentFormData) => {
    const response = await api("/api/enroll", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.success) {
      throw new Error(response.error || "Failed to submit enrollment");
    }
  };

  const minDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Enroll in Course
      </h3>
      <BaseForm
        schema={enrollmentSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          name: "",
          email: "",
          course: "",
          schedule: undefined,
          startDate: "",
        }}
      >
        {({ register, errors, isSubmitting }) => (
          <>
            <FormInput
              label="Name"
              {...register("name")}
              error={errors.name?.message}
            />

            <FormInput
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                {...register("course")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.course ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a course</option>
                <option value="wordpress">WordPress Development</option>
                <option value="shopify">Shopify Development</option>
                <option value="webDevelopment">
                  Web Development Fundamentals
                </option>
              </select>
              {errors.course && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.course.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Preference
              </label>
              <select
                {...register("schedule")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.schedule ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a schedule</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="evening">Evening (6 PM - 9 PM)</option>
              </select>
              {errors.schedule && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.schedule.message}
                </p>
              )}
            </div>

            <FormInput
              label="Preferred Start Date"
              type="date"
              min={minDate}
              {...register("startDate")}
              error={errors.startDate?.message}
            />

            <SubmitButton isSubmitting={isSubmitting}>
              Submit Enrollment
            </SubmitButton>
          </>
        )}
      </BaseForm>
    </div>
  );
}
