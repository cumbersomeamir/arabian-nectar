'use client';
import { useEffect, useRef, useState } from 'react';

export default function SpicesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const spiceRefs = useRef([]);
  const [activeSpice, setActiveSpice] = useState(null);
  
  // Spices data
  const spices = [
    {
      id: 'red-chili',
      name: 'Red Chili',
      image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specifications: {
        moisture: '12% Max',
        capsaicinContent: '0.5-1%',
        astaColorValue: '80-120'
      },
      packaging: ['1 kg', '5 kg', '25 kg'],
      description: 'Sourced from Guntur, India, our red chilies are renowned for their vibrant color and bold heat, with a Scoville Heat Unit (SHU) range of 20,000-50,000. Carefully dried and packaged to preserve flavor, they are ideal for curries, sauces, and spice blends.',
      marketInsight: 'The Middle East imported 25,000 metric tons of red chilies in 2024, with Arabian Nectar Trading supplying 5% of the UAE\'s demand, as per trade data.'
    },
    {
      id: 'black-pepper',
      name: 'Black Pepper',
      image: 'https://images.unsplash.com/photo-1518614935489-0624d9294a68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specifications: {
        moisture: '13% Max',
        piperineContent: '4-6%',
        density: '500-550 g/L'
      },
      packaging: ['1 kg', '5 kg', '25 kg'],
      description: 'Sourced from Kerala, India, our black pepper is known for its sharp, pungent flavor and high piperine content, delivering robust seasoning power. It is processed to ensure consistent granule size and quality.',
      marketInsight: 'Black pepper demand in Africa grew by 8% in 2024, with Arabian Nectar Trading exporting 2,000 metric tons to Kenya and Nigeria.'
    },
    {
      id: 'coriander',
      name: 'Coriander',
      image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specifications: {
        moisture: '9% Max',
        volatileOil: '0.1-0.3%',
        admixture: '1% Max'
      },
      packaging: ['1 kg', '5 kg', '25 kg'],
      description: 'Our coriander seeds and powder, sourced from Rajasthan, offer a warm, citrusy flavor essential for Middle Eastern and South Asian cuisines. They are processed to retain natural oils and aroma.',
      marketInsight: 'Coriander exports to the GCC region increased by 10% in 2024, with Arabian Nectar Trading supplying 1,500 metric tons to Saudi Arabia.'
    },
    {
      id: 'cardamom',
      name: 'Cardamom',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specifications: {
        moisture: '10% Max',
        volatileOil: '3-5%',
        size: '6-8 mm (Green)'
      },
      packaging: ['500 g', '1 kg', '5 kg'],
      description: 'Sourced from Idukki, India, our green and black cardamom varieties are prized for their sweet, floral notes and intense aroma. They are hand-graded for premium quality, ideal for desserts and rice dishes.',
      marketInsight: 'Cardamom demand in the UAE grew by 15% in 2024, driven by its use in coffee and sweets, with Arabian Nectar Trading supplying 500 metric tons.'
    },
    {
      id: 'turmeric',
      name: 'Turmeric',
      image: 'https://images.unsplash.com/photo-1615484477201-8e7e077991ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specifications: {
        moisture: '10% Max',
        curcuminContent: '3-5%',
        admixture: '1% Max'
      },
      packaging: ['1 kg', '5 kg', '25 kg'],
      description: 'Sourced from Erode, India, our turmeric is vibrant and potent, with high curcumin content for health benefits. It is ideal for curries, rice dishes, and supplements.',
      marketInsight: 'Turmeric demand grew by 20% in 2024 due to its anti-inflammatory properties, with Arabian Nectar Trading exporting 1,200 metric tons to the UAE and Africa.'
    },
    {
      id: 'cumin',
      name: 'Cumin',
      image: 'https://images.unsplash.com/photo-1638275963918-af4c9a41a226?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      specifications: {
        moisture: '10% Max',
        volatileOil: '2-4%',
        admixture: '1% Max'
      },
      packaging: ['1 kg', '5 kg', '25 kg'],
      description: 'Our cumin seeds, sourced from Gujarat, deliver a robust, earthy flavor that is a staple in global cuisines. Processed to ensure purity, they are ideal for spice blends and grilled dishes.',
      marketInsight: 'Cumin exports to Africa rose by 12% in 2024, with Arabian Nectar Trading supplying 1,000 metric tons to Ethiopia and South Africa.'
    }
  ];

  useEffect(() => {
    // Reset references array to match the number of spices
    spiceRefs.current = spiceRefs.current.slice(0, spices.length);
    
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
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
        
        // Animate title highlight
        tl.fromTo(
          '.title-highlight',
          { width: 0 },
          { width: '100%', duration: 0.6, ease: 'power2.inOut' },
          '-=0.4'
        );
        
        // Animate intro text
        tl.fromTo(
          introRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        );
        
        // Animate spice containers with stagger effect
        tl.fromTo(
          spiceRefs.current,
          { 
            opacity: 0, 
            y: 50,
            rotationY: 25,
            transformOrigin: 'center center'
          },
          { 
            opacity: 1, 
            y: 0,
            rotationY: 0,
            stagger: 0.1, 
            duration: 0.8, 
            ease: 'back.out(1.7)'
          },
          '-=0.3'
        );
        
        // Add hover effects to spice containers
        spiceRefs.current.forEach((container) => {
          if (!container) return;
          
          container.addEventListener('mouseenter', () => {
            gsap.to(container, {
              y: -10,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Scale image slightly
            const image = container.querySelector('.spice-image');
            if (image) {
              gsap.to(image, {
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          });
          
          container.addEventListener('mouseleave', () => {
            gsap.to(container, {
              y: 0,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Reset image scale
            const image = container.querySelector('.spice-image');
            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          });
        });
        
        // Add spice particles floating animation
        gsap.to('.spice-particle', {
          y: -30,
          x: 15,
          rotation: '+=20',
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.5
        });
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, [spices.length]);
  
  // Handle spice click
  const handleSpiceClick = async (spice) => {
    setActiveSpice(spice);
    
    try {
      const { default: gsap } = await import('gsap');
      
      // Animate modal in
      gsap.fromTo(
        '.spice-modal',
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
      
      // Animate modal backdrop
      gsap.fromTo(
        '.modal-backdrop',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    } catch (error) {
      console.error("Error animating modal:", error);
    }
  };
  
  // Handle modal close
  const handleCloseModal = async () => {
    try {
      const { default: gsap } = await import('gsap');
      
      // Animate modal out
      await new Promise(resolve => {
        gsap.to('.spice-modal', {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: resolve
        });
        
        // Animate backdrop out
        gsap.to('.modal-backdrop', {
          opacity: 0,
          duration: 0.3
        });
      });
      
      // Reset active spice
      setActiveSpice(null);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="spices"
      className="py-24 bg-[#f4f4f2] relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      
      {/* Decorative spice particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="spice-particle absolute top-1/4 left-[15%] w-10 h-10 rounded-full bg-[#a37e2c] opacity-10"></div>
        <div className="spice-particle absolute top-1/3 right-[20%] w-12 h-12 rounded-full bg-[#a37e2c] opacity-15"></div>
        <div className="spice-particle absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full bg-[#a37e2c] opacity-10"></div>
        <div className="spice-particle absolute bottom-1/3 right-1/4 w-14 h-14 rounded-full bg-[#a37e2c] opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold mb-4 inline-block relative"
          >
            Authentic Spices
            <span className="absolute left-0 bottom-0 w-full h-1 bg-[#a37e2c] title-highlight"></span>
          </h2>
          
          <p 
            ref={introRef}
            className="text-gray-600 mt-6"
          >
            Arabian Nectar Trading's spice portfolio delivers authentic flavors and vibrant colors to global cuisines. Sourced from India's premium growing regions, our spices undergo stringent quality testing to ensure purity and potency, preserving the rich aromas and essential oils that elevate culinary creations.
          </p>
        </div>
        
        {/* Spices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spices.map((spice, index) => (
            <div 
              key={spice.id}
              ref={el => spiceRefs.current[index] = el}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl cursor-pointer"
              onClick={() => handleSpiceClick(spice)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={spice.image} 
                  alt={spice.name} 
                  className="spice-image w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-xl font-semibold text-white">{spice.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 mb-5">
                  {Object.entries(spice.specifications).map(([key, value], i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Packaging</h4>
                  <div className="flex flex-wrap gap-2">
                    {spice.packaging.map((size, i) => (
                      <span 
                        key={i} 
                        className="inline-block bg-[#f4f4f2] text-[#006039] text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center text-[#006039] font-medium hover:text-[#a37e2c] transition-colors duration-300">
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-[#a37e2c] text-white rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-[#8a6a24] transform hover:translate-y-[-2px]">
            Download Spices Catalogue
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Spice Detail Modal */}
      {activeSpice && (
        <div 
          className="modal-backdrop fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="spice-modal bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 relative">
                <img 
                  src={activeSpice.image} 
                  alt={activeSpice.name} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: '300px' }}
                />
                <div className="absolute top-0 right-0 p-4">
                  <button 
                    className="bg-white rounded-full p-2 shadow-lg"
                    onClick={handleCloseModal}
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="md:w-3/5 p-8">
                <h3 className="text-2xl font-bold text-[#006039] mb-4">{activeSpice.name}</h3>
                
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(activeSpice.specifications).map(([key, value], i) => (
                      <div key={i} className="bg-[#f4f4f2] p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-gray-700">{activeSpice.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Market Insight</h4>
                  <p className="text-gray-700 italic bg-[#f4f4f2] p-3 rounded-lg border-l-4 border-[#a37e2c]">
                    {activeSpice.marketInsight}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Packaging Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeSpice.packaging.map((size, i) => (
                      <span 
                        key={i} 
                        className="inline-block bg-[#f4f4f2] text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-300">
                    Download Spec Sheet
                  </button>
                  <button className="px-6 py-3 bg-[#a37e2c] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#8a6a24]">
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom styles for background pattern */}
      <style jsx>{`
        .bg-pattern {
          background-image: 
            radial-gradient(circle at 10px 10px, rgba(163, 126, 44, 0.2) 2px, transparent 0),
            radial-gradient(circle at 25px 25px, rgba(0, 96, 57, 0.2) 2px, transparent 0);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
}