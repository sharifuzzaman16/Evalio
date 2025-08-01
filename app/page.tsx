"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="p-10 text-center bg-white rounded-lg shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">Assignment Submission Portal</h1>
        
        {session ? (
          <div>
            <p className="mb-2 text-lg">
              Welcome, <span className="font-semibold">{session.user?.name}</span>!
            </p>
            <p className="mb-4 text-md text-gray-600">
              You are logged in as a: <span className="font-bold capitalize">{session.user?.role}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-lg">Please sign in to continue.</p>
            <Link href="/login">
              <span className="px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700">
                Sign In
              </span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}