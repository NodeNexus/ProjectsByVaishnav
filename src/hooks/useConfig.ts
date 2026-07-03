import { useState, useEffect } from 'react';

export interface Config {
  name: string;
  heroHeadline: string;
  heroSubheadline: string;
  githubUsername: string;
  githubLink: string;
  linkedin: string;
  email: string;
  resume: string;
  twitter: string;
}

export function useConfig() {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch('/config.json?v=' + Date.now())
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config", err));
  }, []);

  return config;
}
