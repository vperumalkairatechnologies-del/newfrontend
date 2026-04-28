import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Trash2, ChevronLeft, Users } from 'lucide-react'
import axios from '../api/axios'
import { useAuth } from '../api/useAuth'
import Navbar from '../components/Navbar'

const ROLE_STYLES = {
  admin:   'bg-violet-100 text-violet-700',
  premium: 'bg-indigo-100 text-indigo-700',
  free:    'bg-gray-100 text-gray-600',
}

export default function AdminUsers() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!isAdmin()) { navigate('/dashboard'); return }
    loadUsers()
  }, [filter])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? { role: filter } : {}
      const res = await axios.get('/admin?action=users', { params })
      setUsers(res.data.users || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (userId, updates) => {
    try {
      await axios.put(`/admin?action=user&id=${userId}`, updates)
      loadUsers()
    } catch { alert('Failed to update user') }
  }

  const deleteUser = async (userId) => {
    if (!confirm('Delete this user permanently?')) return
    try {
      await axios.delete(`/admin?action=user&id=${userId}`)
      loadUsers()
    } catch { alert('Failed to delete user') }
  }

  const filtered = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronLeft size={16} /> Admin
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-gray-800">User Management</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-sm text-gray-500 mt-0.5">{filtered.length} users found</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="all">All Roles</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Table — desktop */}
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <>
            <div className="hidden sm:block bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {(u.name || u.email)?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{u.name || '—'}</p>
                            <p className="text-xs text-gray-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={u.role}
                          onChange={e => updateUser(u.id, { role: e.target.value })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${ROLE_STYLES[u.role] || ROLE_STYLES.free}`}
                        >
                          <option value="free">Free</option>
                          <option value="premium">Premium</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                          u.plan_status === 'active' ? 'bg-green-100 text-green-700' :
                          u.plan_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>{u.plan_status || 'none'}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-400">{new Date(u.created_at).toLocaleDateString()}</td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => deleteUser(u.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Users size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No users found</p>
                </div>
              )}
            </div>

            {/* Cards — mobile */}
            <div className="sm:hidden space-y-3">
              {filtered.map(u => (
                <div key={u.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                        {(u.name || u.email)?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{u.name || '—'}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteUser(u.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={u.role}
                      onChange={e => updateUser(u.id, { role: e.target.value })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border-0 cursor-pointer focus:outline-none ${ROLE_STYLES[u.role] || ROLE_STYLES.free}`}
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                      <option value="admin">Admin</option>
                    </select>
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                      u.plan_status === 'active' ? 'bg-green-100 text-green-700' :
                      u.plan_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>{u.plan_status || 'none'}</span>
                    <span className="text-xs text-gray-400 ml-auto">{new Date(u.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
                  <p className="text-sm">No users found</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  )
}
