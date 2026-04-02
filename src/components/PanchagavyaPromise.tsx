import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Milk, Droplets, Flame, Beaker, Leaf, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const elements = [
  { 
    id: "milk", 
    icon: Milk, 
    name: "Milk", 
    nameMr: "दूध", 
    essence: "The Nurturer", 
    desc: "Rich in A2 proteins, it provides the fundamental 'Prana' (life-force) for skin rejuvenation.", 
    descMr: "A2 प्रथिनांनी समृद्ध, हे त्वचेच्या पुनरुज्जीवनासाठी मूलभूत 'प्राण' प्रदान करते.", 
    color: "text-blue-400",
    bg: "bg-blue-500/5"
  },
  { 
    id: "curd", 
    icon: Beaker, 
    name: "Curd", 
    nameMr: "दही", 
    essence: "The Balancer", 
    desc: "A natural probiotic that cools the 'Pitta' and restores the skin's delicate pH balance.", 
    descMr: "एक नैसर्गिक प्रोबायोटिक जे 'पित्त' शांत करते आणि त्वचेचा पीएच समतोल राखते.", 
    color: "text-indigo-400",
    bg: "bg-indigo-500/5"
  },
  { 
    id: "ghee", 
    icon: Flame, 
    name: "Ghee", 
    nameMr: "तूप", 
    essence: "The Golden Elixir", 
    desc: "The ultimate 'Tejas' (radiance). It penetrates deep into the seven layers of skin tissue.", 
    descMr: "अंतिम 'तेज'. हे त्वचेच्या सात थरांमध्ये खोलवर शिरून पोषण देते.", 
    color: "text-amber-500",
    bg: "bg-amber-500/5"
  },
  { 
    id: "gomutra", 
    icon: Droplets, 
    name: "Gomutra", 
    nameMr: "गोमूत्र", 
    essence: "The Purifier", 
    desc: "A divine 'Shuddhi' (detoxifier) with potent antibacterial minerals from the Himalayas.", 
    descMr: "हिमालयातील शक्तिशाली बॅक्टेरियाविरोधी खनिजांसह एक दैवी 'शुद्धी'.", 
    color: "text-emerald-500",
    bg: "bg-emerald-500/5"
  },
  { 
    id: "dung", 
    icon: Leaf, 
    name: "Cow Dung", 
    nameMr: "शेण", 
    essence: "The Protector", 
    desc: "Ancient 'Ojas' (strength). It creates a natural shield against environmental pollutants.", 
    descMr: "प्राचीन 'ओज'. हे पर्यावरणीय प्रदूषकांपासून नैसर्गिक संरक्षण कवच तयार करते.", 
    color: "text-green-600",
    bg: "bg-green-600/5"
  },
];

const PanchagavyaPromise = () => {
  const { t, language } = useLanguage();
  const [active, setActive] = useState(elements[2]); // Default to Ghee

  return (
    <section className="relative py-32 bg-[#FCFAF7] overflow-hidden">
      {/* Background Sacred Geometry Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] border border-amber-900 rounded-full animate-pulse" />
        <div className="absolute w-[600px] h-[600px] border border-amber-900 rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        
        {/* 1. EDITORIAL HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] font-black text-amber-700 uppercase">
              <Sparkles size={12} />
              {t("The Alchemy of Five", "पाच घटकांची किमया")}
            </span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tighter leading-[0.9]">
              The <span className="italic font-serif">Panchagavya</span> Promise.
            </h2>
            <div className="h-px w-20 bg-amber-200 mx-auto mt-8" />
          </motion.div>
        </div>

        {/* 2. INTERACTIVE ALTAR */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: The Selection */}
          <div className="lg:col-span-5 space-y-4">
            {elements.map((el) => (
              <motion.button
                key={el.id}
                onMouseEnter={() => setActive(el)}
                onClick={() => setActive(el)}
                className={cn(
                  "w-full flex items-center gap-6 p-6 rounded-[24px] transition-all duration-500 group border",
                  active.id === el.id 
                    ? "bg-white border-zinc-200 shadow-xl shadow-amber-900/5 scale-[1.02]" 
                    : "bg-transparent border-transparent grayscale opacity-40 hover:opacity-100 hover:grayscale-0"
                )}
              >
                <div className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                  el.bg, el.color
                )}>
                  <el.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 group-hover:text-amber-700 transition-colors">
                    {language === 'en' ? el.essence : el.essence}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight">
                    {language === "en" ? el.name : el.nameMr}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Side: The Revelation (Deep Content) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square lg:aspect-video bg-white rounded-[40px] border border-zinc-100 shadow-2xl overflow-hidden flex items-center justify-center p-12">
              
              {/* Dynamic Aura Gradient */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className={cn("absolute inset-0 opacity-10", active.bg.replace('/5', '/40'))}
                />
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 text-center lg:text-left space-y-8"
                >
                  <div className={cn("mx-auto lg:mx-0 h-24 w-24 rounded-3xl flex items-center justify-center mb-8", active.bg, active.color)}>
                    <active.icon size={48} strokeWidth={1} />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-4xl md:text-5xl font-light tracking-tighter">
                      {language === "en" ? active.name : active.nameMr}
                    </h4>
                    <p className="text-zinc-400 font-serif italic text-xl">
                      {active.essence}
                    </p>
                  </div>

                  <p className="text-zinc-600 text-lg md:text-xl font-light leading-relaxed max-w-md">
                    {language === "en" ? active.desc : active.descMr}
                  </p>

                  <div className="pt-8 flex items-center gap-4 text-[10px] font-black tracking-widest text-amber-700">
                    <div className="h-px w-8 bg-amber-700" />
                    PURE DESI COW ORIGIN
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Film Grain Texture */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>
          </div>

        </div>

        {/* 3. FOOTER TRUST NOTE */}
        <motion.p 
          {...fadeInUp}
          className="text-center mt-20 text-zinc-400 text-xs tracking-widest uppercase font-bold"
        >
          {t("Tradition trusted for over 5,000 years", "५,००० वर्षांहून अधिक काळापासून विश्वासार्ह परंपरा")}
        </motion.p>
      </div>
    </section>
  );
};

// Re-using the premium animation from previous sections
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default PanchagavyaPromise;