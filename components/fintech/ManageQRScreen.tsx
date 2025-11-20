"use client";

import { ArrowLeft, Plus, Wallet, Send, MoreHorizontal, QrCode } from "lucide-react";
import { motion } from "framer-motion";

interface ManageQRScreenProps {
  onBack: () => void;
  onAddNewQR: () => void;
}

export default function ManageQRScreen({ onBack, onAddNewQR }: ManageQRScreenProps) {
  const features = [
    { icon: Send, label: "Send", color: "text-[#9EFF36]" },
    { icon: Wallet, label: "Wallet", color: "text-blue-400" },
    { icon: QrCode, label: "Scan", color: "text-purple-400" },
    { icon: MoreHorizontal, label: "More", color: "text-gray-400" },
  ];

  return (
    <div className="relative h-full bg-black text-white overflow-y-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-black" />

      <div className="relative z-10 px-5 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Manage QR</h1>
          <div className="w-10" />
        </motion.div>

        {/* Add New QR Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddNewQR}
          className="w-full glass-strong rounded-[24px] p-6 mb-8 flex items-center justify-center gap-3 group border border-[#9EFF36]/30 hover:border-[#9EFF36] transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-[#9EFF36]/20 flex items-center justify-center group-hover:bg-[#9EFF36]/30 transition-colors">
            <Plus className="w-6 h-6 text-[#9EFF36]" />
          </div>
          <span className="text-lg font-medium">Add New QR</span>
        </motion.button>

        {/* Project Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-4">All Features</h2>
          <div className="grid grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="aspect-square glass rounded-[20px] flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-400">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
