import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import springbaseLogo from "@/assets/springbase-logo.png";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/api";
import { config } from "@/lib/config";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Academic Programs", href: "#programs" },
    { name: "Admissions", href: "#admissions" },
    { name: "Student Life", href: "#student-life" },
    { name: "Facilities", href: "#facilities" },
    { name: "Contact", href: "#contact" }
  ];

  const resources = [
    { name: "Parent Portal", href: "#" },
    { name: "Student Portal", href: "#" },
    { name: "Academic Calendar", href: "#" },
    { name: "Faculty Directory", href: "#" },
    { name: "News & Events", href: "#" },
    { name: "Alumni Network", href: "#" }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" }
  ];

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setStatus("idle");
    try {
      // Use production API or local development server
      const apiUrl = import.meta.env.DEV 
        ? "http://localhost:3001/newsletter"  // Local Express server
        : getApiUrl("/newsletter");           // Vercel API in production
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("Newsletter subscribe error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={springbaseLogo} 
                alt="Springbase Schools" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Nurturing knowledge and greatness in every student. 
              Where education blooms like the lotus flower.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-sage" />
                <a href={`tel:${config.contact.phone}`} className="text-sm underline hover:text-sage">
                  {config.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-sage" />
                <a href={`mailto:${config.contact.email}`} className="text-sm underline hover:text-sage">
                  {config.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-sage" />
                <span className="text-sm">{config.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sage">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-sage transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sage">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href}
                    className="text-gray-300 hover:text-sage transition-colors duration-200 text-sm"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sage">Connect With Us</h4>
            <p className="text-gray-300 text-sm mb-4">
              Follow us on social media for updates and community news.
            </p>
            
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-sage flex items-center justify-center transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h5 className="text-md font-semibold mb-3">Subscribe to our Newsletter</h5>
              {status === "success" && (
                <div className="mb-3 p-2 rounded bg-green-600/20 border border-green-600/30 text-sm text-green-200">
                  Subscribed! We'll keep you updated.
                </div>
              )}
              {status === "error" && (
                <div className="mb-3 p-2 rounded bg-red-600/20 border border-red-600/30 text-sm text-red-200">
                  Subscription failed. Please try again.
                </div>
              )}
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-gray-600 placeholder:text-gray-400 text-white"
                />
                <Button type="submit" disabled={submitting} className="bg-sage hover:bg-sage/90 text-charcoal">
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2024 Springbase Schools. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-sage transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-sage transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-sage transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm italic">
              "Where Knowledge and Greatness Bloom Together"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;