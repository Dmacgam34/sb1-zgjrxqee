import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
      marketing: true
    });
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true
    });
    setShow(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShow(false);
  };

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    // Implement actual cookie management here
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
              <p className="text-gray-600 mb-4">
                We use cookies to enhance your browsing experience, serve personalized ads or content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="text-blue-600 rounded"
                  />
                  <label className="text-sm">
                    <span className="font-medium">Essential Cookies</span>
                    <span className="text-gray-600 block">Required for the website to function</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="text-blue-600 rounded"
                  />
                  <label className="text-sm">
                    <span className="font-medium">Analytics Cookies</span>
                    <span className="text-gray-600 block">Help us improve our website</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="text-blue-600 rounded"
                  />
                  <label className="text-sm">
                    <span className="font-medium">Marketing Cookies</span>
                    <span className="text-gray-600 block">Used to deliver personalized ads</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}