import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, Minus, Save } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';

export default function ProductForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    supplier_id: '',
    sku: '',
    inventory_count: '0',
    cost_price: '',
    profit_margin: '',
    shipping_weight: '',
    images: [] as string[],
    variants: [{ name: '', values: [''] }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
          price: parseFloat(product.price),
          inventory_count: parseInt(product.inventory_count),
          cost_price: parseFloat(product.cost_price),
          profit_margin: parseFloat(product.profit_margin),
          shipping_weight: parseFloat(product.shipping_weight),
        }])
        .select()
        .single();

      if (error) throw error;

      toast.success('Product created successfully!');
      navigate(`/admin/products/${data.id}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addVariant = () => {
    setProduct(prev => ({
      ...prev,
      variants: [...prev.variants, { name: '', values: [''] }]
    }));
  };

  const removeVariant = (index: number) => {
    setProduct(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  value={product.sku}
                  onChange={(e) => setProduct(prev => ({ ...prev, sku: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing & Inventory</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={product.cost_price}
                    onChange={(e) => setProduct(prev => ({ ...prev, cost_price: e.target.value }))}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => setProduct(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profit Margin (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={product.profit_margin}
                  onChange={(e) => setProduct(prev => ({ ...prev, profit_margin: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Stock
                </label>
                <input
                  type="number"
                  value={product.inventory_count}
                  onChange={(e) => setProduct(prev => ({ ...prev, inventory_count: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={product.shipping_weight}
                  onChange={(e) => setProduct(prev => ({ ...prev, shipping_weight: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Variants</h2>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Variant
              </button>
            </div>

            {product.variants.map((variant, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    placeholder="Variant Name (e.g., Size, Color)"
                    value={variant.name}
                    onChange={(e) => {
                      const newVariants = [...product.variants];
                      newVariants[index].name = e.target.value;
                      setProduct(prev => ({ ...prev, variants: newVariants }));
                    }}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Drag and drop images here, or click to select files
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Handle image upload
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}