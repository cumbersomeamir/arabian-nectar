/**
 * Animation utilities for consistent animations across the site
 * Uses GSAP for complex animations
 */

// Dynamic import GSAP to avoid SSR issues
export const loadGSAP = async () => {
    const gsapModule = await import('gsap');
    const ScrollTriggerModule = await import('gsap/ScrollTrigger');
    const TextPluginModule = await import('gsap/TextPlugin');
    
    const gsap = gsapModule.default;
    const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
    const TextPlugin = TextPluginModule.TextPlugin;
    
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    return { gsap, ScrollTrigger, TextPlugin };
  };
  
  // Common animation for section titles
  export const animateTitle = async (titleElement, subtitle = null) => {
    if (!titleElement) return;
    
    const { gsap } = await loadGSAP();
    
    // Find all characters within the title
    const chars = titleElement.querySelectorAll('.char');
    
    // Create timeline for title animation
    const tl = gsap.timeline();
    
    // If characters are available, animate each one
    if (chars.length > 0) {
      tl.fromTo(chars, 
        { 
          opacity: 0, 
          y: 50, 
          rotateX: -90 
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          stagger: 0.02, 
          duration: 0.7, 
          ease: "back.out(1.7)" 
        }
      );
    } else {
      // Fallback animation if no split characters
      tl.fromTo(titleElement, 
        { 
          opacity: 0, 
          y: 50 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        }
      );
    }
    
    // Animate subtitle if provided
    if (subtitle) {
      tl.fromTo(subtitle, 
        { 
          opacity: 0, 
          y: 20 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.4" // Start slightly before the title animation completes
      );
    }
    
    return tl;
  };
  
  // Create a scroll trigger animation
  export const createScrollTrigger = async (element, animation, options = {}) => {
    if (!element) return;
    
    const { gsap, ScrollTrigger } = await loadGSAP();
    
    // Default options
    const defaultOptions = {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    };
    
    // Merge default options with provided options
    const scrollTriggerOptions = { ...defaultOptions, ...options };
    
    // Create and return the scroll trigger
    return ScrollTrigger.create({
      ...scrollTriggerOptions,
      animation: animation
    });
  };
  
  // Animate elements in sequence
  export const animateElementsSequence = async (elements, fromVars, toVars, staggerTime = 0.1) => {
    if (!elements || elements.length === 0) return;
    
    const { gsap } = await loadGSAP();
    
    return gsap.fromTo(elements, 
      fromVars,
      {
        ...toVars,
        stagger: staggerTime,
      }
    );
  };
  
  // Add parallax scrolling effect
  export const createParallaxEffect = async (element, options = {}) => {
    if (!element) return;
    
    const { gsap, ScrollTrigger } = await loadGSAP();
    
    // Default options
    const defaultOptions = {
      speed: 0.5, // Speed of parallax effect (0.5 = half speed of scroll)
      start: "top bottom",
      end: "bottom top",
      scrub: true
    };
    
    // Merge default options with provided options
    const parallaxOptions = { ...defaultOptions, ...options };
    
    // Create the parallax effect
    return gsap.to(element, {
      y: `${parallaxOptions.speed * 100}%`,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: parallaxOptions.start,
        end: parallaxOptions.end,
        scrub: parallaxOptions.scrub
      }
    });
  };
  
  // Create a text typing effect
  export const createTypingEffect = async (element, text, options = {}) => {
    if (!element) return;
    
    const { gsap, TextPlugin } = await loadGSAP();
    
    // Default options
    const defaultOptions = {
      duration: 2,
      delay: 0,
      ease: "none",
      repeat: 0
    };
    
    // Merge default options with provided options
    const typingOptions = { ...defaultOptions, ...options };
    
    // Create the typing effect
    return gsap.to(element, {
      duration: typingOptions.duration,
      text: {
        value: text,
        newClass: "highlighted"
      },
      delay: typingOptions.delay,
      ease: typingOptions.ease,
      repeat: typingOptions.repeat
    });
  };
  
  // Split text into spans for character animation
  export const splitTextIntoChars = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">{char}</span>
    ));
  };
  
  // Split text into words for word animation
  export const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mx-1">{word}</span>
    ));
  };