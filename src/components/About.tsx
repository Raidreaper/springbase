import { Flower, Target, Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: <Flower className="h-8 w-8 text-lotus" />,
      title: "Growth & Development",
      description: "Like the lotus flower, we believe every student has the potential to rise and bloom into greatness."
    },
    {
      icon: <Target className="h-8 w-8 text-sage" />,
      title: "Academic Excellence",
      description: "We maintain the highest standards of education, ensuring every student achieves their full potential."
    },
    {
      icon: <Heart className="h-8 w-8 text-lotus" />,
      title: "Nurturing Environment",
      description: "Our caring community supports each student's emotional, social, and intellectual development."
    },
    {
      icon: <Star className="h-8 w-8 text-sage" />,
      title: "Character Building",
      description: "We instill values of integrity, respect, and responsibility that last a lifetime."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            About <span className="text-sage">Springbase</span> Schools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded on the principle that every child deserves the opportunity to flourish, 
            Springbase Schools has been nurturing young minds for over two decades.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16 slide-up">
          <Card className="card-elegant bg-card border-0">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full lotus-gradient flex items-center justify-center">
                <Flower className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-charcoal mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To cultivate an environment where knowledge and greatness flourish together, 
                empowering students to become confident, compassionate, and capable leaders 
                who positively impact their communities and the world.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="card-elegant bg-card border-0 text-center h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-charcoal mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-16 text-center fade-in">
          <blockquote className="text-2xl lg:text-3xl font-heading font-medium text-charcoal italic max-w-4xl mx-auto">
            "Just as the lotus rises from muddy waters to bloom in pure beauty, 
            we help our students overcome challenges and reach their highest potential."
          </blockquote>
          <cite className="block mt-4 text-sage font-semibold">
            — Springbase Schools Philosophy
          </cite>
        </div>
      </div>
    </section>
  );
};

export default About;