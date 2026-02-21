import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logocarro from '../assets/images/Loguito2.png';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    direccion: ''
  });

  useEffect(() => {
    const datosGuardados = localStorage.getItem('cart_offside');
    if (datosGuardados) {
      try {
        setItems(JSON.parse(datosGuardados));
      } catch (error) {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart_offside', JSON.stringify(items));
    } else if (items.length === 0) {
      localStorage.removeItem('cart_offside');
    }
  }, [items]);

  // NUEVA FUNCIÓN: Actualizar Talla desde el Carrito
  const updateSize = (id, newSize) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, talla: newSize } : item
      )
    );
  };

  const updateQuantity = (id, delta) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalCheckout = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono || !formData.direccion) {
      alert("Error: Nombre, teléfono y dirección son obligatorios para el despacho.");
      return;
    }
    alert("Redirigiendo a ePayco para pago seguro por PSE...");
  };

  return (
    <div className="bg-[#e8e3da] min-h-screen pt-5 pb-20 px-4 md:px-12 lg:px-24 text-[#2b2a2d]">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-[#2b2a2d]/20 pb-1 mb-6 flex justify-between items-end">
            <img src={logocarro} alt="Cart Icon" className="inline-block w-12 md:w-34 mr-4 " />
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] mb-15">({items.length}) Items</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-grow space-y-12">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-8 pb-12 border-b border-[#2b2a2d]/10">
                  <div className="w-full md:w-48 aspect-[3/4] overflow-hidden bg-white">
                    <img src={item.img} alt={item.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-grow py-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <h2 className="font-['Aku_&_Kamu',_sans-serif] text-2xl uppercase tracking-tight leading-none">{item.nombre}</h2>
                        
                        {/* SELECTOR DE TALLA RESTAURADO */}
                        {/* SELECTOR DE TALLA REDUCIDO */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Size
                      </span>
                      <select 
                        value={item.talla}
                        onChange={(e) => updateSize(item.id, e.target.value)}
                        className="bg-transparent text-[12px] font-bold uppercase tracking-widest border-none p-0 w-10 focus:ring-0 cursor-pointer outline-none "
                      >
                        {['S', 'M', 'L', 'XL'].map(t => (
                          <option key={t} value={t} className="bg-[#e8e3da] text-black">{t}</option>
                        ))}
                      </select>
                    </div>
                      </div>
                      <p className="font-bold text-lg">${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
                    </div>
                    <div className="flex justify-between items-end mt-8">
                      <div className="flex border border-[#2b2a2d]/20">
                         <button onClick={() => updateQuantity(item.id, -1)} className="px-4 py-2 hover:bg-[#2b2a2d] hover:text-white transition-colors">-</button>
                         <span className="px-4 py-2 font-bold w-10 text-center text-xs">{item.cantidad}</span>
                         <button onClick={() => updateQuantity(item.id, 1)} className="px-4 py-2 hover:bg-[#2b2a2d] hover:text-white transition-colors">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[10px] font-bold uppercase border-b border-[#2b2a2d] pb-1 hover:text-red-500 hover:border-red-500 transition-all">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-xl uppercase tracking-widest opacity-30 mb-8 font-['Aku_&_Kamu']">Empty cart.</p>
                <Link to="/" className="inline-block bg-[#2b2a2d] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:invert transition-all">Back to Shop</Link>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[400px]">
            <div className="sticky top-32 space-y-10">
              <div className="border-t border-[#2b2a2d] pt-6 flex justify-between items-center">
                <span className="font-['Aku_&_Kamu',_sans-serif] text-3xl uppercase tracking-tighter">Total</span>
                <span className="text-2xl font-bold">${subtotal.toLocaleString('es-CO')}</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                disabled={items.length === 0}
                className="w-full bg-[#2b2a2d] text-white py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:invert transition-all disabled:opacity-50"
              >
                Proceed to Checkout
              </button>

              <Link 
        to="/" 
        className="block text-center text-[9px] uppercase tracking-[0.4em] text-gray-400 hover:text-black font-bold transition-colors pt-1"
      >
        ← Seguir Comprando
      </Link>
            </div>
          </div>
        </div>
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#F2F0EB] w-full max-w-lg p-8 md:p-12 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-widest border-b border-black">Cerrar [X]</button>
            <h2 className="font-['Aku_&_Kamu',_sans-serif] text-4xl uppercase tracking-tighter mb-8 text-[#2b2a2d]">Shipping</h2>
            <form onSubmit={handleFinalCheckout} className="space-y-6">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Nombre Completo *</label>
                <input required type="text" name="nombre" onChange={handleInputChange} className="w-full bg-transparent border-b border-[#2b2a2d]/20 py-2 outline-none focus:border-[#2b2a2d] text-sm uppercase text-[#2b2a2d]" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Email *</label>
                  <input required type="email" name="email" onChange={handleInputChange} className="w-full bg-transparent border-b border-[#2b2a2d]/20 py-2 outline-none focus:border-[#2b2a2d] text-sm text-[#2b2a2d]" />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Teléfono *</label>
                  <input required type="tel" name="telefono" onChange={handleInputChange} className="w-full bg-transparent border-b border-[#2b2a2d]/20 py-2 outline-none focus:border-[#2b2a2d] text-sm text-[#2b2a2d]" />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Ciudad *</label>
                <input required type="text" name="ciudad" onChange={handleInputChange} className="w-full bg-transparent border-b border-[#2b2a2d]/20 py-2 outline-none focus:border-[#2b2a2d] text-sm uppercase text-[#2b2a2d]" />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Dirección Exacta *</label>
                <input required type="text" name="direccion" onChange={handleInputChange} className="w-full bg-transparent border-b border-[#2b2a2d]/20 py-2 outline-none focus:border-[#2b2a2d] text-sm uppercase text-[#2b2a2d]" />
              </div>
              <button type="submit" className="w-full bg-[#2b2a2d] text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:invert transition-all mt-4">Pagar con PSE / ePayco</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;