import UserRouteGuard from "@/components/auth/user-route-guard";
import CartDrawer from "@/components/cart-drawer";
import UserHeader from "@/components/user/user-header";
import UserSidebar from "@/components/user/user-sidebar";
import type React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is handled by UserRouteGuard
  // Providers are handled by root layout
  return (
    <UserRouteGuard>
      <div className="min-h-screen bg-gray-50">
        <UserSidebar />
        <div className="lg:pl-64">
          <UserHeader />
          <main className="flex-1 p-4 sm:p-6 pt-16 lg:pt-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
        <CartDrawer />
      </div>
    </UserRouteGuard>
  );
}
