"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LifestyleSections = () => {
  const router = useRouter()
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const handleDiscoverWomen = () => {
    router.push("/collections?filter=women")
  }

  const handleDiscoverMen = () => {
    router.push("/collections?filter=men")
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="group">
            <div className="relative overflow-hidden aspect-[4/5] mb-4">
              <img
                src="/fragrances-women-luxury.jpg"
                alt="Fragrances for Women"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Fragrances for Women</h3>
              <button
                onClick={handleDiscoverWomen}
                className="relative text-sm font-medium text-gray-900 transition-all duration-500"
                onMouseEnter={() => setHoveredButton("women")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                DISCOVER
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                    hoveredButton === "women" ? "w-0 opacity-0" : "w-full opacity-100"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="group">
            <div className="relative overflow-hidden aspect-[4/5] mb-4">
              <img src="/fragrances-men-luxury.jpg" alt="Fragrances for Men" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Fragrances for Men</h3>
              <button
                onClick={handleDiscoverMen}
                className="relative text-sm font-medium text-gray-900 transition-all duration-500"
                onMouseEnter={() => setHoveredButton("men")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                DISCOVER
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                    hoveredButton === "men" ? "w-0 opacity-0" : "w-full opacity-100"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LifestyleSections
