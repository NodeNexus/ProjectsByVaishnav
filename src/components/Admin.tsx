import { useState } from 'react';
import type { Config } from '../hooks/useConfig';

export function Admin({ config }: { config: Config }) {
  const [token, setToken] = useState(sessionStorage.getItem('github_pat') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [formData, setFormData] = useState<Config>(config);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Extract repo info from githubLink (assuming format https://github.com/Owner/Repo)
  // For the purpose of this admin panel, we assume the repo is NodeNexus/ProjectsByVaishnav or extract it
  // Let's extract it safely:
  const match = config.githubLink.match(/github\.com\/([^/]+)(?:\/([^/]+))?/);
  const repoOwner = match ? match[1] : 'NodeNexus';
  // If no repo name in link, fallback to default or prompt user. We know it's ProjectsByVaishnav from context,
  // but better to allow them to set the repo name if they want. Let's hardcode the repo name for this specific portfolio for now.
  const repoName = 'ProjectsByVaishnav';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      sessionStorage.setItem('github_pat', token);
      setIsLoggedIn(true);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. Fetch file to get current SHA
      const getUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/config.json`;
      const getRes = await fetch(getUrl, {
        headers: { Authorization: `token ${token}` }
      });

      if (!getRes.ok) {
        throw new Error('Failed to fetch config from GitHub. Check token permissions.');
      }

      const fileInfo = await getRes.json();
      const sha = fileInfo.sha;

      // 2. Put new file content
      // Encode string to base64 properly handling unicode if necessary (btoa works for ASCII which is fine here)
      const contentStr = JSON.stringify(formData, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(contentStr)));

      const putRes = await fetch(getUrl, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: "Update config via Admin Panel",
          content: base64Content,
          sha: sha
        })
      });

      if (!putRes.ok) {
        const errData = await putRes.json();
        throw new Error(errData.message || 'Failed to push changes to GitHub.');
      }

      setMessage('Successfully saved and pushed to GitHub! Render is deploying...');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof Config, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-body p-4">
        <form onSubmit={handleLogin} className="liquid-glass rounded-3xl p-10 max-w-md w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="font-heading italic text-4xl mb-2">Admin Access</h2>
            <p className="text-white/50 text-sm">Please authenticate to continue</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white/50">GitHub PAT (repo scope)</label>
            <input 
              type="password" 
              value={token}
              onChange={e => setToken(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
              required
            />
          </div>

          <button type="submit" className="bg-white text-black font-semibold rounded-xl py-3 mt-2 hover:bg-white/90 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 font-body">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-heading italic text-5xl">Dashboard</h1>
          <button 
            onClick={() => { sessionStorage.removeItem('github_pat'); setIsLoggedIn(false); }}
            className="text-xs uppercase tracking-widest text-white/50 hover:text-white"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-8 border ${message.startsWith('Error') ? 'border-red-500/50 bg-red-500/10' : 'border-green-500/50 bg-green-500/10'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-12">
          
          <div className="space-y-6">
            <h3 className="text-xl font-medium border-b border-white/10 pb-2">Hero Section</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Your Name (Logo)</label>
                <input type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/50">Headline</label>
              <input type="text" value={formData.heroHeadline} onChange={e => handleChange('heroHeadline', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/50">Sub-headline</label>
              <textarea value={formData.heroSubheadline} onChange={e => handleChange('heroSubheadline', e.target.value)} rows={3} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/50">Latest Tag Text</label>
              <input type="text" value={formData.latestTagText || ''} onChange={e => handleChange('latestTagText', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" placeholder="e.g. Deploying embedded machine learning..." />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium border-b border-white/10 pb-2">GitHub Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Username</label>
                <input type="text" value={formData.githubUsername} onChange={e => handleChange('githubUsername', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/50">GitHub URL</label>
                <input type="text" value={formData.githubLink} onChange={e => handleChange('githubLink', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium border-b border-white/10 pb-2">Social & Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/50">LinkedIn</label>
                <input type="text" value={formData.linkedin} onChange={e => handleChange('linkedin', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Email</label>
                <input type="text" value={formData.email} onChange={e => handleChange('email', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/50">X (Twitter)</label>
                <input type="text" value={formData.twitter} onChange={e => handleChange('twitter', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Resume (PDF Link)</label>
                <input type="text" value={formData.resume} onChange={e => handleChange('resume', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30" />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-white text-black font-semibold rounded-xl px-12 py-4 hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? 'Committing to GitHub...' : 'Save Changes'}
            </button>
            <p className="text-xs text-white/30 mt-4 max-w-xl leading-relaxed">
              * Note: Because this is a static site, saving changes will directly push a commit to your GitHub repository. Render will automatically detect this commit and rebuild your portfolio with the new settings.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
