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
  boardPins: string[];
  mappings: WiringMapping[];
}

export interface HardwareDetails {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  whatItDoes: string;
  image: string;
  pins: HardwarePin[];
  wiring?: {
    esp32?: BoardWiring;
    arduino?: BoardWiring;
  };
}

export const hardwareData: HardwareDetails[] = `;

      const hardwareStr = tsInterfaces + JSON.stringify(hardwareFormData, null, 2) + ';\n';
      const hardwareBase64 = btoa(unescape(encodeURIComponent(hardwareStr)));

      const putHwRes = await fetch(hwGetUrl, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: "Update hardware_details.ts via Admin Panel",
          content: hardwareBase64,
          sha: hwSha
        })
      });

      if (!putHwRes.ok) throw new Error('Failed to push hardware_details.ts to GitHub.');

      setMessage('Changes saved and deployed to GitHub successfully!');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof Config, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleProjectChange = (index: number, key: keyof ResearchProjectConfig, value: any) => {
    const updated = [...(formData.researchProjects || [])];
    updated[index] = { ...updated[index], [key]: value };
    handleChange('researchProjects', updated);
  };

  const addProject = () => {
    const newProj: ResearchProjectConfig = {
      id: Date.now(),
      title: 'New System Project',
      description: 'System specifications and architecture description.',
      coverUrl: '/images/hero.png',
      githubUrl: '#',
      hardware: [],
      software: []
    };
    handleChange('researchProjects', [...(formData.researchProjects || []), newProj]);
  };

  const removeProject = (index: number) => {
    const updated = [...(formData.researchProjects || [])];
    updated.splice(index, 1);
    handleChange('researchProjects', updated);
  };

  const handleHardwareChange = (index: number, key: keyof HardwareDetails, value: any) => {
    setHardwareFormData(prev => {
      const newHardware = [...prev];
      newHardware[index] = { ...newHardware[index], [key]: value };
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
        const result = ev.target?.result;
        if (typeof result !== 'string') return;
        const base64Data = result.split(',')[1];
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
      <div className="min-h-screen bg-[#F8F9FA] text-[#121317] flex items-center justify-center font-sans p-6 relative">
        <form onSubmit={handleLogin} className="relative z-10 bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-10 max-w-md w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="font-sans font-[450] text-3xl mb-2 text-[#121317]">Admin Access</h2>
            <p className="text-[#45474D] text-sm font-normal">Please authenticate to continue</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] uppercase tracking-wider text-[#45474D] font-medium">GitHub PAT (repo scope)</label>
            <input 
              type="password" 
              value={token}
              onChange={e => setToken(e.target.value)}
              className="bg-[#F8F9FC] border border-[rgba(33,34,38,0.12)] rounded-full px-5 py-2.5 text-sm text-[#121317] focus:outline-none focus:border-[#121317] transition-colors"
              required
            />
          </div>
          <button type="submit" className="bg-[#121317] text-white font-[450] rounded-full py-3 mt-2 hover:bg-[#2F3034] transition-colors text-sm">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8F9FA] text-[#121317] font-sans selection:bg-[#121317] selection:text-white min-h-screen relative">
      
      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-2">
        {message && (
          <div className={`p-4 rounded-2xl text-sm max-w-xs border ${message.startsWith('Error') ? 'border-red-500/20 bg-red-50 text-red-700' : 'border-green-500/20 bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-[#121317] text-white font-[450] rounded-full px-8 py-3.5 hover:bg-[#2F3034] transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          {loading ? 'Deploying...' : 'Save & Deploy'}
        </button>
      </div>

      {/* Navbar (Replica) */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="bg-white/85 backdrop-blur-md border border-[rgba(33,34,38,0.06)] h-11 px-6 rounded-full flex items-center justify-center">
          <input 
            type="text"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            className="font-sans font-[450] text-[16px] bg-transparent outline-none w-40 text-center text-[#121317]"
          />
        </div>
        <button 
          onClick={() => { sessionStorage.removeItem('github_pat'); setIsLoggedIn(false); }}
          className="bg-white/85 backdrop-blur-md border border-[rgba(33,34,38,0.06)] rounded-full px-5 py-2 text-[12px] uppercase tracking-wider text-[#45474D] hover:text-[#121317] transition-colors"
        >
          Logout
        </button>
      </nav>

      {/* Hero Section (Replica) */}
      <section className="min-h-screen bg-[#F8F9FA] relative flex flex-col justify-center pt-32 pb-16 px-6">
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[1000px] mx-auto w-full">
          
          <div className="bg-white border border-[rgba(33,34,38,0.06)] rounded-full flex items-center gap-3 p-1.5 pr-4 mb-8 w-full max-w-md mx-auto">
            <span className="bg-[#121317] text-white text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider">Latest</span>
            <input 
              type="text"
              value={formData.latestTagText || ''}
              onChange={e => handleChange('latestTagText', e.target.value)}
              className="text-[13px] text-[#45474D] font-normal tracking-wide bg-transparent outline-none flex-1 border-b border-[rgba(33,34,38,0.12)] focus:border-[#121317] transition-colors pb-0.5"
            />
          </div>

          <textarea
            value={formData.heroHeadline}
            onChange={e => handleChange('heroHeadline', e.target.value)}
            rows={2}
            className="text-4xl md:text-6xl lg:text-[72px] font-sans font-[450] text-[#121317] leading-[1.1] tracking-[-0.017em] w-full max-w-[1000px] mx-auto text-center bg-transparent outline-none resize-none border-b border-transparent focus:border-[rgba(33,34,38,0.2)] pb-2"
          />

          <textarea
            value={formData.heroSubheadline}
            onChange={e => handleChange('heroSubheadline', e.target.value)}
            rows={2}
            className="text-[17.5px] text-[#45474D] w-full max-w-2xl font-sans font-normal leading-[1.45] mt-6 tracking-wide text-center bg-transparent outline-none resize-none border-b border-[rgba(33,34,38,0.12)] focus:border-[#121317] transition-colors pb-2 mx-auto"
          />

          <div className="flex items-center gap-4 mt-8">
            <div className="bg-white border border-[rgba(33,34,38,0.06)] rounded-full px-6 py-2.5 flex items-center gap-2 text-[14px] font-[450] text-[#45474D] opacity-60 cursor-not-allowed">
              Explore Systems <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section (Replica) */}
      <section className="relative flex flex-col py-[120px] px-6 md:px-16 lg:px-24 border-t border-[rgba(33,34,38,0.06)]">
        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <h2 className="font-sans font-[450] text-3xl md:text-5xl lg:text-[42px] leading-[1.04] tracking-[-0.017em] text-[#121317] mb-12">
            Featured Systems
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(formData.researchProjects || []).map((project, idx) => (
              <div key={project.id} className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] overflow-hidden flex flex-col h-[440px] relative group hover:border-[rgba(33,34,38,0.18)] transition-all">
                
                <button 
                  onClick={() => removeProject(idx)}
                  className="absolute top-4 right-4 z-50 bg-red-600 text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>

                <div className="relative h-[220px] w-full overflow-hidden bg-[#F8F9FC] shrink-0 border-b border-[rgba(33,34,38,0.06)] group/img">
                  {project.coverUrl && (
                    <img src={project.coverUrl} className="w-full h-full object-cover" alt="Cover" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <label className="bg-white text-[#121317] text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full cursor-pointer hover:bg-white/90 transition-all">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(idx, e, false)} />
                    </label>
                  </div>
                </div>
                
                <div className="p-7 flex flex-col flex-1 bg-white">
                  <input 
                    type="text"
                    value={project.title}
                    onChange={e => handleProjectChange(idx, 'title', e.target.value)}
                    className="font-sans font-[450] text-[20px] md:text-[22px] tracking-[-0.004em] leading-snug mb-2 text-[#121317] bg-transparent outline-none w-full border-b border-transparent focus:border-[rgba(33,34,38,0.2)] pb-1"
                  />
                  <textarea 
                    value={project.description}
                    onChange={e => handleProjectChange(idx, 'description', e.target.value)}
                    className="text-[14px] text-[#45474D] font-normal leading-[1.45] flex-1 bg-transparent outline-none resize-none border-b border-transparent focus:border-[rgba(33,34,38,0.2)]"
                  />
                </div>
              </div>
            ))}
            
            <div 
              onClick={addProject}
              className="bg-[#F8F9FC] rounded-[36px] flex flex-col items-center justify-center h-[440px] cursor-pointer hover:bg-white transition-all border border-dashed border-[rgba(33,34,38,0.12)] hover:border-[rgba(33,34,38,0.3)]"
            >
              <div className="text-4xl text-[#45474D] mb-2 font-light">+</div>
              <span className="text-[12px] uppercase tracking-wider text-[#45474D] font-medium">Add New Project</span>
            </div>

          </div>
        </div>
      </section>

      {/* Hardware Section (Replica) */}
      <section className="relative flex flex-col py-[120px] px-6 md:px-16 lg:px-24 border-t border-[rgba(33,34,38,0.06)]">
        <div className="relative z-10 flex flex-col max-w-[1400px] mx-auto w-full">
          <div className="mb-14">
            <p className="text-[12px] font-sans text-[#45474D] mb-3 uppercase tracking-widest font-medium">// Hardware</p>
            <h2 className="font-sans font-[450] text-3xl md:text-5xl lg:text-[42px] leading-[1.04] tracking-[-0.017em] text-[#121317] max-w-3xl mb-4">
              Silicon and Circuits.
            </h2>
            <p className="text-[17.5px] text-[#45474D] font-normal leading-[1.45] max-w-2xl">
              Designing custom PCBs, integrating microcontrollers, and building the physical interfaces that bring software into the real world.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(showAllHardware ? hardwareFormData : hardwareFormData.slice(0, 8)).map((comp, idx) => (
              <div 
                key={comp.id} 
                className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-5 flex flex-col group overflow-hidden hover:border-[rgba(33,34,38,0.18)] transition-all"
              >
                <div className="rounded-[24px] overflow-hidden mb-4 relative aspect-square group/img bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] p-3 flex items-center justify-center">
                  <img src={comp.image} alt={comp.name} className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity rounded-[24px]">
                    <label className="bg-white text-[#121317] text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/90 transition-all">
                      Upload
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(idx, e, true)} />
                    </label>
                  </div>
                </div>
                <input 
                  type="text"
                  value={comp.name}
                  onChange={e => handleHardwareChange(idx, 'name', e.target.value)}
                  className="font-sans font-[450] text-[17px] tracking-tight mb-1 bg-transparent outline-none w-full border-b border-transparent focus:border-[rgba(33,34,38,0.2)] pb-0.5 text-[#121317]"
                />
                <textarea 
                  value={comp.shortDesc}
                  onChange={e => handleHardwareChange(idx, 'shortDesc', e.target.value)}
                  rows={2}
                  className="text-[13px] text-[#45474D] font-normal leading-relaxed bg-transparent outline-none resize-none border-b border-transparent focus:border-[rgba(33,34,38,0.2)]"
                />
              </div>
            ))}
          </div>

          {hardwareFormData.length > 8 && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setShowAllHardware(!showAllHardware)}
                className="bg-white border border-[rgba(33,34,38,0.06)] hover:bg-[rgba(33,34,38,0.06)] text-[#121317] rounded-full px-8 py-3 flex items-center gap-2 text-[14.5px] font-[450] transition-colors"
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
