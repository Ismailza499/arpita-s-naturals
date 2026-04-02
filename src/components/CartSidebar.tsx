import { X, ShoppingBag, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const { t } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-lg">{t("Your Cart", "तुमची कार्ट")}</h2>
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-secondary transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-medium">{t("Your cart is empty", "तुमची कार्ट रिकामी आहे")}</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                {t("Start Shopping", "खरेदी सुरू करा")}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 p-3 bg-secondary/50 rounded-lg">
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.product.weight}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm">₹{item.product.price * item.quantity}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded bg-card border hover:bg-secondary transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded bg-card border hover:bg-secondary transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-1 rounded text-destructive hover:bg-destructive/10 transition-colors ml-1">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("Subtotal", "उपएकूण")}</span>
              <span className="font-bold text-lg">₹{totalPrice}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t("Free delivery on orders above ₹500", "₹500 वरील ऑर्डरवर मोफत डिलिव्हरी")}</p>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-lg text-center text-sm hover:opacity-90 transition-opacity"
              >
                {t("Checkout", "चेकआउट")}
              </Link>
              <a
                href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi! I'd like to order:\n${items.map(i => `${i.product.name} x${i.quantity}`).join("\n")}\nTotal: ₹${totalPrice}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-leaf text-primary-foreground font-semibold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
