'use client';
import { useEffect, useRef } from 'react';

export default function ContactHeader() {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const decorativeLineRef = useRef(null);
  
  useEffect(() => {
    const animateHeader = async () => {
      try {
        const gsapModule = await import('gsap');
        const SplitTextModule = await import('gsap/SplitText');
        
        const gsap = gsapModule.default;
        let SplitText = null;
        
        // Try to use SplitText if available (it's a premium plugin)
        try {
          SplitText = SplitTextModule.SplitText;
          gsap.registerPlugin(SplitText);
        } catch (error) {
          console.warn("SplitText plugin not available, falling back to standard animations");
        }
        
        // Title animation
        if (SplitText && titleRef.current) {
          const titleSplit = new SplitText(titleRef.current, { type: "chars,words" });
          
          gsap.from(titleSplit.chars, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.7)",
          });
        } else if (titleRef.current) {
          // Fallback animation
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
          );
        }
        
        // Subtitle animation
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power2.out" }
        );
        
        // Decorative line animation
        gsap.fromTo(
          decorativeLineRef.current,
          { width: 0 },
          { width: '100%', duration: 1.2, delay: 0.4, ease: "power2.inOut" }
        );
        
        // Create floating effect for header background
        gsap.to('.header-shape', {
          y: 'random(-15, 15)',
          x: 'random(-15, 15)',
          rotation: 'random(-5, 5)',
          duration: 'random(4, 7)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.5
        });
      } catch (error) {
        console.error("Error animating header:", error);
      }
    };
    
    animateHeader();
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 96, 57, 0.03) 0%, rgba(163, 126, 44, 0.05) 100%)'
      }}
    >
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="header-shape absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10 bg-[#a37e2c]"></div>
        <div className="header-shape absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-10 bg-[#006039]"></div>
        <div className="header-shape absolute bottom-1/3 -right-16 w-64 h-64 rounded-full opacity-10 bg-[#a37e2c]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-200"
          >
            Get In Touch
          </h1>
          
          <div className="flex justify-center mb-6">
            <span ref={decorativeLineRef} className="block h-1 bg-[#a37e2c] mx-auto"></span>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-lg text-gray-600 max-w-xl mx-auto"
          >
            Connect with Arabian Nectar Trading to explore our high-quality food products and services. We're here to assist you with all your sourcing and export needs.
          </p>
        </div>
      </div>
    </header>
  );
}