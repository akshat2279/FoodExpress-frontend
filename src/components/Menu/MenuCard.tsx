import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  
  // Find if this item exists in cart
  const cartItem = cartItems.find((cartItem) => cartItem.menuItemId === item.id);
  
  // Use cart quantity if item is in cart, otherwise use local state
  const [localQuantity, setLocalQuantity] = useState(1);
  const quantity = cartItem?.quantity || localQuantity;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity,
        image: item.image,
      })
    );
    // Keep the quantity as is - don't reset
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (cartItem) {
                  // If in cart, update cart directly
                  dispatch(addToCart({
                    menuItemId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: Math.max(1, quantity - 1),
                    image: item.image,
                  }));
                } else {
                  // Otherwise update local state
                  setLocalQuantity(Math.max(1, quantity - 1));
                }
              }}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => {
                if (cartItem) {
                  // If in cart, update cart directly
                  dispatch(addToCart({
                    menuItemId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: quantity + 1,
                    image: item.image,
                  }));
                } else {
                  // Otherwise update local state
                  setLocalQuantity(quantity + 1);
                }
              }}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <button onClick={handleAddToCart} className="btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
