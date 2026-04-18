import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, MessageCircle } from 'lucide-react';

const navLinks = [
  { name: 'رئيسية', path: '/' },
  { name: 'متجر', path: '/shop' },
  { name: 'حول', path: '/about' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-black tracking-wider text-white">
                سلطان استور
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              وجهتك الأولى في الكويت لأجهزة الكمبيوتر عالية الأداء واللابتوبات وقطع التجميع الأصلية.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-brand-orange transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                الكويت
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                info@سلطان استور.com.kw
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                +965 XXXX XXXX
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-6">تابعنا</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-brand-orange hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-brand-orange hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/40 text-sm">
            2026 سلطان استور. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
