import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const plans = [
  {
    name:     'Essential',
    price:    '₹499',
    subtitle: 'Starting from',
    popular:  false,
    services: ['Haircut', 'Basic Wash & Dry', 'Blow Finish', 'Consultation'],
  },
  {
    name:     'Signature',
    price:    '₹1,499',
    subtitle: 'Starting from',
    popular:  true,
    services: ['Haircut + Styling', 'Hair Coloring', 'Deep Conditioning', 'Scalp Treatment', 'Blow Dry Finish', 'Complimentary Tea'],
  },
  {
    name:     'Luxury',
    price:    '₹3,499',
    subtitle: 'Starting from',
    popular:  false,
    services: ['Hair Botox', 'Full Color/Highlights', 'Facial', 'Threading', 'Waxing', 'Foot Spa', 'Signature Styling', 'Champagne Service'],
  },
];

const membershipPlans = [
  {
    tier:  'Gold',
    price: '₹2,999/mo',
    perks: ['20% off all services', '2 free haircuts/month', 'Priority booking', 'Product samples'],
    color: '#D4AF37',
  },
  {
    tier:  'Platinum',
    price: '₹5,999/mo',
    perks: ['30% off all services', '4 free services/month', 'VIP priority booking', 'Exclusive product gifts', 'Free monthly facial'],
    color: '#E8E8E8',
  },
];

export default function Pricing({ onBookClick }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [tab, setTab]   = useState('services');

  return (
    <section id="pricing" ref={ref} className="py-28 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="section-tag">✦ Investment</span>
          <div className="divider-gold mt-2" />
          <h2 className="section-title mt-4">
            Our <span className="gold-text italic">Pricing</span>
          </h2>
          <p className="text-cream/50 text-sm font-body mt-3 max-w-md mx-auto">
            Transparent pricing. Premium experience. Every service priced to deliver exceptional value.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-1 flex gap-2">
            {['services', 'membership'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-body font-medium transition-all duration-300 ${
                  tab === t ? 'bg-gold-500 text-black' : 'text-cream/60 hover:text-cream'
                }`}
              >
                {t === 'services' ? 'Service Plans' : 'Membership'}
              </button>
            ))}
          </div>
        </div>

        {tab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className={`glass-card p-8 relative flex flex-col ${p.popular ? 'border-gold-500/50 shadow-gold-glow' : ''}`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-black text-[0.6rem] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-[0.65rem] uppercase tracking-widest text-cream/40 font-body mb-1">{p.subtitle}</div>
                  <div className="font-display text-4xl font-bold text-cream">{p.price}</div>
                  <div className="font-display text-lg font-semibold mt-1 gold-text">{p.name}</div>
                </div>

                <ul className="space-y-3 flex-1">
                  {p.services.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-sm font-body text-cream/65">
                      <span className="text-gold-500 text-xs">✦</span>
                      {s}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onBookClick}
                  className={`mt-8 w-full py-3 rounded-lg text-xs uppercase tracking-widest font-body font-semibold transition-all duration-300 ${
                    p.popular ? 'gold-btn' : 'outline-gold-btn'
                  }`}
                >
                  Book This Plan
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'membership' && (
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {membershipPlans.map((m, i) => (
              <motion.div
                key={m.tier}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="membership-card glass-card"
              >
                <div className="mb-6">
                  <div className="font-display text-2xl font-bold mb-1" style={{ color: m.color }}>{m.tier} Member</div>
                  <div className="font-body text-3xl font-semibold text-cream">{m.price}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {m.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm text-cream/65 font-body">
                      <span style={{ color: m.color }}>✦</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button onClick={onBookClick} className="gold-btn w-full text-center">Join Now</button>
              </motion.div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-cream/30 mt-8 font-body">
          * Prices are indicative. Final pricing may vary based on hair type, length &amp; treatment complexity.
          <a href="tel:+918139815746" className="text-gold-500/70 ml-2 hover:text-gold-500 transition-colors">Call for exact quote →</a>
        </p>
      </div>
    </section>
  );
}
