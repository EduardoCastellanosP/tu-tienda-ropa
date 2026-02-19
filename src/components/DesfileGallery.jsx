import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DesfileGallery = ({ images }) => {
  const [index, setIndex] = useState(0);

  // Tutor Tip: Esto hace que las fotos cambien solas cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[100vh] bg-black overflow-hidden">
      <AnimatePresence mode="wait">
  <motion.img
    key={index}
    src={images[index]}
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.1, ease: "easeInOut" }}
    // Tutor Tip: object-center es la clave para que la ropa no se corte feo
    className="absolute inset-0 w-full h-full object-cover object-[50%_30%]"
  />
</AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16">
  {/* Texto muy pequeño y ultra-espaciado */}
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5 }}
    className="text-center"
  >
    <p className="text-[10px] md:text-[12px] font-medium tracking-[0.8em] uppercase text-white/80 mb-2">
      Archive 2025
    </p>
    <h2 className="text-[14px] md:text-[28px] font-extrabold tracking-[0.4em] uppercase text-white">
      OUT-OFF BASIC
    </h2>
    
   
  </motion.div>
</div>
    </section>
  );
};

export default DesfileGallery;