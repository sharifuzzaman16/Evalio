"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: { [key:string]: number };
}

const COLORS = {
    Pending: '#FFBB28', // Yellow
    Accepted: '#00C49F', // Green
    Rejected: '#FF8042', // Red
};

export default function SubmissionsPieChart({ data }: PieChartProps) {
  const chartData: ChartData[] = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  if (chartData.length === 0) {
      return <p className="text-gray-500">No submission data available to display chart.</p>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}