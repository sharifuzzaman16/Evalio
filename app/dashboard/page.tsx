
import { getSubmissionStatusCounts } from "@/lib/data";
import SubmissionsPieChart from "@/components/SubmissionPieChart";

export default async function DashboardPage() {
  const statusCounts = await getSubmissionStatusCounts();

  return (
    <div className="max-w-4xl p-8 mx-auto">
      <h1 className="pb-4 mb-8 text-3xl font-bold border-b">Dashboard</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">
          Submission Status Overview
        </h2>
        <div className="flex items-center justify-center w-full h-96">
            <SubmissionsPieChart data={statusCounts} />
        </div>
      </div>
    </div>
  );
}