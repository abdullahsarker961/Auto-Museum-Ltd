import { useParams, Link } from "react-router-dom";
import { Facebook, Instagram, Phone, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Car } from "../types/car";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  useEffect(() => {
    if (car) {
      setActiveImage(car.image_url);
    }
  }, [car]);

  async function fetchCar() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCar(data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#F5F5F5] gap-4">
        <p className="font-body text-[18px] text-[#888]">Vehicle not found.</p>
        <Link to="/stock" className="text-primary-red hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Stock
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen pt-[72px]">
      <div className="max-w-[1320px] mx-auto w-full px-6 md:px-12 py-12">
        <Link to="/stock" className="text-[#666] hover:text-primary-red transition-colors flex items-center gap-2 mb-8 uppercase font-body font-bold text-[12px] tracking-[1px]">
          <ArrowLeft size={16} /> Back to Stock
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Images */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden shadow-lg border border-[#E5E5E5]">
              <img 
                src={activeImage || car.image_url} 
                alt={car.name} 
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            {car.gallery && car.gallery.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-2">
                <div 
                  onClick={() => setActiveImage(car.image_url)}
                  className={`aspect-video cursor-pointer border-2 transition-all ${activeImage === car.image_url ? 'border-primary-red' : 'border-transparent hover:border-[#CCC]'}`}
                >
                  <img src={car.image_url} alt="Main" className="w-full h-full object-cover" />
                </div>
                {car.gallery.map((url, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImage(url)}
                    className={`aspect-video cursor-pointer border-2 transition-all ${activeImage === url ? 'border-primary-red' : 'border-transparent hover:border-[#CCC]'}`}
                  >
                    <img src={url} alt={`Angle ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Details */}
          <div className="w-full lg:w-[45%] flex flex-col pt-4">
            <h1 className="font-serif text-[32px] md:text-[40px] text-[#333] leading-[1.2] text-center mb-6">
              {car.name}
            </h1>
            
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-[15px]">
                <span className="text-[#666]">Call Us -</span>
                <a href={`tel:${car.contact_number || '+8801718388292'}`} className="text-[#0066cc] hover:underline flex items-center gap-1 font-bold">
                  <Phone size={14} /> {car.contact_number || '+8801718-388292'}
                </a>
              </div>
              <div className="w-full max-w-[300px] h-[1px] bg-[#E5E5E5]"></div>
              <div className="text-[14px] text-[#888]">
                BY - AUTO MUSEUM LTD.
              </div>
              <div className="w-full max-w-[300px] h-[1px] bg-[#E5E5E5]"></div>
              <div className="text-[16px] text-[#333] font-bold uppercase tracking-[1px]">
                {car.year} {car.name}
              </div>
            </div>

            <div className="bg-white p-8 border border-[#E5E5E5] shadow-sm">
              <h3 className="font-bold text-[16px] text-[#333] mb-4 uppercase tracking-[1px] border-b border-[#F0F0F0] pb-2">Vehicle Specifications</h3>
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="flex justify-between items-center bg-[#F9F9F9] p-3 rounded">
                  <span className="text-[13px] text-[#666] font-medium uppercase">Performance/Spec</span>
                  <span className="text-[13px] text-[#333] font-semibold">{car.spec}</span>
                </div>
                {car.engine && (
                  <div className="flex justify-between items-center bg-white p-3 border-b border-[#F0F0F0]">
                    <span className="text-[13px] text-[#666] font-medium uppercase">Engine</span>
                    <span className="text-[13px] text-[#333] font-semibold">{car.engine}</span>
                  </div>
                )}
                {car.mileage && (
                  <div className="flex justify-between items-center bg-[#F9F9F9] p-3 rounded">
                    <span className="text-[13px] text-[#666] font-medium uppercase">Mileage</span>
                    <span className="text-[13px] text-[#333] font-semibold">{car.mileage}</span>
                  </div>
                )}
                {car.transmission && (
                  <div className="flex justify-between items-center bg-white p-3 border-b border-[#F0F0F0]">
                    <span className="text-[13px] text-[#666] font-medium uppercase">Transmission</span>
                    <span className="text-[13px] text-[#333] font-semibold">{car.transmission}</span>
                  </div>
                )}
              </div>

              <h3 className="font-bold text-[16px] text-[#333] mb-4 uppercase tracking-[1px] border-b border-[#F0F0F0] pb-2">Description</h3>
              <p className="text-[15px] text-[#555] leading-[1.8]">
                {car.description || "The efficient 3.0-liter turbocharged engine provides exceptional performance and smooth power delivery."}
              </p>
            </div>

            <Link to="/contact" className="mt-8 bg-primary-red text-white py-4 text-center font-body font-bold text-[13px] uppercase tracking-[2px] hover:bg-deep-red transition-all shadow-lg hover:shadow-xl">
              ENQUIRE ABOUT THIS VEHICLE
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="w-full bg-[#333] py-4 px-6 md:px-12 mt-auto flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="font-body font-bold text-[12px] text-white tracking-[2px] uppercase text-center flex-1">
          OPEN INFORMATION
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <a href="https://www.facebook.com/automuseumltd.official" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-red transition-colors">
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com/automuseumltd.official/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-red transition-colors">
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
