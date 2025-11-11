'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PulsesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const pulsesRef = useRef(null);
  
  // Pulses data
  const pulses = [
    {
      id: 'toor-dal',
      name: 'Toor Dal',
      image: 'https://www.adidevgroup.com/img/products/toor-daal.jpg',
      specifications: [
        { label: 'Quality', value: 'High Quality, Polished' },
        { label: 'Moisture', value: '12% Max' },
        { label: 'Admixture', value: '0.5% Max' }
      ],
      packaging: ['1 kg', '5 kg', '25 kg'],
      description: 'Toor Dal, or split pigeon peas, is a staple in South Asian and Middle Eastern cuisines, known for its rich, nutty flavor. Sourced from certified farms, it is polished to perfection for use in dals, soups, and stews.',
      marketInsight: 'Toor Dal exports to the GCC region grew by 15% in 2024, with Arabian Nectar Trading supplying 3,000 metric tons to the UAE and Saudi Arabia.'
    },
    {
      id: 'masoor-dal',
      name: 'Masoor Dal',
      image: 'https://5.imimg.com/data5/BL/XH/MY-49530431/masoor-dal-500x500.jpg',
      specifications: [
        { label: 'Quality', value: 'High Quality, Polished' },
        { label: 'Moisture', value: '12% Max' },
        { label: 'Admixture', value: '0.5% Max' }
      ],
      packaging: ['1 kg', '5 kg', '25 kg'],
      description: 'Masoor Dal, or split red lentils, is prized for its vibrant color and quick-cooking properties. Polished for purity, it offers a mild, earthy flavor ideal for soups and curries.',
      marketInsight: 'Masoor Dal demand in Africa increased by 12% in 2024, with Arabian Nectar Trading exporting 2,500 metric tons to Kenya and Nigeria.'
    },
    {
      id: 'chana-dal',
      name: 'Chana Dal',
      image: 'https://twobrothersindiashop.com/cdn/shop/articles/chana-dal-benefits.png?v=1694585472&width=1024',
      specifications: [
        { label: 'Quality', value: 'High Quality, Polished' },
        { label: 'Moisture', value: '12% Max' },
        { label: 'Admixture', value: '0.5% Max' }
      ],
      packaging: ['1 kg', '5 kg', '25 kg'],
      description: 'Chana Dal, or split chickpeas, is a versatile lentil with a slightly sweet, nutty taste. Sourced from Madhya Pradesh, it is polished to ensure quality, ideal for dals, snacks, and desserts.',
      marketInsight: 'Chana Dal exports to the Middle East grew by 10% in 2024, with Arabian Nectar Trading supplying 2,000 metric tons to Qatar and Kuwait.'
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
        
        // Animate pulses cards
        tl.fromTo(
          '.pulse-card',
          { 
            opacity: 0, 
            y: 50,
            scale: 0.95
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            stagger: 0.15, 
            duration: 0.7, 
            ease: 'back.out(1.7)'
          },
          '-=0.3'
        );
        
        // Add floating particles animation
        gsap.to('.pulse-particle', {
          y: -20,
          x: 15,
          rotation: 15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.8
        });
        
        // Add hover effects to pulse cards
        document.querySelectorAll('.pulse-card').forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Animate image
            const image = card.querySelector('.pulse-image');
            gsap.to(image, {
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.out'
            });
            
            // Show the "View Details" button
            const detailsBtn = card.querySelector('.details-btn');
            gsap.to(detailsBtn, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'back.out(1.7)'
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Reset image
            const image = card.querySelector('.pulse-image');
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: 'power2.out'
            });
            
            // Hide the "View Details" button
            const detailsBtn = card.querySelector('.details-btn');
            gsap.to(detailsBtn, {
              opacity: 0,
              y: 10,
              duration: 0.2,
              ease: 'power2.in'
            });
          });
        });
        
        // Animate market growth numbers
        const growthCounter = () => {
          gsap.fromTo(
            '.growth-number',
            { textContent: 0 },
            {
              textContent: '5.1',
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 0.1 },
              stagger: 0.2,
              onUpdate: function() {
                const target = this.targets()[0];
                target.textContent = parseFloat(target.textContent).toFixed(1) + '%';
              }
            }
          );
        };
        
        // Trigger growth counter when in view
        ScrollTrigger.create({
          trigger: '.market-growth-section',
          start: 'top 80%',
          onEnter: growthCounter,
          once: true
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
      id="pulses"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#f4f4f2] rounded-bl-full opacity-50 transform -translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#f4f4f2] rounded-tr-full opacity-50 transform translate-x-1/4 -translate-y-1/4"></div>
      
      {/* Floating pulse particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pulse-particle absolute top-1/4 left-[15%] w-8 h-8 rounded-full bg-[#006039] opacity-10"></div>
        <div className="pulse-particle absolute top-1/3 right-[20%] w-12 h-12 rounded-full bg-[#006039] opacity-15"></div>
        <div className="pulse-particle absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full bg-[#006039] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold mb-4 inline-block relative"
          >
            Premium Pulses
            <span className="absolute left-0 bottom-0 w-full h-1 bg-[#a37e2c] title-highlight"></span>
          </h2>
          
          <p 
            ref={introRef}
            className="text-gray-600 mt-6"
          >
            Pulses are a critical component of Arabian Nectar Trading's portfolio, offering high-protein, polished products that cater to global dietary needs. Sourced from the finest growing regions in India, our pulses are carefully processed to ensure purity and consistency, delivering exceptional quality for every culinary application.
          </p>
        </div>
        
        {/* Pulses Cards */}
        <div 
          ref={pulsesRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {pulses.map((pulse, index) => (
            <div 
              key={pulse.id}
              className="pulse-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={pulse.image} 
                  alt={pulse.name} 
                  className="pulse-image w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-xl font-semibold text-white">{pulse.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 mb-5">
                  {pulse.specifications.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">{spec.label}</span>
                      <span className="font-medium text-gray-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Packaging</h4>
                  <div className="flex flex-wrap gap-2">
                    {pulse.packaging.map((size, i) => (
                      <span 
                        key={i} 
                        className="inline-block bg-[#f4f4f2] text-[#006039] text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="mt-4 text-gray-700 text-sm line-clamp-3">
                  {pulse.description}
                </p>
                
                <div className="mt-6 text-center">
                  <Link href="/Contact" className="details-btn inline-flex items-center px-6 py-2 bg-[#006039] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#004c2d] opacity-0 transform translate-y-2">
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Market Growth Section */}
        <div className="market-growth-section max-w-5xl mx-auto mt-20 bg-[#f4f4f2] rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10">
              <h3 className="text-2xl font-bold text-[#006039] mb-6">Market Growth & Insights</h3>
              <p className="text-gray-700 mb-6">
                The global pulses market is projected to grow at a CAGR of 5.1% from 2025 to 2030, driven by the shift toward plant-based diets and increasing awareness of sustainable protein sources.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#a37e2c] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Our Toor Dal has a 22% protein content, verified by nutritional testing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#a37e2c] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Plant-based protein demand increased by 25% in the Middle East in 2024</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#a37e2c] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Arabian Nectar Trading exported 7,500 metric tons of pulses in 2024</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#006039] text-white p-10 flex flex-col justify-center">
              <div className="text-center">
                <h4 className="text-xl font-medium mb-8">Projected CAGR 2025-2030</h4>
                <div className="text-6xl font-bold mb-3 growth-number">0.0%</div>
                <p className="text-white/80">
                  Global pulses market growth rate, driven by sustainable diets and plant-based protein shift
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* View all button */}
        <div className="text-center mt-16">
          <Link href="/Contact" className="inline-flex items-center px-8 py-4 bg-[#006039] text-white rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-[#004c2d] transform hover:translate-y-[-2px]">
            Download Pulses Catalogue
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}