import { useState } from 'react'
import { X, ZoomIn, ZoomOut, RotateCcw, Check, Move } from 'lucide-react'

const BG_SWATCHES = [
  '#ffffff','#f8fafc','#f1f5f9','#e2e8f0',
  '#fef3c7','#fce7f3','#ede9fe','#dbeafe',
  '#dcfce7','#ffedd5','#1e293b','#0f172a',
]

export default function ImageAdjustModal({ type, label, value, layout, onSave, onClose }) {
  // type: 'cover' | 'profile' | 'logo' | 'layout' | 'bg'
  const [local, setLocal] = useState({ ...layout })

  const update = (key, val) => setLocal(prev => ({ ...prev, [key]: val }))
  const updateImg = (imgKey, subKey, val) =>
    setLocal(prev => ({ ...prev, [imgKey]: { ...prev[imgKey], [subKey]: val } }))

  const reset = () => {
    if (type === 'layout') {
      setLocal(prev => ({ ...prev, coverHeight: 128, overlap: 48, profileSize: 96, logoSize: 56 }))
    } else if (type === 'bg') {
      setLocal(prev => ({ ...prev, cardBgColor: '' }))
    } else {
      setLocal(prev => ({ ...prev, [type]: { zoom: 1, x: 50, y: 50 } }))
    }
  }

  const imgVal = local[type] || { zoom: 1, x: 50, y: 50 }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-scale-in">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">
            {type === 'bg' ? 'Card Background' : type === 'layout' ? 'Edit Layout' : `Adjust ${label}`}
          </h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <X size={14} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-5">

          {/* Image adjustment controls */}
          {['cover', 'profile', 'logo'].includes(type) && (
            <>
              {/* Zoom */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Zoom</label>
                  <span className="text-xs text-gray-400">{Math.round(imgVal.zoom * 100)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateImg(type, 'zoom', Math.max(0.5, +(imgVal.zoom - 0.1).toFixed(1)))}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <ZoomOut size={14} />
                  </button>
                  <input type="range" min="50" max="300" step="5"
                    value={Math.round(imgVal.zoom * 100)}
                    onChange={e => updateImg(type, 'zoom', +(e.target.value / 100).toFixed(2))}
                    className="flex-1 accent-indigo-500" />
                  <button onClick={() => updateImg(type, 'zoom', Math.min(3, +(imgVal.zoom + 0.1).toFixed(1)))}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>

              {/* Position X */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Move size={11} /> Horizontal Position
                  </label>
                  <span className="text-xs text-gray-400">{imgVal.x}%</span>
                </div>
                <input type="range" min="0" max="100" step="1"
                  value={imgVal.x}
                  onChange={e => updateImg(type, 'x', +e.target.value)}
                  className="w-full accent-indigo-500" />
                <div className="flex justify-between text-[10px] text-gray-300 mt-1">
                  <span>Left</span><span>Center</span><span>Right</span>
                </div>
              </div>

              {/* Position Y */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Move size={11} /> Vertical Position
                  </label>
                  <span className="text-xs text-gray-400">{imgVal.y}%</span>
                </div>
                <input type="range" min="0" max="100" step="1"
                  value={imgVal.y}
                  onChange={e => updateImg(type, 'y', +e.target.value)}
                  className="w-full accent-indigo-500" />
                <div className="flex justify-between text-[10px] text-gray-300 mt-1">
                  <span>Top</span><span>Center</span><span>Bottom</span>
                </div>
              </div>
            </>
          )}

          {/* Layout controls */}
          {type === 'layout' && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Cover Height</label>
                  <span className="text-xs text-gray-400">{local.coverHeight}px</span>
                </div>
                <input type="range" min="64" max="220" step="8"
                  value={local.coverHeight}
                  onChange={e => update('coverHeight', +e.target.value)}
                  className="w-full accent-indigo-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Overlap Amount</label>
                  <span className="text-xs text-gray-400">{local.overlap}px</span>
                </div>
                <input type="range" min="16" max="72" step="4"
                  value={local.overlap}
                  onChange={e => update('overlap', +e.target.value)}
                  className="w-full accent-indigo-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Profile Photo Size</label>
                  <span className="text-xs text-gray-400">{local.profileSize}px</span>
                </div>
                <input type="range" min="64" max="128" step="8"
                  value={local.profileSize}
                  onChange={e => update('profileSize', +e.target.value)}
                  className="w-full accent-indigo-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Logo Size</label>
                  <span className="text-xs text-gray-400">{local.logoSize}px</span>
                </div>
                <input type="range" min="40" max="80" step="4"
                  value={local.logoSize}
                  onChange={e => update('logoSize', +e.target.value)}
                  className="w-full accent-indigo-500" />
              </div>
            </>
          )}

          {/* Background color */}
          {type === 'bg' && (
            <>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">Suggested Colors</label>
                <div className="grid grid-cols-6 gap-2">
                  {BG_SWATCHES.map(color => (
                    <button key={color} onClick={() => update('cardBgColor', color)}
                      className="w-9 h-9 rounded-xl border-2 transition-all hover:scale-110"
                      style={{ background: color, borderColor: local.cardBgColor === color ? '#6366f1' : '#e2e8f0' }}
                    >
                      {local.cardBgColor === color && <Check size={12} className="mx-auto text-indigo-600" />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Custom Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={local.cardBgColor || '#ffffff'}
                    onChange={e => update('cardBgColor', e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                  <input type="text" value={local.cardBgColor || ''}
                    onChange={e => /^#[0-9A-Fa-f]{0,6}$/.test(e.target.value) && update('cardBgColor', e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <button onClick={() => update('cardBgColor', '')}
                    className="px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-red-100">
                    Clear
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200">
            <RotateCcw size={12} /> Reset
          </button>
          <button onClick={onClose}
            className="flex-1 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={() => { onSave(local); onClose() }}
            className="flex-1 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl transition-all">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
