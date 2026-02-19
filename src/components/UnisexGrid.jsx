import React, { useState } from 'react';
import videprenda1 from '../assets/videos/prenda1.mp4';
// import videprenda2 from '../assets/videos/prenda2.mp4';
// import videprenda3 from '../assets/videos/prenda3.mp4';
// --- COMPONENTE DE TARJETA INDIVIDUAL ---
const ProductCard = ({ prod }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <>
      {/* Tarjeta del Grid */}
      <div 
        className="group cursor-pointer flex flex-col"
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] bg-[#F6F6F6] overflow-hidden mb-4">
          <img 
            src={prod.img} 
            alt={prod.nombre}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
          />
          {isHovered && (
            <video
              src={prod.videoUrl}
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        <h3 className="font-bold text-[11px] uppercase tracking-[0.2em]">{prod.nombre}</h3>
        <p className="text-[10px] text-gray-500 mt-1">{prod.precio}</p>
      </div>

      {/* MODAL DE COMPRA (CSS Estable) */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl flex flex-col md:flex-row relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-4 right-4 z-50 text-[10px] font-bold tracking-widest hover:text-gray-500"
            >
              CERRAR [X]
            </button>

            <div className="w-full md:w-1/2 aspect-[3/4] bg-[#F6F6F6]">
              <img src={prod.img} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-extrabold text-xl uppercase tracking-tighter mb-2">{prod.nombre}</h2>
              <p className="text-gray-500 font-medium mb-8">{prod.precio}</p>
              
              <p className="text-[10px] font-extrabold uppercase tracking-widest mb-4">Talla Unisex</p>
              <div className="flex gap-2 mb-10">
                {['S', 'M', 'L', 'XL'].map(talla => (
                  <button 
                    key={talla}
                    onClick={() => setSelectedSize(talla)}
                    className={`w-12 h-12 border text-[10px] font-bold transition-all ${selectedSize === talla ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
                  >
                    {talla}
                  </button>
                ))}
              </div>

              <button className="bg-black text-white w-full py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors">
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
const UnisexGrid = () => {
  // Aquí tienes los 3 productos que pediste
  const productos = [
    { 
      id: 1, 
      nombre: 'BASICS OFFSIDE BOXY FIT', 
      precio: '$140.00', 
      img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', 
      videoUrl: '/src/assets/videos/prenda1.mp4' 
    },
    { 
      id: 2, 
      nombre: 'SPRING TRINITAS LONG SLEEVE', 
      precio: '$160.00', 
      img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800', 
      videoUrl: '/src/assets/videos/prenda1.mp4' 
    },
    { 
      id: 3, 
      nombre: 'SPRING PRAY 4 LOVE TEE', 
      precio: '$120.00', 
      img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800', 
      videoUrl: '/videos/prenda3.mp4' 
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-16">
        {productos.map(p => <ProductCard key={p.id} prod={p} />)}
      </div>
    </section>
  );
};

export default UnisexGrid;