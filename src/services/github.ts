export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  default_branch: string;
}

export interface PortfolioMetadata {
  featured: boolean;
  title?: string;
  description?: string;
  hardware?: string[];
  software?: string[];
  demo?: string;
  order?: number;
  // File paths relative to repo root
  cover?: string;
  gallery?: string[];
  architecture?: string;
}

export interface ProjectData {
  repo: GitHubRepo;
  metadata: PortfolioMetadata | null;
  coverUrl: string | null;
  galleryUrls: string[];
  architectureUrl: string | null;
}

export interface GitHubStats {
  repositories: number;
  stars: number;
  languages: string[];
  projectsCompleted: number; // Based on repo count or a custom logic
}

const CACHE_KEY = 'github_portfolio_data';
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

export async function fetchGitHubData(username: string): Promise<{ projects: ProjectData[], stats: GitHubStats }> {
  if (!username) throw new Error("Username required");
  // Check cache
  const cacheKey = `${CACHE_KEY}_${username}`;
  const cachedStr = sessionStorage.getItem(cacheKey);
  if (cachedStr) {
    const cached = JSON.parse(cachedStr);
    if (Date.now() - cached.timestamp < CACHE_EXPIRY) {
      return cached.data;
    }
  }

  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
  if (!reposResponse.ok) {
    throw new Error('Failed to fetch repositories from GitHub');
  }
  
  const repos: GitHubRepo[] = await reposResponse.json();
  
  let totalStars = 0;
  const languagesSet = new Set<string>();
  
  const projects: ProjectData[] = [];

  // Fetch portfolio.json for each repo concurrently
  await Promise.all(repos.map(async (repo) => {
    totalStars += repo.stargazers_count;
    if (repo.language) {
      languagesSet.add(repo.language);
    }

    try {
      // Use raw.githubusercontent.com to fetch portfolio/portfolio.json
      const rawBaseUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}`;
      const portfolioUrl = `${rawBaseUrl}/portfolio/portfolio.json`;
      
      const response = await fetch(portfolioUrl);
      if (response.ok) {
        const metadata: PortfolioMetadata = await response.json();
        
        if (metadata.featured || repo.topics.includes('featured') || repo.stargazers_count > 10) {
          projects.push({
            repo,
            metadata,
            coverUrl: metadata.cover ? `${rawBaseUrl}/portfolio/${metadata.cover}` : null,
            galleryUrls: metadata.gallery ? metadata.gallery.map(img => `${rawBaseUrl}/portfolio/${img}`) : [],
            architectureUrl: metadata.architecture ? `${rawBaseUrl}/portfolio/${metadata.architecture}` : null,
          });
        }
      } else {
        // Fallback: If no portfolio.json but has significant stars or 'featured' topic, include it anyway
        if (repo.topics.includes('featured') || repo.stargazers_count > 10) {
          projects.push({
            repo,
            metadata: null,
            coverUrl: null,
            galleryUrls: [],
            architectureUrl: null,
          });
        }
      }
    } catch (e) {
      // Ignore errors for individual repos (e.g. repo is empty or network error on fetch)
    }
  }));

  // Sort projects by order or stars
  projects.sort((a, b) => {
    const orderA = a.metadata?.order ?? 999;
    const orderB = b.metadata?.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return b.repo.stargazers_count - a.repo.stargazers_count;
  });

  const data = {
    projects,
    stats: {
      repositories: repos.length,
      stars: totalStars,
      languages: Array.from(languagesSet),
      projectsCompleted: repos.length, 
    }
  };

  sessionStorage.setItem(CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    data
  }));

  return data;
}
