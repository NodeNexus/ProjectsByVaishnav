import { useState } from 'react';
import type { Config, ResearchProjectConfig } from '../hooks/useConfig';
import { hardwareData as initialHardwareData, type HardwareDetails } from '../data/hardware_details';
import { ArrowUpRight } from './Icons';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function Admin({ config }: { config: Config }) {
  const [token, setToken] = useState(sessionStorage.getItem('github_pat') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [formData, setFormData] = useState<Config>(config);
  const [hardwareFormData, setHardwareFormData] = useState<HardwareDetails[]>(initialHardwareData);
  const [showAllHardware, setShowAllHardware] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const match = config.githubLink.match(/github\.com\/([^/]+)(?:\/([^/]+))?/);
  const repoOwner = match ? match[1] : 'NodeNexus';
  const repoName = 'ProjectsByVaishnav';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      sessionStorage.setItem('github_pat', token);
      setIsLoggedIn(true);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      const getUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/config.json`;
      const getRes = await fetch(getUrl, {
        headers: { Authorization: `token ${token}` }
      });

      if (!getRes.ok) throw new Error('Failed to fetch config from GitHub. Check token permissions.');

      const fileInfo = await getRes.json();
      const sha = fileInfo.sha;

      const configStr = JSON.stringify(formData, null, 2);
      const configBase64 = btoa(unescape(encodeURIComponent(configStr)));

      const putConfigRes = await fetch(getUrl, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: "Update config via WYSIWYG Admin Panel",
          content: configBase64,
          sha: sha
        })
      });

      if (!putConfigRes.ok) throw new Error('Failed to push config to GitHub.');

      // --- SAVE HARDWARE ---
      const hwGetUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/src/data/hardware_details.ts`;
      const hwGetRes = await fetch(hwGetUrl, {
        headers: { Authorization: `token ${token}` }
      });
      if (!hwGetRes.ok) throw new Error('Failed to fetch hardware_details.ts from GitHub.');
      const hwFileInfo = await hwGetRes.json();
      const hwSha = hwFileInfo.sha;

      const tsInterfaces = `export interface HardwarePin {
  name: string;
  desc: string;
}

export interface WiringMapping {
  sensorPin: string;
  boardPin: string;
}

export interface BoardWiring {
  boardName: string;
  boardImage: string;
  mappings: WiringMapping[];
  boardPins: string[];
}

export interface HardwareDetails {
  id: string;
  name: string;
  image: string;
  shortDesc: string;
  longDesc: string;
  whatItDoes: string;
  pins: HardwarePin[];
  wiring?: Record<'esp32' | 'arduino', BoardWiring>;
}

export const hardwareData: HardwareDetails[] = `;

      const hwStr = tsInterfaces + JSON.stringify(hardwareFormData, null, 2) + ";\n";
      const hwBase64 = btoa(unescape(encodeURIComponent(hwStr)));

      const putHwRes = await fetch(hwGetUrl, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: "Update hardware details via WYSIWYG Admin Panel",
          content: hwBase64,
          sha: hwSha
        })
      });

      if (!putHwRes.ok) throw new Error('Failed to push hardware to GitHub.');

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

  const handleProjectChange = (index: number, field: keyof ResearchProjectConfig, value: any) => {
    setFormData(prev => {
      const newProjects = [...(prev.researchProjects || [])];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, researchProjects: newProjects };
    });
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      researchProjects: [
        ...(prev.researchProjects || []),
        { id: Date.now(), title: 'New Project', description: 'Description goes here', coverUrl: '', githubUrl: '', hardware: [], software: [] }
      ]
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => {
      const newProjects = [...(prev.researchProjects || [])];
      newProjects.splice(index, 1);
      return { ...prev, researchProjects: newProjects };
    });
  };

  const handleHardwareChange = (index: number, field: keyof HardwareDetails, value: any) => {
    setHardwareFormData(prev => {
      const newHardware = [...prev];
      newHardware[index] = { ...newHardware[index], [field]: value };
      return newHardware;
    });
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>, isHardware: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setMessage(`Uploading ${file.name}...`);
      
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64Data = (ev.target?.result as string).split(',')[1];
        const prefix = isHardware ? 'hardware' : 'project';
        const folder = isHardware ? 'hardware' : 'projects';
        const filename = `${prefix}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = `public/images/${folder}/${filename}`;
        
        const putUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
        
        const res = await fetch(putUrl, {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Upload image ${filename} via Admin Panel`,
            content: base64Data
          })
        });
        
        if (!res.ok) throw new Error('Failed to upload image.');
        
        if (isHardware) {
          handleHardwareChange(index, 'image', `/images/${folder}/${filename}`);
        } else {
          handleProjectChange(index, 'coverUrl', `/images/${folder}/${filename}`);
        }
        setMessage(`Successfully uploaded ${file.name}!`);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-body p-4 relative overflow-hidden">
        <form onSubmit={handleLogin} className="relative z-10 liquid-glass rounded-3xl p-10 max-w-md w-full flex flex-col gap-6">
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
    <div className="w-full bg-black text-white font-body selection:bg-white selection:text-black min-h-screen relative">
      
      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-2">
        {message && (
          <div className={`p-4 rounded-xl text-sm max-w-xs shadow-2xl backdrop-blur-md border ${message.startsWith('Error') ? 'border-red-500/50 bg-red-500/20' : 'border-green-500/50 bg-green-500/20'}`}>
            {message}
          </div>
        )}
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-white text-black font-semibold rounded-full px-8 py-4 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
        >
          {loading ? 'Deploying...' : 'Save & Deploy'}
        </button>
      </div>

      {/* Navbar (Replica) */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-24">
        <div className="liquid-glass-extreme h-12 px-6 rounded-full flex items-center justify-center relative overflow-hidden">
          <input 
            type="text"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            className="font-heading font-medium italic text-xl mt-1 z-10 bg-transparent outline-none w-32 text-center text-white"
          />
        </div>
        <button 
          onClick={() => { sessionStorage.removeItem('github_pat'); setIsLoggedIn(false); }}
          className="liquid-glass-extreme rounded-full px-5 py-2 text-[11px] uppercase tracking-widest text-white/50 hover:text-white"
        >
          Logout
        </button>
      </nav>

      {/* Hero Section (Replica) */}
      <section className="h-screen bg-black relative flex flex-col pt-32 px-4">
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          
          <div className="liquid-glass rounded-full flex items-center gap-4 p-1.5 pr-5 mb-10 w-full max-w-md mx-auto">
            <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">Latest</span>
            <input 
              type="text"
              value={formData.latestTagText || ''}
              onChange={e => handleChange('latestTagText', e.target.value)}
              className="text-[13px] text-white/75 font-medium tracking-wide bg-transparent outline-none flex-1 border-b border-white/20 focus:border-white transition-colors pb-0.5"
            />
          </div>

          <textarea
            value={formData.heroHeadline}
            onChange={e => handleChange('heroHeadline', e.target.value)}
            rows={2}
            className="text-6xl md:text-7xl lg:text-[6.5rem] font-heading italic text-white leading-[0.85] tracking-[-0.04em] w-full max-w-[1000px] mx-auto text-center bg-transparent outline-none resize-none overflow-hidden"
          />

          <textarea
            value={formData.heroSubheadline}
            onChange={e => handleChange('heroSubheadline', e.target.value)}
            rows={3}
            className="text-base md:text-lg text-white/75 w-full max-w-2xl font-body font-light leading-relaxed mt-10 tracking-wide text-center bg-transparent outline-none resize-none border-b border-white/20 focus:border-white transition-colors pb-2 mx-auto"
          />

          <div className="flex items-center gap-8 mt-12">
            <div className="liquid-glass-strong rounded-full px-6 py-3.5 flex items-center gap-2 text-[13px] uppercase tracking-widest font-medium opacity-50 cursor-not-allowed">
              Explore Systems <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section (Replica) */}
      <section className="min-h-screen bg-black relative flex flex-col pt-32 pb-20 px-8 md:px-16 lg:px-24 border-t border-white/10">
        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <h2 className="font-heading italic text-5xl md:text-6xl mb-12 flex items-center gap-4">
            <span className="text-white/30">/01</span> 
            Featured Systems
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(formData.researchProjects || []).map((project, idx) => (
              <div key={project.id} className="liquid-glass rounded-[1.75rem] overflow-hidden flex flex-col h-[420px] relative group border border-transparent hover:border-white/20 transition-colors">
                
                <button 
                  onClick={() => removeProject(idx)}
                  className="absolute top-4 right-4 z-50 bg-red-500/80 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-red-500"
                >
                  Delete
                </button>

                <div className="relative h-[220px] w-full overflow-hidden bg-white/5 shrink-0 border-b border-white/10 group/img">
                  {project.coverUrl && (
                    <img src={project.coverUrl} className="w-full h-full object-cover" alt="Cover" />
                  )}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <label className="bg-white text-black text-xs uppercase tracking-widest px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(idx, e, false)} />
                    </label>
                  </div>
                </div>
                
                <div className="p-7 flex flex-col flex-1 bg-black/40">
                  <input 
                    type="text"
                    value={project.title}
                    onChange={e => handleProjectChange(idx, 'title', e.target.value)}
                    className="font-heading italic text-[28px] md:text-[32px] tracking-[-0.02em] leading-none mb-3 text-white bg-transparent outline-none w-full border-b border-transparent focus:border-white/30 pb-1"
                  />
                  <textarea 
                    value={project.description}
                    onChange={e => handleProjectChange(idx, 'description', e.target.value)}
                    className="text-[13px] text-white/60 font-body font-light leading-relaxed flex-1 bg-transparent outline-none resize-none border-b border-transparent focus:border-white/30"
                  />
                </div>
              </div>
            ))}
            
            <div 
              onClick={addProject}
              className="liquid-glass rounded-[1.75rem] flex flex-col items-center justify-center h-[420px] cursor-pointer hover:bg-white/10 transition-colors border border-dashed border-white/20 hover:border-white/50"
            >
              <div className="text-4xl text-white/30 mb-2">+</div>
              <span className="text-[11px] uppercase tracking-widest text-white/50">Add New Project</span>
            </div>

          </div>
        </div>
      </section>

      {/* Hardware Section (Replica) */}
      <section className="min-h-screen relative flex flex-col pt-32 pb-20 px-8 md:px-16 lg:px-24">
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
            {(showAllHardware ? hardwareFormData : hardwareFormData.slice(0, 8)).map((comp, idx) => (
              <div 
                key={comp.id} 
                className="liquid-glass rounded-[1.25rem] p-4 flex flex-col group overflow-hidden border border-transparent hover:border-white/20 transition-colors"
              >
                <div className="rounded-[1rem] overflow-hidden mb-4 relative aspect-square group/img">
                  <img src={comp.image} alt={comp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <label className="bg-white text-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full cursor-pointer hover:scale-105 transition-transform">
                      Upload
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(idx, e, true)} />
                    </label>
                  </div>
                </div>
                <input 
                  type="text"
                  value={comp.name}
                  onChange={e => handleHardwareChange(idx, 'name', e.target.value)}
                  className="font-heading italic text-2xl tracking-tight mb-1 bg-transparent outline-none w-full border-b border-transparent focus:border-white/30 pb-0.5 text-white"
                />
                <textarea 
                  value={comp.shortDesc}
                  onChange={e => handleHardwareChange(idx, 'shortDesc', e.target.value)}
                  rows={2}
                  className="text-[12px] text-white/55 font-body tracking-wide bg-transparent outline-none resize-none border-b border-transparent focus:border-white/30"
                />
              </div>
            ))}
          </div>

          {hardwareFormData.length > 8 && (
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

    </div>
  );
}
