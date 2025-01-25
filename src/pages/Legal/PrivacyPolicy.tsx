import React from 'react';
import { Shield, Lock, Eye, Database, Bell, UserCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Data Protection Commitment</h2>
              <p className="mb-4">
                We are committed to protecting your privacy and handling your data with transparency and care. 
                Our platform implements industry-standard security measures and follows GDPR, CCPA, and other relevant data protection regulations.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Personal Information:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and contact details</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Email address for account creation and communications</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Usage Information:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Shopping preferences and history</li>
                  <li>Website interaction data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Improve our products and services</li>
                <li>Detect and prevent fraud</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Security Measures:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS encryption for all data transmission</li>
                  <li>PCI DSS compliance for payment processing</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure data storage with encryption at rest</li>
                  <li>Access controls and authentication protocols</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Bell className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Your Privacy Choices</h2>
              <div className="space-y-4">
                <p>You can control your privacy preferences and:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Opt-out of marketing communications</li>
                  <li>Request access to your personal data</li>
                  <li>Request deletion of your data</li>
                  <li>Update your information</li>
                  <li>Control cookie preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <UserCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-4">Under applicable data protection laws, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request data deletion</li>
                  <li>Object to data processing</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="mb-4">
            For any privacy-related questions or requests, please contact our Data Protection Officer at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>Email: privacy@dropstore.com</p>
            <p>Address: [Your Business Address]</p>
            <p>Phone: [Your Business Phone]</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. The latest version will always be 
            posted on this page with the effective date.
          </p>
          <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </section>
      </div>
    </div>
  );
}