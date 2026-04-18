import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Title animation - stagger words
      tl.from(titleRef.current?.querySelectorAll('.word') || [], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      })
        // Subtitle
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        // Buttons
        .from(
          buttonsRef.current?.querySelectorAll('a,button') || [],
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        // Cube
        .from(
          cubeRef.current,
          {
            scale: 0.5,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.7)',
          },
          '-=0.8'
        );

      // Animated lines
      const lines = linesRef.current?.querySelectorAll('.anim-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { x: '100%' },
          {
            x: '-100%',
            duration: 3,
            stagger: 0.3,
            ease: 'none',
            repeat: -1,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black dot-pattern"
    >
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl animate-pulse-scale" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl animate-pulse-scale" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      {/* Animated Lines */}
      <div ref={linesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="anim-line absolute top-1/4 right-0 w-full h-[2px] bg-brand-red/30" />
        <div className="anim-line absolute top-1/2 right-0 w-full h-[2px] bg-brand-red/20" style={{ animationDelay: '0.5s' }} />
        <div className="anim-line absolute top-3/4 right-0 w-full h-[2px] bg-brand-red/30" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-right">
            <div ref={titleRef}>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-none tracking-tight">
                <span className="word block">سلطان </span>
                <span className="word block text-brand-orange mt-2">أجهزة</span>
                <span className="word block text-white/90 mt-2">الكمبيوتر</span>
              </h1>
            </div>

            <div ref={subtitleRef} className="mt-8">
              <p className="text-white/70 text-lg sm:text-xl max-w-lg mx-auto lg:mr-0 leading-relaxed">
                أجهزة كمبيوتر عالية الأداء، لابتوبات، وقطع تجميع أصلية في الكويت.
                الدفع عند الاستلام وشحن سريع.
              </p>
            </div>

            <div ref={buttonsRef} className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-brand-black px-8 py-4 rounded-btn font-bold text-base hover:bg-brand-orange hover:text-white transition-all duration-300"
              >
                تسوق الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-btn font-bold text-base border-2 border-white/30 hover:border-white hover:bg-white hover:text-brand-black transition-all duration-300"
              >
                اعرف أكثر
                <ChevronDown className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right - 3D Cube */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              ref={cubeRef}
              className="relative perspective-1000 w-80 h-80"
            >
              <div className="relative w-full h-full preserve-3d animate-spin-slow">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden">
                  <img
                    src="/images/products/rtx4090.jpg"
                    alt="GPU"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-brand-orange/20"
                  />
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <img
                    src="/images/products/cpu-i9.jpg"
                    alt="CPU"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-brand-orange/20"
                  />
                </div>
                {/* Right */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: 'rotateY(90deg)', transformOrigin: 'right center' }}
                >
                  <img
                    src="/images/products/ram-rgb.jpg"
                    alt="RAM"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-brand-orange/20"
                  />
                </div>
                {/* Left */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: 'rotateY(-90deg)', transformOrigin: 'left center' }}
                >
                  <img
                    src="/images/products/gaming-pc.jpg"
                    alt="Gaming PC"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-brand-orange/20"
                  />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-brand-orange/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-xs">اسحب للأسفل</span>
        <ChevronDown className="w-5 h-5 text-white/40" />
      </div>
    </section>
  );
}
