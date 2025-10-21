"use client";

import { useEffect, useState } from "react";
import { BarChart3, ShoppingBag, Users, Store, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MonthlyRevenue {
  month: number;
  revenue: number;
}

interface Stats {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/statistics`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setStats({
          totalUsers: data.total_users ?? 0,
          totalSellers: data.total_sellers ?? 0,
          totalProducts: data.total_products ?? 0,
          totalOrders: data.total_orders ?? 0,
          totalRevenue: data.total_revenue ?? 0,
          monthlyRevenue: data.monthly_revenue ?? [],
        });
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading analytics...
      </div>
    );
  }

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Total Sellers",
      value: stats.totalSellers,
      icon: Store,
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Products Listed",
      value: stats.totalProducts,
      icon: ShoppingBag,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      label: "Orders Completed",
      value: stats.totalOrders,
      icon: BarChart3,
      color: "bg-purple-100 text-purple-800",
    },
    {
      label: "Total Revenue",
      value: `₱${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-pink-100 text-pink-800",
    },
  ];

  // 🔢 Format dynamic monthly revenue data
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const maxRevenue = Math.max(...stats.monthlyRevenue.map((m) => m.revenue), 1);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Analytics</h1>
      <p className="text-gray-600">Overview of your platform activity</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card) => (
          <Card key={card.label} className="shadow-sm border border-gray-200">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 📊 Dynamic Monthly Revenue Chart */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-700" />
          Monthly Revenue
        </h2>

        {stats.monthlyRevenue.length > 0 ? (
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthNames.map((month, i) => {
              const revenue = stats.monthlyRevenue.find((m) => m.month === i + 1)?.revenue ?? 0;
              return (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div
                    className="w-6 sm:w-8 bg-green-600 rounded-t-md transition-all duration-500"
                    style={{ height: `${(revenue / maxRevenue) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{month}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">No revenue data available.</p>
        )}
      </div>
    </div>
  );
}
