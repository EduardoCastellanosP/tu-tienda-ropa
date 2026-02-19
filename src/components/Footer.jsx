import React from 'react';

const Footer = () => {
  return (
    /* Fondo con el color corporativo crema (#e8e3da) */
    <footer className="bg-[#e8e3da] border-t border-[#5a5f5f]/10 pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          {/* LOGO Y MANIFESTO - Usando Aku & Kamu para el título */}
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
                <a href="#" className="text-[10px] text-[#5a5f5f] hover:text-black transition-colors uppercase tracking-widest">Guía de Tallas</a>
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
                <a href="https://instagram.com" target="_blank" className="text-[10px] text-[#5a5f5f] hover:text-black transition-colors uppercase tracking-widest">Instagram</a>
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
    </footer>
  );
};

export default Footer;