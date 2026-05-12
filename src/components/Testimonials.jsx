import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reviews = [
  {
    name:   'Amina Rashid',
    rating: 5,
    date:   '2 weeks ago',
    avatar: 'A',
    text:   'Absolutely stunning experience! Got a balayage + cut and the results were beyond my expectations. The salon atmosphere is luxurious and the team makes you feel like royalty. Definitely my go-to salon in Kozhikode!',
  },
  {
    name:   'Rahul Menon',
    rating: 5,
    date:   '1 month ago',
    avatar: 'R',
    text:   'Best men\'s grooming in Calicut, hands down. The beard trim and haircut combo was executed perfectly. Love that it\'s LGBTQ+ friendly — felt completely comfortable. Will return every month!',
  },
  {
    name:   'Sneha K.',
    rating: 5,
    date:   '3 weeks ago',
    avatar: 'S',
    text:   'Had the hair botox treatment and my hair has never felt this smooth. The team is professional, the products smell divine, and the results lasted over 3 months. Worth every rupee!',
  },
  {
    name:   'Fathima Beevi',
    rating: 5,
    date:   '1 month ago',
    avatar: 'F',
    text:   'Got threading and facial done here. Painless, precise, and the facial left my skin glowing for days. Hygiene is top-notch and the staff is incredibly warm and welcoming.',
  },
  {
    name:   'Arjun Nair',
    rating: 4,
    date:   '5 weeks ago',
    avatar: 'A',
    text:   'Amazing ambience and professional team. Got a color treatment done and the result was exactly as I requested. Booking was seamless and waiting time minimal. Highly recommended!',
  },
];

const avatarColors = ['#D4AF37', '#B8960C', '#F5E06E', '#92700A', '#D4AF37'];

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + reviews.length) % reviews.length);
  const next = () => setActive((p) => (p + 1) % reviews.length);

  const review = reviews[active];

  return (
    <section id="testimonials" ref={ref} className="py-28 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="section-tag">✦ Client Love</span>
          <div className="divider-gold mt-2" />
          <h2 className="section-title mt-4">
            What Our <span className="gold-text italic">Guests</span> Say
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {Array(5).fill(0).map((_, i) => <span key={i} className="text-gold-500 text-lg">★</span>)}
            <span className="ml-2 text-cream/60 text-sm font-body">4.8 · 140+ Google Reviews</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="glass-card p-10 md:p-14 relative">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 font-display text-7xl text-gold-500/15 leading-none select-none">"</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{   opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-gold-500 text-xl">★</span>
                  ))}
                </div>

                {/* Review text */}
                <p className="font-accent text-cream/80 text-lg md:text-xl leading-relaxed italic mb-8">
                  "{review.text}"
                </p>

                {/* Reviewer */}
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display text-lg font-bold text-black"
                    style={{ background: avatarColors[active % avatarColors.length] }}
                  >
                    {review.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-body font-semibold text-cream text-sm">{review.name}</div>
                    <div className="text-[0.65rem] text-cream/40 uppercase tracking-widest">{review.date} · Google Review</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 flex items-center justify-center text-gold-500 transition-all">
                ←
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i} onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-gold-500' : 'w-2 bg-gold-500/30'}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 flex items-center justify-center text-gold-500 transition-all">
                →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
