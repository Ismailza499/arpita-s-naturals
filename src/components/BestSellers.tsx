import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";

const BestSellers = () => {
  const { t } = useLanguage();
  const bestSellers = products.filter(p => p.rating >= 4.6).slice(0, 4);

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{t("Best Sellers", "सर्वाधिक विक्री")}</h2>
              <p className="text-sm text-muted-foreground">{t("Most loved by our customers", "आमच्या ग्राहकांचे आवडते")}</p>
            </div>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all">
            {t("View All", "सर्व पहा")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
