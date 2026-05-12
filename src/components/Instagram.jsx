import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const instaImages = [
  '/image/adam-winger-KVVjmb3IIL8-unsplash.jpg',
  '/image/pexels-cottonbro-3992870.jpg',
  '/image/giorgio-trovato-wSpkThmoZQc-unsplash.jpg',
  '/image/benyamin-bohlouli-_C-S7LqxHPw-unsplash.jpg',
  '/image/pexels-emirhan-sayar-478511598-35844834.jpg',
  '/image/greg-trowman-jsuWg7IXx1k-unsplash.jpg',
  '/image/handsome-man-barber-shop-styling-hair.jpg',
  '/image/pexels-artbovich-7750115.jpg',
  '/image/lindsay-cash-Md_DhaFsnCQ-unsplash.jpg',
];

export default function Instagram() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="instagram" ref={ref} className="py-28 px-6 bg-dark-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="section-tag">✦ Follow Us</span>
          <div className="divider-gold mt-2" />
          <h2 className="section-title mt-4">
            On <span className="gold-text italic">Instagram</span>
          </h2>
          <a
            href="https://instagram.com/lifebehindchairsalon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-widest text-gold-500/70 hover:text-gold-500 transition-colors font-body"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @lifebehindchairsalon
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* First big item */}
          <motion.a
            href="https://instagram.com/lifebehindchairsalon"
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="insta-item col-span-2 row-span-2"
            style={{ height: 300 }}
          >
            <img src={instaImages[0]} alt="Instagram" className="w-full h-full object-cover" />
            <div className="insta-overlay">
              <svg width="28" height="28" fill="white" viewBox="0 0 24 24" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
              </svg>
            </div>
          </motion.a>

          {instaImages.slice(1).map((src, i) => (
            <motion.a
              key={src}
              href="https://instagram.com/lifebehindchairsalon"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: (i + 1) * 0.07, duration: 0.5 }}
              className="insta-item"
            >
              <img src={src} alt="Instagram" className="w-full h-full object-cover" />
              <div className="insta-overlay" />
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com/lifebehindchairsalon"
            target="_blank" rel="noopener noreferrer"
            className="outline-gold-btn inline-block"
          >
            View All on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
