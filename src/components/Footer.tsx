import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">DropStore</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your trusted partner for quality products and excellent service.
            </p>
            <div className="flex items-center gap-4">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Secure payments</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal/terms" className="text-gray-600 hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/shipping" className="text-gray-600 hover:text-blue-600">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/returns" className="text-gray-600 hover:text-blue-600">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-600 hover:text-blue-600">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} DropStore. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <img src="https://raw.githubusercontent.com/stripe/stripe-press/master/public/powered_by_stripe.svg" alt="Powered by Stripe" className="h-6" />
              <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="Visa" className="h-6" />
              <img src="https://www.mastercard.us/content/dam/mccom/global/logos/logo-mastercard-mobile.svg" alt="Mastercard" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}