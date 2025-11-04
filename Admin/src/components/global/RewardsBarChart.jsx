import React, { useEffect, useState } from "react";
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
import { rewardApi } from "../../api/rewards";

const COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#ef4444", "#8b5cf6"];

const RewardsBarChart = () => {
  const [data, setData] = useState([]);
  const [loading,setIsLoading ]  = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await rewardApi.getAll(); // your API
        if (res?.result) {
            console.log(res?.result)
          // Transform for recharts
          const formatted = res.result.slice(0,5).map((item) => ({
            name: item.rewardName,
            points: item.maxPoints,
          }));
          setData(formatted);
          setIsLoading(false);
        }
      } catch (error) {
         setIsLoading(true);
        console.error("Failed to fetch rewards:", error);
      }
    };
    fetchRewards();
  }, []);

//     if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="loader"></div>
//       </div>
//     );
//   }

  return (
   loading ?  <div className="flex items-center justify-center">
   <div className="loader"></div>
   </div> :  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Rewards Points Overview
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
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
          <Bar dataKey="points" barSize={20}  radius={[4, 4, 4, 4]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RewardsBarChart;
