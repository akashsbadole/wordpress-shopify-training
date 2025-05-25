import EnrollmentForm from "../../../components/EnrollmentForm";

export default function WordPressCoursePage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">WordPress Development Course</h1>
      <p className="mb-8 text-gray-700">
        Master WordPress development from scratch. Learn to build themes,
        plugins, and dynamic websites with hands-on projects.
      </p>
      <EnrollmentForm courseName="WordPress" />
    </div>
  );
}
