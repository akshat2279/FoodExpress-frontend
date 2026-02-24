/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '../utils/http';
import type { CreateOrderRequest } from '../types';
import { API_ENDPOINTS } from '../config/api';

// Menu API
export const getMenu = async (params: { offset?: number; limit?: number } = {}): Promise<any> => {
  const { offset = 0, limit = 10 } = params;
  return await post(API_ENDPOINTS.MENU, { offset, limit });
};

// Order API
export const createOrder = async (orderData: CreateOrderRequest): Promise<any> => {
  return await post(API_ENDPOINTS.ORDERS, orderData);
};

export const getOrderById = async (id: string): Promise<any> => {
  return await get(`${API_ENDPOINTS.ORDERS}/${id}`);
};

// Export as object for backward compatibility
export const menuApi = {
  getMenu,
};

export const orderApi = {
  createOrder,
  getOrderById,
};
