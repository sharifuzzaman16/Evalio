"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmissionForm({ assignmentId }: { assignmentId: string }) {
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, submissionUrl, note }),
    });

    setIsSubmitting(false);

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.message || "Failed to submit assignment.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Submit Your Work</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="submissionUrl" className="block text-sm font-medium text-gray-700">
            Submission URL (e.g., GitHub, Google Drive)
          </label>
          <input
            id="submissionUrl" type="url" required value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note (Optional)
          </label>
          <textarea
            id="note" value={note} onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <button
            type="submit" disabled={isSubmitting}
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}