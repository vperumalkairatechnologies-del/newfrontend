import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Crown, Zap, Star, Loader } from 'lucide-react'
import { useAuth } from '../api/useAuth'
import api from '../api/axios'
import Navbar from '../components/Navbar'

export default function Upgrade() {
  const navigate = useNavigate()
  const { user, isPremium, isPending, isAdmin } = useAuth()
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [requestStatus, setRequestStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAdmin()) {
      navigate('/admin')
      return
    }
    if (isPremium()) {
      navigate('/dashboard')
      return
    }
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
      await api.post('/premium/request', { message })
      alert('Premium request submitted successfully! We will review your request soon.')
      loadRequestStatus()
      setMessage('')
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
              <Crown className="text-yellow-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">Upgrade to Premium</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Unlock <span className="gradient-text">Premium Features</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get access to advanced features and take your digital business card to the next level
            </p>
          </div>

          {/* Request Status */}
          {requestStatus && (
            <div className={`max-w-2xl mx-auto mb-8 p-6 rounded-2xl border-2 animate-fade-in-up ${
              requestStatus.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
              requestStatus.status === 'approved' ? 'bg-green-50 border-green-200' :
              'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  requestStatus.status === 'pending' ? 'bg-yellow-100' :
                  requestStatus.status === 'approved' ? 'bg-green-100' :
                  'bg-red-100'
                }`}>
                  {requestStatus.status === 'pending' && <Loader className="text-yellow-600 animate-spin" size={20} />}
                  {requestStatus.status === 'approved' && <Check className="text-green-600" size={20} />}
                  {requestStatus.status === 'rejected' && <X className="text-red-600" size={20} />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {requestStatus.status === 'pending' && 'Request Pending Review'}
                    {requestStatus.status === 'approved' && 'Request Approved!'}
                    {requestStatus.status === 'rejected' && 'Request Not Approved'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {requestStatus.status === 'pending' && 'Your premium access request is being reviewed by our admin team. We will notify you once it\'s processed.'}
                    {requestStatus.status === 'approved' && 'Congratulations! Your premium access has been approved. Refresh the page to access premium features.'}
                    {requestStatus.status === 'rejected' && (requestStatus.admin_note || 'Your request was not approved. Please contact support for more information.')}
                  </p>
                  <p className="text-xs text-gray-400">
                    Requested: {new Date(requestStatus.requested_at).toLocaleDateString()}
                    {requestStatus.processed_at && ` • Processed: ${new Date(requestStatus.processed_at).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              
              {/* Feature Names */}
              <div className="p-8 bg-gray-50">
                <div className="h-24 flex items-center">
                  <h3 className="text-lg font-bold text-gray-900">Features</h3>
                </div>
                <div className="space-y-4">
                  {features.map((feature, i) => (
                    <div key={i} className="h-12 flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Plan */}
              <div className="p-8">
                <div className="h-24 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Free Plan</h3>
                  <p className="text-sm text-gray-500">Basic features</p>
                </div>
                <div className="space-y-4">
                  {features.map((feature, i) => (
                    <div key={i} className="h-12 flex items-center">
                      {typeof feature.free === 'boolean' ? (
                        feature.free ? (
                          <Check className="text-green-500" size={20} />
                        ) : (
                          <X className="text-gray-300" size={20} />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{feature.free}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Plan */}
              <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="h-24 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold gradient-text">Premium Plan</h3>
                    <Star className="text-yellow-500 fill-yellow-500" size={20} />
                  </div>
                  <p className="text-sm text-indigo-600 font-medium">All features unlocked</p>
                </div>
                <div className="space-y-4">
                  {features.map((feature, i) => (
                    <div key={i} className="h-12 flex items-center">
                      {typeof feature.premium === 'boolean' ? (
                        feature.premium ? (
                          <Check className="text-indigo-600" size={20} />
                        ) : (
                          <X className="text-gray-300" size={20} />
                        )
                      ) : (
                        <span className="text-sm font-medium text-indigo-600">{feature.premium}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Request Form */}
          {!requestStatus && (
            <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <Zap className="text-indigo-500 mx-auto mb-3" size={40} />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Premium Access</h2>
                  <p className="text-gray-600">Tell us why you need premium features</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      value={user?.email || ''}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Tell us about your use case, business needs, or why you need premium access..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-3 text-base"
                  >
                    {submitting ? (
                      <>
                        <Loader className="animate-spin" size={18} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Crown size={18} />
                        Request Premium Access
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-500">
                    Your request will be reviewed by our admin team within 24-48 hours
                  </p>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
