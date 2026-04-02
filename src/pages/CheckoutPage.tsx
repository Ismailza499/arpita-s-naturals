import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryCharge = totalPrice >= 500 ? 0 : 40;
  const grandTotal = totalPrice + deliveryCharge;

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="h-20 w-20 rounded-full bg-herb-light flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{t("Order Placed!", "ऑर्डर दिली!")}</h1>
        <p className="text-muted-foreground mb-6">{t("Thank you for your order. We'll deliver it soon!", "तुमच्या ऑर्डरबद्दल धन्यवाद. आम्ही लवकरच डिलिव्हर करू!")}</p>
        <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          {t("Continue Shopping", "खरेदी सुरू ठेवा")}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground mb-4">{t("Your cart is empty", "तुमची कार्ट रिकामी आहे")}</p>
        <Link to="/products" className="text-primary font-medium">{t("← Browse products", "← उत्पादने पहा")}</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> {t("Back", "मागे")}
      </Link>

      <h1 className="text-2xl font-bold mb-6">{t("Checkout", "चेकआउट")}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Delivery */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> {t("Delivery Details", "डिलिव्हरी तपशील")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input placeholder={t("Full Name", "पूर्ण नाव")} className="px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input placeholder={t("Phone Number", "फोन नंबर")} className="px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input placeholder={t("Address", "पत्ता")} className="px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 sm:col-span-2" />
              <input placeholder={t("City", "शहर")} className="px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input placeholder={t("Pincode", "पिनकोड")} className="px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" /> {t("Payment Method", "पेमेंट पद्धत")}
            </h2>
            <div className="space-y-2">
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === "cod" ? "border-primary bg-herb-light" : "hover:bg-secondary"}`}>
                <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="accent-primary" />
                <span className="text-sm font-medium">{t("Cash on Delivery (COD)", "कॅश ऑन डिलिव्हरी (COD)")}</span>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === "online" ? "border-primary bg-herb-light" : "hover:bg-secondary"}`}>
                <input type="radio" name="payment" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="accent-primary" />
                <span className="text-sm font-medium">{t("Online Payment (UPI / Card)", "ऑनलाइन पेमेंट (UPI / कार्ड)")}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card border rounded-xl p-5 h-fit sticky top-24">
          <h2 className="font-bold mb-4">{t("Order Summary", "ऑर्डर सारांश")}</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>{item.product.name} × {item.quantity}</span>
                <span className="font-medium">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("Subtotal", "उपएकूण")}</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("Delivery", "डिलिव्हरी")}</span>
              <span className={deliveryCharge === 0 ? "text-primary font-medium" : ""}>{deliveryCharge === 0 ? t("FREE", "मोफत") : `₹${deliveryCharge}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>{t("Total", "एकूण")}</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
          <button
            onClick={() => { setOrderPlaced(true); clearCart(); }}
            className="w-full mt-4 bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            {t("Place Order", "ऑर्डर द्या")} — ₹{grandTotal}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
