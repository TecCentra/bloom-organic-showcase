import { Leaf } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Passionate about sustainable agriculture and organic living for over 15 years.",
      initials: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      bio: "Expert in organic product sourcing and quality assurance with a focus on sustainability.",
      initials: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Wellness Consultant",
      bio: "Certified nutritionist helping customers find the perfect organic solutions.",
      initials: "ER",
    },
    {
      name: "David Thompson",
      role: "Sustainability Director",
      bio: "Ensuring our practices remain eco-friendly and support local organic farmers.",
      initials: "DT",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <Leaf className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Dedicated individuals working together to bring you the finest organic products and sustainable practices.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl overflow-hidden hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square bg-gradient-to-br from-secondary to-primary/20 flex items-center justify-center relative overflow-hidden">
                <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-heading font-bold transition-transform duration-300 group-hover:scale-110">
                  {member.initials}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 bg-card border border-border rounded-2xl p-8 md:p-12 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Organic Bloom, we're committed to making organic living accessible to everyone. 
            Our team works tirelessly to source the finest organic products, support sustainable 
            farming practices, and ensure that every item we offer meets our strict quality standards. 
            We believe in transparency, sustainability, and the power of nature to nurture health and wellness.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
