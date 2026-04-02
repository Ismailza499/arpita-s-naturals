import { Link } from "react-router-dom";
import { Plus, Star, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, items, updateQuantity } = useCart();
  const { language } = useLanguage();
  const cartItem = items.find((i) => i.product.id === product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="group bg-card rounded-2xl border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-lg">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {language === "en" ? product.name : product.nameMarathi}
          </h3>
        </Link>
        {product.weight && (
          <span className="text-[11px] text-muted-foreground mt-1">{product.weight}</span>
        )}
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-border'}`} />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price + Add */}
        <div className="flex items-end justify-between mt-auto pt-3">
          <div>
            <span className="text-base font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-muted-foreground line-through ml-1.5">₹{product.originalPrice}</span>
            )}
          </div>

          {cartItem ? (
            <div className="flex items-center gap-0.5 bg-primary rounded-xl overflow-hidden">
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                className="px-2.5 py-2 text-primary-foreground font-bold text-sm hover:bg-herb-dark transition-colors"
              >
                −
              </button>
              <span className="px-2 text-primary-foreground font-semibold text-sm min-w-[20px] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                className="px-2.5 py-2 text-primary-foreground font-bold text-sm hover:bg-herb-dark transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-primary text-primary font-semibold text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
