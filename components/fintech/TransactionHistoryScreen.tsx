"use client"

import { ArrowLeft, Search, Filter, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

const transactions = [
  { 
    id: 1, 
    name: "Salary Deposit", 
    date: "Today, 10:30 AM", 
    amount: "+$5,200.00", 
    type: "income",
    status: "completed",
    icon: "💰"
  },
  { 
    id: 2, 
    name: "Amazon Purchase", 
    date: "Today, 09:15 AM", 
    amount: "-$127.50", 
    type: "expense",
    status: "completed",
    icon: "🛍️"
  },
  { 
    id: 3, 
    name: "Netflix Subscription", 
    date: "Yesterday, 14:20 PM", 
    amount: "-$15.99", 
    type: "expense",
    status: "completed",
    icon: "🎬"
  },
  { 
    id: 4, 
    name: "Transfer to Savings", 
    date: "Yesterday, 11:00 AM", 
    amount: "-$1,000.00", 
    type: "transfer",
    status: "completed",
    icon: "💳"
  },
  { 
    id: 5, 
    name: "Freelance Payment", 
    date: "Feb 12, 16:45 PM", 
    amount: "+$850.00", 
    type: "income",
    status: "completed",
    icon: "💼"
  },
  { 
    id: 6, 
    name: "Uber Ride", 
    date: "Feb 12, 08:30 AM", 
    amount: "-$24.50", 
    type: "expense",
    status: "pending",
    icon: "🚗"
  },
  { 
    id: 7, 
    name: "Starbucks", 
    date: "Feb 11, 07:15 AM", 
    amount: "-$8.75", 
    type: "expense",
    status: "completed",
    icon: "☕"
  },
  { 
    id: 8, 
    name: "Dividend Payment", 
    date: "Feb 10, 12:00 PM", 
    amount: "+$342.18", 
    type: "income",
    status: "completed",
    icon: "📈"
  },
]

export default function TransactionHistoryScreen() {
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
          <h1 className="text-lg font-semibold">Transaction History</h1>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-[20px] p-4 flex items-center gap-3 mb-6"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
          />
        </motion.div>

        {/* Summary Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          <div className="glass rounded-[20px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#9EFF36]/10 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4 text-[#9EFF36]" />
              </div>
              <span className="text-xs text-gray-400">Income</span>
            </div>
            <p className="text-xl font-bold text-[#9EFF36]">+$6,392.18</p>
          </div>
          
          <div className="glass rounded-[20px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-xs text-gray-400">Expenses</span>
            </div>
            <p className="text-xl font-bold text-red-500">-$1,176.74</p>
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {transactions.map((transaction, idx) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-[20px] p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors relative overflow-hidden group"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9EFF36]/0 via-[#9EFF36]/5 to-[#9EFF36]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] flex items-center justify-center text-2xl">
                {transaction.icon}
              </div>
              
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium truncate">{transaction.name}</p>
                  {transaction.status === "pending" && (
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs">
                      Pending
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{transaction.date}</p>
              </div>
              
              <div className="relative text-right">
                <p className={`font-semibold ${
                  transaction.amount.startsWith('+') 
                    ? 'text-[#9EFF36]' 
                    : 'text-white'
                }`}>
                  {transaction.amount}
                </p>
                {transaction.type === "transfer" && (
                  <RefreshCw className="w-3 h-3 text-gray-400 ml-auto mt-1" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full glass rounded-[20px] py-4 mt-6 font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Load More Transactions
        </motion.button>
      </div>
    </div>
  )
}