import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { SignInButton } from "@clerk/clerk-react";

interface SelectedTier {
  name: string;
  price: string;
  description: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [selectedTier, setSelectedTier] = useState<SelectedTier | null>(null);
  const [showSignup, setShowSignup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    // Get selected tier from session storage
    const tierData = sessionStorage.getItem("selectedTier");
    if (tierData) {
      setSelectedTier(JSON.parse(tierData));
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tier: selectedTier,
          type: searchParams.get("type"),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit");
      }

      toast.success("Request submitted successfully!");
      reset();
      // Show signup option after successful submission
      setShowSignup(true);
      // Clear the selected tier from session storage
      sessionStorage.removeItem("selectedTier");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit request. Please try again."
      );
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {!showSignup ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  {searchParams.get("type") === "demo"
                    ? "Book Your Demo Class"
                    : "Contact Us"}
                </h1>
                {selectedTier && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedTier.name}
                    </h2>
                    <p className="text-gray-600">{selectedTier.description}</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                      {selectedTier.price}
                    </p>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white p-6 rounded-lg shadow"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Your Account
                </h2>
                <p className="mt-2 text-gray-600">
                  Sign up to access your course and make payment
                </p>
              </div>
              <div className="flex justify-center">
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Sign Up / Sign In
                  </button>
                </SignInButton>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already submitted your details?{" "}
                  <button
                    onClick={() => setShowSignup(false)}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Go back to contact form
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
