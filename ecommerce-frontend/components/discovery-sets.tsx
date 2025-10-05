"use client"

import { Button } from "@/components/ui/button"

const DiscoverySets = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4 tracking-wide">DISCOVERY SETS</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of miniature fragrances, perfect for discovering your signature scent.
          </p>
        </div>

        <div className="relative animate-fade-in-up animate-delay-400">
          <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-lg">
            <img
              src="/placeholder-sqjup.png"
              alt="Discovery Sets Collection"
              className="w-full h-full object-cover hover-scale"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent rounded-lg" />

          <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 text-white max-w-md text-right">
            <h3 className="text-3xl font-bold mb-4">DISCOVERY SETS</h3>
            <p className="text-lg mb-6 opacity-90">The perfect introduction to our world of luxury fragrances.</p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-lift"
            >
              SHOP DISCOVERY SETS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverySets
