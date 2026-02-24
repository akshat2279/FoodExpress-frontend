// Application-wide text constants
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';
import type { OrderStatus } from '../types';

// Common Labels
export const APP_LABELS = {
  // Form Labels
  FULL_NAME: 'Full Name',
  DELIVERY_ADDRESS: 'Delivery Address',
  PHONE_NUMBER: 'Phone Number',
  
  // Buttons
  PLACE_ORDER: 'Place Order',
  PLACING_ORDER: 'Placing Order...',
  PROCEED_TO_CHECKOUT: 'Proceed to Checkout',
  ADD_TO_CART: 'Add to Cart',
  BACK_TO_MENU: 'Back to Menu',
  ORDER_MORE_FOOD: 'Order More Food',
  GO_TO_MENU: 'Go to Menu',
  
  // Headings
  ORDER_TRACKING: 'Order Tracking',
  ORDER_SUMMARY: 'Order Summary',
  ORDER_DETAILS: 'Order Details',
  DELIVERY_INFORMATION: 'Delivery Information',
  CHECKOUT: 'Checkout',
  OUR_MENU: 'Our Menu',
  YOUR_CART: 'Your Cart',
  
  // Messages
  LOADING_MENU: 'Loading menu...',
  LOADING_ORDER: 'Loading order...',
  ORDER_NOT_FOUND: 'Order not found',
  CART_EMPTY: 'Your cart is empty',
  NO_MORE_ITEMS: 'No more items to load',
  NO_ITEMS_AVAILABLE: 'No items available',
  
  // Descriptions
  MENU_DESCRIPTION: 'Choose from our delicious selection of food',
  
  // Order Summary
  SUBTOTAL: 'Subtotal',
  DELIVERY_FEE_LABEL: 'Delivery Fee',
  TOTAL: 'Total',
  
  // Order Status
  ORDER_RECEIVED: 'Order Received',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  
  // Customer Information Labels
  NAME_LABEL: 'Name:',
  ADDRESS_LABEL: 'Address:',
  PHONE_LABEL: 'Phone:',
};

// Placeholders
export const PLACEHOLDERS = {
  NAME: 'John Doe',
  ADDRESS: '123 Main St, Apt 4B',
  PHONE: '1234567890',
};

// Error Messages
export const ERROR_MESSAGES = {
  ORDER_CREATION_FAILED: 'Failed to place order. Please try again.',
  ORDER_LOAD_FAILED: 'Failed to load order',
};

// Order Status Icons
export const STATUS_ICONS: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  'Order Received': Clock,
  Preparing: Package,
  'Out for Delivery': Truck,
  Delivered: CheckCircle,
};
