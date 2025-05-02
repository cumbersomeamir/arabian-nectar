'use client';
import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (contentRef.current) {
            contentRef.current.classList.add('translate-x-0', 'opacity-100');
            contentRef.current.classList.remove('-translate-x-10', 'opacity-0');
          }
          if (imageRef.current) {
            imageRef.current.classList.add('translate-x-0', 'opacity-100');
            imageRef.current.classList.remove('translate-x-10', 'opacity-0');
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#f4f4f2]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content */}
          <div 
            ref={contentRef} 
            className="md:w-1/2 transition-all duration-1000 ease-out -translate-x-10 opacity-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#006039]">
              Who We Are: A Legacy of Quality and Trust
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Founded in Dubai, Arabian Nectar Trading has rapidly emerged as a leader in the export of food 
              commodities, leveraging the UAE's strategic position as a global trade gateway. Our mission is to 
              simplify food sourcing while delivering products that exceed expectations.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Arabian Nectar Trading, we pride ourselves on our end-to-end solutions. Our services encompass 
              sourcing, quality assurance, logistics, documentation, and financing, allowing our partners to focus 
              on their core business while we handle the complexities of global trade.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our global reach spans over 50 countries, with a strong presence in high-growth markets across the 
              Middle East and Africa. By combining local expertise with international standards, Arabian Nectar 
              Trading delivers products that resonate with diverse culinary traditions and consumer preferences.
            </p>
            
            <div className="flex gap-4 mt-8">
              <span className="px-4 py-2 bg-[#a37e2c] text-white rounded-lg inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Quality
              </span>
              <span className="px-4 py-2 bg-[#a37e2c] text-white rounded-lg inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Reliability
              </span>
              <span className="px-4 py-2 bg-[#a37e2c] text-white rounded-lg inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Trust
              </span>
            </div>
          </div>
          
          {/* Image/Animation */}
          <div 
            ref={imageRef} 
            className="md:w-1/2 transition-all duration-1000 ease-out delay-300 translate-x-10 opacity-0"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#006039] opacity-20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#a37e2c] opacity-20 rounded-full animate-pulse delay-1000"></div>
              <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Arabian Nectar Trading headquarters in Dubai" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}