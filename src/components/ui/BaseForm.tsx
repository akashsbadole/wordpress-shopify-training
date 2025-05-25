import React from "react";
import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Check, AlertTriangle } from "lucide-react";

interface BaseFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: Partial<T>;
  children: (props: {
    register: any;
    errors: any;
    isSubmitting: boolean;
    handleSubmit: any;
  }) => React.ReactNode;
}

export function BaseForm<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
}: BaseFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "success" | "error" | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as T,
  });

  const handleFormSubmit = async (data: T) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success("Form submitted successfully!");
      reset();
      setSubmitStatus("success");
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-20 py-10">
      {submitStatus === "success" && (
        <div className="mb-6 flex items-center p-4 bg-green-50 text-green-700 rounded-lg">
          <Check className="h-5 w-5 mr-2" />
          <span>Your form has been submitted successfully!</span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 flex items-center p-4 bg-red-50 text-red-700 rounded-lg">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>
            There was an error submitting your form. Please try again later.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {children({ register, errors, isSubmitting, handleSubmit })}
      </form>
    </div>
  );
}

export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  }
>(({ label, error, className = "", ...props }, ref) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      ref={ref}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
        error ? "border-red-500" : "border-gray-300"
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
));

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
  }
>(({ label, error, className = "", ...props }, ref) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      ref={ref}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
        error ? "border-red-500" : "border-gray-300"
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
));

export const SubmitButton: React.FC<{
  isSubmitting: boolean;
  children: React.ReactNode;
}> = ({ isSubmitting, children }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
  >
    {isSubmitting ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Submitting...
      </>
    ) : (
      children
    )}
  </button>
);
