'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    try {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };

      // Get current path
      if (typeof window !== 'undefined') {
        setActivePath(window.location.pathname);
      }
      
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.error("Error in Header useEffect:", error);
    }
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#006039] shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            Arabian Nectar
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-[#c9c08f] transition-colors duration-300"
            >
              Home
            </Link>
            <Link 
              href="/AboutUs" 
              className="text-white hover:text-[#c9c08f] transition-colors duration-300"
            >
              About Us
            </Link>
            <Link 
              href="/Services" 
              className="text-white hover:text-[#c9c08f] transition-colors duration-300"
            >
              Services
            </Link>
            <Link 
              href="/Products" 
              className="text-white hover:text-[#c9c08f] transition-colors duration-300"
            >
              Products
            </Link>
            <Link 
              href="/Contact" 
              className="px-4 py-2 bg-[#a37e2c] hover:bg-[#8a6a24] text-white rounded transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
             className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#006039] mt-4 rounded-lg shadow-lg py-4 px-2 animate-fadeIn">
            <Link href="/" className="block py-2 px-4 text-white hover:bg-[#005030] rounded" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/AboutUs" className="block py-2 px-4 text-white hover:bg-[#005030] rounded" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/Services" className="block py-2 px-4 text-white hover:bg-[#005030] rounded" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/Products" className="block py-2 px-4 text-white hover:bg-[#005030] rounded" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link href="/Contact" className="block py-2 px-4 mt-2 bg-[#a37e2c] hover:bg-[#8a6a24] text-white rounded" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          </div>
        )}
      </nav>
    </header>
  );
}