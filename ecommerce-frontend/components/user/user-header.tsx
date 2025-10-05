"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { LogOut, ShoppingBagIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { buildCloudinaryUrl } from "@/utils/image-upload";

export default function UserHeader() {
  const router = useRouter();
  const { profile, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const displayName = profile?.userName || 'User';
  const displayEmail = profile?.email || 'user@example.com';
  const avatarUrl = profile?.avatar ? buildCloudinaryUrl(profile.avatar) : undefined;
  const initials = displayName.split(' ').map((n: string) => n.charAt(0)).join('').substring(0, 2).toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6 ml-12 lg:ml-0">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {isLoading ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl || undefined} alt={displayName} />
                    <AvatarFallback className="bg-gray-200 text-gray-900">
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
              <DropdownMenuItem onClick={() => router.push("/")}>
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                <span>Back to Shop</span>
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
