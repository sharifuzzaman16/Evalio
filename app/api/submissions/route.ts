
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user?.role !== "STUDENT") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { assignmentId, submissionUrl, note } = await request.json();
    const studentId = session.user.id;

    if (!assignmentId || !submissionUrl) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        assignmentId: assignmentId,
        studentId: studentId,
      },
    });

    if (existingSubmission) {
      return NextResponse.json(
        { message: "You have already submitted this assignment." },
        { status: 409 } 
      );
    }

    const newSubmission = await prisma.submission.create({
      data: {
        submissionUrl,
        note,
        assignmentId,
        studentId,
      },
    });

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the submission." },
      { status: 500 }
    );
  }
}