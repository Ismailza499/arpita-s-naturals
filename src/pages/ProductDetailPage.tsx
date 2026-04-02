import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Star, Plus, Minus, Check, MessageCircle, 
  ShieldCheck, Leaf, Sparkles, ShoppingBag, Share2, Info
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items, updateQuantity } = useCart();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"details" | "ingredients">("details");

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FCFAF7]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
          <Info className="h-12 w-12 text-zinc-300 mx-auto" />
          <h2 className="text-2xl font-serif italic text-zinc-500">{t("Product not found", "उत्पादन सापडले नाही")}</h2>
          <Link to="/products" className="text-[10px] tracking-widest font-black uppercase text-amber-700 underline underline-offset-8">
            {t("Return to Collection", "मागे फिरा")}
          </Link>
        </motion.div>
      </div>
    );
  }

  const cartItem = items.find((i) => i.product.id === product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FCFAF7] pb-32">
      
      {/* 1. MINIMALIST TOP NAV */}
      <nav className="sticky top-24 z-30 px-6 py-4 bg-white/50 backdrop-blur-xl border-b border-zinc-100 flex items-center justify-between">
        <Link to="/products" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-amber-700 transition-colors">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {t("Back", "मागे")}
        </Link>
        <div className="flex items-center gap-4">
           <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"><Share2 size={18} /></button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* 2. PRODUCT GALLERY (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-40 space-y-6">
            <motion.div 
              layoutId={`img-${product.id}`}
              className="relative aspect-square rounded-[48px] overflow-hidden bg-white shadow-2xl shadow-amber-900/5 border border-zinc-100"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-1000" 
              />
              {discount > 0 && (
                <div className="absolute top-8 left-8 bg-amber-600 text-white font-black px-4 py-2 rounded-2xl text-[10px] tracking-widest shadow-xl">
                  {discount}% OFF
                </div>
              )}
              {/* Product Badge */}
              <div className="absolute bottom-8 right-8 h-12 w-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-zinc-100 shadow-lg">
                <Leaf className="text-emerald-600 h-5 w-5" />
              </div>
            </motion.div>
          </div>

          {/* 3. PRODUCT INTEL */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full">{product.category}</span>
                <span className="h-px w-8 bg-zinc-200" />
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{product.rating}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-light tracking-tighter leading-none">
                  {language === "en" ? product.name : product.nameMarathi}
                </h1>
                <p className="text-2xl font-serif italic text-zinc-300">
                  {product.nameMarathi}
                </p>
              </div>

              {/* Price Block */}
              <div className="flex items-end gap-4 pt-4">
                <div className="space-y-1">
                   <p className="text-[10px] tracking-widest font-black text-zinc-400 uppercase">Investment</p>
                   <span className="text-4xl font-light tracking-tighter">₹{product.price}</span>
                </div>
                {product.originalPrice && (
                  <div className="pb-1.5 space-x-3">
                    <span className="text-lg text-zinc-300 line-through">₹{product.originalPrice}</span>
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                      {t("Save", "बचत")} ₹{product.originalPrice - product.price}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-lg">
                {language === "en" ? product.description : product.descriptionMarathi}
              </p>
            </motion.div>

            {/* 4. QUANTITY & ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-100">
              <div className="flex items-center justify-between bg-zinc-900 rounded-full p-2 h-16 sm:w-48 group">
                <button 
                  onClick={() => updateQuantity(product.id, (cartItem?.quantity || 1) - 1)}
                  className="h-12 w-12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <Minus size={20} />
                </button>
                <span className="text-white font-bold text-lg">{cartItem?.quantity || 0}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="h-12 w-12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className="flex-1 h-16 bg-amber-600 text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-amber-700 transition-all shadow-xl shadow-amber-900/10"
              >
                <ShoppingBag size={18} />
                {cartItem ? t("Update Cart", "कार्ट अपडेट करा") : t("Add to Collection", "संग्रहात जोडा")}
              </motion.button>
              
              <a
                href={`https://wa.me/919999999999?text=${encodeURIComponent(`Greetings, I'm interested in ${product.name}`)}`}
                target="_blank"
                className="h-16 w-16 bg-white border border-zinc-100 rounded-full flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
              >
                <MessageCircle size={24} />
              </a>
            </div>

            {/* 5. APOTHECARY DETAILS (Bento Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ingredients Card */}
              <div className="p-8 rounded-[40px] bg-white border border-zinc-50 shadow-sm space-y-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400">{t("The Composition", "मुख्य घटक")}</h3>
                <div className="space-y-4">
                  {product.ingredients.map((ing) => (
                    <div key={ing.name} className="group">
                      <p className="text-sm font-bold text-zinc-800">{ing.name}</p>
                      <p className="text-[11px] text-zinc-400 group-hover:text-amber-700 transition-colors">{ing.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Card */}
              <div className="p-8 rounded-[40px] bg-amber-900 text-white shadow-xl space-y-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-amber-500/50">{t("Results", "फायदे")}</h3>
                <div className="space-y-4">
                  {(language === "en" ? product.benefits : product.benefitsMarathi).map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-light text-zinc-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-between py-8 border-y border-zinc-100">
               <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="text-zinc-300" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Purity Certified</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <Leaf className="text-zinc-300" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">100% Organic</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <Sparkles className="text-zinc-300" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Slow-Made</span>
               </div>
            </div>
          </div>
        </div>

        {/* 6. RELATED COLLECTION */}
        {related.length > 0 && (
          <section className="mt-32">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-4xl font-light tracking-tighter italic font-serif text-zinc-800">{t("You May Also Like", "आणखी काही...")}</h2>
               <div className="h-px flex-1 mx-8 bg-zinc-100" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 7. MOBILE ACTION BAR (Floating) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 lg:hidden z-50 pointer-events-none">
         <div className="container mx-auto max-w-md pointer-events-auto">
            <div className="bg-white/80 backdrop-blur-2xl border border-white/50 p-3 rounded-[32px] shadow-2xl flex items-center gap-3">
               <div className="px-6 flex flex-col">
                  <span className="text-[10px] font-black text-zinc-400 uppercase">Price</span>
                  <span className="text-xl font-bold">₹{product.price}</span>
               </div>
               <button 
                onClick={() => addToCart(product)}
                className="flex-1 h-14 bg-zinc-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
               >
                 <ShoppingBag size={16} />
                 {t("Add", "जोडा")}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;