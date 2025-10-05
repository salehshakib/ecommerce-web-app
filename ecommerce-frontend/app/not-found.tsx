import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Sparkles, Construction } from "lucide-react";

// Custom Perfume Bottle SVG Component
const PerfumeBottleIcon = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    className="text-primary"
    fill="currentColor"
  >
    {/* Perfume bottle body */}
    <path d="M35 45 L85 45 L80 100 L40 100 Z" fill="currentColor" opacity="0.1" />
    <path d="M35 45 L85 45 L80 100 L40 100 Z" stroke="currentColor" strokeWidth="2" fill="none" />
    
    {/* Perfume bottle neck */}
    <rect x="50" y="25" width="20" height="20" fill="currentColor" opacity="0.1" />
    <rect x="50" y="25" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" />
    
    {/* Perfume bottle cap */}
    <rect x="48" y="20" width="24" height="8" rx="4" fill="currentColor" opacity="0.2" />
    <rect x="48" y="20" width="24" height="8" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
    
    {/* Spray nozzle */}
    <circle cx="45" cy="24" r="3" fill="currentColor" opacity="0.3" />
    <line x1="42" y1="24" x2="38" y2="22" stroke="currentColor" strokeWidth="2" />
    <line x1="42" y1="24" x2="38" y2="26" stroke="currentColor" strokeWidth="2" />
    
    {/* Perfume liquid */}
    <path d="M40 50 L80 50 L76 95 L44 95 Z" fill="currentColor" opacity="0.2" />
    
    {/* Decorative elements */}
    <circle cx="60" cy="70" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="55" cy="75" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="65" cy="65" r="1" fill="currentColor" opacity="0.4" />
  </svg>
);

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Perfume Bottle with Construction Elements */}
        <div className="relative mb-8">
          <div className="flex justify-center mb-4">
            <PerfumeBottleIcon />
          </div>
          
          {/* Construction Icon Overlay */}
          <div className="absolute -top-2 -right-8">
            <div className="bg-primary/10 rounded-full p-3">
              <Construction className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          {/* Sparkles for luxury feel */}
          <div className="absolute -top-4 -left-6">
            <Sparkles className="w-6 h-6 text-primary/60" />
          </div>
          <div className="absolute top-8 -right-4">
            <Sparkles className="w-4 h-4 text-primary/40" />
          </div>
          <div className="absolute bottom-4 -left-4">
            <Sparkles className="w-5 h-5 text-primary/50" />
          </div>
        </div>

        {/* 404 Heading */}
        <div className="mb-6">
          <h1 className="text-8xl font-light text-primary mb-2 tracking-wider">404</h1>
          <div className="h-px w-32 bg-primary/30 mx-auto mb-4"></div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-light mb-4 tracking-wider text-foreground">
            FRAGRANCE <span className="text-primary">UNDER CREATION</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
            Like our master perfumers crafting the perfect scent, this page is currently 
            being perfected. Please explore our existing collection while we work on this new experience.
          </p>
        </div>

        {/* Status Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Under Construction</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 px-6 py-3">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
          
          <Link href="/collections">
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 px-6 py-3">
              <Sparkles className="w-4 h-4 mr-2" />
              Explore Fragrances
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-border/20">
          <p className="text-sm text-muted-foreground mb-4">
            Need assistance finding something specific?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link href="/contact" className="text-primary hover:text-primary/80 transition-colors">
              Contact Our Team
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link href="/store-locator" className="text-primary hover:text-primary/80 transition-colors">
              Visit Our Stores
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link href="/about" className="text-primary hover:text-primary/80 transition-colors">
              About Parfums de Marly
            </Link>
          </div>
        </div>

        {/* Decorative Quote */}
        <div className="mt-12 max-w-md mx-auto">
          <blockquote className="text-sm italic text-muted-foreground">
            "Like a fine fragrance, great experiences take time to perfect."
          </blockquote>
          <cite className="text-xs text-muted-foreground/80 block mt-2">— Parfums de Marly</cite>
        </div>
      </div>
    </div>
  );
}