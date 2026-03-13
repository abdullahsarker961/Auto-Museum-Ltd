import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Latest", path: "/latest" },
    { name: "Stock", path: "/stock" },
    { name: "Explore", path: "#" },
    { name: "Car Loan", path: "/car-loan" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[72px] z-[100] bg-[#222222] border-b border-[rgba(255,255,255,0.07)]">
        <div className="max-w-[1320px] mx-auto pl-6 md:pl-12 pr-6 md:pr-12 h-full flex items-center justify-between">
          {/* Left Zone - Logo Block */}
          <Link to="/" className="flex items-center gap-[14px]">
            <div className="w-[42px] h-[42px] rounded-full border-2 border-primary-red p-[2px]">
              <img
                src="https://i.postimg.cc/d0FDszNB/385062212-652334050376069-3556089748070402529-n.jpg"
                alt="Auto Museum Ltd Logo"
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[18px] text-white tracking-[3px] leading-none">AUTO MUSEUM LTD</span>
              <span className="font-body font-medium text-[9px] text-primary-red tracking-[4px] uppercase mt-1 leading-none">EST. 1991</span>
            </div>
          </Link>

          {/* Center Zone - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-[32px] ml-auto mr-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "nav-link font-body font-medium text-[12px] tracking-[1.8px] uppercase",
                  location.pathname === link.path ? "text-primary-red active" : "text-[rgba(255,255,255,0.60)] hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Zone - Social Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://www.facebook.com/automuseumltd.official" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.60)] hover:text-primary-red transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/automuseumltd.official/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.60)] hover:text-primary-red transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-pure-black flex flex-col items-center justify-center gap-8 md:hidden pt-[72px]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={clsx(
                "font-display text-4xl tracking-widest uppercase",
                location.pathname === link.path ? "text-primary-red" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 bg-primary-red px-8 py-4 font-body font-semibold text-sm tracking-[2.5px] uppercase text-white"
          >
            Book a Visit
          </Link>
        </div>
      )}
    </>
  );
}
