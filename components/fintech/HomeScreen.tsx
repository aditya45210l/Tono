"use client"

import { ArrowDownLeft, ArrowUpRight, CreditCard, QrCode, Bell } from "lucide-react"
import { motion } from "framer-motion"

const recentTransactions = [
  { id: 1, name: "Kiara", avatar: "https://i.pravatar.cc/150?img=1", initials: "K" },
  { id: 2, name: "Mason", avatar: "https://i.pravatar.cc/150?img=2", initials: "M" },
  { id: 3, name: "Lucas", avatar: "https://i.pravatar.cc/150?img=3", initials: "L" },
  { id: 4, name: "Ethan", avatar: "https://i.pravatar.cc/150?img=4", initials: "E" },
  { id: 5, name: "Oliver", avatar: "https://i.pravatar.cc/150?img=5", initials: "O" },
]

const transactions = [
  { id: 1, name: "Henry James", time: "10:30 AM", amount: "+$367.00", type: "Receive", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 2, name: "Uber Transfer", time: "9:45 AM", amount: "-$908.00", type: "Transfer", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "Netflix", time: "Yesterday", amount: "-$450.00", type: "Payment", avatar: "https://i.pravatar.cc/150?img=13" },
]

type Screen = "home" | "scan" | "payment" | "success" | "statistics" | "history"

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="relative h-full bg-black text-white pb-24 overflow-y-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-black" />
      
      <div className="relative z-10 px-5 pt-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9EFF36] to-[#8CFF00] flex items-center justify-center text-black font-semibold text-lg">
              A
            </div>
            <div>
              <p className="text-sm text-gray-400">Hello, Aditya 👋</p>
              <p className="text-xs text-gray-500">Welcome Back</p>
            </div>
          </div>
          <button className="relative w-10 h-10 rounded-full glass flex items-center justify-center">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#9EFF36] rounded-full" />
          </button>
        </motion.div>

        {/* Balance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-[32px] p-6 mb-6 soft-shadow relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#9EFF36]/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">My Balance</p>
              <button className="text-xs text-[#9EFF36] font-medium">Add Card +</button>
            </div>
            <h1 className="text-5xl font-bold mb-2">$24,600.00</h1>
            <p className="text-[#9EFF36] text-sm font-medium">+22.7%</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-3 mb-8"
        >
          {[
            { icon: ArrowUpRight, label: "Withdraw", color: "from-[#9EFF36]/10 to-[#8CFF00]/5", screen: "payment" as Screen },
            { icon: ArrowDownLeft, label: "Deposit", color: "from-[#9EFF36]/10 to-[#8CFF00]/5", screen: "payment" as Screen },
            { icon: CreditCard, label: "Pay", color: "from-[#9EFF36]/10 to-[#8CFF00]/5", screen: "payment" as Screen },
            { icon: QrCode, label: "Scan", color: "from-[#9EFF36]/10 to-[#8CFF00]/5", screen: "scan" as Screen },
          ].map((action, idx) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(action.screen)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-16 h-16 rounded-[20px] bg-gradient-to-br ${action.color} glass flex items-center justify-center`}>
                <action.icon className="w-6 h-6 text-[#9EFF36]" strokeWidth={1.5} />
              </div>
              <span className="text-xs text-gray-400">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Budget Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-[24px] p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-400">Left to spend</p>
              <p className="text-2xl font-bold">$738</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Monthly budget</p>
              <p className="text-2xl font-bold">$22,550.00</p>
            </div>
          </div>
          <div className="relative h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#9EFF36] to-[#8CFF00] rounded-full neon-glow"
            />
          </div>
        </motion.div>

        {/* Recent Transaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Transaction</h2>
            <button className="text-sm text-gray-400">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
            {recentTransactions.map((person, idx) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex flex-col items-center gap-2 min-w-[60px]"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-gray-400">{person.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Transactions</h2>
            <button 
              onClick={() => onNavigate("history")}
              className="text-sm text-gray-400"
            >
              See All
            </button>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {["All", "Sent", "Request", "Transfer", "Remit"].map((tab) => (
              <button
                key={tab}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  tab === "All" 
                    ? "bg-[#9EFF36] text-black" 
                    : "glass text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Transaction Items */}
          <div className="space-y-3 pb-4">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-[20px] p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src={transaction.avatar} alt={transaction.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-xs text-gray-400">{transaction.time} • {transaction.type}</p>
                </div>
                <p className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-[#9EFF36]' : 'text-white'}`}>
                  {transaction.amount}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}