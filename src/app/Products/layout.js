export const metadata = {
    title: 'Premium Food Commodities | Arabian Nectar Trading',
    description: 'Explore our extensive range of premium food commodities including Basmati rice, spices, pulses, and more. Quality products exported globally from Dubai, UAE.',
    keywords: 'basmati rice, spices, pulses, food commodities, Dubai export, premium rice, organic spices, wholesale pulses',
    openGraph: {
      title: 'Premium Food Commodities | Arabian Nectar Trading',
      description: 'Discover our exceptional portfolio of rice, spices, pulses and more. Quality that meets global standards.',
      images: [
        {
          url: '/images/products-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Arabian Nectar Trading premium food commodities',
        },
      ],
    },
  };
  
  export default function ProductsLayout({ children }) {
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
                
                const textPluginScript = document.createElement('script');
                textPluginScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/TextPlugin.min.js';
                textPluginScript.async = true;
                document.body.appendChild(textPluginScript);
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