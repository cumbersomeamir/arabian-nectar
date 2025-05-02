'use client';
import React, { useEffect, forwardRef } from 'react';

const ServiceCard = forwardRef(({ service, isSelected, onClick }, ref) => {
  useEffect(() => {
    const initAnimation = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Create staggered entrance animations
        if (ref) {
          ScrollTrigger.create({
            trigger: ref,
            start: 'top bottom-=100',
            onEnter: () => {
              gsap.fromTo(
                ref,
                { 
                  y: 50, 
                  opacity: 0,
                  scale: 0.95
                },
                { 
                  y: 0, 
                  opacity: 1,
                  scale: 1,
                  duration: 0.7,
                  ease: 'back.out(1.2)'
                }
              );
            }
          });
          
          // Add hover animations
          ref.addEventListener('mouseenter', () => {
            if (!isSelected) {
              gsap.to(ref, {
                y: -10,
                scale: 1.03,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                duration: 0.3,
                ease: 'power2.out'
              });
              
              // Animate icon
              gsap.to(ref.querySelector('.service-icon'), {
                scale: 1.1,
                color: '#a37e2c',
                duration: 0.3,
                ease: 'back.out(1.7)'
              });
            }
          });
          
          ref.addEventListener('mouseleave', () => {
            if (!isSelected) {
              gsap.to(ref, {
                y: 0,
                scale: 1,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                duration: 0.3,
                ease: 'power2.out'
              });
              
              // Reset icon
              gsap.to(ref.querySelector('.service-icon'), {
                scale: 1,
                color: '#006039',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });
        }
      } catch (error) {
        console.error("Error initializing card animations:", error);
      }
    };
    
    initAnimation();
  }, [ref]);
  
  useEffect(() => {
    const animateCardState = async () => {
      if (!ref) return;
      
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        if (isSelected) {
          gsap.to(ref, {
            scale: 1.03,
            y: -10,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Animate icon
          gsap.to(ref.querySelector('.service-icon'), {
            scale: 1.1,
            color: '#a37e2c',
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
          
          // Scroll into view
          ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          gsap.to(ref, {
            scale: 1,
            y: 0,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Reset icon
          gsap.to(ref.querySelector('.service-icon'), {
            scale: 1,
            color: '#006039',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      } catch (error) {
        console.error("Error animating card state:", error);
      }
    };
    
    animateCardState();
  }, [isSelected, ref]);

  return (
    <div 
      ref={ref}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500"
    >
      <div className="p-8">
        <div className="service-icon text-[#006039] transition-colors duration-300 mb-6">
          {service.icon}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.shortDescription}</p>
        
        <button
          onClick={onClick}
          className="inline-flex items-center text-[#006039] font-medium hover:text-[#a37e2c] transition-colors duration-300"
        >
          {isSelected ? 'View Less' : 'View More'}
          <svg 
            className={`ml-2 w-5 h-5 transform transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;