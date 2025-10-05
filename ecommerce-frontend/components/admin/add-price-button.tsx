"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { ProductPriceModal } from "@/components/admin/product-price-modal";
import type { Product } from "@/types/product";

interface AddPriceButtonProps {
  products: Product[];
  onSuccess: () => void;
}

export function AddPriceButton({ products, onSuccess }: AddPriceButtonProps) {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const handleAddPrice = () => {
    setIsPriceModalOpen(true);
  };

  const handlePriceSuccess = () => {
    onSuccess();
    setIsPriceModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleAddPrice}
        variant="outline"
        className="bg-green-50 hover:bg-primary border-green-200 hover:text-white text-green-700"
      >
        <DollarSign className="mr-2 h-4 w-4" />
        Add Price
      </Button>

      <ProductPriceModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        products={products}
        onSuccess={handlePriceSuccess}
      />
    </>
  );
}