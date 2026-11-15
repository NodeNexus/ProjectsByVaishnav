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
      initial={{ filter: 'blur(8px)', opacity: 0, y: 16 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] overflow-hidden flex flex-col cursor-pointer group h-[440px] hover:border-[rgba(33,34,38,0.18)] transition-all"
      onClick={onClick}
    >
      <div className="relative h-[220px] w-full overflow-hidden bg-[#F8F9FC] shrink-0 border-b border-[rgba(33,34,38,0.06)]">
        {coverUrl && (
          <img 
            src={coverUrl} 
            alt={title}
            onError={(e) => {
              const fallbackUrl = `https://opengraph.githubassets.com/1/${repo.html_url.split('/')[3] || 'NodeNexus'}/${repo.name}`;
              if (e.currentTarget.src !== fallbackUrl) {
                e.currentTarget.src = fallbackUrl;
              }
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      
      <div className="p-7 flex flex-col flex-1 bg-white">
        <h3 className="font-sans font-[450] text-[22px] md:text-[24px] tracking-[-0.004em] leading-snug mb-2 text-[#121317]">
          {title}
        </h3>
        <p className="text-[14.5px] text-[#45474D] font-normal leading-[1.45] mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[rgba(33,34,38,0.06)]">
          <span className="text-[12px] text-[#45474D] font-normal">
            Updated {formatDate(repo.updated_at)}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#121317] font-medium hover:text-[#45474D] transition-colors">
              Case Study &rarr;
            </span>
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="text-[#45474D] hover:text-[#121317] transition-colors flex items-center justify-center bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] rounded-full p-2"
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
