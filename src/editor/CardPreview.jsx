import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Mail, Phone, Globe, MapPin, AtSign, MessageCircle, Calendar, GitBranch, Link as LinkIcon, Pencil, Settings, Palette } from 'lucide-react'
import ImageAdjustModal from './ImageAdjustModal'

const ICON_MAP = {
  email: <Mail size={16} />, phone: <Phone size={16} />, companyUrl: <Globe size={16} />,
  address: <MapPin size={16} />, twitter: <AtSign size={16} />, instagram: <AtSign size={16} />,
  threads: <AtSign size={16} />, linkedin: <AtSign size={16} />, facebook: <AtSign size={16} />,
  youtube: <AtSign size={16} />, snapchat: <AtSign size={16} />, tiktok: <AtSign size={16} />,
  twitch: <AtSign size={16} />, yelp: <AtSign size={16} />, whatsapp: <MessageCircle size={16} />,
  signal: <MessageCircle size={16} />, discord: <MessageCircle size={16} />,
  skype: <MessageCircle size={16} />, telegram: <MessageCircle size={16} />,
  github: <GitBranch size={16} />, calendly: <Calendar size={16} />,
  customLink: <LinkIcon size={16} />,
}

const DEFAULT_LAYOUT = {
  coverHeight: 128, overlap: 48, profileSize: 96, logoSize: 56, cardBgColor: '',
  cover:   { zoom: 1, x: 50, y: 50 },
  profile: { zoom: 1, x: 50, y: 50 },
  logo:    { zoom: 1, x: 50, y: 50 },
}

