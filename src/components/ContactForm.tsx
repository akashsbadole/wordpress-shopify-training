import React from "react";
import { z } from "zod";
import { BaseForm, FormInput, FormTextarea, SubmitButton } from "./ui/BaseForm";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
  const handleSubmit = async (data: ContactFormData) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit form");
    }
  };

  return (
    <BaseForm
      schema={contactSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        name: "",
        email: "",
        message: "",
      }}
    >
      {({ register, errors, isSubmitting }) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Your Name *"
              {...register("name")}
              placeholder="John Doe"
              error={errors.name?.message}
            />

            <FormInput
              label="Email Address *"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              error={errors.email?.message}
            />
          </div>

          <FormTextarea
            label="Message *"
            {...register("message")}
            rows={5}
            placeholder="Please describe your project requirements, goals, and any specific features you need..."
            error={errors.message?.message}
          />

          <SubmitButton isSubmitting={isSubmitting}>Send Message</SubmitButton>
        </>
      )}
    </BaseForm>
  );
};

export default ContactForm;
