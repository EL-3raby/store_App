import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: '/images/parallax/cpu-chip.jpg', position: 'top-right', speed: 0.3 },
  { src: '/images/parallax/gpu-fans.jpg', position: 'top-left', speed: 0.5 },
  { src: '/images/parallax/ram-glow.jpg', position: 'bottom-right', speed: 0.7 },
  { src: '/images/parallax/motherboard.jpg', position: 'bottom-left', speed: 1.0 },
];

export default function Parallax3DSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Parallax images with different speeds
      imagesRef.current.forEach((img, index) => {
        if (!img) return;
        const speed = images[index].speed;

        gsap.from(img, {
          y: 100 * speed,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: speed,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getPositionClass = (position: string) => {
    switch (position) {
      case 'top-right':
        return 'top-[5%] right-[5%]';
      case 'top-left':
        return 'top-[10%] left-[5%]';
      case 'bottom-right':
        return 'bottom-[10%] right-[8%]';
      case 'bottom-left':
        return 'bottom-[5%] left-[8%]';
      default:
        return '';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] bg-black dot-pattern overflow-hidden py-20"
    >
      {/* Floating Images */}
      <div className="absolute inset-0 pointer-events-none">
        {images.map((img, index) => (
          <div
            key={index}
            ref={(el) => { imagesRef.current[index] = el; }}
            className={`absolute ${getPositionClass(img.position)} w-40 sm:w-52 md:w-64 lg:w-72`}
          >
            <div className="relative group">
              <img
                src={img.src}
                alt="Product"
                className="w-full h-auto rounded-lg shadow-2xl shadow-brand-orange/10 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-orange/5 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Central Title */}
      <div
        ref={titleRef}
        className="relative z-10 flex items-center justify-center min-h-[60vh]"
      >
        <div className="text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
            أداء
          </h2>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-red leading-tight">
            لا مثيل له
          </h2>
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-brand-orange to-brand-red mx-auto rounded-full" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-brand-orange rounded-full animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-brand-red rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
}
