import { Link } from "react-router-dom";
import { Leaf, Heart, Instagram, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background/80 mt-auto">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-background flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Go Arpita
            </h3>
            <p className="text-sm mt-2 italic text-background/50">{t("Go Health Go Wealth", "आरोग्य हीच संपत्ती")}</p>
            <p className="text-sm mt-3 leading-relaxed text-background/60">
              {t(
                "Traditional Ayurvedic products made with love, using pure Desi cow-based ingredients.",
                "शुद्ध देशी गाय-आधारित घटकांचा वापर करून प्रेमाने बनवलेली पारंपरिक आयुर्वेदिक उत्पादने."
              )}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">{t("Shop", "दुकान")}</h4>
            <div className="space-y-2.5 text-sm">
              <Link to="/products" className="block hover:text-background transition-colors">{t("All Products", "सर्व उत्पादने")}</Link>
              <Link to="/products?category=skin-care" className="block hover:text-background transition-colors">{t("Skin Care", "त्वचा निगा")}</Link>
              <Link to="/products?category=ayurvedic-treatments" className="block hover:text-background transition-colors">{t("Ayurvedic", "आयुर्वेदिक")}</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">{t("Company", "कंपनी")}</h4>
            <div className="space-y-2.5 text-sm">
              <Link to="/our-story" className="block hover:text-background transition-colors">{t("Our Story", "आमची कथा")}</Link>
              <Link to="/about" className="block hover:text-background transition-colors">{t("About Us", "आमच्याबद्दल")}</Link>
              <Link to="/blog" className="block hover:text-background transition-colors">{t("Blog", "ब्लॉग")}</Link>
              <Link to="/contact" className="block hover:text-background transition-colors">{t("Contact", "संपर्क")}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">{t("Get in Touch", "संपर्क")}</h4>
            <div className="space-y-2.5 text-sm">
              <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-background transition-colors">
                <Phone className="h-3.5 w-3.5" /> +91 99999 99999
              </a>
              <a href="mailto:hello@goarpita.com" className="flex items-center gap-2 hover:text-background transition-colors">
                <Mail className="h-3.5 w-3.5" /> hello@goarpita.com
              </a>
              <a href="https://instagram.com/goarpita" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-background transition-colors">
                <Instagram className="h-3.5 w-3.5" /> @goarpita
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/40">
          <p>© 2026 Go Arpita. {t("All rights reserved.", "सर्व हक्क राखीव.")}</p>
          <p className="flex items-center gap-1">
            {t("Made with", "प्रेमाने बनवले")} <Heart className="h-3 w-3 text-destructive fill-destructive" /> {t("in India", "भारतात")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
