import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Truck, Headphones, MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Award,
    title: 'الجودة',
    description: 'نختار كل منتج بعناية ونختبره قبل التوصيل',
    color: '#FF4011',
  },
  {
    icon: Truck,
    title: 'السرعة',
    description: 'شحن سريع وتوصيل خلال 24 ساعة في الكويت',
    color: '#FE4A03',
  },
  {
    icon: Headphones,
    title: 'الدعم',
    description: 'فريق دعم فني متخصص جاهز لمساعدتك 24/7',
    color: '#A5C871',
  },
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      const heroContent = heroRef.current?.querySelector('.hero-content');
      if (heroContent) gsap.from(heroContent, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Story section
      gsap.from(storyRef.current?.querySelectorAll('.story-item') || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Values cards
      gsap.from(valuesRef.current?.querySelectorAll('.value-card') || [], {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Contact section
      gsap.from(contactRef.current?.querySelectorAll('.contact-item') || [], {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-black dot-pattern">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/hero/gaming-setup.jpg"
            alt="Gaming Setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="hero-content relative z-10 text-center container-custom">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6">
            سلطان
          </h1>
          <p className="text-2xl sm:text-3xl text-brand-orange font-bold mb-4">
            أجهزة الكمبيوتر
          </p>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            نحن وجهتك الأولى في الكويت لأجهزة الكمبيوتر عالية الأداء واللابتوبات وقطع التجميع الأصلية.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section ref={storyRef} className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="story-item">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-8">
                قصتنا
              </h2>
              <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                <p>
                  انطلق سلطان  في الكويت بهدف واحد: توفير أحدث التقنيات وأفضل أجهزة الكمبيوتر
                  بأسعار تنافسية. نؤمن بأن كل شخص يستحق جهازاً قوياً يواكب طموحاته.
                </p>
                <p>
                  نختار منتجاتنا بعناية فائقة من أفضل العلامات التجارية العالمية، ونختبر كل جهاز
                  قبل توصيله لك. فريقنا من الخبراء جاهز دائماً لمساعدتك في اختيار التجميعة
                  المثالية أو الإجابة على أي استفسار تقني.
                </p>
              </div>
            </div>
            <div className="story-item">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/products/gaming-pc.jpg"
                  alt="Our Work"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-white/10" />

      {/* Values */}
      <section ref={valuesRef} className="py-24">
        <div className="container-custom">
          <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-16">
            قيمنا
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="value-card bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-brand-orange/30 transition-all duration-500 group"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${value.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/60 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Separator className="bg-white/10" />

      {/* Contact */}
      <section ref={contactRef} className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-8">
                تواصل معنا
              </h2>
              <div className="space-y-6">
                <div className="contact-item flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-white font-medium">الموقع</p>
                    <p className="text-white/60">الكويت</p>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-white font-medium">البريد الإلكتروني</p>
                    <p className="text-white/60">info@سلطان .com.kw</p>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-white font-medium">الهاتف</p>
                    <p className="text-white/60">+965 XXXX XXXX</p>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-white font-medium">ساعات العمل</p>
                    <p className="text-white/60">السبت - الخميس، 9 ص - 9 م</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-item bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">أرسل رسالة</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="text"
                    placeholder="الاسم"
                    className="w-full bg-white/5 border border-white/20 rounded-input py-3 px-5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full bg-white/5 border border-white/20 rounded-input py-3 px-5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="الموضوع"
                    className="w-full bg-white/5 border border-white/20 rounded-input py-3 px-5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="الرسالة"
                    rows={4}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-orange text-white py-4 rounded-btn font-bold hover:bg-brand-red transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  إرسال
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
