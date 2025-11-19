"use client"

import { ArrowLeft, MoreVertical, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const chartData = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 20 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 68 },
  { month: "May", value: 85 },
  { month: "Jun", value: 52 },
]

const scheduledPayments = [
  { id: 1, name: "Netflix Subscription", date: "Feb 15", amount: "$15.99", icon: "🎬" },
  { id: 2, name: "Spotify Premium", date: "Feb 18", amount: "$9.99", icon: "🎵" },
  { id: 3, name: "AWS Services", date: "Feb 20", amount: "$125.00", icon: "☁️" },
]

export default function StatisticsScreen() {
  const [activeTab, setActiveTab] = useState<"income" | "spending">("income")
  const [activeFilter, setActiveFilter] = useState("Y")

  const maxValue = Math.max(...chartData.map(d => d.value))

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-black" />
      
      <div className="relative z-10 px-5 pt-6 pb-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Statistics</h1>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <MoreVertical className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Toggle Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8"
        >
          <button
            onClick={() => setActiveTab("income")}
            className={`flex-1 py-3 rounded-[20px] font-medium transition-all ${
              activeTab === "income"
                ? "bg-[#9EFF36] text-black"
                : "glass text-gray-400"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setActiveTab("spending")}
            className={`flex-1 py-3 rounded-[20px] font-medium transition-all ${
              activeTab === "spending"
                ? "bg-[#9EFF36] text-black"
                : "glass text-gray-400"
            }`}
          >
            Spending
          </button>
        </motion.div>

        {/* Total Amount */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-[32px] p-6 mb-6 soft-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Income</p>
            <TrendingUp className="w-5 h-5 text-[#9EFF36]" />
          </div>
          <h2 className="text-4xl font-bold mb-2">$67,545.23</h2>
          <p className="text-sm text-[#9EFF36]">+12.5% from last month</p>
        </motion.div>

        {/* Time Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end gap-2 mb-6"
        >
          {["D", "W", "M", "Y"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`w-10 h-10 rounded-full font-medium text-sm transition-all ${
                activeFilter === filter
                  ? "bg-[#9EFF36] text-black"
                  : "glass text-gray-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-[24px] p-6 mb-8"
        >
          <div className="flex items-end justify-between h-64 gap-3">
            {chartData.map((data, idx) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex-1 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.value / maxValue) * 100}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, type: "spring", stiffness: 100 }}
                    className={`w-full rounded-t-lg ${
                      data.month === "May" 
                        ? "bg-gradient-to-t from-[#9EFF36] to-[#8CFF00] neon-glow" 
                        : "bg-[#1A1A1A]"
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-400">{data.month}</span>
              </div>
            ))}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-6 flex flex-col justify-between h-64 text-xs text-gray-500">
            <span>$30K</span>
            <span>$20K</span>
            <span>$10K</span>
            <span>$0K</span>
          </div>
        </motion.div>

        {/* Scheduled Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Scheduled Payments</h2>
            <button className="text-sm text-gray-400">See all</button>
          </div>

          <div className="space-y-3">
            {scheduledPayments.map((payment, idx) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="glass rounded-[20px] p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] flex items-center justify-center text-2xl">
                  {payment.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{payment.name}</p>
                  <p className="text-xs text-gray-400">{payment.date}</p>
                </div>
                <p className="font-semibold">{payment.amount}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}