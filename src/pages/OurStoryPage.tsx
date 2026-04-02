import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Sprout, Award, Users, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const timeline = [
  { year: "2020", title: "The Seed", titleMr: "बीज", desc: "Started with a simple belief — nature has the best remedies. We began crafting products from Desi cow ingredients.", descMr: "एका साध्या विश्वासाने सुरुवात केली — निसर्गाकडे सर्वोत्तम उपाय आहेत.", icon: Sprout },
  { year: "2022", title: "Growing Trust", titleMr: "वाढता विश्वास", desc: "Word spread through our community. Over 500 families started using our Panchagavya products regularly.", descMr: "आमच्या समुदायात शब्द पसरला. ५०० हून अधिक कुटुंबांनी आमची उत्पादने वापरणे सुरू केले.", icon: Users },
  { year: "2024", title: "Recognition", titleMr: "ओळख", desc: "Recognized as a trusted Ayurvedic brand. Expanded our product line to include skincare, nasya, and wellness products.", descMr: "विश्वसनीय आयुर्वेदिक ब्रँड म्हणून ओळख मिळाली.", icon: Award },
  { year: "2026", title: "Go Health Go Wealth", titleMr: "आरोग्य हीच संपत्ती", desc: "Launched online to bring authentic Ayurvedic products to every doorstep across India.", descMr: "भारतभरात प्रत्येक दारात अस्सल आयुर्वेदिक उत्पादने आणण्यासाठी ऑनलाइन सुरू केले.", icon: Target },
];

const OurStoryPage = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Heart className="h-3.5 w-3.5" />
              {t("Our Journey", "आमचा प्रवास")}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {t("From Tradition to", "परंपरेपासून")}{" "}
              <span className="text-gradient-herb">{t("Your Home", "तुमच्या घरापर्यंत")}</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {t(
                "A story of passion, purity, and the timeless wisdom of Ayurveda. Every product carries the love of our hands and the blessings of nature.",
                "उत्कटता, शुद्धता आणि आयुर्वेदाच्या कालातीत ज्ञानाची कथा."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex gap-6 mb-10 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-3" />}
              </div>
              <div className="pb-8">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{item.year}</span>
                <h3 className="font-bold text-lg mt-2 mb-1">{language === "en" ? item.title : item.titleMr}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{language === "en" ? item.desc : item.descMr}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-card border-y">
        <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Sparkles className="h-8 w-8 text-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("Our Mission", "आमचे ध्येय")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                "To make authentic, pure, and affordable Ayurvedic products accessible to every Indian household — preserving ancient wisdom while embracing modern convenience.",
                "प्रत्येक भारतीय घराला अस्सल, शुद्ध आणि परवडणारी आयुर्वेदिक उत्पादने उपलब्ध करून देणे — प्राचीन ज्ञान जपत आधुनिक सोयीचा स्वीकार करणे."
              )}
            </p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              {t("Explore Products", "उत्पादने पहा")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurStoryPage;
