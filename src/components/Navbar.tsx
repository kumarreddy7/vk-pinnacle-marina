import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, CalendarCheck, Mail } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { COMPANY_INFO } from '../data/company';
import { useEnquiry } from '../context/EnquiryContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact Us', to: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openEnquiry } = useEnquiry();
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Corporate Bar */}
      <div className="bg-[#0F3D2E] text-white/90 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-[#C69C6D] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C69C6D]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-[#C69C6D] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C69C6D]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/75">{COMPANY_INFO.officeHours}</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                'Hello VK Pinnacle, I would like to know more about your projects.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1E6B52] hover:bg-[#258062] text-white px-2.5 py-0.5 rounded-full font-medium transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-10 h-10 rounded-lg bg-[#0F3D2E] flex items-center justify-center shadow-sm group-hover:bg-[#16523E] transition-colors"
            >
              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6 text-[#C69C6D]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 26h24" />
                <path d="M7 26V13l9-7 9 7v13" />
                <path d="M13 26v-7h6v7" />
                <path d="M16 6v4" />
              </svg>
            </motion.div>
            <div>
              <span className="font-display font-bold text-lg sm:text-xl text-[#0F3D2E] tracking-tight block leading-none">
                VK Pinnacle
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#AD8253] font-semibold">
                Plots & Townships
              </span>
            </div>
          </Link>

          {/* Desktop Links with Gold Underline Sweep */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-md text-sm font-medium transition-colors group ${
                    isActive
                      ? 'text-[#0F3D2E] font-semibold'
                      : 'text-stone-700 hover:text-[#0F3D2E]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="navbar-gold-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute left-3 right-3 bottom-0.5 h-0.5 rounded-full bg-[#C69C6D]"
                      />
                    ) : (
                      <span className="absolute left-3 right-3 bottom-0.5 h-0.5 rounded-full bg-[#C69C6D]/70 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              onClick={() => openEnquiry({ mode: 'site-visit' })}
              className="inline-flex items-center gap-2 bg-[#0F3D2E] hover:bg-[#16523E] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#C69C6D]" />
              <span>Book a Site Visit</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              aria-label="Call Sales Team"
              className="p-2 rounded-lg bg-[#E6F0EC] text-[#0F3D2E]"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-stone-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1.5">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.035, duration: 0.2 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#E6F0EC] text-[#0F3D2E] font-semibold border-l-2 border-[#C69C6D]'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-3 mt-2 border-t border-stone-200 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openEnquiry({ mode: 'site-visit' });
                  }}
                  className="flex items-center justify-center gap-1.5 bg-[#0F3D2E] text-white text-sm font-semibold py-2.5 rounded-lg cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 text-[#C69C6D]" />
                  <span>Site Visit</span>
                </button>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-[#1E6B52] text-white text-sm font-semibold py-2.5 rounded-lg"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
