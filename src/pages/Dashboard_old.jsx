import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, QrCode, Pencil, TrendingUp, ExternalLink, Sparkles, Trash2, Share2, Copy, Check, Users, BarChart2 } from 'lucide-react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import CardPreview from '../components/CardPreview'
import QRModal from '../components/QRModal'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [showQR, setShowQR] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsRes = await api.get('/cards')
        const userCards = cardsRes.data.cards || []
        setCards(userCards)
        
        // Select the first card by default, or the most recently updated one
        if (userCards.length > 0) {
          const cardToSelect = userCards[0] // You could change this to select most recently used
          setSelectedCard(cardToSelect)
          
          // Fetch analytics for the selected card
          const analyticsRes = await api.get(`/analytics/${cardToSelect.id}`)
          setAnalytics(analyticsRes.data)
        }
      } catch (err) {
        if (err.response?.status !== 404) console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const basePath = import.meta.env.MODE === 'production' ? '/demo/vcard' : ''
  const publicUrl = selectedCard ? `${window.location.origin}${basePath}/card/${selectedCard.id}` : ''

  const copyLink = async () => {
    if (publicUrl) {
      await navigator.clipboard.writeText(publicUrl).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDeleteCard = async () => {
    if (!selectedCard?.id) return
    if (!confirm('Delete this card permanently?')) return
    setDeleting(true)
    try {
      await api.delete(`/cards/${selectedCard.id}`)
      
      // Remove from local state
      setCards(prev => prev.filter(c => c.id !== selectedCard.id))
      
      // Select another card if available
      const remainingCards = cards.filter(c => c.id !== selectedCard.id)
      if (remainingCards.length > 0) {
        setSelectedCard(remainingCards[0])
        // Fetch analytics for new selected card
        try {
          const analyticsRes = await api.get(`/analytics/${remainingCards[0].id}`)
          setAnalytics(analyticsRes.data)
        } catch (err) {
          console.error('Failed to fetch analytics:', err)
          setAnalytics(null)
        }
      } else {
        setSelectedCard(null)
        setAnalytics(null)
      }
      
      localStorage.removeItem('smartcard_editor')
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete card.')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading your dashboard…</p>
          </div>
        </div>
      </>
    )
  }

  const createNewCard = async () => {
    setCreating(true)
    try {
      const res = await api.post('/cards', {
        title: `Business Card ${cards.length + 1}`,
        company: '',
        bio: '',
        photo: '',
        theme: 'default'
      })
      
      const newCard = res.data.card
      setCards(prev => [newCard, ...prev])
      setSelectedCard(newCard)
      setAnalytics(null) // Reset analytics for new card
      
      // Navigate to editor with the new card
      window.location.href = `/editor?cardId=${newCard.id}`
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create new card.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* ── Header ── */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Hey, <span className="gradient-text">{user.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-sm text-gray-400 mt-1">Manage your business cards</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={createNewCard}
              disabled={creating}
              className="btn-primary text-sm py-2.5 px-4 sm:py-2 sm:px-4 justify-center"
            >
              {creating ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} /> Create New Card
                </>
              )}
            </button>
            {selectedCard && (
              <>
                <Link to={`/editor?cardId=${selectedCard.id}`} className="btn-primary text-sm py-2.5 px-4 sm:py-2 sm:px-4 justify-center">
                  <Pencil size={14} /> Edit Card
                </Link>
                <button onClick={() => setShowQR(true)} className="btn-secondary text-sm py-2.5 px-4 sm:py-2 sm:px-4 justify-center">
                  <QrCode size={14} /> QR Code
                </button>
                <button onClick={copyLink} className="btn-secondary text-sm py-2.5 px-4 sm:py-2 sm:px-4 justify-center">
                  {copied ? <><Check size={14} className="text-green-500" /> Copied!</> : <><Copy size={14} /> Copy Link</>}
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Cards List ── */}
        {cards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Cards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedCard?.id === card.id
                      ? 'border-indigo-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedCard(card)
                    // Fetch analytics for selected card
                    api.get(`/analytics/${card.id}`)
                      .then(res => setAnalytics(res.data))
                      .catch(() => setAnalytics(null))
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{card.title || 'Untitled Card'}</h3>
                      <p className="text-sm text-gray-500 truncate">{card.company || 'No company'}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      card.is_active ? 'bg-green-400' : 'bg-gray-300'
                    }`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Created {new Date(card.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                      <Link
                        to={`/editor?cardId=${card.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                      >
                        <Pencil size={14} className="text-gray-600" />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm(`Delete "${card.title || 'Untitled Card'}"?`)) {
                            api.delete(`/cards/${card.id}`)
                              .then(() => {
                                setCards(prev => prev.filter(c => c.id !== card.id))
                                if (selectedCard?.id === card.id) {
                                  const remaining = cards.filter(c => c.id !== card.id)
                                  if (remaining.length > 0) {
                                    setSelectedCard(remaining[0])
                                  } else {
                                    setSelectedCard(null)
                                    setAnalytics(null)
                                  }
                                }
                              })
                              .catch(err => alert(err.response?.data?.error || 'Failed to delete card'))
                          }
                        }}
                        className="p-1.5 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Public URL bar ── */}
        {selectedCard && (
          <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 mb-6 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <ExternalLink size={14} className="text-indigo-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">Public URL for: {selectedCard.title || 'Untitled Card'}</p>
              <a href={publicUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline truncate block">{publicUrl}</a>
            </div>
            <a href={publicUrl} target="_blank" rel="noreferrer" className="btn-secondary text-xs py-1.5 px-3 flex-shrink-0">
              <Share2 size={12} /> View
            </a>
          </div>
        )}

        {/* ── Stats ── */}
        {analytics && selectedCard && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Analytics for: {selectedCard.title || 'Untitled Card'}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Total Views', value: analytics.total_views, icon: <Eye size={16} />, color: 'indigo', bg: 'bg-indigo-50', text: 'text-indigo-500' },
                { label: 'This Week', value: analytics.last_7_days.reduce((s, d) => s + d.views, 0), icon: <TrendingUp size={16} />, color: 'purple', bg: 'bg-purple-50', text: 'text-purple-500' },
                { label: 'Leads', value: analytics.total_leads ?? 0, icon: <Users size={16} />, color: 'pink', bg: 'bg-pink-50', text: 'text-pink-500' },
                { label: 'Avg / Day', value: analytics.last_7_days.length ? Math.round(analytics.last_7_days.reduce((s, d) => s + d.views, 0) / 7) : 0, icon: <BarChart2 size={16} />, color: 'teal', bg: 'bg-teal-50', text: 'text-teal-500' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${s.bg} flex items-center justify-center ${s.text}`}>{s.icon}</div>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Chart + Card Preview ── */}
        {selectedCard && (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
            {/* Chart */}
            {analytics && (
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
                    <TrendingUp size={14} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Views — Last 7 days</p>
                    <p className="text-xs text-gray-400">{analytics.last_7_days.reduce((s, d) => s + d.views, 0)} total views</p>
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-28">
                  {analytics.last_7_days.map((d, i) => {
                    const maxViews = Math.max(...analytics.last_7_days.map(x => x.views), 1)
                    const pct = Math.round((d.views / maxViews) * 100)
                    return (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group" title={`${d.date}: ${d.views} views`}>
                        <span className="text-[9px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{d.views}</span>
                        <div className="w-full rounded-t-lg transition-all duration-500 bg-gradient-to-t from-indigo-500 to-purple-400 group-hover:from-indigo-600 group-hover:to-purple-500"
                          style={{ height: `${Math.max(pct, 4)}%` }} />
                        <span className="text-[9px] text-gray-300">{d.date?.slice(5)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Card Preview */}
            <div className={analytics ? 'lg:col-span-3' : 'lg:col-span-5'}>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-sm font-semibold text-gray-700">Live Card Preview</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/editor?cardId=${selectedCard.id}`} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors">
                      <Pencil size={11} /> Edit
                    </Link>
                    <button onClick={handleDeleteCard} disabled={deleting} className="text-xs text-red-400 hover:text-red-500 font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 size={11} /> {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
                <CardPreview card={{ ...selectedCard, name: selectedCard.name || user.name, email: selectedCard.email || user.email }} />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-dashed border-indigo-200 rounded-2xl p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg animate-float">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Create your digital card</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">Share your contact info with a beautiful, shareable link. Free forever.</p>
                <button onClick={createNewCard} disabled={creating} className="btn-primary">
                  {creating ? (
                    <>
                      <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Pencil size={16} /> Create your card
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* QR Modal */}
      {showQR && selectedCard && (
        <QRModal
          card={selectedCard}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  )
}
