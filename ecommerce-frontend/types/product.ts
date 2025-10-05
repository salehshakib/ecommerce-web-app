export interface ProductPrice {
  productId: string;
  volume: string;
  price: number;
  discount?: number;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  featureImage: string;
  _id: string;
  name: string;
  brand: string;
  slug: string;
  quantity: number;
  additionalImages: any[];
  category: string;
  description: string;
  inStock: boolean;
  type: {
    _id: string;
    name: string;
    __v: number;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  prices: {
    _id: string;
    productId: string;
    volume: string;
    price: number;
    discount: number;
    __v: number;
  }[];
  // Backward compatibility - keep optional id field for existing code
  id?: string;
}

export interface CreateProductData {
  name: string;
  brand: string;
  slug: string;
  quantity: number;
  category: string;
  description: string;
  inStock: boolean;
  type: string[];
}

// API Response interfaces
export interface ProductsResponse {
  message: string;
  products: Product[];
}
