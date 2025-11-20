"use client"

import { ArrowLeft, Flashlight, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface ScanScreenProps {
  onBack?: () => void
}

export default function ScanScreen({ onBack }: ScanScreenProps) {
  return (
    <div className="relative h-full bg-black text-white overflow-y-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#9EFF36]/20 to-transparent"
              style={{ top: `${i * 5}%`, width: "100%" }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#9EFF36]/20 to-transparent"
              style={{ left: `${i * 5}%`, height: "100%" }}
            />
          ))}
        </div>
      </div>

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
          <h1 className="text-lg font-semibold">Scan to Pay</h1>
          <div className="w-10" />
        </motion.div>

        {/* Scanner Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="px-5 mb-12"
        >
          <div className="relative aspect-square max-w-sm mx-auto">
            {/* Glass viewfinder */}
            <div className="absolute inset-0 rounded-[32px] glass-strong overflow-hidden">
              {/* Corner brackets */}
              {[
                { top: 4, left: 4, rotate: 0 },
                { top: 4, right: 4, rotate: 90 },
                { bottom: 4, right: 4, rotate: 180 },
                { bottom: 4, left: 4, rotate: 270 },
              ].map((pos, idx) => (
                <div
                  key={idx}
                  className="absolute w-12 h-12"
                  style={{ ...pos }}
                >
                  <div 
                    className="w-full h-full border-t-2 border-l-2 border-[#9EFF36] rounded-tl-2xl"
                    style={{ transform: `rotate(${pos.rotate}deg)` }}
                  />
                </div>
              ))}

              {/* Scanning laser line */}
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9EFF36] to-transparent animate-scan-laser"
                style={{ 
                  boxShadow: "0 0 20px rgba(158, 255, 54, 0.8), 0 0 40px rgba(158, 255, 54, 0.4)" 
                }}
              />

              {/* Center focus area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-48 h-48 border-2 border-[#9EFF36]/50 rounded-3xl"
                />
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-[32px] bg-[#9EFF36]/10 blur-2xl -z-10" />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-5 text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-3">Scan any QR to Pay</h2>
          <p className="text-gray-400 text-sm">using TON</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-6"
        >
          <button className="w-16 h-16 rounded-full glass-strong flex items-center justify-center soft-shadow-sm">
            <Flashlight className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="w-16 h-16 rounded-full glass-strong flex items-center justify-center soft-shadow-sm">
            <RefreshCw className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </motion.div>

        {/* Bottom Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-5 pb-8 mt-12"
        >
          <div className="glass rounded-[24px] p-5 max-w-sm mx-auto">
            <p className="text-center text-sm text-gray-400">
              Position the QR code within the frame to scan
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}