import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Gift } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import AuthModal from './auth/AuthModal';

export default function Navbar() {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              DropStore
            </Link>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Link 
                to="/mystery-box" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Gift className="w-5 h-5" />
                <span className="hidden md:inline">Mystery Box</span>
              </Link>
              
              <Link to="/cart" className="relative">
                <ShoppingCart className="text-gray-600 hover:text-gray-900" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <Link to="/profile">
                  <User className="text-gray-600 hover:text-gray-900" />
                </Link>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}