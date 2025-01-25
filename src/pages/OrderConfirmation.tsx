import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderConfirmation() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600">
            Your order has been successfully placed and is being processed.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-center gap-4 text-gray-600 mb-4">
            <Package className="w-6 h-6" />
            <span>Order tracking details have been sent to your email.</span>
          </div>
          <p className="text-sm">
            You'll receive shipping updates and tracking information once your order is dispatched.
          </p>
        </div>

        <div className="space-x-4">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Orders
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}