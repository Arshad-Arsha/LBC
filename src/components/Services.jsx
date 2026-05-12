import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    icon: '✂',
    title: 'Haircut',
    desc: 'Precision cuts tailored to your face shape, personality, and lifestyle by our expert stylists.',
    img: '/image/adam-winger-KVVjmb3IIL8-unsplash.jpg',
    tag: 'Most Popular',
  },
  {
    icon: '🎨',
    title: 'Hair Coloring',
    desc: 'From balayage to vivid fantasy colors — we bring your vision to life with premium pigments.',
    img: '/image/giorgio-trovato-wSpkThmoZQc-unsplash.jpg',
    tag: 'Trending',
  },
  {
    icon: '💎',
    title: 'Hair Botox',
    desc: 'Deep-conditioning treatment that reconstructs, smooths, and adds brilliant shine to damaged hair.',
    img: '/image/hayley-kim-studios-sRSRuxkOuzI-unsplash.jpg',
  },
  {
    icon: '✨',
    title: 'Facial',
    desc: 'Rejuvenating skin treatments using luxury products that cleanse, hydrate, and radiate glow.',
    img: '/image/pexels-artbovich-7750115.jpg',
  },
  {
    icon: '〰',
    title: 'Threading',
    desc: 'Precise and painless threading for perfectly sculpted brows and a flawless finish.',
    img: '/image/shari-sirotnak-oM5YoMhTf8E-unsplash.jpg',
  },
  {
    icon: '🌹',
    title: 'Waxing',
    desc: 'Smooth, long-lasting results using premium wax formulations for sensitive skin.',
    img: '/image/pexels-artempodrez-4783278.jpg',
  },
  {
    icon: '🌊',
    title: 'Foot Spa',
    desc: 'Indulge in a deeply relaxing foot treatment — soaking, scrubbing, massage, and more.',
    img: '/image/pexels-hvfilmz-31323301.jpg',
  },
  {
    icon: '⚡',
    title: 'Grooming',
    desc: 'Complete grooming packages — beard styling, skin care, and head-to-toe refinement.',
    img: '/image/man-barbershop-salon-doing-haircut-beard-trim.jpg',
    tag: 'For Men',
  },
  {
    icon: '👑',
    title: 'Styling',
    desc: 'Event-ready blowouts, updos, and editorial styling for every occasion.',
    img: '/image/greg-trowman-jsuWg7IXx1k-unsplash.jpg',
  },
];

const cardVariant = {
  hidden:  { opacity: 0, y: 60 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

export default function Services({ onBookClick }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" ref={ref} className="py-28 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-20"
        >
          <span className="section-tag">✦ Signature Services</span>
          <div className="divider-gold mt-2" />
          <h2 className="section-title mt-4 italic">
            The <span className="luxury-title !italic">Selection</span>
          </h2>
          <p className="font-body text-[#C89B3C]/50 mt-4 max-w-xl mx-auto text-[0.7rem] uppercase tracking-[0.3em] font-semibold">
            Precision. Elegance. Excellence.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="hover-reveal-trigger group flex flex-col bg-black/40 border border-white/5 hover:border-gold-500/30 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b05] via-transparent to-transparent opacity-60" />
                
                {s.tag && (
                  <div className="absolute top-4 left-4 bg-gold-500/90 backdrop-blur-md px-3 py-1 text-[0.55rem] font-bold text-black uppercase tracking-widest">
                    {s.tag}
                  </div>
                )}
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-xl">
                  {s.icon}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow relative z-10">
                <h3 className="font-display text-2xl font-bold text-white/90 mb-4 group-hover:text-gold-500 transition-colors tracking-wide italic">
                  {s.title}
                </h3>
                <p className="font-body text-white/40 text-sm leading-relaxed mb-8 flex-grow font-light">
                  {s.desc}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={onBookClick}
                    className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-gold-500 group-hover:text-white transition-all duration-300"
                  >
                    Request Session
                  </button>
                  <div className="w-8 h-[1px] bg-gold-500/30 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
              
              <span className="hover-reveal-text !bottom-4 !text-[0.6rem]">Experience Now</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
