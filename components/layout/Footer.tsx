import Link from "next/link";
import { 
  HeartPulse, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ExternalLink
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Procedures", href: "/procedures" },
      { name: "Hospitals", href: "/hospitals" },
      { name: "Doctors", href: "/doctors" },
      { name: "Accommodations", href: "/accommodations" },
      { name: "Ayurveda Care", href: "/procedures?category=ayurveda" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "How it Works", href: "/about#how-it-works" },
      { name: "Our Network", href: "/hospitals" },
      { name: "Patient Stories", href: "/about#testimonials" },
      { name: "Contact Us", href: "/contact" },
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Medical Disclaimer", href: "/disclaimer" },
      { name: "Visa Assistance", href: "/visa-info" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-white border-t border-border overflow-hidden pt-16">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Section: CTA / Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-border mb-16">
          <div className="max-w-md">
            <h3 className="font-display text-2xl font-bold mb-4">Start your wellness journey today</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of patients who have found excellence in medical care through Bharat Care.
            </p>
            <Link 
              href="/planner" 
              className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              <span>Build My Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-muted p-8 rounded-3xl relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-display font-semibold text-lg mb-2">Subscribe to our newsletter</h4>
              <p className="text-sm text-muted-foreground mb-6">Stay updated with the latest medical advancements and packages in India.</p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="grow bg-white border border-border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-foreground text-background px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all whitespace-nowrap"
                >
                  Join Now
                </button>
              </form>
            </div>
            {/* Subtle card animation background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-700" />
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Bharat<span className="text-primary font-extrabold">Care</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              India's premier medical tourism facilitator, connecting international patients with world-class healthcare, expert surgeons, and luxury recovery experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6 text-foreground/80">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                    <span>{link.name}</span>
                    <ArrowRight className="w-0 h-3 ml-1 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6 text-foreground/80">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                    <span>{link.name}</span>
                    <ArrowRight className="w-0 h-3 ml-1 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6 text-foreground/80">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-muted-foreground group cursor-default">
                <MapPin className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>123 Medical Hub, Cyber City,<br />Gurugram, HR 122002, India</span>
              </li>
              <li>
                <a href="mailto:hello@bharatcare.in" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group">
                  <Mail className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span>hello@bharatcare.in</span>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group">
                  <Phone className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91-98765-43210</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-2 md:space-y-0">
            <p>© {currentYear} Bharat Care Facilitation Pvt Ltd. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              {footerLinks.support.slice(1, 3).map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center text-xs space-x-1 font-medium bg-muted px-3 py-1.5 rounded-full">
            <span>Designed with</span>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mx-1" />
            <span>in India for the World</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
