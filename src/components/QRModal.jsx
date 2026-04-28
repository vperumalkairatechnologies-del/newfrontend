import { useEffect, useRef, useState } from 'react'
import { X, Download, Copy, Check, Loader } from 'lucide-react'

export default function QRModal({ slug, cardId, onClose }) {
  const overlayRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [qrSrc, setQrSrc] = useState(null)
  const [qrError, setQrError] = useState(false)
  const publicUrl = cardId
    ? `${window.location.origin}/card/id/${cardId}`
    : `${window.location.origin}/card/${slug}`

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const token = localStorage.getItem('token')
        const apiBase = import.meta.env.VITE_API_BASE || '/api'
        const url = `${apiBase}/qr?target=${encodeURIComponent(publicUrl)}&slug=${slug || cardId}`
        const res = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
        if (!res.ok) throw new Error('QR fetch failed')
        const blob = await res.blob()
        setQrSrc(URL.createObjectURL(blob))
      } catch {
        setQrError(true)
      }
    }
    fetchQR()
    return () => { if (qrSrc) URL.revokeObjectURL(qrSrc) }
  }, [publicUrl])

  const download = () => {
    if (!qrSrc) return
    const a = document.createElement('a')
    a.href = qrSrc
    a.download = `qr-card.png`
    a.click()
  }

  const copy = async () => {
    await navigator.clipboard.writeText(publicUrl).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <div className="bg-white rounded-3xl card-shadow w-full max-w-xs p-6 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        >
          <X size={16} />
        </button>

        <h2 className="text-lg font-bold text-gray-900 mb-1">Share your card</h2>
        <p className="text-xs text-gray-400 mb-5 break-all">{publicUrl}</p>

        <div className="flex justify-center mb-5 p-4 bg-gray-50 rounded-2xl min-h-[176px] items-center">
          {qrError ? (
            <p className="text-xs text-red-400 text-center">Failed to load QR code.<br/>Make sure Flask is running.</p>
          ) : qrSrc ? (
            <img src={qrSrc} alt="QR Code" className="w-44 h-44 rounded-xl" />
          ) : (
            <Loader size={24} className="text-indigo-400 animate-spin" />
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={download} disabled={!qrSrc} className="btn-primary flex-1 py-2.5 disabled:opacity-50">
            <Download size={15} /> Download
          </button>
          <button onClick={copy} className="btn-secondary flex-1 py-2.5">
            {copied ? <><Check size={15} className="text-green-500" /> Copied!</> : <><Copy size={15} /> Copy link</>}
          </button>
        </div>
      </div>
    </div>
  )
}
