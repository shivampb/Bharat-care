import { HeartPulse } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <HeartPulse className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              Bharat<span className="text-primary"> Care</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} Bharat Care. Excellence in Medical Travel.
          </p>
        </div>
      </div>
    </footer>
  );
}
