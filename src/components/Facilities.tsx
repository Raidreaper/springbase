import { Building, FlaskConical, Computer, TreePine, Utensils, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Facilities = () => {
  const facilities = [
    {
      icon: <Building className="h-8 w-8 text-sage" />,
      title: "Modern Classrooms",
      description: "State-of-the-art learning spaces equipped with interactive technology and comfortable furniture designed for collaborative learning."
    },
    {
      icon: <FlaskConical className="h-8 w-8 text-lotus" />,
      title: "Science Laboratories",
      description: "Fully equipped labs for chemistry, biology, and physics experiments, fostering hands-on scientific discovery."
    },
    {
      icon: <Computer className="h-8 w-8 text-sage" />,
      title: "Technology Center",
      description: "Advanced computer labs with latest software and hardware, preparing students for the digital future."
    },
    {
      icon: <TreePine className="h-8 w-8 text-lotus" />,
      title: "Outdoor Learning Spaces",
      description: "Beautiful gardens and outdoor classrooms that connect students with nature and provide fresh-air learning opportunities."
    },
    {
      icon: <Utensils className="h-8 w-8 text-sage" />,
      title: "Dining Hall",
      description: "Spacious cafeteria serving nutritious, freshly prepared meals with options for various dietary requirements."
    },
    {
      icon: <Heart className="h-8 w-8 text-lotus" />,
      title: "Wellness Center",
      description: "Dedicated space for student health services, counseling, and wellness programs promoting mental and physical well-being."
    }
  ];

  return (
    <section id="facilities" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            World-Class <span className="text-sage">Facilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our campus provides an inspiring environment where students can learn, grow, 
            and thrive in comfort and safety.
          </p>
        </div>

        {/* Main Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <Card 
              key={index} 
              className="card-elegant bg-card border-0 text-center h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {facility.icon}
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {facility.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {facility.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="slide-up">
            <h3 className="text-3xl font-heading font-bold text-charcoal mb-6">
              A Campus Designed for <span className="text-sage">Excellence</span>
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Every aspect of our campus has been thoughtfully designed to support 
                student learning and well-being. From natural lighting in every classroom 
                to eco-friendly building materials, we've created an environment that 
                reflects our commitment to sustainability and student success.
              </p>
              <p className="leading-relaxed">
                Our facilities are regularly updated with the latest educational technology 
                and learning tools, ensuring that our students have access to the resources 
                they need to excel in their studies and prepare for their future careers.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-sage mb-2">25,000</div>
                <div className="text-sm text-muted-foreground">Square Feet</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lotus mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Eco-Friendly</div>
              </div>
            </div>
          </div>

          <div className="fade-in">
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-sage/20 to-lotus/20 p-6 card-elegant">
                <div className="h-full rounded-xl bg-card flex items-center justify-center">
                  <div className="text-center">
                    <Building className="h-16 w-16 text-sage mx-auto mb-4" />
                    <h4 className="text-2xl font-heading font-bold text-charcoal mb-2">
                      Take a Virtual Tour
                    </h4>
                    <p className="text-muted-foreground">
                      Explore our beautiful campus from anywhere
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-lotus/20 animate-pulse"></div>
              <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-sage/20 animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;