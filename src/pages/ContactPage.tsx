import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Navigation,
  Send,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { COMPANY_INFO } from '../data/company';
import { PROJECTS } from '../data/projects';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ContactPage() {
  useDocumentTitle(
    `Contact Us | ${COMPANY_INFO.shortName}`,
    'Contact VK Pinnacle for property enquiries, office directions, WhatsApp support, and site-visit bookings.'
  );

  const { openPrivacy } = useEnquiry();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('General Enquiry');
  const [visitDate, setVisitDate] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 8) {
      setError('Please enter your name and a valid phone number.');
      return;
    }
    if (!consent) {
      setError('Please accept the privacy consent checkbox.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('vkpinnacle_enquiries') || '[]');
    existing.push({
      id: Date.now(),
      type: 'contact-page',
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

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <section className="bg-[#0F3D2E] text-white py-14">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C69C6D]">
            Contact Us
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
            Let’s Help You Find Your Property
          </h1>
          <p className="text-stone-200 mt-3 max-w-2xl">
            Have questions about a project or want to visit the site? Send us your details and our
            team will get in touch.
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <Reveal className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">
            Send an Enquiry or Book a Site Visit
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Fill in the details below and our relationship manager will reach out promptly.
          </p>

          {submitted ? (
            <div className="my-10 p-8 rounded-2xl bg-[#F3F8F6] border border-[#0F3D2E]/15 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#1E6B52] mx-auto" />
              <h3 className="font-display text-2xl font-bold text-[#0F3D2E]">
                Thank You, {name}!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                We have received your enquiry for <strong>{project}</strong>. Our sales team will
                call you at <strong>{phone}</strong> shortly.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                    `Hello VK Pinnacle, I submitted an enquiry for ${project}. My name is ${name} (${phone}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Continue on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="bg-white border border-stone-300 text-stone-700 text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
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
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
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
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Interested Project
                  </label>
                  <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    {PROJECTS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Preferred Site-Visit Date (Optional)
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Message / Requirements
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your plot size preference, budget range, or questions..."
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
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
                  regarding my property enquiry. View{' '}
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

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F3D2E] hover:bg-[#16523E] text-white text-sm font-semibold px-7 py-3.5 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#C69C6D]" />
                <span>Submit Enquiry</span>
              </button>
            </form>
          )}
        </Reveal>

        {/* Contact Info & Map */}
        <Reveal delay={100} className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
            <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">
              Contact Information
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E6F0EC] text-[#0F3D2E] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-500">Office Address</div>
                  <div className="text-stone-700 mt-0.5">{COMPANY_INFO.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E6F0EC] text-[#0F3D2E] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-500">Phone</div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-[#0F3D2E] font-semibold hover:underline block mt-0.5"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E6F0EC] text-[#0F3D2E] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-500">Email</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-[#0F3D2E] font-semibold hover:underline block mt-0.5"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E6F0EC] text-[#0F3D2E] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-500">Working Hours</div>
                  <div className="text-stone-700 mt-0.5">{COMPANY_INFO.officeHours}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold py-2.5 px-4 rounded-lg"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href={COMPANY_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#F3F8F6] hover:bg-[#E6F0EC] text-[#0F3D2E] text-sm font-semibold py-2.5 px-4 rounded-lg border border-[#0F3D2E]/15"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs h-64">
            <iframe
              title="VK Pinnacle Site & Corporate Office Map"
              src={COMPANY_INFO.embedMapUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
