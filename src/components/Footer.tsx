import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/company';
import { PROJECTS } from '../data/projects';
import { useEnquiry } from '../context/EnquiryContext';

export function Footer() {
  const { openEnquiry, openPrivacy } = useEnquiry();

  return (
    <footer className="bg-[#08231A] text-stone-300 border-t border-[#16523E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                {COMPANY_INFO.shortName}
              </h3>
              <p className="text-xs uppercase tracking-[0.18em] text-[#C69C6D] mt-1">
                Townships & Properties
              </p>
            </div>
            <p className="text-sm text-stone-300/90 leading-relaxed">
              Thoughtfully planned residential plots, villas, and commercial properties built with
              clear documentation, strategic connectivity, and customer-first guidance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#1E6B52] hover:bg-[#258062] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => openEnquiry({ mode: 'site-visit' })}
                className="inline-flex items-center gap-1.5 bg-[#C69C6D] hover:bg-[#AD8253] text-[#08231A] text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'All Projects', to: '/projects' },
                { label: 'Gallery & Updates', to: '/gallery' },
                { label: 'Customer Testimonials', to: '/testimonials' },
                { label: 'Contact Us', to: '/contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-[#C69C6D] transition-colors inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Projects */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Featured Projects
            </h4>
            <ul className="space-y-2.5 text-sm">
              {PROJECTS.slice(0, 5).map((project) => (
                <li key={project.id}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="hover:text-[#C69C6D] transition-colors flex items-center justify-between gap-2 group"
                  >
                    <span className="truncate">{project.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Corporate Office
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C69C6D] shrink-0 mt-1" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex items-center gap-2.5 hover:text-[#C69C6D] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C69C6D] shrink-0" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2.5 hover:text-[#C69C6D] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C69C6D] shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#C69C6D] hover:underline mt-1"
                >
                  <span>View Office on Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Compliance Note */}
        <div className="mt-12 pt-8 pb-16 md:pb-4 md:pr-20 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-stone-400">
          <div className="space-y-1 max-w-2xl">
            <p>
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
            </p>
            <p className="flex items-start gap-1.5 text-stone-400/90">
              <ShieldCheck className="w-4 h-4 text-[#C69C6D] shrink-0 mt-0.5" />
              <span>
                All architectural visuals, layout plans, and specifications are for general
                informational guidance. Contact our office for official RERA/LP documents and
                current unit availability.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={openPrivacy}
              className="hover:text-white underline cursor-pointer"
            >
              Privacy Policy & Consent
            </button>
            <Link to="/contact" className="hover:text-white">
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
