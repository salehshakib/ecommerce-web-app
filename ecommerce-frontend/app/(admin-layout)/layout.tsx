import type React from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import AdminRouteGuard from "@/components/auth/admin-route-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is handled by AdminRouteGuard
  // Providers are handled by root layout
  return (
    <AdminRouteGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="lg:pl-64">
          <AdminHeader />
          <main className="flex-1 p-4 sm:p-6 pt-16 lg:pt-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
