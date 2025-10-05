export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface AddCategoryData {
  name: string;
}

export interface UpdateCategoryData {
  name: string;
}