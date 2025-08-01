"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center px-2 py-4">
                <span className="font-semibold text-gray-500 text-l">Assignment Portal</span>
              </Link>
            </div>
            <div className="items-center hidden space-x-1 md:flex">
              <Link href="/assignments" className="px-2 py-4 font-semibold text-gray-500 transition duration-300 border-b-4 border-transparent hover:text-indigo-500 hover:border-indigo-500">
                Assignments
              </Link>
              {session?.user?.role === 'instructor' && (
                <Link href="/assignments/create" className="px-2 py-4 font-semibold text-gray-500 transition duration-300 border-b-4 border-transparent hover:text-indigo-500 hover:border-indigo-500">
                  Create Assignment
                </Link>
              )}
            </div>
          </div>
          <div className="items-center hidden space-x-3 md:flex">
            {status === 'authenticated' ? (
              <>
                <span className="px-3 py-2 text-gray-700">
                  Hi, {session.user?.name} ({session.user?.role})
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-3 py-2 font-medium text-white bg-red-500 rounded-md transition duration-300 hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="px-3 py-2 font-medium text-white bg-indigo-500 rounded-md transition duration-300 hover:bg-indigo-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}