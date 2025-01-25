import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Truck, Shield, Clock } from 'lucide-react';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Earbuds",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Portable Power Bank",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17d?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=2000&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Discover Premium Products</h1>
            <p className="text-xl mb-8">Shop the latest trending products with worldwide shipping and exceptional customer service.</p>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trending Products</h3>
            <p className="text-gray-600">Curated selection of the most popular items</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <Truck className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Quick delivery to your doorstep</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <Shield className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">Safe and encrypted transactions</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <Clock className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Always here to help you</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-blue-600 font-bold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8">Subscribe to our newsletter for exclusive deals and updates.</p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}