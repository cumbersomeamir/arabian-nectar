'use client';
import { useEffect, useRef } from 'react';
import ContactHeader from './components/ContactHeader';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import MapSection from './components/MapSection';
import ContactCTA from './components/ContactCTA';

export default function Contact() {
  const pageRef = useRef(null);
  
  useEffect(() => {
    // Initialize page animations
    const initPageAnimations = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Background particle effect
        const particles = document.querySelectorAll('.bg-particle');
        
        particles.forEach((particle, index) => {
          // Different animation for each particle
          gsap.to(particle, {
            x: `random(-20, 20, 5)`,
            y: `random(-20, 20, 5)`,
            rotation: `random(-15, 15, 5)`,
            duration: 5 + (index % 3),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
          });
        });
        
        // Background gradient animation
        gsap.to('.animated-gradient', {
          backgroundPosition: '200% 200%',
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
        // Scroll-triggered parallax effect
        ScrollTrigger.create({
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const scrollY = self.scroll();
            
            // Move particles based on scroll position
            particles.forEach((particle, index) => {
              const speed = 0.05 + (index % 4) * 0.03;
              const yOffset = scrollY * speed;
              
              gsap.to(particle, {
                y: `+=${yOffset}`,
                overwrite: 'auto',
                duration: 0.5,
                ease: 'power1.out'
              });
            });
          }
        });
      } catch (error) {
        console.error("Error initializing page animations:", error);
      }
    };
    
    // Add scroll smoothing
    const addSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100, // Offset for header
              behavior: 'smooth'
            });
          }
        });
      });
    };
    
    initPageAnimations();
    addSmoothScroll();
    
    // Cleanup function
    return () => {
      // Clean up any listeners or animations if needed
    };
  }, []);
  
  return (
    <main 
      ref={pageRef}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="animated-gradient absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(201, 192, 143, 0.15) 0%, rgba(0, 96, 57, 0.05) 100%)',
            backgroundSize: '400% 400%',
            backgroundPosition: '0% 0%'
          }}
        ></div>
        
        {/* Background particles */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="bg-particle absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 80 + 100}px`,
              height: `${Math.random() * 80 + 100}px`,
              backgroundColor: i % 2 === 0 ? '#a37e2c' : '#006039',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section */}
        <ContactHeader />
        
        {/* Two-column contact section */}
        <section id="contact-form" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form Column */}
              <div className="lg:w-1/2">
                <ContactForm />
              </div>
              
              {/* Contact Info Column */}
              <div className="lg:w-1/2">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <MapSection />
        
        {/* Final CTA */}
        <ContactCTA />
      </div>
    </main>
  );
}