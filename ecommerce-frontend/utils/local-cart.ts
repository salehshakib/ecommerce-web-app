import { CartItem } from "@/contexts/cart-context";

export interface LocalCartItem {
  productId: string;
  productPriceIds: string[];
  quantity: number;
  timestamp: number;
}

const LOCAL_CART_KEY = "perfume_cart_items";
const MAX_STORAGE_DAYS = 7; // Keep items for 7 days

export const saveToLocalCart = (item: LocalCartItem): void => {
  try {
    const existingItems = getLocalCartItems();

    // Check if item already exists, update quantity if so
    const existingIndex = existingItems.findIndex(
      (existing) =>
        existing.productId === item.productId &&
        JSON.stringify(existing.productPriceIds.sort()) === JSON.stringify(item.productPriceIds.sort())
    );

    if (existingIndex >= 0) {
      existingItems[existingIndex].quantity += item.quantity;
      existingItems[existingIndex].timestamp = Date.now();
    } else {
      existingItems.push({
        ...item,
        timestamp: Date.now(),
      });
    }

    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(existingItems));
  } catch (error) {
    console.error("Failed to save to local cart:", error);
  }
};

export const getLocalCartItems = (): LocalCartItem[] => {
  try {
    const stored = localStorage.getItem(LOCAL_CART_KEY);
    if (!stored) return [];

    const items: LocalCartItem[] = JSON.parse(stored);
    const now = Date.now();
    const maxAge = MAX_STORAGE_DAYS * 24 * 60 * 60 * 1000; // Convert to milliseconds

    // Filter out expired items
    const validItems = items.filter(
      (item) => now - item.timestamp < maxAge
    );

    // Update localStorage if we filtered out any items
    if (validItems.length !== items.length) {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(validItems));
    }

    return validItems;
  } catch (error) {
    console.error("Failed to get local cart items:", error);
    return [];
  }
};

export const removeFromLocalCart = (productId: string, productPriceIds: string[]): void => {
  try {
    const existingItems = getLocalCartItems();
    const filteredItems = existingItems.filter(
      (item) =>
        !(item.productId === productId &&
          JSON.stringify(item.productPriceIds.sort()) === JSON.stringify(productPriceIds.sort()))
    );

    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(filteredItems));
  } catch (error) {
    console.error("Failed to remove from local cart:", error);
  }
};

export const updateLocalCartQuantity = (
  productId: string,
  productPriceIds: string[],
  quantity: number
): void => {
  try {
    const existingItems = getLocalCartItems();
    const itemIndex = existingItems.findIndex(
      (item) =>
        item.productId === productId &&
        JSON.stringify(item.productPriceIds.sort()) === JSON.stringify(productPriceIds.sort())
    );

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        existingItems.splice(itemIndex, 1);
      } else {
        existingItems[itemIndex].quantity = quantity;
        existingItems[itemIndex].timestamp = Date.now();
      }

      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(existingItems));
    }
  } catch (error) {
    console.error("Failed to update local cart quantity:", error);
  }
};

export const clearLocalCart = (): void => {
  try {
    localStorage.removeItem(LOCAL_CART_KEY);
  } catch (error) {
    console.error("Failed to clear local cart:", error);
  }
};

export const getLocalCartCount = (): number => {
  const items = getLocalCartItems();
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Transform local cart items to CartItem format for display
export const transformLocalCartToCartItems = (
  localItems: LocalCartItem[],
  products: any[]
): CartItem[] => {
  return localItems.map((localItem) => {
    const product = products.find((p) => p._id === localItem.productId);

    if (!product) {
      return {
        _id: `${localItem.productId}_no-price`,
        productId: localItem.productId,
        priceId: '',
        name: "Unknown Product",
        price: "$0.00",
        size: "N/A",
        image: "/placeholder-image.jpg",
        quantity: localItem.quantity,
        tags: ["Unknown"],
      };
    }

    // Find the selected price
    const selectedPrice = product.prices?.find((p: any) =>
      localItem.productPriceIds.includes(p._id)
    ) || product.prices?.[0];

    const price = selectedPrice
      ? selectedPrice.price - (selectedPrice.price * (selectedPrice.discount || 0) / 100)
      : 0;

    // Create unique ID combining product ID and price ID
    const uniqueId = `${localItem.productId}_${selectedPrice?._id || 'no-price'}`;

    // Handle image URL properly
    let imageUrl = product.featureImage;
    if (imageUrl) {
      // If it's already a full URL (starts with http), use as is
      if (imageUrl.startsWith('http')) {
        // Keep as is - likely Cloudinary URL
      } else if (imageUrl.startsWith('/')) {
        // Already absolute path, keep as is
      } else {
        // Relative path, make it absolute
        imageUrl = `/${imageUrl}`;
      }
    }

    return {
      _id: uniqueId,
      productId: localItem.productId,
      priceId: selectedPrice?._id || '',
      name: product.name,
      price: `$${price.toFixed(2)}`,
      size: selectedPrice?.volume || "N/A",
      image: imageUrl || "/placeholder-image.jpg",
      quantity: localItem.quantity,
      tags: [product.brand || "Unknown", product.category || "Unknown"],
    };
  });
};