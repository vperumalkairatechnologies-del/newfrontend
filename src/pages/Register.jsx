import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Shield } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'
import api from '../api/axios'

function SmartCard({ animClass, style, name, title, company, theme, initials }) {
  return (
    <div className={animClass} style={{ position:'absolute', pointerEvents:'none', ...style }}>
      <div style={{ width:260, borderRadius:22, background:'white', boxShadow:'0 16px 48px rgba(0,0,0,0.1)', overflow:'hidden' }}>
        <div style={{ height:64, background:`linear-gradient(135deg,${theme},${theme}bb)`, position:'relative' }}>
          <div style={{ position:'absolute', top:-16, right:-16, width:70, height:70, borderRadius:'50%', background:'rgba(255,255,255,0.1)' }} />
        </div>
        <div style={{ padding:'0 14px 12px', position:'relative' }}>
          <div style={{ width:44, height:44, borderRadius:'50%', background:`linear-gradient(135deg,${theme},${theme}cc)`, border:'3px solid white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:800, color:'white', marginTop:-22, marginBottom:6, boxShadow:'0 4px 10px rgba(0,0,0,0.12)' }}>{initials}</div>
          <div style={{ fontWeight:700, fontSize:12, color:'#111827' }}>{name}</div>
          <div style={{ fontSize:10, color:'#6b7280', marginTop:1 }}>{title}</div>
          <div style={{ fontSize:10, color:theme, fontWeight:600, marginTop:1 }}>{company}</div>
          <div style={{ height:1, background:'#f3f4f6', margin:'8px 0' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {[['📞','+1 234 567 8900'],['🌐','www.example.com'],['✉️','hello@example.com']].map(([ic,v],i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 7px', borderRadius:7, background:`${theme}0d` }}>
                <span style={{ fontSize:8 }}>{ic}</span>
                <span style={{ fontSize:9, color:'#6b7280' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:5, marginTop:8 }}>
            <div style={{ flex:1, padding:'5px 0', borderRadius:7, background:theme, textAlign:'center', fontSize:9, fontWeight:700, color:'white' }}>Share</div>
            <div style={{ flex:1, padding:'5px 0', borderRadius:7, border:`1.5px solid ${theme}`, textAlign:'center', fontSize:9, fontWeight:700, color:theme }}>Save Contact</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GOOGLE_SVG = (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36 24 36c-5.2 0-9.7-2.9-11.3-7.1l-6.6 5.1C9.6 39.6 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41 35.3 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
  </svg>
)

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', data)
      localStorage.removeItem('smartcard_editor')
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError('root', { message: err.response?.data?.error || 'Registration failed.' })
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true)
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        }).then(r => r.json())
        const res = await api.post('/auth/google', { credential: tokenResponse.access_token, userInfo })
        localStorage.removeItem('smartcard_editor')
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        navigate('/dashboard')
      } catch (err) {
        setError('root', { message: err.response?.data?.error || 'Google signup failed.' })
      } finally {
        setGoogleLoading(false)
      }
    },
    onError: () => setError('root', { message: 'Google signup was cancelled.' })
  })

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#fff0f9 0%,#f5f0ff 35%,#f0f4ff 65%,#f0fffe 100%)' }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes vc1{0%,100%{transform:rotate(-14deg) translateY(0px)}50%{transform:rotate(-12deg) translateY(-18px)}}
        @keyframes vc2{0%,100%{transform:rotate(10deg) translateY(0px)}50%{transform:rotate(12deg) translateY(-14px)}}
        @keyframes vc3{0%,100%{transform:rotate(-22deg) translateY(0px)}50%{transform:rotate(-20deg) translateY(-20px)}}
        @keyframes vc4{0%,100%{transform:rotate(18deg) translateY(0px)}50%{transform:rotate(16deg) translateY(-12px)}}
        @keyframes vc5{0%,100%{transform:rotate(5deg) translateY(0px)}50%{transform:rotate(7deg) translateY(-16px)}}
        @keyframes blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,-20px) scale(1.05)}66%{transform:translate(-15px,15px) scale(0.97)}}
        @keyframes form-in{from{opacity:0;transform:translateY(24px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .vc1{animation:vc1 8s ease-in-out infinite}
        .vc2{animation:vc2 10s ease-in-out infinite}
        .vc3{animation:vc3 7s ease-in-out infinite}
        .vc4{animation:vc4 9s ease-in-out infinite}
        .vc5{animation:vc5 11s ease-in-out infinite}
        .blob{animation:blob 10s ease-in-out infinite}
        .form-in{animation:form-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards}
        .fi{animation:fi 0.4s ease forwards;opacity:0}
        .inp{width:100%;padding:12px 16px 12px 42px;background:rgba(255,255,255,0.85);border:1.5px solid rgba(168,85,247,0.15);border-radius:12px;font-size:14px;color:#1e1b4b;outline:none;transition:all 0.25s;box-sizing:border-box}
        .inp::placeholder{color:#d8b4fe}
        .inp:focus{border-color:#a855f7;background:white;box-shadow:0 0 0 4px rgba(168,85,247,0.08)}
        .btn-p{width:100%;padding:13px;border-radius:12px;font-weight:700;font-size:14px;color:white;border:none;cursor:pointer;background:linear-gradient(135deg,#a855f7,#6366f1);display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.25s}
        .btn-p:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(168,85,247,0.35)}
        .btn-p:disabled{opacity:0.6;cursor:not-allowed;transform:none}
        .btn-g{width:100%;padding:12px;border-radius:12px;font-size:14px;color:#374151;background:white;border:1.5px solid #e5e7eb;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:all 0.25s;font-weight:500}
        .btn-g:hover{border-color:#d1d5db;box-shadow:0 4px 12px rgba(0,0,0,0.08)}
        .btn-g:disabled{opacity:0.6;cursor:not-allowed}
      `}</style>

      {/* Blobs */}
      <div className="blob" style={{ position:'absolute', top:'-8%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(168,85,247,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div className="blob" style={{ position:'absolute', bottom:'-10%', left:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)', pointerEvents:'none', animationDelay:'4s' }} />

      {/* Dot grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(168,85,247,0.12) 1px,transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none', opacity:0.5 }} />

      {/* Floating SmartCards */}
      <SmartCard animClass="vc1" style={{ top:'5%', left:'-1%', opacity:0.52 }} name="Priya Sharma" title="UX Lead" company="DesignCo Studio" theme="#a855f7" initials="PS" />
      <SmartCard animClass="vc2" style={{ bottom:'10%', left:'0%', opacity:0.38 }} name="Tom Walker" title="Startup Founder" company="LaunchPad Inc." theme="#6366f1" initials="TW" />
      <SmartCard animClass="vc3" style={{ top:'8%', right:'-2%', opacity:0.48 }} name="Nina Patel" title="Brand Strategist" company="Creative Agency" theme="#ec4899" initials="NP" />
      <SmartCard animClass="vc4" style={{ bottom:'6%', right:'-1%', opacity:0.35 }} name="Chris Lee" title="Software Architect" company="DevStudio" theme="#14b8a6" initials="CL" />
      <SmartCard animClass="vc5" style={{ top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.06 }} name="Your Name" title="Your Title" company="Your Company" theme="#a855f7" initials="YN" />

      {/* Form */}
      <div className="form-in" style={{ position:'relative', zIndex:10, width:'100%', maxWidth:400, margin:'0 16px' }}>
        <div style={{ background:'rgba(255,255,255,0.78)', backdropFilter:'blur(32px)', border:'1.5px solid rgba(255,255,255,0.95)', borderRadius:24, padding:'36px 32px', boxShadow:'0 32px 80px rgba(168,85,247,0.1),0 8px 32px rgba(0,0,0,0.06)' }}>

          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:28 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg,#a855f7,#6366f1)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(168,85,247,0.4)', fontSize:18 }}>🪪</div>
            <span style={{ fontWeight:800, fontSize:18, color:'#1e1b4b', letterSpacing:0.3 }}>SmartCard</span>
          </div>

          <h1 style={{ fontSize:26, fontWeight:800, color:'#1e1b4b', marginBottom:6, letterSpacing:-0.5 }}>Create your card ✨</h1>
          <p style={{ fontSize:13, color:'#6b7280', marginBottom:26 }}>Join thousands of professionals</p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div className="fi" style={{ animationDelay:'0.1s' }}>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#a855f7', textTransform:'uppercase', letterSpacing:1, marginBottom:7 }}>Full Name</label>
              <div style={{ position:'relative' }}>
                <User size={14} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#d8b4fe' }} />
                <input type="text" className="inp" placeholder="John Doe" {...register('name',{required:'Name is required.'})} />
              </div>
              {errors.name && <p style={{ color:'#ef4444', fontSize:11, marginTop:5 }}>{errors.name.message}</p>}
            </div>

            <div className="fi" style={{ animationDelay:'0.2s' }}>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#a855f7', textTransform:'uppercase', letterSpacing:1, marginBottom:7 }}>Email</label>
              <div style={{ position:'relative' }}>
                <Mail size={14} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#d8b4fe' }} />
                <input type="email" className="inp" placeholder="you@example.com" {...register('email',{required:'Email is required.'})} />
              </div>
              {errors.email && <p style={{ color:'#ef4444', fontSize:11, marginTop:5 }}>{errors.email.message}</p>}
            </div>

            <div className="fi" style={{ animationDelay:'0.3s' }}>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#a855f7', textTransform:'uppercase', letterSpacing:1, marginBottom:7 }}>Password</label>
              <div style={{ position:'relative' }}>
                <Lock size={14} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#d8b4fe' }} />
                <input type={showPassword?'text':'password'} className="inp" style={{ paddingRight:44 }} placeholder="Min. 6 characters" {...register('password',{required:'Password is required.',minLength:{value:6,message:'Min. 6 characters.'}})} />
                <button type="button" onClick={()=>setShowPassword(v=>!v)} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#d8b4fe', padding:0 }}>
                  {showPassword ? <EyeOff size={14}/> : <Eye size={14}/>}
                </button>
              </div>
              {errors.password && <p style={{ color:'#ef4444', fontSize:11, marginTop:5 }}>{errors.password.message}</p>}
            </div>

            {errors.root && <div style={{ padding:'10px 14px', borderRadius:10, background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', fontSize:13 }}>⚠ {errors.root.message}</div>}

            <div className="fi" style={{ animationDelay:'0.4s', marginTop:4 }}>
              <button type="submit" className="btn-p" disabled={isSubmitting}>
                {isSubmitting ? <><div style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />Creating...</> : <>Create Free Account <ArrowRight size={16}/></>}
              </button>
            </div>
          </form>

          <div style={{ display:'flex', alignItems:'center', gap:12, margin:'18px 0' }}>
            <div style={{ flex:1, height:1, background:'#e5e7eb' }} />
            <span style={{ color:'#9ca3af', fontSize:11 }}>OR</span>
            <div style={{ flex:1, height:1, background:'#e5e7eb' }} />
          </div>

          <button type="button" className="btn-g" onClick={()=>googleLogin()} disabled={googleLoading}>
            {googleLoading ? <div style={{ width:16, height:16, border:'2px solid #e5e7eb', borderTopColor:'#a855f7', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} /> : GOOGLE_SVG}
            Continue with Google
          </button>

          <p style={{ textAlign:'center', fontSize:13, color:'#6b7280', marginTop:20 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'#a855f7', fontWeight:700, textDecoration:'none' }}>Sign in →</Link>
          </p>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:5, marginTop:16, color:'#d1d5db', fontSize:11 }}>
            <Shield size={11}/><span>256-bit SSL encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}
