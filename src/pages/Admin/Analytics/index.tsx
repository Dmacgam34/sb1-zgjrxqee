import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users,
  ShoppingCart
} from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock data - replace with real data from your backend
  const stats = {
    revenue: {
      total: 125850.00,
      growth: 12.5,
      data: [/* ... */]
    },
    orders: {
      total: 1234,
      growth: 5.2,
      data: [/* ... */]
    },
    customers: {
      total: 789,
      growth: 15.3,
      data: [/* ... */]
    },
    averageOrderValue: {
      total: 102.50,
      growth: 8.7,
      data: [/* ... */]
    }
  };

  const topProducts = [
    { name: 'Wireless Earbuds', sales: 245, revenue: 19600 },
    { name: 'Smart Watch', sales: 189, revenue: 37800 },
    { name: 'Phone Case', sales: 156, revenue: 3900 }
  ];

  const topCategories = [
    { name: 'Electronics', sales: 523, revenue: 78450 },
    { name: 'Accessories', sales: 412, revenue: 20600 },
    { name: 'Apparel', sales: 289, revenue: 14450 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Revenue</h3>
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold">${stats.revenue.total.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">+{stats.revenue.growth}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Orders</h3>
            <ShoppingCart className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.orders.total}</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">+{stats.orders.growth}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Customers</h3>
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{stats.customers.total}</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">+{stats.customers.growth}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Avg. Order Value</h3>
            <BarChart3 className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">${stats.averageOrderValue.total}</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">+{stats.averageOrderValue.growth}%</span>
          </div>
        </div>
      </div>

      {/* Top Products and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <p className="font-bold">${product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.sales} sales</p>
                  </div>
                </div>
                <p className="font-bold">${category.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}