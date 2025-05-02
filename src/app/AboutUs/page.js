'use client';
import { useEffect } from 'react';
import Hero from './components/Hero';
import Story from './components/Story';
import VisionMission from './components/VisionMission';
import CoreValues from './components/CoreValues';
import Journey from './components/Journey';
import Team from './components/Team';
import Sustainability from './components/Sustainability';
import CallToAction from './components/CallToAction';

export default function AboutUs() {
  useEffect(() => {
    // Preload GSAP for animations
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      
        gsap.registerPlugin(ScrollTrigger);
      } catch (error) {
        console.error("Error loading animation libraries:", error);
      }
    };
    
    loadGSAP();
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <Hero />
      
      {/* Our Story Section */}
      <Story />
      
      {/* Mission & Vision Section */}
      <VisionMission />
      
      {/* Core Values Section */}
      <CoreValues />
      
      {/* Our Journey Section */}
      <Journey />
      
      {/* Our Team Section */}
      <Team />
      
      {/* Sustainability Section */}
      <Sustainability />
      
      {/* Call to Action Section */}
      <CallToAction />
    </main>
  );
}