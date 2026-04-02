import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Milk, Droplets, Flame, Beaker, Leaf } from "lucide-react";

const elements = [
  { icon: Milk, name: "Milk", nameMr: "दूध", desc: "Nourishing & soothing", descMr: "पोषक आणि सुखदायक", color: "bg-amber-50 text-amber-600" },
  { icon: Beaker, name: "Curd", nameMr: "दही", desc: "Probiotic & cooling", descMr: "प्रोबायोटिक आणि थंड", color: "bg-blue-50 text-blue-600" },
  { icon: Flame, name: "Ghee", nameMr: "तूप", desc: "Healing & lubricating", descMr: "उपचार आणि स्निग्ध", color: "bg-yellow-50 text-yellow-600" },
  { icon: Droplets, name: "Gomutra", nameMr: "गोमूत्र", desc: "Detoxifying & medicinal", descMr: "विषमुक्त आणि औषधी", color: "bg-emerald-50 text-emerald-600" },
  { icon: Leaf, name: "Cow Dung", nameMr: "शेण", desc: "Antibacterial & purifying", descMr: "जंतुनाशक आणि शुद्ध", color: "bg-green-50 text-green-600" },
];

const PanchagavyaPromise = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-herb-light/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 tracking-wide uppercase">
            {t("Our Promise", "आमचे वचन")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("The Panchagavya Promise", "पंचगव्य वचन")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "Five sacred elements from the Desi cow form the foundation of all our products — a tradition trusted for thousands of years.",
              "देशी गायीचे पाच पवित्र घटक आमच्या सर्व उत्पादनांचा पाया आहेत — हजारो वर्षांपासून विश्वासार्ह परंपरा."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {elements.map((el, i) => (
            <motion.div
              key={el.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-card border hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className={`h-14 w-14 rounded-2xl ${el.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <el.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-sm mb-1">
                {language === "en" ? el.name : el.nameMr}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {language === "en" ? el.desc : el.descMr}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PanchagavyaPromise;
