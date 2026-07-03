import { motion } from 'framer-motion';
import type { ProjectData } from '../services/github';

interface ProjectCardProps {
  project: ProjectData;
  onClick: () => void;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { repo, metadata, coverUrl } = project;
  const title = metadata?.title || repo.name.replace(/-/g, " ");
  const description = metadata?.description || repo.description || 'System specifications unavailable.';

  return (
    <motion.div 
      initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' as const }}
      className="liquid-glass card-hover rounded-[1.75rem] overflow-hidden flex flex-col cursor-pointer group h-[420px]"
      onClick={onClick}
    >
      <div className="relative h-[220px] w-full overflow-hidden bg-white/5 shrink-0 border-b border-white/10">
        {coverUrl && (
          <img 
            src={coverUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-7 flex flex-col flex-1 bg-black/40 backdrop-blur-md">
        <h3 className="font-heading italic text-[28px] md:text-[32px] tracking-[-0.02em] leading-none mb-3 text-white">{title}</h3>
        <p className="text-[13px] text-white/60 font-body font-light leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-[11px] text-white/40 font-body">
            Updated {formatDate(repo.updated_at)}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/90 font-medium font-body hover:text-white transition-colors">
              Case Study &rarr;
            </span>
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="text-white/60 hover:text-white transition-colors flex items-center justify-center bg-white/5 rounded-full p-2"
              title="View on GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
