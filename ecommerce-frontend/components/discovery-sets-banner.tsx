"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DiscoverySetsBanner() {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleDiscoverClick = () => {
    router.push("/collections?filter=discovery")
  }

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/luxury-discovery-set-clear.jpg"
          alt="Discovery Sets Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-end pr-16">
        <div className="text-right">
          <button
            onClick={handleDiscoverClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative text-sm font-medium text-gray-800 tracking-wider mb-8 transition-colors duration-300"
          >
            DISCOVER
            <div
              className={`absolute -bottom-1 left-0 h-0.5 bg-gray-800 transition-all duration-300 ease-out ${
                isHovered ? "w-0 opacity-0" : "w-full opacity-100"
              }`}
            />
          </button>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide">DISCOVERY SETS</h2>
            <p className="text-sm text-gray-600 tracking-wider">FIND YOUR SCENT</p>
          </div>
        </div>
      </div>
    </section>
  )
}
