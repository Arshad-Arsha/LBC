import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_FRAMES  = 80;

// Build the frame path list
const getFramePath = (i) => {
  const num = String(i).padStart(3, '0');
  return `/vedio-splite/ffout${num}.gif`;
};

// Reusable cinematic text reveal wrapper with Zoom Effect
const CinematicReveal = ({ children, align = "center", delay = 0 }) => {
  const alignmentClass = 
    align === 'left' ? 'items-start text-left' : 
    align === 'right' ? 'items-end text-right' : 
    'items-center text-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.7, filter: 'blur(20px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.22, 1, 0.36, 1],
        scale: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
      }}
      className={`flex flex-col max-w-3xl ${alignmentClass}`}
    >
      {children}
    </motion.div>
  );
};

export default function Hero({ onBookClick }) {
  const containerRef   = useRef(null);
  const canvasRef      = useRef(null);
  const imagesRef      = useRef([]);
  const frameRef       = useRef(0);
  const loadedRef      = useRef(0);
  const rafRef         = useRef(null);

  const [allLoaded,    setAllLoaded]    = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [minTimeMet,   setMinTimeMet]   = useState(false);

  // ── Minimum 4s Loading Time & Smooth Counter ──────────────
  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const interval = 16;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        start = 100;
        setMinTimeMet(true);
        clearInterval(timer);
      }
      setLoadProgress(Math.floor(start));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // ── Preload all frames ──────────────────────────────────────
  useEffect(() => {
    imagesRef.current = [];
    loadedRef.current = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      
      img.onload = () => {
        loadedRef.current++;
        if (i === 1) setLoadProgress(prev => Math.max(prev, 10)); 
      };
      img.onerror = () => {
        loadedRef.current++;
        console.error(`Failed to load frame ${i}`);
      };
      
      imagesRef.current.push(img);
    }
    
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Show site when 4s passed AND at least some frames are ready
  useEffect(() => {
    if (minTimeMet && loadedRef.current >= 1) {
      setAllLoaded(true);
    }
  }, [minTimeMet]);

  // ── Draw a single frame on canvas ──────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const imgRatio    = img.naturalWidth  / img.naturalHeight;
    const canvasRatio = canvas.width      / canvas.height;
    let drawW, drawH, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawH = canvas.height;
      drawW = drawH * imgRatio;
      drawX = (canvas.width  - drawW) / 2;
      drawY = 0;
    } else {
      drawW = canvas.width;
      drawH = drawW / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawH) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Deep cinematic overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0,   'rgba(5,5,5,0.75)');
    gradient.addColorStop(0.5, 'rgba(5,5,5,0.4)');
    gradient.addColorStop(1,   'rgba(5,5,5,0.85)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const [animFinished,   setAnimFinished] = useState(false);

  // ── Scroll handler (rAF Loop mapped ONLY to Hero Section) ────
  useEffect(() => {
    if (!allLoaded) return;
    
    const onResize = () => drawFrame(Math.round(frameRef.current));
    onResize();
    window.addEventListener('resize', onResize);

    const loop = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight;
      
      // Calculate total scroll progress through the Hero container
      const progress = -rect.top / (totalHeight - window.innerHeight);
      const clampedProgress = Math.min(1, Math.max(0, progress));
      
      // MAPPING: We want the 80 frames to play through in the first part of the scroll
      const animationEndProgress = 0.15; 
      const animationV = Math.min(1, clampedProgress / animationEndProgress);
      
      // Update state when animation is nearly complete
      if (animationV > 0.95 && !animFinished) {
        setAnimFinished(true);
      } else if (animationV < 0.1 && animFinished) {
        // Optional: Reset if they scroll all the way back up
        setAnimFinished(false);
      }

      const target = animationV * (TOTAL_FRAMES - 1);
      frameRef.current += (target - frameRef.current) * 0.1;

      const fi = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameRef.current)));
      drawFrame(fi);

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [allLoaded, drawFrame, animFinished]);

  return (
    <>
      {/* Container for the entire Hero Scrollytelling Experience */}
      <div ref={containerRef} className="relative w-full bg-[#050505]">
        
        {/* Sticky Canvas Background - Stays while Hero is scrolling */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ zIndex: 0, display: 'block' }}
          />
        </div>

        {/* Premium Loading Overlay */}
        <AnimatePresence>
          {!allLoaded && (
            <motion.div
              key="loader"
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border border-gold-500/10 border-t-gold-500/60 rounded-full"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="gold-shimmer font-display text-2xl font-bold tracking-[0.4em] ml-[0.4em]"
                  >
                    LBC
                  </motion.div>
                  <div className="text-[0.6rem] text-gold-500/40 tracking-[0.2em] uppercase font-body mt-2">
                    Experience
                  </div>
                </div>
              </div>
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="font-display text-4xl font-light text-white/90 tabular-nums">
                  {loadProgress}<span className="text-gold-500/50 text-xl ml-1">%</span>
                </div>
                <div className="h-[1px] w-48 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SCROLLYTELLING SECTIONS ── */}
        {/* Shifted up to overlay the sticky canvas */}
        <div className="relative z-10 w-full flex flex-col -mt-[100vh]">
          
          {/* PHASE 1: ANIMATION ONLY (No text) */}
          <section className="w-full h-[120vh] pointer-events-none flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: animFinished ? 0 : [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-12 flex flex-col items-center gap-3"
            >
              <span className="text-[0.6rem] uppercase tracking-[0.4em] text-[#C89B3C]/40 font-body">Scroll to Reveal</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-[#C89B3C]/20 to-transparent" />
            </motion.div>
          </section>

          {/* SECTION 1: HERO INTRO (Starts appearing after animation) */}
          <section className="w-full h-screen flex flex-col items-center justify-center px-6">
            <AnimatePresence>
              {animFinished && (
                <CinematicReveal align="center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                  >
                    <div className="hover-reveal-trigger group mb-4">
                      <h1 className="luxury-title text-center leading-[0.8] mb-2" style={{ fontSize: 'clamp(4rem, 15vw, 10rem)' }}>
                        LBC
                      </h1>
                      <span className="hover-reveal-text">Life Behind Chair</span>
                    </div>

                    <div className="hover-reveal-trigger mb-6">
                      <p className="text-xl md:text-2xl text-[#C89B3C] tracking-[0.2em] font-light text-center font-display uppercase">
                        Luxury, tailored to you.
                      </p>
                      <span className="hover-reveal-text">Bespoke Grooming</span>
                    </div>

                    <p className="font-body text-white/50 text-sm md:text-base max-w-lg leading-relaxed text-center tracking-wide">
                      Modern grooming and beauty experiences crafted with precision, elegance, and care.
                    </p>
                  </motion.div>
                </CinematicReveal>
              )}
            </AnimatePresence>
          </section>

          {/* SECTION 2: THE CRAFT (Transition to Solid Black) */}
          <section className="relative w-full min-h-screen flex flex-col items-start justify-center px-8 md:px-24 bg-[#050505] z-20">
            {/* Top Side Opacity/Gradient - Smooth transition from video to black */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] -translate-y-full pointer-events-none" />
            
            <div className="max-w-4xl">
              <CinematicReveal align="left">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[0.65rem] uppercase tracking-[0.3em] text-[#C89B3C] mb-4 block"
                >
                  The Craft
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-bold leading-tight tracking-[0.05em] mb-8" 
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'rgba(255,255,255,0.92)' }}
                >
                  Crafted with precision.
                </motion.h2>
                
                <div className="space-y-6 font-body text-white/60 text-sm md:text-lg max-w-xl leading-relaxed font-light">
                  <div className="hover-reveal-trigger">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      Every detail is intentional — from personalized styling to premium products and modern techniques.
                    </motion.p>
                    <span className="hover-reveal-text !bottom-[-30px]">Signature Excellence</span>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-[#C89B3C]/80"
                  >
                    Designed to elevate confidence, comfort, and self-expression.
                  </motion.p>
                </div>
              </CinematicReveal>
            </div>
          </section>

          {/* SECTION 3: THE EXPERIENCE */}
          <section className="w-full min-h-screen flex flex-col items-end justify-center px-8 md:px-24">
            <CinematicReveal align="right">
              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#C89B3C] mb-4 block">The Experience</span>
              <h2 className="font-display font-semibold leading-tight tracking-tight mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'rgba(255,255,255,0.92)' }}>
                An experience beyond styling.
              </h2>
              <ul className="space-y-4 font-body text-white/60 text-sm md:text-lg max-w-lg leading-relaxed font-light">
                <li className="flex items-center gap-4 justify-end"><span className="text-[#C89B3C] text-xs">✦</span> Tailored consultations for every individual.</li>
                <li className="flex items-center gap-4 justify-end"><span className="text-[#C89B3C] text-xs">✦</span> Premium care designed around comfort.</li>
                <li className="flex items-center gap-4 justify-end"><span className="text-[#C89B3C] text-xs">✦</span> Luxury spaces that inspire confidence.</li>
                <li className="flex items-center gap-4 justify-end"><span className="text-[#C89B3C] text-xs">✦</span> Modern techniques. Timeless elegance.</li>
              </ul>
            </CinematicReveal>
          </section>

          {/* SECTION 4: BEAUTY & TRANSFORMATION */}
          <section className="w-full min-h-screen flex flex-col items-center justify-center px-6">
            <CinematicReveal align="center">
              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#C89B3C] mb-4 block">Transformation</span>
              <h2 className="font-display font-semibold leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'rgba(255,255,255,0.92)' }}>
                Confidence, redefined.
              </h2>
              <div className="space-y-4 font-body text-white/60 text-sm md:text-lg max-w-2xl leading-relaxed font-light text-center">
                <p>From precision cuts to elevated beauty treatments, every experience is designed to make you look and feel exceptional.</p>
                <p className="text-[#F5D28C]">Luxury service meets modern artistry.</p>
              </div>
            </CinematicReveal>
          </section>

          {/* SECTION 5: FINAL REVEAL & CTA */}
          <section className="w-full min-h-[90vh] flex flex-col items-center justify-center px-6 pb-20">
            <CinematicReveal align="center">
              <h2 className="font-display font-bold leading-tight tracking-tight mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: 'rgba(255,255,255,0.95)' }}>
                Look exceptional.<br />Feel unforgettable.
              </h2>
              <p className="text-lg md:text-xl text-[#C89B3C] tracking-wide font-light mb-12">
                LBC — where luxury meets personal expression.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                <button onClick={onBookClick} className="bg-gradient-to-r from-[#C89B3C] to-[#7A5A2B] text-[#050505] px-10 py-5 rounded-none uppercase tracking-[0.3em] text-[0.65rem] font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(200,155,60,0.2)] border border-[#C89B3C]/50">
                  Book Your Experience
                </button>
                <a href="#services" className="px-10 py-5 rounded-none uppercase tracking-[0.3em] text-[0.65rem] font-bold text-white border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all duration-300 backdrop-blur-md">
                  Explore Services
                </a>
              </div>
              
              <p className="mt-12 text-[0.65rem] uppercase tracking-[0.2em] text-white/30 font-body">
                Designed for modern beauty, grooming, and self-confidence.
              </p>
            </CinematicReveal>
          </section>

        </div>
      </div>
    </>
  );
}
