"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Submission } from "@/lib/data";

interface ReviewPanelProps {
  submissions: Submission[];
}

export default function ReviewPanel({ submissions }: ReviewPanelProps) {
  const router = useRouter();

  const handleUpdate = async (
    submissionId: string,
    status: "Pending" | "Accepted" | "Rejected",
    feedback: string
  ) => {
    const res = await fetch(`/api/submissions/${submissionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, feedback }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to update submission.");
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow-md">
        <p className="text-gray-500">No submissions for this assignment yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Review Submissions</h2>
      <div className="mt-6 space-y-6">
        {submissions.map((submission) => (
          <SubmissionEditor key={submission.id} submission={submission} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
}

function SubmissionEditor({ submission, onUpdate }: { submission: Submission, onUpdate: Function }) {
  const [feedback, setFeedback] = useState(submission.feedback || "");
  const [status, setStatus] = useState(submission.status);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate(submission.id, status, feedback);
    setIsSaving(false);
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{submission.studentName}</h3>
        <a href={submission.submissionUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline">View Submission</a>
      </div>
      <p className="mt-2 text-sm text-gray-600"><strong>Note:</strong> {submission.note || "N/A"}</p>
      
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}