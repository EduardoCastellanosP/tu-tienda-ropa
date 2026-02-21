import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import videprenda1 from '../assets/videos/prenda1.mp4';

// --- SUB-COMPONENTE: TARJETA DE PRODUCTO ---
const ProductCard = ({ prod }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  
  // Lógica para manejar variantes o galería simple
  const tieneVariantes = !!prod.variantes;
  const [selectedColor, setSelectedColor] = useState(tieneVariantes ? Object.keys(prod.variantes)[0] : null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const navigate = useNavigate();

  // Obtener la galería actual basada en el color o la fija
  const currentGallery = tieneVariantes ? prod.variantes[selectedColor] : prod.gallery;
  const mainImg = tieneVariantes ? prod.variantes[Object.keys(prod.variantes)[0]][0] : prod.img;

  const handleAddToCart = () => {
    let ValorExtraido = prod.precio.replace(/[^0-9]/g, '');
    const precioNumerico = parseInt(ValorExtraido);

    const productoParaAñadir = {
      id: `${prod.id}-${selectedColor || 'unico'}-${selectedSize}`, 
      nombre: prod.nombre,
      precio: precioNumerico, 
      talla: selectedSize,
      color: selectedColor,
      img: currentGallery[0],
      cantidad: 1
    };

    const carritoExistente = JSON.parse(localStorage.getItem('cart_offside')) || [];
    const index = carritoExistente.findIndex(item => item.id === productoParaAñadir.id);
    
    if (index !== -1) {
      carritoExistente[index].cantidad += 1;
    } else {
      carritoExistente.push(productoParaAñadir);
    }

    localStorage.setItem('cart_offside', JSON.stringify(carritoExistente));
    navigate('/cart');
  };

  const goToNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length);
  const goToPrevImage = () => setCurrentImageIndex((prev) => prev === 0 ? currentGallery.length - 1 : prev - 1);

  // Resetear carrusel al cambiar color o abrir
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor, isOpen]);

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
            src={mainImg} 
            alt={prod.nombre}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'md:opacity-0' : 'opacity-100'}`} 
          />
          <div className="hidden md:block">
            {isHovered && (
              <video src={prod.videoUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>
        </div>
        <h3 className="font-bold pl-4  text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#2b2a2d]">{prod.nombre}</h3>
        <p className="text-[10px] pl-4 text-gray-500 mt-1 uppercase tracking-widest">{prod.precio}</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center bg-black/90 p-0 md:p-4 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

          <div className="bg-white w-full h-[88vh] md:h-auto md:max-h-[90vh] md:max-w-4xl flex flex-col md:flex-row relative rounded-t-3xl md:rounded-none overflow-hidden z-[1001]">
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 z-[1002] bg-white/80 p-2 rounded-full text-[10px] font-bold text-black border border-gray-100 uppercase tracking-widest">
              Cerrar [X]
            </button>

            {/* CARRUSEL DINÁMICO */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-full bg-[#e8e3da] relative overflow-hidden flex items-center justify-center">
              <img src={currentGallery[currentImageIndex]} className="w-full h-full object-cover transition-all duration-500" alt={prod.nombre} />
              {currentGallery.length > 1 && (
                <>
                  <button onClick={goToPrevImage} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/10 text-white p-3 z-10">&#10094;</button>
                  <button onClick={goToNextImage} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/10 text-white p-3 z-10">&#10095;</button>
                </>
              )}
            </div>

            {/* INFO */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto bg-white text-[#2b2a2d]">
              <h2 className="font-['Aku_&_Kamu',_sans-serif] font-bold text-xl md:text-2xl uppercase mb-2 leading-tight">{prod.nombre}</h2>
              <p className="text-gray-500 font-medium mb-8 text-sm uppercase tracking-widest">{prod.precio}</p>
              
              {/* SELECTOR DE COLOR (CÍRCULOS) */}
              {tieneVariantes && (
                <div className="mb-8">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-3">Color: {selectedColor}</span>
                  <div className="flex gap-4">
                    {Object.keys(prod.variantes).map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === color ? 'border-black scale-110' : 'border-transparent hover:border-gray-200'}`}
                        style={{ 
                          backgroundColor: color === 'Negra' ? '#000' : color === 'Blanca' ? '#fff' : color === 'Gris' ? '#888' : '#a68b6d',
                          border: color === 'Blanca' ? '1px solid #000' : '' 
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* TALLAS */}
              <div className="flex gap-2 mb-10">
                {['S', 'M', 'L', 'XL'].map(talla => (
                  <button 
                    key={talla}
                    onClick={() => setSelectedSize(talla)}
                    className={`flex-1 h-12 border text-[10px] font-bold transition-all ${selectedSize === talla ? 'bg-[#2b2a2d] text-white border-[#2b2a2d]' : 'border-gray-200 hover:border-[#2b2a2d]'}`}
                  >
                    {talla}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <button onClick={handleAddToCart} className="bg-[#2b2a2d] text-white w-full py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] hover:bg-black transition-colors">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
const UnisexGrid = () => {
  const productos = [
    { 
      id: 1, 
      nombre: 'OFFSIDE BOXY FIT', 
      precio: '$140.000', 
      videoUrl: videprenda1,
      variantes: {
        "Negra": [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800',
          'https://images.unsplash.com/photo-1571060416960-9d04ae05d6b4?q=80&w=800'
        ],
        "Blanca": [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800',
          'https://images.unsplash.com/photo-1503341455253-b2e723bb3d09?q=80&w=800'
        ],
        "Gris": [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&fit=crop&h=1000'
        ]
      }
    },
    { 
      id: 2, 
      nombre: 'PRAY 4 LOVE TEE', 
      precio: '$120.000', 
      videoUrl: videprenda1,
      variantes: {
        "Negra": [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&fit=crop&h=1200'
        ],
        "Blanca": [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800',
          'https://images.unsplash.com/photo-1503341455253-b2e723bb3d09?q=80&w=800'
        ],
        "Gris": [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&fit=crop&h=1000'
        ]
      }
    },
    {
      id: 3,
      nombre: 'OFFSIDE HOODIE',
      precio: '$180.000',
      videoUrl: videprenda1,
      variantes: {
        "Negra": [  
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800',
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&fit=crop&h=1200'
        ],
        "Blanca": [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800',
          'https://images.unsplash.com/photo-1503341455253-b2e723bb3d09?q=80&w=800'
        ]
      }
    }
    // Añade el resto aquí siguiendo el formato de variantes...
  ];

  return (
    <section className="py-0.1 px-0 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-3 ">
        {productos.map(p => <ProductCard key={p.id} prod={p} />)}
      </div>
    </section>
  );
};

export default UnisexGrid;