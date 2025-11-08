import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { rewardApi } from "../../api/rewards";

const COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#ef4444", "#8b5cf6"];

const RewardsBarChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rewards"],
    queryFn: rewardApi.getAll,
  });

  //     Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="loader"></div>
      </div>
    );
  }

  //     Handle error state
  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        Failed to load rewards data.
      </div>
    );
  }

const chartData = (data?.result || [])
  .slice(0, 5)
  .map(item => ({
    name: item.name,
    points: item.maxPoints,
    active: item.active,              // preserve active flag
  }))
  .filter(item => item.active);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Rewards Points Overview
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="name"
            type="category"
            width={100}
            tick={{ fontSize: 14, fill: "#374151" }}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
          <Bar dataKey="points" barSize={20} radius={[4, 4, 4, 4]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RewardsBarChart;
