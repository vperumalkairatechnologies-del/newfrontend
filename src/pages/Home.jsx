import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAnnual, setIsAnnual] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)

  const slides = [
    {
      bg: '/phone/hero.png',
      mobileBg: '/phone/mobiles1.png',
      type: 'fullbg',
    },
    {
      type: 'fullbg',
      bg: '/phone/kk.png',
      mobileBg: '/phone/mobiles2.png',
      label: 'Built for Modern Professionals',
      title: 'Create smart \n vcard',
      sub: 'Replace paper cards forever. One link holds your contact, portfolio, and social profiles — always up to date.',
      cta: 'Get Started Free',
      contain: true,
    },
    {
      type: 'fullbg',
      bg: '/phone/hero_banner.png',
      mobileBg: '/phone/mobile3.png',
      label: 'Real-time Analytics & Insights',
      title: 'Share Your Contact in \n One Scan',
      sub: 'Every share, view, and click collects your leads.',
      cta: 'See How It Works',
      contain: true,
    },
  ]

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
    const timer = setInterval(() => setSlideIndex(i => (i + 1) % 3), 5000)
    return () => clearInterval(timer)
  }, [])

  const handleHeroClick = () => setSlideIndex(i => (i + 1) % slides.length)

  return (
    <div className="landing-page">
      <div className="page-bg" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        .landing-page *, .landing-page *::before, .landing-page *::after { margin: 0; padding: 0; box-sizing: border-box; }
        .landing-page { font-family: 'Roboto', sans-serif; background: #f0f4ff; color: #0a0a0f; overflow-x: hidden; }
        .landing-page html { scroll-behavior: smooth; }
        /* ── Global Abstract Background ── */
        .landing-page .page-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(186,210,255,0.45) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 10%, rgba(214,228,255,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 80% 80%, rgba(173,205,255,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 85%, rgba(199,218,255,0.3) 0%, transparent 55%),
            radial-gradient(ellipse 90% 70% at 50% 50%, rgba(232,240,255,0.5) 0%, transparent 70%),
            linear-gradient(160deg, #eef4ff 0%, #f5f8ff 35%, #eaf1ff 65%, #f0f5ff 100%);
        }
        .landing-page .page-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 900'%3E%3Cdefs%3E%3ClinearGradient id='w1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23b8d4ff' stop-opacity='0.25'/%3E%3Cstop offset='100%25' stop-color='%23daeaff' stop-opacity='0.08'/%3E%3C/linearGradient%3E%3ClinearGradient id='w2' x1='100%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23c5dcff' stop-opacity='0.2'/%3E%3Cstop offset='100%25' stop-color='%23e8f2ff' stop-opacity='0.06'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0,300 C200,200 400,450 720,280 C1040,110 1200,380 1440,250 L1440,0 L0,0 Z' fill='url(%23w1)'/%3E%3Cpath d='M0,600 C300,500 500,700 800,580 C1100,460 1300,650 1440,550 L1440,900 L0,900 Z' fill='url(%23w2)'/%3E%3Cpath d='M0,450 C250,350 450,550 750,420 C1050,290 1250,480 1440,380' stroke='%23b0ccff' stroke-width='1' fill='none' opacity='0.3'/%3E%3Cpath d='M0,520 C300,420 500,600 800,490 C1100,380 1300,540 1440,450' stroke='%23c8deff' stroke-width='0.8' fill='none' opacity='0.25'/%3E%3C/svg%3E");
          background-size: cover;
          background-position: center;
          pointer-events: none;
        }
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
        /* ── Hero Slider ── */
        .landing-page .hero {
          margin-top: 70px;
          height: calc(100vh - 70px);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        /* every slide fills the hero box */
        .landing-page .slide {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0;
          transition: opacity 0.9s ease;
          pointer-events: none;
        }
        .landing-page .slide.active {
          opacity: 1;
          pointer-events: auto;
        }
        /* slide 1 – full background image, no overlay */
        .landing-page .slide-fullbg {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .landing-page .slide-fullbg.slide-contain {
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
        }
        /* slides 2 & 3 – full bg with left text overlay */
        .landing-page .slide-fullbg .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 55%, transparent 100%);
        }
        .landing-page .slide-fullbg .slide-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 80px;
          z-index: 2;
          max-width: 620px;
        }
        .landing-page .slide-fullbg .slide-content.slide-content-short {
          top: auto;
          bottom: auto;
          inset: 0;
          justify-content: flex-end;
          padding-bottom: 120px;
          background: none;
        }
        .landing-page .slide-fullbg.slide-short {
          background-size: cover;
          background-position: center center;
        }
        .landing-page .slide-fullbg .slide-badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #4ade80;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .landing-page .slide-fullbg .slide-badge::before {
          content: '';
          width: 28px; height: 2px;
          background: #4ade80;
          display: inline-block;
          flex-shrink: 0;
        }
        .landing-page .slide-fullbg .slide-h1 {
          font-family: 'Roboto', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 4.5vw, 60px);
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: #fff;
          white-space: pre-line;
          margin-bottom: 20px;
        }
        .landing-page .slide-fullbg .slide-p {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.8);
          margin-bottom: 32px;
          max-width: 440px;
        }
        .landing-page .slide-fullbg .slide-trust {
          margin-top: 14px;
          font-size: 12px;
          color: rgba(255,255,255,0.45);
        }
        /* slides 2 & 3 – split layout */
        .landing-page .slide-split {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .landing-page .slide-split-inner {
          width: 100%;
          max-width: 1200px;
          height: 100%;
          margin: 0 auto;
          padding: 0 60px;
          display: flex;
          align-items: center;
          gap: 60px;
        }
        .landing-page .slide-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
        }
        .landing-page .slide-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 40px 0;
        }
        .landing-page .slide-right img {
          max-width: 100%;
          max-height: calc(100vh - 160px);
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 20px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
          display: block;
        }
        /* text colours for dark bg slides */
        .landing-page .slide-dark .slide-badge { color: #4ade80; }
        .landing-page .slide-dark .slide-badge::before { background: #4ade80; }
        .landing-page .slide-dark .slide-h1 { color: #fff; }
        .landing-page .slide-dark .slide-h1 em { color: #a5b4fc; font-style: normal; }
        .landing-page .slide-dark .slide-p { color: rgba(255,255,255,0.75); }
        .landing-page .slide-dark .slide-trust { color: rgba(255,255,255,0.4); }
        /* text colours for light bg slides */
        .landing-page .slide-light .slide-badge { color: #5665a9; }
        .landing-page .slide-light .slide-badge::before { background: #5665a9; }
        .landing-page .slide-light .slide-h1 { color: #1a1a3e; }
        .landing-page .slide-light .slide-h1 em { color: #7c3aed; font-style: normal; }
        .landing-page .slide-light .slide-p { color: #3a3a5a; }
        .landing-page .slide-light .slide-trust { color: rgba(26,26,62,0.45); }
        /* shared text styles */
        .landing-page .slide-badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .landing-page .slide-badge::before {
          content: '';
          width: 28px; height: 2px;
          display: inline-block;
          flex-shrink: 0;
        }
        .landing-page .slide-h1 {
          font-family: 'Roboto', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 4.5vw, 60px);
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
        }
        .landing-page .slide-p {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.7;
          max-width: 460px;
          margin-bottom: 32px;
        }
        .landing-page .slide-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #5665a9;
          color: #fff;
          padding: 15px 34px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          width: fit-content;
          box-shadow: 0 8px 28px rgba(86,101,169,0.45);
          transition: all 0.3s ease;
        }
        .landing-page .slide-btn:hover {
          background: #4554a0;
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(86,101,169,0.55);
        }
        .landing-page .slide-trust {
          margin-top: 14px;
          font-size: 12px;
        }
        /* slide 1 CTA */
        .landing-page .slide1-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #ff4444, #ff0000);
          color: #fff;
          padding: 18px 44px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          position: absolute;
          bottom: 80px;
          left: 80px;
          z-index: 3;
          box-shadow: 0 10px 40px rgba(255,0,0,0.4);
          transition: all 0.3s ease;
        }
        .landing-page .slide1-cta:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(255,0,0,0.5); }
        /* dots */
        .landing-page .slider-dots {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
        }
        .landing-page .dot {
          width: 28px; height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .landing-page .dot.active { background: #fff; width: 52px; }
        /* mobile */
        @media (max-width: 768px) {
          .landing-page .hero { margin-top: 56px; height: calc(100vh - 56px); }
          .landing-page .slide-fullbg { background-image: var(--mobile-bg) !important; background-size: cover; background-position: center; }
          .landing-page .slide-badge,
          .landing-page .slide-fullbg .slide-p,
          .landing-page .slide-fullbg .slide-trust { display: none !important; }
          .landing-page .slide-fullbg .slide-overlay { background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.65) 100%); }
          .landing-page .slide-fullbg .slide-content {
            justify-content: space-between;
            padding: 36px 20px 52px;
            max-width: 100%;
          }
          .landing-page .slide-fullbg .slide-h1 { font-size: clamp(22px, 5.5vw, 32px); letter-spacing: -1px; margin-bottom: 0; }
          .landing-page .slide-btn { display: inline-flex !important; padding: 13px 28px; font-size: 14px; width: fit-content; }
          .landing-page .slide1-cta { left: 20px; bottom: 52px; padding: 13px 28px; font-size: 14px; }
          .landing-page .slider-dots { bottom: 16px; }
        }
        

        .landing-page section { padding: 100px 60px; }
        .landing-page .section-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #0057ff; font-weight: 500; margin-bottom: 16px; }
        .landing-page .section-title { font-family: 'Roboto', sans-serif; font-weight: 700; font-size: clamp(32px, 4vw, 48px); letter-spacing: -1px; line-height: 1.1; color: #0a0a0f; max-width: 560px; }
        .landing-page .section-desc { font-size: 17px; color: #3a3a4a; font-weight: 300; line-height: 1.7; max-width: 480px; margin-top: 16px; }
        .landing-page .features { background: transparent; }
        .landing-page .features-header { text-align: center; margin-bottom: 72px; display: flex; flex-direction: column; align-items: center; }
        .landing-page .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1100px; margin: 0 auto; }
        .landing-page .feature-cell { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); padding: 44px 40px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 24px; box-shadow: 0 8px 32px rgba(86,101,169,0.08); border: 1px solid rgba(255,255,255,0.8); }
        .landing-page .feature-cell:hover { background: #5665a9; transform: translateY(-12px); box-shadow: 0 25px 50px rgba(86,101,169,0.3); border-color: transparent; }
        .landing-page .feature-cell:hover h3, .landing-page .feature-cell:hover p { color: #fff; }
        .landing-page .feature-cell:hover .feature-icon { background: #fff; color: #5665a9; }
        .landing-page .feature-icon { width: 52px; height: 52px; border-radius: 14px; background: #5665a9; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 24px; transition: all 0.3s ease; }
        .landing-page .feature-cell h3 { font-family: 'Roboto', sans-serif; font-weight: 600; font-size: 18px; color: #0a0a0f; margin-bottom: 10px; transition: color 0.3s ease; }
        .landing-page .feature-cell p { font-size: 14px; color: #3a3a4a; line-height: 1.7; transition: color 0.3s ease; }
        .landing-page .how { background: transparent; }
        .landing-page .how-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .landing-page .steps { margin-top: 48px; display: flex; flex-direction: column; gap: 0; }
        .landing-page .step { display: flex; gap: 24px; padding: 28px 0; border-bottom: 1px solid rgba(10,10,15,0.08); cursor: pointer; transition: all 0.2s; }
        .landing-page .step:last-child { border-bottom: none; }
        .landing-page .step-num { font-family: 'Roboto', sans-serif; font-weight: 800; font-size: 13px; color: #7a7a8e; letter-spacing: 1px; width: 32px; flex-shrink: 0; padding-top: 4px; }
        .landing-page .step-content h4 { font-family: 'Roboto', sans-serif; font-weight: 600; font-size: 17px; color: #0a0a0f; margin-bottom: 6px; }
        .landing-page .step-content p { font-size: 14px; color: #3a3a4a; line-height: 1.6; }
        .landing-page .step.active .step-num, .landing-page .step.active h4 { color: #0057ff; }
        .landing-page .how-visual { position: relative; height: 480px; display: flex; align-items: center; justify-content: center; }
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
        .landing-page .testimonials { background: transparent; }
        .landing-page .testi-inner { max-width: 1100px; margin: 0 auto; }
        .landing-page .testi-header { text-align: center; margin-bottom: 56px; display: flex; flex-direction: column; align-items: center; }
        .landing-page .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .landing-page .testi-card { background: rgba(255,255,255,0.72); backdrop-filter: blur(12px); border-radius: 24px; padding: 36px 32px; border: 1px solid rgba(255,255,255,0.85); text-align: left; box-shadow: 0 8px 32px rgba(86,101,169,0.08); }
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
        /* ── Footer ── */
        .landing-page footer {
          background: linear-gradient(160deg, #f0f4ff 0%, #faf5ff 50%, #f0f9ff 100%);
          border-top: 1px solid rgba(86,101,169,0.12);
          padding: 80px 60px 40px;
          position: relative;
          overflow: hidden;
        }
        .landing-page footer::before {
          content: '';
          position: absolute;
          top: -120px; right: -120px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(86,101,169,0.08), transparent 70%);
          pointer-events: none;
        }
        .landing-page footer::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%);
          pointer-events: none;
        }
        .landing-page .footer-top {
          max-width: 1200px;
          margin: 0 auto 60px;
          background: linear-gradient(135deg, #5665a9 0%, #7c3aed 100%);
          border-radius: 24px;
          padding: 48px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }
        .landing-page .footer-top::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .landing-page .footer-top-text h3 {
          font-family: 'Roboto', sans-serif;
          font-weight: 800;
          font-size: 26px;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .landing-page .footer-top-text p {
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          font-weight: 300;
        }
        .landing-page .footer-top-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          color: #5665a9;
          padding: 16px 36px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          transition: all 0.3s;
          flex-shrink: 0;
        }
        .landing-page .footer-top-cta:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(0,0,0,0.2); }
        .landing-page .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(86,101,169,0.12);
          position: relative; z-index: 1;
        }
        .landing-page .footer-brand { max-width: 300px; }
        .landing-page .footer-brand .logo {
          font-size: 26px;
          font-weight: 800;
          color: #1a1a3e;
          text-decoration: none;
          display: block;
          margin-bottom: 16px;
        }
        .landing-page .footer-brand .logo span { color: #5665a9; }
        .landing-page .footer-brand p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .landing-page .footer-social { display: flex; gap: 10px; }
        .landing-page .social-link {
          width: 38px; height: 38px;
          border-radius: 12px;
          background: #fff;
          border: 1px solid rgba(86,101,169,0.15);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          font-size: 16px;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(86,101,169,0.08);
        }
        .landing-page .social-link:hover {
          background: #5665a9;
          border-color: #5665a9;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(86,101,169,0.3);
        }
        .landing-page .footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(86,101,169,0.08);
          border: 1px solid rgba(86,101,169,0.15);
          padding: 7px 14px;
          border-radius: 50px;
          font-size: 12px;
          color: #5665a9;
          font-weight: 500;
          margin-top: 16px;
        }
        .landing-page .footer-badge-icon {
          width: 14px; height: 14px;
          background: #5665a9;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 8px; color: #fff;
        }
        .landing-page .footer-col h5 {
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #1a1a3e;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .landing-page .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .landing-page .footer-col ul a {
          text-decoration: none;
          font-size: 14px;
          color: #6b7280;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .landing-page .footer-col ul a:hover { color: #5665a9; transform: translateX(4px); }
        .landing-page .footer-bottom {
          max-width: 1200px;
          margin: 32px auto 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative; z-index: 1;
        }
        .landing-page .footer-bottom p { font-size: 13px; color: #9ca3af; }
        .landing-page .footer-bottom-links { display: flex; gap: 24px; }
        .landing-page .footer-bottom-links a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }
        .landing-page .footer-bottom-links a:hover { color: #5665a9; }
        @media (max-width: 900px) {
          .landing-page .footer-top { flex-direction: column; text-align: center; padding: 40px 32px; }
          .landing-page .footer-inner { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 768px) {
          .landing-page footer { padding: 60px 20px 32px; }
          .landing-page .footer-top { padding: 32px 24px; margin-bottom: 40px; }
          .landing-page .footer-top-text h3 { font-size: 20px; }
          .landing-page .footer-inner { grid-template-columns: 1fr; gap: 28px; padding-bottom: 32px; }
          .landing-page .footer-brand { max-width: 100%; }
          .landing-page .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
          .landing-page .footer-bottom-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .landing-page .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .landing-page .reveal.visible { opacity: 1; transform: translateY(0); }
        /* Mobile Responsiveness */
        @media (max-width: 1200px) {
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
        }

        @media (max-width: 640px) {
          .landing-page nav { padding: 10px 16px; }
          .landing-page .logo { font-size: 16px; }
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
          <img src="/favicon.png" alt="Kaira" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          Kaira<span>Technology</span>
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

      <section className="hero" onClick={handleHeroClick}>
        {slides.map((s, i) => {
          const isActive = slideIndex === i
          if (!s.label) {
            return (
              <div key={i} className={`slide slide-fullbg${isActive ? ' active' : ''}`}
                style={{ backgroundImage: `url(${s.bg})`, '--mobile-bg': `url(${s.mobileBg})` }} />
            )
          }
          return (
            <div key={i} className={`slide slide-fullbg${s.contain ? ' slide-contain' : ''}${isActive ? ' active' : ''}`}
              style={{ backgroundImage: `url(${s.bg})`, '--mobile-bg': `url(${s.mobileBg})` }}>
              <div className="slide-overlay" />
              <div className="slide-content">
                <div className="slide-badge">{s.label}</div>
                <h1 className="slide-h1">{s.title}</h1>
                <p className="slide-p">{s.sub}</p>
                <Link to="/register" className="slide-btn" onClick={e => e.stopPropagation()}>{s.cta} →</Link>
                <div className="slide-trust">Trusted by 5,000+ professionals across India</div>
              </div>
            </div>
          )
        })}
        {slideIndex === 0 && (
          <Link to="/register" className="slide1-cta" onClick={e => e.stopPropagation()}>
            Create Your Card <span>→</span>
          </Link>
        )}
        <div className="slider-dots">
          {slides.map((_, i) => (
            <button key={i} className={`dot${slideIndex === i ? ' active' : ''}`} onClick={e => { e.stopPropagation(); setSlideIndex(i) }} aria-label={`Slide ${i + 1}`} />
          ))}
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
            <img src="/phone/cha1 (1).png" alt="How it works" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
        <div className="footer-top">
          <div className="footer-top-text">
            <h3>Start networking smarter today</h3>
            <p>Join 5,000+ professionals already using Kaira across India.</p>
          </div>
          <Link to="/register" className="footer-top-cta">Create Free Card →</Link>
        </div>
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src="/favicon.png" alt="Kaira" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              Kaira Technologies<span>.</span>
            </Link>
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
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Contact</Link></li>
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
