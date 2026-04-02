import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Upgraded Post Data for the "Journal" feel
const posts = [
  {
    id: "1",
    title: "The Alchemy of Panchagavya",
    titleMr: "पंचगव्यामागील विज्ञान",
    excerpt: "An investigation into how five sacred elements harmonize to restore the skin's natural 'Ojas' and vitality.",
    excerptMr: "पाच पवित्र घटक एकत्र कसे कार्य करतात ते जाणून घ्या.",
    date: "15 MAR",
    year: "2026",
    readTime: "05 MIN",
    category: "Sacred Science",
    image: "https://images.unsplash.com/photo-1612810806563-4cb8265db55f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "2",
    title: "Why Desi Cow Ghee is 'Liquid Gold'",
    titleMr: "देशी गाय उत्पादने का श्रेष्ठ आहेत",
    excerpt: "Beyond nutrition: Understanding the molecular superiority of A2 lipids in traditional Ayurvedic skincare.",
    excerptMr: "देशी गायीच्या तूप आणि इतर उत्पादनांचे अनन्य गुणधर्म समजून घ्या.",
    date: "08 MAR",
    year: "2026",
    readTime: "04 MIN",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1543083507-07ab60e86b24?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "3",
    title: "The Ritual of Self-Care",
    titleMr: "नैसर्गिक त्वचा निगा",
    excerpt: "From Turmeric to Sacred Ash — a guide to reclaiming your morning routine through ancient rituals.",
    excerptMr: "हळदीपासून मुलतानी मातीपर्यंत — पारंपरिक घटक तुमची त्वचा निगा कशी बदलतात.",
    date: "28 FEB",
    year: "2026",
    readTime: "06 MIN",
    category: "Rituals",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1000",
  },
];

const BlogPage = () => {
  const { t, language } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] selection:bg-amber-100 overflow-x-hidden">
      
      {/* 1. EDITORIAL JOURNAL HERO */}
      <section className="relative pt-32 pb-24 border-b border-zinc-100">
        <motion.div 
          style={{ y }}
          className="absolute top-10 right-10 opacity-[0.03] pointer-events-none select-none"
        >
          <h1 className="text-[20vw] font-black uppercase leading-none">Journal</h1>
        </motion.div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] tracking-[0.4em] font-black uppercase">
                <Sparkles size={12} />
                {t("Wisdom & Insights", "ज्ञान आणि माहिती")}
              </div>
              
              <h1 className="text-7xl md:text-9xl font-light tracking-tighter leading-[0.85]">
                The <span className="italic font-serif text-amber-700">Apothecary</span> <br /> Journal.
              </h1>

              <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-xl">
                {t(
                  "Deep dives into Ayurvedic philosophy, the science of Panchagavya, and rituals for a conscious life.",
                  "आयुर्वेदिक जीवन, नैसर्गिक त्वचा निगा आणि पंचगव्याच्या शक्तीबद्दल लेख शोधा."
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED POST (Large Asymmetrical Hero) */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 relative group cursor-pointer overflow-hidden rounded-[40px]"
          >
            <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-all duration-700 z-10" />
            <img 
              src={posts[0].image} 
              className="w-full aspect-[21/10] object-cover group-hover:scale-105 transition-transform duration-1000" 
              alt="" 
            />
            <div className="absolute top-8 left-8 z-20">
              <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black tracking-widest uppercase">
                {posts[0].category}
              </span>
            </div>
          </motion.div>

          <div className="lg:col-span-4 space-y-6">
            <div className="text-zinc-300 font-serif italic text-2xl">{posts[0].date}</div>
            <h2 className="text-4xl font-light tracking-tighter leading-tight hover:text-amber-700 transition-colors cursor-pointer">
              {language === "en" ? posts[0].title : posts[0].titleMr}
            </h2>
            <p className="text-zinc-500 font-light leading-relaxed">
              {language === "en" ? posts[0].excerpt : posts[0].excerptMr}
            </p>
            <Link 
              to={`/blog/${posts[0].id}`}
              className="inline-flex items-center gap-3 text-xs font-black tracking-[0.2em] uppercase text-amber-700 group"
            >
              Read Full Investigation <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. THE FEED (Modern Minimalist Grid) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-20 border-b border-zinc-100 pb-8">
            <h3 className="text-[10px] tracking-[0.5em] font-black text-zinc-400 uppercase">Recent Chronicles</h3>
            <div className="flex gap-4">
              <button className="h-10 w-10 rounded-full border border-zinc-100 flex items-center justify-center hover:bg-zinc-50 transition-colors"><Share2 size={14} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {posts.slice(1).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <Link to={`/blog/${post.id}`} className="block space-y-8">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-zinc-100">
                    <img 
                      src={post.image} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] font-black text-amber-700 uppercase">
                    <span>{post.date} , {post.year}</span>
                    <div className="h-px w-8 bg-amber-200" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-3xl font-light tracking-tighter leading-tight group-hover:text-amber-800 transition-colors">
                    {language === "en" ? post.title : post.titleMr}
                  </h3>
                  
                  <p className="text-zinc-500 font-light leading-relaxed line-clamp-2">
                    {language === "en" ? post.excerpt : post.excerptMr}
                  </p>

                  <div className="pt-4 flex items-center gap-3 text-[10px] font-black tracking-widest text-zinc-400 group-hover:text-zinc-900 transition-colors">
                    CONTINUE READING <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE NEWSLETTER: Boutique Style */}
      <section className="py-40 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-12"
          >
            <BookOpen className="h-10 w-10 text-amber-500 mx-auto opacity-50" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter">
              Join the <span className="italic font-serif text-amber-500">Ancient Circle.</span>
            </h2>
            <p className="text-zinc-400 font-light">
              Receive a monthly curation of Ayurvedic rituals and deep science. No spam, just wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="flex-1 bg-transparent border-b border-zinc-700 py-4 px-2 focus:border-amber-500 focus:ring-0 outline-none transition-all placeholder:text-zinc-600 font-light"
              />
              <button className="px-8 py-4 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition-all uppercase text-[10px] tracking-widest">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default BlogPage;