"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useCombinedDataContext } from "@/providers/combined-data-provider"
import { useNewsletterMutation } from "@/hooks/mutations/use-newsletter-mutations"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const { toast } = useToast()
  const { settings } = useCombinedDataContext()
  const newsletterMutation = useNewsletterMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newsletterEmail = settings?.newsLetter?.newsLetterEmail || "newsletter@perfumehouse.com"

    newsletterMutation.mutate(
      { email, newsletterEmail },
      {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Thank you for subscribing to our newsletter!",
          })
          setEmail("")
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to subscribe. Please try again.",
            variant: "destructive",
          })
        }
      }
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-up">            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight">
                Stay Connected
                <br />
                <span className="font-medium">with Luxury</span>
              </h2>
              
              <p className="text-lg text-white/80 leading-relaxed max-w-md">
                Be the first to discover our exclusive collections, limited releases, and receive insider access to the world of luxury fragrances.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Exclusive launches</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Special offers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>VIP events</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="animate-fade-in-up animate-delay-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/40 transition-all duration-300 rounded-lg"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="w-full h-14 bg-white text-gray-900 hover:bg-white/90 font-medium tracking-wide transition-all duration-300 rounded-lg group disabled:opacity-70"
              >
                {newsletterMutation.isPending ? (
                  <span>SUBSCRIBING...</span>
                ) : (
                  <>
                    <span>SUBSCRIBE TO NEWSLETTER</span>
                    <div className="ml-2 transition-transform group-hover:translate-x-1">→</div>
                  </>
                )}
              </Button>
              
              <p className="text-xs text-white/60 text-center">
                By subscribing, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
