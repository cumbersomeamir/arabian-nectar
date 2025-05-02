'use client';
import { useEffect, useRef } from 'react';

export default function Sustainability() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const initiativeRefs = useRef([]);
  
  // Sustainability initiatives data
  const initiatives = [
    {
      title: 'Sustainable Sourcing',
      description: 'We partner with farmers who implement sustainable agricultural practices, including water conservation and organic farming methods.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Supply Chain Optimization',
      description: 'Our optimized logistics reduce carbon emissions while maintaining our 95% on-time delivery rate.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
        </svg>
      )
    },
    {
      title: 'Renewable Energy',
      description: "Our Dubai facilities are transitioning to renewable energy sources, aligned with UAE's sustainability vision.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      )
    },
    {
      title: 'Waste Reduction',
      description: 'Weve implemented comprehensive waste reduction strategies throughout our operations, minimizing environmental impact.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      )
    }
  ];

  useEffect(() => {
    // Reset references array
    initiativeRefs.current = initiativeRefs.current.slice(0, initiatives.length);
    
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
        
        // Animate main content
        tl.fromTo(
          contentRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        );
        
        // Animate image with parallax effect
        tl.fromTo(
          imageRef.current,
          { opacity: 0, x: 30, scale: 0.9 },
          { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            duration: 0.8, 
            ease: 'back.out(1.4)'
          },
          '-=0.7'
        );
        
        // Add parallax effect on scroll
        gsap.to(imageRef.current.querySelector('img'), {
          y: '-20%',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        
        // Animate initiative items with stagger
        tl.fromTo(
          initiativeRefs.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.15, 
            duration: 0.6, 
            ease: 'back.out(1.4)'
          },
          '-=0.5'
        );
        
        // Add hover effects to initiative items
        initiativeRefs.current.forEach((item) => {
          if (!item) return;
          
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              y: -5,
              backgroundColor: 'rgba(0, 96, 57, 0.05)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Animate icon
            gsap.to(item.querySelector('.initiative-icon'), {
              color: '#a37e2c',
              scale: 1.2,
              rotate: 5,
              duration: 0.3,
              ease: 'back.out(1.7)'
            });
          });
          
          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              y: 0,
              backgroundColor: 'white',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Reset icon
            gsap.to(item.querySelector('.initiative-icon'), {
              color: '#006039',
              scale: 1,
              rotate: 0,
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
  }, [initiatives.length]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-[#f4f4f2] relative overflow-hidden"
    >
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-5 pattern-grid"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-3 text-[#006039] inline-block"
          >
            Our Commitment to Sustainability
            <div className="title-underline h-1 bg-[#a37e2c] mt-2 mx-auto"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6">
            Arabian Nectar Trading is dedicated to responsible business practices that 
            protect our planet and support farming communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div 
            ref={contentRef}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl font-semibold text-[#006039] mb-6">Environmental Responsibility</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Sustainability is a core pillar of Arabian Nectar Trading's operations. We partner with farmers and suppliers who prioritize eco-friendly practices, such as water-efficient irrigation and organic farming methods. By reducing waste and optimizing our supply chain, we aim to minimize our environmental footprint while delivering premium products.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Arabian Nectar Trading is also exploring renewable energy solutions for our facilities in Dubai, aligning with the UAE's vision for a sustainable future. Our commitment extends beyond environmental considerations to encompass social responsibility, ensuring fair practices throughout our supply chain.
            </p>
            
            <div className="mt-8 space-y-4">
              {initiatives.map((initiative, index) => (
                <div 
                  key={index}
                  ref={el => initiativeRefs.current[index] = el}
                  className="flex items-start bg-white p-4 rounded-lg shadow-md transition-all duration-300"
                >
                  <div className="initiative-icon mr-4 text-[#006039] transition-colors duration-300 mt-1">
                    {initiative.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#006039] mb-1">{initiative.title}</h4>
                    <p className="text-gray-700 text-sm">{initiative.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="order-1 lg:order-2 h-80 md:h-auto relative overflow-hidden rounded-lg shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Sustainable farming practices" 
              className="w-full h-full object-cover transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <p className="font-medium text-lg">
                Supporting sustainable farming across our supply chain
              </p>
            </div>
          </div>
        </div>
        
        {/* Sustainability metrics */}
        <div className="bg-white rounded-lg shadow-lg p-8 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#006039]"></div>
          <h3 className="text-2xl font-semibold text-[#006039] mb-6">Sustainability Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-[#a37e2c] mb-2">85%</div>
              <p className="text-gray-700">Of our suppliers follow sustainable farming practices</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-[#a37e2c] mb-2">30%</div>
              <p className="text-gray-700">Reduction in carbon footprint since 2022</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-[#a37e2c] mb-2">20+</div>
              <p className="text-gray-700">Community development initiatives supported</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href="/sustainability" 
              className="inline-flex items-center px-6 py-3 bg-[#006039] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#00502f] transform hover:translate-y-[-2px]"
            >
              View Sustainability Report
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Custom styles for pattern */}
      <style jsx>{`
        .pattern-grid {
          background-image: 
            linear-gradient(to right, rgba(0, 96, 57, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 96, 57, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}