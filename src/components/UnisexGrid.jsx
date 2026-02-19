import React, { useState } from 'react';
import videprenda1 from '../assets/videos/prenda1.mp4';

// --- SUB-COMPONENTE: TARJETA DE PRODUCTO ---
const ProductCard = ({ prod }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Para el carrusel

  // Lógica para navegar el carrusel
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % prod.gallery.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? prod.gallery.length - 1 : prevIndex - 1
    );
  };

  // Restablecer el índice al abrir/cerrar modal
  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

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

      {/* MODAL CON CARRUSEL DE IMÁGENES */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center bg-black/90 p-0 md:p-4 backdrop-blur-sm ">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

          <div className="bg-white w-full h-[85vh] md:h-auto md:max-h-[90vh] md:max-w-4xl flex flex-col md:flex-row relative rounded-t-3xl md:rounded-none overflow-hidden z-[1001]">
            
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-5 right-5 z-[1002] bg-white/80 p-2 rounded-full text-[10px] font-bold text-black border border-gray-100 md:border-none"
            >
              CERRAR [X]
            </button>

            {/* CARRUSEL DE IMÁGENES (Lado Izquierdo en PC, Arriba en Móvil) */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-full bg-[#F6F6F6] relative overflow-hidden flex items-center justify-center">
              <img 
                src={prod.gallery[currentImageIndex]} 
                className="w-full h-full object-cover transition-transform duration-300 ease-out" 
                alt={`${prod.nombre} - Vista ${currentImageIndex + 1}`} 
              />
              
              {/* Botones de Navegación del Carrusel */}
              {prod.gallery.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevImage} 
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 md:p-4 focus:outline-none z-10"
                  >
                    &#10094; {/* Flecha izquierda */}
                  </button>
                  <button 
                    onClick={goToNextImage} 
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 md:p-4 focus:outline-none z-10"
                  >
                    &#10095; {/* Flecha derecha */}
                  </button>
                  {/* Indicadores de imágenes (puntos) */}
                  <div className="absolute bottom-4 flex space-x-2">
                    {prod.gallery.map((_, index) => (
                      <span
                        key={index}
                        className={`block w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      ></span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* INFO DERECHA */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto bg-white">
            <div className="  border-t border-gray-100 hidden md:block text-[9px] text-gray-400 uppercase tracking-[0.1em] leading-loose">
                <p>Material: 100% Algodón Premium</p>
                <p>Hecho en Bucaramanga, Colombia</p>
                <p>Colección OFFSIDE STUDIO 2026</p>
              </div>
              <h2 className="font-extrabold text-lg md:text-xl uppercase tracking-tighter mb-2">{prod.nombre}</h2>
              <p className="text-gray-500 font-medium mb-8 text-sm md:text-base">{prod.precio}</p>
              
              <div className="flex gap-2 mb-10 text-black">
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

              
            </div>
          </div>
        </div>
      )}
      {/* BOTÓN FLOTANTE DE WHATSAPP */}

<a
  href="https://wa.me/573000000000" // Pon tu número aquí
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-[1000] group"
>
  <div className="relative">
    {/* Efecto de pulso para llamar la atención (opcional) */}
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-20 "></span>
    
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
      alt="WhatsApp Offside"
      className="relative w-14 h-14 md:w-12 md:h-12 drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
    />
  </div>
</a>
    </>
  );
};

// --- COMPONENTE PRINCIPAL: EL GRID ---
const UnisexGrid = () => {
  const productos = [
    { 
      id: 1, 
      nombre: 'OFFSIDE BOXY FIT', 
      precio: '$140.00', 
      img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', 
      videoUrl: videprenda1,
      // NUEVO: Galería de imágenes para el carrusel
      gallery: [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', // Principal
        'https://images.unsplash.com/photo-1571060416960-9d04ae05d6b4?q=80&w=800', // Espalda
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&fit=crop&h=1200' // Detalle
      ]
    },
    { 
      id: 2, 
      nombre: 'TRINITAS LONG SLEEVE', 
      precio: '$160.00', 
      img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800', 
      videoUrl: videprenda1,
      gallery: [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&fit=crop&h=1200',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&fit=crop&h=1000'
      ]
    },
    { 
      id: 3, 
      nombre: 'PRAY 4 LOVE TEE', 
      precio: '$120.00', 
      img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800', 
      videoUrl: videprenda1,
      gallery: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&fit=crop&h=1200',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&fit=crop&h=1000'
      ]
    },
    {
        id: 4,
        nombre: 'OFFSIDE HOODIE',
        precio: '$180.00',
        img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800', 
        videoUrl: videprenda1,
        gallery: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800',
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&fit=crop&h=1200',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&fit=crop&h=1000'
        ]
    }
    
  ];
  

  return (
    <section className="py-10 md:py-8 px-1 md:px-2 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-1 gap-y-10 md:gap-y-16">
        {productos.map(p => <ProductCard key={p.id} prod={p} />)}
      </div>
    </section>
    
  );
};

export default UnisexGrid;