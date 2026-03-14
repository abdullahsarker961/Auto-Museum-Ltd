import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Car as CarIcon, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { supabase } from "../lib/supabase";
import { Car } from "../types/car";

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  useEffect(() => {
    if (!loading && featuredCars.length > 0) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("opacity-100", "translate-y-0");
              entry.target.classList.remove("opacity-0", "translate-y-10");
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observerRef.current?.observe(el));
    }

    return () => observerRef.current?.disconnect();
  }, [featuredCars, loading]);

  async function fetchFeaturedCars() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('is_featured', true)
        .limit(4);

      if (error) throw error;
      setFeaturedCars(data || []);
    } catch (error) {
      console.error('Error fetching featured cars:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* SECTION 1 - HERO */}
      <section className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-pure-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://jfduxnsphhorsrnwkbvn.supabase.co/storage/v1/object/public/automuseum/assets/hero-car.png"
            alt="Hero Car"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            fetchpriority="high"
          />
        </div>
        
        {/* Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(8,8,8,0.92)] via-[rgba(8,8,8,0.70)] to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080808] to-transparent h-[40%] mt-auto"></div>
        <div className="grain-overlay z-20 opacity-30"></div>
        <div className="diagonal-red-bar z-20"></div>

        {/* Content Layout */}
        <div className="relative z-30 max-w-[1320px] mx-auto h-full px-6 md:px-12 flex items-center">
          <div className="w-full flex flex-col md:flex-row justify-between items-end pb-24 md:pb-0">
            {/* Left Column */}
            <div className="flex flex-col max-w-[600px] w-full">
              <div className="flex items-center gap-3 animate-[slideInLeft_0.6s_ease-out_0.4s_both]">
                <div className="w-[36px] h-[2px] bg-primary-red"></div>
                <span className="font-body font-semibold text-[10px] text-primary-red tracking-[4px] uppercase">
                  BANGLADESH'S PREMIER AUTO DEALERSHIP
                </span>
              </div>

              <h1 className="mt-6 font-display text-[clamp(64px,10vw,128px)] leading-[0.88] tracking-[3px] uppercase flex flex-col">
                <span className="text-white animate-[slideUpFade_0.6s_ease-out_0.5s_both]">FIND YOUR</span>
                <span className="text-primary-red drop-shadow-[0_0_40px_rgba(200,16,46,0.4)] animate-[slideUpFade_0.6s_ease-out_0.6s_both]">PERFECT</span>
                <span className="text-white animate-[slideUpFade_0.6s_ease-out_0.7s_both]">DRIVE</span>
              </h1>

              <p className="mt-8 font-serif italic text-[18px] text-[rgba(255,255,255,0.72)] leading-[1.65] max-w-[420px] animate-[fadeIn_0.8s_ease-out_0.8s_both]">
                Over 30 years of delivering Bangladesh's finest automobiles. Every brand. Every dream. One address.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-[fadeIn_0.8s_ease-out_1s_both]">
                <Link
                  to="/stock"
                  className="group bg-primary-red hover:bg-deep-red transition-colors px-[40px] py-[16px] font-body font-semibold text-[12px] text-white tracking-[2.5px] uppercase flex items-center justify-center gap-2"
                >
                  Explore Our Stock
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
                <Link
                  to="/contact"
                  className="group bg-transparent border-[1.5px] border-[rgba(255,255,255,0.40)] hover:border-white hover:bg-[rgba(255,255,255,0.06)] transition-colors px-[40px] py-[16px] font-body font-semibold text-[12px] text-white tracking-[2.5px] uppercase flex items-center justify-center"
                >
                  Contact a Dealer
                </Link>
              </div>
            </div>

            {/* Right Column (Stats) */}
            <div className="hidden md:flex flex-col items-end gap-6 pb-12">
              {[
                { num: "30", suffix: "+", label: "YEARS OF TRUST" },
                { num: "500", suffix: "+", label: "CARS DELIVERED" },
                { num: "2", suffix: "", label: "DHAKA SHOWROOMS" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-end animate-[slideUpFade_0.6s_ease-out_both]" style={{ animationDelay: `${1.2 + i * 0.15}s` }}>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[56px] text-white leading-none">{stat.num}</span>
                    <span className="font-display text-[40px] text-primary-red leading-none">{stat.suffix}</span>
                  </div>
                  <span className="font-body font-medium text-[9px] text-[rgba(255,255,255,0.45)] tracking-[3.5px] uppercase mt-1">
                    {stat.label}
                  </span>
                  {i < 2 && <div className="w-[24px] h-[2px] bg-primary-red mt-6"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30">
          <div className="w-[1px] h-[40px] bg-[rgba(255,255,255,0.3)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-white animate-[scrollDown_1.5s_infinite]"></div>
          </div>
          <span className="font-body font-light text-[9px] text-muted-text tracking-[2px] uppercase rotate-90 origin-left translate-x-[6px]">
            SCROLL
          </span>
        </div>
      </section>

      {/* SECTION 2 - LEGACY & HERITAGE */}
      <section className="relative w-full py-[120px] bg-warm-white text-off-black border-t-[3px] border-primary-red overflow-hidden">
        <div className="grain-overlay-light"></div>
        
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-20">
          {/* Left Column - Image Composition */}
          <div className="w-full lg:w-[55%] relative h-[500px] animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            {/* Primary Image */}
            <img
              src="https://automuseum.com.bd/public/medies/Nov_2021/1637138468.6194c024eac39.png"
              alt="Showroom"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[520px] h-[360px] object-cover shadow-[0_24px_64px_rgba(0,0,0,0.18)] z-10"
              referrerPolicy="no-referrer"
            />
            {/* Secondary Image */}
            <img
              src="https://automuseum.com.bd/public/medies/Nov_2021/1637139015.6194c2473518f.png"
              alt="Car Detail"
              className="absolute bottom-0 right-0 w-[60%] max-w-[280px] h-[200px] object-cover border-[2px] border-white z-20 shadow-lg"
              referrerPolicy="no-referrer"
            />
            {/* Tertiary Image */}
            <img
              src="https://automuseum.com.bd/public/medies/Nov_2021/1636967291.6192237b1e7c2.png"
              alt="Car Front"
              className="absolute top-0 left-0 w-[40%] max-w-[180px] h-[140px] object-cover border-[2px] border-white z-0 shadow-md"
              referrerPolicy="no-referrer"
            />
            {/* Red Badge */}
            <div className="absolute top-[60%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-[96px] h-[96px] rounded-full bg-primary-red z-30 flex flex-col items-center justify-center shadow-[0_0_0_6px_rgba(200,16,46,0.2)]">
              <span className="font-body font-light text-[9px] text-white tracking-[2px]">EST.</span>
              <span className="font-display text-[28px] text-white leading-none mt-1">1991</span>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-[45%] flex flex-col animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
            <div className="flex items-center gap-3">
              <div className="w-[28px] h-[2px] bg-primary-red"></div>
              <span className="font-body font-semibold text-[10px] text-primary-red tracking-[4px] uppercase">
                OUR STORY
              </span>
            </div>

            <h2 className="mt-6 font-serif font-bold italic text-[42px] text-off-black leading-[1.15] max-w-[360px]">
              Three Decades of Automotive Excellence
            </h2>

            <p className="mt-8 font-body font-light text-[15px] text-[#4A4A4A] leading-[1.8]">
              Founded in 1991, Auto Museum Ltd has grown into one of Bangladesh's most respected automotive dealerships. With access to virtually every major global brand and a reputation built over three decades, we don't just sell cars — we deliver trust.
            </p>
            <p className="mt-4 font-body font-light text-[15px] text-[#4A4A4A] leading-[1.8]">
              Our two premium showrooms in Dhaka bring the world's finest automobiles within reach, backed by a team of passionate automotive professionals dedicated to finding your perfect match.
            </p>

            <div className="w-[40px] h-[2px] bg-primary-red my-8"></div>

            <div className="flex flex-col gap-5">
              {[
                { icon: Trophy, title: "Trusted Since 1991", desc: "Over 30 years of industry excellence" },
                { icon: CarIcon, title: "Every Major Brand", desc: "From economy to ultra-luxury" },
                { icon: MapPin, title: "2 Dhaka Showrooms", desc: "Convenient locations across the city" },
              ].map((pillar, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-[36px] h-[36px] rounded-full bg-[rgba(200,16,46,0.08)] flex items-center justify-center text-primary-red shrink-0">
                    <pillar.icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body font-semibold text-[14px] text-off-black">{pillar.title}</span>
                    <span className="font-body font-light text-[12px] text-muted-dark">{pillar.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
               to="/contact"
              className="mt-10 font-body font-semibold text-[13px] text-primary-red uppercase tracking-[1px] self-start relative group"
            >
              Learn More About Us &rarr;
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3 - FEATURED VEHICLES */}
      <section className="relative w-full py-[120px] bg-[#080808] overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,transparent_49%,rgba(255,255,255,0.03)_50%,transparent_51%)] bg-[length:100%_80px]"></div>
        <div className="grain-overlay z-10"></div>

        <div className="relative z-20 max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <div className="flex items-center gap-3">
              <div className="w-[28px] h-[2px] bg-primary-red"></div>
              <span className="font-body font-semibold text-[10px] text-primary-red tracking-[4px] uppercase">
                WHAT WE OFFER
              </span>
              <div className="w-[28px] h-[2px] bg-primary-red"></div>
            </div>
            <h2 className="mt-4 font-display text-[64px] text-white tracking-[2px] uppercase">Featured Vehicles</h2>
            <p className="mt-2 font-serif italic text-[18px] text-muted-text">A curated selection from our current showroom inventory</p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
            </div>
          ) : (
            <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 pb-8 md:pb-0 hide-scrollbar snap-x snap-mandatory">
              {featuredCars.map((car, i) => (
                <Link to={`/car/${car.id}`} key={car.id} className="group relative w-[85vw] sm:w-[300px] md:w-auto shrink-0 snap-center bg-dark-card border border-[#222222] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-primary-red animate-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <img src={car.image_url} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                    <div className="absolute top-0 right-0 bg-primary-red px-2 py-1 font-mono text-[11px] text-white">
                      {car.year}
                    </div>
                  </div>
                  <div className="p-5 pb-6 flex flex-col flex-grow">
                    <h3 className="font-body font-bold text-[16px] text-white tracking-[0.5px]">{car.name}</h3>
                    <p className="font-body font-light text-[12px] text-[rgba(255,255,255,0.50)] mt-1">{car.spec}</p>
                  </div>
                  <div className="w-full py-4 text-center font-body font-semibold text-[11px] text-[rgba(255,255,255,0.30)] uppercase tracking-[2px] transition-colors group-hover:text-primary-red relative overflow-hidden">
                    <span className="relative z-10">View Details &rarr;</span>
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Row */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#222222] pt-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <span className="font-body font-normal text-[14px] text-[rgba(255,255,255,0.45)]">Showing {featuredCars.length} of our featured collection</span>
            <Link
              to="/stock"
              className="bg-primary-red hover:bg-deep-red transition-colors px-[40px] py-[16px] font-body font-semibold text-[12px] text-white tracking-[2.5px] uppercase flex items-center justify-center"
            >
              Browse Full Inventory &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
