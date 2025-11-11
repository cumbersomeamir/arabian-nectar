'use client';
import { useEffect, useRef, useState } from 'react';

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const testimonialRefs = useRef([]);
  
  // For automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // For animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          testimonialRefs.current.forEach((ref, index) => {
            if (ref) {
              setTimeout(() => {
                ref.classList.add('translate-y-0', 'opacity-100');
                ref.classList.remove('translate-y-10', 'opacity-0');
              }, index * 200);
            }
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      quote: "Arabian Nectar Trading has transformed our supply chain with their reliable delivery and premium-quality rice. Their Basmati varieties are a hit with our customers!",
      author: "Ahmed Al-Mansoori",
      position: "Distributor",
      location: "Saudi Arabia",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The spices from Arabian Nectar Trading are unmatched in freshness and flavor. Their end-to-end service makes sourcing effortless.",
      author: "Fatima Njeri",
      position: "Food Processor",
      location: "Kenya",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Working with Arabian Nectar Trading has been a game-changer for our retail business. Their consistent quality and on-time deliveries have helped us build customer trust.",
      author: "Rajiv Sharma",
      position: "Retail Chain Owner",
      location: "India",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section 
      id="testimonials"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#f4f4f2] to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006039]">
            Testimonials from Our Partners
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear what our global partners have to say about 
            their experience with Arabian Nectar Trading.
          </p>
        </div>
        
        {/* Testimonial Showcase - Mobile Carousel */}
        <div className="relative mb-12 md:hidden">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div 
                    className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#a37e2c]"
                    ref={el => testimonialRefs.current[index] = el}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500">{testimonial.position}, {testimonial.location}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <svg className="w-8 h-8 text-[#a37e2c] opacity-30" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8v8h4c0 4.4-3.6 8-8 8v2c5.5 0 10-4.5 10-10V8h-6zm14 0v8h4c0 4.4-3.6 8-8 8v2c5.5 0 10-4.5 10-10V8h-6z"/>
                      </svg>
                    </div>
                    <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile controls */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-[#a37e2c]' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Testimonial Grid - Desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              ref={el => testimonialRefs.current[index] = el}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#a37e2c] transition-all duration-700 ease-out translate-y-10 opacity-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.position}, {testimonial.location}</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="w-8 h-8 text-[#a37e2c] opacity-30" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8v8h4c0 4.4-3.6 8-8 8v2c5.5 0 10-4.5 10-10V8h-6zm14 0v8h4c0 4.4-3.6 8-8 8v2c5.5 0 10-4.5 10-10V8h-6z"/>
                </svg>
              </div>
              <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">Trusted by Businesses Worldwide</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {/* Example logos - replace with actual partner logos */}
            <div title="Meridian Foods Intl." className="w-44 h-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 text-sm md:text-base font-medium px-3 text-center leading-tight hover:shadow-md hover:-translate-y-0.5 hover:border-[#a37e2c] transition-all duration-200">
              Meridian Foods Intl.
            </div>
            <div title="Al Noor Retail Group" className="w-44 h-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 text-sm md:text-base font-medium px-3 text-center leading-tight hover:shadow-md hover:-translate-y-0.5 hover:border-[#a37e2c] transition-all duration-200">
              Al Noor Retail Group
            </div>
            <div title="Pacific Harvest Imports" className="w-44 h-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 text-sm md:text-base font-medium px-3 text-center leading-tight hover:shadow-md hover:-translate-y-0.5 hover:border-[#a37e2c] transition-all duration-200">
              Pacific Harvest Imports
            </div>
            <div title="Continental Provisions Co." className="w-44 h-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 text-sm md:text-base font-medium px-3 text-center leading-tight hover:shadow-md hover:-translate-y-0.5 hover:border-[#a37e2c] transition-all duration-200">
              Continental Provisions Co.
            </div>
            <div title="Nile Delta Distributors" className="w-44 h-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 text-sm md:text-base font-medium px-3 text-center leading-tight hover:shadow-md hover:-translate-y-0.5 hover:border-[#a37e2c] transition-all duration-200">
              Nile Delta Distributors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}