import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Sprout, Award, Users, Target, Sparkles, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const timeline = [
  { 
    year: "2020", 
    title: "The Seed", 
    titleMr: "बीज", 
    desc: "A simple belief that nature holds the ultimate remedy. We returned to the roots, crafting essentials from the sacred Desi cow.", 
    descMr: "निसर्गाकडे सर्वोत्तम उपाय आहेत या विश्वासाने सुरुवात.", 
    icon: Sprout,
    tagline: "Rooted in Truth"
  },
  { 
    year: "2022", 
    title: "Growing Trust", 
    titleMr: "वाढता विश्वास", 
    desc: "Purity speaks for itself. Over 500 families embraced the Panchagavya lifestyle, choosing healing over chemicals.", 
    descMr: "५०० हून अधिक कुटुंबांनी आमची उत्पादने स्वीकारली.", 
    icon: Users,
    tagline: "A Growing Community"
  },
  { 
    year: "2024", 
    title: "Recognition", 
    titleMr: "ओळख", 
    desc: "Go Arpita became a symbol of authenticity. Our apothecary expanded into advanced skincare and soulful wellness.", 
    descMr: "विश्वसनीय आयुर्वेदिक ब्रँड म्हणून ओळख मिळाली.", 
    icon: Award,
    tagline: "Certified Excellence"
  },
  { 
    year: "2026", 
    title: "Go Health Go Wealth", 
    titleMr: "आरोग्य हीच संपत्ती", 
    desc: "The digital bridge. Bringing the ancient wisdom of the Gaushala directly to every doorstep across the nation.", 
    descMr: "भारतभरात प्रत्येक दारात अस्सल उत्पादने आणण्यासाठी ऑनलाइन सुरुवात.", 
    icon: Target,
    tagline: "The Future of Healing"
  },
];

const OurStoryPage = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] selection:bg-amber-100">
      
      {/* 1. CINEMATIC STORY HERO */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03]">
          <h1 className="text-[20vw] font-black leading-none uppercase text-center mt-20">Heritage</h1>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] tracking-[0.3em] font-black uppercase">
              <Heart className="h-3 w-3" />
              {t("Our Journey", "आमचा प्रवास")}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9]">
              From Tradition <br />
              <span className="italic font-serif text-amber-700">to your Home.</span>
            </h1>

            <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {t(
                "A narrative of slow-made purity and ancient wisdom. We don't just craft products; we preserve a legacy of healing passed down through generations.",
                "उत्कटता, शुद्धता आणि आयुर्वेदाच्या कालातीत ज्ञानाची कथा. आम्ही केवळ उत्पादने बनवत नाही, तर वारसा जपतो."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE CHRONICLE (Vertical Timeline) */}
      <section ref={containerRef} className="relative py-24 md:py-40">
        <div className="container mx-auto px-6 relative">
          
          {/* Central Progress Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-zinc-100">
            <motion.div 
              style={{ scaleY }}
              className="w-full h-full bg-amber-600 origin-top"
            />
          </div>

          <div className="space-y-32 relative">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-12 md:gap-24 relative",
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Year Marker */}
                <div className="absolute left-0 md:left-1/2 -translate-x-[11px] md:-translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-amber-600 z-10 shadow-xl" />
                
                {/* Content Card */}
                <div className="flex-1 w-full md:w-auto">
                  <div className={cn(
                    "p-10 rounded-[40px] bg-white border border-zinc-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-700 group",
                    i % 2 === 0 ? "text-left md:text-right" : "text-left"
                  )}>
                    <div className={cn(
                      "flex items-center gap-4 mb-6",
                      i % 2 === 0 ? "justify-start md:justify-end" : "justify-start"
                    )}>
                       <span className="text-4xl font-serif italic text-amber-700/20 group-hover:text-amber-700/100 transition-colors duration-500">{item.year}</span>
                       <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-amber-600">
                          <item.icon size={24} strokeWidth={1.5} />
                       </div>
                    </div>
                    
                    <p className="text-[10px] tracking-[0.2em] font-black text-zinc-400 uppercase mb-2">
                      {item.tagline}
                    </p>
                    <h3 className="text-2xl font-bold mb-4">
                      {language === "en" ? item.title : item.titleMr}
                    </h3>
                    <p className="text-zinc-500 font-light leading-relaxed">
                      {language === "en" ? item.desc : item.descMr}
                    </p>
                  </div>
                </div>

                {/* Aesthetic Spacer for Desktop */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE MANIFESTO (Mission) */}
      <section className="py-40 bg-zinc-900 text-white overflow-hidden relative">
        {/* Grainy Texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <Sparkles className="h-12 w-12 text-amber-500 mx-auto opacity-50" />
            
            <h2 className="text-xs tracking-[0.5em] font-black uppercase text-amber-600">
              {t("Our Sacred Mission", "आमचे ध्येय")}
            </h2>
            
            <p className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1]">
              "To bridge the <span className="italic font-serif text-amber-500">ancient gaushala</span> with the <span className="italic font-serif text-amber-500">modern home</span>, one handmade creation at a time."
            </p>
            
            <div className="pt-8">
              <Link 
                to="/products" 
                className="inline-flex items-center gap-4 px-12 py-5 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all hover:gap-6 group"
              >
                {t("Experience the Collection", "उत्पादने पहा")}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Decoration */}
        <div className="absolute -bottom-20 -right-20 h-96 w-96 bg-amber-600/10 blur-[120px] rounded-full" />
        <div className="absolute -top-20 -left-20 h-96 w-96 bg-amber-600/10 blur-[120px] rounded-full" />
      </section>

      {/* 4. FOUNDER'S NOTE (The Premium Addition) */}
      <section className="py-32 container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[60px] p-12 md:p-24 border border-zinc-50 shadow-sm relative overflow-hidden">
          <Quote className="absolute top-12 left-12 text-amber-600/5 h-48 w-48 -rotate-12" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-4xl font-light tracking-tighter">A Note from <br /><span className="italic font-serif">the Hands.</span></h3>
              <p className="text-zinc-500 font-light leading-relaxed italic text-lg">
                "We believe health is not just the absence of disease, but the presence of vitality. Our products are designed to bring that vitality back to you, naturally."
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">A</div>
                <div>
                  <p className="font-bold text-sm tracking-widest uppercase">Arpita G.</p>
                  <p className="text-xs text-zinc-400">Founder & Artisan</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Optional: Add a subtle founder photo or a high-end product shot here */}
              <div className="aspect-[4/5] bg-zinc-50 rounded-[40px] border border-dashed border-zinc-200 flex items-center justify-center text-zinc-300 text-xs tracking-widest font-bold">
                [ Artisan Heritage Imagery ]
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurStoryPage;