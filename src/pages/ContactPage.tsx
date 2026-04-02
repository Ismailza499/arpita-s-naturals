import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: Phone, label: t("Phone", "फोन"), value: "+91 99999 99999", href: "tel:+919999999999" },
    { icon: Mail, label: t("Email", "ईमेल"), value: "hello@goarpita.com", href: "mailto:hello@goarpita.com" },
    { icon: MapPin, label: t("Address", "पत्ता"), value: t("Pune, Maharashtra, India", "पुणे, महाराष्ट्र, भारत"), href: "#" },
    { icon: Clock, label: t("Hours", "वेळ"), value: t("Mon–Sat, 9AM–7PM", "सोम–शनि, सकाळी ९–संध्या ७"), href: "#" },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-hero py-14 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("Get in Touch", "संपर्क साधा")}</h1>
            <p className="text-muted-foreground">
              {t("Have questions about our products? We'd love to hear from you.", "आमच्या उत्पादनांबद्दल प्रश्न आहेत? आम्हाला तुमचे ऐकायला आवडेल.")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <h2 className="text-xl font-bold mb-6">{t("Contact Information", "संपर्क माहिती")}</h2>
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{info.label}</p>
                  <p className="font-medium text-sm">{info.value}</p>
                </div>
              </motion.a>
            ))}

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full mt-6 bg-leaf text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-5 w-5" />
              {t("Chat on WhatsApp", "WhatsApp वर चॅट करा")}
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-card border rounded-2xl">
                <div className="h-16 w-16 rounded-full bg-herb-light flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("Message Sent!", "संदेश पाठवला!")}</h3>
                <p className="text-muted-foreground text-sm">{t("We'll get back to you within 24 hours.", "आम्ही २४ तासांत तुम्हाला उत्तर देऊ.")}</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="bg-card border rounded-2xl p-6 space-y-4"
              >
                <h2 className="text-xl font-bold mb-2">{t("Send a Message", "संदेश पाठवा")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input required placeholder={t("Your Name", "तुमचे नाव")} className="px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                  <input required type="email" placeholder={t("Email Address", "ईमेल पत्ता")} className="px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
                <input required placeholder={t("Subject", "विषय")} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <textarea required rows={5} placeholder={t("Your message...", "तुमचा संदेश...")} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
                <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  {t("Send Message", "संदेश पाठवा")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
