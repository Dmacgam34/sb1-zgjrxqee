import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock product data - replace with actual API call
  const product = {
    id: slug,
    name: "Premium Wireless Earbuds",
    price: 79.99,
    description: "High-quality wireless earbuds with noise cancellation and premium sound quality. Perfect for music lovers and professionals alike.",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Active Noise Cancellation",
      "30-hour Battery Life",
      "Wireless Charging",
      "Water Resistant",
      "Touch Controls"
    ],
    specs: {
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Bluetooth Version": "5.0",
      "Water Resistance": "IPX4",
      "Weight": "58g"
    },
    rating: 4.5,
    reviews: 128,
    inventory: 50
  };

  const handleAddToCart = async () => {
    try {
      await addItem(product, quantity);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-w-1 aspect-h-1">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-24 h-24 rounded-lg overflow-hidden ${
                  currentImageIndex === index ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.reviews} reviews</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-blue-600">${product.price}</p>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <h3 className="font-semibold">Key Features:</h3>
            <ul className="list-disc pl-6 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-600">
                {product.inventory} units available
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Truck className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium">Secure Payment</h4>
                <p className="text-sm text-gray-600">100% secure payment</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Specifications:</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm text-gray-600">{key}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}