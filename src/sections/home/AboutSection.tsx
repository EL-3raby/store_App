import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, ThumbsUp, HeadphonesIcon, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1500, suffix: '+', label: 'منتج متوفر', icon: Package },
  { value: 99, suffix: '%', label: 'رضا العملاء', icon: ThumbsUp },
  { value: 24, suffix: '/7', label: 'دعم فني', icon: HeadphonesIcon },
  { value: 1, suffix: '', label: 'شحن سريع', icon: Truck },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Text reveal
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-number');
      statElements?.forEach((el, index) => {
        const target = stats[index].value;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = Math.round(obj.val).toLocaleString('ar-SA');
          },
        });
      });

      // Stats cards stagger
      gsap.from(statsRef.current?.querySelectorAll('.stat-card') || [], {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-black dot-pattern overflow-hidden"
    >
      {/* Decorative lines */}
      <div className="absolute top-0 right-0 w-full h-[2px] bg-brand-red/20" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8"
            >
              نحن <span className="text-brand-orange">سلطان </span>
            </h2>
            <p
              ref={textRef}
              className="text-white/70 text-lg leading-relaxed mb-8"
            >
              نحن متجر متخصص في توفير أحدث أجهزة الكمبيوتر المكتبية، اللابتوبات، وقطع التجميع
              الأصلية في الكويت. نؤمن بأن الأداء العالي يبدأ من الجودة، لذلك نختار كل منتج
              بعناية لنضمن لك تجربة استخدام استثنائية.
            </p>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/hero/gaming-setup.jpg"
                alt="Gaming Setup"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="stat-card bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-brand-orange/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="stat-number text-4xl font-black text-brand-red">
                      0
                    </span>
                    <span className="text-2xl font-bold text-brand-red">{stat.suffix}</span>
                  </div>
                  <p className="text-white/60 text-sm mt-2">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
