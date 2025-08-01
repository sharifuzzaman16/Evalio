
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { updateSubmissionStatus } from "@/lib/data";
import { NextResponse } from "next/server";

interface PatchParams {
  params: { id: string };
}

export async function PATCH(request: Request, { params }: PatchParams) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "instructor") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { status, feedback } = await request.json();
  const submissionId = params.id;

  if (!status) {
    return NextResponse.json(
      { message: "Status is required" },
      { status: 400 }
    );
  }

  try {
    const updatedSubmission = await updateSubmissionStatus(
      submissionId,
      status,
      feedback
    );
    if (!updatedSubmission) {
      return NextResponse.json(
        { message: "Submission not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedSubmission, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating submission" },
      { status: 500 }
    );
  }
}