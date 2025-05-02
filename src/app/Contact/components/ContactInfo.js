'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ContactInfo() {
  const infoRef = useRef(null);
  const titleRef = useRef(null);
  const infoCardRefs = useRef([]);
  
  // Reset refs
  useEffect(() => {
    infoCardRefs.current = infoCardRefs.current.slice(0, 3);
  }, []);
  
  useEffect(() => {
    const animateInfo = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Title animation
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top bottom-=100',
          onEnter: () => {
            gsap.fromTo(
              titleRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
          }
        });
        
        // Staggered info cards animation
        infoCardRefs.current.forEach((card, index) => {
          if (!card) return;
          
          ScrollTrigger.create({
            trigger: card,
            start: 'top bottom-=50',
            onEnter: () => {
              gsap.fromTo(
                card,
                { 
                  opacity: 0, 
                  x: 30,
                  scale: 0.9
                },
                { 
                  opacity: 1, 
                  x: 0,
                  scale: 1,
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: 'back.out(1.4)'
                }
              );
              
              // Animate icon
              const icon = card.querySelector('.info-icon');
              gsap.fromTo(
                icon,
                { scale: 0, rotation: -30 },
                { 
                  scale: 1, 
                  rotation: 0,
                  duration: 0.7, 
                  delay: 0.2 + (index * 0.2),
                  ease: 'back.out(2)'
                }
              );
            }
          });
          
          // Hover animations
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -5,
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
              duration: 0.3
            });
            
            // Animate icon
            const icon = card.querySelector('.info-icon');
            gsap.to(icon, {
              scale: 1.2,
              color: '#a37e2c',
              duration: 0.3
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
              duration: 0.3
            });
            
            // Reset icon
            const icon = card.querySelector('.info-icon');
            gsap.to(icon, {
              scale: 1,
              color: '#006039',
              duration: 0.3
            });
          });
        });
      } catch (error) {
        console.error("Error animating contact info:", error);
      }
    };
    
    animateInfo();
  }, []);

  return (
    <div ref={infoRef} className="mt-6 md:mt-0">
      <h2 
        ref={titleRef}
        className="text-2xl font-bold mb-8 text-gray-900"
      >
        Reach Out
      </h2>
      
      <div className="space-y-6">
        {/* Phone Card */}
        <div 
          ref={el => infoCardRefs.current[0] = el}
          className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300"
        >
          <div className="flex items-start">
            <div className="info-icon mr-5 text-[#006039] transition-all duration-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <div className="space-y-1">
                <p className="text-gray-600">
                  <Link href="tel:+971508546650" className="hover:text-[#006039] transition-colors">
                    +971 508 546 650
                  </Link>
                </p>
                <p className="text-gray-600">
                  <Link href="tel:+971551968673" className="hover:text-[#006039] transition-colors">
                    +971 551 968 673
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Email Card */}
        <div 
          ref={el => infoCardRefs.current[1] = el}
          className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300"
        >
          <div className="flex items-start">
            <div className="info-icon mr-5 text-[#006039] transition-all duration-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">
                <Link href="mailto:info@arabiannectar.com" className="hover:text-[#006039] transition-colors">
                  info@arabiannectar.com
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Address Card */}
        <div 
          ref={el => infoCardRefs.current[2] = el}
          className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300"
        >
          <div className="flex items-start">
            <div className="info-icon mr-5 text-[#006039] transition-all duration-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">
                Building A1, Dubai Digital Park, DSO, Dubai, UAE
              </p>
            </div>
          </div>
        </div>
        
        {/* Connect With Us section */}
        <div className="mt-10 p-6 bg-gradient-to-br from-[#006039]/10 to-[#a37e2c]/5 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <p className="text-gray-600 mb-5">
            Have questions about our rice, spices, pulses, or other commodities? Need a quote or product samples?
          </p>
          <p className="text-gray-600">
            Our team is available to provide prompt and professional support. Contact us today to start a partnership with Arabian Nectar Trading.
          </p>
        </div>
      </div>
    </div>
  );
}