"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const VisionSection = () => {
  const router = useRouter()

  return (
    <section className="relative py-32 bg-gray-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/luxury-vision-background.jpg"
          alt="Luxury perfume vision background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl lg:text-6xl font-serif font-normal mb-4 tracking-wide text-gray-900">
          BUILD YOUR RITUAL
        </h2>

        <p className="text-sm font-medium tracking-[0.2em] text-gray-600 mb-6 uppercase">ONLINE EXCLUSIVE</p>

        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
          Compose your own set of fragrances and scented essentials for men and women.
        </p>

        <Button
          variant="outline"
          className="text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white font-medium tracking-wide px-8 py-3 transition-all duration-300 ease-out"
          onClick={() => router.push("/collections")}
        >
          SHOP THE BUNDLES
        </Button>
      </div>
    </section>
  )
}

export default VisionSection
