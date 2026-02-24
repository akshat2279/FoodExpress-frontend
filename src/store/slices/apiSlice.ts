import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MenuItem, Order, CreateOrderRequest, ApiResponse } from '../../types';
import { API_BASE_URL } from '../../config/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Menu', 'Order'],
  endpoints: (builder) => ({
    getMenu: builder.query<ApiResponse<MenuItem[]>, void>({
      query: () => '/api/menu',
      providesTags: ['Menu'],
    }),

    createOrder: builder.mutation<ApiResponse<Order>, CreateOrderRequest>({
      query: (orderData) => ({
        url: '/api/orders',
        method: 'POST',
        body: orderData,
      }),
    }),

    getOrderById: builder.query<ApiResponse<Order>, string>({
      query: (id) => `/api/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
  }),
});

export const {
  useGetMenuQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useLazyGetOrderByIdQuery,
} = apiSlice;
