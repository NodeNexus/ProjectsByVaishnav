import { motion } from 'framer-motion';
import type { ProjectData } from '../services/github';
import { ArrowUpRight } from './Icons';

interface ProjectCardProps {
  project: ProjectData;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { repo, metadata, coverUrl } = project;
  const title = metadata?.title || repo.name;
  const description = metadata?.description || repo.description || 'System specifications unavailable.';
  
  const tags = [...(metadata?.hardware || []), ...(metadata?.software || repo.topics || [])].slice(0, 4);

  return (
    <motion.div 
      initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' as const }}
      className="liquid-glass card-hover rounded-[1.75rem] overflow-hidden flex flex-col cursor-pointer group h-full"
      onClick={onClick}
    >
      <div className="relative h-[240px] w-full overflow-hidden bg-white/5">
        {coverUrl ? (
          <img 
            src={coverUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 font-heading text-2xl italic">
            {title}
          </div>
        )}
        <div className="absolute top-4 right-4 liquid-glass rounded-full px-3 py-1 text-[10px] font-medium tracking-widest uppercase flex items-center gap-1">
          <span className="text-yellow-400">★</span> {repo.stargazers_count}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-0.02em] leading-none mb-3">{title}</h3>
        <p className="text-[14px] text-white/55 font-body font-light leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[9px] text-white/75 font-body tracking-wider uppercase whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto flex items-center gap-4">
          <button className="btn-hover bg-white text-black rounded-full px-5 py-2 flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold font-body">
            View Architecture
          </button>
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={(e) => e.stopPropagation()}
            className="text-[11px] uppercase tracking-widest font-medium text-white/75 nav-link flex items-center gap-1"
          >
            GitHub <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
