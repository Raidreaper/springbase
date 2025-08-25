import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "(555) 123-4567",
      secondary: "Admissions: (555) 123-4568"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "info@springbaseschools.edu",
      secondary: "admissions@springbaseschools.edu"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: "123 Education Drive",
      secondary: "Spring Valley, CA 90210"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Office Hours",
      details: "Monday - Friday: 8:00 AM - 5:00 PM",
      secondary: "Saturday: 9:00 AM - 2:00 PM"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            Get in <span className="text-sage">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Contact us to learn more about Springbase Schools 
            or to schedule a visit to our campus.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="slide-up">
            <h3 className="text-3xl font-heading font-bold text-charcoal mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="card-elegant bg-card border-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center text-sage">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal mb-1">
                          {info.title}
                        </h4>
                        <p className="text-muted-foreground">{info.details}</p>
                        {info.secondary && (
                          <p className="text-muted-foreground text-sm mt-1">
                            {info.secondary}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="card-elegant bg-card border-0">
              <CardContent className="p-6">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-sage/20 to-lotus/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-sage mx-auto mb-3" />
                    <h4 className="font-semibold text-charcoal mb-2">
                      Visit Our Campus
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Interactive map coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="fade-in">
            <Card className="card-elegant bg-card border-0">
              <CardHeader>
                <CardTitle className="text-3xl font-heading font-bold text-charcoal">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        First Name
                      </label>
                      <Input placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Email Address
                    </label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Phone Number
                    </label>
                    <Input type="tel" placeholder="(555) 123-4567" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Student Grade Level (if applicable)
                    </label>
                    <Input placeholder="e.g., Pre-K, Grade 3, Grade 8" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your interest in Springbase Schools..."
                      rows={5}
                    />
                  </div>
                  
                  <Button className="w-full accent-gradient text-white" size="lg">
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
                
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground text-center">
                    We typically respond to inquiries within 24 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;