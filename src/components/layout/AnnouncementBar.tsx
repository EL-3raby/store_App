import { useState, useEffect } from 'react';
import { Truck, Tag, Wrench } from 'lucide-react';

const announcements = [
  { text: 'عروض مميزة في الكويت: شحن سريع والدفع عند الاستلام!', icon: Truck },
  { text: 'تخفيضات تصل إلى 30% على أجهزة الكمبيوتر المكتبية!', icon: Tag },
  { text: 'خدمة التجميع المجاني عند شراء أي جهاز!', icon: Wrench },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-red h-12 flex items-center justify-center overflow-hidden relative z-50">
      <div className="flex items-center gap-2 transition-all duration-500">
        {(() => {
          const Icon = announcements[current].icon;
          return <Icon className="w-4 h-4 text-white" />;
        })()}
        <span className="text-white text-sm font-medium">
          {announcements[current].text}
        </span>
      </div>
    </div>
  );
}
