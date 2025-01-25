import React from 'react';
import { FileText, Shield, Scale, AlertTriangle, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing and using this website, you agree to be bound by these Terms of Service, 
                our Privacy Policy, and any other policies referenced herein. If you do not agree to 
                these terms, please do not use our services.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Account Security</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <p>You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Ensuring your account information is accurate and up-to-date</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Scale className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property Rights</h2>
              <div className="space-y-4">
                <p>
                  All content on this website, including but not limited to text, graphics, logos, 
                  images, and software, is our property or the property of our licensors and is 
                  protected by copyright and other intellectual property laws.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Prohibited Actions:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Copying or reproducing our content without permission</li>
                    <li>Modifying or creating derivative works</li>
                    <li>Using our content for commercial purposes without authorization</li>
                    <li>Removing any copyright or proprietary notices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <p>
                  To the fullest extent permitted by law, we shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your use or inability to use our services</li>
                  <li>Any unauthorized access to your account</li>
                  <li>Any interruption or cessation of transmission to or from our services</li>
                  <li>Any bugs, viruses, or other harmful code that may be transmitted</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Dispute Resolution</h2>
              <div className="space-y-4">
                <p>
                  Any disputes arising from or relating to these Terms shall be resolved through:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Informal negotiation first</li>
                  <li>Mediation if negotiation fails</li>
                  <li>Binding arbitration as a last resort</li>
                </ol>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="font-medium">Notice:</p>
                  <p>
                    By using our services, you agree to resolve disputes through binding arbitration 
                    and waive your right to participate in a class action lawsuit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will notify users of any 
            material changes via email or through our website. Your continued use of our services 
            after such modifications constitutes acceptance of the updated Terms.
          </p>
          <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>For any questions about these Terms, please contact us at:</p>
            <p>Email: legal@dropstore.com</p>
            <p>Address: [Your Business Address]</p>
            <p>Phone: [Your Business Phone]</p>
          </div>
        </section>
      </div>
    </div>
  );
}