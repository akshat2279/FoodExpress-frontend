/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { withData, withError } from './api';
import { API_BASE_URL } from '../config/api';

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token if available
http.interceptors.request.use((req) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor - handle success and errors
http.interceptors.response.use(
  (res) => {
    return withData(res.data) as any;
  },
  (err) => {
    if (err?.response?.status === 401) {
      // Handle unauthorized - could redirect to login
      console.error('Unauthorized access');
    }
    return withError(
      err?.response?.data?.error ?? err?.response?.data?.message ?? 'An error occurred'
    );
  }
);

// HTTP methods
export function get<P>(url: string, params?: P): Promise<any> {
  return http({
    method: 'get',
    url,
    params,
  });
}

export function post<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: 'post',
    url,
    data,
    params,
  });
}

export function postFile<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    url,
    data,
    params,
  });
}

export function put<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: 'put',
    url,
    data,
    params,
  });
}

export function patch<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: 'patch',
    url,
    data,
    params,
  });
}

export function delete_request<P>(url: string, params?: P): any {
  return http({
    method: 'delete',
    url,
    params,
  });
}

export function remove<P>(url: string, params?: P): any {
  return http({
    method: 'delete',
    url,
    params,
  });
}
