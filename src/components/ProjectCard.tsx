import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Building2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '../data/projects';
import { useEnquiry } from '../context/EnquiryContext';

const STATUS_STYLES: Record<Project['status'], string> = {
  Ongoing: 'bg-[#0F3D2E] text-white',
  'New Launch': 'bg-[#C69C6D] text-[#08231A]',
  Completed: 'bg-stone-800 text-white',
};

export function ProjectCard({ project }: { project: Project }) {
  const { openEnquiry } = useEnquiry();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-[#C69C6D]/45 transition-shadow duration-300 flex flex-col group"
    >
      <div className="relative h-56 overflow-hidden bg-stone-200">
        <img
          src={project.heroImage}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
              STATUS_STYLES[project.status]
            }`}
          >
            {project.status}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/95 text-[#0F3D2E] shadow-sm">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium drop-shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#C69C6D]" />
            {project.totalArea}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-xl font-bold text-[#0F3D2E] group-hover:text-[#1E6B52] transition-colors">
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>
        <p className="flex items-center gap-1.5 text-xs font-medium text-stone-500 mt-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#AD8253] shrink-0" />
          <span>{project.location}</span>
        </p>

        <p className="text-sm text-stone-600 mt-3 line-clamp-2 leading-relaxed flex-1">
          {project.shortDescription}
        </p>

        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span className="font-medium text-[#0F3D2E]">{project.unitOptions}</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <motion.div whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}>
            <Link
              to={`/projects/${project.slug}`}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0F3D2E] hover:bg-[#16523E] text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
          <motion.button
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            onClick={() => openEnquiry({ project: project.name, mode: 'enquiry' })}
            className="inline-flex items-center justify-center bg-[#F3F8F6] hover:bg-[#E6F0EC] text-[#0F3D2E] border border-[#0F3D2E]/20 text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors cursor-pointer"
          >
            Enquire Now
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
