'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP animations
    const initAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        
        // Hero section animation sequence
        const tl = gsap.timeline();
        
        // Animate background with parallax effect
        gsap.to(heroRef.current, {
          backgroundPositionY: "30%",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
        
        // Animate title with split text
        if (titleRef.current) {
          const titleWords = titleRef.current.querySelectorAll('.word');
          tl.fromTo(
            titleWords,
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.08, 
              duration: 0.8, 
              ease: "back.out(1.7)" 
            }
          );
        }
        
        // Animate subtitle
        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.4" // Start slightly before the title animation completes
          );
        }
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, []);

  // Split text into words for animation
  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mx-1">{word}</span>
    ));
  };

  return (
    <section 
      ref={heroRef}
      className="relative py-32 bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1585245886175-998c74aeef2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      
      {/* Animated particle effect */}
      <div className="absolute inset-0 opacity-20">
        <div id="about-particles" className="h-full w-full"></div>
      </div>
      
      {/* Light beams effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="light-beam absolute -top-10 -left-10 opacity-10"></div>
        <div className="light-beam light-beam-2 absolute top-1/3 -right-20 opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {splitTextIntoWords('About Arabian Nectar Trading')}
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-[#9eca9e] font-light"
          >
            A global leader in premium food commodities, connecting quality producers 
            with markets across the world.
          </p>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,133.3C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      {/* Custom animations styles */}
      <style jsx>{`
        .light-beam {
          width: 150px;
          height: 500px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 75%);
          transform: rotate(45deg);
          transform-origin: center;
          animation: beam-move 15s ease-in-out infinite alternate;
        }
        
        .light-beam-2 {
          width: 100px;
          height: 400px;
          animation-delay: 5s;
          animation-duration: 20s;
        }
        
        @keyframes beam-move {
          0% { transform: rotate(45deg) translateY(0); }
          100% { transform: rotate(65deg) translateY(100px); }
        }
      `}</style>
      
      {/* Particle.js initialization */}
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              if (typeof particlesJS !== 'undefined') {
                particlesJS('about-particles', {
                  particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
                  }
                });
              }
            });
          `
        }}
      />
    </section>
  );
}