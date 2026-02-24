import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearCart } from '../store/slices/cartSlice';

import { useApiMutation } from '../hooks/useApi';
import { createOrder } from '../services/api';

import InputWrapper from '../components/Form/InputWrapper';
import TextAreaWrapper from '../components/Form/TextAreaWrapper';
import { OrderSummary } from '../components/Order/OrderSummary';

import type { Order, CreateOrderRequest } from '../types';
import { checkoutSchema, type CheckoutFormData } from '../validations/checkoutSchema';

import { APP_LABELS, PLACEHOLDERS, ERROR_MESSAGES } from '../constants/appConstants';

/**
 * Checkout Page Component
 * Handles order placement with customer delivery information
 */
export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const { mutate: submitOrder, isLoading } = useApiMutation<Order, CreateOrderRequest>(createOrder);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    mode: 'onChange',
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
    },
  });

  /**
   * Handle form submission and order creation
   * @param formData - Validated customer information
   */
  const onSubmit = async (formData: CheckoutFormData) => {
    // Prepare order data with cart items and customer info
    const orderData = {
      items: items.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      })),
      customer: formData,
    };

    // Submit order to API
    const order = await submitOrder(orderData);

    if (order && order.id) {
      // Clear cart and navigate to order tracking
      dispatch(clearCart());
      navigate(`/order/${order.id}`);
    } else {
      // Show error message if order creation failed
      alert(ERROR_MESSAGES.ORDER_CREATION_FAILED);
    }
  };

  // Early return if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{APP_LABELS.CART_EMPTY}</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            {APP_LABELS.GO_TO_MENU}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">{APP_LABELS.CHECKOUT}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {APP_LABELS.DELIVERY_INFORMATION}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputWrapper
                label={APP_LABELS.FULL_NAME}
                required
                placeholder={PLACEHOLDERS.NAME}
                control={control}
                name="name"
                error={errors.name}
                maxLength={50}
                type="text"
              />

              <TextAreaWrapper
                label={APP_LABELS.DELIVERY_ADDRESS}
                required
                placeholder={PLACEHOLDERS.ADDRESS}
                control={control}
                name="address"
                error={errors.address}
                maxLength={200}
                rows={3}
              />

              <InputWrapper
                label={APP_LABELS.PHONE_NUMBER}
                required
                placeholder={PLACEHOLDERS.PHONE}
                control={control}
                name="phone"
                error={errors.phone}
                maxLength={10}
                type="tel"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? APP_LABELS.PLACING_ORDER : APP_LABELS.PLACE_ORDER}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary items={items} total={total} showDeliveryFee={true} />
        </div>
      </div>
    </div>
  );
};
