import React from 'react';
import { Truck, Globe, Clock, MapPin, AlertTriangle, Package } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
      
      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Processing Time</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <p>Standard processing times for orders:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regular orders: 1-2 business days</li>
                  <li>Custom orders: 3-5 business days</li>
                  <li>Pre-orders: As specified on product page</li>
                </ul>
                <p className="text-sm text-gray-600">
                  Note: During peak seasons or sales events, processing may take up to 3 business days.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Truck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Shipping Methods</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Standard Shipping</h3>
                  <ul className="space-y-2">
                    <li>Delivery: 5-7 business days</li>
                    <li>Cost: Free for orders over $50</li>
                    <li>Tracking included</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Express Shipping</h3>
                  <ul className="space-y-2">
                    <li>Delivery: 2-3 business days</li>
                    <li>Cost: $15 flat rate</li>
                    <li>Tracking included</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Next Day Delivery</h3>
                  <ul className="space-y-2">
                    <li>Order by 2 PM for next-day delivery</li>
                    <li>Cost: $25 flat rate</li>
                    <li>Available for select locations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Globe className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. International Shipping</h2>
              <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                <p>We ship to most countries worldwide. Please note:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivery times: 7-21 business days</li>
                  <li>Customs duties and taxes are the responsibility of the recipient</li>
                  <li>International tracking provided</li>
                  <li>Some restrictions apply for certain products</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Shipping Restrictions</h2>
              <div className="bg-red-50 p-4 rounded-lg space-y-4">
                <p>We cannot ship to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>P.O. boxes for express or next-day delivery</li>
                  <li>Freight forwarders without prior approval</li>
                  <li>Countries under trade restrictions</li>
                  <li>Certain remote locations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Package className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Order Tracking</h2>
              <div className="space-y-4">
                <p>Track your order:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tracking number provided via email</li>
                  <li>Real-time updates through your account dashboard</li>
                  <li>SMS notifications available</li>
                  <li>Customer service assistance for tracking inquiries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Lost or Damaged Packages</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <p>In the event of a lost or damaged package:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact customer service within 48 hours</li>
                  <li>Provide order number and photos of damage (if applicable)</li>
                  <li>Replacement or refund will be processed</li>
                  <li>Insurance included on all shipments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}