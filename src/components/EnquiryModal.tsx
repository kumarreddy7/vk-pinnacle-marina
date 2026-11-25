import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, MessageCircle, Calendar, Phone } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { PROJECTS } from '../data/projects';
import { COMPANY_INFO } from '../data/company';

export function EnquiryModal() {
  const { isOpen, defaultProject, mode, closeEnquiry, openPrivacy } = useEnquiry();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState(defaultProject);
  const [visitDate, setVisitDate] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setProject(defaultProject);
    setSubmitted(false);
    setError('');
  }, [defaultProject, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 8) {
      setError('Please enter your name and a valid phone number.');
      return;
    }
    if (!consent) {
      setError('Please accept the privacy consent to proceed.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('vkpinnacle_enquiries') || '[]');
    existing.push({
      id: Date.now(),
      type: mode,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      project,
      visitDate,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('vkpinnacle_enquiries', JSON.stringify(existing));
    setError('');
    setSubmitted(true);
  };

  const whatsappText = encodeURIComponent(
    `Hello VK Pinnacle, I am ${name || 'interested'} (${phone || ''}). I would like to ${
      mode === 'site-visit' ? 'schedule a site visit' : 'enquire'
    } for ${project}${visitDate ? ` on ${visitDate}` : ''}. ${message}`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={closeEnquiry}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'site-visit' ? 'Schedule a Site Visit' : 'Request Project Details'}
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0F3D2E] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C69C6D] font-semibold">
              {mode === 'site-visit' ? 'Guided Property Tour' : 'Customer Enquiry'}
            </p>
            <h3 className="font-display text-xl font-bold mt-0.5">
              {mode === 'site-visit' ? 'Schedule a Site Visit' : 'Request Project Details'}
            </h3>
          </div>
          <button
            onClick={closeEnquiry}
            aria-label="Close modal"
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E6F0EC] text-[#0F3D2E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display text-2xl font-bold text-[#0F3D2E]">
              Thank You, {name}!
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              Your {mode === 'site-visit' ? 'site-visit request' : 'enquiry'} for{' '}
              <span className="font-semibold text-[#0F3D2E]">{project}</span> has been recorded. Our
              relationship team will contact you shortly at{' '}
              <span className="font-semibold">{phone}</span>.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send on WhatsApp</span>
              </a>
              <button
                onClick={closeEnquiry}
                className="inline-flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 92810 06907"
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Interested Project
                </label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  {defaultProject !== 'General Enquiry' &&
                    !PROJECTS.some((p) => p.name === defaultProject) && (
                      <option value={defaultProject}>{defaultProject}</option>
                    )}
                  {PROJECTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Preferred Site-Visit Date (Optional)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Message / Requirements
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us your preferred plot size, villa type, or questions..."
                className="w-full rounded-lg border border-stone-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#0F3D2E]"
              />
              <span>
                I authorize {COMPANY_INFO.shortName} to contact me via phone, email, or WhatsApp
                regarding my property enquiry. Read our{' '}
                <button
                  type="button"
                  onClick={openPrivacy}
                  className="text-[#0F3D2E] underline font-medium cursor-pointer"
                >
                  Privacy Policy
                </button>
                .
              </span>
            </label>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0F3D2E] hover:bg-[#16523E] text-white text-sm font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C69C6D]" />
                <span>
                  {mode === 'site-visit' ? 'Confirm Site Visit' : 'Submit Enquiry'}
                </span>
              </button>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0F3D2E]" />
                <span>Call Now</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
