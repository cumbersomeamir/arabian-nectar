import Header from './components/Header';
import BackToTop from './components/BackToTop';
import PageAnimations from './components/PageAnimations';
import './globals.css';

export const metadata = {
  title: 'Arabian Nectar Trading | Premium Food Commodities Exporter',
  description: 'Arabian Nectar Trading is your global partner in premium food commodities, exporting high-quality rice, spices, pulses, and more from Dubai, UAE to over 50 countries worldwide.',
  keywords: 'food commodities, basmati rice, spices, pulses, Dubai exporter, wholesale food, Arabian Nectar Trading',
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Particles.js for interactive background */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="overflow-x-hidden">
        {/* Global animations */}
        <PageAnimations />
        
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="overflow-hidden">
          {children}
        </main>
        
        {/* Back to top button */}
        <BackToTop />
        
        {/* Preload important scripts for animations */}
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
      </body>
    </html>
  );
}
