import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from "recharts";

export const GenderBarChart = ({ male, female }) => {
  const data = [
    { name: "Male", value: male },
    { name: "Female", value: female },
  ];

  const COLORS = ["#3b82f6", "#ec4899"]; // blue for male, pink for female

  return (
    <div className="w-full h-24">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          {/* X-axis defines the scale */}
          <XAxis type="number" hide domain={[0, Math.max(male, female) + 2]} />
          {/* Y-axis defines the labels */}
          <YAxis
            dataKey="name"
            type="category"
            width={50}
            tick={{ fontSize: 12, fill: "#374151" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            formatter={(value, name) => [`${value}`, name]}
          />
          <Bar dataKey="value" barSize={15} radius={[4, 4, 4, 4]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Labels below */}
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span> Male: {male}</span>
        <span> Female: {female}</span>
      </div>
    </div>
  );
};
