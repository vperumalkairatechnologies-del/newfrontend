import { useState, useEffect, useContext, createContext } from 'react'
import api from './axios'

export const FEATURES = {
  COVER_PHOTO:        'cover_photo',
  COMPANY_LOGO:       'company_logo',
  VIRTUAL_BACKGROUND: 'virtual_background',
  CUSTOM_COLORS:      'custom_colors',
  THEME_COLORS:       'theme_colors',
  SOCIAL_LINKS:       'social_links',
  ADVANCED_ANALYTICS: 'advanced_analytics',
  CUSTOM_FIELDS:      'custom_fields',
  LEAD_CAPTURE:       'lead_capture',
}

export const AuthContext = createContext(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export function useAuthState() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null }
  })
  const [features, setFeatures] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }
    const init = async () => {
      try {
        const res = await api.get('/auth/me')
        const freshUser = res.data.user
        localStorage.setItem('user', JSON.stringify(freshUser))
        setUser(freshUser)
        try {
          const fr = await api.get('/premium/features')
          setFeatures(fr.data.features)
        } catch {}
      } catch (err) {
        if (err.response?.status !== 401) {
          const cached = localStorage.getItem('user')
          if (cached) try { setUser(JSON.parse(cached)) } catch {}
        }
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const isAdmin   = () => user?.role === 'admin'
  const isPremium = () => user?.role === 'premium' || user?.role === 'admin' || user?.plan_status === 'active'
  const isFree    = () => {
    if (!user) return false
    if (user.role === 'free' || user.role === 'user') return true
    if (!user.role || (user.role !== 'admin' && user.role !== 'premium' && user.plan_status !== 'active')) return true
    return false
  }
  const isPending = () => user?.plan_status === 'pending'

  const canAccessFeature = (featureName) => {
    if (isAdmin() || isPremium()) return true
    if (!features) return false
    return features[featureName]?.enabled || false
  }

  const getFeatureLimit = (featureName) => {
    if (isAdmin() || isPremium()) return -1
    if (isFree()) {
      switch (featureName) {
        case 'theme_colors':        return 10
        case 'cover_photo':
        case 'company_logo':
        case 'virtual_background':
        case 'custom_colors':       return 0
        default:                    return -1
      }
    }
    if (!features) return 0
    const limit = features[featureName]?.limit
    return limit !== undefined ? limit : -1
  }

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me')
      const freshUser = res.data.user
      localStorage.setItem('user', JSON.stringify(freshUser))
      setUser(freshUser)
    } catch {}
  }

  return {
    user, features, loading,
    isAdmin, isPremium, isFree, isPending,
    canAccessFeature, getFeatureLimit, refreshUser,
  }
}
