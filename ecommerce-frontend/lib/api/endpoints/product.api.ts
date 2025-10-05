const baseUrl = "/products";

export const productsApi = {
  CREATE_PRODUCT: `${baseUrl}/add`,

  GET_ALL_PRODUCTS: `${baseUrl}`,
  DELETE_PRODUCT: `${baseUrl}`,
  // UPDATE_PRODUCT: `${baseUrl}`,
  GET_PRODUCTS_BY_ID: `${baseUrl}`,
  UPDATE_PRODUCT: `${baseUrl}`,
  GET_PRODUCT_BY_CATEGORY: `${baseUrl}/category`,
  GET_PRODUCT_BY_TYPE: `${baseUrl}/type`,
  ADD_PRODUCT_IMAGE: `${baseUrl}/image`,
  REMOVE_PRODUCT_IAMGE: `${baseUrl}/image`,
};

const productPricesBaseUrl = "/product-prices";

export const productPricesApi = {
  CREATE_PRODUCT_PRICE: `${productPricesBaseUrl}`,
  GET_PRICE_BY_PRODUCT: `${productPricesBaseUrl}/product`,
  GET_PRODUCT_BY_ID: `${productPricesBaseUrl}`,
  UPDATE_PRODUCT_PRICE: `${productPricesBaseUrl}`,
  DELETE_PRODUCT_PRICE: `${productPricesBaseUrl}`,
};
