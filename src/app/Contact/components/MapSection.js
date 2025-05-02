'use client';
import { useEffect, useRef } from 'react';

export default function MapSection() {
  const mapSectionRef = useRef(null);
  const mapContainerRef = useRef(null);
  
  useEffect(() => {
    const animateMap = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate section entrance
        ScrollTrigger.create({
          trigger: mapSectionRef.current,
          start: 'top bottom-=100',
          onEnter: () => {
            gsap.fromTo(
              mapContainerRef.current,
              { 
                opacity: 0, 
                y: 50,
                scale: 0.95
              },
              { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out'
              }
            );
            
            // Add floating effect to map pin
            const mapPin = mapContainerRef.current.querySelector('.map-pin');
            if (mapPin) {
              gsap.to(mapPin, {
                y: -10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              });
              
              // Pulse effect for the pin
              gsap.to(mapPin.querySelector('.pin-pulse'), {
                scale: 1.5,
                opacity: 0,
                duration: 2,
                repeat: -1,
                ease: 'sine.out'
              });
            }
          }
        });
      } catch (error) {
        console.error("Error animating map section:", error);
      }
    };
    
    animateMap();
  }, []);

  return (
    <section 
      ref={mapSectionRef}
      className="py-16 bg-[#f4f4f2]"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            ref={mapContainerRef}
            className="relative rounded-2xl overflow-hidden shadow-xl h-96 bg-white"
          >
            {/* Map Image - Replace with actual map implementation if needed */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-l+006039(55.3785,25.0953)/55.3785,25.0953,14,0/800x500?access_token=pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNra3VtYjZsZjBrcXcycXF1a3N3Y3MxOWsifQ.VrA61umvikZuGA0GWfO4aw')`,
                // Note: This is a placeholder URL that would need a real Mapbox token
                // Alternatively, use a static map image like:
                // backgroundImage: `url('https://via.placeholder.com/1600x800/eef2f7/d1d5db?text=Dubai+Digital+Park,+DSO')`
              }}
            >
              {/* Fallback gradient overlay if map fails to load */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/30"></div>
            </div>
            
            {/* Animated map pin */}
            <div className="map-pin absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Pulse effect */}
              <div className="pin-pulse absolute w-16 h-16 bg-[#006039]/30 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Pin icon */}
              <div className="relative w-10 h-10 bg-[#006039] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
            
            {/* Address overlay */}
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-72">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <h3 className="font-bold mb-2 text-gray-900">Our Location</h3>
                <p className="text-gray-700 text-sm">
                  Building A1, Dubai Digital Park<br />
                  Dubai Silicon Oasis<br />
                  Dubai, UAE
                </p>
                
                <a 
                  href="https://maps.google.com/?q=Dubai+Digital+Park+DSO" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm font-medium text-[#006039] hover:text-[#a37e2c] transition-colors"
                >
                  Get Directions
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}