import HeroSection from '@/sections/home/HeroSection';
import AboutSection from '@/sections/home/AboutSection';
import Parallax3DSection from '@/sections/home/Parallax3DSection';
import FeaturedProductsSection from '@/sections/home/FeaturedProductsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Parallax3DSection />
      <FeaturedProductsSection />
    </>
  );
}
