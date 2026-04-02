import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  MessageCircle, Sparkles, ArrowRight, CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

const ContactPage = () => {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    { icon: Phone, label: "Voice", value: "+91 90823 62432", href: "tel:+919082362432" },
    { icon: Mail, label: "Inquiries", value: "hello@goarpita.com", href: "mailto:hello@goarpita.com" },
    { icon: MapPin, label: "Heritage Site", value: "Mumbai, Maharashtra", href: "#" },
    { icon: Clock, label: "Availability", value: "Mon–Sat, 9AM–7PM", href: "#" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a premium API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] selection:bg-amber-100 overflow-x-hidden">
      
      {/* 1. EDITORIAL HERO */}
      <section className="relative pt-32 pb-20 border-b border-zinc-100">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none select-none">
          <h1 className="text-[15vw] font-black uppercase leading-none">Connect</h1>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] tracking-[0.4em] font-black uppercase mb-8">
              <Sparkles className="h-3 w-3" />
              {t("Concierge Service", "संपर्क केंद्र")}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.85] mb-8">
              We're here for <br />
              <span className="italic font-serif text-amber-700">the curious.</span>
            </h1>

            <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-xl">
              {t(
                "Whether you seek guidance on our apothecary or want to discuss a custom order, our hands are ready to help.",
                "तुमच्या मनात काही शंका असतील किंवा काही माहिती हवी असेल, तर नक्की संपर्क साधा."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE INTERFACE (Split View) */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Left: Premium Contact List */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="text-xs tracking-[0.4em] font-black uppercase text-zinc-400">Reach Out Directly</h2>
              <div className="h-px w-20 bg-amber-200" />
            </div>

            <div className="grid gap-4">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-zinc-50 hover:border-amber-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all group"
                >
                  <div className="h-14 w-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                    <info.icon size={24} strokeWidth={1} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest font-black text-zinc-400 uppercase mb-1">{info.label}</p>
                    <p className="text-lg font-medium tracking-tight text-zinc-800">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/919082362432"
              className="flex items-center justify-between w-full p-6 rounded-[32px] bg-[#25D366]/5 border border-[#25D366]/20 text-[#128C7E] font-bold group"
            >
              <div className="flex items-center gap-4">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm tracking-widest uppercase">Instant Consultation</span>
              </div>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </div>

          {/* Right: Studio-Style Contact Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[48px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-zinc-50"
                >
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="relative group">
                        <input required type="text" className="peer w-full bg-transparent border-b border-zinc-200 py-4 outline-none focus:border-amber-600 transition-all font-light" />
                        <label className="absolute left-0 top-4 text-zinc-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-widest peer-focus:text-amber-700 peer-valid:-top-4 peer-valid:text-[10px]">
                          {t("Full Name", "पूर्ण नाव")}
                        </label>
                      </div>
                      <div className="relative group">
                        <input required type="email" className="peer w-full bg-transparent border-b border-zinc-200 py-4 outline-none focus:border-amber-600 transition-all font-light" />
                        <label className="absolute left-0 top-4 text-zinc-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-widest peer-focus:text-amber-700 peer-valid:-top-4 peer-valid:text-[10px]">
                          {t("Email Address", "ईमेल पत्ता")}
                        </label>
                      </div>
                    </div>

                    <div className="relative group">
                      <input required type="text" className="peer w-full bg-transparent border-b border-zinc-200 py-4 outline-none focus:border-amber-600 transition-all font-light" />
                      <label className="absolute left-0 top-4 text-zinc-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-widest peer-focus:text-amber-700 peer-valid:-top-4 peer-valid:text-[10px]">
                        {t("Topic of Interest", "विषय")}
                      </label>
                    </div>

                    <div className="relative group">
                      <textarea required rows={4} className="peer w-full bg-transparent border-b border-zinc-200 py-4 outline-none focus:border-amber-600 transition-all font-light resize-none" />
                      <label className="absolute left-0 top-4 text-zinc-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-widest peer-focus:text-amber-700 peer-valid:-top-4 peer-valid:text-[10px]">
                        {t("Your Message", "तुमचा संदेश")}
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-6 bg-zinc-900 text-white rounded-full font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-4 hover:bg-amber-700 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {t("Send Investigation", "संदेश पाठवा")}
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[48px] p-16 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-amber-100 flex flex-col items-center text-center space-y-8"
                >
                  <div className="h-24 w-24 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <CheckCircle2 size={48} strokeWidth={1} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-light tracking-tighter italic font-serif">Message Received.</h3>
                    <p className="text-zinc-500 font-light max-w-xs mx-auto">
                      {t("Our concierge will review your inquiry and respond within 24 biological hours.", "आम्ही २४ तासांत तुम्हाला उत्तर देऊ.")}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] font-black tracking-widest uppercase text-amber-700 underline underline-offset-8"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;