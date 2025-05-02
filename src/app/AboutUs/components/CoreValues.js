'use client';
import { useEffect, useRef } from 'react';

export default function CoreValues() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const valuesRef = useRef([]);

  // Core values data
  const values = [
    {
      title: "Quality",
      description: "Quality is the cornerstone of Arabian Nectar Trading. Every product, from our 1121 Basmati Rice (8.3 mm avg. length, 100% sortex cleaned) to our polished Toor Dal, undergoes rigorous testing to ensure compliance with global standards. Our commitment to freshness and purity guarantees that our clients receive only the best.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: "Reliability",
      description: "With a 95% on-time delivery rate and transparent communication, Arabian Nectar Trading is a partner you can count on. We prioritize clear, professional support at every step, ensuring our clients' operations run smoothly and efficiently.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: "Sustainability",
      description: "Arabian Nectar Trading is dedicated to sustainable sourcing practices. We partner with farmers and suppliers who share our commitment to environmental responsibility, contributing to an ethical and eco-friendly food supply chain.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: "Customer-Centricity",
      description: "Our clients are at the heart of everything we do. Arabian Nectar Trading works closely with partners to understand their unique needs, offering tailored solutions that drive business success. Our 98% customer satisfaction rate reflects our dedication to exceeding expectations.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      title: "Global Perspective",
      description: "We embrace cultural diversity and maintain a global outlook that connects markets and respects regional traditions. With a presence in over 50 countries, we combine local market knowledge with international standards, delivering tailored solutions for diverse markets.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "We embrace innovation to improve our services, processes, and products, staying ahead in a dynamic market. By leveraging advanced technologies, we enhance efficiency and transparency throughout our supply chain, setting new industry standards.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      )
    }
  ];

  useEffect(() => {
    // Reset references array to match the number of values
    valuesRef.current = valuesRef.current.slice(0, values.length);
    
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
        
        // Animate value cards with stagger effect
        tl.fromTo(
          valuesRef.current,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            stagger: 0.15, 
            duration: 0.8, 
            ease: 'back.out(1.4)'
          },
          '-=0.4'
        );
        
        // Add hover effects to value cards
        valuesRef.current.forEach((card, index) => {
          if (!card) return;
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Highlight icon
            gsap.to(card.querySelector('.value-icon'), {
              color: '#a37e2c',
              scale: 1.1,
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
            
            // Reset icon
            gsap.to(card.querySelector('.value-icon'), {
              color: '#006039',
              scale: 1,
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
  }, [values.length]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#f4f4f2] rounded-bl-full opacity-50 transform -translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#f4f4f2] rounded-tr-full opacity-50 transform translate-x-1/4 -translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-3 text-[#006039] inline-block"
          >
            Our Core Values
            <div className="title-underline h-1 bg-[#a37e2c] mt-2 mx-auto"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6">
            These principles guide our decisions, shape our culture, and define our approach 
            to business every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              ref={el => valuesRef.current[index] = el}
              className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#006039] transition-all duration-300"
            >
              <div className="value-icon text-[#006039] transition-colors duration-300 mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#006039]">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
        
        {/* Additional value proposition */}
        <div className="mt-16 max-w-4xl mx-auto bg-[#f4f4f2] p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-[#006039] mb-4">Our Promise to You</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-[#006039] bg-opacity-10 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#a37e2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                </svg>
              </div>
            </div>
            <div className="md:w-3/4">
              <p className="text-gray-700 leading-relaxed">
                At Arabian Nectar Trading, we commit to upholding these core values in every interaction and transaction. 
                Whether you're a distributor, retailer, or food service provider, our team is dedicated to delivering 
                premium products with reliability, integrity, and a customer-first approach. We don't just supply food commodities—we 
                build lasting partnerships based on trust and mutual success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}