import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import SubmissionForm from "@/components/SubmissionForm";
import ReviewPanel from "@/components/ReviewPanel";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AssignmentDetailPage({ params }: PageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  const assignment = await prisma.assignment.findUnique({
    where: { id: id },
  });

  if (!assignment) {
    notFound();
  }

  let studentSubmission = null;
  let allSubmissions = [];

  if (session?.user?.role === "STUDENT") {
    studentSubmission = await prisma.submission.findFirst({
      where: {
        assignmentId: assignment.id,
        studentId: session.user.id,
      },
    });
  } else if (session?.user?.role === "INSTRUCTOR") {
    allSubmissions = await prisma.submission.findMany({
      where: { assignmentId: assignment.id },
      include: {
        student: true,
      },
      orderBy: {
        student: {
          name: 'asc',
        },
      },
    });
  }

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "ACCEPTED": return "bg-green-100 text-green-800";
      case "REJECTED": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between pb-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800">{assignment.title}</h1>
          <span className="text-lg font-medium text-gray-600">
            Due: {new Date(assignment.deadline).toLocaleDateString()}
          </span>
        </div>
        <p className="mt-4 text-gray-700">{assignment.description}</p>
      </div>

      <div className="mt-8">
        {session?.user?.role === "STUDENT" ? (
          studentSubmission ? (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Your Submission</h2>
              <div className="mt-4 space-y-3">
                <p><strong>URL:</strong> <a href={studentSubmission.submissionUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{studentSubmission.submissionUrl}</a></p>
                <p><strong>Note:</strong> {studentSubmission.note || "N/A"}</p>
                <p><strong>Status:</strong> <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusChipColor(studentSubmission.status)}`}>{studentSubmission.status}</span></p>
                {studentSubmission.feedback && <p><strong>Feedback:</strong> {studentSubmission.feedback}</p>}
              </div>
            </div>
          ) : (
            <SubmissionForm assignmentId={assignment.id} />
          )
        ) : session?.user?.role === "INSTRUCTOR" ? (
          <ReviewPanel submissions={allSubmissions} />
        ) : (
          <div className="p-6 text-center bg-gray-100 rounded-lg">
            <p className="text-gray-600">Please log in as a student to submit this assignment.</p>
          </div>
        )}
      </div>
    </div>
  );
}