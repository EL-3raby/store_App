import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useAppStore } from '@/stores/appStore';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
  bgColor?: string;
}

export default function ProductCard({ product, variant = 'default', bgColor }: ProductCardProps) {
  const { addToCart, openCart, toggleWishlist, isInWishlist } = useAppStore();
  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product);
    openCart();
  };

  if (variant === 'featured') {
    return (
      <div
        className="group relative overflow-hidden rounded-lg transition-all duration-500 hover:-translate-y-2"
        style={{ backgroundColor: bgColor || '#111' }}
      >
        <div className="relative p-6 h-full flex flex-col">
          {/* Image */}
          <Link to={`/product/${product.id}`} className="relative aspect-square mb-4 overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {hasDiscount && (
              <Badge className="absolute top-3 right-3 bg-brand-red text-white border-0">
                خصم {discountPercent}%
              </Badge>
            )}
          </Link>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
            <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>

            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white font-bold text-xl">{product.price} د.ك</span>
                {hasDiscount && (
                  <span className="text-white/40 line-through text-sm">{product.oldPrice} د.ك</span>
                )}
              </div>
              <Link
                to={`/product/${product.id}`}
                className="inline-block bg-transparent text-white border-2 border-white/30 px-6 py-2.5 rounded-btn text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                اكتشف
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-gradient-to-b from-brand-silver/20 to-white/5 rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-orange/10">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hasDiscount && (
          <Badge className="absolute top-3 right-3 bg-brand-red text-white border-0 font-bold">
            وفر {product.oldPrice! - product.price} د.ك
          </Badge>
        )}
        {/* Quick add button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-brand-black text-white py-3 flex items-center justify-center gap-2 text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <ShoppingCart className="w-4 h-4" />
          أضف إلى السلة
        </button>
        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 left-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-red hover:text-white"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-brand-red text-brand-red' : ''}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
              }`}
            />
          ))}
          <span className="text-white/40 text-xs mr-1">({product.reviewCount})</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-bold text-base mb-2 hover:text-brand-orange transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">{product.price} د.ك</span>
          {hasDiscount && (
            <span className="text-white/40 line-through text-sm">{product.oldPrice} د.ك</span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className={`text-xs ${product.inStock ? 'text-state-success' : 'text-state-error'}`}>
            {product.inStock ? 'متوفر في المخزن' : 'نفدت الكمية'}
          </span>
        </div>
      </div>
    </div>
  );
}
