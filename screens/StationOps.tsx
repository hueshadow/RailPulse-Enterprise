import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EquipmentHealthCard, Equipment } from '../components/EquipmentHealthCard';
import { RingChart } from '../components/charts/RingChart';

// Mock equipment data
const mockEquipment: Equipment[] = [
  {
    id: 'EQ001',
    name: 'Escalator UP-1',
    type: 'escalator',
    operationHours: 28540,
    failureCount: 2,
    remainingLifespan: 72,
    status: 'healthy',
    lastMaintenance: new Date('2024-01-15'),
    nextMaintenance: new Date('2024-02-15'),
    location: 'Platform 1 North'
  },
  {
    id: 'EQ002',
    name: 'Escalator UP-2',
    type: 'escalator',
    operationHours: 31200,
    failureCount: 5,
    remainingLifespan: 45,
    status: 'warning',
    lastMaintenance: new Date('2024-01-10'),
    nextMaintenance: new Date('2024-01-25'),
    location: 'Platform 1 South'
  },
  {
    id: 'EQ003',
    name: 'Elevator A',
    type: 'elevator',
    operationHours: 15800,
    failureCount: 0,
    remainingLifespan: 88,
    status: 'healthy',
    lastMaintenance: new Date('2024-01-20'),
    nextMaintenance: new Date('2024-03-20'),
    location: 'Main Hall'
  },
  {
    id: 'EQ004',
    name: 'Gate Array East',
    type: 'gate',
    operationHours: 42100,
    failureCount: 8,
    remainingLifespan: 25,
    status: 'critical',
    lastMaintenance: new Date('2023-12-01'),
    nextMaintenance: new Date('2024-01-10'),
    location: 'East Entrance'
  },
];

