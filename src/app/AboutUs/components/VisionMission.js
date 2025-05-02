'use client';
import { useEffect, useRef } from 'react';

export default function VisionMission() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);

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
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
        
        // Animate section title
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
        
        // Animate title underline
        tl.fromTo(
          '.title-underline',
          { width: 0 },
          { width: '100%', duration: 0.8, ease: 'power2.inOut' },
          '-=0.3'
        );
        
        // Animate vision card with 3D effect
        tl.fromTo(
          visionRef.current,
          { 
            opacity: 0, 
            x: -40,
            rotateY: -5
          },
          { 
            opacity: 1, 
            x: 0,
            rotateY: 0,
            duration: 0.8, 
            ease: 'back.out(1.7)' 
          },
          '-=0.4'
        );
        
        // Animate mission card with 3D effect (delayed slightly)
        tl.fromTo(
          missionRef.current,
          { 
            opacity: 0, 
            x: 40,
            rotateY: 5
          },
          { 
            opacity: 1, 
            x: 0,
            rotateY: 0,
            duration: 0.8, 
            ease: 'back.out(1.7)' 
          },
          '-=0.6'
        );
        
        // Add hover effects to cards
        [visionRef.current, missionRef.current].forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Animate the accent line
            gsap.to(card.querySelector('.accent-line'), {
              width: '50%',
              duration: 0.4,
              ease: 'power1.out'
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Animate the accent line back
            gsap.to(card.querySelector('.accent-line'), {
              width: '30%',
              duration: 0.4,
              ease: 'power1.out'
            });
          });
        });
        
        // Create a background movement effect
        gsap.to('.bg-pattern', {
          backgroundPosition: '100% 100%',
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
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
      className="py-24 bg-[#f4f4f2] relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-3 text-[#006039] inline-block"
          >
            Our Vision & Mission
            <div className="title-underline h-1 bg-[#a37e2c] mt-2 mx-auto"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6">
            At Arabian Nectar Trading, we're guided by a clear vision and purpose that 
            drives every aspect of our business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision Card */}
          <div 
            ref={visionRef}
            className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <div className="accent-line w-1/3 h-1 bg-[#a37e2c] mb-6 transition-all duration-300"></div>
            <h3 className="text-2xl font-bold mb-6 text-[#006039]">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              We aspire to be the global leader in food commodity trade, setting the benchmark for quality, innovation, and sustainability. Arabian Nectar Trading envisions a future where our end-to-end solutions empower businesses across the Middle East, Africa, and beyond, driving growth and success through trusted partnerships. By leveraging advanced technologies and Dubai's logistical advantages, we aim to redefine the food trade industry, delivering exceptional value to our clients and contributing to a resilient global food ecosystem.
            </p>
            
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#006039] opacity-5 rounded-bl-full"></div>
          </div>
          
          {/* Mission Card */}
          <div 
            ref={missionRef}
            className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <div className="accent-line w-1/3 h-1 bg-[#a37e2c] mb-6 transition-all duration-300"></div>
            <h3 className="text-2xl font-bold mb-6 text-[#006039]">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              At Arabian Nectar Trading, our mission is to provide high-quality food commodities through comprehensive, reliable solutions that simplify global trade. We are committed to delivering products that meet stringent food safety and quality standards, ensuring freshness, purity, and consistency in every shipment. By fostering sustainable partnerships and prioritizing customer satisfaction, we aim to make food sourcing seamless and worry-free for businesses worldwide.
            </p>
            
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#a37e2c] opacity-5 rounded-bl-full"></div>
          </div>
        </div>
      </div>
      
      {/* Custom styles for background pattern */}
      <style jsx>{`
        .bg-pattern {
          background-image: radial-gradient(circle at 10px 10px, #a37e2c 2px, transparent 0),
                           radial-gradient(circle at 25px 25px, #006039 2px, transparent 0);
          background-size: 40px 40px;
          background-position: 0 0;
        }
      `}</style>
    </section>
  );
}