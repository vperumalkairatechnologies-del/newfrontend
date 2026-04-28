import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../api/useAuth';

export default function AdminRequests() {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin()) {
      navigate('/dashboard');
      return;
    }
    loadRequests();
  }, [filter, authLoading]); // removed isAdmin from deps — it's a stable function ref issue

  const loadRequests = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : { status: 'all' };
      const res = await axios.get('/admin/requests', { params });
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error('Failed to load requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId, action) => {
    try {
      await axios.post(`/admin/requests/${requestId}/${action}`);
      alert(`Request ${action}d successfully!`)
      loadRequests();
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.error || `Failed to ${action} request`);
    }
  };

  if (authLoading || loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Premium Requests</h1>
          <button onClick={() => navigate('/admin')} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Back to Admin
          </button>
        </div>

        {/* Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{req.email}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      req.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{req.message || 'No message provided'}</p>
                  <div className="text-xs text-gray-500">
                    Requested: {new Date(req.created_at).toLocaleString()}
                  </div>
                  {req.reviewed_at && (
                    <div className="text-xs text-gray-500">
                      Reviewed: {new Date(req.reviewed_at).toLocaleString()}
                    </div>
                  )}
                </div>
                {req.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequest(req.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRequest(req.id, 'reject')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
              No {filter !== 'all' ? filter : ''} requests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
