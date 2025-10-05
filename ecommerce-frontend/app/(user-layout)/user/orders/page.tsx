"use client";

import OrderCard from "@/components/orders/order-card";
import OrderDetailsModal from "@/components/orders/order-details-modal";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useUserOrdersQuery } from "@/hooks/queries/use-orders-query";
import { Package } from "lucide-react";
import { useState } from "react";

export default function UserOrders() {
  const { data: orders = [], isLoading: loading } = useUserOrdersQuery();

  // Modal states
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowOrderDetails(true);
  };

  if (loading) {
    return (
      <Loading message="Loading your orders..." size="md" fullScreen={true} />
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-wider">
          My Orders
        </h2>
        <p className="text-muted-foreground mt-2">
          Track and manage your orders
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Order History</h3>
        </div>

        {orders.length === 0 ? (
          <div className="px-4 sm:px-6 py-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No orders found</p>
            <Button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {orders?.map((order) => (
              <OrderCard
                key={order?._id}
                order={order}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <OrderDetailsModal
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        orderId={selectedOrderId}
      />
    </div>
  );
}
