import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import TrendingStyles from './components/TrendingStyles';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Team from './components/Team';
// import Appointment from './components/Appointment';
// import Instagram from './components/Instagram';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingScreen from './components/LoadingScreen';
import AppointmentModal from './components/AppointmentModal';

export default function App() {
  const [modalOpen, setModalOpen]       = useState(false);

  return (
    <>
      <CustomCursor />
      <motion.div className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <Navbar onBookClick={() => setModalOpen(true)} />
        <main>
          <Hero onBookClick={() => setModalOpen(true)} />
          <About />
          <Services onBookClick={() => setModalOpen(true)} />
          <TrendingStyles />
          <Gallery />
          <Testimonials />
          <Pricing onBookClick={() => setModalOpen(true)} />
          <Team />
          {/* <Appointment /> */}
          {/* <Instagram /> */}
          <FAQ />
        </main>
        <Footer onBookClick={() => setModalOpen(true)} />
        <WhatsAppButton onClick={() => setModalOpen(true)} />
        <AnimatePresence>
          {modalOpen && <AppointmentModal key="modal" onClose={() => setModalOpen(false)} />}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
