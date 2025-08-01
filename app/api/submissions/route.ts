
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { addSubmission, getSubmissionForStudent } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || session.user?.role !== "student") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { assignmentId, submissionUrl, note } = await request.json();
  const studentId = session.user.id as string;
  const studentName = session.user.name as string;

  if (!assignmentId || !submissionUrl) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const existingSubmission = await getSubmissionForStudent(assignmentId, studentId);
  if (existingSubmission) {
    return NextResponse.json(
        { message: "You have already submitted this assignment." },
        { status: 409 } 
    );
  }

  try {
    const newSubmission = await addSubmission({
      assignmentId,
      studentId,
      studentName,
      submissionUrl,
      note,
    });
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating submission" },
      { status: 500 }
    );
  }
}