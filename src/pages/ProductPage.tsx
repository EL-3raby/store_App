import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Package, CreditCard, ChevronLeft, Check } from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useAppStore } from '@/stores/appStore';
import ProductCard from '@/components/shared/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const relatedProducts = getRelatedProducts(id || '', 4);
  const { addToCart, openCart, toggleWishlist, isInWishlist } = useAppStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-gray pt-32 pb-20">
        <div className="container-custom text-center py-20">
          <h2 className="text-2xl font-bold text-brand-black mb-4">المنتج غير موجود</h2>
          <Link to="/shop" className="text-brand-orange hover:underline">العودة للمتجر</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const savings = hasDiscount ? product.oldPrice! - product.price : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    openCart();
  };

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand-orange transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-4 h-4" />
          <Link to="/shop" className="hover:text-brand-orange transition-colors">المتجر</Link>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-brand-black font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="bg-gradient-to-b from-gray-100 to-white rounded-2xl p-8 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 sm:h-96 object-contain"
              />
              {hasDiscount && (
                <Badge className="absolute top-4 right-4 bg-brand-red text-white border-0 text-sm px-3 py-1">
                  وفر {savings} د.ك
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-black mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({product.reviewCount} تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-black text-brand-black">{product.price} د.ك</span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">{product.oldPrice} د.ك</span>
                  <Badge className="bg-brand-red text-white border-0">
                    وفر {savings} د.ك
                  </Badge>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-state-success" />
              <span className="text-state-success font-medium">متوفر في المخزن</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            {product.features && (
              <ul className="space-y-2 mb-8">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-state-success shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-brand-black font-medium">الكمية:</span>
              <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-r-lg transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-l-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-btn font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-state-success text-white'
                    : 'bg-brand-black text-white hover:bg-brand-orange'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    تمت الإضافة!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    أضف إلى السلة
                  </>
                )}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-btn font-bold text-base bg-brand-red text-white hover:bg-transparent hover:text-brand-red border-2 border-brand-red transition-all duration-300"
                >
                  اشترِ الآن
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-14 h-14 rounded-btn border-2 flex items-center justify-center transition-all duration-300 ${
                    inWishlist
                      ? 'border-brand-red bg-brand-red text-white'
                      : 'border-gray-300 text-gray-500 hover:border-brand-red hover:text-brand-red'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Truck className="w-5 h-5 text-brand-orange" />
                شحن مجاني للطلبات فوق ٥٠ د.ك
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Package className="w-5 h-5 text-brand-orange" />
                توصيل خلال ٢٤ ساعة في الكويت
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <CreditCard className="w-5 h-5 text-brand-orange" />
                الدفع عند الاستلام متاح
              </div>
            </div>
          </div>
        </div>

        {/* Specs Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="bg-white border border-gray-200 rounded-lg p-1">
              <TabsTrigger value="specs" className="rounded-md px-6 py-2 data-[state=active]:bg-brand-black data-[state=active]:text-white">
                المواصفات
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-md px-6 py-2 data-[state=active]:bg-brand-black data-[state=active]:text-white">
                التقييمات
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="mt-6">
              <div className="bg-white rounded-xl overflow-hidden">
                {product.specs ? (
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value], index) => (
                        <tr
                          key={key}
                          className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                        >
                          <td className="px-6 py-4 text-brand-black font-medium w-1/3">{key}</td>
                          <td className="px-6 py-4 text-gray-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    المواصفات التفصيلية قريباً
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < product.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-bold text-brand-black mb-2">{product.rating}.0</p>
                <p className="text-gray-500">بناءً على {product.reviewCount} تقييم</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <Separator className="my-12" />
        <div>
          <h2 className="text-2xl font-black text-brand-black mb-8">قد يعجبك أيضًا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
