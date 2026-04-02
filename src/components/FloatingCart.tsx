import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const FloatingCart = () => {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:left-auto md:right-6 md:translate-x-0 z-40 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-3 hover:opacity-95 transition-all animate-slide-up"
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -top-2 -right-2 h-4 w-4 bg-accent text-accent-foreground rounded-full text-[10px] flex items-center justify-center font-bold">
          {totalItems}
        </span>
      </div>
      <span className="font-semibold text-sm">{totalItems} item{totalItems > 1 ? "s" : ""}</span>
      <span className="border-l border-primary-foreground/30 pl-3 font-bold">₹{totalPrice}</span>
    </button>
  );
};

export default FloatingCart;
