import { X, ShieldCheck } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { COMPANY_INFO } from '../data/company';

export function PrivacyModal() {
  const { isPrivacyOpen, closePrivacy } = useEnquiry();

  if (!isPrivacyOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={closePrivacy}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0F3D2E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C69C6D]" />
            <h3 className="font-display text-lg font-bold">Privacy Policy & Customer Consent</h3>
          </div>
          <button
            onClick={closePrivacy}
            aria-label="Close privacy policy"
            className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-stone-600 leading-relaxed">
          <p>
            At <strong>{COMPANY_INFO.name}</strong>, we respect your privacy and are committed to
            protecting the personal details you share when enquiring about our residential plots,
            villas, or commercial properties.
          </p>
          <h4 className="font-semibold text-[#0F3D2E]">1. Information We Collect</h4>
          <p>
            When you submit an enquiry or schedule a site visit, we collect your name, phone
            number, optional email address, preferred project, and visit preferences solely to
            respond to your request.
          </p>
          <h4 className="font-semibold text-[#0F3D2E]">2. How We Use Your Details</h4>
          <p>
            Your contact information is used by our sales and customer relations team to share
            project brochures, availability updates, location directions, and to coordinate guided
            site visits via phone, email, or WhatsApp. We never sell or rent your contact data to
            third parties.
          </p>
          <h4 className="font-semibold text-[#0F3D2E]">3. Data Protection & Updates</h4>
          <p>
            We implement reasonable safeguards to keep your enquiry details secure. You may request
            updates or removal of your contact preferences at any time by reaching out to{' '}
            {COMPANY_INFO.email}.
          </p>
        </div>
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={closePrivacy}
            className="bg-[#0F3D2E] text-white text-sm font-semibold px-5 py-2 rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
