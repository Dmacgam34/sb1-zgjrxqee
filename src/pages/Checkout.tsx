import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { stripePromise, createPaymentIntent, createOrder, getSavedPaymentMethods } from '../lib/stripe';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Lock, CreditCard, GoalIcon as PaypalIcon } from 'lucide-react';

function CheckoutForm({ clientSecret, shippingAddress }: { clientSecret: string, shippingAddress: any }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [savedMethods, setSavedMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSavedMethods();
    }
  }, [user]);

  const loadSavedMethods = async () => {
    const methods = await getSavedPaymentMethods(user.id);
    setSavedMethods(methods);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !user) return;

    setProcessing(true);

    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          payment_method_data: saveCard ? {
            save_payment_method: true
          } : undefined
        },
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await createOrder(user.id, items, shippingAddress, paymentIntent.id, 'stripe');
        clearCart();
        toast.success('Payment successful!');
        navigate('/order-confirmation');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {savedMethods.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Saved Payment Methods</h4>
          <div className="space-y-2">
            {savedMethods.map((method) => (
              <label key={method.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="text-blue-600"
                />
                <div>
                  <p className="font-medium">{method.brand} •••• {method.last4}</p>
                </div>
              </label>
            ))}
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="new"
                checked={selectedMethod === 'new'}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="text-blue-600"
              />
              <div>
                <p className="font-medium">Use a new card</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {(!savedMethods.length || selectedMethod === 'new') && (
        <>
          <PaymentElement />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="text-blue-600"
            />
            <span className="text-sm">Save this card for future purchases</span>
          </label>
        </>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Pay Now
          </>
        )}
      </button>
    </form>
  );
}

function PayPalCheckout({ amount, shippingAddress }: { amount: number, shippingAddress: any }) {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toString()
            }
          }]
        });
      }}
      onApprove={async (data, actions) => {
        if (!actions.order) return;
        
        const order = await actions.order.capture();
        if (order.status === 'COMPLETED' && user) {
          await createOrder(user.id, items, shippingAddress, order.id, 'paypal');
          clearCart();
          toast.success('Payment successful!');
          navigate('/order-confirmation');
        }
      }}
      onError={() => {
        toast.error('PayPal payment failed. Please try again.');
      }}
    />
  );
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>('');
  const { items, itemCount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (itemCount === 0) {
      navigate('/cart');
      return;
    }

    const getClientSecret = async () => {
      try {
        const secret = await createPaymentIntent(items, 'user_id');
        setClientSecret(secret);
      } catch (error) {
        console.error('Error getting client secret:', error);
        toast.error('Failed to initialize payment. Please try again.');
      }
    };

    getClientSecret();
  }, [items, itemCount, navigate]);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) =>
                      setShippingAddress((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          zipCode: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.country}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-4 border rounded-lg flex items-center justify-center gap-2 ${
                      paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : ''
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex-1 p-4 border rounded-lg flex items-center justify-center gap-2 ${
                      paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : ''
                    }`}
                  >
                    <PaypalIcon className="w-5 h-5" />
                    <span>PayPal</span>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm clientSecret={clientSecret} shippingAddress={shippingAddress} />
                  </Elements>
                ) : (
                  <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                    <PayPalCheckout amount={total} shippingAddress={shippingAddress} />
                  </PayPalScriptProvider>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}