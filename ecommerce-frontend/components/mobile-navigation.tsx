"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  User,
  ShoppingBag,
  LogOut,
  Package,
  Lock,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { buildCloudinaryUrl } from "@/utils/image-upload";
import { Skeleton } from "@/components/ui/skeleton";
import { useCombinedDataContext } from "@/providers/combined-data-provider";

interface NavItem {
  name: string;
  href: string;
  hasMegaMenu: boolean;
}

interface MobileNavigationProps {
  navItems: NavItem[];
  isHomePage: boolean;
  isHeaderHovered: boolean;
  isScrolled: boolean;
  showMegaMenu: string | null;
  isCartOpen: boolean;
  isHydrated: boolean;
  handleCollectionClick: (filter: string) => void;
}

const MobileNavigation = ({
  navItems,
  isHomePage,
  isHeaderHovered,
  isScrolled,
  showMegaMenu,
  isCartOpen,
  isHydrated,
  handleCollectionClick,
}: MobileNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null
  );
  const { openCart, getTotalItems } = useCart();
  const { profile, token, isLoading, logout, isAdmin, isUser } = useAuth();
  const { categories, types } = useCombinedDataContext();
  const router = useRouter();

  // Get first 5 categories and types for the mega menu
  const displayCategories = categories?.slice(0, 5) || [];
  const displayTypes = types?.slice(0, 5) || [];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        !target.closest("[data-mobile-menu]") &&
        !target.closest("[data-mobile-menu-toggle]")
      ) {
        setIsMobileMenuOpen(false);
        setMobileSubmenuOpen(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button and Action Buttons */}
      <div className="flex items-center gap-2 md:hidden">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="hover:text-primary transition-all duration-300 hover:bg-transparent hover:scale-110 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-mobile-menu-toggle
        >
          <div className="relative size-5">
            {/* Menu Icon */}
            <Menu
              className={`absolute inset-0 size-5 transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? "opacity-0 rotate-180 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            {/* X Icon */}
            <X
              className={`absolute inset-0 size-5 transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-180 scale-50"
              }`}
            />
          </div>
        </Button>
      </div>

      {/* Mobile Navigation Menu - Full Page Overlay */}
      <div
        className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 right-0 bg-white shadow-xl transform transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-90"
          }`}
          style={{
            paddingTop: "140px", // Account for header space
            minHeight: "100vh",
          }}
          data-mobile-menu
        >
          {/* Close button at top of drawer */}
          <div className="absolute top-20 right-4 z-[9999] ">
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary transition-all duration-300 hover:bg-transparent hover:scale-110"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="size-6" />
            </Button>
          </div>

          {/* Content Container with scroll */}
          <div className="h-[70vh] overflow-y-auto ">
            <nav className="px-6 -mt-2 pb-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <div
                    key={item.name}
                    className={`transform transition-all duration-500 ease-out ${
                      isMobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen
                        ? `${index * 100}ms`
                        : "0ms",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (item.hasMegaMenu) {
                          setMobileSubmenuOpen(
                            mobileSubmenuOpen === item.name ? null : item.name
                          );
                        } else {
                          router.push(item.href);
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className={`flex items-center justify-between w-full text-left text-lg font-medium tracking-wide hover:text-primary transition-all duration-300 py-4 px-2 rounded-lg hover:bg-gray-50 ${
                        mobileSubmenuOpen === item.name
                          ? "text-primary bg-gray-50"
                          : "text-foreground"
                      }`}
                    >
                      <span className="font-semibold">{item.name}</span>
                      {item.hasMegaMenu && (
                        <ChevronDown
                          className={`size-5 transform transition-all duration-300 ${
                            mobileSubmenuOpen === item.name
                              ? "rotate-180 text-primary"
                              : "text-gray-400"
                          }`}
                        />
                      )}
                    </button>

                    {/* Mobile Submenu for FRAGRANCES */}
                    {item.hasMegaMenu &&
                      mobileSubmenuOpen === item.name &&
                      item.name === "FRAGRANCES" && (
                        <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                          {/* All Fragrances Link */}
                          <button
                            onClick={() => {
                              handleCollectionClick("all");
                              setIsMobileMenuOpen(false);
                              setMobileSubmenuOpen(null);
                            }}
                            className="block w-full text-left text-base text-gray-600 hover:text-primary transition-colors py-3 px-3 rounded-md hover:bg-gray-100/50"
                          >
                            All Fragrances
                          </button>

                          {/* Categories Section */}
                          <div className="pt-2 pb-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                              Categories
                            </p>
                            {displayCategories.map((category, catIndex) => (
                              <button
                                key={category._id}
                                onClick={() => {
                                  handleCollectionClick(category.name);
                                  setIsMobileMenuOpen(false);
                                  setMobileSubmenuOpen(null);
                                }}
                                className={`block w-full text-left text-base text-gray-600 hover:text-primary transition-all duration-300 py-3 px-3 rounded-md hover:bg-gray-100/50 transform ${
                                  mobileSubmenuOpen === item.name
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-4 opacity-0"
                                }`}
                                style={{
                                  transitionDelay:
                                    mobileSubmenuOpen === item.name
                                      ? `${(catIndex + 1) * 50}ms`
                                      : "0ms",
                                }}
                              >
                                {category.name}
                              </button>
                            ))}
                          </div>

                          {/* Types Section */}
                          <div className="pt-2 pb-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                              Popular
                            </p>
                            {displayTypes.map((type, typeIndex) => (
                              <button
                                key={type._id}
                                onClick={() => {
                                  router.push(`/collections?type=${type.name}`);
                                  setIsMobileMenuOpen(false);
                                  setMobileSubmenuOpen(null);
                                }}
                                className={`block w-full text-left text-base text-gray-600 hover:text-primary transition-all duration-300 py-3 px-3 rounded-md hover:bg-gray-100/50 transform ${
                                  mobileSubmenuOpen === item.name
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-4 opacity-0"
                                }`}
                                style={{
                                  transitionDelay:
                                    mobileSubmenuOpen === item.name
                                      ? `${(displayCategories.length + typeIndex + 1) * 50}ms`
                                      : "0ms",
                                }}
                              >
                                {type.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))}

                {/* Mobile-specific items with animation */}
                <div
                  className={`pt-6 mt-6 border-t border-gray-200 transform transition-all duration-500 ease-out space-y-2 ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${navItems.length * 100}ms`
                      : "0ms",
                  }}
                >
                  {/* Cart Button */}
                  <button
                    onClick={() => {
                      openCart();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-4 text-left text-lg font-medium tracking-wide hover:text-primary transition-all duration-300 py-4 px-2 rounded-lg hover:bg-gray-50 w-full relative"
                  >
                    <ShoppingBag className="size-6 text-gray-400" />
                    <span className="font-semibold">SHOPPING CART</span>
                    {isHydrated && getTotalItems() > 0 && (
                      <span className="absolute left-8 top-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform -translate-x-2 -translate-y-2">
                        {getTotalItems()}
                      </span>
                    )}
                  </button>

                  {/* Store Locator */}
                  <button
                    onClick={() => {
                      router.push("/store-locator");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-4 text-left text-lg font-medium tracking-wide hover:text-primary transition-all duration-300 py-4 px-2 rounded-lg hover:bg-gray-50 w-full"
                  >
                    <MapPin className="size-6 text-gray-400" />
                    <span className="font-semibold">STORE LOCATOR</span>
                  </button>

                  {/* User Profile Section */}
                  {isHydrated && !isLoading && token && profile ? (
                    <>
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center gap-4 py-4 px-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                profile?.avatar
                                  ? buildCloudinaryUrl(profile.avatar) ||
                                    undefined
                                  : undefined
                              }
                              alt={profile?.userName}
                            />
                            <AvatarFallback className="bg-gray-800 text-white text-sm font-medium">
                              {(profile?.userName || "U")
                                .split(" ")
                                .map((n: string) => n.charAt(0))
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-lg">
                              {profile?.userName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {profile?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* User Actions */}
                      {isAdmin && (
                        <button
                          onClick={() => {
                            router.push("/admin");
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-4 text-left text-lg font-medium tracking-wide hover:text-primary transition-all duration-300 py-4 px-2 rounded-lg hover:bg-gray-50 w-full"
                        >
                          <LayoutDashboard className="size-6 text-gray-400" />
                          <span className="font-semibold">DASHBOARD</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (isAdmin) {
                            router.push("/admin/profile");
                          } else {
                            router.push("/user/profile");
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 text-left text-lg font-medium tracking-wide hover:text-primary transition-all duration-300 py-4 px-2 rounded-lg hover:bg-gray-50 w-full"
                      >
                        <User className="size-6 text-gray-400" />
                        <span className="font-semibold">PROFILE</span>
                      </button>

                      {isUser && (
                        <button
                          onClick={() => {
                            router.push("/user/orders");
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-4 text-left text-lg font-medium tracking-wide hover:text-primary transition-all duration-300 py-4 px-2 rounded-lg hover:bg-gray-50 w-full"
                        >
                          <Package className="size-6 text-gray-400" />
                          <span className="font-semibold">MY ORDERS</span>
                        </button>
                      )}

                      {(isUser || isAdmin) && (
                        <button
                          onClick={() => {
                            if (isAdmin) {
                              router.push("/admin/change-password");
                            } else {
                              router.push("/user/change-password");
                            }
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-4 text-left text-lg font-medium tracking-wide hover:text-primary transition-all duration-300 py-4 px-2 rounded-lg hover:bg-gray-50 w-full"
                        >
                          <Lock className="size-6 text-gray-400" />
                          <span className="font-semibold">CHANGE PASSWORD</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 text-left text-lg font-medium tracking-wide hover:text-red-600 transition-all duration-300 py-4 px-2 rounded-lg hover:bg-red-50 w-full"
                      >
                        <LogOut className="size-6 text-red-400" />
                        <span className="font-semibold text-red-600">
                          LOGOUT
                        </span>
                      </button>
                    </>
                  ) : isHydrated && !isLoading ? (
                    <button
                      onClick={() => {
                        router.push("/login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 text-left text-lg font-medium tracking-wide hover:text-primary transition-all duration-300 py-4 px-2 rounded-lg hover:bg-gray-50 w-full"
                    >
                      <User className="size-6 text-gray-400" />
                      <span className="font-semibold">LOGIN</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-4 py-4 px-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>

            {/* Bottom fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
