export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ;

// API Version
export const API_VERSION = 'v1';

export const API_ENDPOINTS = {
  MENU: `/api/${API_VERSION}/menu`,
  ORDERS: `/api/${API_VERSION}/orders`,
};
