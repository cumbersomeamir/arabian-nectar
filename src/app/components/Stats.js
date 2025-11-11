'use client';
import { useEffect, useRef, useState } from 'react';

export default function Stats() {
  const sectionRef = useRef(null);
  const statsRefs = useRef([]);
  
  // Target values for the counters
  const targetValues = [50, 100000, 98, 7, 95];
  const [counters, setCounters] = useState([0, 0, 0, 0, 0]);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Initialize refs array
    statsRefs.current = statsRefs.current.slice(0, 5);
    
    // Import GSAP dynamically to avoid SSR issues
    const loadGSAP = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);
      
      // Create scroll trigger for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Background animation - gradient flow effect
      tl.fromTo(sectionRef.current, 
        { backgroundPosition: "0% 50%" },
        { 
          backgroundPosition: "100% 50%", 
          duration: 10, 
          ease: "none",
          repeat: -1,
          yoyo: true
        }, 0);
      
      // Animate decorative elements
      const decorElements = sectionRef.current.querySelectorAll('.decor-circle');
      tl.fromTo(decorElements, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 0.5, 
          stagger: 0.2, 
          duration: 1.2, 
          ease: "elastic.out(1, 0.3)"
        }, 0);
      
      // Animate stat cards
      tl.fromTo(statsRefs.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 0.8, 
          ease: "back.out(1.7)" 
        }, 0.5);
      
      // Start counter animation when section is in view
      tl.add(() => {
        if (!animationStarted) {
          setAnimationStarted(true);
          animateStats();
        }
      });
      
      // Add hover effects using GSAP
      statsRefs.current.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            duration: 0.3
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            duration: 0.3
          });
        });
      });
    };
    
    loadGSAP();
  }, [animationStarted]);

  const animateStats = () => {
    // Animation duration in ms
    const duration = 2500;
    // Update interval in ms
    const interval = 16;
    // Number of steps
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      const newCounters = targetValues.map((target, index) => {
        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const value = Math.min(Math.floor(target * easeOutQuart), target);
        return value;
      });

      setCounters(newCounters);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, #006039 0%, #004c2d 25%, #005030 50%, #004c2d 75%, #006039 100%)`,
        backgroundSize: "200% 200%"
      }}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-5 bg-[#a37e2c]"></div>
      <div className="absolute bottom-0 left-0 w-full h-5 bg-[#a37e2c]"></div>
      
      {/* Animated decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-0 rounded-full decor-circle"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-white opacity-0 rounded-full decor-circle"></div>
      <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-white opacity-0 rounded-full decor-circle"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particle absolute top-1/4 left-1/4 h-4 w-4 rounded-full bg-white opacity-20"></div>
        <div className="floating-particle delay-1 absolute top-1/2 left-3/4 h-6 w-6 rounded-full bg-white opacity-20"></div>
        <div className="floating-particle delay-2 absolute top-3/4 left-1/3 h-3 w-3 rounded-full bg-white opacity-20"></div>
        <div className="floating-particle delay-3 absolute top-1/3 left-2/3 h-5 w-5 rounded-full bg-white opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Our Impact in Numbers</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto text-white font-light">
            Arabian Nectar Trading's success is measurable through our tangible contributions 
            to the global food market. Explore the scale of our achievements:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          {/* Countries Served */}
          <div 
            ref={el => statsRefs.current[0] = el}
            className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm shadow-xl transform transition-all duration-500"
          >
            <div className="text-5xl font-bold mb-2 text-[#c9c08f]">{counters[0]}+</div>
            <div className="uppercase tracking-wider text-[#1f3a2e]">Countries Served</div>
          </div>
          
          {/* Annual Export Volume */}
          <div 
            ref={el => statsRefs.current[1] = el}
            className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm shadow-xl transform transition-all duration-500"
          >
            <div className="text-5xl font-bold mb-2 text-[#c9c08f]">{counters[1].toLocaleString()}+</div>
            <div className="uppercase tracking-wider text-[#1f3a2e]">Metric Tons</div>
          </div>
          
          {/* Customer Satisfaction */}
          <div 
            ref={el => statsRefs.current[2] = el}
            className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm shadow-xl transform transition-all duration-500"
          >
            <div className="text-5xl font-bold mb-2 text-[#c9c08f]">{counters[2]}%</div>
            <div className="uppercase tracking-wider text-[#1f3a2e]">Satisfaction Rate</div>
          </div>
          
          {/* Product Categories */}
          <div 
            ref={el => statsRefs.current[3] = el}
            className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm shadow-xl transform transition-all duration-500"
          >
            <div className="text-5xl font-bold mb-2 text-[#c9c08f]">{counters[3]}+</div>
            <div className="uppercase tracking-wider text-[#1f3a2e]">Product Categories</div>
          </div>
          
          {/* On-Time Delivery */}
          <div 
            ref={el => statsRefs.current[4] = el}
            className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm shadow-xl transform transition-all duration-500"
          >
            <div className="text-5xl font-bold mb-2 text-[#c9c08f]">{counters[4]}%</div>
            <div className="uppercase tracking-wider text-[#1f3a2e]">On-Time Delivery</div>
          </div>
        </div>
      </div>
      
      {/* Add custom animation styles */}
      <style jsx>{`
        .floating-particle {
          animation: float 8s ease-in-out infinite;
        }
        
        .delay-1 {
          animation-delay: 1s;
          animation-duration: 10s;
        }
        
        .delay-2 {
          animation-delay: 2s;
          animation-duration: 7s;
        }
        
        .delay-3 {
          animation-delay: 3s;
          animation-duration: 9s;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0px) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
      `}</style>
    </section>
  );
}