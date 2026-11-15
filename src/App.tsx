import { Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import { Admin } from './components/Admin';
import { useConfig } from './hooks/useConfig';

export default function App() {
  const config = useConfig();

  if (!config) {
    return (
      <div className="h-screen bg-[#F8F9FA] flex items-center justify-center text-[#45474D] font-sans text-sm tracking-widest uppercase">
        Initializing System...
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
