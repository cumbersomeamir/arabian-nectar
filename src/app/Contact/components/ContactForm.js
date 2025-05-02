'use client';
import { useEffect, useRef, useState } from 'react';

export default function ContactForm() {
  const formRef = useRef(null);
  const formTitleRef = useRef(null);
  const inputRefs = useRef([]);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Reset form refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);
  
  useEffect(() => {
    const animateForm = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Form title animation
        ScrollTrigger.create({
          trigger: formTitleRef.current,
          start: 'top bottom-=100',
          onEnter: () => {
            gsap.fromTo(
              formTitleRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
          }
        });
        
        // Form card animation
        ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top bottom-=50',
          onEnter: () => {
            gsap.fromTo(
              formRef.current,
              { opacity: 0, y: 50, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.2)' }
            );
            
            // Staggered inputs animation
            gsap.fromTo(
              inputRefs.current,
              { 
                opacity: 0, 
                y: 20 
              },
              { 
                opacity: 1, 
                y: 0, 
                stagger: 0.1,
                delay: 0.3,
                duration: 0.6, 
                ease: 'power2.out' 
              }
            );
          }
        });
        
        // Add floating animation to form
        gsap.to(formRef.current, {
          y: 10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
        // Add input focus animations
        inputRefs.current.forEach(input => {
          if (!input) return;
          
          const inputContainer = input.parentElement;
          const label = inputContainer.querySelector('label');
          
          input.addEventListener('focus', () => {
            gsap.to(inputContainer, {
              boxShadow: '0 0 0 2px rgba(0, 96, 57, 0.4)',
              scale: 1.02,
              duration: 0.3
            });
            
            if (label) {
              gsap.to(label, {
                color: '#006039',
                fontWeight: 'bold',
                duration: 0.3
              });
            }
          });
          
          input.addEventListener('blur', () => {
            gsap.to(inputContainer, {
              boxShadow: 'none',
              scale: 1,
              duration: 0.3
            });
            
            if (label) {
              gsap.to(label, {
                color: '#4b5563',
                fontWeight: 'normal',
                duration: 0.3
              });
            }
          });
        });
      } catch (error) {
        console.error("Error animating form:", error);
      }
    };
    
    animateForm();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // In a real implementation, you would send the form data to a server
      console.log('Form submitted:', formState);
      
      // Simulate a successful form submission
      setFormSubmitted(true);
      
      // Animate success state
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      
      // Fade out form
      gsap.to(formRef.current.querySelectorAll('.form-field'), {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.5
      });
      
      // Show success message
      const successMessage = formRef.current.querySelector('.success-message');
      gsap.fromTo(
        successMessage,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: 'elastic.out(1, 0.5)',
          delay: 0.5
        }
      );
      
      // Celebrate with confetti-like particles
      const createParticle = (x, y, color) => {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 rounded-full pointer-events-none z-50';
        particle.style.backgroundColor = color;
        particle.style.top = `${y}px`;
        particle.style.left = `${x}px`;
        document.body.appendChild(particle);
        
        gsap.to(particle, {
          x: `random(-100, 100)`,
          y: `random(-100, 20)`,
          opacity: 0,
          duration: `random(1, 2)`,
          onComplete: () => {
            document.body.removeChild(particle);
          }
        });
      };
      
      // Get form position for particles
      const formRect = formRef.current.getBoundingClientRect();
      const formCenterX = formRect.left + formRect.width / 2;
      const formCenterY = formRect.top + formRect.height / 2;
      
      // Create multiple particles
      const colors = ['#a37e2c', '#006039', '#c9c08f', '#9eca9e'];
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          createParticle(
            formCenterX + (Math.random() * 100 - 50), 
            formCenterY + (Math.random() * 50 - 25),
            colors[Math.floor(Math.random() * colors.length)]
          );
        }, Math.random() * 500);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div ref={formRef} className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-[#006039] opacity-10 rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#a37e2c] opacity-10 rounded-tl-full"></div>
      
      <div className="p-8 md:p-10">
        <h2 
          ref={formTitleRef}
          className="text-2xl font-bold mb-8 text-gray-900"
        >
          Send Us a Message
        </h2>
        
        <form onSubmit={handleSubmit} className={formSubmitted ? 'hidden' : ''}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="form-field relative transition-all duration-300 rounded-lg overflow-hidden">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input
                ref={el => inputRefs.current[0] = el}
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006039] transition-all"
                placeholder="Your full name"
              />
            </div>
            
            {/* Email Field */}
            <div className="form-field relative transition-all duration-300 rounded-lg overflow-hidden">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <input
                ref={el => inputRefs.current[1] = el}
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006039] transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            
            {/* Phone Field */}
            <div className="form-field relative transition-all duration-300 rounded-lg overflow-hidden">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
              <input
                ref={el => inputRefs.current[2] = el}
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006039] transition-all"
                placeholder="+971 5X XXX XXXX"
              />
            </div>
            
            {/* Company Field */}
            <div className="form-field relative transition-all duration-300 rounded-lg overflow-hidden">
              <label htmlFor="company" className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
              <input
                ref={el => inputRefs.current[3] = el}
                type="text"
                id="company"
                name="company"
                value={formState.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006039] transition-all"
                placeholder="Your company name"
              />
            </div>
            
            {/* Subject Field */}
            <div className="form-field md:col-span-2 relative transition-all duration-300 rounded-lg overflow-hidden">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
              <input
                ref={el => inputRefs.current[4] = el}
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006039] transition-all"
                placeholder="How can we help you?"
              />
            </div>
            
            {/* Message Field */}
            <div className="form-field md:col-span-2 relative transition-all duration-300 rounded-lg overflow-hidden">
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">Message</label>
              <textarea
                ref={el => inputRefs.current[5] = el}
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006039] transition-all"
                placeholder="Let us know how we can assist you..."
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="form-field md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#006039] text-white font-bold rounded-lg transition-all duration-300 hover:bg-[#004c2d] hover:shadow-lg transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
        
        {/* Success Message (hidden initially) */}
        <div className={`success-message text-center py-10 ${formSubmitted ? 'block' : 'hidden'}`}>
          <div className="w-20 h-20 mx-auto bg-green-100 text-[#006039] rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. Our team will get back to you shortly.
          </p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="inline-block py-3 px-6 bg-[#006039] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#004c2d]"
          >
            Send Another Message
          </button>
        </div>
      </div>
    </div>
  );
}