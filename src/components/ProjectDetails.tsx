import { motion } from 'framer-motion';
import type { ProjectData } from '../services/github';
import { ArrowUpRight } from './Icons';
import hardwareMap from '../data/hardware.json';

interface ProjectDetailsProps {
  project: ProjectData;
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const { repo, metadata, coverUrl, galleryUrls, architectureUrl } = project;
  const title = metadata?.title || repo.name;
  const description = metadata?.description || repo.description || 'No description available.';

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
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="liquid-glass-strong rounded-full px-5 py-2 flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold btn-hover"
            >
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
            {metadata?.demo && (
              <a 
                href={metadata.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-black rounded-full px-5 py-2 flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold btn-hover"
              >
                Live Demo <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-[70vh] flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-16">
          <div className="absolute inset-0 z-0">
            {coverUrl ? (
              <img src={coverUrl} className="w-full h-full object-cover opacity-50" alt="Cover" />
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

            {/* Gallery */}
            {galleryUrls.length > 0 && (
              <section>
                <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em]">// Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryUrls.map((img, i) => (
                    <img key={i} src={img} alt={`Gallery ${i}`} className="w-full h-auto rounded-2xl liquid-glass p-1" />
                  ))}
                </div>
              </section>
            )}

            {/* Architecture */}
            {architectureUrl && (
              <section>
                <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em]">// Architecture</h2>
                <img src={architectureUrl} alt="Architecture Diagram" className="w-full h-auto rounded-2xl liquid-glass p-2" />
              </section>
            )}

            {/* Readme Section Fallback */}
            {!galleryUrls.length && !architectureUrl && (
              <section className="liquid-glass rounded-2xl p-8 text-center text-white/55 font-light">
                Detailed specifications and architecture diagrams are available within the repository.
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <section className="liquid-glass rounded-[1.75rem] p-8">
              <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em]">// Hardware Used</h2>
              <div className="flex flex-col gap-3">
                {(metadata?.hardware || (hardwareMap as Record<string, string[]>)[repo.name])?.map(hw => (
                  <div key={hw} className="text-[14px] text-white/75 tracking-wide">{hw}</div>
                )) || <div className="text-[14px] text-white/55 italic">Not specified</div>}
              </div>
            </section>

            <section className="liquid-glass rounded-[1.75rem] p-8">
              <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em]">// Software Stack</h2>
              <div className="flex flex-wrap gap-2">
                {(metadata?.software || repo.topics || []).map(sw => (
                  <span key={sw} className="liquid-glass rounded-full px-3.5 py-1.5 text-[10px] text-white/75 font-body tracking-wider uppercase">
                    {sw}
                  </span>
                ))}
              </div>
            </section>

            <section className="liquid-glass rounded-[1.75rem] p-8">
              <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em]">// Stats</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[11px] text-white/55 uppercase tracking-widest mb-2">Stars</div>
                  <div className="font-heading italic text-3xl">{repo.stargazers_count}</div>
                </div>
                <div>
                  <div className="text-[11px] text-white/55 uppercase tracking-widest mb-2">Forks</div>
                  <div className="font-heading italic text-3xl">{repo.forks_count}</div>
                </div>
                <div>
                  <div className="text-[11px] text-white/55 uppercase tracking-widest mb-2">Language</div>
                  <div className="font-heading italic text-2xl mt-1">{repo.language || 'N/A'}</div>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
