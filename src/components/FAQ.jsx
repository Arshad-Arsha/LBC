import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const faqs = [
  {
    q: 'Do I need to book an appointment in advance?',
    a: 'While walk-ins are welcome based on availability, we strongly recommend booking 24–48 hours in advance to secure your preferred stylist and time slot.',
  },
  {
    q: 'Is LBC LGBTQ+ friendly?',
    a: 'Absolutely. We are a proud, inclusive, and LGBTQ+ affirming salon. Everyone is welcome here — no judgment, just artistry and celebration.',
  },
  {
    q: 'What hair coloring techniques do you offer?',
    a: 'We offer balayage, ombré, highlights, full color, vivid fantasy colors, root touch-ups, and toning. Our colorists will help you choose what\'s best for your hair type.',
  },
  {
    q: 'How long does a Hair Botox treatment last?',
    a: 'Hair Botox typically lasts 2–4 months depending on hair type, washing frequency, and aftercare. Our stylists provide a full aftercare guide post-treatment.',
  },
  {
    q: 'Do you use professional grade products?',
    a: 'Yes. We exclusively use premium salon-grade products from renowned international and Indian brands to ensure the best results for your hair and skin.',
  },
  {
    q: 'Can I book for bridal or event styling?',
    a: 'Absolutely! We offer bridal packages and event styling. Please book at least 1–2 weeks in advance for bridal services. Contact us for a personalized quote.',
  },
  {
    q: 'How do I cancel or reschedule?',
    a: 'You can reschedule or cancel up to 4 hours before your appointment by messaging us on WhatsApp at +91 81398 15746. Last-minute cancellations may incur a small fee.',
  },
];

export default function FAQ() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" ref={ref} className="py-28 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="section-tag">✦ Got Questions?</span>
          <div className="divider-gold mt-2" />
          <h2 className="section-title mt-4">
            Frequently Asked <span className="gold-text italic">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-body text-left pr-4 text-cream/85 hover:text-cream transition-colors">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-gold-500 text-xl"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-cream/55 font-body text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-cream/40 text-sm font-body mb-4">Still have questions?</p>
          <a href="tel:+918139815746" className="gold-btn inline-block">
            Call Us: +91 81398 15746
          </a>
        </motion.div>
      </div>
    </section>
  );
}
