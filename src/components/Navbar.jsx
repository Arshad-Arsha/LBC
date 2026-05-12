import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Overview',   href: '#overview' },
  { label: 'Services',   href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery',    href: '#gallery' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled 
          ? 'py-4 bg-[#050505]/60 backdrop-blur-xl border-b border-white/[0.04]' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Left: Logo */}
        <a href="#" className="flex flex-col group">
          <span className="font-display text-lg md:text-xl font-medium tracking-wide text-white transition-opacity duration-300 group-hover:opacity-80">
            LBC
          </span>
        </a>

        {/* Center: Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-[0.65rem] tracking-[0.2em] uppercase font-body font-medium text-white/50 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTA */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={onBookClick} 
            className="relative px-6 py-2.5 rounded-full text-[0.65rem] tracking-[0.15em] uppercase font-body font-medium text-[#C89B3C] border border-[#C89B3C]/30 hover:border-[#C89B3C]/80 hover:bg-[#C89B3C]/10 transition-all duration-300 shadow-[0_0_15px_rgba(200,155,60,0)] hover:shadow-[0_0_20px_rgba(200,155,60,0.15)]"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-[1px] w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block h-[1px] w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[1px] w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-2xl border-b border-white/[0.04] overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 items-center">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs tracking-[0.2em] uppercase font-body text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="w-12 h-[1px] bg-white/10 my-2" />
              <button 
                onClick={() => { setMenuOpen(false); onBookClick(); }} 
                className="px-8 py-3 rounded-full text-xs tracking-[0.15em] uppercase font-body font-medium text-[#C89B3C] border border-[#C89B3C]/30 bg-[#C89B3C]/5"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
