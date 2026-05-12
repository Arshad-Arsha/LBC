import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const galleryImages = [
  { src: '/image/adam-winger-KVVjmb3IIL8-unsplash.jpg',         alt: 'Hair styling' },
  { src: '/image/adam-winger-VjRpkGtS55w-unsplash.jpg',         alt: 'Color treatment' },
  { src: '/image/benyamin-bohlouli-_C-S7LqxHPw-unsplash.jpg',   alt: 'Salon ambience' },
  { src: '/image/pexels-cottonbro-3993293.jpg',                 alt: 'Grooming session' },
  { src: '/image/glossy_blowcut.png',                           alt: 'Glossy blowcut' },
  { src: '/image/pexels-hvfilmz-31323301.jpg',                  alt: 'Foot spa' },
  { src: '/image/greg-trowman-jsuWg7IXx1k-unsplash.jpg',        alt: 'Men styling' },
  { src: '/image/pexels-artbovich-7750115.jpg',                  alt: 'Facial treatment' },
  { src: '/image/handsome-man-barber-shop-styling-hair.jpg',    alt: 'Barber cut' },
];

const beforeAfter = [
  {
    before: '/image/adam-winger-WXmHwPcFamo-unsplash.jpg',
    after:  '/image/hayley-kim-studios-sRSRuxkOuzI-unsplash.jpg',
    label:  'Balayage Transformation',
  },
  {
    before: '/image/man-barbershop-salon-doing-haircut-beard-trim.jpg',
    after:  '/image/handsome-man-barber-shop-styling-hair.jpg',
    label:  'Men\'s Grooming',
  },
];

export default function Gallery() {
  const [ref, inView]     = useInView({ threshold: 0.1, triggerOnce: true });
  const [lightbox, setLB] = useState(null);

  return (
    <section id="gallery" ref={ref} className="py-28 px-6 bg-[#0c0b05] relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(200,155,60,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-20">
          <span className="section-tag">✦ Portfolio</span>
          <div className="divider-gold mt-2" />
          <h2 className="section-title mt-4 italic font-display">
            The <span className="luxury-title !italic">Exhibition</span>
          </h2>
          <p className="font-body text-[#C89B3C]/60 text-xs uppercase tracking-[0.4em] mt-4 font-semibold">Curated Artistry & Transformations</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="hover-reveal-trigger group relative aspect-[4/5] overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500 cursor-none"
              onClick={() => setLB(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end pb-8">
                <span className="text-gold-500 text-sm tracking-[0.3em] uppercase font-display mb-2">{img.alt}</span>
                <div className="w-10 h-[1px] bg-gold-500/50" />
              </div>
              <span className="hover-reveal-text !bottom-4 !text-[0.6rem] !text-white/80">View Detail</span>
            </motion.div>
          ))}
        </div>

        {/* Before / After */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }} className="mt-20"
        >
          <div className="text-center mb-16">
            <span className="section-tag">✦ Transformations</span>
            <h3 className="font-display text-3xl font-bold text-[#F5D28C] mt-2 italic tracking-wider">Before &amp; After</h3>
            <div className="w-12 h-[1px] bg-gold-500/30 mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {beforeAfter.map((ba, i) => (
              <div key={i} className="group relative">
                <div className="flex justify-between items-end mb-6">
                  <h4 className="font-display text-xl text-white/90 italic tracking-wide">{ba.label}</h4>
                  <div className="h-[1px] flex-grow mx-6 bg-gradient-to-r from-gold-500/40 to-transparent" />
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-500/60 font-body">Case 0{i+1}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden border border-white/5">
                    <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[0.5rem] uppercase tracking-widest text-white/40">Initial</div>
                    <img src={ba.before} alt="Before" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden border border-gold-500/20">
                    <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-gold-500/80 backdrop-blur-md text-[0.5rem] uppercase tracking-widest text-black font-bold">Refined</div>
                    <img src={ba.after}  alt="After"  className="w-full h-full object-cover" />
                  </div>
                </div>
                
                <p className="mt-4 text-[0.7rem] text-white/30 uppercase tracking-[0.3em] font-body text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Precision transformation by LBC experts
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="modal-backdrop" onClick={() => setLB(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.img
              src={lightbox} alt="Gallery full"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="max-w-4xl max-h-[85vh] object-contain rounded-2xl shadow-card"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 text-cream/60 hover:text-gold-500 text-2xl transition-colors"
              onClick={() => setLB(null)}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
