"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ErrorPage({ error, reset }) {
    const router = useRouter();

    useEffect(() => {
        console.error("Error caught:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-6">
            {/* Error Icon */}
            <div className="text-red-500 text-7xl mb-4">⚠️</div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold">Oops! Something Went Wrong</h1>
            <p className="text-lg text-gray-400 mt-3">
                The page you are looking for might have been moved, deleted, or the URL is incorrect.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
                <button
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
                    onClick={() => router.push("/")}
                >
                    Go Home
                </button>
                <button
                    className="bg-gray-700 hover:bg-gray-800 px-6 py-2 rounded-lg"
                    onClick={reset}
                >
                    Retry
                </button>
            </div>
        </div>
    );
}
