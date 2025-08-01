
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "INSTRUCTOR") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { title, description, deadline } = await request.json();

    if (!title || !description || !deadline) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newAssignment = await prisma.assignment.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
        authorId: session.user.id,
      },
    });

    return NextResponse.json(newAssignment, { status: 201 });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the assignment." },
      { status: 500 }
    );
  }
}