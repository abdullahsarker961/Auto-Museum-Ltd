import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { supabase } from "../lib/supabase";
import { Car } from "../types/car";

export default function Stock() {
  const [activeBodyType, setActiveBodyType] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const bodyTypes = ["All", "Sedan", "SUV", "Hatchback", "MPV", "Luxury"];

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCars = activeBodyType === "All" 
    ? cars 
    : cars.filter(car => car.body_type === activeBodyType);

  return (
    <div className="flex flex-col bg-light-grey min-h-screen">
      {/* Sticky Filter Bar */}
      <div className="sticky top-[72px] z-40 bg-white border-b border-[#E0E0E0] shadow-sm">
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 h-[64px] flex items-center justify-between">
          
          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-6">
            <select className="font-body font-medium text-[13px] text-black bg-transparent border-none outline-none cursor-pointer">
              <option value="">Brand</option>
              <option value="mercedes">Mercedes-Benz</option>
              <option value="bmw">BMW</option>
              <option value="audi">Audi</option>
            </select>
            
            <select className="font-body font-medium text-[13px] text-black bg-transparent border-none outline-none cursor-pointer">
              <option value="">Year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>

            <div className="flex items-center gap-2">
              <span className="font-body font-medium text-[13px] text-black">Price Range</span>
              <input type="range" min="0" max="100" className="w-[100px] accent-primary-red" />
            </div>

            <div className="w-[1px] h-[24px] bg-[#E0E0E0] mx-2"></div>

            <div className="flex items-center gap-2">
              {bodyTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveBodyType(type)}
                  className={clsx(
                    "px-3 py-1.5 rounded-full font-body font-medium text-[12px] transition-colors",
                    activeBodyType === type ? "bg-primary-red text-white" : "bg-[#F2F2F2] text-[#666] hover:bg-[#E0E0E0]"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden font-body font-semibold text-[13px] text-black flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filters
          </button>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <span className="font-body font-light text-[13px] text-[#888]">Showing {filteredCars.length} results</span>
            <button className="hidden md:block font-body font-medium text-[12px] text-primary-red hover:underline">Clear All</button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden flex flex-col justify-end">
          <div className="bg-white p-6 rounded-t-2xl flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="font-body font-bold text-[18px]">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="text-black font-bold">✕</button>
            </div>
            
            <div className="flex flex-col gap-4">
              <select className="w-full p-3 border border-[#E0E0E0] rounded-lg font-body text-[14px]">
                <option value="">Brand</option>
              </select>
              <select className="w-full p-3 border border-[#E0E0E0] rounded-lg font-body text-[14px]">
                <option value="">Year</option>
              </select>
              <div className="flex flex-wrap gap-2">
                {bodyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveBodyType(type)}
                    className={clsx(
                      "px-4 py-2 rounded-full font-body font-medium text-[13px] transition-colors",
                      activeBodyType === type ? "bg-primary-red text-white" : "bg-[#F2F2F2] text-[#666]"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-primary-red text-white py-3 font-body font-semibold text-[14px] uppercase tracking-[1px]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Stock Grid */}
      <section className="py-[60px] px-6 md:px-12 max-w-[1320px] mx-auto w-full">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-[18px] text-[#888]">No vehicles found in stock.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredCars.map((car, i) => (
              <div key={car.id} className="group bg-white border border-[#E8E8E8] flex flex-col transition-all duration-300 hover:shadow-xl hover:border-t-primary-red border-t-[3px] border-t-transparent relative">
                <Link to={`/car/${car.id}`} className="relative w-full h-[220px] overflow-hidden block">
                  <img src={car.image_url} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute top-0 right-0 bg-primary-red px-3 py-1.5 font-mono text-[12px] text-white font-bold">
                    {car.year}
                  </div>
                </Link>
                
                <div className="p-6 flex flex-col flex-grow">
                  <Link to={`/car/${car.id}`}>
                    <h3 className="font-body font-bold text-[15px] text-black tracking-[0.5px] hover:text-primary-red transition-colors">{car.name}</h3>
                  </Link>
                  <p className="font-body font-light text-[12px] text-[#888] mt-2">{car.spec}</p>
                  <p className="font-mono text-[18px] text-primary-red mt-4 font-bold">{car.price}</p>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link to={`/car/${car.id}`} className="flex-1 py-3 text-center border border-primary-red text-primary-red font-body font-semibold text-[11px] uppercase tracking-[1px] hover:bg-primary-red hover:text-white transition-colors">
                      View Details
                    </Link>
                    <Link to="/contact" className="flex-1 py-3 text-center bg-primary-red text-white font-body font-semibold text-[11px] uppercase tracking-[1px] hover:bg-deep-red transition-colors">
                      Enquire Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
