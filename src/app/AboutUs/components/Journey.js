'use client';
import { useEffect, useRef, useState } from 'react';

export default function Journey() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeYear, setActiveYear] = useState('2018');
  
  // Timeline data
  const timelineData = [
    {
      year: '2018',
      title: 'Founding of Arabian Nectar Trading',
      description: 'Arabian Nectar Trading was established in Dubai, UAE, with a focus on exporting high-quality rice and spices to regional markets in the Middle East. Our early success was driven by our commitment to quality and reliable service.'
    },
    {
      year: '2020',
      title: 'Expansion into Africa',
      description: 'Recognizing the growing demand for premium food commodities, Arabian Nectar Trading expanded its reach into key African markets, including Kenya, Nigeria, and South Africa. We introduced pulses and additional rice varieties to meet diverse consumer needs.'
    },
    {
      year: '2022',
      title: 'Portfolio Diversification',
      description: 'Arabian Nectar Trading broadened its product offerings to include potatoes, onions, cashews, and a wider range of spices, such as cardamom, cumin, and turmeric. This diversification strengthened our position as a one-stop solution for food commodity sourcing.'
    },
    {
      year: '2024',
      title: 'Global Reach and Innovation',
      description: 'By 2024, we had grown to serve over 50 countries, leveraging advanced supply chain technologies to enhance efficiency and transparency. Arabian Nectar Trading introduced digital tracking systems and quality assurance protocols, setting new industry standards.'
    },
    {
      year: '2025',
      title: 'Leading the Future',
      description: 'Today, Arabian Nectar Trading is at the forefront of the food commodity trade, with a vision to drive innovation and sustainability. We continue to expand our global network, delivering premium products and unmatched service to partners worldwide.'
    }
  ];

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
        
        // Animate timeline line drawing
        tl.fromTo(
          '.timeline-line',
          { height: 0 },
          { height: '100%', duration: 1.5, ease: 'power2.inOut' },
          '-=0.5'
        );
        
        // Animate timeline nodes and content with stagger
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        
        tl.fromTo(
          timelineItems,
          { opacity: 0, x: 50 },
          { 
            opacity: 1, 
            x: 0, 
            stagger: 0.2, 
            duration: 0.7, 
            ease: 'back.out(1.4)' 
          },
          '-=1'
        );
        
        // Set up interactive timeline animations
        timelineItems.forEach((item) => {
          const year = item.getAttribute('data-year');
          const timelineNode = item.querySelector('.timeline-node');
          
          item.addEventListener('mouseenter', () => {
            // Only animate if not the active year already
            if (year !== activeYear) {
              gsap.to(timelineNode, {
                scale: 1.3,
                backgroundColor: '#a37e2c',
                duration: 0.3,
                ease: 'back.out(1.7)'
              });
              
              gsap.to(item, {
                backgroundColor: 'rgba(163, 126, 44, 0.05)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });
          
          item.addEventListener('mouseleave', () => {
            // Only reset if not the active year
            if (year !== activeYear) {
              gsap.to(timelineNode, {
                scale: 1,
                backgroundColor: '#006039',
                duration: 0.3,
                ease: 'power2.out'
              });
              
              gsap.to(item, {
                backgroundColor: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });
          
          item.addEventListener('click', () => {
            setActiveYear(year);
          });
        });
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, [activeYear]);
  
  // Effect to handle active year changes
  useEffect(() => {
    const updateActiveStyles = async () => {
      try {
        const { gsap } = await import('gsap');
        
        // Reset all items
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        timelineItems.forEach((item) => {
          const year = item.getAttribute('data-year');
          const timelineNode = item.querySelector('.timeline-node');
          
          if (year === activeYear) {
            // Active item
            gsap.to(timelineNode, {
              scale: 1.5,
              backgroundColor: '#a37e2c',
              duration: 0.3,
              ease: 'back.out(1.7)'
            });
            
            gsap.to(item, {
              backgroundColor: 'rgba(163, 126, 44, 0.05)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              duration: 0.3,
              ease: 'power2.out'
            });
          } else {
            // Inactive items
            gsap.to(timelineNode, {
              scale: 1,
              backgroundColor: '#006039',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            gsap.to(item, {
              backgroundColor: 'white',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      } catch (error) {
        console.error("Error updating active styles:", error);
      }
    };
    
    updateActiveStyles();
  }, [activeYear]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-[#f4f4f2] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-3 text-[#006039] inline-block"
          >
            Our Journey
            <div className="title-underline h-1 bg-[#a37e2c] mt-2 mx-auto"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6">
            From humble beginnings to global leadership, explore the key milestones 
            in Arabian Nectar Trading's growth.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div 
            ref={timelineRef}
            className="relative flex flex-col space-y-6"
          >
            {/* Vertical timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200">
              <div className="timeline-line absolute left-0 top-0 w-full bg-[#006039] origin-top"></div>
            </div>
            
            {/* Timeline items */}
            {timelineData.map((item) => (
              <div 
                key={item.year}
                data-year={item.year}
                className={`timeline-item relative flex pl-20 py-4 px-6 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 ${activeYear === item.year ? 'bg-[#a37e2c]/5' : ''}`}
                onClick={() => setActiveYear(item.year)}
              >
                {/* Timeline node */}
                <div 
                  className={`timeline-node absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full transition-all duration-300 ${
                    activeYear === item.year ? 'bg-[#a37e2c] scale-150' : 'bg-[#006039]'
                  }`}
                >
                  <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${
                      activeYear === item.year ? 'bg-[#a37e2c]' : 'bg-[#006039]'
                    }`}></div>
                  </div>
                </div>
                
                <div className="timeline-content">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-2 md:mb-0">
                      <span className="text-2xl font-bold text-[#a37e2c]">{item.year}</span>
                      <h3 className="text-xl font-semibold text-[#006039]">{item.title}</h3>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#a37e2c] opacity-5 rounded-bl-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#006039] opacity-5 rounded-tr-full transform -translate-x-1/3 translate-y-1/3"></div>
    </section>
  );
}