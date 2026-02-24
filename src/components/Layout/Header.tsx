import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';

export const Header = () => {
  const location = useLocation();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl">🍕</div>
            <h1 className="text-2xl font-bold text-primary-600">FoodExpress</h1>
          </Link>

          <nav className="flex items-center space-x-6">
            {location.pathname !== '/' && (
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Menu
              </Link>
            )}
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
