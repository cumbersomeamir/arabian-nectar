'use client';
import { useEffect, useRef } from 'react';
import { loadGSAP } from '../utils/animationUtils';

export default function PageAnimations() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  useEffect(() => {
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize page-wide animations
    initializeAnimations();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Initialize the custom cursor
  const initCustomCursor = () => {
    if (typeof window === 'undefined' || !cursorRef.current || !cursorDotRef.current) return;
    
    // Initial position
    cursorRef.current.style.opacity = '0';
    cursorDotRef.current.style.opacity = '0';
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRef.current.classList.add('cursor-hover');
        cursorDotRef.current.classList.add('cursor-dot-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursorRef.current.classList.remove('cursor-hover');
        cursorDotRef.current.classList.remove('cursor-dot-hover');
      });
    });
  };
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    
    // Smooth animation for main cursor
    if (cursorRef.current) {
      cursorRef.current.style.opacity = '1';
      cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    }
    
    // Direct positioning for dot cursor (feels more responsive)
    if (cursorDotRef.current) {
      cursorDotRef.current.style.opacity = '1';
      cursorDotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    }
  };
  
  // Initialize GSAP animations
  const initializeAnimations = async () => {
    const { gsap } = await loadGSAP();
    
    // Smoother page load transition
    gsap.fromTo(
      'body',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.inOut' }
    );
    
    // Subtle background animation for the whole page
    gsap.to('.bg-gradient-animate', {
      backgroundPosition: '100% 100%',
      duration: 15,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
    
    // Add hover animations to all buttons
    document.querySelectorAll('button, a.btn').forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power1.out'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power1.out'
        });
      });
    });
  };
  
  // Add scroll-based animations
  const addScrollAnimations = async () => {
    const { gsap, ScrollTrigger } = await loadGSAP();
    
    // Progress bar for scroll position
    gsap.to('.scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
    
    // Fade in sections as they come into view
    document.querySelectorAll('section').forEach(section => {
      if (section.classList.contains('animated-section')) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  };
  
  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorDotRef} className="custom-cursor-dot"></div>
      
      {/* Scroll progress indicator */}
      <div className="scroll-progress-container">
        <div className="scroll-progress"></div>
      </div>
      
      {/* Stylesheets for animations */}
      <style jsx global>{`
        /* Hide default cursor when custom cursor is active */
        body:has(.custom-cursor, .custom-cursor-dot) {
          cursor: none !important;
        }
        
        /* Custom cursor styles */
        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(163, 126, 44, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate3d(0, 0, 0);
          transition: transform 0.1s ease-out;
          mix-blend-mode: difference;
          left: -20px;
          top: -20px;
        }
        
        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: #a37e2c;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate3d(0, 0, 0);
          left: -4px;
          top: -4px;
        }
        
        .cursor-hover {
          transform: scale(1.5) translate3d(0, 0, 0) !important;
          background: rgba(0, 96, 57, 0.1);
          border: 2px solid rgba(0, 96, 57, 0.5);
        }
        
        .cursor-dot-hover {
          transform: scale(0) translate3d(0, 0, 0) !important;
        }
        
        /* Scroll progress indicator */
        .scroll-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
        
        .scroll-progress {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #a37e2c, #006039);
        }
        
        /* Background gradient animation class */
        .bg-gradient-animate {
          background-size: 200% 200% !important;
          animation: gradientFlow 15s ease infinite;
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Common animation classes */
        .animated-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animated-fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Character animation delay */
        .char {
          display: inline-block;
          transform-origin: center bottom;
        }
        
        /* Hover effect for links and buttons */
        a:not(.no-hover), button:not(.no-hover) {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        a:hover:not(.no-hover), button:hover:not(.no-hover) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  );
}