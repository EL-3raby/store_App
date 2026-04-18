import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Menu } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { name: 'رئيسية', path: '/' },
  { name: 'متجر', path: '/shop' },
  { name: 'حول', path: '/about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, openCart, wishlistIds } = useAppStore();
  const count = cartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-12 left-0 right-0 z-40 transition-all duration-500 ${scrolled || !isHomePage
          ? 'glass-effect shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-black tracking-wider text-white">
              سلطان استور
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium text-white/80 hover:text-white transition-colors duration-300 group ${location.pathname === link.path ? 'text-white' : ''
                  }`}
              >
                {link.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-input py-2.5 pr-10 pl-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex p-2 text-white/80 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>

            <Link to="/shop" className="hidden md:flex p-2 text-white/80 hover:text-white transition-colors relative">
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-brand-red text-white text-[10px] rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="p-2 text-white/80 hover:text-white transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-brand-red text-white text-[10px] rounded-full flex items-center justify-center animate-bounce">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-white/80 hover:text-white transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-brand-black border-white/10 w-80">
                <SheetTitle className="text-white text-xl font-bold mb-8">سلطان استور</SheetTitle>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium py-3 px-4 rounded-lg transition-colors ${location.pathname === link.path
                          ? 'bg-brand-red text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
