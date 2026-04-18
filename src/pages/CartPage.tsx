import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const {
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
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const totalWithTax = total + tax;

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      setCouponCode('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-gray pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-md mx-auto text-center py-20">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-brand-black mb-4">سلة التسوق فارغة</h2>
            <p className="text-gray-500 mb-8">ابدأ التسوق واكتشف منتجاتنا المميزة</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              تسوق الآن
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray pt-32 pb-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand-orange transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-orange transition-colors">المتجر</Link>
          <span>/</span>
          <span className="text-brand-black font-medium">سلة التسوق</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-brand-black mb-10">
          سلة التسوق
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-brand-black truncate">{item.product.name}</h3>
                  <p className="text-brand-orange font-bold mt-1">
                    {item.product.price} د.ك
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-brand-black">
                    {(item.product.price * item.quantity).toFixed(2)} د.ك
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-400 hover:text-red-600 transition-colors mt-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold text-brand-black mb-6">ملخص الطلب</h3>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="أدخل رمز الكوبون"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-input py-2.5 px-4 text-sm text-brand-black placeholder:text-gray-400 focus:outline-none focus:border-brand-orange"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-brand-black text-white px-5 py-2.5 rounded-input text-sm font-medium hover:bg-brand-orange transition-colors"
                >
                  تطبيق
                </button>
              </div>
              {appliedCoupon && (
                <div className="flex items-center justify-between mb-4 bg-green-50 p-3 rounded-lg">
                  <span className="text-state-success text-sm flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    كوبون {appliedCoupon}
                  </span>
                  <button onClick={removeCoupon} className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <Separator className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">المجموع الفرعي</span>
                  <span className="font-medium">{subtotal.toFixed(2)} د.ك</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">الشحن</span>
                  <span className="text-state-success font-medium">مجاني</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">الضريبة (5%)</span>
                  <span className="font-medium">{tax.toFixed(2)} د.ك</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-state-success">
                    <span>خصم الكوبون</span>
                    <span>-{(subtotal * 0.1).toFixed(2)} د.ك</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">الإجمالي</span>
                <span className="font-black text-xl text-brand-orange">{totalWithTax.toFixed(2)} د.ك</span>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-brand-black text-white py-4 rounded-btn font-bold hover:bg-brand-orange transition-colors duration-300"
              >
                إتمام الشراء
              </Link>

              <Link
                to="/shop"
                className="block w-full text-center mt-3 text-gray-500 text-sm hover:text-brand-orange transition-colors"
              >
                مواصلة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
