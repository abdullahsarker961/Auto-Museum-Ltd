import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Car } from "../types/car";

export default function Latest() {
  const [showBanner, setShowBanner] = useState(true);
  const [latestCars, setLatestCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestCars();
  }, []);

  async function fetchLatestCars() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('is_latest', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLatestCars(data || []);
    } catch (error) {
      console.error('Error fetching latest cars:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col bg-light-grey min-h-screen">
      {/* Top Announcement Banner */}
      {showBanner && (
        <div className="bg-primary-red h-[40px] flex items-center justify-center relative px-4 z-40">
          <span className="font-body font-medium text-[12px] text-white text-center">
            🚗 New arrivals every week — Check our latest stock
          </span>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-4 text-white hover:text-black transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Page Hero Banner */}
      <section className="bg-pure-black h-[280px] flex flex-col justify-end pb-12 px-6 md:px-12 relative">
        <div className="grain-overlay"></div>
        <div className="max-w-[1320px] mx-auto w-full relative z-10 flex flex-col items-start">
          <div className="flex items-center gap-3">
            <div className="w-[28px] h-[2px] bg-primary-red"></div>
            <span className="font-body font-semibold text-[10px] text-primary-red tracking-[4px] uppercase">
              NEWS & UPDATES
            </span>
          </div>
          <h1 className="mt-4 font-display text-[72px] text-white tracking-[2px] uppercase leading-none">
            LATEST FROM AUTO MUSEUM
          </h1>
          <p className="mt-2 font-serif italic text-[18px] text-muted-text">
            Stay updated with our newest arrivals and dealership news
          </p>
        </div>
      </section>

      {/* Section 1 - Featured Latest Arrival */}
      {latestCars.length > 0 && (
        <section className="py-[120px] px-6 md:px-12 max-w-[1320px] mx-auto w-full">
          <div className="flex flex-col md:flex-row w-full bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[#E5E5E5]">
            {/* Left 50% - Image */}
            <Link to={`/car/${latestCars[0].id}`} className="w-full md:w-1/2 relative h-[300px] md:h-auto min-h-[400px] block group">
              <img 
                src={latestCars[0].image_url} 
                alt={latestCars[0].name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-0 left-0 bg-primary-red px-4 py-2 z-10">
                <span className="font-body font-semibold text-[10px] text-white tracking-[2px] uppercase">NEW ARRIVAL</span>
              </div>
            </Link>
            
            {/* Right 50% - Content */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <span className="font-body font-light text-[12px] text-[#6B6B6B] tracking-[2px] uppercase">
                {new Date(latestCars[0].created_at).toLocaleDateString()}
              </span>
              <Link to={`/car/${latestCars[0].id}`}>
                <h2 className="mt-4 font-serif font-bold text-[32px] text-black leading-[1.2] hover:text-primary-red transition-colors">
                  {latestCars[0].name}
                </h2>
              </Link>
              <p className="mt-6 font-body font-light text-[14px] text-[#555] leading-[1.75]">
                {latestCars[0].spec} - Explore the pinnacle of automotive excellence with our newest entry. {latestCars[0].description?.substring(0, 150)}...
              </p>
              <Link to={`/car/${latestCars[0].id}`} className="mt-8 font-body font-semibold text-[13px] text-primary-red uppercase tracking-[1px] self-start relative group">
                View Vehicle &rarr;
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Section 2 - Remaining Latest Cars */}
      {latestCars.slice(1).length > 0 && (
        <section className="pb-[120px] px-6 md:px-12 max-w-[1320px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestCars.slice(1).map((car, i) => (
              <div key={car.id} className="group bg-white border-b border-[#EEEEEE] flex flex-col transition-all duration-300 hover:-translate-y-[6px] hover:shadow-xl relative">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-primary-red scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 z-10"></div>
                
                <Link to={`/car/${car.id}`} className="relative w-full h-[200px] overflow-hidden block">
                  <img src={car.image_url} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-0 left-0 bg-primary-red px-3 py-1.5">
                    <span className="font-body font-semibold text-[9px] text-white tracking-[2px] uppercase">NEW ARRIVAL</span>
                  </div>
                </Link>
                
                <div className="p-6 flex flex-col flex-grow">
                  <span className="font-body font-light text-[11px] text-muted-dark tracking-[1px] uppercase">
                    {new Date(car.created_at).toLocaleDateString()}
                  </span>
                  <Link to={`/car/${car.id}`}>
                    <h3 className="mt-3 font-body font-semibold text-[16px] text-black leading-[1.4] hover:text-primary-red transition-colors">{car.name}</h3>
                  </Link>
                  <p className="mt-3 font-body font-light text-[13px] text-[#666] leading-[1.6] line-clamp-2">{car.spec}</p>
                  
                  <Link to={`/car/${car.id}`} className="mt-6 font-body font-semibold text-[12px] text-primary-red uppercase tracking-[1px] self-start group/link">
                    View Vehicle &rarr;
                    <span className="block h-[1px] w-0 bg-primary-red transition-all duration-300 group-hover/link:w-full mt-1"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {loading && latestCars.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
        </div>
      )}

      {!loading && latestCars.length === 0 && (
        <div className="text-center py-20">
          <p className="font-body text-[18px] text-[#888]">No new arrivals at the moment.</p>
        </div>
      )}
    </div>
  );
}
