import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Leaf, Heart, Shield, Droplets, Hand, Sun, 
  Sparkles, Zap, Globe, ArrowRight, Award, Beaker 
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Leaf,
    title: "Ancient Formulations",
    titleMr: "प्राचीन सूत्र",
    desc: "We follow sacred Ayurvedic blueprints passed down through lineages, ensuring the 'Prana' of the herbs remains intact.",
    descMr: "आम्ही पिढ्यानपिढ्या चालत आलेल्या पवित्र आयुर्वेदिक आराखड्यांचे पालन करतो.",
  },
  {
    icon: Droplets,
    title: "The Desi Essence",
    titleMr: "देशी सारांश",
    desc: "Sourced exclusively from protected Desi cows, our ingredients are considered 'Jiva-Amrit' (Life-Elixir) in the Vedic texts.",
    descMr: "केवळ संरक्षित देशी गायींपासून मिळवलेले आमचे घटक 'जीवामृत' मानले जातात.",
  },
  {
    icon: Hand,
    title: "Slow-Made Artistry",
    titleMr: "हस्तनिर्मित कला",
    desc: "We reject industrial speed. Every creation is slow-made by hand during the auspicious Brahma Muhurta hours.",
    descMr: "आम्ही औद्योगिक वेग नाकारतो. प्रत्येक निर्मिती ब्रह्म मुहूर्तावर हाताने केली जाते.",
  },
  {
    icon: Shield,
    title: "Zero Compromise",
    titleMr: "शून्य तडजोड",
    desc: "100% molecular purity. No synthetic fragrances, no hidden preservatives, no shortcuts. Just truth.",
    descMr: "१००% आण्विक शुद्धता. कोणताही कृत्रिम सुगंध नाही, कोणतीही तडजोड नाही.",
  },
];

const AboutPage = () => {
  const { t, language } = useLanguage();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] selection:bg-amber-100 overflow-x-hidden">
      
      {/* 1. EDITORIAL HERO */}
      <section className="relative h-[70vh] flex items-center justify-center pt-20">
        {/* Background Text Decor */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h2 className="text-[25vw] font-black text-zinc-50 tracking-tighter uppercase leading-none">
            Essence
          </h2>
        </motion.div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] tracking-[0.4em] font-black uppercase">
              <Sparkles className="h-3 w-3" />
              {t("The Go Arpita Ethos", "गो अर्पिता धोरण")}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.85]">
              Ancient Wisdom <br />
              <span className="italic font-serif text-amber-700">for Modern Life.</span>
            </h1>

            <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {t(
                "We don't just sell products; we curate a lifestyle of purity. By blending Vedic traditions with meticulous hand-craftsmanship, we bring the healing touch of the Desi cow to your sanctuary.",
                "आम्ही आयुर्वेदाचे प्राचीन ज्ञान आधुनिक घरांमध्ये आणण्याच्या मिशनवर आहोत."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE VALUES: The Premium Bento Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-12 rounded-[40px] bg-white border border-zinc-50 hover:border-amber-200 hover:shadow-[0_30px_60px_rgba(0,0,0,0.03)] transition-all duration-700"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="h-16 w-16 rounded-[24px] bg-zinc-50 flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-colors duration-500">
                  <v.icon className="h-7 w-7 text-zinc-400 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-amber-800 transition-colors">
                    {language === "en" ? v.title : v.titleMr}
                  </h3>
                  <p className="text-zinc-500 font-light leading-relaxed">
                    {language === "en" ? v.desc : v.descMr}
                  </p>
                </div>
              </div>
              {/* Subtle Numbering */}
              <span className="absolute top-8 right-12 text-4xl font-serif italic text-zinc-50 group-hover:text-amber-50 transition-colors">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. THE POWER OF PANCHAGAVYA: Immersive Visuals */}
      <section className="py-32 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-light tracking-tighter">
                The Sacred <span className="italic font-serif text-amber-500">Panchagavya</span> Synergy.
              </h2>
              <p className="text-zinc-400 font-light text-lg">
                {t(
                  "Five sacred elements. One divine balance.",
                  "पाच पवित्र घटक. एक दैवी समतोल."
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-end">
              {[
                { icon: Droplets, name: "Milk", nameMr: "दूध", label: "Nourish" },
                { icon: Beaker, name: "Curd", nameMr: "दही", label: "Balance" },
                { icon: Zap, name: "Ghee", nameMr: "तूप", label: "Restore" },
                { icon: Sun, name: "Gomutra", nameMr: "गोमूत्र", label: "Cleanse" },
                { icon: Leaf, name: "Dung", nameMr: "शेण", label: "Shield" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4 group"
                >
                  <div className="h-px w-full bg-zinc-800 group-hover:bg-amber-500 transition-colors duration-700" />
                  <item.icon className="h-8 w-8 text-amber-500/40 mx-auto group-hover:text-amber-500 group-hover:scale-110 transition-all duration-500" />
                  <div>
                    <p className="text-[10px] tracking-[0.2em] font-black text-zinc-500 uppercase mb-1">{item.label}</p>
                    <span className="text-xs font-bold uppercase tracking-widest block">
                      {language === "en" ? item.name : item.nameMr}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLOSING MANIFESTO (CTA) */}
      <section className="py-40 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="h-20 w-px bg-zinc-100 mx-auto" />
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter italic font-serif">
            {t("Experience the Alchemy of Nature.", "निसर्गाची किमया अनुभवा.")}
          </h2>
          
          <div className="pt-4">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-4 px-12 py-5 bg-zinc-900 text-white rounded-full font-bold hover:bg-amber-700 transition-all hover:gap-6 group shadow-2xl"
            >
              {t("Shop Our Apothecary", "संग्रह पहा")}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex justify-center gap-12 pt-12">
            {[
              { label: "Lab Tested", icon: Award },
              { label: "Cruelty Free", icon: Heart },
              { icon: Globe, label: "Global Shipping" }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <f.icon className="h-4 w-4 text-zinc-300" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;