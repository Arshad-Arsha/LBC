import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const team = [
  {
    name:       'Arshad',
    role:       'Creative Director & Head Stylist',
    specialty:  'Hair Coloring · Balayage · Cuts',
    img:        '/image/pexels-cottonbro-3993293(1).jpg',
    exp:        '8+ years',
  },
  {
    name:       'Meera S.',
    role:       'Senior Beauty Therapist',
    specialty:  'Facial · Skin Care · Waxing',
    img:        '/image/shari-sirotnak-oM5YoMhTf8E-unsplash.jpg',
    exp:        '6+ years',
  },
  {
    name:       'Raheel K.',
    role:       'Men\'s Grooming Specialist',
    specialty:  'Beard Styling · Haircuts · Grooming',
    img:        '/image/adam-winger-WXmHwPcFamo-unsplash.jpg',
    exp:        '5+ years',
  },
  {
    name:       'Divya P.',
    role:       'Hair Treatment Expert',
    specialty:  'Hair Botox · Keratin · Spa',
    img:        '/image/hayley-kim-studios-sRSRuxkOuzI-unsplash(1).jpg',
    exp:        '7+ years',
  },
];

export default function Team() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="team" ref={ref} className="py-28 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gold-500/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="section-tag">✦ The Artists</span>
          <div className="divider-gold mt-2" />
          <h2 className="section-title mt-4">
            Meet Your <span className="gold-text italic">Stylists</span>
          </h2>
          <p className="text-cream/50 text-sm font-body mt-3 max-w-md mx-auto">
            Our certified team brings passion, precision, and artistry to every single appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative overflow-hidden rounded-2xl mb-6" style={{ height: 320 }}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: 'transform 0.7s ease' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="glass-card px-3 py-2 text-xs text-cream/70 font-body">{member.specialty}</div>
                </div>
              </div>

              {/* Text */}
              <h3 className="font-display text-xl font-semibold text-cream group-hover:text-gold-400 transition-colors">{member.name}</h3>
              <p className="text-xs uppercase tracking-widest text-gold-500/80 font-body mt-1">{member.role}</p>
              <p className="text-[0.7rem] text-cream/35 font-body mt-1">{member.exp} experience</p>

              {/* Gold underline */}
              <div className="mt-3 mx-auto w-6 h-px bg-gold-500 group-hover:w-16 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
