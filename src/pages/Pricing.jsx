import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Zap, Crown, Rocket, Loader } from 'lucide-react'
import { useAuth } from '../api/useAuth'
import api from '../api/axios'
import Navbar from '../components/Navbar'

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    label: 'Free forever',
    icon: <Zap size={22} />,
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    features: [
      { text: '1 Digital Card', ok: true },
      { text: 'Profile Photo', ok: true },
      { text: '5 Social Links', ok: true },
      { text: '7-day Analytics', ok: true },
      { text: 'QR Code Share', ok: true },
      { text: 'Cover & Logo Photo', ok: false },
      { text: 'Custom Colors', ok: false },
      { text: 'Lead Capture', ok: false },
      { text: 'Virtual Background', ok: false },
      { text: 'CSV Export', ok: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    label: '/month',
    icon: <Crown size={22} />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-400',
    popular: true,
    features: [
      { text: '3 Digital Cards', ok: true },
      { text: 'Profile Photo', ok: true },
      { text: 'Unlimited Links', ok: true },
      { text: '30-day Analytics', ok: true },
      { text: 'QR Code Share', ok: true },
      { text: 'Cover & Logo Photo', ok: true },
      { text: 'Custom Colors', ok: true },
      { text: 'Lead Capture', ok: true },
      { text: 'Virtual Background', ok: false },
      { text: 'CSV Export', ok: false },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 799,
    label: '/month',
    icon: <Rocket size={22} />,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-400',
    features: [
      { text: 'Unlimited Cards', ok: true },
      { text: 'Profile Photo', ok: true },
      { text: 'Unlimited Links', ok: true },
      { text: 'Full Analytics History', ok: true },
      { text: 'QR Code Share', ok: true },
      { text: 'Cover & Logo Photo', ok: true },
      { text: 'Custom Colors', ok: true },
      { text: 'Lead Capture', ok: true },
      { text: 'Virtual Background', ok: true },
      { text: 'CSV Export', ok: true },
    ],
  },
]

export default function Pricing() {
  const navigate = useNavigate()
  const { user, isAdmin, isAdvanced, isPro, isBasic, loading: authLoading } = useAuth()
  const [paying, setPaying] = useState(null)

  const currentPlan = user?.role || 'basic'

  const handlePay = async (planId) => {
    if (!user) { navigate('/login'); return }
    if (planId === 'basic') return
    setPaying(planId)
    try {
      const res = await api.post('/pay/initiate', { plan: planId })
      window.location.href = res.data.redirect_url
    } catch (err) {
      alert(err.response?.data?.error || 'Payment initiation failed. Please try again.')
    } finally {
      setPaying(null)
    }
  }

  const getButtonLabel = (plan) => {
    if (authLoading) return 'Loading...'
    if (plan.id === 'basic') return 'Current Plan'
    if (isAdmin()) return 'Admin'
    if (plan.id === currentPlan) return 'Current Plan'
    if (plan.id === 'pro' && isAdvanced()) return 'Downgrade'
    return `Upgrade to ${plan.name}`
  }

  const isCurrentPlan = (plan) => {
    if (plan.id === 'basic' && isBasic()) return true
    return plan.id === currentPlan
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full mb-4">
              <Crown className="text-indigo-500" size={16} />
              <span className="text-sm font-semibold text-indigo-700">Simple Pricing</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose your plan</h1>
            <p className="text-gray-500 text-lg">Start free. Upgrade when you need more.</p>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl border-2 ${plan.popular ? plan.border + ' shadow-xl shadow-indigo-100' : 'border-slate-200 shadow-sm'} p-8 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                {/* Plan header */}
                <div className={`w-12 h-12 ${plan.bg} rounded-2xl flex items-center justify-center ${plan.color} mb-4`}>
                  {plan.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-6">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-gray-900">Free</span>
                  ) : (
                    <>
                      <span className="text-sm text-gray-400 mb-1">₹</span>
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-sm text-gray-400 mb-1">{plan.label}</span>
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {f.ok
                        ? <Check size={16} className="text-green-500 flex-shrink-0" />
                        : <X size={16} className="text-gray-300 flex-shrink-0" />
                      }
                      <span className={`text-sm ${f.ok ? 'text-gray-700' : 'text-gray-400'}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePay(plan.id)}
                  disabled={isCurrentPlan(plan) || paying === plan.id || isAdmin() || authLoading}
                  className={`w-full py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    isCurrentPlan(plan) || isAdmin()
                      ? 'bg-gray-100 text-gray-400 cursor-default'
                      : plan.popular
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                        : 'bg-slate-900 hover:bg-slate-800 text-white hover:-translate-y-0.5'
                  }`}
                >
                  {paying === plan.id
                    ? <><Loader size={16} className="animate-spin" /> Redirecting...</>
                    : getButtonLabel(plan)
                  }
                </button>
              </div>
            ))}
          </div>

          {/* Current plan badge */}
          {user && (
            <p className="text-center text-sm text-gray-400 mt-8">
              You are on the <span className="font-semibold text-gray-600 capitalize">{currentPlan}</span> plan.
              {user.plan_expires_at && (
                <span> Renews on {new Date(user.plan_expires_at).toLocaleDateString('en-IN')}.</span>
              )}
            </p>
          )}

          {/* Payment note */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Payments powered by PhonePe · Secure · Auto-renews monthly · Cancel anytime
          </p>
        </div>
      </div>
    </>
  )
}