export const StationOps = () => {
    const { t } = useTranslation();
    const [showHealthPanel, setShowHealthPanel] = useState(true);
    return (
        <div className="grid grid-cols-12 h-full gap-px bg-quantix-border/50">
            {/* Sidebar: Station Control */}
            <div className="col-span-3 bg-quantix-black/80 backdrop-blur-sm flex flex-col border-r border-quantix-border/50">
                <div className="p-4 border-b border-quantix-border/50 bg-rail-panel/60 backdrop-blur-sm">
                    <h2 className="text-lg font-bold text-white">Station Control</h2>
                    <p className="text-xs text-slate-400">Central Hub • Live Operations</p>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                          <span className="w-1 h-3 bg-quantix-purple rounded-full"></span>
                          Staff Dispatch
                        </h3>
                        <div className="space-y-2">
                             <div className="flex items-center gap-3 p-3 glass-card rounded-xl cursor-pointer group">
                                 <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold relative shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                                     AS <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-rail-success border-2 border-[#151e22] rounded-full shadow-[0_0_6px_rgba(16,185,129,0.6)]"></div>
                                 </div>
                                 <div className="flex-1 min-w-0">
                                     <div className="text-sm font-bold text-white group-hover:text-quantix-purple transition-colors">A. Smith</div>
                                     <div className="text-xs text-slate-400 truncate">Security • Plat 1</div>
                                 </div>
                             </div>
                             <div className="flex items-center gap-3 p-3 glass-card rounded-xl cursor-pointer group">
                                 <div className="size-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xs font-bold relative shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                                     MK <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-rail-warning border-2 border-[#151e22] rounded-full animate-pulse shadow-[0_0_6px_rgba(245,158,11,0.6)]"></div>
                                 </div>
                                 <div className="flex-1 min-w-0">
                                     <div className="text-sm font-bold text-white group-hover:text-quantix-purple transition-colors">M. Kim</div>
                                     <div className="text-xs text-slate-400 truncate">Maint • Esc UP-2</div>
                                 </div>
                             </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                          <span className="w-1 h-3 bg-rail-success rounded-full"></span>
                          Infra Status
                        </h3>
                         <div className="space-y-2">
                             <div className="flex justify-between items-center p-3 glass-card rounded-xl border-l-2 border-rail-success hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all">
                                 <span className="text-sm text-slate-300">Elevators</span>
                                 <span className="flex gap-1.5">
                                   <span className="size-2.5 bg-rail-success rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]"></span>
                                   <span className="size-2.5 bg-rail-success rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]"></span>
                                 </span>
                             </div>
                             <div className="flex justify-between items-center p-3 glass-card rounded-xl border-l-2 border-rail-warning hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all">
                                 <span className="text-sm text-slate-300">Escalators</span>
                                 <span className="flex gap-1.5">
                                   <span className="size-2.5 bg-rail-success rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]"></span>
                                   <span className="size-2.5 bg-rail-warning rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                                 </span>
                             </div>
                         </div>
                    </div>

                    {/* Equipment Health Section */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                            <span className="w-1 h-3 bg-quantix-purple rounded-full"></span>
                            Equipment Health
                          </h3>
                          <button
                            onClick={() => setShowHealthPanel(!showHealthPanel)}
                            className="text-xs text-quantix-purple hover:text-quantix-purple/80"
                          >
                            {showHealthPanel ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        {showHealthPanel && (
                          <div className="space-y-2">
                            {mockEquipment.slice(0, 2).map(eq => (
                              <EquipmentHealthCard key={eq.id} equipment={eq} compact />
                            ))}
                          </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Area */}
            <div className="col-span-6 flex flex-col bg-[#050910] relative">
                 <div className="absolute top-4 left-4 z-10 flex gap-2">
                     <button className="glass px-4 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
                       <span className="material-symbols-outlined text-[18px]">layers</span>
                       Layers
                     </button>
                     <button className="glass px-4 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
                       <span className="material-symbols-outlined text-[18px]">thermostat</span>
                       Heatmap
                     </button>
                 </div>

                 <div className="absolute top-4 right-4 z-10 flex gap-4">
                     <div className="glass-card p-4 rounded-xl min-w-[160px]">
                         <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gate Throughput</div>
                         <div className="text-2xl font-bold text-white font-mono mt-1">42 <span className="text-sm text-rail-success">+5%</span></div>
                     </div>
                     {/* Overall Equipment Health Ring */}
                     <div className="glass-card p-3 rounded-xl flex items-center gap-3">
                         <RingChart value={68} size="sm" color="primary" />
                         <div>
                           <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Fleet Health</div>
                           <div className="text-sm font-bold text-white mt-0.5">68% Avg</div>
                         </div>
                     </div>
                 </div>

                 {/* Map */}
                 <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                     <div
                        className="w-[90%] h-[90%] rounded-xl border border-white/10 bg-cover bg-center opacity-80 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                        style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDk6uN4kX4BYkQNYgzTu92c48sm6cZZlDkItUCYX-nsHBz8TtlK4kz5Y9SFQD5lmErfagY8OzczBeXyU7HRQROov58BQoZvAa0iHLQo3awLO499G6Z88g7Id4IsbGEjC6mcpdrqxYcwK2EsjBqh9pgxWxcKm9mp-j28TcFMQPCwoQVzAVOUKP2_BkTMjOpTnsz9Ti8qJ1uMirKr4WoEZwcyB25myE0DqqfS6tU_dpk0eVI8lF7EPSEMDEysx09PmFC__qvSZkclbhc')`,
                            filter: 'hue-rotate(190deg) contrast(1.2) saturate(1.5)'
                        }}
                     >
                         <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
                             <div className="size-7 bg-rail-warning rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.7)] animate-bounce">
                                 <span className="material-symbols-outlined text-[16px] text-black font-bold">priority_high</span>
                             </div>
                             <div className="mt-2 glass px-3 py-1.5 rounded-lg text-xs text-white font-medium">Congestion</div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* CCTV Sidebar: Surveillance */}
            <div className="col-span-3 bg-quantix-black/80 backdrop-blur-sm border-l border-quantix-border/50 flex flex-col">
                <div className="p-4 border-b border-quantix-border/50 flex justify-between items-center bg-rail-panel/60 backdrop-blur-sm">
                    <h3 className="font-bold text-white text-sm uppercase flex items-center gap-2">
                      <span className="w-1 h-3 bg-rail-danger rounded-full"></span>
                      Surveillance
                    </h3>
                    <span className="material-symbols-outlined text-quantix-purple cursor-pointer hover:scale-110 transition-transform">grid_view</span>
                </div>
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                    <div className="glass-card-danger rounded-xl relative overflow-hidden group">
                         <div className="absolute top-2 left-2 bg-rail-danger text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse z-10 shadow-[0_0_10px_rgba(239,68,68,0.5)]">MOTION</div>
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqBh_mmw95ECAPTZS-hWxog4DPe2yW5NFj2-GQpZrYuuEzIo543yX2KJ7ErFK413R1UI--G0jWCdHijdMrpbwtNDC8pwBI0jWh8YM1FS5qAnNeQFOM6kJ8ols1vHJRkUy2hg3XS5eS05-jvK5TKjtIK40eNN39o1XHHCSwb4q9-opEGPgMpPT3T_JQ8uhA0eoSxI8lmT5vuRQkKBkzBZ2WKyeRG-laXVI6osIJkkxH-682AFBQzSSv_o5vuHrtxpNm03uIUr1WEHA" className="w-full h-40 object-cover opacity-80" />
                         <div className="bg-[#0B1116]/80 backdrop-blur-sm p-2.5 flex justify-between items-center">
                             <span className="text-xs text-white font-medium">Cam 04: Plat 1 N</span>
                             <div className="size-2.5 bg-rail-danger rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                         </div>
                    </div>
                    <div className="glass-card rounded-xl relative overflow-hidden group cursor-pointer">
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgACOMCDZ4wT4IzLfiwJoRZW0EP8ZkWr7fiKB9sUC7i-RLrpKNNzbZOT0BJwO4T1JHzIlds1IjAqfnvEwX9obj3KxL8Ntm8FUJR_EKGGP5cuwHqMwPrYfafxB-e1D5qib1bYgsV0beoWCzevHqa6skI9t7DWEmfcCdO3p3jGW-WORTAennvbLSbtByIDInNWeWXd8ETJMJFg2Sm_QcxgUE4hr4URL3LhejzYsy60-Fz8k06U8ujAvN72c6mEC7tZMjZK7OeUFas-M" className="w-full h-40 object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300" />
                         <div className="bg-[#0B1116]/80 backdrop-blur-sm p-2.5 flex justify-between items-center">
                             <span className="text-xs text-white font-medium">Cam 01: Main Hall</span>
                             <div className="size-2.5 bg-rail-success rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]"></div>
                         </div>
                    </div>
                     <div className="glass-card rounded-xl relative overflow-hidden group cursor-pointer">
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMhood9ZQT-ueuLyPdNACQGw9y3UhCVSwUktx9GvDSoacgrXE7M5nWPUjtOVD9s5mce_7NJlHmS-ikkJTk2nCWCEnpQ4LW-X0iETTdAHlZogTDoTiS7A4OQ4_Bl0Yf2svOZPspZv378o34Lkz5zRxcQBMF2VYIf5t3JHZLgwCm5bRAcc4cLmpgbcpWplA1uSsZrHL-QgW4-TO84p1a1tLU-LjoaSoMiKthNa4V1aUHARCXC0SZPufxSG_tqOwneKIxZduKUok8zNo" className="w-full h-40 object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300" />
                         <div className="bg-[#0B1116]/80 backdrop-blur-sm p-2.5 flex justify-between items-center">
                             <span className="text-xs text-white font-medium">Cam 02: East Gate</span>
                             <div className="size-2.5 bg-rail-success rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]"></div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
