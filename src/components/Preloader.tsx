import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#FCFAF7] overflow-hidden"
    >
      {/* Background Gold Aura */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[500px] w-[500px] bg-amber-600 rounded-full blur-[120px]"
      />

      {/* Film Grain Texture for that Premium Feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          <img src={logo} alt="Go Arpita" className="h-20 md:h-24 w-auto" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border border-dashed border-amber-200/50 rounded-full" 
          />
        </motion.div>

        {/* Staggered Loading Text */}
        <div className="overflow-hidden h-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-2 text-[10px] tracking-[0.5em] font-black uppercase text-amber-700"
          >
            <Sparkles size={12} className="animate-pulse" />
            {/* Using a premium phrase instead of just "Loading" */}
            Crafting Purity
          </motion.div>
        </div>

        {/* Progress Line */}
        <div className="mt-12 w-48 h-[1px] bg-zinc-100 relative overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600 to-transparent"
          />
        </div>
      </div>

      {/* Heritage Quote Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-zinc-300 font-serif italic text-sm tracking-wide">
          "Tradition meets Transformation"
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;