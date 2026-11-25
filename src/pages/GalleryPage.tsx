import { useState } from 'react';
import { Maximize2, Calendar, Newspaper, Film } from 'lucide-react';
import { ANNOUNCEMENTS, GALLERY_ITEMS, GalleryCategory, SITE_VIDEOS } from '../data/gallery';
import { Lightbox } from '../components/Lightbox';
import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { COMPANY_INFO } from '../data/company';

const GALLERY_FILTERS: ('All' | GalleryCategory)[] = [
  'All',
  'Project Photos',
  'Site Progress',
  'Launch Events',
];

export function GalleryPage() {
  useDocumentTitle(
    `Gallery & Updates | ${COMPANY_INFO.shortName}`,
    'View project photographs, on-site infrastructure progress, launch events, and latest announcements.'
  );

  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    filter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  const lightboxImages = filteredItems.map((item) => ({
    src: item.image,
    title: item.title,
    subtitle: `${item.project} (${item.date}) — ${item.caption}`,
  }));

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <section className="bg-[#0F3D2E] text-white py-14">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C69C6D]">
            Visual Updates
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
            Gallery & Site Progress
          </h1>
          <p className="text-stone-200 mt-3 max-w-2xl">
            Explore real-time development milestones, architectural highlights, and community
            announcements across our townships.
          </p>
        </Reveal>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Site & Corridor Videos */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Film className="w-6 h-6 text-[#AD8253]" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F3D2E]">
              Site Walkthrough & Port Corridor Videos
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {SITE_VIDEOS.map((vid, idx) => (
              <Reveal key={vid.id} delay={idx * 90}>
                <div
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-black">
                    <video
                      src={vid.src}
                      poster={vid.poster}
                      controls
                      preload="metadata"
                      playsInline
                      className="w-full h-full object-cover"
                    />
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
              </Reveal>
            ))}
          </div>
        </section>

        {/* Filterable Photo Gallery */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {GALLERY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-[#0F3D2E] text-white'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat === 'All' ? 'All Photos' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 70}>
                <div
                  onClick={() => setLightboxIndex(idx)}
                  className="h-full bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0F3D2E]/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                      {item.category}
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <div className="text-xs font-semibold text-[#AD8253]">
                      {item.project} • {item.date}
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0F3D2E]">{item.title}</h3>
                    <p className="text-sm text-stone-600 line-clamp-2">{item.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* News & Announcements */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-[#AD8253]" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F3D2E]">
              News & Announcements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ANNOUNCEMENTS.map((ann, idx) => (
              <Reveal key={ann.id} delay={idx * 80}>
                <article
                  className="h-full bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-[#E6F0EC] text-[#0F3D2E] font-semibold px-2.5 py-1 rounded-full">
                      {ann.tag}
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {ann.date}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0F3D2E] leading-snug">
                    {ann.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{ann.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
}
