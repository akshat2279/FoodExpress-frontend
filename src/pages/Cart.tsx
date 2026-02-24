import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

import { OrderSummary } from '../components/Order/OrderSummary';

import { APP_LABELS } from '../constants/appConstants';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useAppSelector((state) => state.cart);

  const handleUpdateQuantity = (menuItemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ menuItemId, quantity: newQuantity }));
    }
  };

  const handleRemove = (menuItemId: string) => {
    dispatch(removeFromCart(menuItemId));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {APP_LABELS.CART_EMPTY}
          </h2>
          <p className="text-gray-600 mb-8">
            Add some delicious items to get started!
          </p>
          <Link to="/" className="btn-primary inline-block">
            {APP_LABELS.BACK_TO_MENU}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">{APP_LABELS.YOUR_CART}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.menuItemId} className="card p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-primary-600 font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.menuItemId, item.quantity - 1)
                    }
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.menuItemId, item.quantity + 1)
                    }
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.menuItemId)}
                    className="text-red-600 hover:text-red-700 mt-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-4">
            <OrderSummary items={items} total={total} showDeliveryFee={true} />
            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full"
            >
              {APP_LABELS.PROCEED_TO_CHECKOUT}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
