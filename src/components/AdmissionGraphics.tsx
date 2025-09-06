import { GraduationCap, Users, BookOpen, Award, Calendar, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageModal from "@/components/ImageModal";

const AdmissionGraphics = () => {
  const admissionStats = [
    {
      icon: <Users className="h-8 w-8 text-sage" />,
      number: "500+",
      label: "Students Enrolled",
      description: "Growing community of learners"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-lotus" />,
      number: "95%",
      label: "Success Rate",
      description: "Academic excellence achieved"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-sage" />,
      number: "15+",
      label: "Programs Offered",
      description: "Comprehensive curriculum"
    },
    {
      icon: <Award className="h-8 w-8 text-lotus" />,
      number: "10+",
      label: "Years Experience",
      description: "Proven track record"
    }
  ];

  const admissionLevels = [
    {
      title: "Nursery",
      age: "2-5 years",
      description: "Early childhood development with play-based learning",
      color: "bg-yellow-500",
      features: ["Play-based Learning", "Social Development", "Creative Arts", "Basic Literacy"]
    },
    {
      title: "Primary",
      age: "6-11 years",
      description: "Foundation education with core subjects and character building",
      color: "bg-green-500",
      features: ["Core Subjects", "Character Building", "Sports & Arts", "Technology Integration"]
    },
    {
      title: "College",
      age: "12-18 years",
      description: "Advanced education preparing students for university and beyond",
      color: "bg-purple-500",
      features: ["Advanced Curriculum", "University Prep", "Leadership Skills", "Career Guidance"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sage/5 to-lotus/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            Join Our <span className="text-sage">Educational Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience excellence in education with our comprehensive programs designed to nurture 
            young minds and prepare them for a successful future.
          </p>
        </div>

        {/* Admission Flyer */}
        <div className="mb-16 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-heading font-bold text-charcoal mb-4">
              <span className="text-sage">Admission Ongoing</span> - Limited Spots Available!
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on the opportunity to give your child the best education
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <ImageModal
              src="/images/WhatsApp Image 2025-09-05 at 15.11.21.jpeg"
              alt="Springbase Schools Admission Flyer"
              title="Admission Ongoing - Springbase Schools"
              description="Join our comprehensive educational programs including Nursery, Primary, and College levels. Programs include CHECKPOINT, CAMBRIDGE IGCSE, BECE, SSCE, and NECO."
              className="overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-05 at 15.11.21.jpeg" 
                alt="Springbase Schools Admission Flyer" 
                className="w-full h-auto object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {admissionStats.map((stat, index) => (
            <Card 
              key={index} 
              className="card-elegant bg-card border-0 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-sage mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-charcoal mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Educational Levels */}
        <div className="mb-16">
          <h3 className="text-3xl font-heading font-bold text-charcoal text-center mb-12">
            Educational <span className="text-sage">Levels</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {admissionLevels.map((level, index) => (
              <Card 
                key={index} 
                className="card-elegant bg-card border-0 h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-charcoal mb-2">
                      {level.title}
                    </h4>
                    <p className="text-sage font-semibold mb-3">
                      Ages {level.age}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-charcoal mb-3">Key Features:</h5>
                    <div className="space-y-2">
                      {level.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-sage rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center fade-in">
          <Card className="card-elegant bg-gradient-accent text-white border-0">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-3xl font-heading font-bold mb-4">
                Ready to Begin Your Journey?
              </h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join hundreds of families who have chosen Springbase Schools for their children's education. 
                Limited spots available for the upcoming academic year.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-sage hover:bg-gray-100"
                  onClick={() => (window.location.href = '/admissions')}
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-sage"
                  onClick={() => (window.location.href = '/schedule-tour')}
                >
                  Schedule Tour
                </Button>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Call: 08023281221</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Admission Deadline: March 15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdmissionGraphics;
