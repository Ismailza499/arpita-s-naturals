import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Plus, Minus, Check, MessageCircle } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items, updateQuantity } = useCart();
  const { t, language } = useLanguage();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">{t("Product not found", "उत्पादन सापडले नाही")}</p>
        <Link to="/products" className="text-primary font-medium mt-2 inline-block">{t("← Back to products", "← उत्पादनांकडे परत")}</Link>
      </div>
    );
  }

  const cartItem = items.find((i) => i.product.id === product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back */}
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="h-4 w-4" /> {t("Back", "मागे")}
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden bg-secondary aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" width={512} height={512} />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-accent text-accent-foreground font-bold px-3 py-1 rounded-lg text-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-herb-light text-primary">{product.category}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">{language === "en" ? product.name : product.nameMarathi}</h1>
          {language === "en" && <p className="text-muted-foreground font-devanagari mt-0.5">{product.nameMarathi}</p>}

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} {t("reviews", "पुनरावलोकने")})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                <span className="text-sm font-semibold text-accent">Save ₹{product.originalPrice - product.price}</span>
              </>
            )}
          </div>
          {product.weight && <p className="text-sm text-muted-foreground mt-1">{product.weight}</p>}

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {language === "en" ? product.description : product.descriptionMarathi}
          </p>

          {/* USPs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.usps.map((usp) => (
              <span key={usp} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-herb-light text-primary text-xs font-medium">
                <Check className="h-3 w-3" /> {usp}
              </span>
            ))}
          </div>

          {/* Add to cart */}
          <div className="flex gap-3 mt-6">
            {cartItem ? (
              <div className="flex items-center gap-0 bg-primary rounded-xl overflow-hidden">
                <button onClick={() => updateQuantity(product.id, cartItem.quantity - 1)} className="px-4 py-3 text-primary-foreground font-bold hover:bg-herb-dark transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 text-primary-foreground font-bold text-lg">{cartItem.quantity}</span>
                <button onClick={() => updateQuantity(product.id, cartItem.quantity + 1)} className="px-4 py-3 text-primary-foreground font-bold hover:bg-herb-dark transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                {t("Add to Cart", "कार्टमध्ये जोडा")} — ₹{product.price}
              </button>
            )}
            <a
              href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi! I'm interested in ${product.name} (₹${product.price})`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-leaf text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          {/* Ingredients */}
          <div className="mt-8">
            <h3 className="font-bold mb-3">{t("Key Ingredients", "मुख्य घटक")}</h3>
            <div className="space-y-2">
              {product.ingredients.map((ing) => (
                <div key={ing.name} className="flex items-start gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <span className="font-medium">{ing.name}</span>
                    <span className="text-muted-foreground"> — {ing.benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6">
            <h3 className="font-bold mb-3">{t("Benefits", "फायदे")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(language === "en" ? product.benefits : product.benefitsMarathi).map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">{t("You May Also Like", "तुम्हाला हे देखील आवडू शकते")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
