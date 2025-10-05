"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Home,
  FileText,
  Menu,
  Ruler,
  FolderOpen,
  Calendar,
  GraduationCap,
  UserIcon,
} from "lucide-react";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import Image from "next/image";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    name: "Types",
    href: "/admin/types",
    icon: FileText,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    name: "Classes",
    href: "/admin/classes",
    icon: GraduationCap,
  },
  {
    name: "Investors",
    href: "/admin/investors",
    icon: UserIcon,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

function SidebarContent() {
  const pathname = usePathname();
  const { settings } = useCombinedDataContext();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6">
      <div className="flex h-16 shrink-0 items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-xl flex items-center justify-center gap-3 font-bold text-gray-900 cursor-pointer">
            {(settings?.siteBranding?.siteLogo !== "" ||
              settings?.siteBranding?.siteLogo) && (
              <Image
                src={settings?.siteBranding?.siteLogo || "logo"}
                alt="logo"
                width={40}
                height={40}
                className="object-contain rounded-md"
              />
            )}

            {settings?.siteBranding?.siteName}
          </h1>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </nav>
    </div>
  );
}

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden fixed top-4 left-4 z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  );
}
