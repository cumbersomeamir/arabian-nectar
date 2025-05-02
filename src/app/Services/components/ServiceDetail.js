'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ServiceDetail({ service }) {
  const detailRef = useRef(null);
  
  useEffect(() => {
    const animateDetail = async () => {
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        // Animate detail section entrance
        gsap.fromTo(
          detailRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
        
        // Animate image parallax on hover
        const imageEl = detailRef.current.querySelector('.service-image');
        if (imageEl) {
          imageEl.addEventListener('mouseenter', () => {
            gsap.to(imageEl, {
              scale: 1.1,
              duration: 0.8,
              ease: 'power2.out'
            });
          });
          
          imageEl.addEventListener('mouseleave', () => {
            gsap.to(imageEl, {
              scale: 1,
              duration: 0.8,
              ease: 'power2.out'
            });
          });
        }
      } catch (error) {
        console.error("Error animating service detail:", error);
      }
    };
    
    animateDetail();
  }, [service]);

  return (
    <section ref={detailRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Image Column */}
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-xl h-80 md:h-full">
                <div 
                  className="service-image absolute inset-0 bg-cover bg-center transform transition-transform duration-700"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                
                {/* Statistic Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="text-[#006039] font-bold text-lg">{service.statistic}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{service.title}</h2>
              <p className="text-lg text-gray-700 mb-8">{service.fullDescription}</p>
              
              {/* Service Features List */}
              <div className="space-y-4 mb-8">
                {service.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 text-[#a37e2c] mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600">{detail}</p>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <Link 
                href="/contact"
                className="inline-block px-6 py-3 bg-[#006039] text-white font-medium rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Inquire About This Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}