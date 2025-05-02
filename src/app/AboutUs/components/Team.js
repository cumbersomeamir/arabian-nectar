'use client';
import { useEffect, useRef, useState } from 'react';

export default function Team() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const teamCardsRef = useRef([]);
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  
  // Team members data
  const teamMembers = [
    {
      name: 'Ahmed Al-Mansouri',
      position: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Ahmed founded Arabian Nectar Trading with a vision to bridge global food markets through Dubais strategic position. With over 15 years of experience in international trade, Ahmed leads our company with a commitment to quality, innovation, and customer service. His deep industry knowledge and relationships with producers across Asia and Africa have been instrumental in our growth to over 50 countries.'
    },
    {
      name: 'Layla Mahmoud',
      position: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Layla oversees our global supply chain and logistics, ensuring seamless operations from source to delivery. With a background in international logistics and an MBA from INSEAD, she has implemented systems that achieve our industry-leading 95% on-time delivery rate. Laylas expertise in quality assurance and process optimization ensures consistency and excellence across all our product categories.'
    },
    {
      name: 'Raj Patel',
      position: 'Director of Sourcing',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Raj leads our sourcing team, leveraging his extensive network across key growing regions to secure the finest products. His deep expertise in rice varieties, spice quality assessment, and sustainable farming practices ensures that Arabian Nectar Trading offers only premium commodities. Raj regularly visits farms and processing facilities to maintain our stringent quality standards and build lasting relationships with suppliers.'
    },
    {
      name: 'Sarah Al-Nasser',
      position: 'Head of International Markets',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Sarah directs our global expansion strategy, with a focus on emerging markets across Africa and Asia. Her analytical approach to market trends and consumer preferences has helped Arabian Nectar Trading identify growth opportunities and tailor our offerings to regional needs. Sarah holds an MSc in International Business and speaks five languages, facilitating our connections with diverse markets.'
    }
  ];

  useEffect(() => {
    // Reset references array to match the number of team members
    teamCardsRef.current = teamCardsRef.current.slice(0, teamMembers.length);
    
    // Initialize animations
    const initAnimations = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Create scroll trigger for section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
        
        // Animate section title
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
        
        // Animate title underline
        tl.fromTo(
          '.title-underline',
          { width: 0 },
          { width: '100%', duration: 0.8, ease: 'power2.inOut' },
          '-=0.3'
        );
        
        // Animate team cards with stagger effect
        tl.fromTo(
          teamCardsRef.current,
          { 
            opacity: 0, 
            y: 50,
            rotateY: 5
          },
          { 
            opacity: 1, 
            y: 0,
            rotateY: 0,
            stagger: 0.15, 
            duration: 0.8, 
            ease: 'back.out(1.4)'
          },
          '-=0.4'
        );
        
        // Add hover effects to team cards
        teamCardsRef.current.forEach((card) => {
          if (!card) return;
          
          // Image hover zoom effect
          const cardImage = card.querySelector('.team-image');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            gsap.to(cardImage, {
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.out'
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            gsap.to(cardImage, {
              scale: 1,
              duration: 0.5,
              ease: 'power2.out'
            });
          });
        });
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, [teamMembers.length]);
  
  // Modal animation
  useEffect(() => {
    if (activeTeamMember) {
      const animateModal = async () => {
        try {
          const { gsap } = await import('gsap');
          
          // Animate modal background
          gsap.fromTo(
            '.modal-backdrop',
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
          
          // Animate modal content
          gsap.fromTo(
            '.modal-content',
            { 
              opacity: 0, 
              y: 30,
              scale: 0.9
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.5, 
              ease: 'back.out(1.7)'
            }
          );
        } catch (error) {
          console.error("Error animating modal:", error);
        }
      };
      
      animateModal();
      
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeTeamMember]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f2] to-white opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-3 text-[#006039] inline-block"
          >
            Our Team
            <div className="title-underline h-1 bg-[#a37e2c] mt-2 mx-auto"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6">
            At Arabian Nectar Trading, our success is driven by a dedicated team of professionals 
            with deep expertise in global trade, logistics, and food commodity sourcing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              ref={el => teamCardsRef.current[index] = el}
              className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 cursor-pointer transition-all duration-300"
              onClick={() => setActiveTeamMember(member)}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="team-image w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6 relative">
                {/* Accent line */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-[#a37e2c] transform -translate-y-1/2"></div>
                
                <h3 className="text-xl font-semibold text-[#006039] mb-1">{member.name}</h3>
                <p className="text-[#a37e2c] font-medium mb-4">{member.position}</p>
                <button 
                  className="inline-flex items-center text-sm font-medium text-[#006039] hover:text-[#a37e2c] transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTeamMember(member);
                  }}
                >
                  View Profile
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team member modal */}
        {activeTeamMember && (
          <div 
            className="modal-backdrop fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTeamMember(null)}
          >
            <div 
              className="modal-content bg-white rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-64 md:h-auto relative">
                  <img 
                    src={activeTeamMember.image} 
                    alt={activeTeamMember.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent"></div>
                </div>
                
                <div className="md:w-3/5 p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[#006039]">{activeTeamMember.name}</h3>
                      <p className="text-lg text-[#a37e2c] font-medium">{activeTeamMember.position}</p>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      onClick={() => setActiveTeamMember(null)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="h-1 w-20 bg-[#a37e2c] mb-6"></div>
                  
                  <p className="text-gray-700 leading-relaxed">{activeTeamMember.bio}</p>
                  
                  <div className="mt-8 flex space-x-4">
                    <a 
                      href="#" 
                      className="w-8 h-8 rounded-full bg-[#0077B5] flex items-center justify-center text-white transition-transform hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-8 h-8 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white transition-transform hover:scale-110"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.017 10.017 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59l-.047-.02z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-8 h-8 rounded-full bg-[#ea4c89] flex items-center justify-center text-white transition-transform hover:scale-110"
                      aria-label="Email"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Additional team info */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-3xl mx-auto bg-[#f4f4f2] rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-semibold text-[#006039] mb-4">Join Our Team</h3>
          <p className="text-gray-700 mb-6">
            At Arabian Nectar Trading, we're always looking for talented individuals who share our 
            commitment to quality, innovation, and customer satisfaction. If you're passionate about 
            global trade and interested in joining a dynamic team, we'd love to hear from you.
          </p>
          <a 
            href="/careers" 
            className="inline-flex items-center px-6 py-3 bg-[#006039] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#00502f] transform hover:translate-y-[-2px]"
          >
            View Open Positions
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}