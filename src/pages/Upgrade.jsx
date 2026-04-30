import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Crown, Zap, Star, Loader, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '../api/useAuth'
import api from '../api/axios'
import Navbar from '../components/Navbar'

export default function Upgrade() {
  const navigate = useNavigate()
  const { user, isPremium, isPending, isAdmin } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [requestStatus, setRequestStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    if (isAdmin()) { navigate('/admin'); return }
    if (isPremium()) { navigate('/dashboard'); return }
    loadRequestStatus()
  }, [])

  const loadRequestStatus = async () => {
    try {
      const res = await api.get('/premium/status')
      setRequestStatus(res.data.request)
    } catch (err) {
      console.error('Failed to load request status:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/premium/request', { message: '' })
      alert('Premium request submitted successfully! We will review your request soon.')
      loadRequestStatus()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit request.')
    } finally {
      setSubmitting(false)
    }
  }

  const features = [
    { name: 'Digital Cards', free: '1 Card', premium: 'Unlimited Cards', icon: '🪪' },
    { name: 'Theme Colors', free: '5 Colors', premium: '20+ Colors + Custom', icon: '🎨' },
    { name: 'Social Links', free: '5 Links', premium: 'Unlimited Links', icon: '🔗' },
    { name: 'Profile Photo', free: true, premium: true, icon: '📸' },
    { name: 'Cover Photo', free: false, premium: true, icon: '🖼️' },
    { name: 'Company Logo', free: false, premium: true, icon: '🏢' },
    { name: 'Virtual Backgrounds', free: false, premium: true, icon: '🌈' },
    { name: 'Custom Color Picker', free: false, premium: true, icon: '🎨' },
    { name: 'Basic Analytics', free: true, premium: true, icon: '📊' },
    { name: 'Advanced Analytics', free: false, premium: true, icon: '📈' },
    { name: 'Custom Fields', free: false, premium: true, icon: '✏️' },
    { name: 'Lead Capture Form', free: false, premium: true, icon: '📩' },
    { name: 'QR Code', free: true, premium: true, icon: '📱' },
    { name: 'VCF Download', free: true, premium: true, icon: '💾' },
    { name: 'Priority Support', free: false, premium: true, icon: '🎯' },
  ]

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader className="animate-spin text-indigo-500" size={40} />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full mb-5">
              <Crown className="text-indigo-500" size={16} />
              <span className="text-sm font-semibold text-indigo-700">Premium Access</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Unlock Everything
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              One request. Full access. No credit card needed.
            </p>
          </div>

          {/* Perks row */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: '🪪', label: 'Unlimited Cards' },
              { icon: '📊', label: 'Advanced Analytics' },
              { icon: '🎨', label: 'Custom Themes' },
            ].map((p, i) => (
              <div key={i} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{p.icon}</div>
                <p className="text-xs font-semibold text-indigo-700">{p.label}</p>
              </div>
            ))}
          </div>

          {/* Request Form — TOP */}
          {!requestStatus && (
            <div className="animate-fade-in-up">
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <Crown size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Request Premium Access</h2>
                    <p className="text-sm text-gray-500">Admin will approve within 24 hours</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account Email</label>
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-sm">{user?.email || ''}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {submitting ? (
                      <><Loader className="animate-spin" size={18} /> Submitting Request...</>
                    ) : (
                      <><Zap size={18} /> Request Premium Access &rarr;</>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-4 pt-1">
                    {['No credit card', 'Free forever', 'Instant access'].map((t, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check size={12} className="text-green-500" />
                        <span className="text-xs text-gray-400">{t}</span>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Request Status */}
          {requestStatus && (
            <div className={`animate-fade-in-up rounded-3xl border-2 p-8 ${
              requestStatus.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
              requestStatus.status === 'approved' ? 'bg-green-50 border-green-200' :
              'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  requestStatus.status === 'pending' ? 'bg-yellow-100' :
                  requestStatus.status === 'approved' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {requestStatus.status === 'pending' && <Loader className="text-yellow-500 animate-spin" size={22} />}
                  {requestStatus.status === 'approved' && <Check className="text-green-600" size={22} />}
                  {requestStatus.status === 'rejected' && <X className="text-red-500" size={22} />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {requestStatus.status === 'pending' && '⏳ Request Under Review'}
                    {requestStatus.status === 'approved' && '🎉 Request Approved!'}
                    {requestStatus.status === 'rejected' && '❌ Request Not Approved'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {requestStatus.status === 'pending' && "Your request is being reviewed. We'll notify you once processed."}
                    {requestStatus.status === 'approved' && 'Your premium access is active. Refresh the page to access all features.'}
                    {requestStatus.status === 'rejected' && (requestStatus.admin_note || 'Your request was not approved. Please contact support.')}
                  </p>
                  <p className="text-xs text-gray-400">
                    Requested: {new Date(requestStatus.requested_at).toLocaleDateString()}
                    {requestStatus.processed_at && ` • Processed: ${new Date(requestStatus.processed_at).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Table — collapsible */}
          <div className="mt-8">
            <button
              onClick={() => setShowTable(v => !v)}
              className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
            >
              {showTable ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showTable ? 'Hide' : 'View'} full feature comparison
            </button>

            {showTable && (
              <div className="mt-4 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  <div className="p-6 bg-gray-50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Feature</p>
                    <div className="space-y-3">
                      {features.map((f, i) => (
                        <div key={i} className="h-10 flex items-center gap-2">
                          <span className="text-lg">{f.icon}</span>
                          <span className="text-xs font-medium text-gray-700">{f.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Free</p>
                    <div className="space-y-3">
                      {features.map((f, i) => (
                        <div key={i} className="h-10 flex items-center">
                          {typeof f.free === 'boolean'
                            ? f.free ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-gray-300" />
                            : <span className="text-xs text-gray-600">{f.free}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-indigo-50">
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">Premium ✦</p>
                    <div className="space-y-3">
                      {features.map((f, i) => (
                        <div key={i} className="h-10 flex items-center">
                          {typeof f.premium === 'boolean'
                            ? f.premium ? <Check size={16} className="text-indigo-500" /> : <X size={16} className="text-gray-300" />
                            : <span className="text-xs font-semibold text-indigo-600">{f.premium}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
