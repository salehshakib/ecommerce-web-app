// Updated interface to match API response for admin orders
export interface OrderItem {
  product: null;
  volume: string;
  price: number;
  quantity: number;
  subtotal: number;
  _id: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrdersResponse {
  message: string;
  orders: Order[];
}

export interface LegacyOrdersResponse {
  message: string;
  orders: LegacyOrder[];
}

// Legacy interfaces for backward compatibility
export interface OrderProduct {
  _id: string;
  name: string;
  brand: string;
  slug: string;
  quantity: number;
  additionalImages: string[];
  category: string;
  description: string;
  inStock: boolean;
  type: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LegacyOrderItem {
  product: OrderProduct;
  volume: string;
  price: number;
  quantity: number;
  subTotal: number;
  _id: string;
}

export interface OrderUser {
  _id: string;
  userName: string;
  email: string;
  avatar: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderCart {
  _id: string;
  userId: string;
  products: Array<{
    product: string;
    productPrices: string[];
    quantity: number;
    _id: string;
  }>;
  __v: number;
}

export interface LegacyOrder {
  _id: string;
  user: OrderUser;
  cart: OrderCart;
  items: LegacyOrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}