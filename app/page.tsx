"use client"

import { useState } from "react"
import HomeScreen from "@/components/fintech/HomeScreen"
import ScanScreen from "@/components/fintech/ScanScreen"
import PaymentScreen from "@/components/fintech/PaymentScreen"
import SuccessScreen from "@/components/fintech/SuccessScreen"
import StatisticsScreen from "@/components/fintech/StatisticsScreen"
import TransactionHistoryScreen from "@/components/fintech/TransactionHistoryScreen"
import { Home, QrCode, Activity, User } from "lucide-react"
import { motion } from "framer-motion"

type Screen = "home" | "scan" | "payment" | "success" | "statistics" | "history"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />
      case "scan":
        return <ScanScreen />
      case "payment":
        return <PaymentScreen />
      case "success":
        return <SuccessScreen />
      case "statistics":
        return <StatisticsScreen />
      case "history":
        return <TransactionHistoryScreen />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />
    }
  }

  const navItems = [
    { id: "home" as Screen, icon: Home, label: "Home" },
    { id: "scan" as Screen, icon: QrCode, label: "Scan" },
    { id: "history" as Screen, icon: Activity, label: "Activity" },
    { id: "statistics" as Screen, icon: User, label: "Stats" },
  ]

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Mobile Frame */}
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
        <div className="relative w-full max-w-[420px] h-[calc(100vh-2rem)] md:h-[844px] bg-black rounded-[3rem] border-[8px] border-[#1A1A1A] shadow-2xl overflow-hidden">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />
          
          {/* Screen Content */}
          <div className="relative w-full h-full overflow-hidden">
            {renderScreen()}
          </div>

          {/* Sticky Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 glass-strong border-t border-white/10 px-8 py-4 z-50">
            <div className="flex items-center justify-around">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className="flex flex-col items-center gap-1 relative"
                >
                  <div
                    className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-all ${
                      currentScreen === item.id ? "bg-[#9EFF36]" : ""
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        currentScreen === item.id ? "text-black" : "text-gray-400"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  {currentScreen === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 w-1 h-1 bg-[#9EFF36] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TON Branding */}
      <div className="fixed top-8 right-8 z-50 glass-strong rounded-full px-4 py-2">
        <p className="text-[#9EFF36] text-sm font-semibold">TON Wallet</p>
      </div>
    </div>
  )
}