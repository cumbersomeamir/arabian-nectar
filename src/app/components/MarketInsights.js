'use client';
import { useEffect, useRef, useState } from 'react';

export default function MarketInsights() {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);
  
  // Chart animation state
  const [chartAnimated, setChartAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !chartAnimated) {
          if (chartContainerRef.current) {
            chartContainerRef.current.classList.add('translate-y-0', 'opacity-100');
            chartContainerRef.current.classList.remove('translate-y-20', 'opacity-0');
            setChartAnimated(true);
            
            // Animate the bars
            const bars = document.querySelectorAll('.market-bar');
            bars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.height = bar.getAttribute('data-height');
              }, 300 + (index * 150));
            });
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [chartAnimated]);

  const marketData = [
    { category: 'Rice', cagr: 3.5, color: '#a37e2c', drivers: 'Population growth, premium rice demand' },
    { category: 'Spices', cagr: 4.2, color: '#006039', drivers: 'Health trends, demand for authentic flavors' },
    { category: 'Pulses', cagr: 5.1, color: '#9eca9e', drivers: 'Sustainable diets, plant-based protein shift' }
  ];

  return (
    <section 
      id="market-insights"
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006039]">
            Market Insights and Future Projections
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            The global food commodity market is experiencing robust growth, driven by rising 
            populations, urbanization, and evolving dietary preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <div 
            ref={chartContainerRef}
            className="transition-all duration-1000 ease-out translate-y-20 opacity-0"
          >
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">Market Growth Projections (2025-2030)</h3>
              
              <div 
                ref={chartRef}
                className="flex items-end justify-around h-64 relative"
              >
                {/* Y-axis */}
                <div className="absolute left-0 h-full flex flex-col justify-between">
                  <span className="text-xs text-gray-500">6%</span>
                  <span className="text-xs text-gray-500">5%</span>
                  <span className="text-xs text-gray-500">4%</span>
                  <span className="text-xs text-gray-500">3%</span>
                  <span className="text-xs text-gray-500">2%</span>
                  <span className="text-xs text-gray-500">1%</span>
                  <span className="text-xs text-gray-500">0%</span>
                </div>
                
                {/* Horizontal grid lines */}
                <div className="absolute left-6 right-0 h-full flex flex-col justify-between pointer-events-none">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="border-t border-gray-200 w-full"></div>
                  ))}
                </div>
                
                {/* Bars */}
                <div className="flex items-end justify-around w-full pl-8">
                  {marketData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center w-1/3 max-w-xs">
                      <div className="w-16 bg-gray-200 rounded-t-lg relative overflow-hidden">
                        <div 
                          className="market-bar w-full bg-opacity-80 absolute bottom-0 left-0 transition-all duration-1000 ease-out"
                          style={{ backgroundColor: item.color, height: '0%' }}
                          data-height={`${item.cagr * 10}%`}
                        ></div>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-gray-800">{item.category}</div>
                      <div className="text-lg font-bold" style={{ color: item.color }}>{item.cagr}%</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500">CAGR (Compound Annual Growth Rate)</div>
            </div>
          </div>
          
          {/* Market Analysis */}
          <div>
            <div className="space-y-8">
              {marketData.map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-md border-l-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
                  style={{ borderLeftColor: item.color }}
                >
                  <h3 className="text-xl font-semibold mb-2" style={{ color: item.color }}>
                    {item.category} Market
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Projected to grow at a CAGR of <span className="font-bold">{item.cagr}%</span> from 2025 to 2030.
                  </p>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <span className="text-gray-600">Key Drivers: {item.drivers}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 rounded-lg bg-[#edf7f3] border border-[#d7ece3]">
              <p className="text-gray-800">
                These projections highlight the immense opportunities in the food commodity sector, 
                and Arabian Nectar Trading is at the forefront of this growth. Our strategic location in Dubai, 
                combined with our expertise in global trade, positions us to meet rising demand with agility and precision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}