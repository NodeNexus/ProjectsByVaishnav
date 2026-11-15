import { motion } from 'framer-motion';
import type { ProjectData } from '../services/github';
import { ArrowUpRight } from './Icons';
import hardwareMap from '../data/hardware.json';

interface ProjectDetailsProps {
  project: ProjectData;
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
  const { repo, metadata, coverUrl, galleryUrls, architectureUrl } = project;
  const title = metadata?.title || repo.name;
  const description = metadata?.description || repo.description || 'No description available.';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] bg-[#F8F9FA] text-[#121317] overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col relative pb-32">
        {/* Navigation Bar inside Details */}
        <nav className="fixed top-6 left-0 right-0 z-[110] flex items-center justify-between px-6 lg:px-16 max-w-[1400px] mx-auto">
          <button 
            onClick={onClose}
            className="bg-white/85 backdrop-blur-md border border-[rgba(33,34,38,0.06)] rounded-full px-5 py-2 text-[13px] font-[450] text-[#121317] hover:bg-white transition-colors"
          >
            ← Back to Systems
          </button>
          
          <div className="flex items-center gap-3">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/85 backdrop-blur-md border border-[rgba(33,34,38,0.06)] rounded-full px-5 py-2 flex items-center gap-1.5 text-[13px] font-[450] text-[#121317] hover:bg-white transition-colors"
            >
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            {metadata?.demo && (
              <a 
                href={metadata.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#121317] text-white hover:bg-[#2F3034] rounded-full px-5 py-2 flex items-center gap-1.5 text-[13px] font-[450] transition-colors"
              >
                Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-[65vh] min-h-[460px] flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 pt-24 max-w-[1400px] mx-auto w-full">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {coverUrl ? (
              <img 
                src={coverUrl} 
                className="w-full h-full object-cover opacity-25" 
                alt="Cover" 
                onError={(e) => {
                  const fallbackUrl = `https://opengraph.githubassets.com/1/${repo.html_url.split('/')[3] || 'NodeNexus'}/${repo.name}`;
                  if (e.currentTarget.src !== fallbackUrl) {
                    e.currentTarget.src = fallbackUrl;
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-[#F8F9FC]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/85 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <h1 className="font-sans font-[450] text-4xl md:text-6xl lg:text-[72px] tracking-[-0.017em] leading-[1.08] mb-4 text-[#121317]">
              {title}
            </h1>
            <p className="text-[17.5px] text-[#45474D] font-normal max-w-2xl leading-[1.45]">
              {description}
            </p>
          </div>
        </section>

        {/* Details Layout */}
        <div className="px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Overview */}
            <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8 md:p-10">
              <h2 className="text-[12px] font-sans text-[#45474D] mb-4 uppercase tracking-[0.1em] font-medium">// System Overview</h2>
              <p className="text-[15px] text-[#45474D] font-normal leading-relaxed">
                An engineered solution designed to solve complex challenges through robust hardware and software architecture. Built for performance, reliability, and precision.
              </p>
            </section>

            {/* Gallery */}
            {galleryUrls.length > 0 && (
              <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8 md:p-10">
                <h2 className="text-[12px] font-sans text-[#45474D] mb-6 uppercase tracking-[0.1em] font-medium">// Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryUrls.map((img, i) => (
                    <img key={i} src={img} alt={`Gallery ${i}`} className="w-full h-auto rounded-[24px] border border-[rgba(33,34,38,0.06)] p-1 bg-[#F8F9FC]" onError={(e) => e.currentTarget.style.display = 'none'} />
                  ))}
                </div>
              </section>
            )}

            {/* Architecture */}
            {architectureUrl && (
              <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8 md:p-10">
                <h2 className="text-[12px] font-sans text-[#45474D] mb-6 uppercase tracking-[0.1em] font-medium">// Architecture</h2>
                <img src={architectureUrl} alt="Architecture Diagram" className="w-full h-auto rounded-[24px] border border-[rgba(33,34,38,0.06)] p-2 bg-[#F8F9FC]" />
              </section>
            )}

            {/* Readme Section Fallback */}
            {!galleryUrls.length && !architectureUrl && (
              <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-10 text-center text-[#45474D] font-normal">
                Detailed specifications and architecture diagrams are available within the repository.
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8">
              <h2 className="text-[12px] font-sans text-[#45474D] mb-4 uppercase tracking-[0.1em] font-medium">// Hardware Used</h2>
              <div className="flex flex-col gap-3">
                {(metadata?.hardware || (hardwareMap as Record<string, string[]>)[repo.name])?.map((hw, i) => (
                  <div key={i} className="text-[14px] text-[#121317] flex items-start gap-2.5">
                    <span className="text-[#121317]/40 mt-1 text-[10px]">■</span>
                    <span className="leading-relaxed">{cleanHardwareText(hw)}</span>
                  </div>
                )) || <div className="text-[14px] text-[#45474D] italic">Not specified</div>}
              </div>
            </section>

            <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8">
              <h2 className="text-[12px] font-sans text-[#45474D] mb-4 uppercase tracking-[0.1em] font-medium">// Software Stack</h2>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set([
                  ...(metadata?.software || repo.topics || []),
                  ((metadata?.hardware || (hardwareMap as Record<string, string[]>)[repo.name])?.length ? 'Arduino IDE' : 'Antigravity IDE')
                ])).map(sw => (
                  <span key={sw} className="bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] rounded-full px-3.5 py-1.5 text-[12px] text-[#121317] font-medium uppercase tracking-wider">
                    {sw}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8">
              <h2 className="text-[12px] font-sans text-[#45474D] mb-4 uppercase tracking-[0.1em] font-medium">// Stats</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[11px] text-[#45474D] uppercase tracking-wider mb-1">Stars</div>
                  <div className="font-sans font-[450] text-3xl text-[#121317]">{repo.stargazers_count}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#45474D] uppercase tracking-wider mb-1">Forks</div>
                  <div className="font-sans font-[450] text-3xl text-[#121317]">{repo.forks_count}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[11px] text-[#45474D] uppercase tracking-wider mb-1">Language</div>
                  <div className="font-sans font-[450] text-2xl text-[#121317] mt-0.5">{repo.language || 'N/A'}</div>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
