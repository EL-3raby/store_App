import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickFilters = ['الكل', 'كمبيوتر مكتبي', 'لابتوب', 'ألعاب', 'قطع تجميع', 'اكسسوارات'];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        activeCategory === 'الكل' || product.category === activeCategory;
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const stockMatch = !inStockOnly || product.inStock;
      const sidebarCategoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return categoryMatch && priceMatch && stockMatch && sidebarCategoryMatch;
    });
  }, [activeCategory, priceRange, inStockOnly, selectedCategories]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      const cards = gridRef.current?.querySelectorAll('.product-card-wrapper');
      if (cards) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    return () => ctx.revert();
  }, [filteredProducts]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const SidebarContent = () => (
    <div className="space-y-8">
      {/* Categories Filter */}
      <div>
        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-orange" />
          الفئات
        </h4>
        <div className="space-y-2">
          {categories
            .filter((c) => c.id !== 'all')
            .map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-3 py-2 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedCategories.includes(cat.name)}
                  onCheckedChange={() => toggleCategory(cat.name)}
                  className="border-white/30 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                />
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                  {cat.name}
                </span>
                <span className="text-white/40 text-xs mr-auto">({cat.count})</span>
              </label>
            ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h4 className="text-white font-bold mb-4">السعر</h4>
        <Slider
          defaultValue={[0, 2000]}
          max={2000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex justify-between text-white/60 text-sm">
          <span>{priceRange[0]} د.ك</span>
          <span>{priceRange[1]} د.ك</span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-white font-bold mb-4">التوفر</h4>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            className="border-white/30 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
          />
          <span className="text-white/70 text-sm">متوفر في المخزن</span>
        </label>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 2000]);
          setInStockOnly(false);
          setActiveCategory('الكل');
        }}
        className="flex items-center gap-2 text-brand-orange text-sm hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
        إعادة ضبط الفلاتر
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E8E8] to-[#F4F4F4]">
      {/* Hero */}
      <div className="pt-32 pb-12 px-4">
        <div ref={titleRef} className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-brand-orange transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-brand-black font-medium">المتجر</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-black mb-8">
            المتجر
          </h1>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCategory(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === filter
                    ? 'bg-brand-black text-white'
                    : 'bg-white text-brand-black border border-gray-300 hover:border-brand-orange'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom pb-20">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-32">
              <SidebarContent />
            </div>
          </aside>

          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden fixed bottom-6 left-6 z-30">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <button className="w-14 h-14 bg-brand-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-orange transition-colors">
                  <Filter className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white w-80">
                <SheetTitle className="text-brand-black text-lg font-bold mb-6">الفلاتر</SheetTitle>
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm">
                {filteredProducts.length} منتج
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">لا توجد منتجات مطابقة للفلاتر المحددة</p>
              </div>
            ) : (
              <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card-wrapper">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
