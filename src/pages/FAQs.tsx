import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import organicImage from "@/assets/organic.jpg";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqsData = [
    {
      question: "What does organic mean?",
      answer: "Organic refers to the way agricultural products are grown and processed. Organic crops are grown without the use of synthetic pesticides, GMOs, petroleum-based fertilizers, or sewage sludge-based fertilizers. Organic livestock are raised without the routine use of antibiotics and growth hormones, and are fed organic feed."
    },
    {
      question: "Are all your products organic?",
      answer: "We strive to source and offer as many organic products as possible. While the vast majority of our products are certified organic, we also carry a selection of natural and sustainably sourced items that may not carry an organic certification but meet our high standards for quality and ethical production. Each product listing clearly indicates its certification status."
    },
    {
      question: "What does pasture-raised mean?",
      answer: "Pasture-raised means that animals have been raised outdoors on pasture, with access to fresh forage. This is often considered a higher standard than 'free-range' as it implies a more natural diet and environment for the animals, leading to better welfare and often higher nutritional quality in their products."
    },
    {
      question: "What does regenerative farming mean?",
      answer: "Regenerative farming is a holistic land management practice that leverages the power of photosynthesis in plants to close the carbon cycle, and build soil health, crop resilience, and nutrient density. It focuses on improving soil health, increasing biodiversity, enhancing water cycles, and strengthening the health of the ecosystem."
    },
    {
      question: "How do you deliver your fruits and vegetables?",
      answer: "We deliver our fruits and vegetables in reusable, insulated containers to maintain freshness. Our delivery vehicles are optimized for efficiency to minimize our carbon footprint. You can choose your preferred delivery window during checkout."
    },
    {
      question: "Can I bring back my paper bags?",
      answer: "Yes, we encourage you to return your clean paper bags on your next delivery! We will sanitize and reuse them as part of our commitment to reducing waste."
    },
    {
      question: "Do you take glass jars and bottles back?",
      answer: "Absolutely! We have a return program for glass jars and bottles. Please rinse them thoroughly and leave them out for our delivery team during your next scheduled delivery. We'll handle the sanitization and reuse."
    },
    {
      question: "I hate plastic, can I have my order delivered without plastic?",
      answer: "We understand your concern about plastic. We offer a 'plastic-free' delivery option where we minimize or eliminate plastic packaging wherever possible. Please select this option at checkout, and we'll do our best to accommodate your request."
    },
    {
      question: "Are you more expensive than other supermarkets?",
      answer: "Our prices reflect the quality of our organic, sustainably sourced products and our commitment to fair wages for farmers and ethical practices. While some items may be priced higher than conventional supermarket alternatives, we believe the health, environmental, and ethical benefits provide greater value. We also offer various promotions and loyalty programs."
    },
    {
      question: "How can I apply my funds in my new order?",
      answer: "Any available funds or store credit in your account can be applied during the checkout process. You'll see an option to use your balance before finalizing your payment."
    },
    {
      question: "How can I check if my funds have been refunded in my account?",
      answer: "You can check your account balance and transaction history by logging into your profile and navigating to the 'My Funds' or 'Account Balance' section. All refunds will be clearly listed there."
    },
    {
      question: "Do you sell at wholesale prices?",
      answer: "Yes, we offer wholesale pricing for businesses, restaurants, and bulk orders. Please visit our 'Wholesale' section or contact our sales team directly for more information and to set up a wholesale account."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={organicImage}
            alt="Organic products and fresh vegetables"
            className="w-full h-full object-cover"
          />
          {/* Organic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/20"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/30 blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-secondary/40 blur-3xl"></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-6 tracking-tight drop-shadow-lg">
              FAQs
            </h1>
            <p className="text-2xl md:text-3xl font-body drop-shadow-md italic">
              How can we help you today?
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our organic products and services
              </p>
            </div>

            <div className="space-y-4">
              {faqsData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-5">
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;
