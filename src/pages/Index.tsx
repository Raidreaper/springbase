import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Facilities from "@/components/Facilities";
import Admissions from "@/components/Admissions";
import StudentLife from "@/components/StudentLife";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Programs />
      <Facilities />
      <Admissions />
      <StudentLife />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
