import React, { useState } from 'react';
import { Package, Sparkles, Gift, ShoppingCart, Star, Shield, Zap, Info } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';
import type { MysteryBox, Testimonial } from '../types';

const MYSTERY_BOXES: MysteryBox[] = [
  {
    id: 'starter-box',
    name: 'Starter Mystery Box',
    price: 29.99,
    value: 'Up to $60 worth of products',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=800&q=80',
    items: '3-4 items',
    theme: 'bg-gradient-to-br from-blue-500 to-purple-600',
    guarantee: 'Minimum value guaranteed: $45',
    features: ['Perfect for new customers', 'Trending items included', 'Satisfaction guaranteed']
  },
  {
    id: 'premium-box',
    name: 'Premium Mystery Box',
    price: 79.99,
    value: 'Up to $150 worth of products',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
    items: '5-7 items',
    theme: 'bg-gradient-to-br from-purple-600 to-pink-600',
    guarantee: 'Minimum value guaranteed: $120',
    features: ['Premium items only', 'Early access to new products', 'VIP support'],
    featured: true
  },
  {
    id: 'luxury-box',
    name: 'Luxury Mystery Box',
    price: 149.99,
    value: 'Up to $300 worth of products',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    items: '7-9 items',
    theme: 'bg-gradient-to-br from-yellow-400 to-orange-600',
    guarantee: 'Minimum value guaranteed: $250',
    features: ['Luxury brands included', 'Limited edition items', 'Concierge service']
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah K.",
    box: "Premium Box",
    comment: "Absolutely amazing value! Every item was perfect.",
    rating: 5
  },
  {
    name: "Mike R.",
    box: "Luxury Box",
    comment: "The quality of items exceeded my expectations.",
    rating: 5
  },
  {
    name: "Emily T.",
    box: "Starter Box",
    comment: "Perfect way to discover new products. Will order again!",
    rating: 4
  }
];

export default function MysteryBox() {
  const { addItem } = useCart();
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleAddToCart = async (box: MysteryBox) => {
    if (loading === box.id) return;
    
    try {
      setLoading(box.id);
      await addItem({
        id: box.id,
        name: box.name,
        price: box.price,
        images: [box.image],
        category_id: 'mystery-box',
        description: `${box.value} - ${box.guarantee}`,
        inventory_count: 999,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, 1);
      toast.success('Mystery Box added to cart!');
      setSelectedBox(box.id);
    } catch (error) {
      toast.error('Failed to add to cart. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Unbox the Extraordinary
            </h1>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Experience the thrill of unboxing premium mystery items curated just for you.
              Each box contains hand-picked products worth more than their price.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5" />
                <span>Value Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Zap className="w-5 h-5" />
                <span>Premium Products</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-5 h-5" />
                <span>Top Rated</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-gray-50"></div>
      </div>

      {/* Mystery Box Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {MYSTERY_BOXES.map((box) => (
            <div
              key={box.id}
              className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                box.featured ? 'transform scale-105' : ''
              }`}
            >
              <div className={`${box.theme} p-6 text-white h-full`}>
                {box.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <div className="mb-6">
                  <Gift className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{box.name}</h3>
                  <p className="text-3xl font-bold mb-2">${box.price}</p>
                  <p className="opacity-90">{box.value}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    <span>{box.items}</span>
                  </div>
                  <div className="relative group">
                    <p className="text-sm bg-white/10 px-3 py-2 rounded-lg">
                      {box.guarantee}
                    </p>
                    <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-64 p-2 bg-black text-xs text-white rounded shadow-lg">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p>We guarantee the total retail value of items will meet or exceed this amount.</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {box.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleAddToCart(box)}
                  disabled={loading === box.id}
                  className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading === box.id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.box}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What's inside the Mystery Box?</h3>
                <p className="text-gray-600">
                  Each Mystery Box contains a carefully curated selection of premium products from our store.
                  The contents are hand-picked to exceed the box's purchase price in value.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Is there a guaranteed minimum value?</h3>
                <p className="text-gray-600">
                  Yes! Each box has a guaranteed minimum value that exceeds the purchase price.
                  You'll always receive products worth more than what you pay.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How often do box contents change?</h3>
                <p className="text-gray-600">
                  We update our Mystery Box contents monthly to include the latest trending products
                  and seasonal items. Each box is unique and may contain different items.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I return Mystery Box items?</h3>
                <p className="text-gray-600">
                  Due to the nature of Mystery Boxes, we cannot accept returns unless items are damaged
                  or defective. Each box is final sale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}