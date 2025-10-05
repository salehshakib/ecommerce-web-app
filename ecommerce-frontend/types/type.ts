export interface ProductType {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface AddTypeData {
  name: string;
}

export interface UpdateTypeData {
  name: string;
}