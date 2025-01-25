import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ArrowDown, 
  ArrowUp, 
  Package, 
  RefreshCw,
  Truck,
  Search
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  inventory_count: number;
  low_stock_threshold: number;
  supplier_name: string;
  last_restock_date: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'low_stock' | 'out_of_stock'>('all');

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          sku,
          inventory_count,
          low_stock_threshold,
          suppliers (name),
          last_restock_date
        `)
        .order('name');

      if (error) throw error;

      const inventoryItems = data.map(item => ({
        ...item,
        supplier_name: item.suppliers?.name || 'N/A',
        status: getStockStatus(item.inventory_count, item.low_stock_threshold)
      }));

      setItems(inventoryItems);
    } catch (error: any) {
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (count: number, threshold: number) => {
    if (count === 0) return 'out_of_stock';
    if (count <= threshold) return 'low_stock';
    return 'in_stock';
  };

  const handleRestock = async (itemId: string) => {
    // Implement restock logic
    toast.success('Restock order placed successfully');
  };

  const filteredItems = items
    .filter(item => 
      (filter === 'all' || item.status === filter) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const stockSummary = {
    total: items.length,
    lowStock: items.filter(item => item.status === 'low_stock').length,
    outOfStock: items.filter(item => item.status === 'out_of_stock').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Inventory Management</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">{stockSummary.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stockSummary.lowStock}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {stockSummary.outOfStock}
              </p>
            </div>
            <Package className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('low_stock')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'low_stock'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Low Stock
              </button>
              <button
                onClick={() => setFilter('out_of_stock')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'out_of_stock'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Out of Stock
              </button>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">SKU</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Supplier</th>
                <th className="text-left py-3 px-4">Last Restock</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-3 px-4">
                    <div className="font-medium">{item.name}</div>
                  </td>
                  <td className="py-3 px-4">{item.sku}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {item.inventory_count}
                      {item.inventory_count < item.low_stock_threshold ? (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      ) : (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'in_stock'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'low_stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.supplier_name}</td>
                  <td className="py-3 px-4">
                    {new Date(item.last_restock_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRestock(item.id)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Restock"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-700"
                        title="Order from supplier"
                      >
                        <Truck className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}