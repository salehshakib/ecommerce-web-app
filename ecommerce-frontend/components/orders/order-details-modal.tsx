"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useOrderQuery, Order } from "@/hooks/queries/use-orders-query";
import { Calendar, Package, CreditCard, Loader2 } from "lucide-react";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  orderId,
}: OrderDetailsModalProps) {
  const {
    data: selectedOrder,
    isLoading: loading,
    error,
  } = useOrderQuery(orderId || "");

  console.log({ selectedOrder });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Order Details - #{selectedOrder?._id || orderId}
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <div className="text-lg">Loading order details...</div>
            </div>
          </div>
        )}

        {error && (
          <div className="py-4">
            <div className="text-red-600 text-center">
              {error instanceof Error
                ? error.message
                : "Failed to load order details"}
            </div>
          </div>
        )}

        {selectedOrder && !loading && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold">
                    {formatDate(selectedOrder?.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge className={getStatusColor(selectedOrder?.status)}>
                    {selectedOrder?.status?.charAt(0)?.toUpperCase() +
                      selectedOrder?.status?.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-lg">
                    {formatPrice(selectedOrder?.totalAmount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {selectedOrder?.items?.map((item) => (
                  <div
                    key={item?._id}
                    className="flex items-start gap-4 p-4 border rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">
                        {item?.product?.name}
                      </h4>
                      <p className="text-gray-600">{item?.product?.brand}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item?.product?.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">
                          Volume: {item?.volume}
                        </span>
                        <span className="text-sm text-gray-600">
                          Qty: {item?.quantity}
                        </span>
                        <span className="text-sm text-gray-600">
                          Price: {formatPrice(item?.price)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {formatPrice(item?.subTotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
