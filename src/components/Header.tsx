import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", labelEn: "Home", labelMr: "मुख्यपृष्ठ" },
  { to: "/products", labelEn: "Shop", labelMr: "दुकान" },
  { to: "/our-story", labelEn: "Our Story", labelMr: "आमची कथा" },
  { to: "/blog", labelEn: "Blog", labelMr: "ब्लॉग" },
  { to: "/about", labelEn: "About", labelMr: "आमच्याबद्दल" },
  { to: "/contact", labelEn: "Contact", labelMr: "संपर्क" },
];

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.nameMarathi.includes(query) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSearch(false);
    navigate(`/product/${productId}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b">
      <div className="container mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 px-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Go Arpita" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("Search for products...", "उत्पादने शोधा...")}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-transparent focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-card rounded-xl shadow-lg border overflow-hidden animate-fade-in">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSuggestionClick(p.id)}
                      className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center gap-3 text-sm"
                    >
                      <span className="font-medium">{language === "en" ? p.name : p.nameMarathi}</span>
                      <span className="text-muted-foreground text-xs ml-auto">₹{p.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "mr" : "en")}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-secondary hover:bg-primary/10 transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              {language === "en" ? "मराठी" : "EN"}
            </button>

            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2.5 rounded-xl hover:bg-secondary transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2.5 rounded-xl hover:bg-secondary transition-colors"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {showSearch && (
          <div className="md:hidden px-2 pb-3 relative animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("Search for products...", "उत्पादने शोधा...")}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-transparent focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                autoFocus
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute left-2 right-2 top-full bg-card rounded-xl shadow-lg border overflow-hidden z-50 animate-fade-in">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSuggestionClick(p.id)}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center gap-3 text-sm"
                  >
                    <span className="font-medium">{language === "en" ? p.name : p.nameMarathi}</span>
                    <span className="text-muted-foreground text-xs ml-auto">₹{p.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile nav */}
        {showMobileMenu && (
          <nav className="md:hidden border-t px-4 py-3 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setShowMobileMenu(false)}
                className="block py-2.5 text-sm font-medium hover:text-primary transition-colors"
              >
                {language === "en" ? link.labelEn : link.labelMr}
              </Link>
            ))}
            <button
              onClick={() => { setLanguage(language === "en" ? "mr" : "en"); setShowMobileMenu(false); }}
              className="flex items-center gap-2 py-2.5 text-sm font-medium hover:text-primary transition-colors w-full"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "मराठी" : "English"}
            </button>
          </nav>
        )}

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 h-11 px-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 rounded-lg font-medium hover:text-primary hover:bg-primary/5 transition-all"
            >
              {language === "en" ? link.labelEn : link.labelMr}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
