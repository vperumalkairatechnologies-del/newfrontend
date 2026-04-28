import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, QrCode, Pencil, TrendingUp, ExternalLink, Sparkles, Trash2, Share2, Copy, Check, Users, BarChart2, Plus, ArrowUpRight } from 'lucide-react'
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

  const publicUrl = selectedCard ? `${window.location.origin}/card/id/${selectedCard.id}` : ''

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsRes = await api.get('/cards')
        const userCards = cardsRes.data.cards || []
        setCards(userCards)
        if (userCards.length > 0) {
          setSelectedCard(userCards[0])
          api.get(`/analytics/${userCards[0].id}`).then(r => setAnalytics(r.data)).catch(() => {})
        }
      } catch (err) {
        if (err.response?.status !== 404) console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const handleFocus = async () => {
      try {
        const cardsRes = await api.get('/cards')
        const userCards = cardsRes.data.cards || []
        setCards(userCards)
        if (selectedCard) {
          const found = userCards.find(c => c.id === selectedCard.id)
          if (found) api.get(`/analytics/${found.id}`).then(r => setAnalytics(r.data)).catch(() => {})
        }
      } catch {}
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [selectedCard])

  const copyLink = async () => {
    if (!publicUrl) return
    await navigator.clipboard.writeText(publicUrl).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeleteCard = async () => {
    if (!selectedCard?.id || !confirm('Delete this card permanently?')) return
    setDeleting(true)
    try {
      await api.delete(`/cards/${selectedCard.id}`)
      const remaining = cards.filter(c => c.id !== selectedCard.id)
      setCards(remaining)
      setSelectedCard(remaining[0] || null)
      setAnalytics(null)
      if (remaining[0]) api.get(`/analytics/${remaining[0].id}`).then(r => setAnalytics(r.data)).catch(() => {})
      localStorage.removeItem('smartcard_editor')
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete card.')
    } finally {
      setDeleting(false)
    }
  }

  const createNewCard = async () => {
    setCreating(true)
    try {
      const res = await api.post('/cards', { title: `Business Card ${cards.length + 1}`, company: '', bio: '', photo: '', theme: 'default' })
      window.location.href = `/editor?cardId=${res.data.card.id}`
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create new card.')
      setCreating(false)
    }
  }

  const selectCard = (card) => {
    setSelectedCard(card)
    api.get(`/analytics/${card.id}`).then(r => setAnalytics(r.data)).catch(() => setAnalytics(null))
  }

  if (loading) return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading dashboard…</p>
        </div>
      </div>
    </>
  )

  const stats = analytics ? [
    { label: 'Total Views', value: analytics.total_views ?? 0, icon: <Eye size={15} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'This Week', value: analytics.last_7_days?.reduce((s, d) => s + d.views, 0) ?? 0, icon: <TrendingUp size={15} />, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Total Leads', value: analytics.total_leads ?? 0, icon: <Users size={15} />, color: 'text-pink-600', bg: 'bg-pink-50' },
    { label: 'Avg / Day', value: analytics.last_7_days?.length ? Math.round(analytics.last_7_days.reduce((s, d) => s + d.views, 0) / 7) : 0, icon: <BarChart2 size={15} />, color: 'text-teal-600', bg: 'bg-teal-50' },
  ] : []

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Hey, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{user.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">Here's what's happening with your cards</p>
          </div>
          <button
            onClick={createNewCard}
            disabled={creating}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            {creating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={16} />}
            New Card
          </button>
        </div>

        {!selectedCard ? (
          /* Empty state */
          <div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 border-2 border-dashed border-indigo-200 rounded-2xl p-12 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Create your first digital card</h3>
            <p className="text-gray-500 text-sm mb-5 max-w-xs mx-auto">Share your contact info with a beautiful, shareable link.</p>
            <button onClick={createNewCard} disabled={creating} className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all">
              {creating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={15} />}
              Create Card
            </button>
          </div>
        ) : (
          <>
            {/* Cards list — horizontal scroll on mobile */}
            {cards.length > 1 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Your Cards</p>
                <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                  {cards.map(card => (
                    <button
                      key={card.id}
                      onClick={() => selectCard(card)}
                      className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        selectedCard?.id === card.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${card.is_active ? 'bg-green-400' : 'bg-gray-300'}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">{card.title || 'Untitled'}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[120px]">{card.company || 'No company'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Public URL bar */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 shadow-sm">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ExternalLink size={15} className="text-indigo-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">Your public card URL</p>
                  <p className="text-sm text-indigo-600 font-medium truncate">{publicUrl || 'No slug set'}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <a href={publicUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all">
                  <ArrowUpRight size={13} /> View
                </a>
                <button onClick={copyLink} className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all">
                  {copied ? <><Check size={13} className="text-green-500" /> Copied</> : <><Copy size={13} /> Copy</>}
                </button>
                <button onClick={() => setShowQR(true)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all">
                  <QrCode size={13} /> QR
                </button>
              </div>
            </div>

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className={`w-8 h-8 ${s.bg} rounded-xl flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
                    <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Chart + Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Chart */}
              {analytics?.last_7_days?.length > 0 && (
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-violet-50 rounded-xl flex items-center justify-center">
                      <TrendingUp size={14} className="text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Views — Last 7 days</p>
                      <p className="text-xs text-gray-400">{analytics.last_7_days.reduce((s, d) => s + d.views, 0)} total</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5 h-24">
                    {analytics.last_7_days.map((d) => {
                      const max = Math.max(...analytics.last_7_days.map(x => x.views), 1)
                      const pct = Math.max(Math.round((d.views / max) * 100), 4)
                      return (
                        <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group" title={`${d.date}: ${d.views}`}>
                          <span className="text-[9px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{d.views}</span>
                          <div className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-400 transition-all" style={{ height: `${pct}%` }} />
                          <span className="text-[9px] text-gray-300">{d.date?.slice(5)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Card preview */}
              <div className={analytics?.last_7_days?.length > 0 ? 'lg:col-span-3' : 'lg:col-span-5'}>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-sm font-semibold text-gray-800">Live Preview</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link to={`/editor?cardId=${selectedCard.id}`} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <Pencil size={11} /> Edit
                      </Link>
                      <button onClick={handleDeleteCard} disabled={deleting} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={11} /> {deleting ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </div>
                  <CardPreview card={{ ...selectedCard, name: selectedCard.name || user.name, email: selectedCard.email || user.email }} />
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Edit Card', icon: <Pencil size={16} />, href: `/editor?cardId=${selectedCard.id}`, primary: true },
                { label: 'View Card', icon: <Eye size={16} />, href: publicUrl, external: true },
                { label: 'Share QR', icon: <QrCode size={16} />, onClick: () => setShowQR(true) },
                { label: 'Copy Link', icon: copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />, onClick: copyLink },
              ].map((a, i) => a.href ? (
                <a key={i} href={a.href} target={a.external ? '_blank' : undefined} rel="noreferrer"
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${a.primary ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm' : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-700'}`}>
                  {a.icon} {a.label}
                </a>
              ) : (
                <button key={i} onClick={a.onClick}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-white border border-gray-200 hover:border-gray-300 text-gray-700 transition-all">
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      {showQR && selectedCard && <QRModal cardId={selectedCard.id} onClose={() => setShowQR(false)} />}
    </>
  )
}
