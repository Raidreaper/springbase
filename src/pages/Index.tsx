import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AdvancedCarousel from "@/components/AdvancedCarousel";
import AdmissionGraphics from "@/components/AdmissionGraphics";
import Programs from "@/components/Programs";
import Facilities from "@/components/Facilities";
import Admissions from "@/components/Admissions";
import StudentLife from "@/components/StudentLife";
import { Card, CardContent } from "@/components/ui/card";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  // Carousel data
  const carouselItems = [
    {
      id: "science-lab-1",
      image: "/images/WhatsApp Image 2025-09-04 at 11.43.01 (2).jpeg",
      title: "State-of-the-Art Science Labs",
      description: "Fully equipped laboratories where students conduct hands-on experiments and discover the wonders of science.",
      category: "Facilities"
    },
    {
      id: "science-lab-2",
      image: "/images/WhatsApp Image 2025-09-04 at 11.43.00.jpeg",
      title: "Hands-on Laboratory Learning",
      description: "Students actively engaged in practical laboratory experiments, developing critical thinking and scientific skills.",
      category: "Science"
    },
    {
      id: "collaborative-learning",
      image: "/images/WhatsApp Image 2025-09-04 at 08.58.31.jpeg",
      title: "Collaborative Learning",
      description: "Students working together in study groups, fostering peer-to-peer learning and teamwork skills.",
      category: "Academics"
    },
    {
      id: "microscopy-studies",
      image: "/images/WhatsApp Image 2025-09-04 at 11.42.59 (1).jpeg",
      title: "Advanced Microscopy Studies",
      description: "Professional-grade equipment enabling students to explore the microscopic world and develop scientific inquiry skills.",
      category: "Science"
    },
    {
      id: "student-groups",
      image: "/images/WhatsApp Image 2025-09-04 at 11.02.55.jpeg",
      title: "Study Groups & Teamwork",
      description: "Organized study groups that promote collaborative learning and help students develop essential teamwork skills.",
      category: "Academics"
    },
    {
      id: "admission-ongoing",
      image: "/images/WhatsApp Image 2025-09-05 at 15.11.21.jpeg",
      title: "Admission Ongoing",
      description: "Join our comprehensive educational programs including Nursery, Primary, and College levels with world-class facilities.",
      category: "Admissions"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Springbase Schools Lagos - Excellence in Education"
        description="Springbase Schools Lagos offers comprehensive education from Nursery to College levels. Join our vibrant community with state-of-the-art facilities, experienced teachers, and proven academic excellence. Admission ongoing!"
        keywords="Springbase Schools, Lagos schools, private school Lagos, nursery school, primary school, college Lagos, Cambridge IGCSE, BECE, SSCE, NECO, education Nigeria, best schools Lagos, admission ongoing"
        url="https://www.springbase.com.ng"
        image="/images/WhatsApp Image 2025-09-05 at 15.11.21.jpeg"
      />
      <Navigation />
      <Hero />
      <About />
      
      {/* Advanced Carousel Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
              Discover <span className="text-sage">Springbase</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our vibrant campus life, world-class facilities, and the amazing experiences that make Springbase Schools the perfect choice for your child's education.
            </p>
          </div>
          
          <AdvancedCarousel 
            items={carouselItems}
            autoPlay={true}
            autoPlayInterval={6000}
            showControls={true}
            showIndicators={true}
            showThumbnails={true}
          />
        </div>
      </section>
      
      <AdmissionGraphics />
      <Programs />
      <Facilities />
      <Admissions />
      {/* Gallery preview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-heading font-bold text-charcoal">From our Gallery</h3>
            <a href="/gallery" className="text-sage underline">See more</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/images/community-outreach/1f5c7c37-efed-4b02-a337-e9a2b1d5bd56-640.webp",
              "/images/assemblies/af7c268b-8fdc-4a40-9aa4-9fd9d1030cbd-640.webp",
              "/images/parade/c3fc96ba-e12b-42dc-9dff-1fe09753a95b-640.webp",
              "/images/community-outreach/72e4a922-99d5-4389-8d55-92790a11ec79-640.webp",
            ].map((src, i) => (
              <Card key={i} className="border-0 overflow-hidden">
                <CardContent className="p-0">
                  <a href="/gallery"><img src={src} alt="School gallery preview" className="w-full h-40 object-cover" /></a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <StudentLife />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
