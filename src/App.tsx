import { Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import { Admin } from './components/Admin';
import { useConfig } from './hooks/useConfig';

export default function App() {
  const config = useConfig();

  if (!config) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white/50 font-mono text-sm tracking-widest">
        INITIALIZING SYSTEM...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Portfolio config={config} />} />
      <Route path="/admin" element={<Admin config={config} />} />
    </Routes>
  );
}
