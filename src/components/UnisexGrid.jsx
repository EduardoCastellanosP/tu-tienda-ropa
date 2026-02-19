import React, { useState } from 'react';
// Importamos el video para el PC
import videprenda1 from '../assets/videos/prenda1.mp4';

const ProductCard = ({ prod }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <>
      {/* TARJETA DEL GRID */}
      <div 
        className="group cursor-pointer flex flex-col"
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] bg-[#F6F6F6] overflow-hidden mb-3 md:mb-4">
          <img 
            src={prod.img} 
            alt={prod.nombre}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'md:opacity-0' : 'opacity-100'}`} 
          />
          
          <div className="hidden md:block">
            {isHovered && (
              <video
                src={prod.videoUrl}
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        
        <h3 className="font-bold text-[10px] md:text-[11px] uppercase tracking-[0.15em]">{prod.nombre}</h3>
        <p className="text-[10px] text-gray-500 mt-1">{prod.precio}</p>
      </div>

      {/* MODAL AJUSTABLE A CUALQUIER MONITOR */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center bg-black/90 p-0 md:p-4 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

          <div className="bg-white w-full h-[85vh] md:h-auto md:max-h-[90vh] md:max-w-4xl flex flex-col md:flex-row relative rounded-t-3xl md:rounded-none overflow-hidden z-[1001]">
            
            {/* Botón Cerrar */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-5 right-5 z-[1002] bg-white/80 p-2 rounded-full text-[10px] font-bold text-black border border-gray-100 md:border-none"
            >
              CERRAR [X]
            </button>

            {/* IMAGEN DEL MODAL: Se ajusta a la altura del monitor */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-full bg-[#F6F6F6] overflow-hidden">
              <img 
                src={prod.img} 
                className="w-full h-full object-cover" 
                alt={prod.nombre} 
              />
            </div>

            {/* INFO DERECHA: Con scroll independiente si la pantalla es pequeña */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto bg-white">
              <h2 className="font-extrabold text-lg md:text-xl uppercase tracking-tighter mb-2">{prod.nombre}</h2>
              <p className="text-gray-500 font-medium mb-8 text-sm md:text-base">{prod.precio}</p>
              
              <p className="text-[9px] font-extrabold uppercase tracking-widest mb-4">Talla Unisex</p>
              <div className="flex gap-2 mb-10">
                {['S', 'M', 'L', 'XL'].map(talla => (
                  <button 
                    key={talla}
                    onClick={() => setSelectedSize(talla)}
                    className={`flex-1 md:w-12 h-12 border text-[10px] font-bold transition-all ${selectedSize === talla ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
                  >
                    {talla}
                  </button>
                ))}
              </div>

              <button className="bg-black text-white w-full py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] active:scale-95 transition-transform hover:bg-zinc-900">
                Añadir al Carrito
              </button>

              <div className="mt-8 pt-6 border-t border-gray-100 hidden md:block text-[9px] text-gray-400 uppercase tracking-[0.1em] leading-loose">
                <p>Material: 100% Algodón Premium</p>
                <p>Hecho en Bucaramanga, Colombia</p>
                <p>Colección OFFSIDE STUDIO 2026</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const UnisexGrid = () => {
  const productos = [
    { id: 1, nombre: 'BASICS OFFSIDE BOXY FIT', precio: '$140.00', img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', videoUrl: videprenda1 },
    { id: 2, nombre: 'SPRING TRINITAS LONG SLEEVE', precio: '$160.00', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800', videoUrl: videprenda1 },
    { id: 3, nombre: 'SPRING PRAY 4 LOVE TEE', precio: '$120.00', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800', videoUrl: videprenda1 }
  ];

  return (
    <section className="py-10 md:py-16 px-4 md:px-12 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-4 gap-y-10 md:gap-y-16">
        {productos.map(p => <ProductCard key={p.id} prod={p} />)}
      </div>
    </section>
  );
};

export default UnisexGrid;