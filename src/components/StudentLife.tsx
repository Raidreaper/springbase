import { Trophy, Music, Palette, Users, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ImageModal from "@/components/ImageModal";

const StudentLife = () => {
  const activities = [
    {
      icon: <Trophy className="h-8 w-8 text-lotus" />,
      title: "Sports & Athletics",
      description: "Competitive teams and recreational sports promoting teamwork, discipline, and physical fitness.",
      highlights: ["Soccer", "Basketball", "Swimming", "Track & Field"]
    },
    {
      icon: <Music className="h-8 w-8 text-sage" />,
      title: "Performing Arts",
      description: "Music, theater, and dance programs that build confidence and creative expression.",
      highlights: ["Special Music Class", "Music & Drama", "Choir", "Ballet"]
    },
    {
      icon: <Palette className="h-8 w-8 text-lotus" />,
      title: "Creative Arts",
      description: "Visual arts programs fostering creativity and artistic skills across various mediums.",
      highlights: ["Colour Day", "Art Studio", "Photography", "Digital Design"]
    },
    {
      icon: <Users className="h-8 w-8 text-sage" />,
      title: "Student Leadership",
      description: "Opportunities to develop leadership skills through student government and peer programs.",
      highlights: ["Etiquette (Teaching)", "Student Council", "Peer Mentoring", "Class Representatives"]
    },
    {
      icon: <Globe className="h-8 w-8 text-lotus" />,
      title: "Community Service",
      description: "Programs that instill civic responsibility and compassion for others.",
      highlights: ["Local Volunteering", "Environmental Projects", "Charity Drives", "Community Gardens"]
    },
    {
      icon: <Heart className="h-8 w-8 text-sage" />,
      title: "Wellness Programs",
      description: "Supporting student mental health and well-being through comprehensive wellness initiatives.",
      highlights: ["Mindfulness Training", "Peer Support", "Counseling Services", "Stress Management"]
    }
  ];

  const achievements = [
    { metric: "15+", label: "Clubs & Organizations" },
    { metric: "8", label: "Sports Teams" },
    { metric: "95%", label: "Student Participation" },
    { metric: "12", label: "Annual Events" }
  ];

  return (
    <section id="student-life" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            Vibrant <span className="text-sage">Student Life</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Beyond academics, we offer a rich tapestry of activities and programs 
            that help students discover their passions and develop lifelong friendships.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {activities.map((activity, index) => (
            <Card 
              key={index} 
              className="card-elegant bg-card border-0 h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {activity.description}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-charcoal text-sm mb-2">Highlights:</h5>
                  <div className="flex flex-wrap gap-2">
                    {activity.highlights.map((highlight, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="slide-up">
          <Card className="card-elegant bg-card border-0">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-heading font-bold text-charcoal mb-4">
                  Student Life by the Numbers
                </h3>
                <p className="text-muted-foreground">
                  Our vibrant community offers countless opportunities for growth and engagement
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className="text-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-sage mb-2">
                      {achievement.metric}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Gallery Section */}
        <div className="mt-16 fade-in">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-charcoal mb-4">
              Our <span className="text-sage">Student Community</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See our students in action - learning, collaborating, and growing together in our vibrant school community.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {/* Student Group Photos */}
            <ImageModal
              src="/images/WhatsApp Image 2025-09-04 at 11.43.01.jpeg"
              alt="Student group photo"
              title="Student Community"
              description="Our vibrant student community showcasing diversity and unity"
              className="overflow-hidden rounded-xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-04 at 11.43.01.jpeg" 
                alt="Student group photo" 
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
            
            <ImageModal
              src="/images/WhatsApp Image 2025-09-04 at 11.42.59.jpeg"
              alt="Students in uniform"
              title="School Uniforms"
              description="Students proudly wearing their school uniforms, representing our values"
              className="overflow-hidden rounded-xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-04 at 11.42.59.jpeg" 
                alt="Students in uniform" 
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
            
            <ImageModal
              src="/images/WhatsApp Image 2025-09-04 at 11.42.58.jpeg"
              alt="Student group"
              title="Student Groups"
              description="Students working together in various group activities"
              className="overflow-hidden rounded-xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-04 at 11.42.58.jpeg" 
                alt="Student group" 
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
            
            <ImageModal
              src="/images/WhatsApp Image 2025-09-04 at 11.43.00.jpeg"
              alt="Students studying together"
              title="Study Sessions"
              description="Collaborative learning and peer-to-peer education"
              className="overflow-hidden rounded-xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-04 at 11.43.00.jpeg" 
                alt="Students studying together" 
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
            
            {/* Collaborative Study Images */}
            <ImageModal
              src="/images/WhatsApp Image 2025-09-04 at 08.58.31.jpeg"
              alt="Students studying collaboratively"
              title="Collaborative Learning"
              description="Students engaged in hands-on collaborative study sessions"
              className="overflow-hidden rounded-xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-04 at 08.58.31.jpeg" 
                alt="Students studying collaboratively" 
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
            
            <ImageModal
              src="/images/WhatsApp Image 2025-09-04 at 11.02.55.jpeg"
              alt="Students in study group"
              title="Study Groups"
              description="Organized study groups promoting peer learning"
              className="overflow-hidden rounded-xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-04 at 11.02.55.jpeg" 
                alt="Students in study group" 
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
            
            <ImageModal
              src="/images/WhatsApp Image 2025-09-04 at 11.02.56.jpeg"
              alt="Students working together"
              title="Teamwork"
              description="Students developing teamwork skills through collaborative projects"
              className="overflow-hidden rounded-xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-04 at 11.02.56.jpeg" 
                alt="Students working together" 
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
            
            <ImageModal
              src="/images/WhatsApp Image 2025-09-04 at 11.43.01 (1).jpeg"
              alt="Student community"
              title="School Community"
              description="Our diverse and inclusive school community"
              className="overflow-hidden rounded-xl"
            >
              <img 
                src="/images/WhatsApp Image 2025-09-04 at 11.43.01 (1).jpeg" 
                alt="Student community" 
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
            </ImageModal>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 fade-in">
          <Card className="card-elegant bg-gradient-accent text-white border-0">
            <CardContent className="p-8 lg:p-12 text-center">
              <blockquote className="text-2xl lg:text-3xl font-heading font-medium italic mb-6">
                "The extracurricular programs at Springbase have helped me discover my passion 
                for music and develop leadership skills I never knew I had."
              </blockquote>
              <cite className="block text-lg font-semibold opacity-90">
                — Sarah Chen, Student Council President
              </cite>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StudentLife;