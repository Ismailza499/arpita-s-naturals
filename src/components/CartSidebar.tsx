import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const CartSidebar = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { t, language } = useLanguage();

  // Premium Shipping Logic
  const freeShippingThreshold = 500;
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);
  const remaining = freeShippingThreshold - totalPrice;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 1. LUXURY BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-md z-[100]"
          />

          {/* 2. PREMIUM SIDEBAR */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[110] shadow-[-20px_0_80px_rgba(0,0,0,0.1)] flex flex-col"
          >
            {/* Header: Minimal & Clean */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-zinc-50">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.3em] font-black text-amber-700 uppercase mb-1">
                  {t("Your Selection", "तुमची निवड")}
                </span>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-light tracking-tighter">{t("Shopping Bag", "खरेदी पिशवी")}</h2>
                  <span className="text-zinc-300 font-serif italic">({totalItems})</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="h-12 w-12 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-amber-50 transition-colors"
              >
                <X className="h-5 w-5 text-zinc-400" />
              </button>
            </div>

            {/* Shipping Progress Tracker */}
            {totalItems > 0 && (
              <div className="px-8 py-6 bg-zinc-50/50 border-b border-zinc-50">
                <div className="flex justify-between items-center mb-3 text-[10px] font-black tracking-widest uppercase">
                  <span className={cn(progress === 100 ? "text-emerald-600" : "text-zinc-500")}>
                    {progress === 100 ? t("Free Shipping Unlocked", "मोफत डिलिव्हरी उपलब्ध") : t("Free Shipping Progress", "मोफत डिलिव्हरी कडे")}
                  </span>
                  {progress < 100 && <span className="text-amber-700">₹{remaining} {t("to go", "उर्वरित")}</span>}
                </div>
                <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-amber-600"
                  />
                </div>
              </div>
            )}

            {/* 3. ITEM LIST: Staggered Entrance */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="h-20 w-20 rounded-full bg-zinc-50 flex items-center justify-center">
                    <ShoppingBag size={32} strokeWidth={1} className="text-zinc-300" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-tight italic font-serif text-zinc-400">{t("Your bag is empty", "तुमची कार्ट रिकामी आहे")}</h3>
                    <p className="text-xs text-zinc-400 tracking-widest uppercase">{t("Start your collection", "खरेदी सुरू करा")}</p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-10 py-4 bg-zinc-900 text-white rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-amber-700 transition-all"
                  >
                    {t("Browse The Collection", "संग्रह पहा")}
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item, i) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-6 group"
                    >
                      <div className="h-24 w-24 rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-zinc-800 leading-tight mb-1">{item.product.name}</h4>
                            <p className="text-[10px] tracking-widest font-black text-zinc-300 uppercase">{item.product.weight}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-zinc-200 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-amber-700">₹{item.product.price * item.quantity}</span>
                          
                          <div className="flex items-center bg-zinc-50 rounded-full p-1 border border-zinc-100">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-400">
                              <Minus size={12} strokeWidth={3} />
                            </button>
                            <span className="text-xs font-black w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-400">
                              <Plus size={12} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* 4. FLOATING FOOTER */}
            {items.length > 0 && (
              <div className="p-8 space-y-6 bg-white border-t border-zinc-100">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] tracking-[0.3em] font-black text-zinc-400 uppercase">{t("Subtotal", "उपएकूण")}</span>
                    <span className="text-3xl font-light tracking-tighter">₹{totalPrice}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 italic font-serif">{t("Shipping and taxes calculated at checkout", "शिपिंग आणि टॅक्स चेकआउट वेळी मोजले जातील")}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="h-16 bg-zinc-900 text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-amber-700 transition-all shadow-xl shadow-zinc-900/10"
                  >
                    {t("Proceed to Checkout", "चेकआउट करा")} <ArrowRight size={16} />
                  </Link>
                  
                  <a
                    href={`https://wa.me/919082362432?text=${encodeURIComponent(`Greetings, I'd like to finalize my selection:\n${items.map(i => `• ${i.product.name} (x${i.quantity})`).join("\n")}\n\nTotal Investment: ₹${totalPrice}`)}`}
                    target="_blank"
                    className="h-16 bg-emerald-50 text-emerald-700 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-emerald-100 transition-all"
                  >
                    <MessageCircle size={18} />
                    {t("Finalize on WhatsApp", "WhatsApp वर पूर्ण करा")}
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;