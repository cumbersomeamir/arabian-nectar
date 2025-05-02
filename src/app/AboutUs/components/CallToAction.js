'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CallToAction() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Initialize animations
    const initAnimations = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Create scroll trigger for section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
        
        // Animate gradient background
        gsap.to(sectionRef.current, {
          backgroundPosition: '100% 100%',
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
        // Animate content with fade up
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
        
        // Animate buttons with stagger
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 20, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            stagger: 0.2, 
            duration: 0.6, 
            ease: 'back.out(1.7)'
          },
          '-=0.4'
        );
        
        // Animate decorative elements
        tl.fromTo(
          '.decor-circle',
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 0.15, 
            stagger: 0.2, 
            duration: 1, 
            ease: 'elastic.out(1, 0.3)'
          },
          '-=0.8'
        );
        
        // Add floating animation to circles
        gsap.to('.decor-circle-1', {
          y: -20,
          x: 10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
        gsap.to('.decor-circle-2', {
          y: 20,
          x: -15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5
        });
        
        gsap.to('.decor-circle-3', {
          y: -15,
          x: -10,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1
        });
        
        // Add hover effects to buttons
        const buttons = buttonsRef.current.querySelectorAll('a');
        
        buttons.forEach((button) => {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              y: -5,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              duration: 0.3,
              ease: 'power2.out'
            });
          });
          
          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              y: 0,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #006039 0%, #004c2d 50%, #006039 100%)',
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 0%'
      }}
    >
      {/* Decorative circles */}
      <div className="decor-circle decor-circle-1 absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full"></div>
      <div className="decor-circle decor-circle-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full"></div>
      <div className="decor-circle decor-circle-3 absolute top-3/4 left-1/3 w-48 h-48 bg-white rounded-full"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get to Know Arabian Nectar Trading</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Arabian Nectar Trading is more than a food commodity supplier—we are a partner in your success. 
            Our passion for quality, reliability, and sustainability drives us to deliver exceptional value to our clients.
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-[#006039] rounded-lg font-semibold shadow-lg transition-all duration-300"
            >
              Explore Our Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#a37e2c] text-white rounded-lg font-semibold shadow-lg transition-all duration-300"
            >
              Contact Us Today
            </Link>
          </div>
          
          {/* Contact details */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div className="font-medium text-lg mb-1">Phone</div>
              <p className="text-white/80">+971 508 546 650</p>
              <p className="text-white/80">+971 551 968 673</p>
            </div>
            
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div className="font-medium text-lg mb-1">Email</div>
              <p className="text-white/80">info@arabiannectar.com</p>
            </div>
            
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <div className="font-medium text-lg mb-1">Address</div>
              <p className="text-white/80">Building A1, Dubai Digital Park,</p>
              <p className="text-white/80">DSO, Dubai, UAE</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,133.3C672,149,768,203,864,208C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}