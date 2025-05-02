'use client';
import { useEffect, useRef } from 'react';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, 5);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('translate-y-0', 'opacity-100');
            entry.target.classList.remove('translate-y-10', 'opacity-0');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      cardRefs.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  const features = [
    {
      title: "Uncompromising Quality",
      description: "Our products adhere to rigorous global standards. Each batch undergoes meticulous quality checks to ensure freshness, purity, and consistency.",
      icon: (
        <svg className="w-12 h-12 text-[#a37e2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: "Comprehensive Solutions",
      description: "From sourcing to shipping, we manage every step of the supply chain, ensuring a hassle-free experience for our clients.",
      icon: (
        <svg className="w-12 h-12 text-[#a37e2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      )
    },
    {
      title: "Global Reach, Local Expertise",
      description: "Based in Dubai, we leverage the UAE's logistical advantages to serve clients across diverse markets with tailored offerings.",
      icon: (
        <svg className="w-12 h-12 text-[#a37e2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: "Reliable Delivery",
      description: "With a 95% on-time delivery rate, we ensure that your business operations remain uninterrupted with fast and secure transport.",
      icon: (
        <svg className="w-12 h-12 text-[#a37e2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
        </svg>
      )
    },
    {
      title: "Sustainability Commitment",
      description: "We are dedicated to sustainable sourcing practices, partnering with suppliers who prioritize environmental responsibility.",
      icon: (
        <svg className="w-12 h-12 text-[#a37e2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      )
    }
  ];

  return (
    <section 
      id="why-choose-us"
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006039]">
            Why Choose Arabian Nectar Trading?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Arabian Nectar Trading stands out in the competitive food commodity market 
            for several compelling reasons.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="bg-gray-50 rounded-lg p-8 shadow-lg border-t-4 border-[#a37e2c] transform transition-all duration-700 ease-out translate-y-10 opacity-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#006039] to-[#a37e2c] rounded-xl p-10 text-white text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-5 left-5 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-20 h-20 border-2 border-white rounded-full"></div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
            Partner with Excellence in Food Commodity Trade
          </h3>
          <p className="max-w-2xl mx-auto mb-8 relative z-10">
            Join the growing network of businesses that trust Arabian Nectar Trading for quality, reliability, and excellence. Let's build a future of food trade together!
          </p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-4 bg-white text-[#006039] rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative z-10"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  )
}