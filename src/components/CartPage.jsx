import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [items, setItems] = useState([]);

  // Cargar datos al montar el componente
  useEffect(() => {
    const datosGuardados = localStorage.getItem('cart_offside');
    if (datosGuardados) {
      try {
        setItems(JSON.parse(datosGuardados));
      } catch (error) {
        console.error("Error al parsear el carrito:", error);
        setItems([]);
      }
    }
  }, []);

  // Guardar en LocalStorage cada vez que cambie el carrito
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart_offside', JSON.stringify(items));
    } else if (items.length === 0) {
      localStorage.removeItem('cart_offside');
    }
  }, [items]);

  const updateQuantity = (id, delta) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item
      )
    );
  };

  // NUEVA FUNCIÓN: Actualizar Talla
  const updateSize = (id, newSize) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, talla: newSize } : item
      )
    );
  };

  // NUEVA FUNCIÓN: Actualizar Color
  const updateColor = (id, newColor) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, color: newColor } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => {
    const precioNumerico = typeof item.precio === 'string' 
      ? parseInt(item.precio.replace(/[^0-9]/g, '')) 
      : item.precio;
    return acc + (precioNumerico * item.cantidad);
  }, 0);

  return (
    <div className="bg-[#e8e3da] min-h-screen pt-24 pb-20 px-4 md:px-12 lg:px-24 text-[#2b2a2d]">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-[#2b2a2d]/20 pb-8 mb-12 flex justify-between items-end">
          <h1 className="font-['Aku_&_Kamu',_sans-serif] text-5xl md:text-8xl uppercase tracking-tighter leading-none">Cart</h1>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2">({items.length}) Items</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-grow space-y-12">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={`${item.id}-${item.talla}-${item.color}`} className="group flex flex-col md:flex-row gap-8 pb-12 border-b border-[#2b2a2d]/10 relative">
                  <div className="w-full md:w-48 aspect-[3/4] overflow-hidden bg-white">
                    <img src={item.img} alt={item.nombre} className="w-full h-full object-cover transition-all duration-700" />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-grow py-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <h2 className="font-['Aku_&_Kamu',_sans-serif] text-2xl uppercase tracking-tight leading-none">{item.nombre}</h2>
                        
                        <div className="flex flex-wrap gap-6">
                          {/* DESPLEGABLE TALLA */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Size</span>
                            <select 
                              value={item.talla}
                              onChange={(e) => updateSize(item.id, e.target.value)}
                              className="bg-transparent text-[11px] font-bold uppercase tracking-widest border-none p-0 focus:ring-0 cursor-pointer"
                            >
                              {['S', 'M', 'L', 'XL'].map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>

                          {/* DESPLEGABLE COLOR */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Color</span>
                            <select 
                              value={item.color || 'Negro'}
                              onChange={(e) => updateColor(item.id, e.target.value)}
                              className="bg-transparent text-[11px] font-bold uppercase tracking-widest border-none p-0 focus:ring-0 cursor-pointer"
                            >
                              <option value="Negro">Negro</option>
                              <option value="Blanco">Blanco</option>
                              <option value="Tierra">Tierra</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <p className="font-bold text-lg">
                        ${((typeof item.precio === 'string' ? parseInt(item.precio.replace(/[^0-9]/g, '')) : item.precio) * item.cantidad).toLocaleString('es-CO')}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-8">
                      <div className="flex border border-[#2b2a2d]/20">
                         <button onClick={() => updateQuantity(item.id, -1)} className="px-4 py-2 hover:bg-[#2b2a2d] hover:text-white transition-colors text-xs">-</button>
                         <span className="px-4 py-2 text-xs font-bold border-x border-[#2b2a2d]/20 w-10 text-center">{item.cantidad}</span>
                         <button onClick={() => updateQuantity(item.id, 1)} className="px-4 py-2 hover:bg-[#2b2a2d] hover:text-white transition-colors text-xs">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[10px] font-bold uppercase tracking-widest border-b border-[#2b2a2d] pb-1 hover:text-red-500 hover:border-red-500 transition-all">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-xl uppercase tracking-widest opacity-30 mb-8 font-['Aku_&_Kamu']">Your cart is empty.</p>
                <Link to="/" className="inline-block bg-[#2b2a2d] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:invert transition-all">Back to Shop</Link>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[400px]">
            <div className="sticky top-32 space-y-10">
              <div className="space-y-6 border-t border-[#2b2a2d] pt-6">
                <div className="flex justify-between items-center">
                   <span className="font-['Aku_&_Kamu',_sans-serif] text-3xl uppercase tracking-tighter">Total</span>
                   <span className="text-2xl font-bold">${subtotal.toLocaleString('es-CO')}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-[#2b2a2d] text-white py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:invert transition-all">
                  Proceed to Checkout
                </button>
                <Link to="/" className="block text-center text-[9px] uppercase tracking-widest text-gray-400 hover:text-black font-bold transition-colors">
                  ← Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;