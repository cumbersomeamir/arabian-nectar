'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ServiceCard from './components/ServiceCard';
import ServiceDetail from './components/ServiceDetail';
import Testimonial from './components/Testimonial';
import CallToAction from './components/CallToAction';
import WhyChooseUs from './components/WhyChooseUs';
import { serviceData } from './components/ServiceData';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const headerRef = useRef(null);
  const serviceRefs = useRef([]);
  
  useEffect(() => {
    // Reset refs array to match the number of services
    serviceRefs.current = serviceRefs.current.slice(0, serviceData.length);
    
    // Initialize animations
    const initAnimations = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Header animations
        gsap.fromTo(
          headerRef.current.querySelector('.header-title'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
        
        gsap.fromTo(
          headerRef.current.querySelector('.header-subtitle'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
        );
        
        gsap.fromTo(
          headerRef.current.querySelector('.header-decorative-line'),
          { width: 0 },
          { width: '100%', duration: 1, delay: 0.4, ease: 'power2.inOut' }
        );
        
        // Background animation
        gsap.to('.floating-bg', {
          y: 20,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 1.5
        });
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, []);
  
  const handleServiceClick = (serviceId) => {
    setSelectedService(selectedService === serviceId ? null : serviceId);
  };
  
  const selectedServiceData = selectedService 
    ? serviceData.find(s => s.id === selectedService) 
    : null;

  return (
    <main className="overflow-hidden">
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="py-20 md:py-28 relative"
        style={{ 
          background: 'linear-gradient(145deg, rgba(201, 192, 143, 0.15) 0%, rgba(0, 96, 57, 0.05) 100%)',
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-bg absolute top-1/4 left-1/5 w-64 h-64 bg-[#a37e2c] opacity-[0.03] rounded-full transform rotate-12"></div>
          <div className="floating-bg absolute bottom-1/3 right-1/5 w-80 h-80 bg-[#006039] opacity-[0.03] rounded-full transform -rotate-12"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="header-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Services
              <span className="block text-[#a37e2c] mt-2">From Source to Market</span>
            </h1>
            
            <div className="flex justify-center mb-8">
              <span className="header-decorative-line block h-1 w-24 bg-[#006039] mx-auto"></span>
            </div>
            
            <p className="header-subtitle text-lg text-gray-600 max-w-3xl mx-auto">
              Arabian Nectar Trading offers comprehensive services designed to streamline the sourcing, logistics, and delivery processes. Explore how our expertise can transform your food commodity supply chain.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Grid Section */}
      <section className="py-16 bg-[#f4f4f2]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceData.map((service, index) => (
              <ServiceCard 
                key={service.id}
                service={service}
                isSelected={selectedService === service.id}
                onClick={() => handleServiceClick(service.id)}
                ref={el => serviceRefs.current[index] = el}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Selected Service Detail Section */}
      {selectedServiceData && (
        <ServiceDetail service={selectedServiceData} />
      )}
      
      {/* Testimonial Section */}
      <Testimonial />
      
      {/* CTA Section */}
      <CallToAction />
      
      {/* Why Choose Us Summary */}
      <WhyChooseUs />
    </main>
  );
}