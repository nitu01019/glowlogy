/**
 * Home Page
 * Main landing page for Glowlogy
 */

import { HeroEnhanced, ServicesGrid, About, Testimonials, CTA, Locations } from '../components/sections';
import { SEO } from '../components/common';

const Home = () => {
  return (
    <>
      <SEO 
        title="Glowlogy - Premium Spa & Wellness"
        description="Experience tranquility and rejuvenation at Glowlogy. Our expert therapists combine ancient healing traditions with modern techniques."
      />
      
      {/* Enhanced Hero with WhatsApp, Call & Callback buttons */}
      <HeroEnhanced />
      
      <ServicesGrid
        title="Our Signature Services"
        subtitle="Experience the finest wellness treatments designed for your complete rejuvenation"
        limit={6}
      />
      
      <About />
      
      <Testimonials />
      
      <Locations />
      
      <CTA
        title="Ready to Begin Your Wellness Journey?"
        subtitle="Book your appointment today and experience the ultimate in relaxation and rejuvenation."
        primaryButton={{ text: "Book an Appointment", to: "/book" }}
        secondaryButton={{ text: "Call Us Now", href: "tel:+919876543210" }}
      />
    </>
  );
};

export default Home;
