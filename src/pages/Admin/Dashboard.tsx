import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Users, 
  TrendingUp, 
  Truck, 
  Settings,
  DollarSign,
  Box
} from 'lucide-react';

export default function AdminDashboard() {
  // Mock data - replace with real data from your backend
  const stats = {
    revenue: 125850.00,
    orders: 1234,
    products: 456,
    customers: 789
  };

  const recentOrders = [
    { id: '1', customer: 'John Doe', total: 99.99, status: 'Processing' },
    { id: '2', customer: 'Jane Smith', total: 149.99, status: 'Shipped' },
    { id: '3', customer: 'Bob Wilson', total: 79.99, status: 'Delivered' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Revenue</h3>
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
            <p className="text-sm text-green-500">+12.5% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Orders</h3>
              <Package className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">{stats.orders}</p>
            <p className="text-sm text-blue-500">+5.2% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Products</h3>
              <Box className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-2xl font-bold">{stats.products}</p>
            <p className="text-sm text-purple-500">+8.1% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Customers</h3>
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{stats.customers}</p>
            <p className="text-sm text-orange-500">+15.3% from last month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            to="/admin/products/new"
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-3"
          >
            <Package className="w-5 h-5" />
            Add New Product
          </Link>
          <Link
            to="/admin/suppliers"
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-3"
          >
            <Truck className="w-5 h-5" />
            Manage Suppliers
          </Link>
          <Link
            to="/admin/analytics"
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-3"
          >
            <BarChart3 className="w-5 h-5" />
            View Analytics
          </Link>
          <Link
            to="/admin/settings"
            className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-3"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4">#{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">${order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}