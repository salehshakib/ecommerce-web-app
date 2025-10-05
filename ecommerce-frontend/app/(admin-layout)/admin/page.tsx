"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Package, ShoppingCart, Users } from "lucide-react";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { useOrdersQuery } from "@/hooks/queries/use-orders-query";
import { useUsersQuery } from "@/hooks/queries/use-users-query";
import { useInvestorsQuery } from "@/hooks/queries/use-investor-query";

export default function AdminDashboard() {
  const { products } = useCombinedDataContext();
  const orders = useOrdersQuery();
  const customers = useUsersQuery();
  const investors = useInvestorsQuery();

  const stats = [
    {
      title: "Total Products",
      value: products?.length.toString(),
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: orders.data?.length.toString(),
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: "Total Customers",
      value: customers.data?.length.toString(),
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Total Investors",
      value: investors?.data?.investors?.length.toString(),
      icon: BarChart3,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back to your admin panel
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1 self-center sm:self-auto">
          Admin Panel
        </Badge>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 ">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
