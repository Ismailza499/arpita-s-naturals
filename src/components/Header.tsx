import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, Globe, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", labelEn: "Home", labelMr: "मुख्यपृष्ठ" },
  { to: "/products", labelEn: "The Collection", labelMr: "संग्रह" },
  { to: "/our-story", labelEn: "Heritage", labelMr: "वारसा" },
  { to: "/blog", labelEn: "Journal", labelMr: "जर्नल" },
  { to: "/about", labelEn: "About", labelMr: "बद्दल" },
  { to: "/contact", labelEn: "Contact", labelMr: "संपर्क" }, // Added the Concierge link

];

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { language, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Optimized Search Logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.nameMarathi && p.nameMarathi.includes(searchQuery))
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const closeAll = () => {
    setIsSearchOpen(false);
    setShowSidebar(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full">
        {/* Premium Glass Layer */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl border-b border-amber-100/50" />

        <div className="container relative mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            
            {/* 1. LOGO */}
            <Link to="/" className="relative z-10">
              <motion.img 
                  whileHover={{ scale: 2 }}
                  src={logo} 
                  alt="Logo" 
                  className="h-20 md:h-20 w-auto" 
              />
            </Link>

            {/* 2. DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "text-[12px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 relative group",
                    location.pathname === link.to ? "text-amber-700" : "text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  {language === "en" ? link.labelEn : link.labelMr}
                  <span className={cn(
                      "absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-600 transition-all duration-500 group-hover:w-full",
                      location.pathname === link.to && "w-full"
                  )} />
                </Link>
              ))}
            </nav>

            {/* 3. UTILITIES */}
            <div className="flex items-center gap-5">
              {/* Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-zinc-500 hover:text-amber-700 transition-colors"
              >
                <Search className="h-5 w-5 stroke-[1.5px]" />
              </button>

              {/* Lang Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "mr" : "en")}
                className="hidden sm:block text-[10px] tracking-widest font-black px-3 py-1 rounded-full border border-zinc-200 text-zinc-600 hover:border-amber-400 hover:text-amber-700 transition-all"
              >
                {language === "en" ? "मराठी" : "ENG"}
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 group"
              >
                <ShoppingBag className="h-6 w-6 text-zinc-800 stroke-[1.5px] group-hover:text-amber-700 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-amber-600 text-white text-[9px] flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Menu Toggle */}
              <button
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-2 text-zinc-900"
              >
                <Menu className="h-6 w-6 stroke-[1.5px]" />
              </button>
            </div>
          </div>
        </div>

        {/* --- PREMIUM SEARCH OVERLAY --- */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-0 bg-white/95 backdrop-blur-3xl shadow-2xl z-[110] p-6 md:p-12 border-b border-amber-100"
            >
              <div className="container mx-auto max-w-3xl relative">
                  <div className="flex items-center border-b border-zinc-100 pb-4">
                    <Search className="h-6 w-6 text-zinc-300 mr-4" />
                    <input 
                        autoFocus
                        value={searchQuery}
                        placeholder="Search the collection..."
                        className="w-full text-2xl md:text-4xl font-light tracking-tight border-none focus:ring-0 placeholder:text-zinc-200 text-zinc-800 bg-transparent"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={closeAll} className="p-2 hover:bg-zinc-50 rounded-full">
                        <X className="h-6 w-6 text-zinc-400" />
                    </button>
                  </div>
                  
                  {suggestions.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                          {suggestions.map(p => (
                              <div 
                                key={p.id} 
                                onClick={() => {navigate(`/product/${p.id}`); closeAll();}} 
                                className="flex items-center gap-4 p-3 hover:bg-amber-50/50 rounded-2xl cursor-pointer transition-all group"
                              >
                                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-zinc-100">
                                    <img src={p.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                  </div>
                                  <div className="flex-1">
                                      <h4 className="text-sm font-semibold text-zinc-800 group-hover:text-amber-800 transition-colors">
                                        {language === "en" ? p.name : p.nameMarathi}
                                      </h4>
                                      <p className="text-xs text-amber-600 font-medium">₹{p.price}</p>
                                  </div>
                                  <ArrowRight className="h-4 w-4 text-amber-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                              </div>
                          ))}
                      </motion.div>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- PREMIUM SIDEBAR --- */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
              className="fixed inset-0 bg-zinc-900/20 backdrop-blur-md z-[150]"
            />
            
            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[320px] bg-white z-[160] shadow-[-20px_0_50px_rgba(0,0,0,0.05)] flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-zinc-50">
                <Sparkles className="text-amber-500 h-5 w-5" />
                <button 
                  onClick={closeAll}
                  className="p-3 rounded-full bg-zinc-50 hover:bg-amber-50 transition-colors"
                >
                  <X className="h-5 w-5 text-zinc-400" />
                </button>
              </div>

              <nav className="p-8 flex flex-col gap-6 flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold mb-2">Navigation</p>
                {navLinks.map((link, i) => (
                  <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                  >
                    <Link
                        to={link.to}
                        onClick={closeAll}
                        className={cn(
                          "text-2xl font-light tracking-tight transition-colors flex items-center justify-between group",
                          location.pathname === link.to ? "text-amber-700" : "text-zinc-500 hover:text-zinc-900"
                        )}
                    >
                        {language === "en" ? link.labelEn : link.labelMr}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="p-8 mt-auto border-t border-zinc-50 bg-zinc-50/50">
                <button 
                  onClick={() => {setLanguage(language === 'en' ? 'mr' : 'en');}}
                  className="w-full py-4 rounded-xl border border-zinc-200 bg-white text-xs font-bold tracking-widest text-zinc-600 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  {language === 'en' ? 'SWITCH TO MARATHI' : 'ENGLISH निवडा'}
                </button>
                <div className="mt-6 flex justify-center gap-6 text-[11px] uppercase tracking-widest text-zinc-400">
                  <span className="hover:text-amber-700 cursor-pointer">Instagram</span>
                  <span className="hover:text-amber-700 cursor-pointer">Facebook</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;