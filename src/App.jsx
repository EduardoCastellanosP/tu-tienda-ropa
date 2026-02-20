import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import IntroPS2 from './components/IntroPS2';
import DesfileGallery from './components/DesfileGallery'; 
import logoPrincipal from './assets/images/Logo-blanco.png';
import logoIntro from './assets/images/Logo-intro.png';
import MovingText from './components/MovingText';
import UnisexGrid from './components/UnisexGrid'; 
import CartPage from './components/CartPage'; 
import Footer from './components/Footer'; 

const imagesContext = import.meta.glob('./assets/images/imagenesdesfile/*.{png,jpg,jpeg,svg}', { eager: true });
const fotosDelDesfile = Object.values(imagesContext).map((mod) => mod.default);

// Sub-componente para manejar la lógica que depende de useLocation
function AppContent() {
  const location = useLocation();
  // El intro solo se muestra si la ruta inicial es la raíz "/"
  const [showIntro, setShowIntro] = useState(location.pathname === '/');

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
            {/* El Navbar solo se renderiza si NO estamos en el carrito */}
            {location.pathname !== '/cart' && (
              <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 h-24 z-50 bg-transparent">              
                <div className="flex-1">
                  <a href="/">
                    <img src={logoPrincipal} alt="Logo" className="h-14 md:h-20 object-contain" />
                  </a>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <a href="/cart" className="text-white">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </a>
                </div>
              </nav>
            )}

            <Routes>
              <Route path="/" element={
                <>
                  <div className="w-full bg-black">
                    <DesfileGallery images={fotosDelDesfile} />
                  </div>
                  <MovingText/>
                  <UnisexGrid />
                </>
              } />
              <Route path="/cart" element={<CartPage />} />
            </Routes>

            <Footer />

            <a
              href="https://wa.me/573189353585?text=Hola%20OFFSIDE%20Studio!%20Tengo%20una%20consulta%20general."
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-[9999] bg-[#25d366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
            >
              <span className="absolute right-16 bg-white text-[#2b2a2d] text-[10px] font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm whitespace-nowrap uppercase tracking-widest">
                ¿Dudas? Escríbenos
              </span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.883 11.883 0 005.685 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;