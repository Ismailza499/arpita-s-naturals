import { Link } from "react-router-dom";
import { Shield, Leaf, Hand, Droplets, ArrowRight, Star, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";

const trustBadges = [
  { icon: Leaf, label: "100% Natural", labelMr: "१००% नैसर्गिक" },
  { icon: Hand, label: "Handmade", labelMr: "हस्तनिर्मित" },
  { icon: Droplets, label: "Desi Cow Based", labelMr: "देशी गाय आधारित" },
  { icon: Shield, label: "Chemical Free", labelMr: "रसायनमुक्त" },
];

const HomePage = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Ayurvedic products" className="w-full h-full object-cover" width={1920} height={800} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-primary/20 text-herb-light rounded-full text-xs font-medium mb-4 backdrop-blur-sm border border-primary/30">
              🌿 {t("100% Natural Ayurvedic Products", "१००% नैसर्गिक आयुर्वेदिक उत्पादने")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-background leading-tight">
              Go Health{" "}
              <span className="text-accent">Go Wealth</span>
            </h1>
            <p className="mt-4 text-background/80 text-base md:text-lg leading-relaxed max-w-md">
              {t(
                "Pure, handmade Ayurvedic products crafted from Desi cow-based ingredients. Nature's healing, delivered to your doorstep.",
                "शुद्ध, हस्तनिर्मित आयुर्वेदिक उत्पादने देशी गाय-आधारित घटकांपासून बनवलेली. निसर्गाची उपचार शक्ती, तुमच्या दारात."
              )}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                {t("Shop Now", "आता खरेदी करा")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-background/10 text-background px-6 py-3 rounded-full font-semibold backdrop-blur-sm border border-background/20 hover:bg-background/20 transition-colors"
              >
                {t("Our Story", "आमची कथा")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="h-10 w-10 rounded-full bg-herb-light flex items-center justify-center shrink-0">
                  <badge.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold">
                  {language === "en" ? badge.label : badge.labelMr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">{t("Shop by Category", "श्रेणीनुसार खरेदी करा")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.filter(c => c.id !== "all").map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group flex flex-col items-center gap-2 p-5 rounded-xl bg-card border hover:border-primary hover:shadow-product transition-all"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-semibold text-sm text-center group-hover:text-primary transition-colors">
                {language === "en" ? cat.name : cat.nameMarathi}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t("Featured Products", "वैशिष्ट्यपूर्ण उत्पादने")}</h2>
          <Link to="/products" className="text-primary font-medium text-sm flex items-center gap-1 hover:underline">
            {t("View All", "सर्व पहा")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-card border-y">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">{t("What Our Customers Say", "आमचे ग्राहक काय म्हणतात")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Priya S.", text: "The Panchagavya soap transformed my skin! So gentle and natural.", textMr: "पंचगव्य साबणाने माझी त्वचा बदलली! खूप सौम्य आणि नैसर्गिक.", rating: 5 },
              { name: "Rahul M.", text: "Nasya drops helped my sinus problem. Truly Ayurvedic magic.", textMr: "नस्य ड्रॉप्सने माझ्या सायनसच्या समस्येला मदत केली.", rating: 5 },
              { name: "Sneha K.", text: "Love the handmade quality. You can feel the purity!", textMr: "हस्तनिर्मित गुणवत्ता आवडते. शुद्धता जाणवते!", rating: 4 },
            ].map((review) => (
              <div key={review.name} className="p-5 rounded-xl bg-background border">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{language === "en" ? review.text : review.textMr}"
                </p>
                <p className="mt-3 font-semibold text-sm">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
