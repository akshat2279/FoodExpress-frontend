// Types
import type { CartItem } from '../../types';

// Constants
import { DELIVERY_FEE } from '../../constants/commonConstant';
import { APP_LABELS } from '../../constants/appConstants';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  showDeliveryFee?: boolean;
}

/**
 * OrderSummary Component
 * Displays cart items, subtotal, delivery fee, and total
 * Reusable across Cart and Checkout pages
 */
export const OrderSummary = ({ items, total, showDeliveryFee = true }: OrderSummaryProps) => {
  // Calculate final total with optional delivery fee
  const finalTotal = showDeliveryFee ? total + DELIVERY_FEE : total;

  return (
    <div className="card p-6 sticky top-24">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {APP_LABELS.ORDER_SUMMARY}
      </h3>

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div
            key={item.menuItemId}
            className="flex justify-between text-sm"
          >
            <span className="text-gray-600">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>{APP_LABELS.SUBTOTAL}</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {showDeliveryFee && (
          <div className="flex justify-between text-gray-600">
            <span>{APP_LABELS.DELIVERY_FEE_LABEL}</span>
            <span>${DELIVERY_FEE.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold text-gray-800">
          <span>{APP_LABELS.TOTAL}</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
