export const metadata = {
    title: 'About Us | Arabian Nectar Trading',
    description: 'Discover the story, values, and team behind Arabian Nectar Trading - leading exporter of premium food commodities from Dubai, UAE.',
    keywords: 'Arabian Nectar Trading, about us, food export company, rice exporter, spice exporter, pulses supplier, Dubai UAE',
    openGraph: {
      title: 'About Arabian Nectar Trading | Premium Food Commodities',
      description: 'Learn about our journey, mission, values, and the team that makes Arabian Nectar Trading a leader in global food commodity exports.',
      images: [
        {
          url: '/images/about-us-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Arabian Nectar Trading team and headquarters',
        },
      ],
    },
  };
  
  export default function AboutUsLayout({ children }) {
    return (
      <>
        {/* Script for GSAP preloading */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Preload GSAP to reduce first animation delay
              const preloadGSAP = () => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
                script.async = true;
                document.body.appendChild(script);
                
                const scrollTriggerScript = document.createElement('script');
                scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
                scrollTriggerScript.async = true;
                document.body.appendChild(scrollTriggerScript);
              };
              
              // Execute preload
              preloadGSAP();
            `
          }}
        />
        
        {children}
      </>
    );
  }