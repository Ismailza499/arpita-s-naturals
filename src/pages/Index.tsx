import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Shield, Leaf, Hand, Droplets, ArrowRight, Star, ChevronRight, Sparkles, 
  Heart, Truck, BadgeCheck, Quote, Award, Users, Clock, ShieldCheck, 
  Ban, Factory, Gem, TreePine, PlayCircle, Volume2, VolumeX, ArrowDown
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PanchagavyaPromise from "@/components/PanchagavyaPromise";
import BestSellers from "@/components/BestSellers";

// Asset placeholders
import heroBg from "@/assets/hero-bg.jpg";
import sacredCowImg from "@/assets/sacred-cow.jpg";
import handmadeImg from "@/assets/handmade-process.jpg";
import cowProductsImg from "@/assets/cow-products.jpg";

// Curated Hero Images for the slideshow
const heroImages = [
  heroBg, // Original Hero
  sacredCowImg, // Second view
  cowProductsImg // Third view
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const HomePage = () => {
  const { t, language } = useLanguage();
  const { scrollY } = useScroll();
  const yScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Slideshow State
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const trustBadges = [
    { icon: Leaf, label: "100% Natural", labelMr: "१००% नैसर्गिक" },
    { icon: Hand, label: "Handmade", labelMr: "हस्तनिर्मित" },
    { icon: Droplets, label: "Desi Cow Based", labelMr: "देशी गाय आधारित" },
    { icon: Shield, label: "Chemical Free", labelMr: "रसायनमुक्त" },
  ];

  const reviews = [
    { name: "Priya Sharma", location: "Mumbai", text: "The Panchagavya soap transformed my skin! So gentle and natural.", textMr: "पंचगव्य साबणाने माझी त्वचा बदलली!", rating: 5, verified: true, product: "Panchagavya Soap" },
    { name: "Rahul Mhatre", location: "Pune", text: "Nasya drops helped my chronic sinus problem. Ayurvedic magic!", textMr: "नस्य ड्रॉप्सने माझ्या सायनसच्या जुन्या समस्येला मदत केली.", rating: 5, verified: true, product: "Panchagavya Nasya" },
    { name: "Sneha Kulkarni", location: "Nagpur", text: "Love the handmade quality. My whole family uses Go Arpita now!", textMr: "हस्तनिर्मित गुणवत्ता आवडते. शुद्धता जाणवते!", rating: 5, verified: true, product: "Cow Ghee Cream" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] overflow-x-hidden selection:bg-amber-100">
      
      {/* 1. CINEMATIC HERO (Image Slideshow Refactor) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#0a0a0a]">
        
        {/* The Animated Image Stack */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImg}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={heroImages[currentImg]} 
                alt="Ayurvedic Background" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Luxury Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#FDFCFB]" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            {/* Staggered Content Reveal */}
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] tracking-[0.3em] uppercase font-bold mb-8"
            >
              <Sparkles className="h-3 w-3 text-amber-400" /> {t("The Essence of Ayurveda", "आयुर्वेदाचा सार")}
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-6xl md:text-[100px] font-light tracking-tighter text-white leading-[0.85] mb-8"
            >
              Go Health, <br /> <span className="italic font-serif text-amber-200">Go Wealth.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-white/70 text-lg md:text-xl font-light max-w-lg mb-12 leading-relaxed"
            >
              {t("Pure, handmade Ayurvedic treasures crafted from the sacred Desi cow. Nature's healing, elevated.", "शुद्ध, हस्तनिर्मित आयुर्वेदिक उत्पादने देशी गाय-आधारित घटकांपासून बनवलेली.")}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <Link to="/products" className="px-10 py-5 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all flex items-center gap-3 shadow-2xl shadow-amber-900/20 active:scale-95">
                {t("Shop Now", "आता खरेदी करा")} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Slideshow Progress Indicators */}
        <div className="absolute bottom-10 right-10 flex gap-2 z-20">
          {heroImages.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${i === currentImg ? 'w-8 bg-amber-400' : 'w-4 bg-white/20'}`} 
            />
          ))}
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-widest uppercase font-bold">Discover</span>
            <ArrowDown size={14} />
        </motion.div>
      </section>

      {/* 2. TRUST BADGES */}
      <section className="py-12 border-b bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustBadges.map((badge, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-amber-700">
                  <badge.icon size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-black text-zinc-500">
                  {language === "en" ? badge.label : badge.labelMr}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">The <span className="italic font-serif">Apothecary</span></h2>
          <p className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">{t("Browse by Category", "श्रेणीनुसार निवडा")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
          {categories.filter(c => c.id !== "all").map((cat, i) => (
            <motion.div key={cat.id} {...fadeInUp} transition={{ delay: i * 0.1 }} className="group text-center">
              <Link to={`/products?category=${cat.id}`}>
                <div className="relative mb-6 mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border border-zinc-100 p-2 group-hover:border-amber-300 transition-all duration-700">
                  <div className="w-full h-full rounded-full bg-zinc-50 overflow-hidden">
                    <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-black group-hover:text-amber-700 transition-colors">
                  {language === "en" ? cat.name : cat.nameMarathi}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SACRED COW */}
      <section className="bg-zinc-900 text-white py-32 overflow-hidden relative">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeInUp} className="relative group">
            <div className="absolute -inset-4 border border-amber-600/30 rounded-[40px] group-hover:inset-0 transition-all duration-700" />
            <img src={sacredCowImg} className="rounded-[30px] w-full aspect-[4/5] object-cover shadow-2xl relative z-10" alt="" />
            <div className="absolute -bottom-10 -right-10 bg-amber-600 p-10 rounded-[30px] hidden md:block z-20">
              <Quote size={32} className="text-amber-200 mb-4" />
              <p className="text-lg font-serif italic leading-relaxed">"The cow is the mother <br /> of all civilization."</p>
            </div>
          </motion.div>
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px]">Sacred Heritage</span>
              <h2 className="text-5xl md:text-6xl font-light tracking-tighter">Why the <span className="italic font-serif">Desi Cow?</span></h2>
            </div>
            <div className="grid gap-6">
              {[
                { icon: Droplets, title: t("Cow Milk & Ghee", "गाईचे दूध आणि तूप"), desc: "A2 proteins mirror human skin lipids." },
                { icon: Leaf, title: t("Gomutra (Cow Urine)", "गोमूत्र"), desc: "Powerful natural detoxifier used for millennia." },
                { icon: TreePine, title: t("Cow Dung", "गोमय (शेण)"), desc: "Natural antibacterial base for our soaps." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <item.icon size={24} className="text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HANDMADE */}
      <section className="py-32 bg-[#FCFAF7]">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 space-y-10">
            <div>
              <span className="text-amber-700 font-black tracking-[0.3em] uppercase text-[10px] block mb-4">{t("100% Handcrafted", "१००% हस्तनिर्मित")}</span>
              <h2 className="text-5xl font-light tracking-tighter leading-tight">Made by <span className="italic font-serif text-amber-800">Hands,</span> <br /> Not Machines.</h2>
            </div>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">
              {t("Every Go Arpita product is slow-made in small batches by skilled artisans. We preserve the vibration of ancient Ayurvedic wisdom through human touch.", "प्रत्येक Go Arpita उत्पादन पिढ्यानपिढ्या चालत आलेल्या पारंपरिक पद्धतींनी बनवले जाते.")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Ban, label: t("Zero Machines", "शून्य यंत्रे") },
                { icon: Heart, label: t("Made with Love", "प्रेमाने हस्तनिर्मित") },
                { icon: Factory, label: t("No Chemicals", "रसायने नाहीत") },
                { icon: Leaf, label: t("Eco-Friendly", "पर्यावरण-अनुकूल") }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-zinc-100">
                  <item.icon size={16} className="text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img src={handmadeImg} className="rounded-[40px] shadow-2xl w-full aspect-square object-cover" alt="" />
          </div>
        </div>
      </section>

      <PanchagavyaPromise />
      <BestSellers />

      {/* 7. ALL PRODUCTS */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex items-end justify-between mb-16 border-b border-zinc-100 pb-8">
          <div>
            <h2 className="text-4xl font-light tracking-tight">{t("The Collection", "सर्व उत्पादने")}</h2>
            <p className="text-xs text-zinc-400 mt-2 tracking-widest uppercase">{t("Explore our full apothecary", "आमचा संपूर्ण संग्रह पहा")}</p>
          </div>
          <Link to="/products" className="text-amber-700 font-bold flex items-center gap-2 group">
            {t("View All", "सर्व पहा")} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, i) => (
            <motion.div key={product.id} {...fadeInUp} transition={{ delay: i * 0.05 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. TRUST STATS */}
      <section className="py-24 bg-zinc-900 text-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: Users, val: "10K+", label: "Pure Souls Served" },
            { icon: Award, val: "100%", label: "Natural Purity" },
            { icon: Clock, val: "5+", label: "Years of Trust" },
            { icon: ShieldCheck, val: "0%", label: "Chemicals Used" }
          ].map((stat, i) => (
            <div key={i}>
              <stat.icon size={24} className="mx-auto mb-4 text-amber-500 opacity-50" />
              <div className="text-4xl font-light mb-2">{stat.val}</div>
              <div className="text-[10px] tracking-[0.2em] font-bold text-zinc-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. REVIEWS */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light tracking-tight italic font-serif text-amber-900">{t("The Voice of Trust", "आनंदी ग्राहक")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {reviews.map((rev, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.15 }} className="relative p-10 rounded-[40px] bg-zinc-50 hover:bg-amber-50/30 transition-all group">
                <Quote size={40} className="absolute top-8 left-8 text-amber-700/5 group-hover:text-amber-700/10 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-zinc-600 font-serif italic text-lg leading-relaxed mb-8 relative z-10">"{language === "en" ? rev.text : rev.textMr}"</p>
                <div className="flex items-center gap-4 border-t border-zinc-200 pt-6">
                  <div className="h-10 w-10 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-xs">{rev.name[0]}</div>
                  <div>
                    <span className="block text-sm font-bold">{rev.name}</span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{rev.location}</span>
                  </div>
                  {rev.verified && <BadgeCheck size={16} className="ml-auto text-amber-600" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE US */}
      <section className="py-32 container mx-auto px-6 border-t border-zinc-100">
        <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: BadgeCheck, title: t("Certified Purity", "प्रमाणित शुद्धता"), desc: "Every product tested for quality." },
              { icon: Truck, title: t("Fast Delivery", "जलद डिलिव्हरी"), desc: "Free shipping on orders above ₹500." },
              { icon: Heart, title: t("Ethical Source", "नैतिक स्त्रोत"), desc: "Supporting local Gaushalas." }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="h-16 w-16 rounded-3xl bg-zinc-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                  <item.icon size={28} strokeWidth={1} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">{item.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
              </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;