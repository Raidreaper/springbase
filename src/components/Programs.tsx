import { GraduationCap, Microscope, Palette, Globe, Calculator, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Programs = () => {
  const programs = [
    {
      icon: <GraduationCap className="h-8 w-8 text-sage" />,
      title: "Early Childhood Education",
      grade: "Pre-K to Grade 2",
      description: "Foundation-building programs that foster curiosity and love for learning through play-based and structured activities.",
      features: ["Literacy Development", "Numeracy Skills", "Social Learning", "Creative Expression"]
    },
    {
      icon: <Microscope className="h-8 w-8 text-lotus" />,
      title: "Elementary Sciences",
      grade: "Grades 3-5",
      description: "Hands-on science exploration that develops critical thinking and problem-solving skills.",
      features: ["Laboratory Experiments", "Nature Studies", "STEM Projects", "Scientific Method"]
    },
    {
      icon: <Calculator className="h-8 w-8 text-sage" />,
      title: "Advanced Mathematics",
      grade: "Grades 6-8",
      description: "Comprehensive mathematics program that builds strong analytical and logical reasoning abilities.",
      features: ["Algebra Foundations", "Geometry", "Statistics", "Problem Solving"]
    },
    {
      icon: <Globe className="h-8 w-8 text-lotus" />,
      title: "Global Studies",
      grade: "All Grades",
      description: "Understanding diverse cultures and global perspectives to develop well-rounded citizens.",
      features: ["Cultural Awareness", "Geography", "World History", "Current Events"]
    },
    {
      icon: <Palette className="h-8 w-8 text-sage" />,
      title: "Creative Arts",
      grade: "All Grades",
      description: "Comprehensive arts education that nurtures creativity and self-expression.",
      features: ["Visual Arts", "Drama & Theater", "Digital Design", "Art History"]
    },
    {
      icon: <Music className="h-8 w-8 text-lotus" />,
      title: "Music & Performance",
      grade: "All Grades",
      description: "Musical education that develops rhythm, harmony, and performance confidence.",
      features: ["Instrumental Music", "Choir", "Music Theory", "Performance Arts"]
    }
  ];

  return (
    <section id="programs" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            Academic <span className="text-sage">Programs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our comprehensive curriculum is designed to challenge, inspire, and prepare 
            students for academic success and lifelong learning.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card 
              key={index} 
              className="card-elegant bg-card border-0 h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  {program.icon}
                  <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {program.grade}
                  </span>
                </div>
                <CardTitle className="text-xl text-charcoal">
                  {program.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {program.description}
                </p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-charcoal text-sm">Key Features:</h5>
                  <ul className="space-y-1">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-sage mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center fade-in">
          <Card className="card-elegant bg-gradient-accent text-white border-0">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
                Discover Your Child's Potential
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Schedule a consultation to learn how our programs can nurture your child's unique talents and interests.
              </p>
              <Button variant="secondary" size="lg">
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Programs;