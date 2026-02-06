import Hero from '../components/sections/Hero';
import ServicesPreview from '../components/sections/ServicesPreview';
import Testimonials from '../components/sections/Testimonials';
import CTABanner from '../components/sections/CTABanner';

/**
 * Home page composed of Hero, ServicesPreview, Testimonials carousel, and a final CTA banner.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Testimonials />
      <CTABanner />
    </>
  );
}
