import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Trees,
  Building2,
  Home,
  Route,
  Droplets,
  CheckCircle2,
  ArrowRight,
  Compass,
  ShieldCheck,
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

type PlotFilter = 'all' | 'commercial' | 'residential';
type PlotType = 'Commercial Frontage' | 'Residential';

interface PlotItem {
  plotNo: number;
  type: PlotType;
  road: string;
}

const ALL_PLOTS: PlotItem[] = Array.from({ length: 57 }, (_, index) => {
  const plotNo = index + 1;
  const isCommercial = plotNo <= 10;
  return {
    plotNo,
    type: isCommercial ? 'Commercial Frontage' : 'Residential',
    road: isCommercial
      ? '40 ft Main BT Road & Port Highway Approach'
      : plotNo <= 26
      ? '40 ft Main BT Road (52 ft ROW)'
      : '30 ft Internal BT Road (42 ft ROW)',
  };
});

const FILTER_TABS: { id: PlotFilter; label: string; count: number }[] = [
  { id: 'all', label: 'All Plots', count: 57 },
  { id: 'commercial', label: 'Commercial Frontage (1–10)', count: 10 },
  { id: 'residential', label: 'Residential (11–57)', count: 47 },
];

export function PlotExplorer() {
  const [filter, setFilter] = useState<PlotFilter>('all');
  const [selectedPlotNo, setSelectedPlotNo] = useState<number>(1);
  const { openEnquiry } = useEnquiry();
  const shouldReduceMotion = useReducedMotion();

  const selectedPlot =
    ALL_PLOTS.find((p) => p.plotNo === selectedPlotNo) ?? ALL_PLOTS[0];

  const commercialPlots = ALL_PLOTS.filter((p) => p.type === 'Commercial Frontage');
  const residentialPlots = ALL_PLOTS.filter((p) => p.type === 'Residential');

  const showCommercial = filter === 'all' || filter === 'commercial';
  const showResidential = filter === 'all' || filter === 'residential';

  const handleFilterChange = (nextFilter: PlotFilter) => {
    setFilter(nextFilter);
    if (nextFilter === 'commercial' && selectedPlotNo > 10) {
      setSelectedPlotNo(1);
    } else if (nextFilter === 'residential' && selectedPlotNo <= 10) {
      setSelectedPlotNo(11);
    }
  };

  const renderPlotButton = (plot: PlotItem) => {
    const isCommercial = plot.type === 'Commercial Frontage';
    const isSelected = selectedPlotNo === plot.plotNo;

    return (
      <motion.button
        key={plot.plotNo}
        type="button"
        layout={!shouldReduceMotion}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.06, y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        onClick={() => setSelectedPlotNo(plot.plotNo)}
        aria-label={`Select Plot ${plot.plotNo} (${plot.type})`}
        className={`relative rounded-xl p-2.5 text-center border transition-all cursor-pointer select-none ${
          isSelected
            ? isCommercial
              ? 'bg-[#C69C6D] text-[#08231A] border-[#08231A] ring-2 ring-[#C69C6D]/50 shadow-md font-bold'
              : 'bg-[#0F3D2E] text-white border-[#C69C6D] ring-2 ring-[#0F3D2E]/35 shadow-md font-bold'
            : isCommercial
            ? 'bg-[#FAF3E8] hover:bg-[#F3E4CE] text-[#08231A] border-[#C69C6D]/50 font-semibold'
            : 'bg-[#F3F8F6] hover:bg-[#E6F0EC] text-[#0F3D2E] border-[#0F3D2E]/15 font-semibold'
        }`}
      >
        <span className="block text-[10px] uppercase tracking-wider opacity-70">
          {isCommercial ? 'COM' : 'RES'}
        </span>
        <span className="block text-sm sm:text-base leading-tight mt-0.5">
          #{plot.plotNo}
        </span>
        {isSelected && (
          <span
            className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
              isCommercial ? 'bg-[#08231A]' : 'bg-[#C69C6D]'
            }`}
          />
        )}
      </motion.button>
    );
  };

  return (
    <section
      id="plot-explorer"
      className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="bg-[#0F3D2E] text-white p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C69C6D] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>MUDA Approved • LP NO: 1101_0009_LP_MTM_2026</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              MARINA Interactive 57-Plot Master Plan
            </h2>
            <p className="text-sm text-stone-200 mt-1">
              Click any plot below to inspect road access, category, and book or enquire directly.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#08231A]/70 p-1.5 rounded-xl border border-white/10">
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    active ? 'text-[#08231A]' : 'text-stone-200 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="plot-filter-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      className="absolute inset-0 bg-[#C69C6D] rounded-lg"
                    />
                  )}
                  <span className="relative z-10">
                    {tab.label} ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-stone-200">
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-[#FAF3E8] border border-[#C69C6D]" />
            Commercial Frontage (1–10)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-[#F3F8F6] border border-[#1E6B52]" />
            Residential Plots (11–57)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-emerald-700/80 border border-emerald-400" />
            Open Space Park Area
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-stone-600 border border-stone-400" />
            Utility Area & BT Roads
          </span>
        </div>
      </div>

      {/* Master Plan Visual Grid */}
      <div className="p-5 sm:p-8 bg-[#FAF8F5] space-y-6">
        {/* 40 ft Main BT Road Indicator */}
        <div className="rounded-xl bg-stone-800 text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <Route className="w-4 h-4 text-[#C69C6D] shrink-0" />
            <span>40 ft (12.00 M) Main BT Road + 6 ft Walking Tracks (52 ft ROW)</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#C69C6D] font-semibold">
            600m to 12-Lane Port Highway
          </span>
        </div>

        {/* Commercial Frontage Zone (Plots 1–10) */}
        <AnimatePresence mode="popLayout">
          {showCommercial && (
            <motion.div
              key="commercial-zone"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-[#C69C6D]/40 p-4 sm:p-5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#AD8253]" />
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#0F3D2E]">
                    Commercial Frontage Belt — Plots 1 to 10
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF3E8] text-[#AD8253] border border-[#C69C6D]/30">
                  10 Plots
                </span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {commercialPlots.map(renderPlotButton)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 30 ft Internal BT Road Indicator */}
        {showCommercial && showResidential && (
          <div className="rounded-xl bg-stone-700 text-stone-100 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium">
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-[#C69C6D] shrink-0" />
              <span>30 ft (9.00 M) Internal BT Roads + 6 ft Walking Tracks (42 ft ROW)</span>
            </div>
            <span className="text-stone-300">Underground Drainage & Solar LED Lighting</span>
          </div>
        )}

        {/* Residential Zone (Plots 11–57) + Park & Utility Areas */}
        <AnimatePresence mode="popLayout">
          {showResidential && (
            <motion.div
              key="residential-zone"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#0F3D2E]" />
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#0F3D2E]">
                    Residential Enclave — Plots 11 to 57
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E6F0EC] text-[#0F3D2E]">
                  47 Plots
                </span>
              </div>

              {/* Upper Residential Block (11–34) */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                {residentialPlots.slice(0, 24).map(renderPlotButton)}
              </div>

              {/* Central Amenity Spine: Open Space Park + 30 ft Road + Utility Area */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-7 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F3D2E] text-white flex items-center justify-center shrink-0">
                    <Trees className="w-5 h-5 text-[#C69C6D]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0F3D2E]">
                      Open Space Park Area
                    </p>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Landscaped Greenery, Outdoor Gym, Fitness Zone & Kids Play Area
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5 rounded-xl bg-stone-100 border border-stone-200 p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-700 text-white flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5 text-[#C69C6D]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Utility Area
                    </p>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Overhead Water Tank & Underground Drainage Hub
                    </p>
                  </div>
                </div>
              </div>

              {/* Lower Residential Block (35–57) */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                {residentialPlots.slice(24).map(renderPlotButton)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Plot Action Bar */}
        <motion.div
          key={selectedPlot.plotNo}
          initial={shouldReduceMotion ? false : { opacity: 0.6, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0F3D2E] text-white rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
        >
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C69C6D] text-[#08231A]">
                Plot #{selectedPlot.plotNo}
              </span>
              <span className="text-xs font-semibold text-stone-200">
                {selectedPlot.type}
              </span>
            </div>
            <h4 className="font-display text-lg sm:text-xl font-bold">
              MARINA – Plot #{selectedPlot.plotNo} ({selectedPlot.type})
            </h4>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-stone-300">
              <span className="inline-flex items-center gap-1.5">
                <Route className="w-3.5 h-3.5 text-[#C69C6D]" />
                {selectedPlot.road}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#C69C6D]" />
                Vaastu Planned
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C69C6D]" />
                Spot Registration & Bank Loans
              </span>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            onClick={() =>
              openEnquiry({
                project: `MARINA – Plot #${selectedPlot.plotNo} (${selectedPlot.type})`,
                mode: 'enquiry',
              })
            }
            className="inline-flex items-center justify-center gap-2 bg-[#C69C6D] hover:bg-[#d4ae82] text-[#08231A] font-bold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <span>Book / Enquire Plot #{selectedPlot.plotNo}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
