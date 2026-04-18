import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    appliedCoupon,
    removeCoupon,
    applyCoupon,
  } = useAppStore();

  const [couponCode, setCouponCode] = useState('');
  const total = cartTotal();

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      setCouponCode('');
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent side="left" className="bg-brand-black border-white/10 w-full sm:w-[420px]">
        <SheetHeader>
          <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-orange" />
            سلة التسوق
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
            <p className="text-white/60 text-lg mb-6">سلة التسوق فارغة</p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="btn-primary"
            >
              تسوق الآن
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-280px)] mt-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 bg-white/5 rounded-lg p-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-brand-orange font-bold mt-1">
                        {item.product.price} د.ك
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-white hover:bg-brand-orange transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-white hover:bg-brand-orange transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors mr-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-brand-black border-t border-white/10">
              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="رمز الكوبون"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-input py-2 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-white/10 text-white px-4 py-2 rounded-input text-sm hover:bg-brand-orange transition-colors"
                >
                  تطبيق
                </button>
              </div>
              {appliedCoupon && (
                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-state-success">كوبون {appliedCoupon} (-10%)</span>
                  <button onClick={removeCoupon} className="text-red-400 hover:text-red-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <Separator className="bg-white/10 mb-4" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60">الإجمالي</span>
                <span className="text-white text-xl font-bold">{total.toFixed(2)} د.ك</span>
              </div>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full text-center btn-primary"
              >
                إتمام الشراء
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
