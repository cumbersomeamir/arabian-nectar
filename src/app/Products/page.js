'use client';
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Products() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const categoriesRef = useRef(null);
  const productCardsRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Product categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'rice', name: 'Premium Rice' },
    { id: 'spices', name: 'Exotic Spices' },
    { id: 'pulses', name: 'Quality Pulses' },
    { id: 'oils', name: 'Essential Oils' }
  ];
  
  // Products data with rich metadata for SEO
  const products = [
    {
      id: 'basmati-1121',
      name: 'Premium 1121 Basmati Rice',
      category: 'rice',
      shortDescription: 'Extra-long grain aged basmati with aromatic qualities',
      fullDescription: 'Our flagship 1121 Basmati Rice features an exceptional 8.3mm average grain length after cooking. Aged for 2 years to enhance its distinctive aroma and flavor profile. Adheres to international food safety standards with less than 1% broken grains.',
      specifications: [
        { name: 'Avg. Length', value: '8.3mm' },
        { name: 'Moisture', value: '12% max' },
        { name: 'Broken', value: '1% max' },
        { name: 'Certification', value: 'ISO 22000, HACCP' }
      ],
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e8c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'basmati-1509',
      name: 'Premium 1509 Steamed Rice',
      category: 'rice',
      shortDescription: 'Perfectly steamed long-grain rice for everyday meals',
      fullDescription: 'Our 1509 Steamed Basmati variety offers exceptional quality at an accessible price point. With an impressive 8.35mm average grain length and perfect moisture content, it delivers the authentic basmati experience for everyday consumption.',
      specifications: [
        { name: 'Avg. Length', value: '8.35mm' },
        { name: 'Moisture', value: '14% max' },
        { name: 'Broken', value: '1% max' },
        { name: 'Certification', value: 'ISO 22000, HACCP' }
      ],
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 'turmeric-powder',
      name: 'High-Curcumin Turmeric Powder',
      category: 'spices',
      shortDescription: 'Premium turmeric with 3-5% curcumin content',
      fullDescription: 'Our premium turmeric powder stands out with an exceptional 3-5% curcumin content, significantly higher than market standards. Sourced from select farming regions known for optimal growing conditions, it delivers rich color, aroma, and therapeutic properties.',
      specifications: [
        { name: 'Curcumin', value: '3-5%' },
        { name: 'Moisture', value: '10% max' },
        { name: 'Admixture', value: '1% max' },
        { name: 'Certification', value: 'ISO 22000, HACCP' }
      ],
      image: 'https://images.unsplash.com/photo-1615485500785-12e40c9d6d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'black-pepper',
      name: 'Malabar Black Pepper',
      category: 'spices',
      shortDescription: 'Bold and aromatic black pepper from premium estates',
      fullDescription: 'Sourced from the Malabar Coast, our black pepper delivers exceptional pungency and aromatic properties. With carefully controlled moisture content and highest purity standards, our product ensures consistent quality for food manufacturers and retailers.',
      specifications: [
        { name: 'Piperine', value: '5-7%' },
        { name: 'Moisture', value: '11% max' },
        { name: 'Admixture', value: '0.5% max' },
        { name: 'Certification', value: 'ISO 22000, HACCP' }
      ],
      image: 'https://images.unsplash.com/photo-1599690925058-89141a193159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 'toor-dal',
      name: 'Premium Toor Dal',
      category: 'pulses',
      shortDescription: 'High-quality split pigeon peas with consistent cooking properties',
      fullDescription: 'Our premium Toor Dal (split pigeon peas) is meticulously processed to ensure consistent cooking time and exceptional taste. With low moisture content and minimal admixture, we deliver a product that meets strict quality standards for both bulk and retail markets.',
      specifications: [
        { name: 'Foreign Matter', value: '0.5% max' },
        { name: 'Moisture', value: '12% max' },
        { name: 'Admixture', value: '0.5% max' },
        { name: 'Certification', value: 'ISO 22000, HACCP' }
      ],
      image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'olive-oil',
      name: 'Extra Virgin Olive Oil',
      category: 'oils',
      shortDescription: 'Cold-pressed extra virgin olive oil with exceptional purity',
      fullDescription: 'Our cold-pressed extra virgin olive oil boasts exceptional purity and low acidity levels. Sourced from select Mediterranean groves, this premium culinary oil delivers rich flavor profiles while meeting stringent international quality standards.',
      specifications: [
        { name: 'Acidity', value: '0.4% max' },
        { name: 'Peroxide Value', value: '15 max' },
        { name: 'Processing', value: 'Cold pressed' },
        { name: 'Certification', value: 'ISO 22000, HACCP' }
      ],
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: false
    }
  ];
  
  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  useEffect(() => {
    // Initialize animations
    const initAnimations = async () => {
      try {
        // Dynamically import GSAP and ScrollTrigger
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Set initial loading state
        gsap.set([headerRef.current, categoriesRef.current], { 
          opacity: 0, 
          y: 30 
        });
        
        // Reset product cards refs to match the filtered products length
        productCardsRef.current = productCardsRef.current.slice(0, filteredProducts.length);
        
        // Set initial state for product cards
        gsap.set(productCardsRef.current, { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        });
        
        // Main timeline for initial animations
        const tl = gsap.timeline({
          onComplete: () => setIsLoaded(true)
        });
        
        // Header animation
        tl.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
        
        // Categories animation
        tl.to(categoriesRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4');
        
        // Product cards staggered animation
        tl.to(productCardsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'back.out(1.2)'
        }, '-=0.3');
        
        // Create scrolling animations for product cards
        productCardsRef.current.forEach((card, index) => {
          if (!card) return;
          
          // Parallax effect for product images
          const image = card.querySelector('.product-image');
          
          ScrollTrigger.create({
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              if (image) {
                gsap.to(image, {
                  y: self.progress * 20,
                  scale: 1 + (self.progress * 0.1),
                  duration: 0.5
                });
              }
            }
          });
          
          // Hover animations for cards
          card.addEventListener('mouseenter', () => {
            if (!isLoaded) return;
            
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              boxShadow: '0 22px 40px rgba(0, 0, 0, 0.1)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Animate card image
            if (image) {
              gsap.to(image, {
                scale: 1.1,
                duration: 0.4,
                ease: 'power1.out'
              });
            }
            
            // Animate button
            const button = card.querySelector('.product-button');
            if (button) {
              gsap.to(button, {
                scale: 1.05,
                backgroundColor: '#006039',
                color: 'white',
                duration: 0.3
              });
            }
          });
          
          card.addEventListener('mouseleave', () => {
            if (!isLoaded) return;
            
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Reset card image
            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.4,
                ease: 'power1.out'
              });
            }
            
            // Reset button
            const button = card.querySelector('.product-button');
            if (button) {
              gsap.to(button, {
                scale: 1,
                backgroundColor: '#f4f4f2',
                color: '#006039',
                duration: 0.3
              });
            }
          });
        });
        
        // Add floating animation to background elements
        const bgElements = document.querySelectorAll('.floating-bg');
        bgElements.forEach((el, i) => {
          gsap.to(el, {
            y: (i % 2 === 0) ? '20px' : '-20px',
            rotation: (i % 2 === 0) ? 5 : -5,
            duration: 3 + (i % 3),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2
          });
        });
      } catch (error) {
        console.error("Error initializing animations:", error);
        // Set loaded state even if animations fail
        setIsLoaded(true);
      }
    };
    
    initAnimations();
  }, [filteredProducts.length, activeCategory]);
  
  // Handle category change
  const handleCategoryChange = async (categoryId) => {
    if (categoryId === activeCategory) return;
    
    try {
      setActiveCategory(categoryId);
      
      // Import GSAP for animations
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      
      // Animate out current products
      const currentCards = productCardsRef.current;
      await gsap.to(currentCards, {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in'
      });
      
      // Wait a moment for state update and DOM refresh
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Reset refs for new filtered products
      productCardsRef.current = productCardsRef.current.slice(0, filteredProducts.length);
      
      // Set initial state for new cards
      gsap.set(productCardsRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95
      });
      
      // Animate in new products
      gsap.to(productCardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: 'back.out(1.2)'
      });
    } catch (error) {
      console.error("Error during category change:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Premium Food Products | Arabian Nectar Trading</title>
        <meta name="description" content="Explore our premium selection of rice, spices, pulses, and oils. Arabian Nectar Trading offers certified high-quality food commodities for global markets." />
        <meta name="keywords" content="basmati rice, turmeric, toor dal, food commodities, premium spices, Arabian Nectar Trading" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Premium Food Products | Arabian Nectar Trading" />
        <meta property="og:description" content="Explore our premium selection of rice, spices, pulses, and oils. Certified high-quality food commodities for global markets." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1586201375761-83865001e8c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content="https://arabian-nectar.com/products" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Food Products | Arabian Nectar Trading" />
        <meta name="twitter:description" content="Explore our premium selection of rice, spices, pulses, and oils. Certified high-quality food commodities for global markets." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1586201375761-83865001e8c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                ${products.map((product, index) => `
                  {
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "item": {
                      "@type": "Product",
                      "name": "${product.name}",
                      "description": "${product.shortDescription}",
                      "image": "${product.image}",
                      "category": "${product.category}"
                    }
                  }
                `).join(',')}
              ]
            }
          `}
        </script>
      </Head>
      
      <section 
        ref={sectionRef}
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, rgba(201, 192, 143, 0.1) 0%, rgba(0, 96, 57, 0.05) 100%)`,
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-bg absolute top-20 left-[10%] w-72 h-72 bg-[#a37e2c] opacity-[0.03] rounded-full"></div>
          <div className="floating-bg absolute top-[40%] right-[5%] w-96 h-96 bg-[#006039] opacity-[0.04] rounded-full"></div>
          <div className="floating-bg absolute bottom-20 left-[20%] w-64 h-64 bg-[#9eca9e] opacity-[0.04] rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header section */}
          <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200 mb-6">
              Premium Food Products
              <span className="block mt-2 text-[#a37e2c]">From Source to Market</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Arabian Nectar Trading offers premium quality food commodities that meet international standards. Our products undergo rigorous quality control and are sustainably sourced from select growing regions.
            </p>
            
            {/* Highlight badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f4f4f2] text-[#006039] font-medium text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                ISO 22000 Certified
              </span>
              
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f4f4f2] text-[#006039] font-medium text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                HACCP Compliant
              </span>
              
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f4f4f2] text-[#006039] font-medium text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                100% Traceable
              </span>
              
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f4f4f2] text-[#006039] font-medium text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Sustainably Sourced
              </span>
            </div>
          </div>
          
          {/* Categories filter */}
          <div 
            ref={categoriesRef}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-[#006039] text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-[#f4f4f2]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={el => productCardsRef.current[index] = el}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 h-full flex flex-col"
              >
                {/* Product image with badge for featured products */}
                <div className="relative overflow-hidden h-64">
                  <div 
                    className="product-image absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-[#a37e2c] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      Featured
                    </div>
                  )}
                </div>
                
                {/* Product content */}
                <div className="p-6 flex-grow">
                  <div className="text-sm font-medium text-[#a37e2c] uppercase tracking-wider mb-2">
                    {categories.find(c => c.id === product.category)?.name || product.category}
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    {product.shortDescription}
                  </p>
                  
                  {/* Key specifications */}
                  <div className="space-y-2 mb-6">
                    {product.specifications.slice(0, 2).map((spec, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-[#006039] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">
                          <span className="font-medium">{spec.name}:</span> {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action button */}
                <div className="px-6 pb-6 mt-auto">
                  <Link 
                    href={`/products/${product.id}`}
                    className="product-button block w-full py-3 text-center rounded-lg bg-[#f4f4f2] text-[#006039] font-medium transition-all duration-300 hover:bg-[#006039] hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA section */}
          <div 
            className="max-w-4xl mx-auto bg-gradient-to-r from-[#006039] to-[#00734b] rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Custom Product Specifications?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Our team can source and customize products according to your specific requirements. From packaging solutions to quality parameters, we deliver tailored solutions.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-[#006039] rounded-lg font-bold transition-transform duration-300 hover:scale-105"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}