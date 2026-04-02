import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: "1",
    title: "The Science Behind Panchagavya",
    titleMr: "पंचगव्यामागील विज्ञान",
    excerpt: "Discover how five sacred cow-derived elements work together to heal and nourish your body and mind.",
    excerptMr: "पाच पवित्र गाय-व्युत्पन्न घटक एकत्र कसे कार्य करतात ते जाणून घ्या.",
    date: "Mar 15, 2026",
    readTime: "5 min",
    category: "Ayurveda",
    image: "/src/assets/panchagavya-soap.jpg",
  },
  {
    id: "2",
    title: "Why Desi Cow Products Are Superior",
    titleMr: "देशी गाय उत्पादने का श्रेष्ठ आहेत",
    excerpt: "Understanding the unique properties of Desi cow milk, ghee, and other derivatives compared to hybrid breeds.",
    excerptMr: "देशी गायीच्या दूध, तूप आणि इतर उत्पादनांचे अनन्य गुणधर्म समजून घ्या.",
    date: "Mar 8, 2026",
    readTime: "4 min",
    category: "Health",
    image: "/src/assets/panchagavya-nasya.jpg",
  },
  {
    id: "3",
    title: "Natural Skincare: A Complete Guide",
    titleMr: "नैसर्गिक त्वचा निगा: संपूर्ण मार्गदर्शक",
    excerpt: "From turmeric to multani mitti — learn how traditional ingredients transform your skincare routine.",
    excerptMr: "हळदीपासून मुलतानी मातीपर्यंत — पारंपरिक घटक तुमची त्वचा निगा कशी बदलतात ते शिका.",
    date: "Feb 28, 2026",
    readTime: "6 min",
    category: "Skin Care",
    image: "/src/assets/panchagavya-soap.jpg",
  },
];

const BlogPage = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-hero py-14 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              {t("Blog & Insights", "ब्लॉग आणि माहिती")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("Wisdom from Ayurveda", "आयुर्वेदातील ज्ञान")}
            </h1>
            <p className="text-muted-foreground">
              {t(
                "Explore articles on Ayurvedic living, natural skincare, and the healing power of Panchagavya.",
                "आयुर्वेदिक जीवन, नैसर्गिक त्वचा निगा आणि पंचगव्याच्या उपचार शक्तीबद्दल लेख शोधा."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  {post.category}
                </span>
                <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                  {language === "en" ? post.title : post.titleMr}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {language === "en" ? post.excerpt : post.excerptMr}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("Read", "वाचा")} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
