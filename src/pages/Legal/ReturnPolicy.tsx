import React from 'react';
import { RefreshCw, Package, Clock, Shield, AlertTriangle, HelpCircle } from 'lucide-react';

export default function ReturnPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Returns & Refunds Policy</h1>
      
      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <RefreshCw className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Return Eligibility</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <p>To be eligible for a return, your item must meet the following criteria:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Returned within 30 days of delivery</li>
                  <li>Unused and in original packaging</li>
                  <li>Include all accessories and tags</li>
                  <li>Accompanied by the original receipt or proof of purchase</li>
                  <li>Not listed in our non-returnable items category</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Non-Returnable Items</h2>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="mb-4">The following items cannot be returned:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mystery Box items (unless damaged or defective)</li>
                  <li>Personal care items</li>
                  <li>Intimate apparel</li>
                  <li>Customized products</li>
                  <li>Digital downloads</li>
                  <li>Gift cards</li>
                  <li>Sale items marked as final sale</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Package className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Return Process</h2>
              <div className="space-y-4">
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <p className="font-medium">Initiate Return</p>
                    <p className="text-gray-600">Log into your account and visit the Orders section to initiate a return</p>
                  </li>
                  <li>
                    <p className="font-medium">Print Return Label</p>
                    <p className="text-gray-600">A prepaid return shipping label will be provided for domestic returns</p>
                  </li>
                  <li>
                    <p className="font-medium">Package Items</p>
                    <p className="text-gray-600">Securely pack items in original packaging with return form</p>
                  </li>
                  <li>
                    <p className="font-medium">Ship Return</p>
                    <p className="text-gray-600">Drop off package at authorized shipping location</p>
                  </li>
                  <li>
                    <p className="font-medium">Refund Processing</p>
                    <p className="text-gray-600">Refunds are processed within 5-7 business days after receipt</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Refund Timeframes</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="font-medium min-w-[120px]">Credit Card:</span>
                    <span>5-7 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium min-w-[120px]">Debit Card:</span>
                    <span>5-7 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium min-w-[120px]">PayPal:</span>
                    <span>2-3 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium min-w-[120px]">Store Credit:</span>
                    <span>Immediate</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Damaged or Defective Items</h2>
              <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                <p>
                  If you receive a damaged or defective item, please contact our customer service 
                  within 48 hours of delivery. We will provide:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prepaid return shipping label</li>
                  <li>Immediate replacement or refund</li>
                  <li>Priority processing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>For any questions about our return policy, please contact us:</p>
                <p className="mt-2">Email: returns@dropstore.com</p>
                <p>Phone: [Your Returns Department Phone]</p>
                <p>Hours: Monday-Friday, 9am-5pm EST</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}