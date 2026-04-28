import { useState, useEffect } from 'react'
import api from './axios'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [features, setFeatures] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setUser(parsed)
        loadFeatures()
      } catch (e) {
        console.error('Failed to parse user data:', e)
      }
    }
    setLoading(false)
  }, [])

  const loadFeatures = async () => {
    try {
      const res = await api.get('/premium/features')
      setFeatures(res.data.features)
    } catch (err) {
      console.error('Failed to load features:', err)
    }
  }

  const isAdmin = () => user?.role === 'admin'
  const isPremium = () => user?.role === 'premium' || user?.role === 'admin' || user?.plan_status === 'active'
  const isFree = () => {
    if (!user) return false
    // Handle legacy 'user' role as 'free'
    if (user.role === 'free' || user.role === 'user') return true
    // If no specific role and not premium/admin, consider as free
    if (!user.role || (user.role !== 'admin' && user.role !== 'premium' && user.plan_status !== 'active')) return true
    return false
  }
  const isPending = () => user?.plan_status === 'pending'

  const canAccessFeature = (featureName) => {
    if (isAdmin()) return true
    if (isPremium()) return true
    if (!features) return false
    return features[featureName]?.enabled || false
  }

  const getFeatureLimit = (featureName) => {
    if (isAdmin()) return -1 // -1 means unlimited
    if (isPremium()) return -1
    
    // For free users, implement specific limits
    if (isFree()) {
      switch (featureName) {
        case 'theme_colors':
          return 10 // Free users get 10 colors
        case 'cover_photo':
        case 'company_logo':
        case 'virtual_background':
        case 'custom_colors':
          return 0 // Not available for free users
        default:
          return -1 // Unlimited for other features
      }
    }
    
    // Fallback to features object if available
    if (!features) return 0
    const limit = features[featureName]?.limit
    return limit !== undefined ? limit : -1
  }

  return {
    user,
    features,
    loading,
    isAdmin,
    isPremium,
    isFree,
    isPending,
    canAccessFeature,
    getFeatureLimit,
    refreshUser: () => {
      const userData = localStorage.getItem('user')
      if (userData) setUser(JSON.parse(userData))
    }
  }
}

// Feature names constants
export const FEATURES = {
  COVER_PHOTO: 'cover_photo',
  COMPANY_LOGO: 'company_logo',
  VIRTUAL_BACKGROUND: 'virtual_background',
  CUSTOM_COLORS: 'custom_colors',
  THEME_COLORS: 'theme_colors',
  SOCIAL_LINKS: 'social_links',
  ADVANCED_ANALYTICS: 'advanced_analytics',
  CUSTOM_FIELDS: 'custom_fields',
  LEAD_CAPTURE: 'lead_capture',
}
