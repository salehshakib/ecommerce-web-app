"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/hooks/queries/use-orders-query";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onViewDetails: (orderId: string) => void;
}

export default function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div>
              <p className="font-semibold text-gray-900">Order #{order?._id}</p>
              <p className="text-sm text-gray-500">
                {formatDate(order?.createdAt)} • {order?.items?.length} item
                {order?.items?.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Badge className={getStatusColor(order?.status)}>
            {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
          </Badge>
          <p className="font-semibold text-gray-900 text-center sm:text-left">
            {formatPrice(order?.totalAmount)}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onViewDetails(order?._id)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
