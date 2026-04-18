import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuredProducts = [
  { ...products[3], bgColor: '#FF4011' },   // Gaming PC - Red
  { ...products[2], bgColor: '#D7D7D7' },   // Laptop - Silver
  { ...products[0], bgColor: '#FE4A03' },   // CPU - Orange
  { ...products[10], bgColor: '#FF4011' },  // Accessories - Red
];

export default function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.product-card-wrapper');
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-black dot-pattern overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            منتجات <span className="text-brand-orange">مميزة</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            اكتشف مجموعتنا المختارة من أفضل المنتجات بأسعار تنافسية
          </p>
        </div>

        {/* Featured Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard
                product={product}
                variant="featured"
                bgColor={product.bgColor}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand-black text-white px-10 py-4 rounded-btn font-bold text-base border-2 border-white/20 hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
          >
            عرض كل المنتجات
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />
    </section>
  );
}
