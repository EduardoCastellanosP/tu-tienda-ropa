import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import videprenda1 from '../assets/videos/prenda1.mp4';

// --- SUB-COMPONENTE: TARJETA DE PRODUCTO ---
const ProductCard = ({ prod }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const navigate = useNavigate();

  const handleAddToCart = () => {
    let ValorExtraido = prod.precio.replace(/[^0-9]/g, '');
    const precioNumerico = parseInt(ValorExtraido);

    const productoParaAñadir = {
      id:`${prod.id}-${selectedSize}`, 
      nombre: prod.nombre,
      precio: precioNumerico, 
      talla: selectedSize,
      img: prod.img,
      cantidad: 1
    };

    const carritoExistente = JSON.parse(localStorage.getItem('cart_offside')) || [];

    const index = carritoExistente.findIndex(
      item => item.id === productoParaAñadir.id && item.talla === productoParaAñadir.talla
    );
    
    if (index !== -1) {
      carritoExistente[index].cantidad += 1;
    } else {
      carritoExistente.push(productoParaAñadir);
    }

    localStorage.setItem('cart_offside', JSON.stringify(carritoExistente));
    navigate('/cart');
  };

  const goToNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % prod.gallery.length);
  const goToPrevImage = () => setCurrentImageIndex((prev) => prev === 0 ? prod.gallery.length - 1 : prev - 1);

  useEffect(() => {
    if (isOpen) setCurrentImageIndex(0);
  }, [isOpen]);

  return (
    <>
      <div 
        className="group cursor-pointer flex flex-col"
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] bg-[#e8e3da] overflow-hidden mb-2 md:mb-4">
          <img 
            src={prod.img} 
            alt={prod.nombre}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'md:opacity-0' : 'opacity-100'}`} 
          />
          <div className="hidden md:block">
            {isHovered && (
              <video src={prod.videoUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>
        </div>
        <h3 className="font-bold text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#2b2a2d]">{prod.nombre}</h3>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{prod.precio}</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center bg-black/90 p-0 md:p-4 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

          <div className="bg-white w-full h-[88vh] md:h-auto md:max-h-[90vh] md:max-w-4xl flex flex-col md:flex-row relative rounded-t-3xl md:rounded-none overflow-hidden z-[1001]">
            
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 z-[1002] bg-white/80 p-2 rounded-full text-[10px] font-bold text-black border border-gray-100 md:border-none uppercase tracking-widest">
              Cerrar [X]
            </button>

            {/* CARRUSEL */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-full bg-[#e8e3da] relative overflow-hidden flex items-center justify-center">
              <img src={prod.gallery[currentImageIndex]} className="w-full h-full object-cover" alt={prod.nombre} />
              {prod.gallery.length > 1 && (
                <>
                  <button onClick={goToPrevImage} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 md:p-4 z-10">&#10094;</button>
                  <button onClick={goToNextImage} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 md:p-4 z-10">&#10095;</button>
                </>
              )}
            </div>

            {/* INFO */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto bg-white text-[#2b2a2d]">
              <h2 className="font-['Aku_&_Kamu',_sans-serif] font-bold text-xl md:text-2xl uppercase mb-2 leading-tight">{prod.nombre}</h2>
              <p className="text-gray-500 font-medium mb-8 text-sm md:text-base uppercase tracking-widest">{prod.precio}</p>
              
              <div className="flex gap-2 mb-10">
                {['S', 'M', 'L', 'XL'].map(talla => (
                  <button 
                    key={talla}
                    onClick={() => setSelectedSize(talla)}
                    className={`flex-1 md:w-12 h-12 border text-[10px] font-bold transition-all ${selectedSize === talla ? 'bg-[#2b2a2d] text-white border-[#2b2a2d]' : 'border-gray-200 hover:border-[#2b2a2d]'}`}
                  >
                    {talla}
                  </button>
                ))}
              </div>

              {/* CONTENEDOR DE BOTONES */}
              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  className="bg-[#2b2a2d] text-white w-full py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] active:scale-95 transition-transform hover:bg-black shadow-lg"
                >
                  Añadir al Carrito
                </button>

                {/* NUEVO BOTÓN DE WHATSAPP INTEGRADO */}
                <a
                  href={`https://wa.me/573189353585?text=Hola%20OFFSIDE%20Studio!%20Me%20interesa%20la%20prenda:%20${encodeURIComponent(prod.nombre)}%20en%20Talla:%20${selectedSize}%20con%20precio%20de%20${encodeURIComponent(prod.precio)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 border border-[#25d366] text-[#25d366] text-[11px] font-extrabold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#25d366] hover:text-white transition-all active:scale-95 shadow-sm"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5" />
                  Preguntar por esta prenda
                </a>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 text-[9px] text-gray-400 uppercase tracking-[0.1em] leading-loose">
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

// --- COMPONENTE PRINCIPAL: EL GRID ---
const UnisexGrid = () => {
  const productos = [
    { 
      id: 1, 
      nombre: 'OFFSIDE BOXY FIT', 
      precio: '$140.000', 
      img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', 
      videoUrl: videprenda1,
      gallery: [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800',
        'https://images.unsplash.com/photo-1571060416960-9d04ae05d6b4?q=80&w=800',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&fit=crop&h=1200'
      ]
    },
    { 
      id: 2, 
      nombre: 'TRINITAS LONG SLEEVE', 
      precio: '$160.000', 
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
      precio: '$120.000', 
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
      precio: '$180.000',
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
    <section className="py-10 md:py-0 px-1 md:px-2 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-1 gap-y-10 md:gap-y-16">
        {productos.map(p => <ProductCard key={p.id} prod={p} />)}
      </div>
    </section>
  );
};

export default UnisexGrid;