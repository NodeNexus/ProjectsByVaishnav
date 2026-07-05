import { useState } from 'react';
import { motion } from 'framer-motion';
import type { HardwareDetails, BoardWiring } from '../data/hardware_details';
import { X, Cpu, Zap, Activity } from 'lucide-react';

interface HardwareDetailsProps {
  component: HardwareDetails;
  onClose: () => void;
}

const WireColors = ['#ff0055', '#00ffaa', '#00aaff', '#ffaa00', '#aa00ff', '#ffff00'];

export function HardwareDetailsView({ component, onClose }: HardwareDetailsProps) {
  const [selectedBoard, setSelectedBoard] = useState<'esp32' | 'arduino' | null>(null);

  const wiring: BoardWiring | undefined = selectedBoard && component.wiring ? component.wiring[selectedBoard] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-full bg-black border border-white/10 rounded-3xl overflow-y-auto custom-scrollbar flex flex-col shadow-2xl shadow-black/50">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 capabilities-gradient opacity-30" />
          
          <div className="w-full md:w-1/3 shrink-0 relative z-10 flex items-center justify-center bg-white/5 rounded-3xl p-8 border border-white/5">
            <img 
              src={component.image} 
              alt={component.name}
              className="w-full max-w-[200px] object-contain drop-shadow-2xl"
            />
          </div>

          <div className="flex-1 relative z-10 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-widest text-white/70 mb-4 w-fit">
              Component Details
            </div>
            <h1 className="text-4xl md:text-5xl font-heading italic mb-4">{component.name}</h1>
            <p className="text-xl text-white/70 font-light mb-6">{component.shortDesc}</p>
            <p className="text-sm text-white/50 leading-relaxed mb-6">{component.longDesc}</p>
            
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-4 items-start">
              <Activity className="w-5 h-5 text-accent mt-1 shrink-0" />
              <div>
                <h4 className="text-sm font-bold mb-1">What it does</h4>
                <p className="text-sm text-white/60 leading-relaxed">{component.whatItDoes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Pins Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-heading italic flex items-center gap-3">
              <Zap className="w-5 h-5 text-accent" />
              Pin Configuration
            </h3>
            <div className="space-y-3">
              {component.pins.map((pin, i) => (
                <div key={i} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <span className="font-bold text-accent text-sm mb-1">{pin.name}</span>
                  <span className="text-xs text-white/50 leading-relaxed">{pin.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Wiring Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <h3 className="text-xl font-heading italic flex items-center gap-3">
                <Cpu className="w-5 h-5 text-accent" />
                Wiring Visualizer
              </h3>
              
              {component.wiring ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedBoard('esp32')}
                    className={`px-4 py-2 text-xs uppercase tracking-widest rounded-xl transition-all ${selectedBoard === 'esp32' ? 'bg-accent text-black font-bold' : 'bg-white/10 hover:bg-white/20 text-white/70'}`}
                  >
                    ESP32
                  </button>
                  <button 
                    onClick={() => setSelectedBoard('arduino')}
                    className={`px-4 py-2 text-xs uppercase tracking-widest rounded-xl transition-all ${selectedBoard === 'arduino' ? 'bg-accent text-black font-bold' : 'bg-white/10 hover:bg-white/20 text-white/70'}`}
                  >
                    Arduino Uno
                  </button>
                </div>
              ) : (
                <span className="text-xs uppercase tracking-widest text-white/40">No interactive wiring available</span>
              )}
            </div>

            {selectedBoard && wiring ? (
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 min-h-[400px] flex flex-col">
                <div className="flex justify-between items-center mb-8 px-4">
                  <div className="flex items-center gap-4">
                    <img src={wiring.boardImage} alt={wiring.boardName} className="w-12 h-12 object-contain" />
                    <span className="font-bold text-sm uppercase tracking-widest">{wiring.boardName}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm uppercase tracking-widest">{component.name}</span>
                    <img src={component.image} alt={component.name} className="w-12 h-12 object-contain" />
                  </div>
                </div>

                <div className="flex-1 flex relative">
                  {/* Left Column (Board Pins) */}
                  <div className="w-32 flex flex-col justify-around relative z-10">
                    {wiring.boardPins.map((pin, i) => (
                      <div key={`board-${i}`} className="h-10 flex items-center justify-start">
                        <div className="px-3 py-1.5 bg-black border border-white/20 rounded-lg text-xs font-mono text-white/80 w-full text-center">
                          {pin}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SVG Wires Layer */}
                  <div className="flex-1 relative">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                      {wiring.mappings.map((mapping, idx) => {
                        const boardIndex = wiring.boardPins.indexOf(mapping.boardPin);
                        const sensorIndex = component.pins.findIndex(p => p.name === mapping.sensorPin);
                        
                        if (boardIndex === -1 || sensorIndex === -1) return null;

                        const y1 = `calc(${(boardIndex + 0.5) * (100 / wiring.boardPins.length)}%)`;
                        const y2 = `calc(${(sensorIndex + 0.5) * (100 / component.pins.length)}%)`;
                        const color = WireColors[idx % WireColors.length];

                        return (
                          <g key={`wire-${idx}`}>
                            {/* Inner glowing wire */}
                            <path 
                              d={`M 0,${y1} C 50%,${y1} 50%,${y2} 100%,${y2}`}
                              fill="none"
                              stroke={color}
                              strokeWidth="3"
                              strokeLinecap="round"
                              className="animate-pulse"
                              style={{ animationDuration: `${2 + idx * 0.5}s` }}
                            />
                            {/* Outer glow effect */}
                            <path 
                              d={`M 0,${y1} C 50%,${y1} 50%,${y2} 100%,${y2}`}
                              fill="none"
                              stroke={color}
                              strokeWidth="8"
                              strokeLinecap="round"
                              opacity="0.3"
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Right Column (Sensor Pins) */}
                  <div className="w-32 flex flex-col justify-around relative z-10">
                    {component.pins.map((pin, i) => (
                      <div key={`sensor-${i}`} className="h-10 flex items-center justify-end">
                        <div className="px-3 py-1.5 bg-black border border-white/20 rounded-lg text-xs font-mono text-white/80 w-full text-center">
                          {pin.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[400px] border border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center text-white/30">
                <Cpu className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-sm uppercase tracking-widest">Select a board to view wiring</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
