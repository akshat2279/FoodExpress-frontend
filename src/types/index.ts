export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  items: OrderItem[];
  customer: Customer;
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface CreateOrderRequest {
  items: {
    menuItemId: string;
    quantity: number;
  }[];
  customer: Customer;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  code: number;
}
