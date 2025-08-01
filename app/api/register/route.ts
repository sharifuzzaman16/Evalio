import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();


    console.log("--- New User Registration ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);
    console.log("----------------------------");

    return NextResponse.json(
      { message: "User registered successfully. NOTE: This is a mock registration. Please login with pre-defined credentials." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}