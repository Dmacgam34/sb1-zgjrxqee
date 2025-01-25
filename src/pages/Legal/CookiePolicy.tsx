import React from 'react';
import { Cookie, Shield, Settings, Bell, HelpCircle } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p className="mb-4">
                Cookies are small text files stored on your device when you visit our website. 
                They help us provide you with a better experience by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remembering your preferences</li>
                <li>Keeping you signed in</li>
                <li>Understanding how you use our site</li>
                <li>Improving our services based on your behavior</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Settings className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Essential Cookies</h3>
                  <p>Required for basic site functionality and security. Cannot be disabled.</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Authentication</li>
                    <li>Security features</li>
                    <li>Shopping cart functionality</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Analytics Cookies</h3>
                  <p>Help us understand how visitors interact with our website.</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Page views and navigation</li>
                    <li>Time spent on site</li>
                    <li>Error encounters</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Functional Cookies</h3>
                  <p>Remember your preferences and personalize your experience.</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Language preferences</li>
                    <li>Region settings</li>
                    <li>Personalized recommendations</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Marketing Cookies</h3>
                  <p>Used to deliver relevant advertisements and track their effectiveness.</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Ad personalization</li>
                    <li>Campaign measurement</li>
                    <li>Cross-site tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Cookie Security</h2>
              <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                <p>We protect your privacy by:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encrypting cookie data</li>
                  <li>Regular security audits</li>
                  <li>Limited data retention</li>
                  <li>Secure data transmission</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Bell className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
              <div className="space-y-4">
                <p>You can control and/or delete cookies as you wish:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Browser Settings:</span>
                    <p className="text-gray-600">
                      Most browsers allow you to refuse to accept cookies and to delete them.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Cookie Preferences:</span>
                    <p className="text-gray-600">
                      Use our cookie preference center to customize your cookie settings.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Third-Party Tools:</span>
                    <p className="text-gray-600">
                      Various tools are available to manage cookies across all websites.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>For questions about our cookie policy, contact us at:</p>
                <p className="mt-2">Email: privacy@dropstore.com</p>
                <p>Phone: [Your Privacy Team Phone]</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}