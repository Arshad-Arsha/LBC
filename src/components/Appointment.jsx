import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  'Haircut', 'Hair Coloring', 'Hair Botox', 'Facial',
  'Threading', 'Waxing', 'Foot Spa', 'Grooming', 'Styling',
];

export default function Appointment() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', time: '', message: '' });
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
${form.message ? `\n📝 Note: ${form.message}\n` : ''}
Please confirm. Thank you!`;

    const msg = encodeURIComponent(message);
    window.open(`https://wa.me/918139815746?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="appointment" ref={ref} className="py-28 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="section-tag">✦ Reserve Your Seat</span>
          <div className="divider-gold my-3" style={{ margin: '12px 0' }} />
          <h2 className="section-title mb-6">
            Book Your <br />
            <span className="gold-text italic">Appointment</span>
          </h2>
          <p className="font-body text-cream/55 leading-relaxed mb-8">
            Ready for your transformation? Fill the form and we'll confirm your appointment via WhatsApp within an hour.
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: '📍', label: 'Location',  value: 'Cherooty Road, Kozhikode, Kerala' },
              { icon: '📞', label: 'Phone',     value: '+91 81398 15746', href: 'tel:+918139815746' },
              { icon: '⏰', label: 'Hours',     value: 'Mon–Sat: 9am–8pm · Sun: 10am–6pm' },
              { icon: '💬', label: 'WhatsApp',  value: 'Message us anytime', href: 'https://wa.me/918139815746' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-widest text-gold-500/70 font-body">{item.label}</div>
                  {item.href
                    ? <a href={item.href} className="text-cream/80 text-sm font-body hover:text-gold-400 transition-colors">{item.value}</a>
                    : <div className="text-cream/80 text-sm font-body">{item.value}</div>
                  }
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right – Form */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="glass-card p-8 md:p-10">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-display text-2xl gold-text mb-2">Request Sent!</h3>
                <p className="text-cream/60 text-sm font-body">Check WhatsApp — we'll confirm shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="luxury-input" />
                  </div>
                  <div>
                    <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Phone *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 …" className="luxury-input" />
                  </div>
                </div>

                <div>
                  <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="luxury-input" />
                </div>

                <div>
                  <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Service *</label>
                  <select name="service" required value={form.service} onChange={handleChange} className="luxury-input">
                    <option value="" disabled>Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Date *</label>
                    <input name="date" type="date" required value={form.date} onChange={handleChange} className="luxury-input" />
                  </div>
                  <div>
                    <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Preferred Time</label>
                    <input name="time" type="time" value={form.time} onChange={handleChange} className="luxury-input" />
                  </div>
                </div>

                <div>
                  <label className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-body block mb-2">Additional Notes</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Any special requests or notes…" rows={3} className="luxury-input resize-none" />
                </div>

                <button type="submit" className="gold-btn w-full text-center py-4">
                  Send Appointment Request via WhatsApp
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Google Maps */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }} className="mt-20 max-w-6xl mx-auto"
      >
        <div className="rounded-2xl overflow-hidden border border-gold-500/15 shadow-card" style={{ height: 360 }}>
          <iframe
            title="Life Behind Chair Salon Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0!2d75.7804!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d4747%3A0x3cba72e4b7c9f!2sCherooty%20Rd%2C%20Kozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1699000000000"
            width="100%" height="100%"
            style={{ border: 0, filter: 'invert(95%) hue-rotate(180deg) saturate(0.4)' }}
            allowFullScreen loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
}
