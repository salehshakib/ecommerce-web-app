"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
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
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import Image from "next/image";
import MobileNavigation from "@/components/mobile-navigation";

interface HeaderProps {
  className?: string;
}

const navItems = [
  { name: "SEASONAL SELECTION", href: "/collections", hasMegaMenu: false },
  { name: "FRAGRANCES", href: "#fragrances", hasMegaMenu: true },
  { name: "BOOK A PRIVATE EVENT", href: "/private-event", hasMegaMenu: false },
  { name: "BOOK A PRIVATE CLASS", href: "/private-class", hasMegaMenu: false },
  { name: "CONTACT US", href: "/contact", hasMegaMenu: false },
  { name: "ABOUT US", href: "/about", hasMegaMenu: false },
  { name: "BECOME A DISTRIBUTER", href: "/investors", hasMegaMenu: false },
];

const Header = ({ className }: HeaderProps = {}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState<string | null>(null);
  const [megaMenuClickOpened, setMegaMenuClickOpened] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { openCart, getTotalItems, isOpen: isCartOpen } = useCart();
  const { profile, token, isLoading, logout, isAdmin, isUser } = useAuth();
  const { settings, categories, types } = useCombinedDataContext();
  const router = useRouter();
  const pathname = usePathname();

  const siteBranding = settings?.siteBranding;

  // Get first 5 categories and types for the mega menu
  const displayCategories = categories?.slice(0, 5) || [];
  const displayTypes = types?.slice(0, 5) || [];

  const isHomePage = pathname === "/";

  const handleNavClick = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.hasMegaMenu) {
      const isOpening = showMegaMenu !== item.name;
      setShowMegaMenu(isOpening ? item.name : null);
      setMegaMenuClickOpened(isOpening);
    } else {
      router.push(item.href);
    }
  };

  const handleMegaMenuLeave = () => {
    if (megaMenuClickOpened) {
      setShowMegaMenu(null);
      setMegaMenuClickOpened(false);
      setIsHeaderHovered(false);
    }
  };

  const handleHeaderMouseLeave = () => {
    if (!showMegaMenu) {
      setIsHeaderHovered(false);
    }
  };

  const handleCollectionClick = (categoryName: string) => {
    // Navigate to collections page with category filter
    if (categoryName === "all") {
      router.push("/collections");
    } else {
      router.push(`/collections?category=${categoryName}`);
    }
    setShowMegaMenu(null);
    setMegaMenuClickOpened(false);
  };

  const handleTypeClick = (typeName: string) => {
    // Navigate to collections page with type filter
    router.push(`/collections?type=${typeName}`);
    setShowMegaMenu(null);
    setMegaMenuClickOpened(false);
  };

  useEffect(() => {
    setIsHydrated(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        !target.closest("[data-mega-menu]") &&
        !target.closest("[data-nav-item]")
      ) {
        setShowMegaMenu(null);
        setMegaMenuClickOpened(false);
      }
    };

    if (showMegaMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showMegaMenu]);

  return (
    <div className="relative">
      <header
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out top-[36px] md:top-[52px]",
          isHomePage
            ? isScrolled || isHeaderHovered || showMegaMenu || isCartOpen
              ? "bg-white"
              : "bg-transparent"
            : "bg-white",
          className
        )}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={handleHeaderMouseLeave}
      >
        {/* Top Bar */}
        <div
          className={`${
            isHomePage
              ? isHeaderHovered || isScrolled || showMegaMenu || isCartOpen
                ? "text-foreground"
                : "text-white"
              : "text-foreground"
          } relative z-10 flex items-center justify-between px-4 sm:px-2 pt-6 pb-4 md:py-3 text-sm transition-colors duration-500`}
        >
          {/* Left section - Mobile Navigation */}
          <div className="flex items-center">
            <MobileNavigation
              navItems={navItems}
              isHomePage={isHomePage}
              isHeaderHovered={isHeaderHovered}
              isScrolled={isScrolled}
              showMegaMenu={showMegaMenu}
              isCartOpen={isCartOpen}
              isHydrated={isHydrated}
              handleCollectionClick={handleCollectionClick}
            />
          </div>

          <div className="absolute left-1/2 md:pt-2 transform -translate-x-1/2">
            <button
              onClick={() => router.push("/")}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-300 flex flex-col items-center"
            >
              {siteBranding?.siteLogo ? (
                <div className="flex items-center gap-3">
                  <Image
                    src={siteBranding.siteLogo}
                    alt={siteBranding.siteName || "Logo"}
                    width={32}
                    height={32}
                    className="object-contain rounded-md"
                  />
                  <h1
                    className={`text-lg font-bold tracking-wider text-shadow-sm transition-colors duration-500 whitespace-nowrap uppercase ${
                      isHomePage
                        ? isHeaderHovered ||
                          isScrolled ||
                          showMegaMenu ||
                          isCartOpen
                          ? "text-foreground"
                          : "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {siteBranding?.siteName || "PERFUME HOUSE"}
                  </h1>
                </div>
              ) : (
                <h1
                  className={`text-xl font-bold tracking-wider text-shadow-sm transition-colors duration-500 whitespace-nowrap ${
                    isHomePage
                      ? isHeaderHovered ||
                        isScrolled ||
                        showMegaMenu ||
                        isCartOpen
                        ? "text-foreground"
                        : "text-white"
                      : "text-foreground"
                  }`}
                >
                  {siteBranding?.siteName || "PERFUME HOUSE"}
                </h1>
              )}
            </button>
          </div>

          {/* Mobile Right section - User Avatar */}
          <div className="md:hidden flex items-center">
            {isHydrated && !isLoading && token && profile ? (
              <button
                className="p-1 hover:bg-transparent rounded-md transition-colors"
                onClick={() => router.push(isAdmin ? "/admin/profile" : "/user/profile")}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={
                      profile?.avatar
                        ? buildCloudinaryUrl(profile.avatar) || undefined
                        : undefined
                    }
                    alt={profile?.userName}
                  />
                  <AvatarFallback
                    className={`text-xs font-medium ${
                      isHomePage
                        ? isHeaderHovered ||
                          isScrolled ||
                          showMegaMenu ||
                          isCartOpen
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {(profile?.userName || "U")
                      .split(" ")
                      .map((n: string) => n.charAt(0))
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            ) : isHydrated && !isLoading ? (
              <button
                className="p-1.5 hover:text-primary transition-all duration-300 hover:bg-transparent hover:scale-110 rounded-md"
                onClick={() => router.push("/login")}
              >
                <User className="size-5" />
              </button>
            ) : (
              <Skeleton className="h-6 w-6 rounded-full" />
            )}
          </div>

          {/* Right section - Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary transition-all duration-300 hover:bg-transparent hover:scale-110"
              onClick={() => router.push("/store-locator")}
            >
              <MapPin className="size-5" />
            </Button>
            {isHydrated && !isLoading && token && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-transparent rounded-md transition-colors">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={
                          profile?.avatar
                            ? buildCloudinaryUrl(profile.avatar) || undefined
                            : undefined
                        }
                        alt={profile?.userName}
                      />
                      <AvatarFallback
                        className={`text-xs font-medium ${
                          isHomePage
                            ? isHeaderHovered ||
                              isScrolled ||
                              showMegaMenu ||
                              isCartOpen
                              ? "bg-gray-800 text-white"
                              : "bg-white text-gray-800"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {(profile?.userName || "U")
                          .split(" ")
                          .map((n: string) => n.charAt(0))
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`w-56 ${
                    isHomePage &&
                    !(
                      isHeaderHovered ||
                      isScrolled ||
                      showMegaMenu ||
                      isCartOpen
                    )
                      ? "bg-white/95 backdrop-blur-sm border-white/20"
                      : ""
                  }`}
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile?.userName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profile?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => {
                        router.push("/admin");
                      }}
                      className={
                        isHomePage &&
                        !(
                          isHeaderHovered ||
                          isScrolled ||
                          showMegaMenu ||
                          isCartOpen
                        )
                          ? "hover:bg-gray-100/50 focus:bg-gray-100/50"
                          : ""
                      }
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => {
                      if (isAdmin) {
                        router.push("/admin/profile");
                      } else {
                        router.push("/user/profile"); // Default fallback
                      }
                    }}
                    className={
                      isHomePage &&
                      !(
                        isHeaderHovered ||
                        isScrolled ||
                        showMegaMenu ||
                        isCartOpen
                      )
                        ? "hover:bg-gray-100/50 focus:bg-gray-100/50"
                        : ""
                    }
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {isUser && (
                    <DropdownMenuItem
                      onClick={() => router.push("/user/orders")}
                      className={
                        isHomePage &&
                        !(
                          isHeaderHovered ||
                          isScrolled ||
                          showMegaMenu ||
                          isCartOpen
                        )
                          ? "hover:bg-gray-100/50 focus:bg-gray-100/50"
                          : ""
                      }
                    >
                      <Package className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </DropdownMenuItem>
                  )}
                  {(isUser || isAdmin) && (
                    <DropdownMenuItem
                      onClick={() => {
                        if (isAdmin) {
                          router.push("/admin/change-password");
                        } else {
                          router.push("/user/change-password");
                        }
                      }}
                      className={
                        isHomePage &&
                        !(
                          isHeaderHovered ||
                          isScrolled ||
                          showMegaMenu ||
                          isCartOpen
                        )
                          ? "hover:bg-gray-100/50 focus:bg-gray-100/50"
                          : ""
                      }
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Change Password</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className={
                      isHomePage &&
                      !(
                        isHeaderHovered ||
                        isScrolled ||
                        showMegaMenu ||
                        isCartOpen
                      )
                        ? "hover:bg-gray-100/50 focus:bg-gray-100/50"
                        : ""
                    }
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isHydrated && !isLoading ? (
              <button
                className="p-2 hover:text-primary transition-all duration-300 hover:bg-transparent hover:scale-110 rounded-md"
                onClick={() => router.push("/login")}
              >
                <User className="size-5" />
              </button>
            ) : (
              <Skeleton className="h-7 w-7 rounded-full" />
            )}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:text-primary transition-all duration-300 hover:bg-transparent hover:scale-110"
              onClick={openCart}
            >
              <ShoppingBag className="size-5" />
              {isHydrated && getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`relative z-10 hidden md:flex items-center justify-center gap-8 px-6 transition-all duration-500 ease-in-out ${
            isHomePage
              ? isScrolled || isHeaderHovered || showMegaMenu || isCartOpen
                ? "py-6 opacity-100 translate-y-0"
                : "py-0 opacity-0 -translate-y-4 pointer-events-none"
              : "py-6 opacity-100 translate-y-0"
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              data-nav-item
              onClick={(e) => handleNavClick(item, e)}
              className={`relative text-sm font-medium tracking-wide hover:text-primary transition-all duration-500 text-shadow-sm ${
                isHomePage
                  ? isHeaderHovered || isScrolled || showMegaMenu || isCartOpen
                    ? "text-foreground"
                    : "text-white"
                  : "text-foreground"
              } ${showMegaMenu === item.name ? "text-primary" : ""}`}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name}
              <div
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                  hoveredItem === item.name || showMegaMenu === item.name
                    ? "w-full opacity-100"
                    : "w-0 opacity-0"
                }`}
              />
            </button>
          ))}
        </nav>
      </header>

      {showMegaMenu === "FRAGRANCES" && (
        <div
          data-mega-menu
          className="fixed left-0 right-0 bg-white shadow-lg z-30 hidden md:block"
          style={{
            top: "150px", // marquee (36px) + gap (16px) + header (~88px)
          }}
          onMouseLeave={handleMegaMenuLeave}
          onMouseEnter={() => setIsHeaderHovered(true)}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Dynamic Categories */}
              <div>
                <h3 className="font-semibold text-sm mb-4 tracking-wide">
                  CATEGORIES
                </h3>
                <ul className="space-y-2">
                  {/* All Fragrances Link */}
                  <li>
                    <button
                      onClick={() => handleCollectionClick("all")}
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      All Fragrances
                    </button>
                  </li>
                  {/* Dynamic Categories from API */}
                  {displayCategories.map((category) => (
                    <li key={category._id}>
                      <button
                        onClick={() => handleCollectionClick(category.name)}
                        className="text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Types - Dynamic from API */}
              <div>
                <h3 className="font-semibold text-sm mb-4 tracking-wide">
                  POPULAR
                </h3>
                <ul className="space-y-2">
                  {displayTypes.map((type) => (
                    <li key={type._id}>
                      <button
                        onClick={() => handleTypeClick(type.name)}
                        className="text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {type.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src="/luxury-perfume-discovery-set-with-golden-accents.jpg"
                  alt="A Journey to the Heart of Marly"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {showMegaMenu === "GIFTS" && (
        <div
          data-mega-menu
          className="fixed left-0 right-0 bg-white shadow-lg z-30 border-t"
          style={{
            top: "140px", // marquee (36px) + gap (16px) + header (~88px)
          }}
          onMouseLeave={handleMegaMenuLeave}
          onMouseEnter={() => setIsHeaderHovered(true)}
        >
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-4 gap-6">
              {giftsMegaMenu.map((gift) => (
                <button
                  key={gift.name}
                  onClick={() => handleCollectionClick(gift.filter)}
                  className="group text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={gift.image || "/placeholder.svg"}
                      alt={gift.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-semibold text-sm tracking-wide group-hover:text-primary transition-colors">
                    {gift.name}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Header;
