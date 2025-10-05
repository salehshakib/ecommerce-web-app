"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Loading } from "@/components/ui/loading";
import {
  useOrdersQuery,
  useOrderOperations,
  type Order,
} from "@/hooks/queries/use-orders-query";
import {
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from "@/hooks/mutations/use-orders-mutations";
import { OrderDetailsModal } from "@/components/admin/orders/order-details-modal";
import { OrderStatusUpdateModal } from "@/components/admin/orders/order-status-update-modal";
import { OrderDeleteDialog } from "@/components/admin/orders/order-delete-dialog";
import { createOrdersTableColumns } from "@/components/admin/orders/orders-table-columns";

export default function OrdersPage() {
  const { data: orders = [], isLoading, error } = useOrdersQuery();
  const { invalidateOrders } = useOrderOperations();
  const updateOrderStatusMutation = useUpdateOrderStatusMutation();
  const deleteOrderMutation = useDeleteOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [deleteOrderState, setDeleteOrderState] = useState<Order | null>(null);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setIsStatusModalOpen(true);
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrderMutation.mutateAsync(orderId);
      setDeleteOrderState(null);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatusMutation.mutateAsync({
        orderId,
        status: newStatus,
      });
      setIsStatusModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const columns = createOrdersTableColumns({
    onViewDetails: handleViewDetails,
    onUpdateStatus: handleUpdateStatus,
    onDeleteOrder: setDeleteOrderState,
  });

  if (isLoading) {
    return <Loading message="Loading orders..." size="md" fullScreen />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Orders
          </h2>
          <p className="text-gray-600">
            There was an error loading the orders data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Orders Management
        </h1>
        <p className="text-muted-foreground mt-2">
          View, manage, and track all customer orders
        </p>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        searchKey="user"
        searchPlaceholder="Search orders by customer..."
      />

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedOrder(null);
        }}
      />

      <OrderStatusUpdateModal
        order={selectedOrder}
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedOrder(null);
        }}
        onStatusChange={handleStatusUpdate}
        isUpdating={updateOrderStatusMutation.isPending}
      />

      <OrderDeleteDialog
        order={deleteOrderState}
        isOpen={!!deleteOrderState}
        onClose={() => setDeleteOrderState(null)}
        onDelete={handleDeleteOrder}
        isDeleting={deleteOrderMutation.isPending}
      />
    </div>
  );
}
