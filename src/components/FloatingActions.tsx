import { useEffect, useState } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          title="Back to top"
          className="w-10 h-10 rounded-full bg-white hover:bg-stone-100 text-[#0F3D2E] shadow-md border border-stone-200 flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
      <a
        href={`tel:${COMPANY_INFO.phoneRaw}`}
        aria-label="Call Sales Team"
        title={`Call ${COMPANY_INFO.phone}`}
        className="w-12 h-12 rounded-full bg-[#0F3D2E] hover:bg-[#16523E] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 border border-white/20"
      >
        <Phone className="w-5 h-5" />
      </a>
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring pointer-events-none" />
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(
            'Hello VK Pinnacle, I am interested in your property projects.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          className="relative w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
