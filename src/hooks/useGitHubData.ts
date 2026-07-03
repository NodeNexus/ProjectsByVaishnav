import { useState, useEffect } from 'react';
import { fetchGitHubData } from '../services/github';
import type { ProjectData, GitHubStats } from '../services/github';

export function useGitHubData(username?: string) {
  const [data, setData] = useState<{ projects: ProjectData[], stats: GitHubStats } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    if (!username) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchGitHubData(username)
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
