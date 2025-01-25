import React from 'react';
import { MapPin, Phone, Mail, Clock, Globe, Shield } from 'lucide-react';

export default function BusinessInfo() {
  const businessInfo = {
    name: "DropStore Inc.",
    registration: "123456789",
    vat: "GB123456789",
    address: {
      street: "123 Commerce Street",
      city: "London",
      state: "",
      postal: "EC1A 1BB",
      country: "United Kingdom"
    },
    contact: {
      phone: "+44 20 1234 5678",
      email: "support@dropstore.com",
      sales: "sales@dropstore.com"
    },
    hours: {
      weekday: "9:00 AM - 6:00 PM GMT",
      weekend: "10:00 AM - 4:00 PM GMT",
      support: "24/7 Online Support"
    },
    social: {
      twitter: "https://twitter.com/dropstore",
      facebook: "https://facebook.com/dropstore",
      instagram: "https://instagram.com/dropstore",
      linkedin: "https://linkedin.com/company/dropstore"
    },
    legal: {
      company: "DropStore Limited",
      incorporation: "Registered in England and Wales",
      number: "Company No. 12345678"
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">{businessInfo.name}</h1>
            <p className="text-gray-600">Your Trusted E-commerce Partner</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Office Address</p>
                  <address className="not-italic text-gray-600">
                    {businessInfo.address.street}<br />
                    {businessInfo.address.city} {businessInfo.address.postal}<br />
                    {businessInfo.address.country}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Phone Numbers</p>
                  <p className="text-gray-600">Main: {businessInfo.contact.phone}</p>
                  <p className="text-gray-600">Support: 24/7 Live Chat</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Email Addresses</p>
                  <p className="text-gray-600">Support: {businessInfo.contact.email}</p>
                  <p className="text-gray-600">Sales: {businessInfo.contact.sales}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-gray-600">Weekdays: {businessInfo.hours.weekday}</p>
                  <p className="text-gray-600">Weekends: {businessInfo.hours.weekend}</p>
                  <p className="text-gray-600">Support: {businessInfo.hours.support}</p>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>
              
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Legal Entity</p>
                  <p className="text-gray-600">{businessInfo.legal.company}</p>
                  <p className="text-gray-600">{businessInfo.legal.incorporation}</p>
                  <p className="text-gray-600">{businessInfo.legal.number}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Business Registration</p>
                  <p className="text-gray-600">Registration No: {businessInfo.registration}</p>
                  <p className="text-gray-600">VAT No: {businessInfo.vat}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Connect With Us</h3>
                <div className="flex gap-4">
                  {Object.entries(businessInfo.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Customer Support</h3>
                <p className="text-gray-600">
                  24/7 support via live chat, email, or phone. We're here to help!
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Shipping Information</h3>
                <p className="text-gray-600">
                  Worldwide shipping available. Free shipping on orders over $50.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Returns & Refunds</h3>
                <p className="text-gray-600">
                  30-day return policy with hassle-free refunds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}