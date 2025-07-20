import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, FileText, FileCheck2, GraduationCap } from "lucide-react";

const summaryStats = [
  {
    title: "Total Users",
    value: 1234,
    icon: <Users className="text-blue-500" />,
  },
  {
    title: "Total Applications",
    value: 875,
    icon: <FileCheck2 className="text-green-500" />,
  },
  {
    title: "Total Reviews",
    value: 240,
    icon: <FileText className="text-yellow-500" />,
  },
  {
    title: "Total Scholarships",
    value: 65,
    icon: <GraduationCap className="text-purple-500" />,
  },
];

const applicationsData = [
  { month: "Jan", applications: 40 },
  { month: "Feb", applications: 30 },
  { month: "Mar", applications: 20 },
  { month: "Apr", applications: 27 },
  { month: "May", applications: 18 },
  { month: "Jun", applications: 23 },
  { month: "Jul", applications: 34 },
];

const statusData = [
  { name: "Pending", value: 30 },
  { name: "Processing", value: 15 },
  { name: "Completed", value: 40 },
  { name: "Rejected", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen max-w-7xl p-5 mx-auto">
      <h1 className="text-3xl font-bold mb-8 ">Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {summaryStats.map((stat, idx) => (
          <div
            key={idx}
            className=" p-5 rounded-xl shadow flex items-center space-x-4 bg-[#f8f4ee] dark:bg-[#2a2524]"
          >
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <p className="text-sm ">{stat.title}</p>
              <p className="text-xl font-bold ">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8">
        {/* Bar Chart */}
        <div className=" p-6 rounded-lg shadow bg-[#f8f4ee] dark:bg-[#2a2524]">
          <h2 className="text-xl font-semibold mb-4 ">
            Applications per Month
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={applicationsData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#b4530a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className=" p-6 rounded-lg shadow bg-[#f8f4ee] dark:bg-[#2a2524]">
          <h2 className="text-xl font-semibold mb-4 ">
            Application Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#b4530a"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
