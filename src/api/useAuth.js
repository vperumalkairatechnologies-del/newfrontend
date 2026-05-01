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
  CSV_EXPORT:         'csv_export',
  CUSTOM_SLUG:        'custom_slug',
}

// Plan levels: basic=0, pro=1, advanced=2, admin=99
const PLAN_LEVELS = { basic: 0, free: 0, user: 0, pro: 1, premium: 1, advanced: 2, admin: 99 }
const planLevel = (role) => PLAN_LEVELS[role] ?? 0

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

  const isAdmin    = () => user?.role === 'admin'
  const isAdvanced = () => planLevel(user?.role) >= 2 || user?.role === 'admin'
  const isPro      = () => planLevel(user?.role) >= 1 || user?.role === 'admin'
  const isBasic    = () => planLevel(user?.role) === 0
  // keep isPremium as alias for isPro for backward compat
  const isPremium  = () => isPro()
  const isFree     = () => isBasic()
  const isPending  = () => user?.plan_status === 'pending'

  const getPlanLevel = () => planLevel(user?.role)

  const canAccessFeature = (featureName) => {
    if (isAdmin()) return true
    // Feature access by plan
    const featurePlanMap = {
      cover_photo:         1,  // pro+
      company_logo:        1,
      custom_color_picker: 1,
      advanced_analytics:  1,
      custom_fields:       1,
      lead_capture:        1,
      virtual_background:  2,  // advanced only
      csv_export:          2,
      custom_slug:         2,
    }
    const required = featurePlanMap[featureName] ?? 0
    return getPlanLevel() >= required
  }

  const getFeatureLimit = (featureName) => {
    if (isAdmin()) return -1
    if (isAdvanced()) return -1
    if (isPro()) {
      if (featureName === 'theme_colors') return -1
      if (featureName === 'social_links') return -1
      if (featureName === 'virtual_background') return 0
      if (featureName === 'csv_export') return 0
      if (featureName === 'custom_slug') return 0
      return -1
    }
    // basic
    switch (featureName) {
      case 'theme_colors':        return 10
      case 'social_links':        return 5
      case 'cover_photo':
      case 'company_logo':
      case 'virtual_background':
      case 'custom_colors':
      case 'csv_export':
      case 'custom_slug':         return 0
      default:                    return -1
    }
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
    isAdmin, isAdvanced, isPro, isBasic,
    isPremium, isFree, isPending,
    getPlanLevel, canAccessFeature, getFeatureLimit, refreshUser,
  }
}
