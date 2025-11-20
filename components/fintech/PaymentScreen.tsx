"use client"

import { ArrowLeft, Delete } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface PaymentScreenProps {
  onBack?: () => void
  onSuccess?: () => void
}

export default function PaymentScreen({ onBack, onSuccess }: PaymentScreenProps) {
  const [amount, setAmount] = useState("121606.50")
  
  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setAmount(amount.slice(0, -1) || "0")
    } else if (key !== ".") {
      setAmount(amount === "0" ? key : amount + key)
    }
  }

  const handleExchange = () => {
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <div className="relative h-full bg-black text-white overflow-y-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-black" />
      
      <div className="relative z-10">
        {/* Header with Back Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-5 pt-6 mb-8"
        >
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Payment</h1>
          <div className="w-10" />
        </motion.div>

        {/* Merchant Info */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-2 border-[#9EFF36]/20 flex items-center justify-center mb-3 overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=20" alt="Merchant" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold">Pay to Merchant</h2>
          <p className="text-sm text-gray-400">@merchant_store</p>
        </motion.div>

        {/* Amount Display */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-5 mb-6"
        >
          <div className="glass-strong rounded-[32px] p-8 text-center soft-shadow">
            <p className="text-sm text-gray-400 mb-2">To</p>
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              <h1 className="text-4xl sm:text-5xl font-bold break-all max-w-full">{amount}</h1>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#9EFF36]/10 border border-[#9EFF36]/20 flex-shrink-0">
                <div className="w-2 h-2 bg-[#9EFF36] rounded-full" />
                <span className="text-sm font-medium text-[#9EFF36]">BDT</span>
              </div>
            </div>
            <div className="glass rounded-full px-4 py-2 inline-block">
              <p className="text-xs text-gray-400">Network Fees: <span className="text-white">2.59 USD</span></p>
            </div>
          </div>
        </motion.div>

        {/* Keypad */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-5 mb-8"
        >
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((key) => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKeyPress(key.toString())}
                className="glass-strong rounded-[20px] h-16 flex items-center justify-center text-2xl font-light hover:bg-white/5 transition-colors"
              >
                {key}
              </motion.button>
            ))}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleKeyPress("backspace")}
              className="glass-strong rounded-[20px] h-16 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <Delete className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Pay Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-5 pb-8"
        >
          <button 
            onClick={handleExchange}
            className="w-full bg-gradient-to-r from-[#9EFF36] to-[#8CFF00] text-black font-semibold py-5 rounded-[24px] neon-glow hover:shadow-lg transition-shadow"
          >
            Exchange Money
          </button>
        </motion.div>
      </div>
    </div>
  )
}