import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  'Haircut', 'Hair Coloring', 'Hair Botox', 'Facial',
  'Threading', 'Waxing', 'Foot Spa', 'Grooming', 'Styling',
];

export default function AppointmentModal({ onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello Life Behind Chair! 👋

I'd like to book an appointment.

✂️ Service: ${form.service}
📅 Date: ${form.date}
⏰ Time: ${form.time}
👤 Name: ${form.name}

Please confirm. Thank you!`;

    const msg = encodeURIComponent(message);
    window.open(`https://wa.me/918139815746?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 3000);
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1,   y: 0 }}
        exit={{   opacity: 0, scale: 0.9,   y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="glass-card max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cream/40 hover:text-gold-500 text-xl transition-colors"
        >✕</button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="gold-shimmer font-display text-2xl font-bold">Book Appointment</div>
          <p className="text-cream/45 text-xs font-body mt-2 tracking-wide">LBC</p>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <p className="gold-text font-display text-xl">Request Sent!</p>
            <p className="text-cream/50 text-sm mt-2 font-body">We'll confirm via WhatsApp shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="luxury-input" />
            </div>
            <div>
              <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Phone *</label>
              <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 …" className="luxury-input" />
            </div>
            <div>
              <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Service *</label>
              <select name="service" required value={form.service} onChange={handleChange} className="luxury-input">
                <option value="" disabled>Select service</option>
                {services.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Date *</label>
                <input name="date" type="date" required value={form.date} onChange={handleChange} className="luxury-input" />
              </div>
              <div>
                <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Time</label>
                <input name="time" type="time" value={form.time} onChange={handleChange} className="luxury-input" />
              </div>
            </div>
            <button type="submit" className="gold-btn w-full mt-2 py-4">
              Book via WhatsApp →
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
