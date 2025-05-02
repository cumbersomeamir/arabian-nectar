'use client';
import { useEffect, useRef } from 'react';

export default function ProductsHero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const productCountRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP animations
    const initAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        
        // Create main timeline
        const tl = gsap.timeline();
        
        // Animate the background with parallax effect
        gsap.to(heroRef.current, {
          backgroundPositionY: "30%",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
        
        // Reveal animation for the title with 3D rotation
        tl.fromTo(
          titleRef.current.querySelectorAll('.char'),
          { 
            opacity: 0, 
            rotateY: 90,
            transformOrigin: "50% 50% -20px"
          },
          { 
            opacity: 1, 
            rotateY: 0,
            stagger: 0.03, 
            duration: 0.8, 
            ease: "back.out(1.7)" 
          }
        );
        
        // Reveal animation for subtitle
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        );
        
        // Counter animation for product count
        tl.fromTo(
          productCountRef.current,
          { textContent: 0 },
          { 
            textContent: 30,
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: () => {
              const count = productCountRef.current.textContent;
              productCountRef.current.innerHTML = `${count}<span class="text-[#a37e2c]">+</span>`;
            }
          },
          "-=0.5"
        );
        
        // Bounce animation for scroll indicator
        tl.fromTo(
          scrollIndicatorRef.current,
          { y: -10, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5,
            ease: "back.out(1.7)",
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.5
          },
          "-=1.5"
        );
        
        // Light beam animation
        gsap.fromTo(
          '.light-beam',
          { opacity: 0, scale: 0.8, rotation: 0 },
          { 
            opacity: 0.15, 
            scale: 1.2, 
            rotation: 15,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          }
        );
        
        // Floating product images animation
        gsap.to('.floating-product', {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5
        });
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, []);
  
  // Split text into characters for animation
  const SplitChars = ({ children }) => {
    return (
      <span className="inline-block">
        {children.split('').map((char, i) => (
          <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
    );
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1620653700197-32dc58d5cf64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#006039]/60"></div>
      
      {/* Light beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-beam absolute left-1/4 top-1/3 w-[500px] h-[800px] bg-white rounded-full transform -rotate-45 origin-center"></div>
        <div className="light-beam absolute right-1/4 top-2/3 w-[400px] h-[600px] bg-[#a37e2c] rounded-full transform rotate-45 origin-center"></div>
      </div>
      
      {/* Floating product images */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
          alt="Rice" 
          className="floating-product absolute w-48 h-48 object-cover rounded-full top-1/4 left-[10%] shadow-2xl border-4 border-white/30"
        />
        <img 
          src="https://images.unsplash.com/photo-1567306226435-27f855834a5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
          alt="Spices" 
          className="floating-product absolute w-40 h-40 object-cover rounded-full bottom-1/4 right-[15%] shadow-2xl border-4 border-white/30"
        />
        <img 
          src="https://images.unsplash.com/photo-1604153787509-7a72505e7e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
          alt="Pulses" 
          className="floating-product absolute w-32 h-32 object-cover rounded-full top-2/3 left-[20%] shadow-2xl border-4 border-white/30"
        />
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <SplitChars>Premium Food Commodities</SplitChars>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-light"
          >
            Explore our exceptional portfolio of high-quality rice, spices, pulses, and more, 
            sourced from the finest regions and delivered with unmatched reliability.
          </p>
          
          <div className="flex justify-center items-center mb-16">
            <div className="text-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <span 
                ref={productCountRef} 
                className="text-5xl font-bold text-white"
              >
                0<span className="text-[#a37e2c]">+</span>
              </span>
              <p className="text-white/80 text-sm mt-1">Premium Products</p>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div 
            ref={scrollIndicatorRef}
            className="flex flex-col items-center opacity-0"
          >
            <p className="text-white/80 mb-2 text-sm tracking-wider">EXPLORE OUR RANGE</p>
            <svg className="w-6 h-6 text-[#a37e2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(1px)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,133.3C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}