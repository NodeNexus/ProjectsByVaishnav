import { motion } from 'framer-motion';
import type { ResearchProjectConfig } from '../hooks/useConfig';
import { ArrowUpRight } from './Icons';

interface ProjectDetailsProps {
  project: ResearchProjectConfig;
  onClose: () => void;
}

// Helper to clean up markdown remnants from README extraction
function cleanHardwareText(text: string) {
  return text
    .replace(/\*\*/g, '')
    .replace(/\$\s*\\rightarrow\s*\$/g, '→')
    .replace(/\\rightarrow/g, '→')
    .replace(/\$/g, '')
    .replace(/`/g, '')
    .replace(/^(\d+\.|-)\s*/, '') // remove leading bullets or numbers
    .trim();
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const { title, description, coverUrl, githubUrl, hardware } = project;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col relative pb-32">
        {/* Navigation Bar inside Details */}
        <nav className="fixed top-6 left-0 right-0 z-[110] flex items-center justify-between px-8 lg:px-24">
          <button 
            onClick={onClose}
            className="liquid-glass rounded-full px-5 py-2 text-[11px] font-medium tracking-widest uppercase btn-hover text-white/75"
          >
            ← Back to Systems
          </button>
          
          <div className="flex items-center gap-4">
            {githubUrl && githubUrl !== "#" && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="liquid-glass-strong rounded-full px-5 py-2 flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold btn-hover"
              >
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-[70vh] flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-16">
          <div className="absolute inset-0 z-0">
            {coverUrl ? (
              <img 
                src={coverUrl} 
                className="w-full h-full object-cover opacity-50" 
                alt="Cover" 
              />
            ) : (
              <div className="w-full h-full bg-white/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <h1 className="font-heading italic text-6xl md:text-8xl tracking-[-0.03em] leading-[0.85] mb-6 drop-shadow-2xl">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/75 font-body font-light max-w-2xl leading-relaxed tracking-wide">
              {description}
            </p>
          </div>
        </section>

        {/* Details Layout */}
        <div className="px-8 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          
          <div className="lg:col-span-8 flex flex-col gap-16">
            {/* Overview */}
            <section>
              <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em]">// System Overview</h2>
              <p className="text-[16px] text-white/75 font-body font-light leading-relaxed tracking-wide">
                An engineered solution designed to solve complex challenges through robust hardware and software architecture. Built for performance, reliability, and precision.
              </p>
            </section>

            {/* Readme Section Fallback */}
            <section className="liquid-glass rounded-2xl p-8 text-center text-white/55 font-light">
              Detailed specifications and architecture diagrams are available within the repository.
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <section className="liquid-glass rounded-[1.75rem] p-8">
              <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em]">// Hardware Used</h2>
              <div className="flex flex-col gap-4">
                {hardware && hardware.length > 0 ? hardware.map((hw, i) => (
                  <div key={i} className="text-[14px] text-white/75 tracking-wide flex items-start gap-3">
                    <span className="text-white/30 mt-1 text-[10px]">■</span>
                    <span className="leading-relaxed">{cleanHardwareText(hw)}</span>
                  </div>
                )) : <div className="text-[14px] text-white/55 italic">Not specified</div>}
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
