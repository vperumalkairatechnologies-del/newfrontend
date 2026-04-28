import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../api/useAuth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load
    
    if (!isAdmin()) {
      navigate('/dashboard');
      return;
    }
    loadData();
  }, [authLoading, isAdmin, navigate]);

  const loadData = async () => {
    try {
      const [statsRes, analyticsRes] = await Promise.all([
        axios.get('/admin'),
        axios.get('/admin?action=analytics')
      ]);
      setStats(statsRes.data.stats);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage users and platform settings</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button onClick={() => navigate('/admin/users')} className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-indigo-600 text-white text-sm sm:text-base rounded-lg hover:bg-indigo-700">
              Manage Users
            </button>
            <button onClick={() => navigate('/admin/requests')} className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700">
              Premium Requests
            </button>
            <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-600 text-white text-sm sm:text-base rounded-lg hover:bg-gray-700">
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Total Users</div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stats?.total_users || 0}</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Free Users</div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{stats?.free_users || 0}</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Premium Users</div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">{stats?.premium_users || 0}</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Pending Requests</div>
            <div className="text-2xl sm:text-3xl font-bold text-orange-600">{stats?.pending_requests || 0}</div>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Platform Activity</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex justify-between items-center p-2 sm:p-0">
                <span className="text-xs sm:text-sm text-gray-600">Total Cards</span>
                <span className="font-semibold text-xs sm:text-sm">{analytics?.total_cards || 0}</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-0">
                <span className="text-xs sm:text-sm text-gray-600">Total Views</span>
                <span className="font-semibold text-xs sm:text-sm">{analytics?.total_views || 0}</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-0">
                <span className="text-xs sm:text-sm text-gray-600">Total Leads</span>
                <span className="font-semibold text-xs sm:text-sm">{analytics?.total_leads || 0}</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-0">
                <span className="text-xs sm:text-sm text-gray-600">New Users (7d)</span>
                <span className="font-semibold text-xs sm:text-sm">{analytics?.new_users_7d || 0}</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-0">
                <span className="text-xs sm:text-sm text-gray-600">New Cards (7d)</span>
                <span className="font-semibold text-xs sm:text-sm">{analytics?.new_cards_7d || 0}</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-0">
                <span className="text-xs sm:text-sm text-gray-600">Views (7d)</span>
                <span className="font-semibold text-xs sm:text-sm">{analytics?.views_7d || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
