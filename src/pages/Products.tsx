import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../hooks/useCart';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category_id: string;
  inventory_count: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Products() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory, sortBy, priceRange]);

  async function fetchProducts() {
    let query = supabase
      .from('products')
      .select('*')
      .gte('price', priceRange.min)
      .lte('price', priceRange.max);

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price-desc':
        query = query.order('price', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
    }

    const { data, error } = await query;
    if (error) console.error('Error fetching products:', error);
    else setProducts(data || []);
    setLoading(false);
  }

  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) console.error('Error fetching categories:', error);
    else setCategories(data || []);
  }

  async function handleAddToCart(product: Product) {
    try {
      await addItem(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={20} />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2 py-1 rounded ${
                    !selectedCategory ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full p-2 border rounded-md"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className={`grid ${
              view === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'grid-cols-1 gap-4'
            }`}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden ${
                    view === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`${view === 'list' ? 'w-48 h-48' : 'w-full h-48'} relative group`}>
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className={`p-4 ${view === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className={`${view === 'list' ? 'flex justify-between items-center' : ''}`}>
                      <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}