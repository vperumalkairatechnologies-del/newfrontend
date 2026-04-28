import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAnnual, setIsAnnual] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const pricing = {
    pro: isAnnual ? 499 : 624,
    enterprise: isAnnual ? 1999 : 2499,
  }

  const formatPrice = (value) => value.toLocaleString('en-IN')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 60)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    // Add scroll effect to navigation
    const handleScroll = () => {
      const nav = document.querySelector('nav')
      if (window.scrollY > 50) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setShowQR(prev => !prev)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="landing-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        .landing-page *, .landing-page *::before, .landing-page *::after { margin: 0; padding: 0; box-sizing: border-box; }
        .landing-page { font-family: 'Roboto', sans-serif; background: #f7f5f0; color: #0a0a0f; overflow-x: hidden; }
        .landing-page html { scroll-behavior: smooth; }
        /* Enhanced Navigation Bar */
        .landing-page nav { 
          position: fixed; 
          top: 0; 
          left: 0; 
          right: 0; 
          z-index: 100; 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          padding: 16px 60px; 
          background: rgba(255, 255, 255, 0.95); 
          backdrop-filter: blur(20px); 
          border-bottom: 1px solid rgba(0, 87, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        
        .landing-page nav.scrolled {
          padding: 12px 60px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
        }
        
        .landing-page .logo { 
          font-family: 'Roboto', sans-serif; 
          font-weight: 800; 
          font-size: 22px; 
          letter-spacing: -0.5px; 
          color: #0a0a0f; 
          text-decoration: none; 
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .landing-page .logo:hover {
          transform: translateY(-2px);
        }
        
        .landing-page .logo span { 
          color: #5665a9; 
        }
        
        .landing-page .logo-icon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #5665a9;
          position: relative;
        }
        
        .landing-page .logo-icon::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: rgba(0, 87, 255, 0.2);
          animation: pulse 2s ease infinite;
        }
        
        .landing-page .nav-links { 
          display: flex; 
          gap: 48px; 
          list-style: none; 
          align-items: center;
        }
        
        .landing-page .nav-links a { 
          text-decoration: none; 
          color: #3a3a4a; 
          font-size: 15px; 
          font-weight: 500; 
          letter-spacing: 0.2px; 
          transition: all 0.3s ease;
          position: relative;
          padding: 8px 19px;
        }
        
        .landing-page .nav-links a:hover { 
          color: #5665a9; 
          transform: translateY(-2px);
        }
        
        .landing-page .nav-cta { 
          background: linear-gradient(135deg, #ff0000, #ff4444) !important; 
          color: #fff !important; 
          padding: 20px 60px; 
          border-radius: 50px; 
          font-weight: 600 !important; 
          font-size: 15px;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
        }
        /* Enhanced Hero Section */
        .landing-page .hero { 
          min-height: 65vh; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          align-items: center; 
          text-align: center; 
          padding: 100px 40px 60px; 
          position: relative; 
          overflow: hidden;
          background: #5665a9;
        }
        
        .landing-page .hero-particles {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        
        .landing-page .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: floatUp 8s linear infinite;
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
          }
        }
        
        .landing-page .badge { 
          display: inline-flex; 
          align-items: center; 
          gap: 8px; 
          background: rgba(255, 255, 255, 0.15); 
          color: #fff; 
          font-size: 12px; 
          font-weight: 600; 
          letter-spacing: 0.8px; 
          text-transform: uppercase; 
          padding: 8px 20px; 
          border-radius: 50px; 
          border: 1px solid rgba(255, 255, 255, 0.3); 
          margin-bottom: 32px; 
          position: relative; 
          z-index: 2; 
          animation: fadeUp 0.6s ease both;
          backdrop-filter: blur(10px);
        }
        
        .landing-page .badge-dot { 
          width: 8px; 
          height: 8px; 
          border-radius: 50%; 
          background: #4ade80; 
          animation: pulse 2s ease infinite;
          box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
        }
        
        @keyframes pulse { 
          0%,100%{opacity:1;transform:scale(1)} 
          50%{opacity:0.5;transform:scale(1.2)} 
        }
        
        .landing-page .hero h1 { 
          font-family: 'Roboto', sans-serif; 
          font-weight: 800; 
          font-size: clamp(36px, 6vw, 72px); 
          line-height: 1.0; 
          letter-spacing: -3px; 
          color: #fff; 
          max-width: 1000px; 
          position: relative; 
          z-index: 2; 
          animation: fadeUp 0.7s 0.1s ease both;
          text-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .landing-page .hero h1 em { 
          font-style: normal; 
          background: linear-gradient(135deg, #ff0000, #ff4444);
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent;
          position: relative;
        }
        
        .landing-page .hero-sub { 
          font-size: 20px; 
          font-weight: 300; 
          color: rgba(255, 255, 255, 0.9); 
          max-width: 600px; 
          line-height: 1.6; 
          margin: 32px 0 48px; 
          position: relative; 
          z-index: 2; 
          animation: fadeUp 0.7s 0.2s ease both;
        }
        
        .landing-page .hero-actions { 
          display: flex; 
          gap: 20px; 
          align-items: center; 
          position: relative; 
          z-index: 2; 
          animation: fadeUp 0.7s 0.3s ease both;
        }
        
        /* Enhanced Buttons */
        .landing-page .btn-primary { 
          background: linear-gradient(135deg, #fff, #f8fafc); 
          color: #667eea; 
          padding: 20px 44px; 
          border-radius: 50px; 
          font-size: 16px; 
          font-weight: 700; 
          text-decoration: none; 
          display: inline-flex; 
          align-items: center; 
          gap: 12px; 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          box-shadow: 0 10px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        
        .landing-page .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.3), transparent);
          transition: left 0.6s ease;
        }
        
        .landing-page .btn-primary:hover::before {
          left: 100%;
        }
        
        .landing-page .btn-primary:hover { 
          background: linear-gradient(135deg, #4ade80, #22c55e); 
          color: #fff; 
          transform: translateY(-4px) scale(1.02); 
          box-shadow: 0 20px 50px rgba(74, 222, 128, 0.4), 0 0 0 1px rgba(255,255,255,0.2);
        }
        
        .landing-page .btn-primary:active {
          transform: translateY(-2px) scale(1.01);
        }
        
        .landing-page .btn-secondary { 
          background: rgba(255, 255, 255, 0.05); 
          color: #fff; 
          padding: 20px 36px; 
          border-radius: 50px; 
          font-size: 16px; 
          font-weight: 600; 
          text-decoration: none; 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          border: 2px solid rgba(255, 255, 255, 0.3); 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }
        
        .landing-page .btn-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }
        
        .landing-page .btn-secondary:hover::before {
          left: 100%;
        }
        
        .landing-page .btn-secondary:hover { 
          background: rgba(255, 255, 255, 0.15); 
          border-color: rgba(255, 255, 255, 0.6); 
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.2);
        }
        
        .landing-page .btn-secondary:active {
          transform: translateY(-2px) scale(1.01);
        }
        
        .landing-page .arrow { 
          font-size: 20px; 
          transition: all 0.3s ease; 
          display: inline-block;
        }
        
        .landing-page .btn-primary:hover .arrow { 
          transform: translateX(6px); 
        }
        
        .landing-page .btn-secondary:hover .arrow { 
          transform: translateX(6px); 
        }
        
        .landing-page .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 60px;
          position: relative;
          z-index: 2;
          animation: fadeUp 0.8s 0.4s ease both;
        }
        
        .landing-page .hero-stat {
          text-align: center;
        }
        
        .landing-page .hero-stat-number {
          font-size: 32px;
          font-weight: 800;
          color: #4ade80;
          margin-bottom: 8px;
        }
        
        .landing-page .hero-stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .landing-page .mockup-strip { position: relative; z-index: 1; margin-top: 80px; animation: fadeUp 0.8s 0.4s ease both; width: 100%; display: flex; justify-content: center; }
        .landing-page .mockup-frame { background: #fff; border-radius: 28px; padding: 12px; box-shadow: 0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05); display: inline-block; max-width: 760px; width: 100%; }
        .landing-page .mockup-inner { background: #f0f2f7; border-radius: 18px; padding: 28px 32px; display: flex; gap: 20px; align-items: center; }
        .landing-page .vcard-preview { background: #fff; border-radius: 20px; padding: 24px; min-width: 200px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); flex-shrink: 0; text-align: left; }
        .landing-page .vcard-avatar { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #0057ff, #0084ff); display: flex; align-items: center; justify-content: center; color: white; font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 14px; }
        .landing-page .vcard-name { font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 16px; color: #0a0a0f; }
        .landing-page .vcard-role { font-size: 12px; color: #7a7a8e; margin: 2px 0 16px; }
        .landing-page .vcard-contact-row { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #3a3a4a; margin: 6px 0; }
        .landing-page .vcard-icon { width: 22px; height: 22px; border-radius: 6px; background: #e8efff; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
        .landing-page .vcard-qr { background: #0a0a0f; width: 64px; height: 64px; border-radius: 10px; margin-top: 16px; display: grid; grid-template-columns: repeat(6,1fr); gap: 2px; padding: 8px; }
        .landing-page .qr-dot { background: white; border-radius: 1px; animation: qrBlink 3s ease infinite; }
        @keyframes qrBlink { 0%,90%,100%{opacity:1} 95%{opacity:0.4} }
        .landing-page .mockup-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex: 1; }
        .landing-page .stat-card { background: #fff; border-radius: 16px; padding: 18px 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); text-align: left; }
        .landing-page .stat-label { font-size: 11px; color: #7a7a8e; letter-spacing: 0.3px; margin-bottom: 6px; }
        .landing-page .stat-value { font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 26px; color: #0a0a0f; }
        .landing-page .stat-sub { font-size: 11px; color: #22c55e; margin-top: 2px; }
        .landing-page .stat-chart { display: flex; align-items: flex-end; gap: 3px; margin-top: 10px; height: 32px; }
        .landing-page .bar { flex: 1; border-radius: 3px 3px 0 0; background: #e8efff; transition: height 0.3s; }
        .landing-page .bar.active { background: #5665a9; }
        .landing-page section { padding: 100px 60px; }
        .landing-page .section-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #0057ff; font-weight: 500; margin-bottom: 16px; }
        .landing-page .section-title { font-family: 'Roboto', sans-serif; font-weight: 700; font-size: clamp(32px, 4vw, 48px); letter-spacing: -1px; line-height: 1.1; color: #0a0a0f; max-width: 560px; }
        .landing-page .section-desc { font-size: 17px; color: #3a3a4a; font-weight: 300; line-height: 1.7; max-width: 480px; margin-top: 16px; }
        .landing-page .features { background: #fff; }
        .landing-page .features-header { text-align: center; margin-bottom: 72px; display: flex; flex-direction: column; align-items: center; }
        .landing-page .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1100px; margin: 0 auto; }
        .landing-page .feature-cell { background: #fff; padding: 44px 40px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 24px; box-shadow: 0 15px 35px rgba(0,0,0,0.06); border: none; }
        .landing-page .feature-cell:hover { background: #5665a9; transform: translateY(-12px); box-shadow: 0 25px 50px rgba(86,101,169,0.3); }
        .landing-page .feature-cell:hover h3, .landing-page .feature-cell:hover p { color: #fff; }
        .landing-page .feature-cell:hover .feature-icon { background: #fff; color: #5665a9; }
        .landing-page .feature-icon { width: 52px; height: 52px; border-radius: 14px; background: #5665a9; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 24px; transition: all 0.3s ease; }
        .landing-page .feature-cell h3 { font-family: 'Roboto', sans-serif; font-weight: 600; font-size: 18px; color: #0a0a0f; margin-bottom: 10px; transition: color 0.3s ease; }
        .landing-page .feature-cell p { font-size: 14px; color: #3a3a4a; line-height: 1.7; transition: color 0.3s ease; }
        .landing-page .how { background: #ffffff; }
        .landing-page .how-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .landing-page .steps { margin-top: 48px; display: flex; flex-direction: column; gap: 0; }
        .landing-page .step { display: flex; gap: 24px; padding: 28px 0; border-bottom: 1px solid rgba(10,10,15,0.08); cursor: pointer; transition: all 0.2s; }
        .landing-page .step:last-child { border-bottom: none; }
        .landing-page .step-num { font-family: 'Roboto', sans-serif; font-weight: 800; font-size: 13px; color: #7a7a8e; letter-spacing: 1px; width: 32px; flex-shrink: 0; padding-top: 4px; }
        .landing-page .step-content h4 { font-family: 'Roboto', sans-serif; font-weight: 600; font-size: 17px; color: #0a0a0f; margin-bottom: 6px; }
        .landing-page .step-content p { font-size: 14px; color: #3a3a4a; line-height: 1.6; }
        .landing-page .step.active .step-num, .landing-page .step.active h4 { color: #0057ff; }
        .landing-page .how-visual { position: relative; height: 480px; display: flex; align-items: center; justify-content: center; }
        .landing-page .phone-mock { width: 240px; background: #0a0a0f; border-radius: 44px; padding: 16px; box-shadow: 0 40px 80px rgba(0,0,0,0.25); position: relative; }
        .landing-page .phone-screen { background: #fff; border-radius: 32px; overflow: hidden; height: 440px; }
        .landing-page .phone-notch { height: 28px; background: #0a0a0f; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; }
        .landing-page .phone-notch::after { content: ''; width: 80px; height: 10px; background: #1a1a2e; border-radius: 0 0 12px 12px; }
        .landing-page .phone-content { padding: 20px 18px; text-align: left; }
        .landing-page .phone-header-card { background: linear-gradient(135deg, #0057ff 0%, #0084ff 100%); border-radius: 20px; padding: 22px; color: white; margin-bottom: 16px; }
        .landing-page .phone-avatar { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 16px; color: white; margin-bottom: 12px; }
        .landing-page .phone-name { font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 16px; margin-bottom: 2px; }
        .landing-page .phone-role { font-size: 11px; opacity: 0.8; }
        .landing-page .phone-action-row { display: flex; gap: 8px; margin: 14px 0; }
        .landing-page .phone-btn { flex: 1; background: #e8efff; border-radius: 10px; padding: 10px; text-align: center; font-size: 11px; font-weight: 500; color: #0057ff; }
        .landing-page .phone-divider { height: 1px; background: rgba(10,10,15,0.06); margin: 12px 0; }
        .landing-page .phone-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
        .landing-page .phone-row-icon { width: 28px; height: 28px; border-radius: 8px; background: #e8efff; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
        .landing-page .phone-row-text { font-size: 12px; color: #0a0a0f; }
        .landing-page .phone-qr-container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 380px; padding: 20px; text-align: center; animation: phoneFadeIn 0.5s ease; }
        .landing-page .phone-qr-code { width: 140px; height: 140px; background: #0a0a0f; border-radius: 16px; margin-bottom: 20px; padding: 12px; display: grid; grid-template-columns: repeat(8, 1fr); gap: 2px; }
        .landing-page .phone-qr-dot { background: white; border-radius: 1px; }
        .landing-page .phone-qr-text { font-size: 13px; font-weight: 600; color: #0a0a0f; line-height: 1.4; }
        @keyframes phoneFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .landing-page .phone-row-sub { font-size: 10px; color: #7a7a8e; }
        .landing-page .floating-badge { position: absolute; background: #fff; border-radius: 14px; padding: 12px 18px; box-shadow: 0 12px 40px rgba(0,0,0,0.12); font-size: 12px; font-weight: 500; color: #0a0a0f; display: flex; align-items: center; gap: 10px; animation: float 4s ease-in-out infinite; text-align: left; }
        .landing-page .floating-badge-icon { font-size: 18px; }
        .landing-page .fb-1 { top: 40px; right: -20px; animation-delay: 0s; }
        .landing-page .fb-2 { bottom: 60px; left: -30px; animation-delay: 2s; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .landing-page .pricing { background: #0a0a0f; text-align: center; position: relative; overflow: hidden; }
        .landing-page .pricing::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,87,255,0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 10% 100%, rgba(201,168,76,0.08) 0%, transparent 60%); pointer-events: none; }
        .landing-page .pricing-dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
        .landing-page .pricing-header { margin-bottom: 72px; position: relative; z-index: 1; }
        .landing-page .pricing-header .section-label { color: #5a8fff; }
        .landing-page .pricing-header .section-title { color: #ffffff; margin: 0 auto; text-align: center; }
        .landing-page .pricing-header .section-desc { color: rgba(255,255,255,0.45); margin: 16px auto 0; text-align: center; }
        .landing-page .billing-toggle { display: inline-flex; align-items: center; gap: 14px; margin-top: 32px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 50px; padding: 6px 8px 6px 20px; }
        .landing-page .billing-toggle span { font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 400; }
        .landing-page .billing-toggle span.active { color: #fff; font-weight: 500; }
        .landing-page .toggle-track { width: 44px; height: 24px; border-radius: 50px; background: #0057ff; position: relative; cursor: pointer; flex-shrink: 0; transition: background 0.3s; border: 0; }
        .landing-page .toggle-thumb { width: 18px; height: 18px; border-radius: 50%; background: white; position: absolute; top: 3px; left: 3px; transition: transform 0.25s cubic-bezier(.4,0,.2,1); box-shadow: 0 2px 6px rgba(0,0,0,0.3); }
        .landing-page .toggle-track.annual .toggle-thumb { transform: translateX(20px); }
        .landing-page .save-badge { background: rgba(90,255,180,0.15); color: #5affb4; font-size: 11px; font-weight: 500; padding: 4px 12px; border-radius: 50px; border: 1px solid rgba(90,255,180,0.2); margin-right: 6px; }
        .landing-page .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1040px; margin: 0 auto; position: relative; z-index: 1; align-items: start; }
        .landing-page .pricing-card { border-radius: 28px; text-align: left; transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s; position: relative; overflow: hidden; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
        .landing-page .pricing-card:hover { transform: translateY(-6px); box-shadow: 0 32px 80px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.14); }
        .landing-page .card-top { padding: 36px 36px 28px; border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; }
        .landing-page .card-body { padding: 28px 36px 36px; }
        .landing-page .pricing-card.featured { background: #fff; border-color: transparent; box-shadow: 0 24px 80px rgba(0,87,255,0.25), 0 0 0 1px rgba(0,87,255,0.3); transform: translateY(-12px); }
        .landing-page .pricing-card.featured:hover { transform: translateY(-18px); box-shadow: 0 40px 100px rgba(0,87,255,0.35), 0 0 0 1px rgba(0,87,255,0.4); }
        .landing-page .featured-glow { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #0057ff, #5a8fff, #0057ff); background-size: 200% 100%; animation: shimmer 3s ease infinite; border-radius: 28px 28px 0 0; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .landing-page .pricing-card.featured .card-top { background: #f7f9ff; border-bottom-color: rgba(0,87,255,0.1); }
        .landing-page .enterprise-border-glow { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #c9a84c, transparent); border-radius: 28px 28px 0 0; }
        .landing-page .plan-badge-featured { display: inline-flex; align-items: center; gap: 6px; background: #0057ff; color: white; font-size: 11px; font-weight: 500; padding: 6px 14px; border-radius: 50px; margin-bottom: 20px; letter-spacing: 0.3px; }
        .landing-page .plan-badge-featured::before { content: '✦'; font-size: 9px; }
        .landing-page .plan-badge-enterprise { display: inline-flex; align-items: center; gap: 6px; background: rgba(201,168,76,0.12); color: #c9a84c; font-size: 11px; font-weight: 500; padding: 6px 14px; border-radius: 50px; margin-bottom: 20px; border: 1px solid rgba(201,168,76,0.25); }
        .landing-page .plan-name { font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 22px; letter-spacing: -0.5px; color: rgba(255,255,255,0.9); margin-bottom: 4px; }
        .landing-page .pricing-card.featured .plan-name { color: #0a0a0f; }
        .landing-page .plan-tagline { font-size: 13px; color: rgba(255,255,255,0.35); margin-bottom: 28px; }
        .landing-page .pricing-card.featured .plan-tagline { color: #7a7a8e; }
        .landing-page .price { display: flex; align-items: flex-start; gap: 2px; margin-bottom: 4px; }
        .landing-page .price-currency { font-family: 'Roboto', sans-serif; font-size: 22px; font-weight: 600; color: rgba(255,255,255,0.45); margin-top: 10px; }
        .landing-page .pricing-card.featured .price-currency { color: #7a7a8e; }
        .landing-page .price-amount { font-family: 'Roboto', sans-serif; font-weight: 800; font-size: 60px; color: #fff; line-height: 1; letter-spacing: -2px; transition: all 0.3s; }
        .landing-page .pricing-card.featured .price-amount { color: #0a0a0f; }
        .landing-page .price-period { font-size: 12px; color: rgba(255,255,255,0.3); margin-bottom: 0; }
        .landing-page .pricing-card.featured .price-period { color: #7a7a8e; }
        .landing-page .features-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 16px; font-weight: 500; }
        .landing-page .pricing-card.featured .features-label { color: #7a7a8e; }
        .landing-page .plan-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
        .landing-page .plan-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: rgba(255,255,255,0.6); line-height: 1.5; }
        .landing-page .pricing-card.featured .plan-features li { color: #3a3a4a; }
        .landing-page .check-wrap { width: 18px; height: 18px; border-radius: 50%; background: rgba(90,255,180,0.12); border: 1px solid rgba(90,255,180,0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .landing-page .pricing-card.featured .check-wrap { background: rgba(0,87,255,0.1); border-color: rgba(0,87,255,0.25); }
        .landing-page .pricing-card.enterprise .check-wrap { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.25); }
        .landing-page .check { font-size: 10px; color: #5affb4; }
        .landing-page .pricing-card.featured .check { color: #0057ff; }
        .landing-page .pricing-card.enterprise .check { color: #c9a84c; }
        .landing-page .plan-cta { width: 100%; padding: 15px 20px; border-radius: 14px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.25s cubic-bezier(.4,0,.2,1); text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.06); letter-spacing: 0.1px; }
        .landing-page .plan-cta .cta-arrow { transition: transform 0.2s; font-size: 16px; }
        .landing-page .plan-cta:hover { background: rgba(255,255,255,0.12); color: white; border-color: rgba(255,255,255,0.2); }
        .landing-page .plan-cta:hover .cta-arrow { transform: translateX(3px); }
        .landing-page .plan-cta.featured-cta { background: #5665a9; color: white; border-color: #0057ff; box-shadow: 0 8px 32px rgba(0,87,255,0.35); font-weight: 600; }
        .landing-page .plan-cta.featured-cta:hover { background: #5665a9; border-color: #0040cc; box-shadow: 0 12px 40px rgba(0,87,255,0.45); transform: translateY(-1px); }
        .landing-page .plan-cta.enterprise-cta { background: rgba(201,168,76,0.1); color: #c9a84c; border-color: rgba(201,168,76,0.3); }
        .landing-page .plan-cta.enterprise-cta:hover { background: rgba(201,168,76,0.2); border-color: rgba(201,168,76,0.5); color: #e0b84f; }
        .landing-page .plan-note { text-align: center; font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 12px; }
        .landing-page .pricing-card.featured .plan-note { color: #7a7a8e; }
        .landing-page .testimonials { background: #ffffff; }
        .landing-page .testi-inner { max-width: 1100px; margin: 0 auto; }
        .landing-page .testi-header { text-align: center; margin-bottom: 56px; display: flex; flex-direction: column; align-items: center; }
        .landing-page .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .landing-page .testi-card { background: #fff; border-radius: 24px; padding: 36px 32px; border: 1px solid rgba(10,10,15,0.06); text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
        .landing-page .stars { color: #c9a84c; font-size: 14px; letter-spacing: 2px; margin-bottom: 18px; }
        .landing-page .testi-text { font-size: 15px; line-height: 1.7; color: #3a3a4a; font-style: italic; margin-bottom: 24px; }
        .landing-page .testi-author { display: flex; align-items: center; gap: 12px; }
        .landing-page .testi-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 14px; color: white; }
        .landing-page .testi-name { font-family: 'Roboto', sans-serif; font-weight: 600; font-size: 14px; color: #0a0a0f; }
        .landing-page .testi-role { font-size: 12px; color: #7a7a8e; }
        .landing-page .cta-band { 
          background: #5665a9; 
          padding: 80px 40px; 
          text-align: center; 
          position: relative; 
          overflow: hidden; 
          max-width: 1100px; 
          margin: 40px auto 100px; 
          border-radius: 40px; 
          box-shadow: 0 30px 60px rgba(86,101,169,0.2);
        }
        .landing-page .cta-band::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,87,255,0.2) 0%, transparent 70%); }
        .landing-page .cta-band h2 { font-family: 'Roboto', sans-serif; font-weight: 800; font-size: clamp(36px, 5vw, 64px); color: #fff; letter-spacing: -1.5px; line-height: 1.05; max-width: 700px; margin: 0 auto 24px; position: relative; z-index: 1; }
        .landing-page .cta-band p { font-size: 17px; font-weight: 300; color: rgba(255,255,255,0.6); max-width: 420px; margin: 0 auto 48px; line-height: 1.7; position: relative; z-index: 1; }
        .landing-page .cta-band .btn-primary { 
          background: #fff; 
          color: #5665a9;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15); 
          position: relative; 
          z-index: 1; 
          font-size: 16px; 
          font-weight: 700;
          padding: 20px 48px; 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          border: none;
        }
        
        .landing-page .cta-band .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }
        
        .landing-page .cta-band .btn-primary:hover::before {
          left: 100%;
        }
        
        .landing-page .cta-band .btn-primary:hover { 
          background: #f8fafc; 
          transform: translateY(-4px) scale(1.02); 
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          color: #0057ff;
        }
        .landing-page footer { 
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); 
          color: rgba(255,255,255,0.7); 
          padding: 100px 60px 60px; 
          position: relative;
          overflow: hidden;
        }
        
        .landing-page footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 87, 255, 0.5), transparent);
        }
        
        .landing-page .footer-inner { 
          max-width: 1200px; 
          margin: 0 auto; 
          display: grid; 
          grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr; 
          gap: 60px; 
          padding-bottom: 60px; 
          border-bottom: 1px solid rgba(255,255,255,0.08); 
          position: relative;
          z-index: 1;
        }
        
        .landing-page .footer-brand { 
          max-width: 320px; 
        }
        
        .landing-page .footer-brand .logo { 
          font-size: 28px; 
          font-weight: 800; 
          color: #fff; 
          text-decoration: none; 
          display: block; 
          margin-bottom: 20px;
        }
        
        .landing-page .footer-brand .logo span { 
          color: #0057ff; 
        }
        
        .landing-page .footer-brand p { 
          font-size: 15px; 
          color: rgba(255,255,255,0.5); 
          line-height: 1.7; 
          margin-bottom: 24px; 
        }
        
        .landing-page .footer-social {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }
        
        .landing-page .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s;
        }
        
        .landing-page .social-link:hover {
          background: #0057ff;
          color: #fff;
          transform: translateY(-2px);
          border-color: #0057ff;
        }
        
        .landing-page .footer-col h5 { 
          font-family: 'Roboto', sans-serif; 
          font-weight: 700; 
          font-size: 14px; 
          color: #fff; 
          letter-spacing: 0.5px; 
          text-transform: uppercase; 
          margin-bottom: 24px; 
        }
        
        .landing-page .footer-col ul { 
          list-style: none; 
          display: flex; 
          flex-direction: column; 
          gap: 16px; 
        }
        
        .landing-page .footer-col ul a { 
          text-decoration: none; 
          font-size: 15px; 
          color: rgba(255,255,255,0.6); 
          transition: all 0.2s; 
          display: inline-flex;
          align-items: center;
        }
        
        .landing-page .footer-col ul a:hover { 
          color: #0057ff; 
          transform: translateX(4px);
        }
        
        .landing-page .footer-bottom { 
          max-width: 1200px; 
          margin: 40px auto 0; 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          position: relative;
          z-index: 1;
        }
        
        .landing-page .footer-bottom p { 
          font-size: 14px; 
          color: rgba(255,255,255,0.3); 
        }
        
        .landing-page .footer-bottom-links {
          display: flex;
          gap: 24px;
        }
        
        .landing-page .footer-bottom-links a {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }
        
        .landing-page .footer-bottom-links a:hover {
          color: rgba(255,255,255,0.7);
        }
        
        .landing-page .footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 87, 255, 0.1);
          border: 1px solid rgba(0, 87, 255, 0.2);
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 16px;
        }
        
        .landing-page .footer-badge-icon {
          width: 16px;
          height: 16px;
          background: #0057ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: #fff;
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .landing-page .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .landing-page .reveal.visible { opacity: 1; transform: translateY(0); }
        /* Enhanced Mobile Responsiveness */
        @media (max-width: 1200px) {
          .landing-page .mockup-frame { max-width: 680px; }
          .landing-page .features-grid { max-width: 900px; }
        }

        @media (max-width: 900px) {
          .landing-page nav { padding: 12px 24px; }
          .landing-page .logo { font-size: 20px; }
          .landing-page .nav-links { display: none; }
          .landing-page section { padding: 72px 24px; }
          .landing-page .features-grid, .landing-page .pricing-grid, .landing-page .testi-grid { grid-template-columns: 1fr; }
          .landing-page .how-inner { grid-template-columns: 1fr; }
          .landing-page .how-visual { display: none; }
          .landing-page .footer-inner { grid-template-columns: 1fr 1fr; }
          .landing-page .mockup-stats { grid-template-columns: 1fr; }
          .mobile-menu-toggle {
            display: block;
          }

          .mobile-nav {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .landing-page nav { padding: 12px 20px; }
          .landing-page .logo { font-size: 18px; }
          .landing-page .hero { padding: 100px 20px 60px; text-align: center; }
          .landing-page .hero h1 { font-size: clamp(36px, 6vw, 56px); }
          .landing-page .hero-sub { font-size: 16px; max-width: 100%; }
          .landing-page .hero-actions { flex-direction: column; align-items: center; gap: 16px; }
          .landing-page .btn-primary, .landing-page .btn-secondary { width: 100%; max-width: 280px; justify-content: center; padding: 18px 32px; font-size: 15px; }
          .landing-page .hero-stats { flex-direction: column; gap: 20px; margin-top: 40px; }
          .landing-page .hero-stat-number { font-size: 28px; }
          .landing-page .hero-stat-label { font-size: 12px; }
          .landing-page .hero-particles { display: none; }
          .landing-page section { padding: 60px 20px; }
          .landing-page .features-header { margin-bottom: 48px; }
          .landing-page .feature-cell { padding: 30px 24px; }
          .landing-page .feature-icon { width: 44px; height: 44px; font-size: 20px; margin-bottom: 20px; }
          .landing-page .feature-cell h3 { font-size: 16px; }
          .landing-page .feature-cell p { font-size: 13px; }
          .landing-page .how-inner { gap: 40px; }
          .landing-page .steps { margin-top: 32px; }
          .landing-page .step { padding: 20px 0; }
          .landing-page .step-content h4 { font-size: 16px; }
          .landing-page .step-content p { font-size: 13px; }
          .landing-page .cta-band { padding: 80px 20px; }
          .landing-page .cta-band .btn-primary { padding: 18px 36px; font-size: 15px; }
          .landing-page .footer { padding: 60px 20px 40px; }
          .landing-page .footer-inner { 
            grid-template-columns: 1fr; 
            gap: 40px; 
            padding-bottom: 40px; 
          }
          .landing-page .footer-brand { max-width: 100%; }
          .landing-page .footer-brand .logo { font-size: 24px; }
          .landing-page .footer-brand p { font-size: 14px; }
          .landing-page .footer-social { gap: 10px; }
          .landing-page .social-link { width: 36px; height: 36px; }
          .landing-page .footer-badge { font-size: 11px; padding: 6px 12px; }
          .landing-page .footer-bottom { 
            flex-direction: column; 
            gap: 16px; 
            text-align: center; 
          }
          .landing-page .footer-bottom-links { 
            flex-direction: column; 
            gap: 12px; 
          }
        }

        @media (max-width: 640px) {
          .landing-page nav { padding: 10px 16px; }
          .landing-page .logo { font-size: 16px; }
          .landing-page .hero { padding: 80px 16px 50px; }
          .landing-page .hero h1 { font-size: clamp(32px, 5vw, 48px); line-height: 1.2; }
          .landing-page .hero-sub { font-size: 15px; margin: 20px 0 32px; }
          .landing-page .badge { font-size: 11px; padding: 6px 14px; margin-bottom: 24px; }
          .landing-page .btn-primary, .landing-page .btn-secondary { padding: 16px 28px; font-size: 14px; }
          .landing-page .hero-stats { gap: 16px; margin-top: 32px; }
          .landing-page .hero-stat-number { font-size: 24px; }
          .landing-page .hero-stat-label { font-size: 11px; }
          .landing-page section { padding: 48px 16px; }
          .landing-page .section-title { font-size: clamp(28px, 4vw, 40px); }
          .landing-page .section-desc { font-size: 16px; }
          .landing-page .features-header { margin-bottom: 32px; }
          .landing-page .feature-cell { padding: 24px 20px; }
          .landing-page .feature-icon { width: 40px; height: 40px; font-size: 18px; margin-bottom: 16px; }
          .landing-page .feature-cell h3 { font-size: 15px; }
          .landing-page .feature-cell p { font-size: 12px; }
          .landing-page .how-inner { gap: 32px; }
          .landing-page .steps { margin-top: 24px; }
          .landing-page .step { padding: 16px 0; }
          .landing-page .step-num { font-size: 12px; }
          .landing-page .step-content h4 { font-size: 15px; }
          .landing-page .step-content p { font-size: 12px; }
          .landing-page .testi-header { margin-bottom: 40px; }
          .landing-page .testi-card { padding: 24px 20px; }
          .landing-page .testi-text { font-size: 14px; }
          .landing-page .cta-band { padding: 60px 16px; }
          .landing-page .cta-band .btn-primary { padding: 16px 32px; font-size: 14px; }
          .landing-page .footer { padding: 48px 16px 32px; }
          .landing-page .footer-inner { gap: 32px; padding-bottom: 32px; }
          .landing-page .footer-brand .logo { font-size: 22px; }
          .landing-page .footer-brand p { font-size: 13px; }
          .landing-page .footer-social { gap: 8px; }
          .landing-page .social-link { width: 32px; height: 32px; font-size: 12px; }
          .landing-page .footer-badge { font-size: 10px; padding: 5px 10px; }
          .landing-page .footer-badge-icon { width: 12px; height: 12px; font-size: 6px; }
          .landing-page .footer-col h5 { font-size: 13px; margin-bottom: 16px; }
          .landing-page .footer-col ul { gap: 12px; }
          .landing-page .footer-col ul a { font-size: 14px; }
          .landing-page .footer-bottom { gap: 12px; }
          .landing-page .footer-bottom-links { gap: 10px; }
          .landing-page .footer-bottom-links a { font-size: 12px; }
        }

        @media (max-width: 480px) {
          .landing-page .hero { padding: 60px 12px 40px; }
          .landing-page .hero h1 { font-size: clamp(28px, 4.5vw, 42px); }
          .landing-page .hero-sub { font-size: 14px; margin: 16px 0 28px; }
          .landing-page .badge { font-size: 10px; padding: 5px 12px; }
          .landing-page .btn-primary, .landing-page .btn-secondary { padding: 14px 24px; font-size: 13px; }
          .landing-page .hero-stats { gap: 12px; margin-top: 24px; }
          .landing-page .hero-stat-number { font-size: 20px; }
          .landing-page .hero-stat-label { font-size: 10px; }
          .landing-page .section-title { font-size: clamp(24px, 3.5vw, 36px); }
          .landing-page .section-desc { font-size: 15px; }
          .landing-page .feature-cell { padding: 20px 16px; }
          .landing-page .feature-icon { width: 36px; height: 36px; font-size: 16px; margin-bottom: 12px; }
          .landing-page .feature-cell h3 { font-size: 14px; margin-bottom: 8px; }
          .landing-page .feature-cell p { font-size: 11px; }
          .landing-page .step { padding: 12px 0; }
          .landing-page .step-content h4 { font-size: 14px; }
          .landing-page .step-content p { font-size: 11px; }
          .landing-page .testi-card { padding: 20px 16px; }
          .landing-page .testi-text { font-size: 13px; }
          .landing-page .cta-band { padding: 48px 12px; }
          .landing-page .cta-band .btn-primary { padding: 14px 28px; font-size: 13px; }
          .landing-page .footer { padding: 40px 12px 24px; }
          .landing-page .footer-inner { gap: 24px; padding-bottom: 24px; }
          .landing-page .footer-brand .logo { font-size: 20px; }
          .landing-page .footer-brand p { font-size: 12px; }
          .landing-page .footer-social { gap: 6px; }
          .landing-page .social-link { width: 28px; height: 28px; font-size: 10px; }
          .landing-page .footer-badge { font-size: 9px; padding: 4px 8px; }
          .landing-page .footer-badge-icon { width: 10px; height: 10px; font-size: 5px; }
          .landing-page .footer-col h5 { font-size: 12px; margin-bottom: 12px; }
          .landing-page .footer-col ul { gap: 8px; }
          .landing-page .footer-col ul a { font-size: 13px; }
          .landing-page .footer-bottom p { font-size: 12px; }
          .landing-page .footer-bottom-links { gap: 8px; }
          .landing-page .footer-bottom-links a { font-size: 11px; }
        }

        /* Enhanced Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: none;
          background: rgba(0, 87, 255, 0.1);
          border: 1px solid rgba(0, 87, 255, 0.2);
          cursor: pointer;
          padding: 10px;
          border-radius: 12px;
          transition: all 0.3s;
        }

        .mobile-menu-toggle:hover {
          background: rgba(0, 87, 255, 0.15);
          transform: translateY(-2px);
        }

        .mobile-menu-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: #0057ff;
          margin: 5px 0;
          transition: all 0.3s;
          border-radius: 2px;
        }

        .mobile-menu-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .mobile-nav {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          z-index: 200;
          padding: 100px 20px 20px;
          overflow-y: auto;
        }

        .mobile-nav.active {
          display: block;
        }

        .mobile-nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
          max-width: 400px;
          margin: 0 auto;
        }

        .mobile-nav-links li {
          margin-bottom: 16px;
        }

        .mobile-nav-links a {
          display: block;
          padding: 18px 24px;
          background: white;
          border-radius: 16px;
          text-decoration: none;
          color: #0a0a0f;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(0, 87, 255, 0.1);
        }

        .mobile-nav-links a:hover {
          background: linear-gradient(135deg, #0057ff, #0084ff);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 87, 255, 0.3);
          border-color: transparent;
        }

        .mobile-nav-links .nav-cta {
          background: linear-gradient(135deg, #0057ff, #0084ff);
          color: white;
          margin-top: 24px;
        }

        .mobile-nav-links .nav-cta:hover {
          background: linear-gradient(135deg, #0084ff, #0057ff);
        }

        @media (max-width: 900px) {
          .mobile-menu-toggle {
            display: block;
          }

          .mobile-nav {
            display: none;
          }
        }
      `}</style>

      <nav>
        <Link to="/" className="logo">
          <div className="logo-icon"></div>
          Kaira<span>.</span>
        </Link>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it works</a></li>
          <li><Link to="/register" className="nav-cta">Make Your Card</Link></li>
        </ul>
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a></li>
          <li><a href="#how" onClick={() => setMobileMenuOpen(false)}>How it works</a></li>
          <li><Link to="/register" className="nav-cta" onClick={() => setMobileMenuOpen(false)}>Get Started Free</Link></li>
        </ul>
      </div>

      <section className="hero">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        <div className="badge">
          <div className="badge-dot"></div>
          Digital Business Cards — Reimagined
        </div>
        <h1>Your Identity,<br />One <em>Smart</em> Card</h1>
        <p className="hero-sub">
          Create stunning digital vCards in seconds. Share with a tap, scan, or link — and track every connection you make.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-primary">Create Your vCard <span className="arrow">→</span></Link>
          <a href="#how" className="btn-secondary">See how it works</a>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">50K+</div>
            <div className="hero-stat-label">Active Users</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">1.2M</div>
            <div className="hero-stat-label">Cards Shared</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">98%</div>
            <div className="hero-stat-label">Satisfaction</div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="features-header reveal">
          <div className="section-label">Everything You Need</div>
          <h2 className="section-title">Built for professionals<br />who mean business</h2>
          <p className="section-desc">Every feature designed to help you make memorable first impressions and track meaningful connections.</p>
        </div>
        <div className="features-grid reveal">
          {[
            { icon: '✦', title: 'Beautiful Templates', desc: 'Choose from 50+ professionally designed templates. Customise colors, fonts, and layout to match your brand identity perfectly.' },
            { icon: '📲', title: 'Instant QR Sharing', desc: 'Generate a unique QR code for every card. Anyone can scan and save your contact in one tap — no app required.' },
            { icon: '📊', title: 'Real-time Analytics', desc: 'See who viewed your card, when they scanned it, and where they came from. Know your network like never before.' },
            { icon: '🔗', title: 'One Link, Everything', desc: 'A single shareable link houses your website, social profiles, portfolio, and contact — all in one polished page.' },
            { icon: '🏢', title: 'Team Management', desc: 'Deploy branded cards across your entire organisation. Maintain consistency while giving each member their own card.' },
            { icon: '🔒', title: 'Privacy & Control', desc: 'Choose exactly what information to share and with whom. Update your details anytime — changes reflect instantly everywhere.' },
          ].map((f, i) => (
            <div key={i} className="feature-cell">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how" id="how">
        <div className="how-inner">
          <div>
            <div className="section-label">Simple Process</div>
            <h2 className="section-title">Up and running<br />in 3 minutes</h2>
            <p className="section-desc">No design skills needed. Create a card that impresses everyone.</p>
            <div className="steps">
              {[
                ['Create your profile', 'Enter your details, upload your photo, and add your links. Our guided builder makes it effortless.'],
                ['Choose a design', 'Pick from beautifully crafted templates or customise every element to match your brand colours.'],
                ['Share everywhere', 'Get your unique link and QR code. Share via WhatsApp, email, LinkedIn, or print on physical cards.'],
              ].map((step, index) => (
                <div key={step[0]} className={`step ${activeStep === index ? 'active' : ''}`} onClick={() => setActiveStep(index)}>
                  <div className="step-num">{`0${index + 1}`}</div>
                  <div className="step-content">
                    <h4>{step[0]}</h4>
                    <p>{step[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="how-visual">
            <div className="phone-mock">
              <div className="phone-screen">
                <div className="phone-notch"></div>
                <div className="phone-content">
                  {!showQR ? (
                    <div style={{ animation: 'phoneFadeIn 0.5s ease' }}>
                      <div className="phone-header-card">
                        <div className="phone-avatar">RK</div>
                        <div className="phone-name">Riya Krishnan</div>
                        <div className="phone-role">Co-Founder · Kaira Technology</div>
                      </div>
                      <div className="phone-action-row">
                        <div className="phone-btn">💬 Message</div>
                        <div className="phone-btn">📥 Save</div>
                        <div className="phone-btn">🔗 Share</div>
                      </div>
                      <div className="phone-divider"></div>
                      <div className="phone-row"><div className="phone-row-icon">📞</div><div><div className="phone-row-text">+91 90000 12345</div><div className="phone-row-sub">Mobile</div></div></div>
                      <div className="phone-row"><div className="phone-row-icon">✉️</div><div><div className="phone-row-text">riya@kairatechnology.com</div><div className="phone-row-sub">Work Email</div></div></div>
                      <div className="phone-row"><div className="phone-row-icon">🌐</div><div><div className="phone-row-text">kairatechnology.com</div><div className="phone-row-sub">Website</div></div></div>
                      <div className="phone-row"><div className="phone-row-icon">💼</div><div><div className="phone-row-text">LinkedIn Profile</div><div className="phone-row-sub">Professional</div></div></div>
                    </div>
                  ) : (
                    <div className="phone-qr-container">
                      <div className="phone-qr-code">
                        {[...Array(64)].map((_, i) => (
                          <div key={i} className="phone-qr-dot" style={{ opacity: Math.random() > 0.3 ? 1 : 0 }}></div>
                        ))}
                      </div>
                      <div className="phone-qr-text">Scan and save<br />the profile</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="floating-badge fb-1">
              <div className="floating-badge-icon">✅</div>
              <div><div style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0f' }}>Card saved!</div><div style={{ fontSize: 11, color: '#7a7a8e' }}>Added to contacts</div></div>
            </div>
            <div className="floating-badge fb-2">
              <div className="floating-badge-icon">👁</div>
              <div><div style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0f' }}>12 views today</div><div style={{ fontSize: 11, color: '#7a7a8e' }}>Last scan: 2 min ago</div></div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="testimonials">
        <div className="testi-inner">
          <div className="testi-header reveal">
            <div className="section-label">Testimonials</div>
            <h2 className="section-title">Trusted by professionals<br />across India</h2>
          </div>
          <div className="testi-grid">
            {[
              { avatar: 'SP', grad: 'linear-gradient(135deg,#0057ff,#0084ff)', name: 'Suresh Pandian', role: 'Sales Director, Chennai', text: '"Kaira completely changed how I network. I shared my card with 40 people at a conference and got 15 follow-up messages the same day."' },
              { avatar: 'PM', grad: 'linear-gradient(135deg,#7c3aed,#a855f7)', name: 'Priya Muthukumar', role: 'Founder, Madurai', text: '"The analytics dashboard is a game-changer. I can see exactly when someone views my card and follow up at the right time."' },
              { avatar: 'VR', grad: 'linear-gradient(135deg,#059669,#10b981)', name: 'Vijay Raghunathan', role: 'HR Head, Coimbatore', text: '"We rolled out Kaira for our 80-person team in one afternoon. The brand consistency and the admin panel made it incredibly smooth."' },
            ].map((item) => (
              <div key={item.name} className="testi-card reveal">
                <div className="stars">★★★★★</div>
                <p className="testi-text">{item.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{ background: item.grad }}>{item.avatar}</div>
                  <div><div className="testi-name">{item.name}</div><div className="testi-role">{item.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <h2>Ready to make your mark?</h2>
        <p>Join thousands of professionals already using Kaira to grow their network smarter.</p>
        <Link to="/register" className="btn-primary">Create Your Free vCard <span className="arrow">→</span></Link>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="logo">Kaira<span>.</span></Link>
            <p>Professional digital vCards built for the way modern India networks. From freelancers to Fortune 500 teams.</p>
            <div className="footer-social">
              <a href="#" className="social-link">📧</a>
              <a href="#" className="social-link">💬</a>
              <a href="#" className="social-link">📱</a>
              <a href="#" className="social-link">🔗</a>
            </div>
            <div className="footer-badge">
              <div className="footer-badge-icon">✓</div>
              SSL Secured Platform
            </div>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><Link to="/editor">Features</Link></li>
              <li><Link to="/editor">Templates</Link></li>
              <li><Link to="/register">Pricing</Link></li>
              <li><Link to="/editor">Integrations</Link></li>
              <li><Link to="/editor">Analytics</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Solutions</h5>
            <ul>
              <li><Link to="/editor">For Individuals</Link></li>
              <li><Link to="/editor">For Teams</Link></li>
              <li><Link to="/editor">For Enterprise</Link></li>
              <li><Link to="/editor">API Access</Link></li>
              <li><Link to="/editor">White Label</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/">Press Kit</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Support</h5>
            <ul>
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Documentation</Link></li>
              <li><Link to="/">Community</Link></li>
              <li><Link to="/">Status</Link></li>
              <li><Link to="/">Partners</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Kaira Technology. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
