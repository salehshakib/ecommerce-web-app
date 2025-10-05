"use client"

import { Home, Search, User, ShoppingBag, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"

const MobileBottomNavbar = () => {
  const { openCart, getTotalItems, isOpen } = useCart()
  const { token, isAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", action: () => router.push("/"), path: "/" },
    { icon: Grid3X3, label: "Collections", action: () => router.push("/collections"), path: "/collections" },
    {
      icon: User,
      label: "Profile",
      action: () => {
        if (token) {
          router.push(isAdmin ? "/admin/profile" : "/user/profile")
        } else {
          router.push("/login")
        }
      },
      path: token ? (isAdmin ? "/admin/profile" : "/user/profile") : "/login"
    },
    { icon: Search, label: "Search", action: () => {}, path: "/search" },
  ]

  if (isOpen) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 z-50 shadow-lg">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="flex items-center justify-around px-2 py-2 safe-area-padding-bottom">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.path || (item.path === "/" && pathname === "/")

          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={item.action}
              className={`flex flex-col items-center gap-1.5 p-3 h-auto hover:bg-primary/10 transition-all duration-300 flex-1 min-w-0 relative group ${
                isActive ? "text-primary" : "text-gray-500"
              }`}
            >
              {/* Icon container with active state animation */}
              <div className={`relative transition-all duration-300 ${
                isActive
                  ? "transform scale-110"
                  : "group-hover:transform group-hover:scale-105"
              }`}>
                {/* Active indicator background */}
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 animate-pulse"></div>
                )}
                <Icon className={`relative z-10 transition-all duration-300 ${
                  isActive ? "h-6 w-6" : "h-5 w-5"
                }`} />
                {/* Active dot indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Label with better typography */}
              <span className={`text-xs font-medium tracking-wide transition-all duration-300 ${
                isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-700"
              }`}>
                {item.label}
              </span>

              {/* Ripple effect on tap */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 transform scale-0 group-active:scale-100 transition-transform duration-150 rounded-lg"></div>
              </div>
            </Button>
          )
        })}

        {/* Shopping Cart with enhanced design */}
        <Button
          variant="ghost"
          size="sm"
          onClick={openCart}
          className="flex flex-col items-center gap-1.5 p-3 h-auto hover:bg-primary/10 transition-all duration-300 text-gray-500 relative flex-1 min-w-0 group"
        >
          <div className="relative transition-all duration-300 group-hover:transform group-hover:scale-105">
            {/* Cart badge with improved design */}
            <ShoppingBag className="h-5 w-5 relative z-10" />
            {getTotalItems() > 0 && (
              <>
                {/* Badge background with glow effect */}
                <div className="absolute -top-2 -right-2 bg-primary rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white text-xs font-bold">
                    {getTotalItems() > 9 ? '9+' : getTotalItems()}
                  </span>
                </div>
                {/* Subtle glow ring */}
                <div className="absolute -top-2 -right-2 bg-primary/30 rounded-full h-6 w-6 animate-ping"></div>
              </>
            )}
          </div>

          <span className="text-xs font-medium tracking-wide text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
            Cart
          </span>

          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 transform scale-0 group-active:scale-100 transition-transform duration-150 rounded-lg"></div>
          </div>
        </Button>
      </div>

      {/* Bottom safe area for iOS devices */}
      <div className="h-safe-area-inset-bottom bg-white/95"></div>
    </div>
  )
}

export default MobileBottomNavbar