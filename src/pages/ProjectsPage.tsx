import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectStatus } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { COMPANY_INFO } from '../data/company';

const STATUS_FILTERS: ('All' | ProjectStatus)[] = ['All', 'Ongoing', 'New Launch', 'Completed'];
const CATEGORY_FILTERS: ('All' | ProjectCategory)[] = [
  'All',
  'Residential Plots',
  'Villas / Homes',
  'Commercial Properties',
];

export function ProjectsPage() {
  useDocumentTitle(
    `Projects | ${COMPANY_INFO.shortName}`,
    'Browse ongoing, newly launched, and completed residential plots, villas, and commercial projects.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = (searchParams.get('category') as 'All' | ProjectCategory) || 'All';

  const [statusFilter, setStatusFilter] = useState<'All' | ProjectStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | ProjectCategory>(
    CATEGORY_FILTERS.includes(initialCat) ? initialCat : 'All'
  );
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.corridor.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesStatus && matchesCategory && matchesQuery;
    });
  }, [statusFilter, categoryFilter, query]);

  const clearFilters = () => {
    setStatusFilter('All');
    setCategoryFilter('All');
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0F3D2E] text-white py-14">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C69C6D]">
            Our Portfolio
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
            Explore Our Projects
          </h1>
          <p className="text-stone-200 mt-3 max-w-2xl">
            Filter by development stage, property type, or search by location to find the right
            plot, villa, or commercial space.
          </p>
        </Reveal>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-200 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by project name, location, or corridor..."
                className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 mr-1 inline-flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Status:
              </span>
              {STATUS_FILTERS.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === status
                      ? 'bg-[#0F3D2E] text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {status === 'All' ? 'All Statuses' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 mr-1">Property Type:</span>
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategoryFilter(cat);
                    if (cat === 'All') {
                      setSearchParams({});
                    } else {
                      setSearchParams({ category: cat });
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-[#E6F0EC] text-[#0F3D2E] border border-[#0F3D2E]/30'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {cat === 'All' ? 'All Property Types' : cat}
                </button>
              ))}
            </div>

            {(statusFilter !== 'All' || categoryFilter !== 'All' || query) && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-[#AD8253] hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 text-sm text-stone-600">
          Showing <span className="font-semibold text-[#0F3D2E]">{filteredProjects.length}</span>{' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
            <h3 className="font-display text-2xl font-bold text-[#0F3D2E]">
              No matching projects found
            </h3>
            <p className="text-sm text-stone-600 mt-2">
              Try adjusting your search keywords or resetting the status and property type filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-5 bg-[#0F3D2E] text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
            >
              Show All Projects
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
