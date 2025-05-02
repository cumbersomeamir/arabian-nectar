'use client';
import React, { useEffect, useRef } from 'react';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const reasonsRef = useRef([]);
  
  useEffect(() => {
    // Reset refs array
    reasonsRef.current = reasonsRef.current.slice(0, 4);
    
    const animateSection = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate heading
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom-=100',
          onEnter: () => {
            gsap.fromTo(
              sectionRef.current.querySelector('h2'),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
            );
            
            gsap.fromTo(
              sectionRef.current.querySelector('p'),
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' }
            );
          }
        });
        
        // Animate reason cards
        reasonsRef.current.forEach((card, index) => {
          if (!card) return;
          
          ScrollTrigger.create({
            trigger: card,
            start: 'top bottom-=50',
            onEnter: () => {
              gsap.fromTo(
                card,
                { 
                  opacity: 0, 
                  y: 20,
                  scale: 0.95
                },
                { 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'back.out(1.2)'
                }
              );
            }
          });
          
          // Add hover animations
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -5,
              scale: 1.03,
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              duration: 0.3
            });
            
            // Animate icon
            gsap.to(card.querySelector('.icon-container'), {
              backgroundColor: 'rgba(0, 96, 57, 0.2)',
              scale: 1.1,
              duration: 0.3
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              duration: 0.3
            });
            
            // Reset icon
            gsap.to(card.querySelector('.icon-container'), {
              backgroundColor: 'rgba(0, 96, 57, 0.1)',
              scale: 1,
              duration: 0.3
            });
          });
        });
      } catch (error) {
        console.error("Error animating Why Choose Us section:", error);
      }
    };
    
    animateSection();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-[#f4f4f2]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-black text-center">Why Arabian Nectar Trading?</h2>
          <p className="text-green-900">
            Our comprehensive approach and commitment to excellence make us the preferred partner for global food commodity sourcing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div 
            ref={el => reasonsRef.current[0] = el}
            className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto icon-container bg-[#006039]/10 rounded-full flex items-center justify-center mb-4 transition-all duration-300">
              <svg className="w-6 h-6 text-[#006039]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="font-bold mb-2">Proven Track Record</h3>
            <p className="text-sm text-gray-600">Over 5 years serving clients across 15 countries, with 98% on-time delivery.</p>
          </div>
          
          <div 
            ref={el => reasonsRef.current[1] = el}
            className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto icon-container bg-[#006039]/10 rounded-full flex items-center justify-center mb-4 transition-all duration-300">
              <svg className="w-6 h-6 text-[#006039]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="font-bold mb-2">Strategic Location</h3>
            <p className="text-sm text-gray-600">Based in Dubai, we leverage UAE's trade infrastructure for global reach.</p>
          </div>
          
          <div 
            ref={el => reasonsRef.current[2] = el}
            className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto icon-container bg-[#006039]/10 rounded-full flex items-center justify-center mb-4 transition-all duration-300">
              <svg className="w-6 h-6 text-[#006039]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 className="font-bold mb-2">Client-Centric</h3>
            <p className="text-sm text-gray-600">We tailor our services to meet the unique needs of each client.</p>
          </div>
          
          <div 
            ref={el => reasonsRef.current[3] = el}
            className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto icon-container bg-[#006039]/10 rounded-full flex items-center justify-center mb-4 transition-all duration-300">
              <svg className="w-6 h-6 text-[#006039]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="font-bold mb-2">Innovation-Driven</h3>
            <p className="text-sm text-gray-600">We invest in technology and AI-driven supply chain analytics to enhance efficiency.</p>
          </div>
        </div>
      </div>
    </section>
  );
}