import { useState } from "react";
import { Zap, Calendar, DollarSign, Plus, Minus } from "lucide-react";
import { clsx } from "clsx";

export default function CarLoan() {
  const [carPrice, setCarPrice] = useState<number>(5000000);
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [tenure, setTenure] = useState<number>(36);
  const interestRate = 9.5; // Fixed interest rate
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateLoan = () => {
    const principal = carPrice - downPayment;
    const ratePerMonth = interestRate / 100 / 12;
    const payment = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenure)) / (Math.pow(1 + ratePerMonth, tenure) - 1);
    setMonthlyPayment(Math.round(payment));
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "What documents are required for a car loan?", a: "You will need your NID, TIN certificate, recent bank statements (last 6 months), salary certificate or trade license, and utility bill copy." },
    { q: "How long does the approval process take?", a: "With our fast-track approval system, eligible customers can get their loan approved within 24 to 48 hours after submitting all required documents." },
    { q: "Can I prepay my loan before the tenure ends?", a: "Yes, early settlement is allowed. A minimal early settlement fee may apply depending on the financing partner's terms and conditions." },
    { q: "Do you offer loans for used cars?", a: "Yes, we offer financing options for both brand new and reconditioned/used vehicles, subject to the car's age and condition." },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Page Hero */}
      <section className="bg-pure-black h-[320px] flex flex-col justify-center items-center text-center px-6 relative">
        <div className="grain-overlay"></div>
        <div className="relative z-10">
          <h1 className="font-display text-[88px] text-white tracking-[2px] uppercase leading-none">
            DRIVE NOW <span className="text-primary-red">·</span> PAY LATER
          </h1>
          <p className="mt-4 font-serif italic text-[20px] text-muted-text">
            Flexible financing options tailored for you
          </p>
        </div>
      </section>

      {/* Section 1 - Calculator + Benefits */}
      <section className="py-[120px] px-6 md:px-12 max-w-[1320px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Calculator */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white border border-[#E0E0E0] p-8 rounded-none shadow-sm">
              <h2 className="font-body font-semibold text-[18px] text-black">Estimate Your Monthly Payment</h2>
              <div className="w-[24px] h-[2px] bg-primary-red mt-2 mb-8"></div>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-body font-medium text-[13px] text-[#555]">Car Price (BDT)</label>
                  <input 
                    type="number" 
                    value={carPrice} 
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    className="w-full border border-black p-3 font-body text-[14px] outline-none focus:border-primary-red transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-body font-medium text-[13px] text-[#555]">Down Payment (BDT)</label>
                  <input 
                    type="number" 
                    value={downPayment} 
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full border border-black p-3 font-body text-[14px] outline-none focus:border-primary-red transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-body font-medium text-[13px] text-[#555]">Loan Tenure</label>
                  <select 
                    value={tenure} 
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full border border-black p-3 font-body text-[14px] outline-none focus:border-primary-red transition-colors bg-white"
                  >
                    <option value={12}>12 Months</option>
                    <option value={24}>24 Months</option>
                    <option value={36}>36 Months</option>
                    <option value={48}>48 Months</option>
                    <option value={60}>60 Months</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-body font-medium text-[13px] text-[#555]">Interest Rate (%)</label>
                  <input 
                    type="text" 
                    value={`${interestRate}% (Fixed)`} 
                    disabled
                    className="w-full border border-[#E0E0E0] bg-[#F8F8F8] text-[#888] p-3 font-body text-[14px] outline-none cursor-not-allowed"
                  />
                </div>

                <button 
                  onClick={calculateLoan}
                  className="w-full bg-primary-red hover:bg-deep-red text-white py-4 mt-4 font-body font-semibold text-[13px] uppercase tracking-[2px] transition-colors"
                >
                  Calculate
                </button>

                {monthlyPayment !== null && (
                  <div className="mt-6 bg-[#F8F8F8] p-6 text-center border border-[#E0E0E0]">
                    <p className="font-display text-[40px] text-black leading-none">
                      Est. Monthly: <span className="text-primary-red">BDT {monthlyPayment.toLocaleString()}</span>
                    </p>
                    <p className="font-body font-light text-[11px] text-[#888] mt-2">
                      *This is an estimate. Actual rates may vary based on credit profile.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
            {[
              { icon: Zap, title: "Fast Approval", desc: "Get approved within 24 hours" },
              { icon: Calendar, title: "Flexible Terms", desc: "Tenures from 12 to 60 months" },
              { icon: DollarSign, title: "Competitive Rates", desc: "Industry-leading interest rates" },
            ].map((benefit, i) => (
              <div key={i} className="bg-[#F8F8F8] border-l-[4px] border-primary-red p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="text-primary-red mt-1 shrink-0">
                  <benefit.icon size={28} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-body font-semibold text-[15px] text-black">{benefit.title}</h3>
                  <p className="font-body font-light text-[13px] text-[#666] mt-1">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 2 - FAQ Accordion */}
      <section className="py-[120px] px-6 md:px-12 bg-white border-t border-[#EEEEEE]">
        <div className="max-w-[760px] mx-auto w-full">
          <h2 className="font-display text-[48px] text-black text-center mb-12 uppercase tracking-[1px]">Common Questions</h2>
          
          <div className="flex flex-col border-t border-[#EEEEEE]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#EEEEEE]">
                <button 
                  className="w-full py-5 flex items-center justify-between text-left hover:bg-[rgba(200,16,46,0.04)] transition-colors px-4 group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-body font-semibold text-[15px] text-black group-hover:text-primary-red transition-colors">{faq.q}</span>
                  <span className="text-primary-red shrink-0 ml-4">
                    {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                
                <div 
                  className={clsx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openFaq === i ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="font-body font-light text-[14px] text-[#555] pl-4 pr-4 pb-5 leading-[1.6]">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
