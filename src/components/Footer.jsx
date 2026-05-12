import React from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/lifebehindchairsalon',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/918139815746?text=${encodeURIComponent("Hello Life Behind Chair! 👋\n\nI'd like to book an appointment.\n\n✂️ Service: Hair Cut\n📅 Date: Sunday, 10 May 2026\n⏰ Time: 8:10 AM\n👤 Name: Alvin\n\nPlease confirm. Thank you!")}`,
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: 'Google Maps',
    href: 'https://maps.google.com/?q=Cherooty+Road+Kozhikode+Kerala',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
  },
];

const footerLinks = [
  { label: 'About',       href: '#about' },
  { label: 'Services',    href: '#services' },
  { label: 'Gallery',     href: '#gallery' },
  { label: 'Pricing',     href: '#pricing' },
  { label: 'Team',        href: '#team' },
  { label: 'Appointment', href: '#appointment' },
  { label: 'FAQ',         href: '#faq' },
];

export default function Footer({ onBookClick }) {
  return (
    <footer id="contact" className="bg-transparent border-t border-white/[0.04]">

      {/* Top CTA band */}
      <div className="bg-[#050505]/40 backdrop-blur-xl py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">✦ Ready to Transform?</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mt-3 mb-6">
            Book Your Session Today
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918139815746" className="gold-btn">Call Us Now</a>
            <button 
              onClick={onBookClick} 
              className="outline-gold-btn"
            >
              WhatsApp Us
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <div className="font-display text-2xl font-bold gold-shimmer mb-1">LBC</div>
          <div className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-500/50 font-body mb-4">Salon</div>
          <p className="text-cream/45 text-sm font-body leading-relaxed mb-6">
            Luxury hair & beauty in the heart of Calicut. LGBTQ+ friendly. Expert stylists. Premium experience.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank" rel="noopener noreferrer"
                aria-label={s.name}
                className="w-10 h-10 glass-card flex items-center justify-center text-cream/50 hover:text-gold-500 hover:border-gold-500/40 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-[0.65rem] uppercase tracking-widest text-gold-500 font-body mb-5">Quick Links</div>
          <ul className="space-y-3">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-cream/50 hover:text-gold-400 transition-colors font-body flex items-center gap-2">
                  <span className="text-gold-500/40 text-xs">→</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-[0.65rem] uppercase tracking-widest text-gold-500 font-body mb-5">Get In Touch</div>
          <div className="space-y-4">
            {[
              { icon: '📍', label: 'Cherooty Road' },
              { icon: '📞', label: '+91 81398 15746', href: 'tel:+918139815746' },
              { icon: '⏰', label: 'Mon–Sat: 9am–8pm · Sun: 10am–6pm' },
              { icon: '🌈', label: 'LGBTQ+ Friendly Space' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{item.icon}</span>
                {item.href
                  ? <a href={item.href} className="text-sm text-cream/50 hover:text-gold-400 transition-colors font-body">{item.label}</a>
                  : <span className="text-sm text-cream/50 font-body">{item.label}</span>
                }
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="mt-6 glass-card p-4 flex items-center gap-4">
            <div>
              <div className="font-display text-3xl font-bold gold-text">4.8</div>
              <div className="flex gap-0.5 mt-1">
                {Array(5).fill(0).map((_, i) => <span key={i} className="text-gold-500 text-xs">★</span>)}
              </div>
            </div>
            <div>
              <div className="text-xs font-body text-cream/70">140+ Reviews</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-cream/35 mt-1">on Google</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-500/8 py-6 px-6 text-center">
        <p className="text-[0.7rem] text-cream/25 font-body">
          © {new Date().getFullYear()} LBC. All rights reserved.
          &nbsp;·&nbsp; LGBTQ+ Friendly &nbsp;🌈
        </p>
      </div>
    </footer>
  );
}
