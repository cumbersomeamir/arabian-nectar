'use client';
import React, { useEffect, useRef } from 'react';

export default function Testimonial() {
  const testimonialRef = useRef(null);
  
  useEffect(() => {
    const animateTestimonial = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate testimonial on scroll
        ScrollTrigger.create({
          trigger: testimonialRef.current,
          start: 'top bottom-=100',
          onEnter: () => {
            gsap.fromTo(
              testimonialRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
          }
        });
      } catch (error) {
        console.error("Error animating testimonial:", error);
      }
    };
    
    animateTestimonial();
  }, []);

  return (
    <section className="py-16 bg-[#f4f4f2]">
      <div className="container mx-auto px-4">
        <div 
          ref={testimonialRef}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-10 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-[#a37e2c] opacity-5 rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#006039] opacity-5 rounded-tl-full"></div>
          
          <div className="text-5xl text-[#a37e2c] opacity-20 mb-6">"</div>
          
          <blockquote className="text-lg text-gray-700 mb-8">
            Arabian Nectar Trading has transformed our supply chain with their reliable rice and spice deliveries. Their quality and service are unmatched!
          </blockquote>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[#006039] font-bold">
              MA
            </div>
            <div className="ml-4">
              <div className="font-bold text-gray-900">Mohammed Al-Sayed</div>
              <div className="text-sm text-gray-500">Distributor, Saudi Arabia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}