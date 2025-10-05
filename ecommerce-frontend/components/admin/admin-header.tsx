"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu, Search, Settings, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { buildCloudinaryUrl } from "@/utils/image-upload";

export default function AdminHeader() {
  const router = useRouter();
  const { profile, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const displayName = profile?.userName || "Admin";
  const displayEmail = profile?.email || "admin@example.com";
  const avatarUrl = profile?.avatar
    ? buildCloudinaryUrl(profile.avatar)
    : undefined;
  const initials =
    displayName
      .split(" ")
      .map((n: string) => n.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase() || "AD";

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 ml-12 lg:ml-0">
        <div className="relative flex flex-1 items-center">
          {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <Input
            className="pl-10 sm:w-64 bg-gray-50 border-gray-300 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
            placeholder="Search products, orders, customers..."
            type="search"
          /> */}
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {isLoading ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    {avatarUrl && (
                      <AvatarImage src={avatarUrl} alt={displayName} />
                    )}
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {displayEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/admin/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
