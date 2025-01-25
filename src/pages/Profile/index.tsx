import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { User, Settings, MapPin, Package, CreditCard, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      setUser(user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profile);
    } catch (error) {
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast.success('Successfully signed out');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const menuItems = [
    {
      icon: Settings,
      label: 'Account Settings',
      href: '/profile/settings'
    },
    {
      icon: MapPin,
      label: 'Addresses',
      href: '/profile/addresses'
    },
    {
      icon: Package,
      label: 'Orders',
      href: '/profile/orders'
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      href: '/profile/payment-methods'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile?.full_name || 'User'}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-lg border hover:border-blue-600 hover:bg-blue-50 transition-colors"
              >
                <item.icon className="w-6 h-6 text-blue-600" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>

          <button
            onClick={handleSignOut}
            className="mt-8 flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}