
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { addAssignment } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "instructor") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { title, description, deadline } = await request.json();

  if (!title || !description || !deadline) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const newAssignment = await addAssignment({ title, description, deadline });
    return NextResponse.json(newAssignment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating assignment" },
      { status: 500 }
    );
  }
}