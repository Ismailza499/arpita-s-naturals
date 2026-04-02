import { Leaf, Heart, Shield, Droplets, Hand, Sun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const values = [
  {
    icon: Leaf,
    title: "Traditional Ayurvedic Methods",
    titleMr: "पारंपरिक आयुर्वेदिक पद्धती",
    desc: "We follow ancient Ayurvedic formulations passed down through generations, ensuring authentic healing properties in every product.",
    descMr: "आम्ही पिढ्यानपिढ्या चालत आलेल्या प्राचीन आयुर्वेदिक सूत्रांचे पालन करतो.",
  },
  {
    icon: Droplets,
    title: "Desi Cow Importance",
    titleMr: "देशी गायीचे महत्त्व",
    desc: "All our products use ingredients sourced from Desi cows — their milk, ghee, and other derivatives are considered sacred and medicinal in Ayurveda.",
    descMr: "आमची सर्व उत्पादने देशी गायींपासून मिळवलेल्या घटकांचा वापर करतात.",
  },
  {
    icon: Hand,
    title: "Handmade with Love",
    titleMr: "प्रेमाने हस्तनिर्मित",
    desc: "Each product is carefully handcrafted by skilled artisans, ensuring quality and attention to detail that machines cannot replicate.",
    descMr: "प्रत्येक उत्पादन कुशल कारागिरांनी काळजीपूर्वक हस्तनिर्मित केले आहे.",
  },
  {
    icon: Shield,
    title: "Purity & Trust",
    titleMr: "शुद्धता आणि विश्वास",
    desc: "We guarantee 100% natural ingredients with no chemicals, preservatives, or artificial fragrances. Pure as nature intended.",
    descMr: "आम्ही रसायने, प्रिझर्व्हेटिव्ह किंवा कृत्रिम सुगंधाशिवाय १००% नैसर्गिक घटकांची हमी देतो.",
  },
];

const AboutPage = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <span className="text-4xl mb-4 inline-block">🌿</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("About Go Arpita", "गो अर्पिता बद्दल")}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "We are on a mission to bring the ancient wisdom of Ayurveda to modern homes. Our products are made with pure, natural ingredients sourced from Desi cows, following traditional methods that have healed generations.",
              "आम्ही आयुर्वेदाचे प्राचीन ज्ञान आधुनिक घरांमध्ये आणण्याच्या मिशनवर आहोत. आमची उत्पादने देशी गायींपासून मिळवलेल्या शुद्ध, नैसर्गिक घटकांपासून बनवलेली आहेत."
            )}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4 p-6 bg-card border rounded-xl">
              <div className="h-12 w-12 rounded-full bg-herb-light flex items-center justify-center shrink-0">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{language === "en" ? v.title : v.titleMr}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{language === "en" ? v.desc : v.descMr}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Panchagavya section */}
      <section className="bg-card border-y">
        <div className="container mx-auto px-4 py-12 text-center max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">{t("The Power of Panchagavya", "पंचगव्याची शक्ती")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            {t(
              "Panchagavya consists of five sacred products from the Desi cow. Together, they form a powerful combination used in Ayurveda for centuries.",
              "पंचगव्यामध्ये देशी गायीच्या पाच पवित्र उत्पादनांचा समावेश आहे."
            )}
          </p>
          <div className="grid grid-cols-5 gap-4">
            {[
              { emoji: "🥛", name: "Milk", nameMr: "दूध" },
              { emoji: "🥣", name: "Curd", nameMr: "दही" },
              { emoji: "🧈", name: "Ghee", nameMr: "तूप" },
              { emoji: "💧", name: "Gomutra", nameMr: "गोमूत्र" },
              { emoji: "🌿", name: "Cow Dung", nameMr: "शेण" },
            ].map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-1">
                <span className="text-2xl md:text-3xl">{item.emoji}</span>
                <span className="text-xs font-medium">{language === "en" ? item.name : item.nameMr}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold mb-2">{t("Ready to experience the power of nature?", "निसर्गाची शक्ती अनुभवायला तयार?")}</h2>
        <a
          href="/products"
          className="inline-block mt-4 bg-gradient-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          {t("Shop Our Products", "आमची उत्पादने पहा")}
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
