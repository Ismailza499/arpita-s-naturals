import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SortAsc } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";

const ProductsPage = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const categoryMatch = (product: typeof products[0]) => {
    if (activeCategory === "all") return true;
    return product.category.toLowerCase().replace(/\s+/g, "-") === activeCategory;
  };

  let filtered = products.filter(categoryMatch);

  if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">{t("All Products", "सर्व उत्पादने")}</h1>
      <p className="text-sm text-muted-foreground mb-6">{filtered.length} {t("products", "उत्पादने")}</p>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSearchParams(cat.id === "all" ? {} : { category: cat.id })}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border hover:border-primary"
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            {language === "en" ? cat.name : cat.nameMarathi}
          </button>
        ))}
      </div>

      {/* Sort + Filter bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Filter className="h-4 w-4" /> {t("Filters", "फिल्टर")}
        </button>
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-transparent border-none focus:outline-none font-medium cursor-pointer"
          >
            <option value="default">{t("Relevance", "संबंधित")}</option>
            <option value="price-low">{t("Price: Low to High", "किंमत: कमी ते जास्त")}</option>
            <option value="price-high">{t("Price: High to Low", "किंमत: जास्त ते कमी")}</option>
            <option value="rating">{t("Rating", "रेटिंग")}</option>
          </select>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="p-4 bg-card border rounded-lg mb-4 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Chemical-free", "Ayurvedic", "Handmade", "Eco-friendly"].map((filter) => (
              <label key={filter} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                {filter}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{t("No products found", "कोणतीही उत्पादने सापडली नाहीत")}</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
