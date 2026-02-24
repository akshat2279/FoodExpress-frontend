/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getOrderById } from '../services/api';
import type { OrderStatus, Order } from '../types';

import { APP_LABELS, STATUS_ICONS } from '../constants/appConstants';

const statusSteps: OrderStatus[] = [
  'Order Received',
  'Preparing',
  'Out for Delivery',
  'Delivered',
];

export const OrderTracking = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [data, setData] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    if (!orderId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getOrderById(orderId);
      if (response.error) {
        setError(response.error);
        setData(null);
      } else {
        setData(response.data?.data || response.data);
      }
    } catch (e) {
      setError('Failed to load order');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // Polling for order updates (temporary workaround for HTTPS/WSS issue)
  useEffect(() => {
    if (!orderId) return;

    const pollInterval = setInterval(() => {
      fetchOrder();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{APP_LABELS.LOADING_ORDER}</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{APP_LABELS.ORDER_NOT_FOUND}</p>
          <Link to="/" className="btn-primary">
            {APP_LABELS.BACK_TO_MENU}
          </Link>
        </div>
      </div>
    );
  }

  const order = data;
  const currentStatusIndex = statusSteps.indexOf(order.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="card p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {APP_LABELS.ORDER_TRACKING}
            </h2>
            {/* <p className="text-gray-600">Order ID: {order.id}</p> */}
          </div>

          <div className="mb-12 px-8">
            <div className="flex justify-between items-center relative">
              <div 
                className="absolute top-1/2 h-1 bg-gray-200 -translate-y-1/2"
                style={{
                  left: '32px',
                  right: '32px',
                }}
              >
                <div
                  className="h-full bg-primary-600 transition-all duration-500"
                  style={{
                    width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {statusSteps.map((status, index) => {
                const Icon = STATUS_ICONS[status];
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div
                    key={status}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-primary-200' : ''}`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <p
                      className={`text-sm font-medium text-center ${
                        isCompleted ? 'text-gray-800' : 'text-gray-400'
                      }`}
                    >
                      {status}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {APP_LABELS.ORDER_DETAILS}
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>{APP_LABELS.TOTAL}</span>
                <span className="text-primary-600">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {APP_LABELS.DELIVERY_INFORMATION}
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">{APP_LABELS.NAME_LABEL}</span> {order.customer.name}
              </p>
              <p>
                <span className="font-medium">{APP_LABELS.ADDRESS_LABEL}</span>{' '}
                {order.customer.address}
              </p>
              <p>
                <span className="font-medium">{APP_LABELS.PHONE_LABEL}</span>{' '}
                {order.customer.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="btn-secondary">
            {APP_LABELS.ORDER_MORE_FOOD}
          </Link>
        </div>
      </div>
    </div>
  );
};
