import { useState, useEffect, useMemo } from 'react';
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
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import {
  ArrowUpRight,
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  ResumeIcon
} from './components/Icons';

const motionProps = {
  initial: { filter: 'blur(8px)', opacity: 0, y: 16 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const }
};

// Counter Component for animating numbers
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(hardwareData.map(h => h.category)))];

  const filteredHardware = hardwareData.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const researchProjects: ProjectData[] = useMemo(() => {
    return config.researchProjects?.length ? config.researchProjects.map(rp => ({
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
  }, [config.researchProjects]);

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
  }, [loading, data, researchProjects]);

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
    <div className="w-full bg-[#F8F9FA] text-[#121317] font-sans selection:bg-[#121317] selection:text-white min-h-screen relative">

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
      <nav className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.pushState(null, '', window.location.pathname);
          }}
          className="bg-white/85 backdrop-blur-md border border-[rgba(33,34,38,0.06)] h-11 px-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
        >
          <span className="font-sans font-[450] text-[16px] text-[#121317] tracking-tight">{config.name}</span>
        </div>

        <div className="hidden md:flex rounded-full bg-white/85 backdrop-blur-md border border-[rgba(33,34,38,0.06)] p-1.5 items-center gap-1">
          <div className="flex items-center gap-1 px-1">
            {["Systems", "Hardware", "GitHub", "Research", "Contact"].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="px-4 py-1.5 text-[14.5px] font-[450] text-[#45474D] hover:text-[#121317] hover:bg-[rgba(33,34,38,0.06)] rounded-full transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <a 
            href={config.githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#121317] text-white hover:bg-[#2F3034] rounded-full px-5 py-2 flex items-center gap-1.5 text-[14px] font-[450] transition-colors ml-1"
          >
            View GitHub <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="h-11 w-11 hidden md:block" />
      </nav>

      {/* Section 1: Hero */}
      <section className="min-h-screen overflow-hidden bg-[#F8F9FA] relative flex flex-col justify-between">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src={[
              "/raspberrypi5.mp4",
              "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4"
            ]}
            className="w-full h-full object-cover object-top opacity-60"
            style={{ transform: 'scale(1.05)' }}
          />
          <div className="absolute inset-0 vignette-overlay" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-36 pb-16 px-6 text-center max-w-[1200px] mx-auto">
          <motion.div
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 0.2 }}
            className="bg-white border border-[rgba(33,34,38,0.06)] rounded-full flex items-center gap-3 p-1.5 pr-4 mb-8 card-hover cursor-pointer"
          >
            <span className="bg-[#121317] text-white text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider">Latest</span>
            <span className="text-[13px] text-[#45474D] font-normal tracking-wide">{config.latestTagText || "Deploying embedded machine learning on custom silicon"}</span>
          </motion.div>

          <BlurText
            text={config.heroHeadline}
            className="text-5xl md:text-7xl lg:text-[80px] font-sans font-[450] text-[#121317] leading-[1.1] tracking-[-0.017em] max-w-[1000px] mx-auto"
          />

          <motion.p
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 0.4 }}
            className="text-[17.5px] text-[#45474D] max-w-2xl font-sans font-normal leading-[1.45] mt-6 tracking-[0.01em]"
          >
            {config.heroSubheadline}
          </motion.p>

          <motion.div
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 0.6 }}
            className="flex items-center gap-4 mt-10 flex-wrap justify-center"
          >
            <a 
              href="#systems" 
              className="bg-[#121317] text-white hover:bg-[#2F3034] rounded-full px-6 py-2.5 flex items-center gap-2 text-[14.5px] font-[450] transition-colors"
            >
              Explore Systems <ArrowUpRight className="w-4 h-4" />
            </a>
            <a 
              href={config.githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white border border-[rgba(33,34,38,0.06)] text-[#121317] hover:bg-[rgba(33,34,38,0.06)] rounded-full px-6 py-2.5 flex items-center gap-2 text-[14.5px] font-[450] transition-colors"
            >
              <GitHubIcon className="w-4 h-4" /> View Repositories
            </a>
          </motion.div>

          {/* Dynamic Hero Statistics */}
          <motion.div
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 0.8 }}
            className="flex gap-4 md:gap-6 mt-16 flex-wrap justify-center"
          >
            <div className="bg-white border border-[rgba(33,34,38,0.06)] card-hover p-6 w-[180px] md:w-[210px] rounded-[36px] text-left flex flex-col cursor-default">
              <span className="text-[12px] text-[#45474D] font-normal tracking-[0.013em] uppercase mb-3">Repositories</span>
              <span className="text-4xl md:text-5xl font-sans font-[450] text-[#121317] tracking-tight leading-none">
                {loading ? '...' : <AnimatedCounter value={data?.stats.repositories || 0} />}
              </span>
            </div>
            <div className="bg-white border border-[rgba(33,34,38,0.06)] card-hover p-6 w-[180px] md:w-[210px] rounded-[36px] text-left flex flex-col cursor-default">
              <span className="text-[12px] text-[#45474D] font-normal tracking-[0.013em] uppercase mb-3">Total Stars</span>
              <span className="text-4xl md:text-5xl font-sans font-[450] text-[#121317] tracking-tight leading-none">
                {loading ? '...' : <AnimatedCounter value={data?.stats.stars || 0} />}
              </span>
            </div>
            <div className="bg-white border border-[rgba(33,34,38,0.06)] card-hover p-6 w-[180px] md:w-[210px] rounded-[36px] text-left flex flex-col cursor-default">
              <span className="text-[12px] text-[#45474D] font-normal tracking-[0.013em] uppercase mb-3">Systems Built</span>
              <span className="text-4xl md:text-5xl font-sans font-[450] text-[#121317] tracking-tight leading-none">
                {loading ? '...' : <AnimatedCounter value={data?.stats.projectsCompleted || 0} />}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Technology Trust Bar */}
        <motion.div
          {...motionProps}
          transition={{ ...motionProps.transition, delay: 1.0 }}
          className="relative z-10 flex flex-col items-center gap-6 pb-16 px-6"
        >
          <div className="bg-white border border-[rgba(33,34,38,0.06)] rounded-full px-5 py-2 text-[12px] font-medium text-[#45474D] tracking-[0.1em] uppercase">
            Technologies powering these systems
          </div>
          <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
            {["Python", "C++", "React", "Next.js", "Docker", "Linux", "TensorFlow", "Raspberry Pi"].map(tech => (
              <span 
                key={tech} 
                className="bg-white border border-[rgba(33,34,38,0.06)] text-[#121317] rounded-full px-5 py-2 text-[14px] font-[450] hover:border-[rgba(33,34,38,0.18)] transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section: Featured Projects */}
      <section id="systems" className="relative flex flex-col py-[120px] px-6 md:px-16 lg:px-24">
        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <div className="mb-14">
            <h2 className="font-sans font-[450] text-3xl md:text-5xl lg:text-[42px] leading-[1.04] tracking-[-0.017em] text-[#121317] max-w-3xl mb-4">
              Featured Systems
            </h2>
            <p className="text-[17.5px] text-[#45474D] font-sans font-normal leading-[1.45] max-w-2xl">
              Every repository represents solving a real engineering problem through thoughtful hardware and software architecture.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] h-[440px] animate-pulse" />
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
      <section id="hardware" className="relative flex flex-col py-[120px] px-6 md:px-16 lg:px-24 border-t border-[rgba(33,34,38,0.06)]">
        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <div className="mb-14">
            <p className="text-[12px] font-sans text-[#45474D] mb-3 uppercase tracking-widest font-medium">// Hardware</p>
            <h2 className="font-sans font-[450] text-3xl md:text-5xl lg:text-[42px] leading-[1.04] tracking-[-0.017em] text-[#121317] max-w-3xl mb-4">
              Silicon and Circuits.
            </h2>
            <p className="text-[17.5px] text-[#45474D] font-sans font-normal leading-[1.45] max-w-2xl">
              Designing custom PCBs, integrating microcontrollers, and building the physical interfaces that bring software into the real world.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-[#45474D]" />
              </div>
              <input
                type="text"
                placeholder="Search hardware..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[rgba(33,34,38,0.12)] rounded-full py-2.5 pl-11 pr-4 text-[14.5px] text-[#121317] placeholder-[#45474D]/60 focus:outline-none focus:border-[#121317] transition-all font-sans"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowAllHardware(false);
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-[450] tracking-wide transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[#121317] text-white' 
                      : 'bg-white text-[#45474D] hover:text-[#121317] hover:bg-[rgba(33,34,38,0.06)] border border-[rgba(33,34,38,0.06)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(showAllHardware ? filteredHardware : filteredHardware.slice(0, 8)).map((comp) => (
              <div
                key={comp.id}
                className="bg-white border border-[rgba(33,34,38,0.06)] card-hover rounded-[36px] p-5 flex flex-col group overflow-hidden cursor-pointer hover:border-[rgba(33,34,38,0.18)] transition-all"
                onClick={() => setSelectedHardware(comp)}
              >
                <div className="rounded-[24px] overflow-hidden mb-4 relative aspect-square bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] p-3 flex items-center justify-center">
                  <img src={comp.image} alt={comp.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-sans font-[450] text-[18px] text-[#121317] tracking-tight mb-1">{comp.name}</h3>
                <p className="text-[13px] text-[#45474D] font-normal leading-relaxed line-clamp-2">
                  {comp.shortDesc}
                </p>
              </div>
            ))}
          </div>

          {filteredHardware.length > 8 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAllHardware(!showAllHardware)}
                className="bg-white border border-[rgba(33,34,38,0.06)] hover:bg-[rgba(33,34,38,0.06)] text-[#121317] rounded-full px-8 py-3 flex items-center gap-2 text-[14.5px] font-[450] transition-colors"
              >
                {showAllHardware ? 'Show Less' : `View All ${filteredHardware.length} Components`}
                {showAllHardware ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}

          {filteredHardware.length === 0 && (
            <div className="mt-12 text-center py-20 text-[#45474D] font-sans">
              No hardware components found matching your search criteria.
            </div>
          )}
        </div>
      </section>

      {/* Section: GitHub */}
      <section id="github" className="min-h-[75vh] overflow-hidden bg-[#F8F9FA] relative flex flex-col items-center justify-center py-[120px] px-6 md:px-16 lg:px-24 text-center border-t border-[rgba(33,34,38,0.06)]">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src={[
              "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4",
              "/raspberrypi5.mp4"
            ]}
            className="w-full h-full object-cover object-top opacity-55"
            style={{ transform: 'scale(1.05)', transformOrigin: 'top center' }}
          />
          <div className="absolute inset-0 vignette-overlay" />
          <div className="absolute inset-0 capabilities-gradient" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
          <div className="bg-white border border-[rgba(33,34,38,0.06)] h-20 w-20 rounded-full flex items-center justify-center mb-8 card-hover">
            <GitHubIcon className="w-10 h-10 text-[#121317]" />
          </div>
          <h2 className="font-sans font-[450] text-3xl md:text-5xl lg:text-[42px] leading-[1.04] tracking-[-0.017em] text-[#121317] mb-4">
            Open Source.
          </h2>
          <p className="text-[17.5px] text-[#45474D] font-sans font-normal leading-[1.45] tracking-wide mb-8">
            Every system is documented, version-controlled, and available for the community. Explore the repositories, fork the hardware designs, and contribute to the code.
          </p>
          <a 
            href={config.githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#121317] text-white hover:bg-[#2F3034] rounded-full px-8 py-3 flex items-center gap-2 text-[14.5px] font-[450] transition-colors"
          >
            Explore Repositories <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Section: Current R&D */}
      <section id="research" className="min-h-screen overflow-hidden bg-[#F8F9FA] relative flex flex-col py-[120px] px-6 md:px-16 lg:px-24 border-t border-[rgba(33,34,38,0.06)]">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src={[
              "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4",
              "/raspberrypi5.mp4"
            ]}
            className="w-full h-full object-cover opacity-55"
            style={{ transform: 'scale(1.05)' }}
          />
          <div className="absolute inset-0 vignette-overlay" />
          <div className="absolute inset-0 capabilities-gradient" />
        </div>

        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <div className="mb-14">
            <p className="text-[12px] font-sans text-[#45474D] mb-3 uppercase tracking-widest font-medium">// Current R&D</p>
            <h2 className="font-sans font-[450] text-3xl md:text-5xl lg:text-[42px] leading-[1.04] tracking-[-0.017em] text-[#121317] max-w-3xl mb-4">
              Exploring The Bleeding Edge.
            </h2>
            <p className="text-[17.5px] text-[#45474D] font-sans font-normal leading-[1.45] max-w-2xl">
              Ongoing research and experimentation pushing the boundaries of embedded edge computing and physical interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section id="contact" className="min-h-screen overflow-hidden bg-[#F8F9FA] relative flex flex-col py-[120px] px-6 md:px-16 lg:px-24 border-t border-[rgba(33,34,38,0.06)]">
        <div className="absolute inset-0 z-0">
          <FadingVideo
            src={[
              "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4",
              "/raspberrypi5.mp4"
            ]}
            className="w-full h-full object-cover object-top opacity-55"
            style={{ transform: 'scale(1.05)', transformOrigin: 'top center' }}
          />
          <div className="absolute inset-0 vignette-overlay" />
          <div className="absolute inset-0 capabilities-gradient" />
        </div>
        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <div className="mb-14">
            <h2 className="font-sans font-[450] text-3xl md:text-5xl lg:text-[42px] leading-[1.04] tracking-[-0.017em] text-[#121317] max-w-3xl mb-4">
              Connect
            </h2>
            <p className="text-[17.5px] text-[#45474D] font-sans font-normal leading-[1.45] max-w-2xl">
              Feel free to reach out for collaborations, discussions on embedded hardware, or engineering consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href={config.githubLink} target="_blank" rel="noopener noreferrer" className="bg-white border border-[rgba(33,34,38,0.06)] card-hover rounded-[36px] p-8 flex flex-col gap-6 group hover:border-[rgba(33,34,38,0.18)] transition-all">
              <div className="bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] w-12 h-12 rounded-full flex items-center justify-center text-[#121317] group-hover:bg-[#121317] group-hover:text-white transition-colors">
                <GitHubIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[16px] text-[#121317] font-medium tracking-tight mb-1">GitHub</div>
                <div className="text-[13px] text-[#45474D]">View repositories</div>
              </div>
            </a>

            <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white border border-[rgba(33,34,38,0.06)] card-hover rounded-[36px] p-8 flex flex-col gap-6 group hover:border-[rgba(33,34,38,0.18)] transition-all">
              <div className="bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] w-12 h-12 rounded-full flex items-center justify-center text-[#121317] group-hover:bg-[#121317] group-hover:text-white transition-colors">
                <LinkedInIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[16px] text-[#121317] font-medium tracking-tight mb-1">LinkedIn</div>
                <div className="text-[13px] text-[#45474D]">Connect professionally</div>
              </div>
            </a>

            <a href={config.email.startsWith('mailto:') ? config.email : `mailto:${config.email}`} className="bg-white border border-[rgba(33,34,38,0.06)] card-hover rounded-[36px] p-8 flex flex-col gap-6 group hover:border-[rgba(33,34,38,0.18)] transition-all">
              <div className="bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] w-12 h-12 rounded-full flex items-center justify-center text-[#121317] group-hover:bg-[#121317] group-hover:text-white transition-colors">
                <EmailIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[16px] text-[#121317] font-medium tracking-tight mb-1">Email</div>
                <div className="text-[13px] text-[#45474D]">Start a conversation</div>
              </div>
            </a>

            <a href={config.resume} target="_blank" rel="noopener noreferrer" className="bg-white border border-[rgba(33,34,38,0.06)] card-hover rounded-[36px] p-8 flex flex-col gap-6 group hover:border-[rgba(33,34,38,0.18)] transition-all">
              <div className="bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] w-12 h-12 rounded-full flex items-center justify-center text-[#121317] group-hover:bg-[#121317] group-hover:text-white transition-colors">
                <ResumeIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[16px] text-[#121317] font-medium tracking-tight mb-1">Resume</div>
                <div className="text-[13px] text-[#45474D]">View experience</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[rgba(33,34,38,0.06)] text-center text-[13px] text-[#45474D]">
        <p>© {new Date().getFullYear()} {config.name}. Built with Google Antigravity Design System.</p>
      </footer>
    </div>
  );
}
