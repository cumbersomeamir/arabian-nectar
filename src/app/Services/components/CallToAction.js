'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CallToAction() {
  const ctaRef = useRef(null);
  
  useEffect(() => {
    const animateCTA = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // CTA animation
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top bottom-=100',
          onEnter: () => {
            gsap.fromTo(
              ctaRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
            
            // Animate gradient background
            gsap.to(ctaRef.current, {
              backgroundPosition: '100% 100%',
              duration: 15,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }
        });
      } catch (error) {
        console.error("Error animating CTA:", error);
      }
    };
    
    animateCTA();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ctaRef}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl"
          style={{ 
            background: 'linear-gradient(135deg, #006039 0%, #00734b 100%)',
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 0%'
          }}
        >
          <div className="p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Food Business?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Partner with Arabian Nectar Trading for premium quality products, reliable service, and comprehensive supply chain solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="px-8 py-4 bg-white text-[#006039] rounded-lg font-bold transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Contact Us
              </Link>
              
              <Link 
                href="/products"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold transition-all duration-300 hover:bg-white hover:text-[#006039]"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}