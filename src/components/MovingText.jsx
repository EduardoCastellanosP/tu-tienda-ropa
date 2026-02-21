import React from 'react';

const MovingText = () => {
  return (
    /* Reducimos el padding de py-8/12 a py-3/4 para un contenedor más delgado */
    <section className="overflow-hidden bg-[#000000] py-1  md:py-2 flex items-center border-y border-[#2b2a2d]/5">
      <div className="animate-marquee-force flex whitespace-nowrap items-center">
        
        {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>

        {/* Frase 2 - Estilo Outline más fino */}
        <span className="flex items-center">
          <span className="text-transparent text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.5em] px-8" 
                style={{ WebkitTextStroke: '0.5px #2b2a2d' }}>
            Bucaramanga
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>

        {/* Frase 3 */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Est. 2025
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>

        {/* Repetimos para el bucle infinito */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>
        
        <span className="flex items-center">
          <span className="text-transparent text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.5em] px-8" 
                style={{ WebkitTextStroke: '0.5px #2b2a2d' }}>
            Bucaramanga
          </span>
        </span>
         {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>
         {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>
         {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>
         {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>
         {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>
         {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>
         {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>
         {/* Frase 1 - Tamaño reducido de text-2xl a text-xs/sm */}
        <span className="flex items-center">
          <span className="text-[#ffffff] font-medium text-[10px] md:text-xs uppercase tracking-[0.5em] px-8">
            Offside Studio
          </span>
          <span className="w-1 h-1 bg-[#2b2a2d] rounded-full opacity-20"></span>
        </span>

      </div>
    </section>
  );
};

export default MovingText;