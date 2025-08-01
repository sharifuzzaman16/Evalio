import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "INSTRUCTOR") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const { status, feedback } = await request.json();
    const { id: submissionId } = await context.params;

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: status.toUpperCase() as "PENDING" | "ACCEPTED" | "REJECTED",
        feedback,
      },
    });

    return NextResponse.json(updatedSubmission, { status: 200 });

  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      { message: "Error updating submission" },
      { status: 500 }
    );
  }
}