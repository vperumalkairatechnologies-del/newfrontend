import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../api/useAuth';

export default function AdminUsers() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
      return;
    }
    loadUsers();
  }, [filter]);

  const loadUsers = async () => {
    try {
      const params = {};
      if (filter !== 'all') params.role = filter;
      const res = await axios.get('/admin?action=users', { params });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, updates) => {
    try {
      await axios.put(`/admin?action=user&id=${userId}`, updates);
      loadUsers();
    } catch (err) {
      alert('Failed to update user');
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/admin?action=user&id=${userId}`);
      loadUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.username?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <button onClick={() => navigate('/admin')} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Back to Admin
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search by email or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg"
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
              <option value="all">All Users</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{user.username || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateUser(user.id, { role: e.target.value })}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.plan_status === 'active' ? 'bg-green-100 text-green-800' :
                      user.plan_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.plan_status || 'none'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
}
