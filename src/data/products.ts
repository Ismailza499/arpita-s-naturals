import soapImg from "@/assets/panchagavya-soap.jpg";
import nasyaImg from "@/assets/panchagavya-nasya.jpg";
import facepackImg from "@/assets/turmeric-facepack.jpg";
import gheeImg from "@/assets/cow-ghee-cream.jpg";
import categoryAllImg from "@/assets/category-all.png";
import categorySkincareImg from "@/assets/category-skincare.png";
import categoryAyurvedicImg from "@/assets/category-ayurvedic.png";
import categoryNaturalImg from "@/assets/category-natural.png";

export interface Product {
  id: string;
  name: string;
  nameMarathi: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  descriptionMarathi: string;
  ingredients: { name: string; benefit: string }[];
  benefits: string[];
  benefitsMarathi: string[];
  usps: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  weight?: string;
}

export const products: Product[] = [
  {
    id: "panchagavya-soap",
    name: "Panchagavya Soap",
    nameMarathi: "पंचगव्य साबण",
    price: 120,
    originalPrice: 180,
    image: soapImg,
    category: "Skin Care",
    description: "100% natural Ayurvedic skincare soap made using Desi cow-based ingredients and herbs. Deep cleansing with the power of Panchagavya.",
    descriptionMarathi: "पंचगव्य साबण हा पूर्णपणे नैसर्गिक आणि आयुर्वेदिक तत्वांवर आधारित स्किन केअर उत्पादन आहे.",
    ingredients: [
      { name: "Cow Dung Powder", benefit: "Antibacterial, deep cleansing" },
      { name: "Multani Mitti", benefit: "Oil control, pore cleansing" },
      { name: "Turmeric (Haldi)", benefit: "Antiseptic, natural glow" },
      { name: "Alum (Phitkari)", benefit: "Skin tightening, astringent" },
      { name: "Triphala", benefit: "Detox, radiant glow" },
    ],
    benefits: ["Deep cleansing", "Reduces pimples & allergies", "Improves skin texture", "Natural glow", "Chemical-free"],
    benefitsMarathi: ["खोल स्वच्छता", "मुरुम आणि ऍलर्जी कमी करते", "त्वचेची पोत सुधारते", "नैसर्गिक चमक", "रसायनमुक्त"],
    usps: ["100% Natural", "Handmade", "Eco-friendly", "Ayurvedic"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    weight: "100g",
  },
  {
    id: "panchagavya-nasya",
    name: "Panchagavya Nasya",
    nameMarathi: "पंचगव्य नस्य",
    price: 250,
    originalPrice: 350,
    image: nasyaImg,
    category: "Ayurvedic Treatments",
    description: "Traditional Ayurvedic nasal therapy product made from Panchagavya — Milk, Curd, Ghee, Gomutra, and Cow dung. Improves breathing and mental clarity.",
    descriptionMarathi: "पारंपरिक आयुर्वेदिक नाकाची चिकित्सा उत्पादन. श्वासोच्छ्वास आणि मानसिक स्पष्टता सुधारते.",
    ingredients: [
      { name: "Cow Milk", benefit: "Nourishing, soothing" },
      { name: "Cow Curd", benefit: "Probiotic, cooling" },
      { name: "Cow Ghee", benefit: "Lubricating, healing" },
      { name: "Gomutra", benefit: "Detoxifying, medicinal" },
      { name: "Cow Dung Extract", benefit: "Antibacterial, purifying" },
    ],
    benefits: ["Improves breathing", "Helps sinus & cold relief", "Boosts memory & concentration", "Reduces stress & anxiety"],
    benefitsMarathi: ["श्वासोच्छ्वास सुधारते", "सायनस आणि सर्दी पासून आराम", "स्मरणशक्ती आणि एकाग्रता वाढवते", "तणाव कमी करते"],
    usps: ["Traditional Ayurvedic", "Panchagavya-based", "Natural therapy", "Chemical-free"],
    rating: 4.6,
    reviews: 87,
    inStock: true,
    weight: "30ml",
  },
  {
    id: "turmeric-face-pack",
    name: "Turmeric Face Pack",
    nameMarathi: "हळद फेस पॅक",
    price: 150,
    originalPrice: 220,
    image: facepackImg,
    category: "Skin Care",
    description: "Pure turmeric and sandalwood face pack for glowing, blemish-free skin.",
    descriptionMarathi: "शुद्ध हळद आणि चंदन फेस पॅक चमकदार, डागरहित त्वचेसाठी.",
    ingredients: [
      { name: "Turmeric", benefit: "Anti-inflammatory, brightening" },
      { name: "Sandalwood", benefit: "Cooling, complexion" },
    ],
    benefits: ["Brightens skin", "Reduces dark spots", "Anti-aging", "Natural glow"],
    benefitsMarathi: ["त्वचा उजळवते", "काळे डाग कमी करते", "वृद्धत्वविरोधी", "नैसर्गिक चमक"],
    usps: ["100% Natural", "Handmade", "Chemical-free"],
    rating: 4.5,
    reviews: 56,
    inStock: true,
    weight: "50g",
  },
  {
    id: "cow-ghee-cream",
    name: "Desi Cow Ghee Cream",
    nameMarathi: "देशी गाय तूप क्रीम",
    price: 200,
    originalPrice: 300,
    image: gheeImg,
    category: "Natural Products",
    description: "Deeply moisturizing cream made with pure desi cow ghee and herbs.",
    descriptionMarathi: "शुद्ध देशी गाय तूप आणि औषधी वनस्पतींपासून बनवलेली मॉइश्चरायझिंग क्रीम.",
    ingredients: [
      { name: "Desi Cow Ghee", benefit: "Deep moisturizing" },
      { name: "Aloe Vera", benefit: "Soothing, healing" },
    ],
    benefits: ["Deep moisturizing", "Heals dry skin", "Anti-aging", "Soft & supple skin"],
    benefitsMarathi: ["खोल मॉइश्चरायझिंग", "कोरडी त्वचा बरी करते", "वृद्धत्वविरोधी", "मऊ त्वचा"],
    usps: ["Pure Ghee", "Handmade", "Eco-friendly"],
    rating: 4.7,
    reviews: 43,
    inStock: true,
    weight: "50g",
  },
];

export const categories = [
  { id: "all", name: "All Products", nameMarathi: "सर्व उत्पादने", icon: "🌿", image: categoryAllImg },
  { id: "skin-care", name: "Skin Care", nameMarathi: "त्वचा निगा", icon: "✨", image: categorySkincareImg },
  { id: "ayurvedic-treatments", name: "Ayurvedic Treatments", nameMarathi: "आयुर्वेदिक उपचार", icon: "🍃", image: categoryAyurvedicImg },
  { id: "natural-products", name: "Natural Products", nameMarathi: "नैसर्गिक उत्पादने", icon: "🌱", image: categoryNaturalImg },
];
