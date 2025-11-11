'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function RiceSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [activeType, setActiveType] = useState('basmati');
  const [activeRice, setActiveRice] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Rice data
  const riceData = {
    basmati: [
      {
        id: 'basmati-1121',
        name: '1121 Basmati Rice',
        varieties: ['Steam', 'Golden Sella', 'White Sella'],
        grainLength: '8.3 mm',
        moisture: '14% Max',
        broken: '1% Max',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '1121 Basmati Rice is renowned for its exceptional length, aromatic fragrance, and fluffy texture when cooked. Sourced from the finest fields of Punjab, India, this premium variety undergoes rigorous quality control to ensure purity and consistency.'
      },
      {
        id: 'basmati-1509',
        name: '1509 Basmati Rice',
        varieties: ['Steam', 'Golden Sella', 'White Sella'],
        grainLength: '8.35 mm',
        moisture: '14% Max',
        broken: '1% Max',
        image: 'https://om-dashboards-dev.s3.ap-south-1.amazonaws.com/products/ed7465aa-eab6-481a-b60c-8e3fa557e315/1573558866321.png',
        description: '1509 Basmati Rice features extra-long grains with a delicate aroma and tender texture. Sourced from premium rice-growing regions in India, it undergoes stringent quality checks, making it ideal for biryani, pilaf, and other rice dishes that demand perfection.'
      },
      {
        id: 'basmati-pusa',
        name: 'Pusa 1401 Basmati Rice',
        varieties: ['Steam', 'Golden Sella', 'White Sella'],
        grainLength: '7.9-8.1 mm',
        moisture: '14% Max',
        broken: '1% Max',
        image: 'https://5.imimg.com/data5/SELLER/Default/2025/2/488930767/FP/UB/AJ/95041853/pusa-white-sella-rice-500x500.jpg',
        description: 'Pusa 1401 Basmati Rice offers a slightly shorter grain length than 1121 and 1509 but retains the classic Basmati aroma and texture. Sourced from certified farms in Uttar Pradesh, India, this variety is a cost-effective option for bulk buyers, delivering premium quality for catering, retail, and food service industries.'
      }
    ],
    nonBasmati: [
      {
        id: 'non-basmati-pr11',
        name: 'PR 11/14 Non-Basmati Rice',
        varieties: ['Raw', 'Steam', 'Golden Sella', 'White Sella'],
        grainLength: '6.2-6.8 mm',
        moisture: '14% Max',
        broken: '1% Max',
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'PR 11/14 Non-Basmati Rice is a medium-grain variety known for its versatility and affordability. Sourced from Punjab and Haryana, it is widely used in households, restaurants, and food processing units across the Middle East and Africa. Its consistent texture and quality make it ideal for daily consumption.'
      },
      {
        id: 'non-basmati-sharbati',
        name: 'Sharbati Non-Basmati Rice',
        varieties: ['Steam', 'Golden Sella', 'White Sella'],
        grainLength: '6.9-7.3 mm',
        moisture: '14% Max',
        broken: '1% Max',
        image: 'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Sharbati Non-Basmati Rice is prized for its soft texture and medium-long grains, offering a cost-effective alternative to Basmati. Sourced from India\'s northern states, it is a popular choice for regional cuisines in the UAE, Qatar, and Kenya, delivering consistent quality for both retail and bulk buyers.'
      },
      {
        id: 'non-basmati-ir64',
        name: 'IR-64 Non-Basmati Rice',
        varieties: ['Raw 5% Broken', 'Parboiled 5% Broken'],
        grainLength: '5.0-6.0 mm',
        moisture: '14% Max',
        broken: '5% Max',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'IR-64 Non-Basmati Rice is a short-grain variety known for its high yield and affordability. Sourced from Andhra Pradesh and Telangana, it is widely used in bulk food programs, retail, and food aid initiatives across Africa and the Middle East.'
      }
    ]
  };

  useEffect(() => {
    // Initialize animations
    const initAnimations = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        const TextPluginModule = await import('gsap/TextPlugin');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        const TextPlugin = TextPluginModule.TextPlugin;
        
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
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
        
        // Animate tab buttons
        tl.fromTo(
          '.tab-button',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.3'
        );
        
        // Initial animation for rice cards
        animateRiceCards('basmati', gsap);
        
        // Add grain floating animation
        gsap.to('.floating-grain', {
          y: -15,
          x: 10,
          rotation: 10,
          duration: 3,
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
  }, []);
  
  // Function to animate rice cards
  const animateRiceCards = async (type, gsapInstance = null) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    try {
      // Get GSAP if not provided
      const gsap = gsapInstance || (await import('gsap')).default;
      
      // If changing tab, animate current cards out first
      if (activeType !== type && cardsContainerRef.current) {
        await new Promise(resolve => {
          gsap.to('.rice-card', {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: resolve
          });
        });
        
        // Update active type
        setActiveType(type);
        
        // Give DOM time to update
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Animate new cards in
      gsap.fromTo(
        '.rice-card',
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          stagger: 0.15, 
          duration: 0.7, 
          ease: 'back.out(1.7)',
          clearProps: 'all'
        }
      );
    } catch (error) {
      console.error("Error animating rice cards:", error);
    } finally {
      setIsAnimating(false);
    }
  };
  
  // Handle tab change
  const handleTabChange = async (type) => {
    if (type === activeType || isAnimating) return;
    const { default: gsap } = await import('gsap');
    await animateRiceCards(type, gsap);
  };
  
  // Handle rice card click
  const handleRiceClick = async (rice) => {
    setActiveRice(rice);
    
    try {
      const { default: gsap } = await import('gsap');
      
      // Animate modal in
      gsap.fromTo(
        '.rice-modal',
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
        gsap.to('.rice-modal', {
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
      
      // Reset active rice
      setActiveRice(null);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="rice"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#f4f4f2] rounded-bl-[80%] opacity-50 transform"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#f4f4f2] rounded-tr-[70%] opacity-50 transform"></div>
      
      {/* Floating rice grains */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-grain absolute top-1/4 left-[10%] w-12 h-20 bg-[#f9f9f7] rounded-full transform -rotate-12 opacity-30"></div>
        <div className="floating-grain absolute top-1/3 right-[15%] w-10 h-16 bg-[#f9f9f7] rounded-full transform rotate-25 opacity-20"></div>
        <div className="floating-grain absolute bottom-1/4 left-[20%] w-14 h-24 bg-[#f9f9f7] rounded-full transform rotate-12 opacity-25"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold mb-4 inline-block relative"
          >
            Premium Rice Varieties
            <span className="absolute left-0 bottom-0 w-full h-1 bg-[#a37e2c] title-highlight"></span>
          </h2>
          
          <p 
            ref={introRef}
            className="text-gray-600 mt-6"
          >
            Arabian Nectar Trading offers an extensive range of premium rice varieties, from aromatic Basmati to versatile non-Basmati options. Each grain is carefully sourced, rigorously tested, and expertly processed to meet the highest quality standards, ensuring exceptional taste and texture for your culinary needs.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#f4f4f2] p-1 rounded-lg shadow-md">
            <button 
              className={`tab-button px-6 py-3 rounded-lg transition-all duration-300 ${
                activeType === 'basmati' 
                  ? 'bg-white text-[#006039] font-medium shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => handleTabChange('basmati')}
            >
              Basmati Rice
            </button>
            <button 
              className={`tab-button px-6 py-3 rounded-lg transition-all duration-300 ${
                activeType === 'nonBasmati' 
                  ? 'bg-white text-[#006039] font-medium shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => handleTabChange('nonBasmati')}
            >
              Non-Basmati Rice
            </button>
          </div>
        </div>
        
        {/* Rice Cards */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {riceData[activeType].map((rice) => (
            <div 
              key={rice.id}
              className="rice-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              onClick={() => handleRiceClick(rice)}
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={rice.image} 
                  alt={rice.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-xl font-semibold text-white">{rice.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Varieties</h4>
                  <div className="flex flex-wrap gap-2">
                    {rice.varieties.map((variety, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-[#f4f4f2] text-[#006039] text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {variety}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Grain Length</span>
                    <span className="font-medium text-gray-800">{rice.grainLength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Moisture</span>
                    <span className="font-medium text-gray-800">{rice.moisture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Broken</span>
                    <span className="font-medium text-gray-800">{rice.broken}</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button 
                    className="inline-flex items-center text-[#006039] font-medium hover:text-[#a37e2c] transition-colors duration-300"
                    onClick={() => handleRiceClick(rice)}
                  >
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
          <Link href="/Contact" className="inline-flex items-center px-8 py-4 bg-[#006039] text-white rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-[#004c2d] transform hover:translate-y-[-2px]">
            Download Rice Catalogue
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Rice Detail Modal */}
      {activeRice && (
        <div 
          className="modal-backdrop fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="rice-modal bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 relative">
                <img 
                  src={activeRice.image} 
                  alt={activeRice.name} 
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
                <h3 className="text-2xl font-bold text-[#006039] mb-2">{activeRice.name}</h3>
                
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Varieties</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeRice.varieties.map((variety, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-[#f4f4f2] text-[#006039] text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {variety}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#f4f4f2] p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Grain Length</div>
                      <div className="font-medium">{activeRice.grainLength}</div>
                    </div>
                    <div className="bg-[#f4f4f2] p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Moisture</div>
                      <div className="font-medium">{activeRice.moisture}</div>
                    </div>
                    <div className="bg-[#f4f4f2] p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Broken</div>
                      <div className="font-medium">{activeRice.broken}</div>
                    </div>
                    <div className="bg-[#f4f4f2] p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Processing</div>
                      <div className="font-medium">100% Sortex Cleaned</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-gray-700">{activeRice.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Packaging Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {['1 kg', '5 kg', '10 kg', '25 kg', '40 kg'].map((size, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-[#f4f4f2] text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <Link href="/Contact" className="px-6 py-3 bg-[#a37e2c] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#8a6a24]">
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}