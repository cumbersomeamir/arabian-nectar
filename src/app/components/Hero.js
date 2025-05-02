'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Import GSAP dynamically to avoid SSR issues
    const loadGSAP = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);
      
      // Initial animation sequence
      const tl = gsap.timeline();
      
      // Start with overlay animation for dramatic reveal
      tl.fromTo(overlayRef.current, 
        { opacity: 1 }, 
        { opacity: 0.5, duration: 1.5, ease: "power2.out" }
      );
      
      // Animate title with text reveal and slight letter spacing
      tl.fromTo(titleRef.current,
        { y: 50, opacity: 0, letterSpacing: "-0.15em" },
        { y: 0, opacity: 1, letterSpacing: "0em", duration: 1.2, ease: "expo.out" },
        "-=0.7"
      );
      
      // Animate subtitle with staggered words
      const words = subtitleRef.current.querySelectorAll('.word');
      tl.fromTo(words,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.8"
      );
      
      // Animate CTA buttons with bounce effect
      tl.fromTo(ctaRef.current.children,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, duration: 0.7, ease: "elastic.out(1, 0.3)" },
        "-=0.4"
      );
      
      // Parallax scrolling effect
      gsap.to(heroRef.current, {
        backgroundPositionY: "30%",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    };
    
    loadGSAP();
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-[#006039]/90"
      ></div>
      
      {/* Animated particle effect */}
      <div className="absolute inset-0 opacity-30">
        <div id="particles-js" className="h-full w-full"></div>
      </div>
      
      {/* Light beams effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="light-beam absolute -top-10 -left-10 opacity-20"></div>
        <div className="light-beam light-beam-2 absolute top-1/3 -right-20 opacity-20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg"
          style={{ opacity: 0 }}
        >
          Welcome to Arabian Nectar Trading
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl md:text-3xl text-white mb-10 max-w-3xl mx-auto font-light"
        >
          {splitTextIntoWords('Your Global Partner in Premium Food Commodities')}
        </p>
        <div ref={ctaRef} className="flex flex-wrap justify-center gap-6">
          <a 
            href="#products"
            className="inline-block px-10 py-5 bg-[#a37e2c] hover:bg-[#8a6a24] text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-xl"
          >
            Explore Products
          </a>
          <a 
            href="#contact"
            className="inline-block px-10 py-5 bg-[#006039] hover:bg-[#004c2d] text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-xl"
          >
            Contact Us
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-10 h-10 text-white opacity-70" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>

      {/* Add GSAP-specific styles */}
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
      
      {/* Script for particle.js */}
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                  particles: {
                    number: { value: 100, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
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