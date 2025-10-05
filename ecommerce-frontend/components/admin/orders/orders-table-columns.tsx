"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, User } from "lucide-react";
import { Order, OrderItem } from "@/hooks/queries/use-orders-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buildCloudinaryUrl } from "@/utils/image-upload";
import { OrderStatusBadge } from "./order-status-badge";

interface OrdersTableColumnsProps {
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (order: Order) => void;
  onDeleteOrder: (order: Order) => void;
}

export function createOrdersTableColumns({
  onViewDetails,
  onUpdateStatus,
  onDeleteOrder
}: OrdersTableColumnsProps): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm">
          {row.getValue("_id")?.toString().slice(-8) || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: "Customer",
      cell: ({ row }) => {
        const order = row.original;
        const user = order.user;
        if (user) {
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.avatar ? buildCloudinaryUrl(user.avatar) || undefined : undefined}
                  alt={user.userName}
                />
                <AvatarFallback className="bg-gray-100">
                  <User className="h-4 w-4 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{user.userName}</div>
                <div className="text-gray-500">{user.email}</div>
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gray-100">
                <User className="h-4 w-4 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm text-gray-500">
              ID: {order.userId?.slice(-8) || "N/A"}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.getValue("createdAt")).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.getValue("items") as OrderItem[];
        return (
          <div className="text-sm">
            {items?.length || 0} item{(items?.length || 0) !== 1 ? "s" : ""}
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ row }) => (
        <div className="font-medium">
          ${(row.getValue("totalAmount") as number)?.toFixed(2) || "0.00"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <OrderStatusBadge status={row.getValue("status")} />,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(order)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateStatus(order)}>
                Update Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteOrder(order)}
                className="text-destructive"
              >
                Delete Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}