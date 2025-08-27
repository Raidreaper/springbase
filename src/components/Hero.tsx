import { ArrowRight, Award, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import springbaseLogo from "@/assets/springbase-logo.png";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen hero-gradient flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <div className="flex items-center space-x-3 mb-6">
              
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-charcoal mb-6 leading-tight">
              Where
              <span className="text-sage block">Knowledge</span>
              Meets
              <span className="text-lotus block">Greatness</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Springbase School, Okota, is a life‑training center and citadel of academic excellence. 
              We instill godliness, care, respect, creativity, excellence, and leadership responsibility—
              ensuring a smooth transition from home to school and a joyful journey to greatness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="accent-gradient text-white" onClick={() => (window.location.href = '/programs')}>
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-gray-500 hover:bg-gray-600 text-white border-gray-500 hover:border-gray-600"
                onClick={() => window.location.href = '/schedule-tour'}
              >
                Schedule a Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-6 w-6 text-lotus" />
                </div>
                <div className="text-2xl font-bold text-charcoal">95%</div>
                <div className="text-sm text-muted-foreground">Excellence Rate</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-6 w-6 text-sage" />
                </div>
                <div className="text-2xl font-bold text-charcoal">500+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-lotus" />
                </div>
                <div className="text-2xl font-bold text-charcoal">15+</div>
                <div className="text-sm text-muted-foreground">Programs</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="slide-up lg:pl-12">
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-sage/20 to-lotus/20 p-8 card-elegant">
                <div className="h-full rounded-2xl bg-card flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-accent flex items-center justify-center">
                      <img 
                        src={springbaseLogo} 
                        alt="Springbase Logo" 
                        className="h-16 w-auto"
                      />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-2">
                      Excellence in Education
                    </h3>
                    <p className="text-muted-foreground">
                      Cultivating knowledge and greatness in every student
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full lotus-gradient opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-sage/20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;