import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Mail, 
  X, 
  Leaf, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const FloatingConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();

  const contactOptions = [
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: t("WhatsApp", "व्हॉट्सॲप"),
      sub: t("Instant Reply", "त्वरीत उत्तर"),
      color: "bg-[#25D366]",
      href: "https://wa.me/919082362432",
    },
    {
      id: "email",
      icon: Mail,
      label: t("Email Us", "ईमेल करा"),
      sub: t("Expert Advice", "तज्ज्ञ सल्ला"),
      color: "bg-zinc-900",
      href: "mailto:hello@goarpita.com",
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      
      {/* 1. EXPANDABLE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col gap-3 mb-2"
          >
            {contactOptions.map((option, i) => (
              <motion.a
                key={option.id}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group"
              >
                {/* Tooltip Label */}
                <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-100 shadow-xl opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  <p className="text-[10px] font-black tracking-widest uppercase text-amber-700 leading-none mb-1">
                    {option.sub}
                  </p>
                  <p className="text-xs font-bold text-zinc-900 whitespace-nowrap">
                    {option.label}
                  </p>
                </div>

                {/* Circular Icon */}
                <div className={cn(
                  "h-14 w-14 rounded-[22px] flex items-center justify-center text-white shadow-2xl transition-transform active:scale-90",
                  option.color
                )}>
                  <option.icon size={24} strokeWidth={1.5} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN TRIGGER BUTTON */}
      <div className="relative">
        {/* Pulsing Aura */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-amber-400 rounded-full blur-2xl"
        />

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative h-16 w-16 flex items-center justify-center transition-all duration-500 shadow-2xl overflow-hidden",
            isOpen 
              ? "rounded-full bg-zinc-900 text-white rotate-90" 
              : "rounded-[24px] bg-white text-amber-700 border border-amber-100"
          )}
        >
          {/* Animated Icons */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <X size={24} strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="leaf"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                className="flex flex-col items-center"
              >
                <Leaf size={24} strokeWidth={1.5} />
                {/* Visual Cue for 'Talk' */}
                <motion.div 
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute -top-1 -right-1"
                >
                  <Sparkles size={12} className="text-amber-400" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glossy Film Grain */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingConcierge;