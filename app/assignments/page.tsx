import { getAssignments } from "@/lib/data";
import Link from "next/link";

export default async function AssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        </div>

        <div className="mt-8 space-y-6">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-indigo-600">
                    {assignment.title}
                  </h2>
                  <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full">
                    Deadline:{" "}
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{assignment.description}</p>
                <div className="mt-4">
                  <Link href={`/assignments/${assignment.id}`}>
                    <span className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                      View & Submit &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">
                No assignments have been created yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
