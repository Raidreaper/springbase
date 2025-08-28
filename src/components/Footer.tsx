import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import springbaseLogo from "@/assets/springbase-logo.png";

const Footer = () => {
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
                <a href="tel:+2347010821938" className="text-sm underline hover:text-sage">
                  0701 082 1938
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-sage" />
                <a href="mailto:info@springbase.com.ng" className="text-sm underline hover:text-sage">
                  info@springbase.com.ng
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-sage" />
                <span className="text-sm">21 Canal View Off Community Road Ago, Okota Lagos</span>
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