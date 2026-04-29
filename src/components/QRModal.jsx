import { useEffect, useRef, useState } from 'react'
import { X, Download, Copy, Check, Loader } from 'lucide-react'

export default function QRModal({ slug, cardId, onClose }) {
  const overlayRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [qrLoaded, setQrLoaded] = useState(false)
  const [qrError, setQrError] = useState(false)

  const publicUrl = cardId
    ? `${window.location.origin}/card/id/${cardId}`
    : `${window.location.origin}/card/${slug}`

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(publicUrl)}&margin=10`

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const download = async () => {
    try {
      const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${encodeURIComponent(publicUrl)}&margin=10`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `qr-card.png`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Failed to download QR code.')
    }
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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
          <X size={16} />
        </button>

        <h2 className="text-base font-bold text-gray-900 mb-1">Share your card</h2>
        <p className="text-xs text-gray-400 mb-4 break-all">{publicUrl}</p>

        <div className="flex justify-center mb-4 p-3 bg-gray-50 rounded-xl min-h-[160px] items-center">
          {qrError ? (
            <p className="text-xs text-red-400 text-center">Failed to load QR code.</p>
          ) : (
            <div className="relative">
              {!qrLoaded && <Loader size={24} className="text-indigo-400 animate-spin absolute inset-0 m-auto" />}
              <img
                src={qrSrc}
                alt="QR Code"
                className={`w-40 h-40 rounded-lg transition-opacity ${qrLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setQrLoaded(true)}
                onError={() => setQrError(true)}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={download} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all">
            <Download size={14} /> Download
          </button>
          <button onClick={copy} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-all">
            {copied ? <><Check size={14} className="text-green-500" /> Copied!</> : <><Copy size={14} /> Copy link</>}
          </button>
        </div>
      </div>
    </div>
  )
}
