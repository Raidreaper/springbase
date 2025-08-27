import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Map from "./Map";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: (
        <a href="tel:+2347010821938" className="underline text-sage hover:text-sage/80">
          0701 082 1938
        </a>
      ),
      secondary: (
        <a href="tel:+2347010821938" className="underline text-sage hover:text-sage/80">
          Admissions: 0701 082 1938
        </a>
      )
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: (
        <a href="mailto:info@springbase.com.ng" className="underline text-sage hover:text-sage/80">
          info@springbase.com.ng
        </a>
      )
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: "21 Canal View Off Community Road Ago",
      secondary: "Okota Lagos, Lagos State"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Office Hours",
      details: "Monday - Friday: 8:00 AM - 5:00 PM",
      secondary: "Saturday: 9:00 AM - 2:00 PM"
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      // Validate required fields
      if (!payload.firstName || !payload.email || !payload.message) {
        throw new Error("Please fill in all required fields");
      }

      const { getApiUrl } = await import("@/lib/api");
      const res = await fetch(getApiUrl('/contact'), { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
      }

      form.reset();
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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

            {/* Interactive Map */}
            <Map />
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
                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-green-800 text-center font-medium">
                      ✓ Message sent successfully! We will get back to you shortly.
                    </p>
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-red-800 text-center font-medium">
                      ✗ Failed to send message. Please try again or contact us directly.
                    </p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        First Name *
                      </label>
                      <Input name="firstName" placeholder="Your first name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Last Name
                      </label>
                      <Input name="lastName" placeholder="Your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Email Address *
                    </label>
                    <Input name="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Phone Number
                    </label>
                    <Input name="phone" type="tel" placeholder="0701 082 1938" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Student Grade Level (if applicable)
                    </label>
                    <Input name="gradeLevel" placeholder="e.g., Pre-K, Grade 3, Grade 8" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Message *
                    </label>
                    <Textarea 
                      name="message"
                      placeholder="Tell us about your interest in Springbase Schools..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full accent-gradient text-white" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground text-center">
                    We typically respond to inquiries within 24 hours during business days.
                  </p>
                </div>
                
                {/* Schedule Campus Tour Button */}
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    className="bg-gray-500 hover:bg-gray-600 text-white border-gray-500 hover:border-gray-600"
                    onClick={() => window.location.href = '/schedule-tour'}
                  >
                    Schedule Campus Tour
                  </Button>
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