import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Compass,
  Building2,
  ShieldCheck,
  Navigation,
  CalendarCheck,
  MessageCircle,
  Maximize2,
  Calculator,
} from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { COMPANY_INFO } from '../data/company';
import { Lightbox } from '../components/Lightbox';
import { PlotExplorer } from '../components/PlotExplorer';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);
  const { openEnquiry, openPrivacy } = useEnquiry();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [sqYards, setSqYards] = useState<string>('200');

  // Inline enquiry form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useDocumentTitle(
    project ? `${project.name} | ${COMPANY_INFO.shortName}` : `Project Not Found | ${COMPANY_INFO.shortName}`,
    project?.shortDescription
  );

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-display text-3xl font-bold text-[#0F3D2E]">Project Not Found</h1>
        <p className="text-stone-600">
          The project you are looking for may have moved or is no longer listed.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 bg-[#0F3D2E] text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>
    );
  }

  const isMarinaProject =
    project.id === 'marina-by-vk-pinnacle' || project.id === 'marina-commercial-frontage';

  const lightboxImages = project.gallery.map((src, idx) => ({
    src,
    title: `${project.name} — View ${idx + 1}`,
    subtitle: project.location,
  }));

  const numericYards = parseFloat(sqYards) || 0;
  const sqFeet = (numericYards * 9).toLocaleString();
  const cents = (numericYards / 48.4).toFixed(2);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 8 || !consent) return;
    const existing = JSON.parse(localStorage.getItem('vkpinnacle_enquiries') || '[]');
    existing.push({
      id: Date.now(),
      type: 'project-detail-enquiry',
      name: name.trim(),
      phone: phone.trim(),
      project: project.name,
      visitDate,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('vkpinnacle_enquiries', JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Project Hero */}
      <section className="relative h-[420px] sm:h-[480px] bg-[#08231A] flex items-end">
        <img
          src={project.heroImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08231A] via-[#08231A]/55 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C69C6D] hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-[#C69C6D] text-[#08231A] text-xs font-bold px-3 py-1 rounded-full">
              {project.status}
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
              {project.category}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
            {project.name}
          </h1>
          <p className="flex items-center gap-2 text-stone-200 text-sm sm:text-base mt-2">
            <MapPin className="w-4 h-4 text-[#C69C6D]" />
            <span>{project.location}</span>
          </p>
        </div>
      </section>

      {/* Main Content + Sidebar Enquiry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Details Column */}
        <div className="lg:col-span-8 space-y-10">
          {/* Overview */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">Project Overview</h2>
            <p className="text-stone-600 leading-relaxed">{project.overview}</p>
            <div className="bg-[#F3F8F6] border border-[#0F3D2E]/10 rounded-xl p-4 flex items-center gap-3">
              <Compass className="w-5 h-5 text-[#0F3D2E] shrink-0" />
              <div className="text-sm">
                <span className="font-semibold text-[#0F3D2E]">Ideal For: </span>
                <span className="text-stone-700">{project.suitableFor}</span>
              </div>
            </div>
          </div>

          {/* Property Details Grid */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">
              Property Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Total Project Area', value: project.totalArea, icon: Building2 },
                { label: 'Available Unit / Plot Options', value: project.unitOptions, icon: Compass },
                { label: 'Facing Options', value: project.facingOptions, icon: Navigation },
                { label: 'Approval Status', value: project.approvalStatus, icon: ShieldCheck },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#E6F0EC] text-[#0F3D2E] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 font-medium">{spec.label}</div>
                      <div className="text-sm font-semibold text-[#0F3D2E] mt-0.5">
                        {spec.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100">
              <div>
                <span className="text-xs text-stone-500 block">Indicative Pricing</span>
                <span className="text-lg font-bold text-[#0F3D2E]">{project.priceIndicator}</span>
              </div>
              <button
                onClick={() => openEnquiry({ project: project.name, mode: 'enquiry' })}
                className="bg-[#C69C6D] hover:bg-[#AD8253] text-[#08231A] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg cursor-pointer"
              >
                Request Price Sheet
              </button>
            </div>
          </div>

          {/* Plot Area Converter Utility */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#AD8253]" />
              <h2 className="font-display text-xl font-bold text-[#0F3D2E]">
                Quick Plot Area Converter
              </h2>
            </div>
            <p className="text-xs text-stone-500">
              Convert Square Yards to Square Feet and Cents to compare plot dimensions easily.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Area in Sq. Yards
                </label>
                <input
                  type="number"
                  min="0"
                  value={sqYards}
                  onChange={(e) => setSqYards(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm font-semibold text-[#0F3D2E]"
                />
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
                <span className="text-xs text-stone-500 block">Equivalent Sq. Feet</span>
                <span className="text-base font-bold text-[#0F3D2E]">{sqFeet} Sq. Ft</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
                <span className="text-xs text-stone-500 block">Equivalent Cents</span>
                <span className="text-base font-bold text-[#0F3D2E]">{cents} Cents</span>
              </div>
            </div>
          </div>

          {/* Amenities & Infrastructure */}
          {isMarinaProject && (
            <Reveal>
              <PlotExplorer />
            </Reveal>
          )}

          <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
            <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">
              Amenities & Infrastructure
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] text-sm text-stone-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1E6B52] shrink-0 mt-0.5" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Location Advantages & Map */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">
                Location Advantages
              </h2>
              <a
                href={project.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3D2E] bg-[#E6F0EC] px-3.5 py-2 rounded-lg hover:bg-[#d5e7e0]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.locationAdvantages.map((loc) => (
                <div
                  key={loc.landmark}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200/80 text-sm"
                >
                  <span className="font-medium text-stone-700">{loc.landmark}</span>
                  <span className="text-xs font-semibold text-[#0F3D2E] bg-[#F3F8F6] px-2.5 py-1 rounded-full shrink-0">
                    {loc.distance}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-xl overflow-hidden border border-stone-200 h-64">
              <iframe
                title={`${project.name} Location Map`}
                src={project.embedMapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Site Walkthrough Video (if available) */}
          {project.videoUrl && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">
                Site Walkthrough Video
              </h2>
              <div className="aspect-video rounded-xl overflow-hidden bg-black border border-stone-200">
                <video
                  src={project.videoUrl}
                  poster={project.videoPoster}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Photo Gallery */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
            <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">
              Project Gallery & Site Views
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.gallery.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative rounded-xl overflow-hidden h-40 cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${project.name} view ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Enquiry Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
            <div className="bg-[#0F3D2E] text-white p-6">
              <span className="text-xs uppercase tracking-widest text-[#C69C6D] font-semibold">
                Interested in this Project?
              </span>
              <h3 className="font-display text-xl font-bold mt-1">
                Book a Site Visit or Enquire
              </h3>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#1E6B52] mx-auto" />
                <h4 className="font-display text-lg font-bold text-[#0F3D2E]">
                  Enquiry Received!
                </h4>
                <p className="text-xs text-stone-600">
                  Thank you, {name}. Our team will contact you shortly regarding {project.name}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#0F3D2E] underline cursor-pointer"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInlineSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
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
                    className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Site-Visit Date
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`I'm interested in ${project.name}...`}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <label className="flex items-start gap-2 text-xs text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-[#0F3D2E]"
                  />
                  <span>
                    I consent to receive project details.{' '}
                    <button
                      type="button"
                      onClick={openPrivacy}
                      className="text-[#0F3D2E] underline cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0F3D2E] hover:bg-[#16523E] text-white text-sm font-semibold py-3 rounded-lg transition-colors cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 text-[#C69C6D]" />
                  <span>Request Details & Visit</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                    `Hello VK Pinnacle, I would like details and availability for ${project.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Sales Team</span>
                </a>
              </form>
            )}
          </div>
        </aside>
      </section>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
}
