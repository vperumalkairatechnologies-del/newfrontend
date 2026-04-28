import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, CreditCard, TrendingUp, Clock, ArrowRight, BarChart2, Eye, Shield } from 'lucide-react'
import axios from '../api/axios'
import { useAuth } from '../api/useAuth'
import Navbar from '../components/Navbar'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { isAdmin, loading: authLoading } = useAuth()
  const [stats, setStats] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!isAdmin()) { navigate('/dashboard'); return }
    Promise.all([axios.get('/admin'), axios.get('/admin?action=analytics')])
      .then(([s, a]) => { setStats(s.data.stats); setAnalytics(a.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [authLoading])

  if (authLoading || loading) return (
    <><Navbar /><div className="flex items-center justify-center min-h-[70vh]"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div></>
  )

  const statCards = [
    { label: 'Total Users', value: stats?.total_users ?? 0, icon: <Users size={16} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Free Users', value: stats?.free_users ?? 0, icon: <Users size={16} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Premium Users', value: stats?.premium_users ?? 0, icon: <CreditCard size={16} />, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Pending Requests', value: stats?.pending_requests ?? 0, icon: <Clock size={16} />, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  const activityStats = [
    { label: 'Total Cards', value: analytics?.total_cards ?? 0 },
    { label: 'Total Views', value: analytics?.total_views ?? 0 },
    { label: 'Total Leads', value: analytics?.total_leads ?? 0 },
    { label: 'New Users (7d)', value: analytics?.new_users_7d ?? 0 },
    { label: 'New Cards (7d)', value: analytics?.new_cards_7d ?? 0 },
    { label: 'Views (7d)', value: analytics?.views_7d ?? 0 },
  ]

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 bg-violet-100 rounded-lg flex items-center justify-center">
                <Shield size={14} className="text-violet-600" />
              </div>
              <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Admin Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Platform overview and management</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/admin/users')} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all">
              <Users size={15} /> Manage Users
            </button>
            <button onClick={() => navigate('/admin/requests')} className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-all">
              <Clock size={15} /> Requests {stats?.pending_requests > 0 && <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">{stats.pending_requests}</span>}
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((s, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className={`w-8 h-8 ${s.bg} rounded-xl flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center">
              <BarChart2 size={15} className="text-teal-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800">Platform Activity</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {activityStats.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">{s.label}</span>
                <span className="text-sm font-bold text-gray-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => navigate('/admin/users')} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <Users size={16} className="text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">User Management</p>
                <p className="text-xs text-gray-400">View, edit and delete users</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
          </button>
          <button onClick={() => navigate('/admin/requests')} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-violet-200 hover:bg-violet-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                <CreditCard size={16} className="text-violet-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">Premium Requests</p>
                <p className="text-xs text-gray-400">{stats?.pending_requests ?? 0} pending approval</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-400 group-hover:text-violet-500 transition-colors" />
          </button>
        </div>
      </main>
    </>
  )
}
