import React, { useEffect } from 'react'; // Añadimos useEffect
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResponsePage = () => {
  // Limpiar el carrito apenas cargue esta página
  useEffect(() => {
    localStorage.removeItem('cart_offside');
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F0EB] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-10 text-center shadow-sm"
      >
        <h1 className="font-['Aku_&_Kamu',_sans-serif] text-4xl uppercase tracking-tighter text-[#2b2a2d] mb-6">
          ¡Gracias por tu compra!
        </h1>
        
        <div className="space-y-4 mb-10">
          <p className="text-[11px] text-[#5a5f5f] uppercase tracking-[0.2em] leading-relaxed">
            Tu pedido ha sido recibido con éxito en nuestra base de Bucaramanga.
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Pronto recibirás un mensaje con la guía de despacho.
          </p>
        </div>

        <Link 
          to="/" 
          className="block bg-[#2b2a2d] text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:invert transition-all"
        >
          Volver a la tienda
        </Link>
      </motion.div>
    </div>
  );
};

export default ResponsePage;