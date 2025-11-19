"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function SuccessScreen() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-black" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: "50%", 
              y: "50%",
              scale: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: [0, 1, 0.5]
            }}
            transition={{
              duration: 2,
              delay: i * 0.05,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-[#9EFF36] rounded-full"
            style={{
              left: "50%",
              top: "50%"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-5">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            {/* Glow rings */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-[#9EFF36]"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
              className="absolute inset-0 rounded-full bg-[#9EFF36]"
            />
            
            {/* Main circle */}
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#9EFF36] to-[#8CFF00] flex items-center justify-center animate-pulse-glow">
              <Check className="w-16 h-16 text-black" strokeWidth={3} />
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-3 neon-text-glow">Payment Completed!</h1>
          <p className="text-gray-400 mb-8">Your transaction was successful</p>
        </motion.div>

        {/* Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-strong rounded-[32px] p-6 max-w-sm mx-auto mb-8 soft-shadow"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Amount</span>
              <span className="font-semibold text-xl">$1,606.50</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between items-center">
              <span className="text-gray-400">To</span>
              <span className="font-medium">Merchant Store</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Network Fee</span>
              <span className="font-medium">2.59 USD</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Transaction ID</span>
              <span className="font-mono text-sm text-[#9EFF36]">TXN***4521</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex gap-3"
        >
          <button className="flex-1 glass-strong py-4 rounded-[20px] font-medium hover:bg-white/5 transition-colors">
            Share Receipt
          </button>
          <button className="flex-1 bg-gradient-to-r from-[#9EFF36] to-[#8CFF00] text-black py-4 rounded-[20px] font-semibold neon-glow hover:shadow-lg transition-shadow">
            Done
          </button>
        </motion.div>
      </div>
    </div>
  )
}