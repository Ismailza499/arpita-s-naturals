import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Leaf, Hand, Droplets, ArrowRight, Star, ChevronRight, Sparkles, Heart, Truck, BadgeCheck, Quote, Award, Users, Clock, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PanchagavyaPromise from "@/components/PanchagavyaPromise";
import BestSellers from "@/components/BestSellers";
import heroBg from "@/assets/hero-bg.jpg";
import categoryAll from "@/assets/category-all.png";
import categorySkincare from "@/assets/category-skincare.png";
import categoryAyurvedic from "@/assets/category-ayurvedic.png";
import categoryNatural from "@/assets/category-natural.png";

const categoryImages: Record<string, string> = {
  "all": categoryAll,
  "skin-care": categorySkincare,
  "ayurvedic-treatments": categoryAyurvedic,
  "natural-products": categoryNatural,
};

const trustBadges = [
  { icon: Leaf, label: "100% Natural", labelMr: "१००% नैसर्गिक" },
  { icon: Hand, label: "Handmade", labelMr: "हस्तनिर्मित" },
  { icon: Droplets, label: "Desi Cow Based", labelMr: "देशी गाय आधारित" },
  { icon: Shield, label: "Chemical Free", labelMr: "रसायनमुक्त" },
];

const reviews = [
  { name: "Priya Sharma", location: "Mumbai", text: "The Panchagavya soap transformed my skin! So gentle and natural. I've been using it for 3 months and the results are amazing.", textMr: "पंचगव्य साबणाने माझी त्वचा बदलली! खूप सौम्य आणि नैसर्गिक. मी ३ महिने वापरत आहे.", rating: 5, verified: true, product: "Panchagavya Soap" },
  { name: "Rahul Mhatre", location: "Pune", text: "Nasya drops helped my chronic sinus problem. After trying many medicines, this truly worked. Ayurvedic magic!", textMr: "नस्य ड्रॉप्सने माझ्या सायनसच्या जुन्या समस्येला मदत केली. खरोखर आयुर्वेदिक जादू!", rating: 5, verified: true, product: "Panchagavya Nasya" },
  { name: "Sneha Kulkarni", location: "Nagpur", text: "Love the handmade quality. You can feel the purity in every product. My whole family uses Go Arpita products now!", textMr: "हस्तनिर्मित गुणवत्ता आवडते. शुद्धता जाणवते! आता माझे संपूर्ण कुटुंब वापरते!", rating: 5, verified: true, product: "Cow Ghee Cream" },
];

const trustStats = [
  { icon: Users, value: "10,000+", label: "Happy Customers", labelMr: "आनंदी ग्राहक" },
  { icon: Award, value: "100%", label: "Natural Ingredients", labelMr: "नैसर्गिक घटक" },
  { icon: Clock, value: "5+", label: "Years of Trust", labelMr: "वर्षांचा विश्वास" },
  { icon: ShieldCheck, value: "0%", label: "Chemicals Used", labelMr: "रसायने वापरली" },
];

const HomePage = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Ayurvedic products" className="w-full h-full object-cover" width={1920} height={800} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/20" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/20 text-herb-light rounded-full text-xs font-medium mb-5 backdrop-blur-sm border border-primary/30"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("100% Natural Ayurvedic Products", "१००% नैसर्गिक आयुर्वेदिक उत्पादने")}
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold text-background leading-tight">
              Go Health{" "}
              <span className="text-accent">Go Wealth</span>
            </h1>
            <p className="mt-5 text-background/80 text-base md:text-lg leading-relaxed max-w-md">
              {t(
                "Pure, handmade Ayurvedic products crafted from Desi cow-based ingredients. Nature's healing, delivered to your doorstep.",
                "शुद्ध, हस्तनिर्मित आयुर्वेदिक उत्पादने देशी गाय-आधारित घटकांपासून बनवलेली. निसर्गाची उपचार शक्ती, तुमच्या दारात."
              )}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all hover:gap-3"
              >
                {t("Shop Now", "आता खरेदी करा")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 bg-background/10 text-background px-7 py-3.5 rounded-full font-semibold backdrop-blur-sm border border-background/20 hover:bg-background/20 transition-colors"
              >
                {t("Our Story", "आमची कथा")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <badge.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold">
                  {language === "en" ? badge.label : badge.labelMr}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category - with images */}
      <section className="container mx-auto px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-xs font-semibold text-muted-foreground mb-3 tracking-wide uppercase">
            {t("Browse", "ब्राउझ करा")}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">{t("Shop by Category", "श्रेणीनुसार खरेदी करा")}</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.filter(c => c.id !== "all").map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-20 w-20 rounded-2xl bg-secondary/50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={categoryImages[cat.id]}
                    alt={cat.name}
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                    width={64}
                    height={64}
                  />
                </div>
                <span className="font-semibold text-sm text-center group-hover:text-primary transition-colors">
                  {language === "en" ? cat.name : cat.nameMarathi}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Panchagavya Promise */}
      <PanchagavyaPromise />

      {/* Best Sellers */}
      <BestSellers />

      {/* Featured Products */}
      <section className="bg-card border-y py-14 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{t("All Products", "सर्व उत्पादने")}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t("Explore our complete collection", "आमचा संपूर्ण संग्रह पहा")}</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all">
              {t("View All", "सर्व पहा")} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-primary/5 border-y">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">
                  {language === "en" ? stat.label : stat.labelMr}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold">{t("Why Choose Go Arpita?", "Go Arpita का निवडावे?")}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: BadgeCheck, title: t("Certified Purity", "प्रमाणित शुद्धता"), desc: t("Every product tested for purity and quality. No chemicals, no shortcuts.", "प्रत्येक उत्पादन शुद्धता आणि गुणवत्तेसाठी तपासले जाते.") },
            { icon: Truck, title: t("Fast Delivery", "जलद डिलिव्हरी"), desc: t("Free delivery on orders above ₹500. Quick delivery across India.", "₹500 वरील ऑर्डरवर मोफत डिलिव्हरी. भारतभर जलद वितरण.") },
            { icon: Heart, title: t("Made with Love", "प्रेमाने बनवले"), desc: t("Handcrafted by skilled artisans using traditional Ayurvedic methods.", "पारंपरिक आयुर्वेदिक पद्धतींचा वापर करून कुशल कारागिरांनी बनवलेले.") },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-card border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews - Redesigned */}
      <section className="bg-card border-y">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-xs font-semibold text-muted-foreground mb-3 tracking-wide uppercase">
              {t("Testimonials", "प्रशंसापत्रे")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("Trusted by 10,000+ Happy Customers", "१०,०००+ आनंदी ग्राहकांचा विश्वास")}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              {t("Real reviews from real people who have experienced the power of Ayurveda", "आयुर्वेदाची शक्ती अनुभवलेल्या खऱ्या लोकांचे खरे अभिप्राय")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-6 rounded-2xl bg-background border hover:shadow-md transition-all duration-300"
              >
                <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/10" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  "{language === "en" ? review.text : review.textMr}"
                </p>
                <div className="border-t pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{review.name[0]}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm block">{review.name}</span>
                      <span className="text-xs text-muted-foreground">{review.location}</span>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      <BadgeCheck className="h-3 w-3" /> {t("Verified", "सत्यापित")}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {review.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
