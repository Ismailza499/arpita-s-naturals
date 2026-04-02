import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, SortDesc, ChevronDown, Check, X, 
  LayoutGrid, SlidersHorizontal, Sparkles 
} from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const ProductsPage = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  
  const [sortBy, setSortBy] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter & Sort Logic
  const categoryMatch = (product: typeof products[0]) => {
    if (activeCategory === "all") return true;
    return product.category.toLowerCase().replace(/\s+/g, "-") === activeCategory;
  };

  let filtered = products.filter(categoryMatch);
  if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const sortOptions = [
    { value: "default", label: t("Curated", "निवडलेले") },
    { value: "price-low", label: t("Price: Low to High", "किंमत: कमी ते जास्त") },
    { value: "price-high", label: t("Price: High to Low", "किंमत: जास्त ते कमी") },
    { value: "rating", label: t("Highest Rated", "सर्वोत्तम रेटेड") },
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF7] pb-20">
      
      {/* 1. MINIMALIST PAGE HEADER */}
      <section className="pt-16 pb-12 border-b border-zinc-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-[10px] tracking-[0.4em] font-black text-amber-700 uppercase">
              {t("The Apothecary", "औषधालय")}
            </span>
            <h1 className="text-5xl md:text-6xl font-light tracking-tighter">
              {activeCategory === "all" ? t("Full Collection", "संपूर्ण संग्रह") : 
               categories.find(c => c.id === activeCategory)?.name}
            </h1>
            <p className="text-zinc-400 font-serif italic text-lg">
              {filtered.length} {t("Exquisite Products Found", "उत्पादने सापडली")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. PREMIUM CATEGORY BAR (Floating & Glass) */}
      <div className="sticky top-24 z-40 py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="flex gap-2 p-1.5 bg-white/80 backdrop-blur-xl rounded-full border border-zinc-200 shadow-sm overflow-x-auto no-scrollbar max-w-full">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSearchParams(cat.id === "all" ? {} : { category: cat.id })}
                    className={cn(
                      "relative shrink-0 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-500",
                      isActive ? "text-white" : "text-zinc-500 hover:text-zinc-900"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-zinc-900 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      {language === "en" ? cat.name : cat.nameMarathi}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        
        {/* 3. TOOLBAR (Filter & Sort) */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-zinc-100 pb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-amber-700 transition-colors group"
          >
            <SlidersHorizontal className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            {t("Refine Selection", "फिल्टर करा")}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800"
            >
              <span className="text-zinc-400">{t("Sort By:", "क्रमवारी:")}</span>
              {sortOptions.find(o => o.value === sortBy)?.label}
              <ChevronDown className={cn("h-4 w-4 transition-transform", isSortOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-50 p-2"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all",
                        sortBy === opt.value ? "bg-amber-50 text-amber-900" : "hover:bg-zinc-50 text-zinc-500"
                      )}
                    >
                      {opt.label}
                      {sortBy === opt.value && <Check className="h-3 w-3" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. FILTER DRAWER (Premium Animated) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white rounded-[32px] p-8 border border-zinc-100 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Ethos</p>
                  <div className="space-y-3">
                    {["Chemical-free", "Handmade", "Ancient Wisdom"].map(f => (
                      <label key={f} className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-5 w-5 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-amber-400 transition-colors">
                          <div className="h-2 w-2 rounded-full bg-amber-600 opacity-0 group-hover:opacity-20" />
                        </div>
                        <span className="text-xs font-medium text-zinc-600 group-hover:text-zinc-900">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Additional filter columns can be added here */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. PRODUCT GRID (Staggered Entrance) */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="py-32 text-center space-y-4"
          >
            <div className="h-20 w-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="text-zinc-200 h-8 w-8" />
            </div>
            <h3 className="text-2xl font-light italic font-serif text-zinc-400">
              {t("A Rare Occasion...", "एक दुर्मिळ प्रसंग...")}
            </h3>
            <p className="text-zinc-400 text-sm">{t("No products match your current refinement.", "तुमच्या फिल्टरशी जुळणारी उत्पादने नाहीत.")}</p>
            <button 
              onClick={() => setSearchParams({})}
              className="text-amber-700 font-black text-[10px] uppercase tracking-widest pt-4 block mx-auto underline underline-offset-8"
            >
              {t("Reset All Filters", "सर्व फिल्टर हटवा")}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;