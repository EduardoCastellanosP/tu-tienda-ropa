import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroPS2 from './components/IntroPS2';
import DesfileGallery from './components/DesfileGallery'; // Asegúrate de que el nombre coincida
import logoPrincipal from './assets/images/Logo-blanco.png';
import logoIntro from './assets/images/Logo-intro.png';
import UnisexGrid from './components/UnisexGrid'; // Asegúrate de que el nombre coincida
import Footer from './components/Footer'; // Ajusta la ruta
// Tutor Tip: Esto carga todas tus fotos de la carpeta automáticamente
const imagesContext = import.meta.glob('./assets/images/imagenesdesfile/*.{png,jpg,jpeg,svg}', { eager: true });
const fotosDelDesfile = Object.values(imagesContext).map((mod) => mod.default);

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Bloqueo de scroll durante la intro
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showIntro]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${showIntro ? 'bg-black' : 'bg-[#F2F0EB]'}`}>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <div key="intro-container" className="fixed inset-0 z-[999] bg-black">
            <IntroPS2 logo={logoIntro} onComplete={() => setShowIntro(false)} />
          </div>
        ) : (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="min-h-screen flex flex-col text-[#ffffff]"
          >
            {/* NAVBAR SUPERIOR */}
<nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 h-24 z-50 bg-transparent">              
              {/* LOGO */}
              <div className="flex-1">
                <motion.img 
                  src={logoPrincipal} alt="Logo Offside"  
                
                  className="h-16 md:h-20 object-contain cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>

              {/* LINKS CENTRALES */}
              <div className="hidden md:flex space-x-10 text-[10px] font-medium uppercase tracking-[0.3em]">
                <a href="#" className="font-body font-medium text-[10px] tracking-[0.3em] uppercase">Collection</a>
                <a href="#" className="font-body font-medium text-[10px] tracking-[0.3em] uppercase">Archive</a>
                <a href="#" className="font-body font-medium text-[10px] tracking-[0.3em] uppercase">Contact</a>
              </div>

              {/* ICONOS DERECHA */}
              <div className="flex-1 flex justify-end space-x-6 items-center">
                <button className="font-body font-medium text-[10px] tracking-[0.3em] uppercase">Search</button>
                <button className="flex items-center gap-2 group">
                  {/* <span className="text-[10px] font-bold tracking-widest uppercase group-hover:text-red-600">(0)</span> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:text-red-600 transition-all">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </button>
              </div>
            </nav>

            {/* CONTENIDO HERO */}
           

            {/* SECCIÓN DEL DESFILE (Tutor: Aquí es donde brilla la galería) */}
            <div className="w-full bg-black">
              <DesfileGallery images={fotosDelDesfile} />
            </div>
            

            {/* ESPACIO PARA PRODUCTOS ABAJO */}
            <UnisexGrid />
            <Footer />
            

          </motion.main>
        )}
      </AnimatePresence>
     
    </div>
  );
}

export default App;