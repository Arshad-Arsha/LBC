import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const trends = [
  { title: 'Curtain Bangs',       style: 'Soft & Effortless', img: '/image/lindsay-cash-Md_DhaFsnCQ-unsplash.jpg',        desc: 'The most-requested fringe of the decade — flattering on all face shapes.' },
  { title: 'Lived-In Blonde',     style: 'Balayage Trend',    img: '/image/blonde-female-getting-new-hairstyle-hair-salon.jpg', desc: 'Natural, sun-kissed tones that grow out beautifully with zero harsh lines.' },
  { title: 'Textured Crop',       style: 'Men\'s Trend',      img: '/image/handsome-man-barber-shop-styling-hair.jpg',     desc: 'Modern masculinity — short, structured, effortlessly sharp.' },
  { title: 'Glossy Blowout',      style: 'Signature Finish',  img: '/image/glossy_blowcut.png',  desc: 'Mirror-shine finish that turns heads. Perfect for any occasion.' },
];

export default function TrendingStyles() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="trending" ref={ref} className="py-28 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold-500/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16"
        >
          <span className="section-tag">✦ What's Hot Now</span>
          <div className="divider-gold mt-2" />
          <h2 className="section-title mt-4">
            Trending <span className="gold-text italic">Hairstyles</span> 2025
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trends.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="group relative overflow-hidden rounded-2xl cursor-none"
              style={{ height: 420 }}
            >
              <img src={t.img} alt={t.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" style={{ transition: 'transform 0.7s ease' }} />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[0.6rem] uppercase tracking-widest text-gold-500 font-body">{t.style}</span>
                <h3 className="font-display text-xl font-bold text-cream mt-1 group-hover:text-gold-400 transition-colors">{t.title}</h3>
                <p className="font-body text-cream/55 text-xs mt-2 leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                  {t.desc}
                </p>
                <div className="mt-3 w-6 h-px bg-gold-500 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
