import { useState, useEffect } from 'react';
import { fetchGitHubData } from '../services/github';
import type { ProjectData, GitHubStats } from '../services/github';

export function useGitHubData() {
  const [data, setData] = useState<{ projects: ProjectData[], stats: GitHubStats } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    fetchGitHubData()
      .then(res => {
        if (mounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message || 'Failed to load GitHub data');
          setLoading(false);
        }
      });
      
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
