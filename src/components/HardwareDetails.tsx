import { useState } from 'react';
import { motion } from 'framer-motion';
import type { HardwareDetails, BoardWiring } from '../data/hardware_details';
import { Cpu, Zap, Activity } from 'lucide-react';
import { FadingVideo } from './FadingVideo';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col relative pb-32">
        {/* Navigation Bar inside Details */}
        <nav className="fixed top-6 left-0 right-0 z-[110] flex items-center justify-between px-8 lg:px-24">
          <button 
            onClick={onClose}
            className="liquid-glass rounded-full px-5 py-2 text-[11px] font-medium tracking-widest uppercase btn-hover text-white/75"
          >
            ← Back to Hardware
          </button>
        </nav>

        {/* Hero Section */}
        <section className="relative h-[70vh] flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-16">
          <div className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden">
            <FadingVideo 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
            <div className="absolute inset-0 capabilities-gradient opacity-30 mix-blend-overlay" />
          </div>
          
          <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-end gap-12">
            <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 bg-white/5 rounded-3xl p-6 border border-white/10 liquid-glass flex items-center justify-center">
              <img src={component.image} alt={component.name} className="w-full h-full object-contain drop-shadow-2xl" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[11px] uppercase tracking-[0.2em] text-white/70 mb-6 w-fit">
                Hardware Component
              </div>
              <h1 className="font-heading italic text-6xl md:text-8xl tracking-[-0.03em] leading-[0.85] mb-6 drop-shadow-2xl">
                {component.name}
              </h1>
              <p className="text-lg md:text-xl text-white/75 font-body font-light max-w-2xl leading-relaxed tracking-wide">
                {component.shortDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Details Layout */}
        <div className="px-8 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          
          <div className="lg:col-span-8 flex flex-col gap-16">
            {/* Overview */}
            <section>
              <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em]">// Overview</h2>
              <p className="text-[16px] text-white/75 font-body font-light leading-relaxed tracking-wide mb-8">
                {component.longDesc}
              </p>
              
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex gap-4 items-start liquid-glass">
                <Activity className="w-6 h-6 text-white mt-1 shrink-0 opacity-70" />
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-widest text-white/70 mb-2">What it does</h4>
                  <p className="text-[15px] text-white/80 font-light leading-relaxed">{component.whatItDoes}</p>
                </div>
              </div>
            </section>

            {/* Interactive Wiring Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <h2 className="text-[11px] font-body text-white/55 uppercase tracking-[0.2em]">// Wiring Visualizer</h2>
                
                {component.wiring && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedBoard('esp32')}
                      className={`px-5 py-2 text-[11px] uppercase tracking-widest rounded-full transition-all ${selectedBoard === 'esp32' ? 'bg-white text-black font-semibold' : 'bg-white/10 hover:bg-white/20 text-white/75 font-medium'}`}
                    >
                      ESP32
                    </button>
                    <button 
                      onClick={() => setSelectedBoard('arduino')}
                      className={`px-5 py-2 text-[11px] uppercase tracking-widest rounded-full transition-all ${selectedBoard === 'arduino' ? 'bg-white text-black font-semibold' : 'bg-white/10 hover:bg-white/20 text-white/75 font-medium'}`}
                    >
                      Arduino Uno
                    </button>
                  </div>
                )}
              </div>

              {!component.wiring ? (
                <div className="h-[400px] border border-white/10 rounded-3xl flex flex-col items-center justify-center text-white/30 liquid-glass">
                  <Cpu className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-xs uppercase tracking-widest">Wiring visualization not applicable</p>
                </div>
              ) : selectedBoard && wiring ? (
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[500px] flex flex-col liquid-glass">
                  <div className="flex justify-between items-center mb-12 px-4 relative z-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-black/50 rounded-xl p-2 border border-white/10">
                        <img src={wiring.boardImage} alt={wiring.boardName} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-medium text-[10px] uppercase tracking-[0.2em] text-white/70 text-center w-24 leading-tight">{wiring.boardName}</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-black/50 rounded-xl p-2 border border-white/10">
                        <img src={component.image} alt={component.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-medium text-[10px] uppercase tracking-[0.2em] text-white/70 text-center w-24 leading-tight">{component.name}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex relative">
                    {/* Left Column (Board Pins) */}
                    <div className="w-32 flex flex-col justify-around relative z-10">
                      {wiring.boardPins.map((pin, i) => (
                        <div key={`board-${i}`} className="h-10 flex items-center justify-start">
                          <div className="px-4 py-2 bg-black border border-white/20 rounded-lg text-xs font-mono text-white/90 w-full text-center shadow-lg">
                            {pin}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SVG Wires Layer */}
                    <div className="flex-1 relative">
                      <style>
                        {`
                          @keyframes wire-flow {
                            from { stroke-dashoffset: 50; }
                            to { stroke-dashoffset: 0; }
                          }
                        `}
                      </style>
                      <svg 
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {wiring.mappings.map((mapping, idx) => {
                          const boardIndex = wiring.boardPins.indexOf(mapping.boardPin);
                          const sensorIndex = component.pins.findIndex(p => p.name === mapping.sensorPin);
                          
                          if (boardIndex === -1 || sensorIndex === -1) return null;

                          const y1 = (boardIndex + 0.5) * (100 / wiring.boardPins.length);
                          const y2 = (sensorIndex + 0.5) * (100 / component.pins.length);
                          const color = WireColors[idx % WireColors.length];

                          // Determine Flow Direction
                          const pName = mapping.sensorPin.toUpperCase();
                          let direction = 'reverse'; // Default: Sensor to Board
                          if (['VCC', 'VDD', 'VIN', '5V', '3.3V', '3V3', '+', 'RED', 'VL', 'GND', '-', 'BLACK'].includes(pName)) {
                            direction = 'normal'; // Board to Sensor
                          } else if (['sg90', 'relay5v', 'l298n'].includes(component.id)) {
                            direction = 'normal'; // Control signals to Actuator
                          } else if (['TRIG', 'MOSI', 'SCK', 'SCL', 'RST', 'CS', 'ENA', 'ENB'].includes(pName)) {
                            direction = 'normal'; // Master out to Slave in
                          }

                          return (
                            <g key={`wire-${idx}`}>
                              {/* Widest outer glow effect (static) */}
                              <path 
                                d={`M 0,${y1} C 50,${y1} 50,${y2} 100,${y2}`}
                                fill="none"
                                stroke={color}
                                strokeWidth="12"
                                strokeLinecap="round"
                                opacity="0.08"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Inner glow effect (static) */}
                              <path 
                                d={`M 0,${y1} C 50,${y1} 50,${y2} 100,${y2}`}
                                fill="none"
                                stroke={color}
                                strokeWidth="6"
                                strokeLinecap="round"
                                opacity="0.2"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Solid base wire */}
                              <path 
                                d={`M 0,${y1} C 50,${y1} 50,${y2} 100,${y2}`}
                                fill="none"
                                stroke={color}
                                strokeWidth="2"
                                strokeLinecap="round"
                                opacity="0.4"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Animated energy pulse (Hardware Accelerated) */}
                              <path 
                                d={`M 0,${y1} C 50,${y1} 50,${y2} 100,${y2}`}
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="5 45"
                                vectorEffect="non-scaling-stroke"
                                style={{ 
                                  animation: `wire-flow ${1 + (idx % 3) * 0.3}s linear infinite`,
                                  animationDirection: direction as any
                                }}
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
                          <div className="px-4 py-2 bg-black border border-white/20 rounded-lg text-xs font-mono text-white/90 w-full text-center shadow-lg">
                            {pin.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[500px] border border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center text-white/30 liquid-glass">
                  <Cpu className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-[11px] uppercase tracking-[0.2em]">Select a board to connect wires</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="liquid-glass rounded-3xl p-8 border border-white/5">
              <h2 className="text-[11px] font-body text-white/55 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                <Zap className="w-4 h-4 text-white/50" />
                Pin Configuration
              </h2>
              <div className="space-y-4">
                {component.pins.map((pin, i) => (
                  <div key={i} className="flex flex-col p-4 bg-black/40 border border-white/5 rounded-2xl">
                    <span className="font-mono text-white/90 text-[13px] mb-1.5">{pin.name}</span>
                    <span className="text-[13px] text-white/50 leading-relaxed font-light">{pin.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
