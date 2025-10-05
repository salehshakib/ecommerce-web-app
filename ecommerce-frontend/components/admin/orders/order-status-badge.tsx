"use client";

import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";

interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Package className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Truck className="w-3 h-3 mr-1" />
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground">
            {status || "Unknown"}
          </Badge>
        );
    }
  };

  return getStatusBadge(status);
}