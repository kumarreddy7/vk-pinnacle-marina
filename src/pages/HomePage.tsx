import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Users,
  FileText,
  Star,
  MessageCircle,
  Phone,
  Compass,
  Home,
  Building2,
  Maximize2,
  ChevronDown,
  Play,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { PROJECTS } from '../data/projects';
import { GALLERY_ITEMS, SITE_VIDEOS, VideoItem } from '../data/gallery';
import { TESTIMONIALS } from '../data/testimonials';
import { ProjectCard } from '../components/ProjectCard';
import { Lightbox } from '../components/Lightbox';
import { Reveal } from '../components/Reveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { useEnquiry } from '../context/EnquiryContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const WHY_CHOOSE_ITEMS = [
  {
    icon: FileText,
    title: 'Clear Information & Documentation',
    text: 'Clear project information, transparent communication, and documentation details available on request.',
  },
  {
    icon: MapPin,
    title: 'Convenient Project Locations',
    text: 'Strategically chosen corridors with verified connectivity to highways, schools, hospitals, and transit hubs.',
  },
  {
    icon: Users,
    title: 'Dedicated Customer Team',
    text: 'A helpful relationship team to guide you through enquiries, site visits, and property selection.',
  },
  {
    icon: ShieldCheck,
    title: 'Regular Project Updates',
    text: 'Consistent site progress photography, milestone announcements, and on-ground infrastructure transparency.',
  },
];

const PROPERTY_CATEGORIES = [
  {
    title: 'Residential Plots',
    subtitle: 'Gated layouts with blacktop avenues & parks',
    icon: Compass,
    image: './images/project-plots.jpg',
    to: '/projects?category=Residential%20Plots',
  },
  {
    title: 'Villas / Homes',
    subtitle: 'Independent contemporary homes with clubhouse',
    icon: Home,
    image: './images/project-villas.jpg',
    to: '/projects?category=Villas%20%2F%20Homes',
  },
  {
    title: 'Commercial Properties',
    subtitle: 'High-visibility retail plazas & corporate spaces',
    icon: Building2,
    image: './images/project-commercial.jpg',
    to: '/projects?category=Commercial%20Properties',
  },
];

