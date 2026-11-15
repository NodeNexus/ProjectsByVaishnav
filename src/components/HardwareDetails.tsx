import { useState } from 'react';
import { motion } from 'framer-motion';
import type { HardwareDetails, BoardWiring } from '../data/hardware_details';
import { Cpu, Zap, Activity } from 'lucide-react';
import { FadingVideo } from './FadingVideo';

interface HardwareDetailsProps {
  component: HardwareDetails;
  onClose: () => void;
}

const WireColors = ['#E02424', '#0E9F6E', '#1C64F2', '#D97706', '#9061F9', '#0891B2'];

export function HardwareDetailsView({ component, onClose }: HardwareDetailsProps) {
  const [selectedBoard, setSelectedBoard] = useState<'esp32' | 'arduino' | null>(null);

  const wiring: BoardWiring | undefined = selectedBoard && component.wiring ? component.wiring[selectedBoard] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] bg-[#F8F9FA] text-[#121317] overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col relative pb-32">
        {/* Navigation Bar inside Details */}
        <nav className="fixed top-6 left-0 right-0 z-[110] flex items-center justify-between px-6 lg:px-16 max-w-[1400px] mx-auto">
          <button
            onClick={onClose}
            className="bg-white/85 backdrop-blur-md border border-[rgba(33,34,38,0.06)] rounded-full px-5 py-2 text-[13px] font-[450] text-[#121317] hover:bg-white transition-colors"
          >
            ← Back to Hardware
          </button>
        </nav>

        {/* Hero Section */}
        <section className="relative h-[65vh] min-h-[460px] flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 pt-24 max-w-[1400px] mx-auto w-full">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#F8F9FA] flex items-center justify-center">
            <FadingVideo
              src={[
                "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4",
                "/raspberrypi5.mp4"
              ]}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/70 to-transparent" />
          </div>

          <div className="relative z-10 w-full flex flex-col md:flex-row items-end gap-8 md:gap-12">
            <div className="w-44 h-44 md:w-56 md:h-56 shrink-0 bg-white rounded-[36px] p-6 border border-[rgba(33,34,38,0.06)] flex items-center justify-center">
              <img src={component.image} alt={component.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-3.5 py-1 bg-white border border-[rgba(33,34,38,0.06)] rounded-full text-[12px] uppercase tracking-wider text-[#45474D] font-medium mb-4">
                Hardware Component
              </div>
              <h1 className="font-sans font-[450] text-4xl md:text-6xl lg:text-[68px] tracking-[-0.017em] leading-[1.08] mb-4 text-[#121317]">
                {component.name}
              </h1>
              <p className="text-[17.5px] text-[#45474D] font-normal max-w-2xl leading-[1.45]">
                {component.shortDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Details Layout */}
        <div className="px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">

          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Overview */}
            <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8 md:p-10">
              <h2 className="text-[12px] font-sans text-[#45474D] mb-4 uppercase tracking-[0.1em] font-medium">// Overview</h2>
              <p className="text-[15px] text-[#45474D] font-normal leading-relaxed mb-6">
                {component.longDesc}
              </p>

              <div className="p-6 bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] rounded-[24px] flex gap-4 items-start">
                <Activity className="w-5 h-5 text-[#121317] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-[12px] font-medium uppercase tracking-wider text-[#121317] mb-1.5">What it does</h4>
                  <p className="text-[14.5px] text-[#45474D] leading-relaxed">{component.whatItDoes}</p>
                </div>
              </div>
            </section>

            {/* Interactive Wiring Section */}
            <section className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-[12px] font-sans text-[#45474D] uppercase tracking-[0.1em] font-medium">// Wiring Visualizer</h2>

                {component.wiring && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedBoard('esp32')}
                      className={`px-4 py-1.5 text-[12px] uppercase tracking-wider rounded-full transition-all ${selectedBoard === 'esp32' ? 'bg-[#121317] text-white font-[450]' : 'bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] text-[#45474D] hover:text-[#121317]'}`}
                    >
                      ESP32
                    </button>
                    <button
                      onClick={() => setSelectedBoard('arduino')}
                      className={`px-4 py-1.5 text-[12px] uppercase tracking-wider rounded-full transition-all ${selectedBoard === 'arduino' ? 'bg-[#121317] text-white font-[450]' : 'bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] text-[#45474D] hover:text-[#121317]'}`}
                    >
                      Arduino Uno
                    </button>
                  </div>
                )}
              </div>

              {!component.wiring ? (
                <div className="h-[360px] border border-[rgba(33,34,38,0.06)] bg-[#F8F9FC] rounded-[24px] flex flex-col items-center justify-center text-[#45474D]">
                  <Cpu className="w-10 h-10 mb-3 opacity-40 text-[#121317]" />
                  <p className="text-xs uppercase tracking-wider font-medium">Wiring visualization not applicable</p>
                </div>
              ) : selectedBoard && wiring ? (
                <div className="relative bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] rounded-[24px] p-6 md:p-8 min-h-[480px] flex flex-col">
                  <div className="flex justify-between items-center mb-10 px-4 relative z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 bg-white rounded-xl p-2 border border-[rgba(33,34,38,0.06)]">
                        <img src={wiring.boardImage} alt={wiring.boardName} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-medium text-[11px] uppercase tracking-wider text-[#121317] text-center w-24 leading-tight">{wiring.boardName}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 bg-white rounded-xl p-2 border border-[rgba(33,34,38,0.06)]">
                        <img src={component.image} alt={component.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-medium text-[11px] uppercase tracking-wider text-[#121317] text-center w-24 leading-tight">{component.name}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex relative">
                    {/* Left Column (Board Pins) */}
                    <div className="w-32 flex flex-col justify-around relative z-10">
                      {wiring.boardPins.map((pin, i) => (
                        <div key={`board-${i}`} className="h-10 flex items-center justify-start">
                          <div className="px-3 py-1.5 bg-white border border-[rgba(33,34,38,0.08)] rounded-lg text-xs font-mono text-[#121317] w-full text-center">
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
                            from { stroke-dashoffset: 40; }
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
                          let direction = 'reverse';
                          if (['VCC', 'VDD', 'VIN', '5V', '3.3V', '3V3', '+', 'RED', 'VL', 'GND', '-', 'BLACK'].includes(pName)) {
                            direction = 'normal';
                          } else if (['sg90', 'relay5v', 'l298n'].includes(component.id)) {
                            direction = 'normal';
                          } else if (['TRIG', 'MOSI', 'SCK', 'SCL', 'RST', 'CS', 'ENA', 'ENB'].includes(pName)) {
                            direction = 'normal';
                          }

                          return (
                            <g key={`wire-${idx}`}>
                              {/* Soft outer wire */}
                              <path
                                d={`M 0,${y1} C 50,${y1} 50,${y2} 100,${y2}`}
                                fill="none"
                                stroke={color}
                                strokeWidth="8"
                                strokeLinecap="round"
                                opacity="0.12"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Solid base wire */}
                              <path
                                d={`M 0,${y1} C 50,${y1} 50,${y2} 100,${y2}`}
                                fill="none"
                                stroke={color}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                opacity="0.8"
                                vectorEffect="non-scaling-stroke"
                              />
                              {/* Animated pulse */}
                              <path
                                d={`M 0,${y1} C 50,${y1} 50,${y2} 100,${y2}`}
                                fill="none"
                                stroke="#121317"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="4 36"
                                vectorEffect="non-scaling-stroke"
                                style={{
                                  animation: `wire-flow ${1.2 + (idx % 3) * 0.3}s linear infinite`,
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
                          <div className="px-3 py-1.5 bg-white border border-[rgba(33,34,38,0.08)] rounded-lg text-xs font-mono text-[#121317] w-full text-center">
                            {pin.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[460px] border border-dashed border-[rgba(33,34,38,0.12)] bg-[#F8F9FC] rounded-[24px] flex flex-col items-center justify-center text-[#45474D]">
                  <Cpu className="w-10 h-10 mb-3 opacity-40 text-[#121317]" />
                  <p className="text-[12px] uppercase tracking-wider font-medium">Select a board to connect wires</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-[rgba(33,34,38,0.06)] rounded-[36px] p-8">
              <h2 className="text-[12px] font-sans text-[#45474D] mb-6 uppercase tracking-[0.1em] font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#121317]" />
                Pin Configuration
              </h2>
              <div className="space-y-3">
                {component.pins.map((pin, i) => (
                  <div key={i} className="flex flex-col p-4 bg-[#F8F9FC] border border-[rgba(33,34,38,0.06)] rounded-2xl">
                    <span className="font-mono text-[#121317] text-[13px] font-medium mb-1">{pin.name}</span>
                    <span className="text-[13px] text-[#45474D] leading-relaxed">{pin.desc}</span>
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
