import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Latest", path: "/latest" },
    { name: "Stock", path: "/stock" },
    { name: "Car Loan", path: "/car-loan" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t-[3px] border-primary-red pt-[80px] pb-[40px]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-8 justify-between">
        {/* Zone 1 - Brand */}
        <div className="w-full md:w-[30%] flex flex-col gap-6">
          <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-primary-red p-[2px]">
            <img
              src="https://i.postimg.cc/d0FDszNB/385062212-652334050376069-3556089748070402529-n.jpg"
              alt="Auto Museum Ltd Logo"
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="font-display text-[24px] text-white tracking-widest">AUTO MUSEUM LTD</h2>
          <p className="font-serif italic text-[15px] text-muted-text leading-relaxed">
            Bangladesh's Most Trusted Dealership Since 1991
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/automuseumltd.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[32px] h-[32px] bg-[#1E1E1E] flex items-center justify-center text-white hover:text-primary-red transition-colors"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/automuseumltd.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[32px] h-[32px] bg-[#1E1E1E] flex items-center justify-center text-white hover:text-primary-red transition-colors"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Zone 2 - Quick Links */}
        <div className="w-full md:w-[25%] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-body font-semibold text-[10px] text-primary-red tracking-[3px] uppercase">QUICK LINKS</h3>
            <div className="w-[24px] h-[2px] bg-primary-red"></div>
          </div>
          <div className="flex flex-col gap-[14px]">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-body font-normal text-[13px] text-[rgba(255,255,255,0.55)] hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Zone 3 - Contact */}
        <div className="w-full md:w-[45%] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-body font-semibold text-[10px] text-primary-red tracking-[3px] uppercase">FIND US</h3>
            <div className="w-[24px] h-[2px] bg-primary-red"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Showroom 1 */}
            <div className="flex-1 bg-dark-card p-4 border border-mid-grey flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-red"></div>
                <span className="font-body font-semibold text-[11px] text-white tracking-widest uppercase">Showroom 01</span>
              </div>
              <p className="font-body font-light text-[12px] text-muted-dark leading-relaxed">
                Gulshan Avenue, Dhaka
              </p>
              <a
                href="https://www.google.com/maps?ll=23.790523,90.418335&z=14&t=m&hl=en&gl=BD&mapclient=embed&cid=16536600622970778598"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-medium text-[12px] text-primary-red hover:underline mt-auto"
              >
                Get Directions &rarr;
              </a>
            </div>
            {/* Showroom 2 */}
            <div className="flex-1 bg-dark-card p-4 border border-mid-grey flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-red"></div>
                <span className="font-body font-semibold text-[11px] text-white tracking-widest uppercase">Showroom 02</span>
              </div>
              <p className="font-body font-light text-[12px] text-muted-dark leading-relaxed">
                Baridhara, Dhaka
              </p>
              <a
                href="https://www.google.com/maps/place/Auto+Museum+Ltd/@23.805185,90.422193,14z/data=!4m6!3m5!1s0x3755c7adf7e1e3cb:0xd0b90c0d5acf9c18!8m2!3d23.8051848!4d90.4221931!16s%2Fg%2F11cmx59ygm?hl=en&entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-medium text-[12px] text-primary-red hover:underline mt-auto"
              >
                Get Directions &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Strip */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 mt-[60px] pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-body font-light text-[11px] text-[rgba(255,255,255,0.35)] tracking-[0.5px]">
          &copy; 2024 Auto Museum Ltd. All Rights Reserved.
        </p>
        <p className="font-body font-light text-[11px] text-[rgba(255,255,255,0.35)] tracking-[0.5px]">
          Designed with precision in Dhaka, Bangladesh
        </p>
      </div>
    </footer>
  );
}
