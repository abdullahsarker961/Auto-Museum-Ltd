import { useParams, Link } from "react-router-dom";
import { Facebook, Instagram, Phone, ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Car } from "../types/car";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  // Filter out any empty strings and ensure uniqueness to avoid navigation bugs
  const allImages = car 
    ? Array.from(new Set([car.image_url, ...(car.gallery || [])])).filter(url => url && url.trim() !== "")
    : [];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (allImages.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (allImages.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  useEffect(() => {
    if (car) {
      setActiveImageIndex(0);
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
            <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden shadow-lg border border-[#E5E5E5] relative group">
              <img 
                src={allImages[activeImageIndex] || car.image_url} 
                alt={car.name} 
                className="w-full h-full object-cover transition-all duration-500 cursor-zoom-in"
                referrerPolicy="no-referrer"
                onClick={() => setShowLightbox(true)}
              />
              
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-black rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-black rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            {car.gallery && car.gallery.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-2">
                <div 
                  onClick={() => setActiveImageIndex(0)}
                  className={`aspect-video cursor-pointer border-2 transition-all ${activeImageIndex === 0 ? 'border-primary-red' : 'border-transparent hover:border-[#CCC]'}`}
                >
                  <img src={car.image_url} alt="Main" className="w-full h-full object-cover" />
                </div>
                {allImages.slice(1).map((url, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx + 1)}
                    className={`aspect-video cursor-pointer border-2 transition-all ${activeImageIndex === idx + 1 ? 'border-primary-red' : 'border-transparent hover:border-[#CCC]'}`}
                  >
                    <img src={url} alt={`Angle ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Details */}
          <div className="w-full lg:w-[45%] flex flex-col pt-0 lg:pl-4 text-left">
            <h1 className="font-serif text-[32px] md:text-[36px] text-[#111] leading-[1.2] mb-4">
              {car.name}, {car.year}.
            </h1>
            
            <div className="flex flex-col items-start gap-4 mb-6">
              <div className="flex items-center gap-2 text-[14px] text-[#333]">
                <span className="font-body">Call Us -</span>
                <a href={`tel:${car.contact_number || '+8801718388292'}`} className="text-[#0066cc] hover:underline flex items-center gap-1 font-bold">
                  {car.contact_number || '+8801718-388292'}
                </a>
              </div>
              
              <div className="w-full h-[1px] bg-[#E5E5E5]"></div>
              
              <div className="text-[12px] text-[#888] font-body uppercase tracking-[1px]">
                BY - AUTO MUSEUM LTD.
              </div>
              
              <div className="text-[16px] text-[#111] font-body font-bold">
                {car.year} {car.name}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="text-[15px] text-[#333] leading-[1.8] font-body">
                {car.description || `Experience the pinnacle of luxury with the ${car.year} ${car.name}. This exceptional vehicle combines state-of-the-art technology with unparalleled comfort and performance.`}
              </div>

              {car.features && car.features.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-[15px] text-[#111] font-body">Features:</h3>
                  <ul className="flex flex-col gap-2">
                    {car.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14px] text-[#444] font-body leading-[1.5]">
                        <span className="w-1.5 h-1.5 bg-[#444] rounded-full mt-1.5 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link to="/contact" className="mt-10 bg-primary-red text-white py-4 px-8 text-center font-body font-bold text-[13px] uppercase tracking-[2px] hover:bg-deep-red transition-all shadow-lg hover:shadow-xl self-start lg:self-stretch">
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

      {/* Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setShowLightbox(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setShowLightbox(false)}
          >
            <X size={40} />
          </button>

          {allImages.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <ChevronLeft size={48} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          <img 
            src={allImages[activeImageIndex]} 
            alt="Fullscreen View" 
            className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 rounded-full text-white/50 text-[12px] font-mono tracking-[2px]">
            {activeImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
