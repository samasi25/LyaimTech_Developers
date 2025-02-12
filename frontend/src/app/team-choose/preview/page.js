"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const PreviewPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <Navbar />

      <div className="w-full max-w-md bg-gray-200 text-center shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Preview</h1>

        {/* Placeholder for preview content */}
        <div className="w-full h-56 bg-gray-500 rounded-lg"></div>

        {/* Submit Button */}
        <button className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-b from-blue-500 to-gray-800 rounded-lg shadow-md hover:scale-105 transition">
          Submit
        </button>

        {/* Change Section */}
        <p className="mt-6 text-lg font-medium text-gray-800">Want to change?</p>
        <button
          onClick={() => router.back()}
          className="w-full mt-2 py-3 text-lg font-semibold text-white bg-gradient-to-b from-gray-600 to-gray-900 rounded-lg shadow-md hover:scale-105 transition"
        >
          Go back to previous page
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;
