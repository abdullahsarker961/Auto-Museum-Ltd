import { Link } from "react-router-dom";
import { Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen">
      <section className="py-[60px] px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto w-full flex flex-col items-center">
          <h2 className="font-body font-semibold text-[22px] text-[#333] tracking-[1px] uppercase mb-10">
            CONTACT US
          </h2>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Showroom 1 */}
            <div className="bg-white shadow-sm flex flex-col overflow-hidden">
              <div className="w-full h-[260px] overflow-hidden bg-gray-200">
                <iframe 
                  src="https://maps.google.com/maps?q=Auto+Museum+Limited,+Gulshan,+Dhaka&t=m&z=15&output=embed&iwloc=near" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-8 flex flex-col gap-6">
                <h3 className="font-body font-semibold text-[18px] text-[#333]">OUTLET-01</h3>
                
                <div className="flex flex-col font-serif text-[15px] text-[#444] leading-[1.8]">
                  <span>House-16# Road-111 #</span>
                  <span>Glshan-2</span>
                  <span>Bangladesh</span>
                  <span>1213</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="font-body font-semibold text-[13px] text-[#333] mb-1">CONTACT NUMBER:</span>
                  <a href="tel:01718388292" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">01718 388292</a>
                  <a href="tel:01711241180" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">01711 241180</a>
                  <a href="tel:01726111485" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">01726 111485</a>
                  <a href="tel:01713008222" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">01713 008222</a>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-body font-semibold text-[13px] text-[#333]">EMAIL:</span>
                  <a href="mailto:info.automuseumltd@gmail.com" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">info.automuseumltd@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Showroom 2 */}
            <div className="bg-white shadow-sm flex flex-col overflow-hidden">
              <div className="w-full h-[260px] overflow-hidden bg-gray-200">
                <iframe 
                  src="https://maps.google.com/maps?q=Auto+Museum+Ltd,+Baridhara,+Dhaka&t=m&z=15&output=embed&iwloc=near" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-8 flex flex-col gap-6">
                <h3 className="font-body font-semibold text-[18px] text-[#333]">OUTLET-02</h3>
                
                <div className="flex flex-col font-serif text-[15px] text-[#444] leading-[1.8]">
                  <span>House-310# Road-Progati Shoroni #</span>
                  <span>Baridhara</span>
                  <span>Bangladesh</span>
                  <span>1212</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="font-body font-semibold text-[13px] text-[#333] mb-1">CONTACT NUMBER:</span>
                  <a href="tel:01718388292" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">01718 388292</a>
                  <a href="tel:01711241180" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">01711 241180</a>
                  <a href="tel:01726111485" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">01726 111485</a>
                  <a href="tel:01713008222" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">01713 008222</a>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-body font-semibold text-[13px] text-[#333]">EMAIL:</span>
                  <a href="mailto:info.automuseumltd@gmail.com" className="font-serif text-[15px] text-[#444] hover:text-primary-red transition-colors">info.automuseumltd@gmail.com</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3 - Contact Form + Direct Contact */}
      <section className="py-[120px] px-6 md:px-12 bg-white border-t-[3px] border-primary-red">
        <div className="max-w-[1320px] mx-auto w-full flex flex-col lg:flex-row gap-16">
          
          {/* Left 60% - Contact Form */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <h2 className="font-serif font-bold italic text-[32px] text-black">Send Us a Message</h2>
            <div className="w-[28px] h-[2px] bg-primary-red mt-4 mb-8"></div>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full border border-[#D0D0D0] p-[14px] font-body font-light text-[14px] text-black outline-none focus:border-primary-red focus:shadow-[0_0_0_3px_rgba(200,16,46,0.10)] transition-all"
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full border border-[#D0D0D0] p-[14px] font-body font-light text-[14px] text-black outline-none focus:border-primary-red focus:shadow-[0_0_0_3px_rgba(200,16,46,0.10)] transition-all"
                required
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full border border-[#D0D0D0] p-[14px] font-body font-light text-[14px] text-black outline-none focus:border-primary-red focus:shadow-[0_0_0_3px_rgba(200,16,46,0.10)] transition-all"
                required
              />
              <select 
                className="w-full border border-[#D0D0D0] p-[14px] font-body font-light text-[14px] text-black outline-none focus:border-primary-red focus:shadow-[0_0_0_3px_rgba(200,16,46,0.10)] transition-all bg-white"
                required
                defaultValue=""
              >
                <option value="" disabled>Subject</option>
                <option value="general">General Enquiry</option>
                <option value="test_drive">Test Drive</option>
                <option value="stock">Stock Enquiry</option>
                <option value="loan">Car Loan</option>
                <option value="other">Other</option>
              </select>
              <textarea 
                placeholder="Message" 
                className="w-full border border-[#D0D0D0] p-[14px] font-body font-light text-[14px] text-black outline-none focus:border-primary-red focus:shadow-[0_0_0_3px_rgba(200,16,46,0.10)] transition-all h-[140px] resize-none"
                required
              ></textarea>
              
              <button 
                type="submit"
                className="w-full bg-primary-red hover:bg-deep-red text-white py-[18px] font-body font-semibold text-[13px] uppercase tracking-[3px] transition-colors mt-2"
              >
                SEND MESSAGE &rarr;
              </button>
            </form>
          </div>

          {/* Right 40% - Direct Contact Info */}
          <div className="w-full lg:w-[40%] bg-[#F8F8F8] p-8 flex flex-col h-fit border border-[#E5E5E5]">
            <h3 className="font-body font-semibold text-[18px] text-black mb-8">Reach Us Directly</h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-primary-red shrink-0" />
                <a href="tel:+8801234567890" className="font-body font-light text-[15px] text-[#555] hover:text-primary-red transition-colors">+880 1234 567 890</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-primary-red shrink-0" />
                <a href="mailto:info@automuseum.com.bd" className="font-body font-light text-[15px] text-[#555] hover:text-primary-red transition-colors">info@automuseum.com.bd</a>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-primary-red shrink-0 mt-0.5" />
                <div className="flex flex-col font-body font-light text-[15px] text-[#555]">
                  <span>Sat–Thu: 9AM–7PM</span>
                  <span>Fri: Closed</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-[1px] bg-[#E5E5E5] my-8"></div>
            
            <div className="flex flex-col gap-4">
              <span className="font-body font-semibold text-[9px] text-primary-red tracking-[3px] uppercase">FOLLOW US</span>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/automuseumltd.official" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[36px] h-[36px] bg-[#111111] hover:bg-primary-red text-white flex items-center justify-center transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/automuseumltd.official/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[36px] h-[36px] bg-[#111111] hover:bg-primary-red text-white flex items-center justify-center transition-colors"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
