import { motion } from 'framer-motion';
// Esta es la importación correcta que Netlify sí entiende
import logoIntro from '../assets/images/Logo-intro.png';

const IntroPS2 = ({ onComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }} 
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ 
          duration: 3.5, 
          ease: [0.16, 1, 0.3, 1], 
        }}
        className="w-full flex justify-center px-6"
      >
        <motion.img 
          // CAMBIO CLAVE: Quitamos las comillas y usamos la variable logoIntro
          src={logoIntro} 
          alt="OffSide Identity"
          className="w-auto h-auto max-w-[85%] md:max-w-[500px] object-contain"
          initial={{ scale: 0.2, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};

export default IntroPS2;