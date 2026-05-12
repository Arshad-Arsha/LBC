import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' } }),
};

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-transparent relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold-500/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Images */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="relative h-[520px]"
        >
          <img
            src="/image/pexels-cottonbro-3992870.jpg"
            alt="Inside LBC Salon"
            className="absolute top-0 left-0 w-3/4 h-4/5 object-cover rounded-2xl shadow-card"
          />
          <img
            src="/image/pexels-cottonbro-3993293.jpg"
            alt="Salon styling session"
            className="absolute bottom-0 right-0 w-1/2 h-2/3 object-cover rounded-2xl shadow-card border-2 border-gold-500/20"
          />
          {/* Award badge */}
          <div className="absolute -bottom-4 left-4 glass-card px-5 py-4 shadow-gold-sm">
            <div className="gold-text font-display text-3xl font-bold leading-none">4.8</div>
            <div className="text-[0.6rem] uppercase tracking-widest text-gold-500/70 mt-1">★ Google Rating</div>
          </div>
        </motion.div>

        {/* Right: Text */}
        <div className="space-y-6">
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <span className="section-tag">✦ Our Story</span>
            <div className="divider-gold" style={{ margin: '12px 0' }} />
          </motion.div>

          <motion.h2 custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="section-title"
          >
            Where Art Meets <br />
            <span className="gold-text italic">Hair &amp; Beauty</span>
          </motion.h2>

          <motion.p custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="font-body text-cream/60 leading-relaxed"
          >
            LBC is Kozhikode's premier luxury salon, nestled in the heart of Cherooty Road.
            Our team of expert stylists merges international techniques with deep local roots to craft
            hair and beauty experiences that are truly transformational.
          </motion.p>

          <motion.p custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="font-body text-cream/60 leading-relaxed"
          >
            We are proud to be an <span className="text-gold-500 font-semibold">LGBTQ+ friendly</span> space
            — a safe, inclusive, and celebratory environment where everyone is welcomed, celebrated, and styled
            to perfection.
          </motion.p>

          {/* Pillars */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-3 gap-4 pt-4"
          >
            {[
              { icon: '✦', title: 'Premium',   desc: 'World-class products & techniques' },
              { icon: '♥', title: 'Inclusive',  desc: 'LGBTQ+ safe & welcoming space' },
              { icon: '★', title: 'Expert',     desc: '5+ certified stylists on staff' },
            ].map((p) => (
              <div key={p.title} className="glass-card p-4 text-center hover:border-gold-500/40 transition-colors">
                <span className="gold-text text-xl">{p.icon}</span>
                <div className="font-display text-sm font-semibold text-cream mt-2">{p.title}</div>
                <div className="text-[0.68rem] text-cream/45 mt-1 font-body leading-snug">{p.desc}</div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={6} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <a href="#services" className="gold-btn inline-block mt-2">Explore Services</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
