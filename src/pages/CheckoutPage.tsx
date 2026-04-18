import { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useAppStore } from '@/stores/appStore';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Truck, CreditCard, Wallet } from 'lucide-react';

type PaymentMethod = 'cod' | 'card' | 'knet';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, setLastOrderNumber } = useAppStore();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    province: '',
    area: '',
    phone: '',
  });

  const subtotal = cartTotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `سلطان استور-2026-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    setLastOrderNumber(orderNum);
    setStep('success');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4011', '#FE4A03', '#A5C871', '#FFD700'],
    });
    clearCart();
  };

  if (cartItems.length === 0 && step === 'form') {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="container-custom text-center py-20">
          <h2 className="text-2xl font-bold text-brand-black mb-4">لا توجد منتجات في السلة</h2>
          <Link to="/shop" className="text-brand-orange hover:underline">العودة للمتجر</Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-24 h-24 bg-state-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-12 h-12 text-state-success" />
            </div>
            <h2 className="text-3xl font-black text-brand-black mb-4">شكراً لك!</h2>
            <p className="text-gray-600 text-lg mb-2">تم استلام طلبك بنجاح</p>
            <p className="text-brand-orange font-bold text-xl mb-8">
              #{useAppStore.getState().lastOrderNumber}
            </p>
            <p className="text-gray-500 mb-8">سنقوم بالتواصل معك قريباً لتأكيد التفاصيل</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brand-black text-white px-10 py-4 rounded-btn font-bold hover:bg-brand-orange transition-colors"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-input py-3 px-5 text-brand-black placeholder:text-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors";
  const labelClass = "block text-sm font-medium text-brand-black mb-2";

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand-orange transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-brand-orange transition-colors">سلة التسوق</Link>
          <span>/</span>
          <span className="text-brand-black font-medium">الدفع</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-brand-black mb-10">
          إتمام الشراء
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-brand-black mb-4">معلومات الاتصال</h3>
                <div>
                  <label className={labelClass}>البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="بريدك الإلكتروني"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Checkbox id="newsletter" />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    أرسل لي آخر العروض والأخبار
                  </label>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-brand-black mb-4">عنوان الشحن</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>الاسم الأول</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="الاسم الأول"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>اسم العائلة</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="اسم العائلة"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className={labelClass}>العنوان</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="العنوان"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="mt-4">
                  <label className={labelClass}>الشقة / البناية (اختياري)</label>
                  <input
                    type="text"
                    name="apartment"
                    placeholder="الشقة، البناية، إلخ"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={labelClass}>المحافظة</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    >
                      <option value="">اختر المحافظة</option>
                      <option value="العاصمة">العاصمة</option>
                      <option value="حولي">حولي</option>
                      <option value="الأحمدي">الأحمدي</option>
                      <option value="الجهراء">الجهراء</option>
                      <option value="الفروانية">الفروانية</option>
                      <option value="مبارك الكبير">مبارك الكبير</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>المنطقة</label>
                    <input
                      type="text"
                      name="area"
                      placeholder="المنطقة"
                      value={formData.area}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className={labelClass}>رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-brand-black mb-4">طريقة الدفع</h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${paymentMethod === 'cod'
                        ? 'border-brand-orange bg-brand-orange/5'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <Wallet className="w-6 h-6 text-brand-orange" />
                    <div className="text-right">
                      <p className="font-medium text-brand-black">الدفع عند الاستلام</p>
                      <p className="text-sm text-gray-500">ادفع نقداً عند استلام طلبك</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 mr-auto flex items-center justify-center ${paymentMethod === 'cod' ? 'border-brand-orange' : 'border-gray-300'
                      }`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${paymentMethod === 'card'
                        ? 'border-brand-orange bg-brand-orange/5'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <CreditCard className="w-6 h-6 text-brand-orange" />
                    <div className="text-right">
                      <p className="font-medium text-brand-black">بطاقة ائتمانية</p>
                      <p className="text-sm text-gray-500">Visa / Mastercard</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 mr-auto flex items-center justify-center ${paymentMethod === 'card' ? 'border-brand-orange' : 'border-gray-300'
                      }`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('knet')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${paymentMethod === 'knet'
                        ? 'border-brand-orange bg-brand-orange/5'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <Truck className="w-6 h-6 text-brand-orange" />
                    <div className="text-right">
                      <p className="font-medium text-brand-black">KNET</p>
                      <p className="text-sm text-gray-500">الدفع عبر KNET</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 mr-auto flex items-center justify-center ${paymentMethod === 'knet' ? 'border-brand-orange' : 'border-gray-300'
                      }`}>
                      {paymentMethod === 'knet' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />}
                    </div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-black text-white py-4 rounded-btn font-bold text-lg hover:bg-brand-orange transition-colors duration-300"
              >
                إتمام الطلب
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-32">
              <h3 className="text-lg font-bold text-brand-black mb-6">ملخص الطلب</h3>

              {/* Products */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="absolute -top-2 -left-2 w-5 h-5 bg-brand-black text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-black truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-500">{item.product.price} د.ك</p>
                    </div>
                    <p className="font-medium text-brand-black">
                      {(item.product.price * item.quantity).toFixed(2)} د.ك
                    </p>
                  </div>
                ))}
              </div>

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
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between">
                <span className="font-bold text-lg">الإجمالي</span>
                <span className="font-black text-xl text-brand-orange">{total.toFixed(2)} د.ك</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
