'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ContactCTA() {
  const ctaRef = useRef(null);
  
  useEffect(() => {
    const animateCTA = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Create the reveal animation
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top bottom-=100',
          onEnter: () => {
            // Animate the background
            gsap.fromTo(
              ctaRef.current,
              { backgroundPosition: '0% 0%' },
              {
                backgroundPosition: '100% 100%',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              }
            );
            
            // Animate the content
            gsap.fromTo(
              ctaRef.current.querySelector('.cta-content'),
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );
            
            // Staggered button animation
            gsap.fromTo(
              ctaRef.current.querySelectorAll('.cta-button'),
              { opacity: 0, y: 20, scale: 0.9 },
              { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.6, 
                stagger: 0.2,
                delay: 0.6,
                ease: 'back.out(1.7)'
              }
            );
          }
        });
        
        // Add hover effects to buttons
        const buttons = ctaRef.current.querySelectorAll('.cta-button');
        buttons.forEach(button => {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.05,
              y: -5,
              duration: 0.3,
              ease: 'power1.out'
            });
          });
          
          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power1.out'
            });
          });
        });
      } catch (error) {
        console.error("Error animating CTA:", error);
      }
    };
    
    animateCTA();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div 
          ref={ctaRef}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl relative"
          style={{ 
            background: 'linear-gradient(135deg, #006039 0%, #00734b 50%, #005c33 100%)',
            backgroundSize: '200% 200%'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white opacity-5 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-white opacity-5 transform translate-x-1/4 translate-y-1/4"></div>
          
          <div className="p-10 md:p-16 relative z-10">
            <div className="cta-content text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Connect?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
                Partner with Arabian Nectar Trading for premium quality food commodities and exceptional service. Let's build a successful business relationship.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  href="/products"
                  className="cta-button px-8 py-4 bg-white text-[#006039] rounded-lg font-bold transition-all duration-300"
                >
                  Explore Our Products
                </Link>
                
                <Link 
                  href="#contact-form"
                  className="cta-button px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold transition-all duration-300"
                >
                  Send Us a Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}