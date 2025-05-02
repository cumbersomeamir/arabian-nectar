'use client';
import { useState, useEffect, useRef } from 'react';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('rice');
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.classList.add('translate-y-0', 'opacity-100');
            titleRef.current.classList.remove('translate-y-10', 'opacity-0');
          }
          if (tabsRef.current) {
            setTimeout(() => {
              tabsRef.current.classList.add('translate-y-0', 'opacity-100');
              tabsRef.current.classList.remove('translate-y-10', 'opacity-0');
            }, 300);
          }
          if (contentRef.current) {
            setTimeout(() => {
              contentRef.current.classList.add('translate-y-0', 'opacity-100');
              contentRef.current.classList.remove('translate-y-10', 'opacity-0');
            }, 600);
          }
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

  const products = {
    rice: [
      {
        name: '1121 Golden Sella',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Average Length', value: '8.3 mm' },
          { label: 'Moisture', value: '14% Max' },
          { label: 'Broken', value: '1%' },
          { label: 'Processing', value: '100% Sortex Cleaned' }
        ]
      },
      {
        name: '1509 Steam',
        image: 'https://images.unsplash.com/photo-1551889229-56e992f37a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Average Length', value: '8.35 mm' },
          { label: 'Moisture', value: '14% Max' },
          { label: 'Broken', value: '1%' },
          { label: 'Processing', value: '100% Sortex Cleaned' }
        ]
      },
      {
        name: 'Pusa 1401 White Sella',
        image: 'https://images.unsplash.com/photo-1567305235503-14e65c3a80f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Average Length', value: '7.9-8.1 mm' },
          { label: 'Moisture', value: '14% Max' },
          { label: 'Broken', value: '1%' },
          { label: 'Processing', value: '100% Sortex Cleaned' }
        ]
      }
    ],
    spices: [
      {
        name: 'Red Chili',
        image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Origin', value: 'Premium Growing Regions' },
          { label: 'Processing', value: 'Sun-dried & Ground' },
          { label: 'Quality', value: 'Export Grade' },
          { label: 'Purity', value: '100%' }
        ]
      },
      {
        name: 'Black Pepper',
        image: 'https://images.unsplash.com/photo-1518614935489-0624d9294a68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Origin', value: 'Premium Growing Regions' },
          { label: 'Processing', value: 'Sun-dried & Cleaned' },
          { label: 'Quality', value: 'Export Grade' },
          { label: 'Purity', value: '100%' }
        ]
      },
      {
        name: 'Cardamom',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Origin', value: 'Premium Growing Regions' },
          { label: 'Processing', value: 'Hand Selected' },
          { label: 'Quality', value: 'Export Grade' },
          { label: 'Aroma', value: 'Rich & Authentic' }
        ]
      }
    ],
    pulses: [
      {
        name: 'Toor Dal',
        image: 'https://images.unsplash.com/photo-1604153787509-7a72505e7e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Processing', value: 'Polished to Perfection' },
          { label: 'Purity', value: '99.9%' },
          { label: 'Moisture', value: '12% Max' },
          { label: 'Quality', value: 'Export Grade' }
        ]
      },
      {
        name: 'Masoor Dal',
        image: 'https://images.unsplash.com/photo-1612257099503-1c9387f09c69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Processing', value: 'Polished to Perfection' },
          { label: 'Purity', value: '99.9%' },
          { label: 'Moisture', value: '12% Max' },
          { label: 'Quality', value: 'Export Grade' }
        ]
      },
      {
        name: 'Chana Dal',
        image: 'https://images.unsplash.com/photo-1613165633372-9cacd6b7577a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        specs: [
          { label: 'Processing', value: 'Polished to Perfection' },
          { label: 'Purity', value: '99.9%' },
          { label: 'Moisture', value: '12% Max' },
          { label: 'Quality', value: 'Export Grade' }
        ]
      }
    ]
  };

  const categories = [
    { id: 'rice', name: 'Basmati Rice' },
    { id: 'spices', name: 'Spices' },
    { id: 'pulses', name: 'Pulses' }
  ];

  return (
    <section 
      id="products"
      ref={sectionRef}
      className="py-20 bg-[#f4f4f2]"
    >
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className="text-center mb-16 transition-all duration-700 ease-out translate-y-10 opacity-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006039]">
            Our Premium Product Portfolio
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Arabian Nectar Trading offers a diverse range of high-quality food commodities 
            designed to meet the needs of global markets.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div 
          ref={tabsRef}
          className="flex justify-center mb-12 transition-all duration-700 ease-out translate-y-10 opacity-0"
        >
          <div className="inline-flex bg-white rounded-lg shadow-md p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-[#a37e2c] text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div 
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out translate-y-10 opacity-0"
        >
          {products[activeCategory].map((product, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">{product.name}</h3>
              </div>
              
              {/* Product Specifications */}
              <div className="p-6">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Specifications</h4>
                <ul className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex justify-between">
                      <span className="text-gray-600">{spec.label}:</span>
                      <span className="font-medium text-gray-800">{spec.value}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full py-2 bg-[#006039] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#004c2d]">
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-[#a37e2c] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#8a6a24]">
            View Full Catalog
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}