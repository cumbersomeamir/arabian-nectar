import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import Products from './components/Products';
import MarketInsights from './components/MarketInsights';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import './globals.css';

// Metadata for SEO
export const metadata = {
  title: 'Arabian Nectar Trading | Premium Food Commodities Exporter',
  description: 'Arabian Nectar Trading is your global partner in premium food commodities, exporting high-quality rice, spices, pulses, and more from Dubai, UAE to over 50 countries worldwide.',
  keywords: 'food commodities, basmati rice, spices, pulses, Dubai exporter, wholesale food, Arabian Nectar',
  openGraph: {
    title: 'Arabian Nectar Trading | Premium Food Commodities',
    description: 'Your global partner in premium food commodities, delivering excellence from Dubai, UAE to over 50 countries worldwide.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arabian Nectar Trading',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <Hero />
      
      {/* About Section - Enhanced with animation class */}
      <section className="animated-section">
        <About />
      </section>
      
      {/* Statistics Section */}
      <Stats />
      
      {/* Why Choose Us Section - Enhanced with animation class */}
      <section className="animated-section">
        <WhyChooseUs />
      </section>
      
      {/* Products Section */}
      <Products />
      
      {/* Market Insights Section - Enhanced with animation class */}
      <section className="animated-section">
        <MarketInsights />
      </section>
      
      {/* Testimonials Section - Enhanced with animation class */}
      <section className="animated-section">
        <Testimonials />
      </section>
      
      {/* Contact Section */}
      <Contact />
    </main>
  );
}