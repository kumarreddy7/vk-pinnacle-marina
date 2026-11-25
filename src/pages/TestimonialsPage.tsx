import React, { useState } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '../data/testimonials';
import { PROJECTS } from '../data/projects';
import { COMPANY_INFO } from '../data/company';
import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FILTERS = ['All', 'Residential Plots', 'Villas / Homes', 'Commercial Properties'] as const;

export function TestimonialsPage() {
  useDocumentTitle(
    `Testimonials | ${COMPANY_INFO.shortName}`,
    'Read verified experiences from families, homeowners, and investors at VK Pinnacle.'
  );

  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [name, setName] = useState('');
  const [project, setProject] = useState(PROJECTS[0].name);
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const visibleReviews =
    filter === 'All' ? reviews : reviews.filter((r) => r.propertyType === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;
    const selectedProj = PROJECTS.find((p) => p.name === project);
    const newItem: Testimonial = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      role: 'Verified Customer',
      project,
      propertyType: selectedProj?.category ?? 'Residential Plots',
      rating: 5,
      quote: quote.trim(),
      verifiedDate: 'November 2026',
    };
    setReviews([newItem, ...reviews]);
    setName('');
    setQuote('');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <section className="bg-[#0F3D2E] text-white py-14">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C69C6D]">
            Customer Voices
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
            Verified Buyer Experiences
          </h1>
          <p className="text-stone-200 mt-3 max-w-2xl">
            Hear from families, NRIs, and commercial investors who have chosen VK Pinnacle for
            their property journey.
          </p>
        </Reveal>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                filter === cat
                  ? 'bg-[#0F3D2E] text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat === 'All' ? 'All Testimonials' : cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((t, idx) => (
            <Reveal key={t.id} delay={idx * 75}>
              <article
                className="h-full bg-white rounded-2xl p-7 border border-stone-200 shadow-xs flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#C69C6D]">
                      {Array.from({ length: t.rating }).map((_, starIdx) => (
                        <Star key={starIdx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#E6F0EC]" />
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">“{t.quote}”</p>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  <div className="font-semibold text-[#0F3D2E]">{t.name}</div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {t.role} • {t.project}
                  </div>
                  <div className="text-[11px] text-[#AD8253] font-medium mt-1">
                    Verified • {t.verifiedDate}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Share Feedback Form */}
        <section className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xs max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">
            Share Your Experience
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Visited one of our sites or purchased a property? Leave your feedback below.
          </p>

          {submitted && (
            <div className="mt-4 bg-[#E6F0EC] text-[#0F3D2E] text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Thank you! Your testimonial has been added to the list above.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Name *
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
                  Project
                </label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                >
                  {PROJECTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Feedback *
              </label>
              <textarea
                rows={3}
                required
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Share your experience with our team or project..."
                className="w-full rounded-lg border border-stone-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0F3D2E] hover:bg-[#16523E] text-white text-sm font-semibold px-6 py-2.5 rounded-lg cursor-pointer"
            >
              Submit Feedback
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
