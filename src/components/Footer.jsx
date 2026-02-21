import React, { useState } from 'react';

const Footer = () => {
  // Estado para abrir/cerrar el modal
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <footer className="bg-[#e8e3da] border-t border-[#5a5f5f]/10 pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          {/* LOGO Y MANIFESTO */}
          <div className="md:col-span-2">
            <h2 className="font-['Aku_&_Kamu',_sans-serif] font-bold text-[18px] md:text-[22px] tracking-tight mb-6 text-[#2b2a2d]">
              OFFSIDE STUDIO
            </h2>
            <p className="text-[11px] md:text-[12px] text-[#5a5f5f] leading-relaxed uppercase tracking-widest max-w-sm">
              Streetwear de alta gama diseñado para un mundo sin géneros. 
              Piezas limitadas fabricadas en Bucaramanga, Colombia.
            </p>
          </div>

          {/* SOPORTE */}
          <div>
            <h3 className="font-['Aku_&_Kamu',_sans-serif] font-bold text-[12px] uppercase tracking-wider mb-6 text-[#2b2a2d]">
              Explorar
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[10px] text-[#5a5f5f] hover:text-black transition-colors uppercase tracking-widest">Colección Unisex</a>
              </li>
              <li>
                {/* CAMBIO: Ahora es un botón que abre el modal */}
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] text-[#5a5f5f] hover:text-black transition-colors uppercase tracking-widest outline-none"
                >
                  Guía de Tallas
                </button>
              </li>
              <li>
                <a href="#" className="text-[10px] text-[#5a5f5f] hover:text-black transition-colors uppercase tracking-widest">Envíos</a>
              </li>
            </ul>
          </div>

          {/* COMUNIDAD */}
          <div>
            <h3 className="font-['Aku_&_Kamu',_sans-serif] font-bold text-[12px] uppercase tracking-wider mb-6 text-[#2b2a2d]">
              Comunidad
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="https://www.instagram.com/______offside?igsh=MTB4N2RzcHd1Y2g4MQ==" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#5a5f5f] hover:text-black transition-colors uppercase tracking-widest">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-[10px] text-[#5a5f5f] hover:text-black transition-colors uppercase tracking-widest">TikTok</a>
              </li>
            </ul>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#5a5f5f]/20 pt-8 space-y-4 md:space-y-0">
          <p className="text-[9px] text-[#5a5f5f] tracking-[0.3em] uppercase">
            © 2026 OFFSIDE STUDIO. TODOS LOS DERECHOS RESERVADOS.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#2b2a2d] rounded-full animate-pulse"></span>
            <p className="text-[9px] text-[#2b2a2d] tracking-[0.3em] uppercase font-bold">
              BUCARAMANGA, COLOMBIA
            </p>
          </div>
        </div>
      </div>

      {/* --- MODAL DE GUÍA DE TALLAS --- */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10">
          {/* Capa para cerrar al hacer clic fuera de la imagen */}
          <div className="absolute inset-0" onClick={() => setIsSizeGuideOpen(false)}></div>

          <div className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl z-[1001] flex flex-col">
            {/* Botón Cerrar */}
            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 z-[1002] bg-white/80 p-2 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all"
            >
              Cerrar [X]
            </button>

            {/* Contenedor de la Imagen */}
            <div className="overflow-y-auto p-2">
              <img 
                src="/guia-tallas.jpg" /*Aqui debo poner la foto de la guia de tallas*/
                alt="Guía de Tallas Offside Studio" 
                className="w-full h-auto object-contain"
                onError={(e) => e.target.src = 'https://via.placeholder.com/800x1000?text=IMAGEN+EN+PROCESO'}
              />
            </div>
            
            <div className="p-4 bg-white border-t border-gray-100 text-center">
              <p className="font-['Aku_&_Kamu',_sans-serif] text-[10px] uppercase tracking-[0.2em] text-[#2b2a2d]">
                Asegúrate de revisar tus medidas antes de comprar.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;