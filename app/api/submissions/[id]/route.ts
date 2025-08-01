
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "INSTRUCTOR") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const { status, feedback } = await request.json();
    const submissionId = params.id;

    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: status.toUpperCase(),
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