function VideoShowcaseCard({ vid }: { vid: VideoItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all">
      <div className="relative aspect-video bg-black overflow-hidden">
        {isPlaying ? (
          <video
            src={vid.src}
            poster={vid.poster}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <img
              src={vid.poster}
              alt={vid.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <AnimatePresence>
              <motion.button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play ${vid.title}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group absolute inset-0 bg-gradient-to-t from-[#08231A]/75 via-[#08231A]/30 to-transparent flex flex-col items-center justify-center gap-3 cursor-pointer"
              >
                <motion.span
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                  className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#C69C6D] text-[#08231A] shadow-xl ring-4 ring-white/25 group-hover:bg-[#d8af80] transition-colors"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </motion.span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white bg-[#08231A]/70 backdrop-blur-sm px-3.5 py-1 rounded-full border border-white/20">
                  Play Site Video
                </span>
              </motion.button>
            </AnimatePresence>
          </>
        )}
      </div>
      <div className="p-5 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#AD8253]">{vid.project}</span>
          <span className="bg-[#E6F0EC] text-[#0F3D2E] font-semibold px-2.5 py-0.5 rounded-full">
            {vid.tag}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-[#0F3D2E]">{vid.title}</h3>
        <p className="text-sm text-stone-600">{vid.description}</p>
      </div>
    </div>
  );
}

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HomePage() {
  useDocumentTitle(
    `${COMPANY_INFO.name} | Find the Right Place to Build Your Future`,
    'Explore thoughtfully planned residential plots, luxury villas, and commercial properties by VK Pinnacle in Machilipatnam.'
  );

  const { openEnquiry } = useEnquiry();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 6);
  const highlightGallery = GALLERY_ITEMS.slice(0, 4);
  const lightboxImages = highlightGallery.map((g) => ({
    src: g.image,
    title: g.title,
    subtitle: `${g.project} — ${g.caption}`,
  }));

  return (
    <div>
      {/* 1. Large Hero Banner with Parallax & Staggered Motion */}
      <section
        ref={heroRef}
        className="relative min-h-[580px] lg:min-h-[650px] flex items-center bg-[#08231A] overflow-hidden"
      >
        <motion.img
          src="./images/hero-township.jpg"
          alt="VK Pinnacle gated residential township"
          style={shouldReduceMotion ? undefined : { y: heroY }}
          className="absolute inset-0 w-full h-[115%] -top-[5%] object-cover opacity-55 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08231A]/95 via-[#08231A]/75 to-[#08231A]/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: HERO_EASE }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-[#C69C6D] text-xs font-semibold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full"
            >
              MARINA • LP NO: 1101_0009_LP_MTM_2026
            </motion.span>
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: HERO_EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12]"
            >
              The Gateway to Coastal Growth
            </motion.h1>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: HERO_EASE }}
              className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-xl"
            >
              Own a premium MUDA Approved plot at <strong className="text-white">MARINA</strong> by
              VK Pinnacle — just <strong className="text-[#C69C6D]">600 metres</strong> from the
              12-Lane Port Highway to Machilipatnam Port. Spot registration & bank loans available.
            </motion.p>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: HERO_EASE }}
              className="flex flex-wrap gap-2.5 text-xs font-semibold"
            >
              <span className="bg-[#0F3D2E]/90 border border-[#C69C6D]/40 text-[#C69C6D] px-3 py-1 rounded-full">
                ✓ MUDA Approved Layout
              </span>
              <span className="bg-[#0F3D2E]/90 border border-[#C69C6D]/40 text-white px-3 py-1 rounded-full">
                ✓ Spot Registration
              </span>
              <span className="bg-[#0F3D2E]/90 border border-[#C69C6D]/40 text-white px-3 py-1 rounded-full">
                ✓ Bank Loans Available
              </span>
            </motion.div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: HERO_EASE }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-[#C69C6D] hover:bg-[#AD8253] text-[#08231A] font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span>View Our Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => openEnquiry({ mode: 'site-visit' })}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm font-semibold text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#C69C6D]" />
                <span>Book a Site Visit</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <a
          href="#welcome"
          aria-label="Scroll to content"
          className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-white/75 hover:text-[#C69C6D] transition-colors animate-float-slow"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Explore</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </section>

      {/* Animated Stats Strip */}
      <section className="bg-[#0F3D2E] text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <Reveal
              key={stat.label}
              delay={idx * 75}
              className="text-center lg:text-left lg:border-l lg:border-white/15 lg:pl-6 first:border-l-0 first:pl-0"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#C69C6D]">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-xs sm:text-sm text-stone-200 mt-1">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 2. Company Introduction */}
      <section id="welcome" className="py-16 lg:py-20 bg-[#FAF8F5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <Reveal direction="right" className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
              Welcome to {COMPANY_INFO.shortName}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F3D2E] leading-tight">
              Building Places. Creating Possibilities.
            </h2>
            <p className="text-stone-600 leading-relaxed">
              We help you discover property opportunities for living, building, and investing. Our
              projects are planned with attention to location, access, and the needs of modern
              customers—combining clear documentation with dependable on-ground infrastructure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'MUDA Approved (1101_0009_LP_MTM_2026)',
                '40 ft Main & 30 ft Internal BT Roads',
                '6 ft Walking Tracks on Both Sides',
                'Underground Drainage & Solar Lights',
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-sm font-medium text-[#0F3D2E]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1E6B52] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F3D2E] hover:text-[#1E6B52] underline underline-offset-4 group"
              >
                <span>Learn More About Our Company</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <Reveal direction="left" delay={120} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="./images/project-plots.jpg"
              alt="Gated residential plots"
              className="rounded-2xl h-56 sm:h-64 w-full object-cover shadow-md hover:shadow-xl transition-shadow duration-300"
            />
            <img
              src="./images/project-clubhouse.jpg"
              alt="Township clubhouse"
              className="rounded-2xl h-56 sm:h-64 w-full object-cover shadow-md hover:shadow-xl transition-shadow duration-300"
            />
          </Reveal>
        </div>
      </section>

      {/* 3. Featured Projects */}
      <section className="py-16 lg:py-20 bg-white border-y border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
                Our Portfolio
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F3D2E] mt-1">
                Featured Projects
              </h2>
              <p className="text-stone-600 mt-2 max-w-2xl">
                Explore ongoing, newly launched, and completed townships across high-growth
                residential and commercial corridors.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#F3F8F6] hover:bg-[#E6F0EC] text-[#0F3D2E] font-semibold text-sm px-5 py-2.5 rounded-lg border border-[#0F3D2E]/15 shrink-0 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          {/* Key Distances Strip from Marina Brochure */}
          <Reveal className="mt-10 bg-[#0F3D2E] text-white rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C69C6D]">
                  Location Advantage
                </span>
                <h3 className="font-display text-2xl font-bold">
                  Key Distances from MARINA
                </h3>
              </div>
              <a
                href={COMPANY_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#C69C6D] hover:underline"
              >
                Open Site Location on Google Maps →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { place: '12-Lane Port Highway', dist: '600 Metres' },
                { place: 'Engineering College', dist: '1 KM | 2 Min' },
                { place: 'Machilipatnam Port', dist: '2 KM | 3 Min' },
                { place: 'Medical College', dist: '3 KM | 5 Min' },
                { place: 'Machilipatnam', dist: '18 KM' },
                { place: 'Gudivada', dist: '40 KM | 45 Min' },
                { place: 'Gannavaram Airport', dist: '65 KM | 60 Min' },
                { place: 'Vijayawada', dist: '70 KM | 65 Min' },
              ].map((d) => (
                <div
                  key={d.place}
                  className="bg-white/10 rounded-xl p-3.5 border border-white/10"
                >
                  <div className="text-xs text-stone-300">{d.place}</div>
                  <div className="text-sm font-bold text-[#C69C6D] mt-0.5">{d.dist}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Property Categories & Why Choose Us */}
      <section className="py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <Reveal className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
                Explore By Property Type
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F3D2E] mt-1">
                Properties Tailored to Your Goals
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROPERTY_CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <Reveal key={cat.title} delay={idx * 100}>
                    <Link
                      to={cat.to}
                      className="group relative block rounded-2xl overflow-hidden h-64 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08231A]/95 via-[#08231A]/40 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <div className="w-9 h-9 rounded-lg bg-[#C69C6D] text-[#08231A] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-xl font-bold">{cat.title}</h3>
                        <p className="text-xs text-stone-200 mt-1">{cat.subtitle}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
                Why Choose Us
              </span>
              <h2 className="font-display text-3xl font-bold text-[#0F3D2E] mt-1">
                Built on Trust & Transparency
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={idx * 80}>
                    <div className="h-full p-5 rounded-xl bg-[#FAF8F5] border border-stone-200/70 hover:border-[#C69C6D] hover:shadow-sm transition-all space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E6F0EC] text-[#0F3D2E] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-[#0F3D2E] text-base">{item.title}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Actual Site Videos & Photo Highlights */}
      <section className="py-16 lg:py-20 bg-white border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
                Actual Site & Corridor Footage
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F3D2E] mt-1">
                Site Walkthrough & Port Corridor Videos
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F3D2E] hover:text-[#1E6B52] group"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>

          {/* Client Site Videos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {SITE_VIDEOS.map((vid, idx) => (
              <Reveal key={vid.id} delay={idx * 100}>
                <VideoShowcaseCard vid={vid} />
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlightGallery.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 80}>
                <button
                  onClick={() => setLightboxIndex(idx)}
                  className="w-full group relative rounded-2xl overflow-hidden h-60 text-left shadow-xs hover:shadow-lg transition-all cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <span className="text-[11px] uppercase tracking-wider text-[#C69C6D] font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-semibold leading-snug mt-0.5">{item.title}</h3>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 lg:py-20 bg-[#FAF8F5] border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
                Customer Stories
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F3D2E] mt-1">
                Trusted by Families & Investors
              </h2>
            </div>
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F3D2E] hover:text-[#1E6B52] group"
            >
              <span>Read All Testimonials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, idx) => (
              <Reveal key={t.id} delay={idx * 90}>
                <div className="h-full bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[#C69C6D] mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed italic">“{t.quote}”</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <div className="font-semibold text-sm text-[#0F3D2E]">{t.name}</div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {t.role} • {t.project}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Enquiry CTA Banner */}
      <section className="bg-[#0F3D2E] text-white py-16">
        <Reveal direction="scale" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C69C6D]">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Looking for your next property?
          </h2>
          <p className="text-stone-200 max-w-2xl mx-auto">
            Share your requirements and our team will contact you with project details, verified
            location maps, and site-visit options.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => openEnquiry({ mode: 'enquiry' })}
              className="inline-flex items-center gap-2 bg-[#C69C6D] hover:bg-[#AD8253] text-[#08231A] font-bold text-sm px-6 py-3.5 rounded-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Enquire Now</span>
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                'Hello VK Pinnacle, I would like to enquire about your properties.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm px-6 py-3.5 rounded-lg hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <button
              onClick={() => openEnquiry({ mode: 'site-visit' })}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#C69C6D]" />
              <span>Schedule a Site Visit</span>
            </button>
          </div>
        </Reveal>
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