export default function CardPreview({ card = {}, editable = false, onLayoutChange }) {
  const [modal, setModal] = useState(null)

  const theme = card.themeColor || '#6366f1'
  const layout = { ...DEFAULT_LAYOUT, ...(card.layout || {}) }
  const coverH   = layout.coverHeight
  const overlap  = layout.overlap
  const profSize = layout.profileSize
  const logoSize = layout.logoSize
  const cardBg   = layout.cardBgColor

  // Background style — cardBgColor overrides virtualBg
  const bgStyle = cardBg
    ? { background: cardBg }
    : card.virtualBg?.enabled
      ? card.virtualBg.custom
        ? { backgroundImage: `url(${card.virtualBg.custom})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : card.virtualBg.preset
          ? { background: card.virtualBg.preset }
          : { background: `linear-gradient(160deg, ${theme}18 0%, #ffffff 60%)` }
      : { background: `linear-gradient(160deg, ${theme}18 0%, #ffffff 60%)` }

  // Apply zoom + position to an image
  const imgStyle = (imgKey) => {
    const v = layout[imgKey] || { zoom: 1, x: 50, y: 50 }
    return {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: `${v.x}% ${v.y}%`,
      transform: `scale(${v.zoom})`,
      transformOrigin: `${v.x}% ${v.y}%`,
    }
  }

  const fields = [
    card.email      && { key: 'email',      label: 'Email',   value: card.email },
    card.phone      && { key: 'phone',      label: 'Phone',   value: card.phone },
    card.companyUrl && { key: 'companyUrl', label: 'Website', value: card.companyUrl },
    card.customLink && { key: 'customLink', label: card.customLinkLabel || 'Link', value: card.customLink },
    card.address    && { key: 'address',    label: 'Address', value: card.address },
    card.twitter    && { key: 'twitter',    label: 'X',       value: card.twitter },
    card.instagram  && { key: 'instagram',  label: 'Instagram', value: card.instagram },
    card.threads    && { key: 'threads',    label: 'Threads', value: card.threads },
    card.linkedin   && { key: 'linkedin',   label: 'LinkedIn', value: card.linkedin },
    card.facebook   && { key: 'facebook',   label: 'Facebook', value: card.facebook },
    card.youtube    && { key: 'youtube',    label: 'YouTube', value: card.youtube },
    card.snapchat   && { key: 'snapchat',   label: 'Snapchat', value: card.snapchat },
    card.tiktok     && { key: 'tiktok',     label: 'TikTok',  value: card.tiktok },
    card.twitch     && { key: 'twitch',     label: 'Twitch',  value: card.twitch },
    card.yelp       && { key: 'yelp',       label: 'Yelp',    value: card.yelp },
    card.whatsapp   && { key: 'whatsapp',   label: 'WhatsApp', value: card.whatsapp },
    card.signal     && { key: 'signal',     label: 'Signal',  value: card.signal },
    card.discord    && { key: 'discord',    label: 'Discord', value: card.discord },
    card.skype      && { key: 'skype',      label: 'Skype',   value: card.skype },
    card.telegram   && { key: 'telegram',   label: 'Telegram', value: card.telegram },
    card.github     && { key: 'github',     label: 'GitHub',  value: card.github },
    card.calendly   && { key: 'calendly',   label: 'Calendly', value: card.calendly },
  ].filter(Boolean)

  Object.values(card.customFields || {}).flat().forEach(cf => {
    if (cf.value) fields.push({ key: cf.id, label: cf.label, value: cf.value })
  })

  const tags = (card.leadTags || '').split(',').map(t => t.trim()).filter(Boolean)

  return (
    <>
      <div className="w-full max-w-md mx-auto group"
        style={{ padding: '2px', borderRadius: '1.5rem', background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4,#6366f1)', backgroundSize: '300% 300%', animation: 'neonBorder 4s ease infinite', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
        <style>{`
          @keyframes neonBorder {
            0%   { background-position:0% 50%; box-shadow:0 0 20px rgba(99,102,241,0.4); }
            50%  { background-position:100% 50%; box-shadow:0 0 30px rgba(139,92,246,0.5),0 0 60px rgba(6,182,212,0.2); }
            100% { background-position:0% 50%; box-shadow:0 0 20px rgba(99,102,241,0.4); }
          }
        `}</style>

        <div className="bg-white rounded-3xl overflow-visible" style={bgStyle}>

          {/* Cover photo */}
          <div className="relative group rounded-t-3xl overflow-hidden" style={{ height: `${coverH}px` }}>
            {card.coverPhoto ? (
              <img src={card.coverPhoto} alt="cover" style={{ ...imgStyle('cover'), position: 'absolute', inset: 0 }} />
            ) : (
              <div className="w-full h-full rounded-t-3xl"
                style={{ background: `linear-gradient(135deg,${theme}cc,${theme}66)` }} />
            )}
            {editable && card.coverPhoto && (
              <button onClick={() => setModal('cover')}
                className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10">
                <Pencil size={11} />
              </button>
            )}
          </div>

          {/* Profile + Logo — absolutely positioned to overlap cover */}
          <div className="relative" style={{ height: `${profSize - overlap}px` }}>

            {/* Profile photo — left */}
            <div className="absolute group" style={{ left: '24px', top: `-${overlap}px` }}>
              <div className="rounded-full border-4 border-white shadow-xl overflow-hidden"
                style={{ width: `${profSize}px`, height: `${profSize}px` }}>
                {card.profilePhoto ? (
                  <img src={card.profilePhoto} alt={card.name} style={imgStyle('profile')} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold"
                    style={{ background: theme, color: '#fff', fontSize: `${profSize * 0.33}px` }}>
                    {card.name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              {editable && card.profilePhoto && (
                <button onClick={() => setModal('profile')}
                  className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 z-10">
                  <Pencil size={10} />
                </button>
              )}
            </div>

            {/* Company logo — right */}
            {card.companyLogo && (
              <div className="absolute group" style={{ right: '24px', top: `-${Math.round(logoSize / 2)}px` }}>
                <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden p-1.5"
                  style={{ width: `${logoSize}px`, height: `${logoSize}px` }}>
                  <img src={card.companyLogo} alt="logo" style={imgStyle('logo')} className="rounded-lg" />
                </div>
                {editable && (
                  <button onClick={() => setModal('logo')}
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 z-10">
                    <Pencil size={8} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Edit toolbar */}
          {editable && (
            <div className="flex gap-2 px-6 pb-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setModal('layout')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors border border-gray-200">
                <Settings size={11} /> Layout
              </button>
              <button onClick={() => setModal('bg')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors border border-gray-200">
                <Palette size={11} /> Background
              </button>
            </div>
          )}

          {/* Info */}
          <div className="px-6 pb-6 space-y-3 pt-1">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{card.name || 'Your Name'}</h1>
              {card.jobTitle    && <p className="text-sm text-gray-600 mt-0.5">{card.jobTitle}</p>}
              {card.department  && <p className="text-xs text-gray-400">{card.department}</p>}
              {card.companyName && <p className="text-sm font-medium text-gray-700 mt-1">{card.companyName}</p>}
              {card.accreditations && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {card.accreditations.split(',').map((a, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${theme}20`, color: theme }}>{a.trim()}</span>
                  ))}
                </div>
              )}
            </div>

            {card.headline && <p className="text-sm text-gray-500 leading-relaxed">{card.headline}</p>}

            {(card.leadSource || tags.length > 0 || card.followUpDate) && (
              <div className="rounded-xl border border-gray-100 p-3 space-y-2 bg-white/80">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Lead Context</p>
                {card.leadSource   && <p className="text-xs text-gray-600">Source: {card.leadSource}</p>}
                {card.followUpDate && <p className="text-xs text-gray-600">Follow-up: {card.followUpDate}</p>}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.map(tag => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {fields.length > 0 && (
              <div className="space-y-2 pt-2">
                {fields.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl"
                    style={{ background: `${theme}12` }}>
                    <span style={{ color: theme }}>{ICON_MAP[f.key] || <LinkIcon size={16} />}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400">{f.label}</p>
                      <p className="text-sm text-gray-700 truncate">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-3">
              <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: theme }}>Share</button>
              <a href={card.ctaUrl || '#'} target={card.ctaUrl ? '_blank' : undefined}
                rel={card.ctaUrl ? 'noreferrer' : undefined}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all text-center"
                style={{ borderColor: theme, color: theme }}>
                {card.ctaLabel || 'Save Contact'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {modal && createPortal(
        <ImageAdjustModal
          type={modal}
          layout={layout}
          onChange={(newLayout) => { if (onLayoutChange) onLayoutChange(newLayout) }}
          onSave={(newLayout) => { if (onLayoutChange) onLayoutChange(newLayout) }}
          onClose={() => setModal(null)}
        />,
        document.body
      )}
    </>
  )
}
