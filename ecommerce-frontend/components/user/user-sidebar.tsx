"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, Package, Lock, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const navigation = [
  {
    name: "My Orders",
    href: "/user/orders",
    icon: Package,
  },
  {
    name: "Profile",
    href: "/user/profile",
    icon: User,
  },
  {
    name: "Change Password",
    href: "/user/change-password",
    icon: Lock,
  },
];

function SidebarContent() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/user/login";
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <Link href="/" className="hover:opacity-80 transition-opacity ">
          <h1 className="text-xl font-bold text-gray-900  cursor-pointer">
            MY ACCOUNT
          </h1>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
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
        <div className="mt-auto py-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default function UserSidebar() {
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
