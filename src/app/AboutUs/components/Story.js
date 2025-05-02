'use client';
import { useEffect, useRef } from 'react';

export default function Story() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

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
        
        // Animate title with underline
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
        
        // Animate underline separately
        tl.fromTo(
          '.title-underline',
          { width: 0 },
          { width: '100%', duration: 0.8, ease: 'power2.inOut' },
          '-=0.3' // Start slightly before title animation completes
        );
        
        // Animate content paragraphs with stagger
        tl.fromTo(
          contentRef.current.querySelectorAll('p'),
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0, 
            stagger: 0.2, 
            duration: 0.7, 
            ease: 'power2.out' 
          },
          '-=0.5'
        );
        
        // Animate image with subtle 3D effect
        tl.fromTo(
          imageRef.current,
          { opacity: 0, x: 40, rotateY: 10 },
          { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            duration: 1, 
            ease: 'back.out(1.5)' 
          },
          '-=0.8'
        );
        
        // Add hover effect to image
        if (imageRef.current) {
          imageRef.current.addEventListener('mouseenter', () => {
            gsap.to(imageRef.current, {
              scale: 1.03,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              duration: 0.3
            });
          });
          
          imageRef.current.addEventListener('mouseleave', () => {
            gsap.to(imageRef.current, {
              scale: 1,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              duration: 0.3
            });
          });
        }
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold mb-3 text-[#006039] inline-block relative"
            >
              Our Story
              <div className="title-underline h-1 bg-[#a37e2c] mt-2"></div>
            </h2>
            
            <div 
              ref={contentRef}
              className="mt-6 space-y-5"
            >
              <p className="text-gray-700 leading-relaxed">
                Arabian Nectar Trading was founded in the bustling trade hub of Dubai, UAE, with a vision to connect the world's finest food producers with markets across the Middle East, Africa, and beyond. As a leading exporter and wholesaler, we specialize in premium food commodities, including rice, spices, pulses, potatoes, onions, cashews, and more. Our journey began with a commitment to simplify global food sourcing, delivering high-quality products that meet the diverse needs of our clients while upholding the highest standards of reliability and excellence.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                From our headquarters in Dubai's Digital Park, DSO, Arabian Nectar Trading has grown into a trusted name in the industry, serving over 50 countries with a robust portfolio of products. We leverage Dubai's strategic position as a global trade gateway to ensure efficient logistics and seamless delivery. Our deep understanding of market dynamics, combined with strong supplier relationships, allows us to curate offerings that resonate with regional culinary traditions and consumer preferences.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Our success is rooted in our end-to-end approach. We manage every aspect of the supply chain—sourcing, quality assurance, logistics, documentation, and financing—allowing our partners to focus on their core business. With a 95% on-time delivery rate and a 98% customer satisfaction rate, Arabian Nectar Trading has earned a reputation for consistency and trust. Whether you're a distributor, retailer, or food service provider, we are your reliable partner for premium food commodities.
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#a37e2c] opacity-10 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#006039] opacity-10 rounded-full"></div>
              
              {/* Main image with perspective effect */}
              <div 
                ref={imageRef}
                className="relative z-10 transform perspective-1000 shadow-xl rounded-lg overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1567449303078-57ad995bd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Arabian Nectar Trading headquarters in Dubai" 
                  className="w-full h-auto rounded-lg"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <p className="font-medium text-lg">
                    Our headquarters in Dubai Digital Park, DSO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}