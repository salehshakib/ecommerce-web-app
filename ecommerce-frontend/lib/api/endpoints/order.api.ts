const baseUrl = "/order";

export const orderApi = {
  CREATE_ORDER: `${baseUrl}`,
  GET_ORDER_BY_ID: `${baseUrl}`,
  GET_ORDER_BY_USER: `${baseUrl}/user-order`,
  GET_ALL_ORDERS: `${baseUrl}`,
  UPDATE_ORDER_STATUS: `${baseUrl}/status`,
  DELET_ORDER: `${baseUrl}`,
};
