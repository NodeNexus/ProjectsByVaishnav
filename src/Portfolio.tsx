import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadingVideo } from './components/FadingVideo';
import { BlurText } from './components/BlurText';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetails } from './components/ProjectDetails';
import { useGitHubData } from './hooks/useGitHubData';
import type { ProjectData } from './services/github';
import type { Config } from './hooks/useConfig';
import { hardwareData, type HardwareDetails } from './data/hardware_details';
import { HardwareDetailsView } from './components/HardwareDetails';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  ArrowUpRight,
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  ResumeIcon
} from './components/Icons';

const motionProps = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const }
};

// Counter Component for animating numbers (simplified approach)
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}



export default function Portfolio({ config }: { config: Config }) {
  const { data, loading } = useGitHubData(config.githubUsername);

  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const [selectedHardware, setSelectedHardware] = useState<HardwareDetails | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const hardwareId = params.get('hardware');
      if (hardwareId) {
        return hardwareData.find(h => h.id === hardwareId) || null;
      }
    }
    return null;
  });

  const [showAllHardware, setShowAllHardware] = useState(false);

  const researchProjects: ProjectData[] = config.researchProjects?.length ? config.researchProjects.map(rp => ({
    repo: {
      id: rp.id,
      name: rp.title.replace(/\s+/g, '-').toLowerCase(),
      description: rp.description,
      html_url: rp.githubUrl || "#",
      stargazers_count: 0,
      forks_count: 0,
      language: "",
      updated_at: new Date().toISOString(),
      topics: ["research"],
      default_branch: "main",
      fork: false
    },
    metadata: {
      featured: true,
      title: rp.title,
      description: rp.description,
      hardware: rp.hardware,
      software: rp.software,
    },
    coverUrl: rp.coverUrl,
    galleryUrls: [],
    architectureUrl: null
  })) : [];

  // Sync URL when hardware changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (selectedHardware) {
        url.searchParams.set('hardware', selectedHardware.id);
      } else {
        url.searchParams.delete('hardware');
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedHardware]);

  // Sync URL when project changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (selectedProject) {
        url.searchParams.set('project', selectedProject.repo.name);
      } else {
        url.searchParams.delete('project');
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedProject]);

  // Load initial project from URL once data is fetched
  useEffect(() => {
    if (!loading && data && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const projName = params.get('project');
      if (projName) {
        const allProjects = [...data.projects, ...researchProjects];
        const found = allProjects.find(p => p.repo.name === projName);
        if (found) {
          setSelectedProject(found);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  // Prevent scrolling when details view is open
  useEffect(() => {
    if (selectedProject || selectedHardware) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject, selectedHardware]);

  return (
    <div className="w-full bg-black text-white font-body selection:bg-white selection:text-black min-h-screen relative">

      {/* Project Details Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedHardware && (
          <HardwareDetailsView
            component={selectedHardware}
            onClose={() => setSelectedHardware(null)}
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-24">
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.pushState(null, '', window.location.pathname);
          }}
          className="liquid-glass-extreme h-12 px-6 rounded-full flex items-center justify-center btn-hover cursor-pointer relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/5 opacity-50 z-0"></div>
          <span className="font-heading font-medium italic text-xl mt-1 z-10">{config.name}</span>
        </div>

        <div className="hidden md:flex liquid-glass-extreme rounded-full p-2 items-center gap-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-50 z-0"></div>
          <div className="flex items-center gap-1 px-2 z-10">
            {["Systems", "Hardware", "GitHub", "Research", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link px-4 py-2 text-[13px] font-medium text-white/75 font-body">
                {link}
              </a>
            ))}
          </div>
          <a href={config.githubLink} target="_blank" rel="noopener noreferrer" className="btn-hover bg-white text-black rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[13px] font-semibold font-body ml-2 z-10">
            View GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="h-12 w-12 hidden md:block" />
      </nav>

      {/* Section 1: Hero */}
      <section className="h-screen overflow-hidden bg-black relative flex flex-col">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8"
            className="w-full h-full object-cover object-top opacity-85"
            style={{ transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0 vignette-overlay mix-blend-multiply" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-32 px-4 text-center">
          <motion.div
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 0.4 }}
            className="liquid-glass rounded-full flex items-center gap-4 p-1.5 pr-5 mb-10 card-hover cursor-pointer"
          >
            <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">Latest</span>
            <span className="text-[13px] text-white/75 font-medium tracking-wide">{config.latestTagText || "Deploying embedded machine learning on custom silicon"}</span>
          </motion.div>

          <BlurText
            text={config.heroHeadline}
            className="text-6xl md:text-7xl lg:text-[6.5rem] font-heading italic text-white leading-[0.85] tracking-[-0.04em] max-w-[1000px] mx-auto drop-shadow-2xl"
          />

          <motion.p
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 0.8 }}
            className="text-base md:text-lg text-white/75 max-w-2xl font-body font-light leading-relaxed mt-10 tracking-wide"
          >
            {config.heroSubheadline}
          </motion.p>

          <motion.div
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 1.1 }}
            className="flex items-center gap-8 mt-12"
          >
            <a href="#systems" className="liquid-glass-strong btn-hover rounded-full px-6 py-3.5 flex items-center gap-2 text-[13px] uppercase tracking-widest font-medium">
              Explore Systems <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href={config.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] uppercase tracking-widest font-medium text-white/75 nav-link">
              <GitHubIcon className="w-5 h-5" /> View Repositories
            </a>
          </motion.div>

          {/* Dynamic Hero Statistics */}
          <motion.div
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 1.3 }}
            className="flex gap-6 mt-20 flex-wrap justify-center"
          >
            <div className="liquid-glass card-hover p-6 w-[200px] rounded-[1.5rem] text-left flex flex-col cursor-default">
              <span className="text-[11px] text-white/55 font-light tracking-widest uppercase leading-relaxed mb-4">Repositories</span>
              <span className="text-5xl font-heading italic tracking-[-0.02em] leading-none">
                {loading ? '...' : <AnimatedCounter value={data?.stats.repositories || 0} />}
              </span>
            </div>
            <div className="liquid-glass card-hover p-6 w-[200px] rounded-[1.5rem] text-left flex flex-col cursor-default">
              <span className="text-[11px] text-white/55 font-light tracking-widest uppercase leading-relaxed mb-4">Total Stars</span>
              <span className="text-5xl font-heading italic tracking-[-0.02em] leading-none">
                {loading ? '...' : <AnimatedCounter value={data?.stats.stars || 0} />}
              </span>
            </div>
            <div className="liquid-glass card-hover p-6 w-[200px] rounded-[1.5rem] text-left flex flex-col cursor-default">
              <span className="text-[11px] text-white/55 font-light tracking-widest uppercase leading-relaxed mb-4">Systems Built</span>
              <span className="text-5xl font-heading italic tracking-[-0.02em] leading-none">
                {loading ? '...' : <AnimatedCounter value={data?.stats.projectsCompleted || 0} />}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Technology Trust Bar */}
        <motion.div
          {...motionProps}
          transition={{ ...motionProps.transition, delay: 1.4 }}
          className="relative z-10 flex flex-col items-center gap-8 pb-12 mt-12"
        >
          <div className="liquid-glass rounded-full px-6 py-2.5 text-[11px] font-medium text-white/55 tracking-[0.2em] uppercase card-hover">
            Technologies powering these systems
          </div>
          <div className="flex items-center gap-8 md:gap-12 flex-wrap justify-center opacity-60">
            {["Python", "C++", "React", "Next.js", "Docker", "Linux", "TensorFlow", "Raspberry Pi"].map(tech => (
              <span key={tech} className="font-heading italic text-2xl md:text-3xl tracking-tight hover:opacity-100 hover:text-white transition-opacity duration-500 cursor-pointer">{tech}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section: Featured Projects */}
      <section id="systems" className="min-h-screen relative flex flex-col pt-32 pb-20 px-8 md:px-16 lg:px-24">
        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <div className="mb-16">
            <h2 className="font-heading italic text-5xl md:text-7xl lg:text-[6rem] leading-[0.85] tracking-[-0.03em] max-w-3xl mb-6">
              Featured Systems
            </h2>
            <p className="text-lg text-white/55 font-body font-light leading-relaxed max-w-2xl tracking-wide">
              Every repository represents solving a real engineering problem through thoughtful hardware and software architecture.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="liquid-glass rounded-[1.75rem] h-[480px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.projects.map(project => (
                <ProjectCard
                  key={project.repo.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section: Hardware */}
      <section id="hardware" className="min-h-screen relative flex flex-col pt-32 pb-20 px-8 md:px-16 lg:px-24">
        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <div className="mb-16">
            <p className="text-[11px] font-body text-white/55 mb-8 uppercase tracking-[0.2em]">// Hardware</p>
            <h2 className="font-heading italic text-5xl md:text-7xl lg:text-[6rem] leading-[0.85] tracking-[-0.03em] max-w-3xl mb-6">
              Silicon and Circuits.
            </h2>
            <p className="text-lg text-white/55 font-body font-light leading-relaxed max-w-2xl tracking-wide">
              Designing custom PCBs, integrating microcontrollers, and building the physical interfaces that bring software into the real world.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(showAllHardware ? hardwareData : hardwareData.slice(0, 8)).map((comp) => (
              <div
                key={comp.id}
                className="liquid-glass card-hover rounded-[1.25rem] p-4 flex flex-col group overflow-hidden cursor-pointer"
                onClick={() => setSelectedHardware(comp)}
              >
                <div className="rounded-[1rem] overflow-hidden mb-4 relative aspect-square">
                  <img src={comp.image} alt={comp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                  {/* Simulated LED Blinks */}
                  {comp.id === 'arduino_uno' && (
                    <>
                      <div className="absolute top-[45%] right-[18%] w-1.5 h-1.5 bg-cyan-200 rounded-full blur-[1px] animate-ping z-20 opacity-70" style={{ animationDuration: '0.5s' }} />
                      <div className="absolute top-[45%] right-[18%] w-4 h-4 bg-cyan-400 rounded-full blur-[4px] animate-pulse z-20 mix-blend-screen" />

                      <div className="absolute top-[52%] left-[45%] w-1.5 h-1.5 bg-orange-200 rounded-full blur-[1px] animate-ping z-20 opacity-60" style={{ animationDuration: '1.2s' }} />
                      <div className="absolute top-[52%] left-[45%] w-3 h-3 bg-orange-400 rounded-full blur-[3px] animate-pulse z-20 mix-blend-screen" />
                    </>
                  )}
                  {comp.id === 'esp32' && (
                    <>
                      <div className="absolute bottom-[28%] left-[25%] w-2 h-2 bg-orange-300 rounded-full blur-[1px] animate-ping z-20 opacity-80" style={{ animationDuration: '2s' }} />
                      <div className="absolute bottom-[28%] left-[25%] w-5 h-5 bg-red-500 rounded-full blur-[6px] animate-pulse z-20 mix-blend-screen" />
                    </>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 pointer-events-none" />
                </div>
                <h3 className="font-heading italic text-2xl tracking-tight mb-1 relative z-30">{comp.name}</h3>
                <p className="text-[12px] text-white/55 font-body tracking-wide">
                  {comp.shortDesc}
                </p>
              </div>
            ))}
          </div>

          {hardwareData.length > 8 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAllHardware(!showAllHardware)}
                className="liquid-glass-strong btn-hover rounded-full px-8 py-4 flex items-center gap-3 text-[14px] uppercase tracking-widest font-medium"
              >
                {showAllHardware ? 'Show Less' : 'View All Hardware Components'}
                {showAllHardware ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section: GitHub */}
      <section id="github" className="min-h-[80vh] overflow-hidden bg-black relative flex flex-col items-center justify-center pt-32 pb-20 px-8 md:px-16 lg:px-24 text-center">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
            className="w-full h-full object-cover object-top opacity-85"
            style={{ transform: 'scale(1.15)', transformOrigin: 'top center' }}
          />
          <div className="absolute inset-0 vignette-overlay mix-blend-multiply" />
          <div className="absolute inset-0 capabilities-gradient" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
          <div className="liquid-glass h-24 w-24 rounded-full flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(255,255,255,0.05)] card-hover">
            <GitHubIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="font-heading italic text-5xl md:text-7xl lg:text-[6rem] leading-[0.85] tracking-[-0.03em] mb-8">
            Open Source.
          </h2>
          <p className="text-lg md:text-xl text-white/55 font-body font-light leading-relaxed tracking-wide mb-12">
            Every system is documented, version-controlled, and available for the community. Explore the repositories, fork the hardware designs, and contribute to the code.
          </p>
          <a href={config.githubLink} target="_blank" rel="noopener noreferrer" className="liquid-glass-strong btn-hover rounded-full px-8 py-4 flex items-center gap-3 text-[14px] uppercase tracking-widest font-medium">
            Explore Repositories <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Section: Current R&D */}
      <section id="research" className="min-h-screen overflow-hidden bg-black relative flex flex-col pt-32 pb-20 px-8 md:px-16 lg:px-24">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4"
            className="w-full h-full object-cover opacity-85"
            style={{ transform: 'scale(1.05)' }}
          />
          <div className="absolute inset-0 vignette-overlay mix-blend-multiply" />
          <div className="absolute inset-0 capabilities-gradient" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen max-w-[1400px] mx-auto w-full">
          <div className="mb-auto">
            <p className="text-[11px] font-body text-white/55 mb-8 uppercase tracking-[0.2em]">// Current R&D</p>
            <h2 className="font-heading italic text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.85] tracking-[-0.03em] max-w-3xl drop-shadow-2xl">
              Exploring The<br />Bleeding Edge.
            </h2>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchProjects.map(project => (
              <ProjectCard
                key={project.repo.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Contact */}
      <section id="contact" className="min-h-screen overflow-hidden bg-black relative flex flex-col pt-32 pb-32 px-8 md:px-16 lg:px-24 border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
            className="w-full h-full object-cover object-top opacity-85"
            style={{ transform: 'scale(1.15)', transformOrigin: 'top center' }}
          />
          <div className="absolute inset-0 vignette-overlay mix-blend-multiply" />
          <div className="absolute inset-0 capabilities-gradient" />
        </div>

        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <h2 className="font-heading italic text-5xl md:text-7xl lg:text-[6rem] leading-[0.85] tracking-[-0.03em] max-w-3xl mb-16">
            Connect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <a href={config.githubLink} target="_blank" rel="noopener noreferrer" className="liquid-glass card-hover rounded-[1.5rem] p-8 flex flex-col gap-6 group">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <GitHubIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-[14px] text-white font-medium tracking-wide mb-1">GitHub</div>
                <div className="text-[12px] text-white/55 tracking-wide">View repositories</div>
              </div>
            </a>

            <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="liquid-glass card-hover rounded-[1.5rem] p-8 flex flex-col gap-6 group">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <LinkedInIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[14px] text-white font-medium tracking-wide mb-1">LinkedIn</div>
                <div className="text-[12px] text-white/55 tracking-wide">Connect professionally</div>
              </div>
            </a>

            <a href={config.email.startsWith('mailto:') ? config.email : `mailto:${config.email}`} className="liquid-glass card-hover rounded-[1.5rem] p-8 flex flex-col gap-6 group">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <EmailIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[14px] text-white font-medium tracking-wide mb-1">Email</div>
                <div className="text-[12px] text-white/55 tracking-wide">Start a conversation</div>
              </div>
            </a>

            <a href={config.resume} target="_blank" rel="noopener noreferrer" className="liquid-glass card-hover rounded-[1.5rem] p-8 flex flex-col gap-6 group">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ResumeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-[14px] text-white font-medium tracking-wide mb-1">Resume</div>
                <div className="text-[12px] text-white/55 tracking-wide">View experience</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

