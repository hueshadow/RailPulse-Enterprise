import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const forecastData = [
    { name: '12:00', flow: 4000 }, { name: '13:00', flow: 3000 }, { name: '14:00', flow: 2000 },
    { name: '15:00', flow: 2780 }, { name: '16:00', flow: 1890 }, { name: '17:00', flow: 2390 },
    { name: '18:00', flow: 3490 }, { name: '19:00', flow: 4000 }, { name: '20:00', flow: 3000 },
];

export const Forecasting = () => {
    return (
        <div className="flex h-full">
            {/* Main Charts Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
                 {/* Top Controls */}
                 <div className="flex justify-between items-end">
                     <div>
                         <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                           <span className="w-1 h-3 bg-rail-primary rounded-full"></span>
                           Scenario Simulation
                         </label>
                         <div className="flex gap-2 mt-2">
                             <button className="px-4 py-2 glass rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all">Normal</button>
                             <button className="px-4 py-2 glass rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all">Heavy Rain</button>
                             <button className="px-4 py-2 bg-rail-primary/15 backdrop-blur-sm border border-rail-primary/40 text-rail-primary rounded-lg text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(37,192,244,0.2)] hover:shadow-[0_0_25px_rgba(37,192,244,0.3)] transition-all">
                                 <span className="material-symbols-outlined text-sm">stadium</span> Major Sport Event
                             </button>
                         </div>
                     </div>
                     <div className="flex gap-4">
                         <div className="glass-card-primary p-4 rounded-xl min-w-[180px]">
                             <div className="text-xs text-slate-400">Predicted Delta</div>
                             <div className="text-2xl font-bold text-white mt-1">+24.5% <span className="text-xs text-rail-primary">▲ vs Baseline</span></div>
                         </div>
                     </div>
                 </div>

                 {/* Charts */}
                 <div className="grid grid-cols-2 gap-6 h-80">
                     <div className="glass-card rounded-xl p-5 flex flex-col">
                         <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                           <span className="w-1.5 h-4 bg-rail-primary rounded-full shadow-[0_0_8px_rgba(37,192,244,0.5)]"></span>
                           Real-time Network Flow
                         </h3>
                         <div className="flex-1">
                             <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={forecastData}>
                                     <defs>
                                         <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                                             <stop offset="5%" stopColor="#25c0f4" stopOpacity={0.4}/>
                                             <stop offset="95%" stopColor="#25c0f4" stopOpacity={0}/>
                                         </linearGradient>
                                     </defs>
                                     <Tooltip
                                       contentStyle={{
                                         backgroundColor: 'rgba(21, 30, 34, 0.9)',
                                         border: '1px solid rgba(42, 59, 66, 0.5)',
                                         borderRadius: '8px',
                                         backdropFilter: 'blur(8px)'
                                       }}
                                     />
                                     <Area type="monotone" dataKey="flow" stroke="#25c0f4" strokeWidth={2} fillOpacity={1} fill="url(#colorFlow)" />
                                 </AreaChart>
                             </ResponsiveContainer>
                         </div>
                     </div>
                     <div className="glass-card rounded-xl p-5 flex flex-col relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4">
                             <div className="text-right glass px-4 py-3 rounded-xl">
                                 <div className="text-xs text-slate-500 uppercase">Peak Hour</div>
                                 <div className="text-3xl font-bold text-white">18:30</div>
                                 <div className="text-sm text-rail-primary font-mono">~42,500 pax</div>
                             </div>
                         </div>
                         <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                           <span className="w-1.5 h-4 bg-rail-warning rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                           24h Forecast Band
                         </h3>
                         {/* Abstract Vis for band */}
                         <div className="flex-1 relative mt-8">
                             <div className="absolute inset-0 flex items-end">
                                 <div className="w-full h-32 bg-rail-primary/10 rounded-t-[50%] blur-xl"></div>
                             </div>
                             <svg viewBox="0 0 400 100" className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                                 <path d="M0 80 Q 100 80, 200 60 T 400 20" fill="none" stroke="#25c0f4" strokeWidth="2" strokeDasharray="4 4" className="drop-shadow-[0_0_5px_rgba(37,192,244,0.5)]" />
                                 <path d="M0 90 Q 100 90, 200 70 T 400 30" fill="none" stroke="#25c0f4" strokeWidth="1" opacity="0.3" />
                                 <path d="M0 70 Q 100 70, 200 50 T 400 10" fill="none" stroke="#25c0f4" strokeWidth="1" opacity="0.3" />
                             </svg>
                         </div>
                     </div>
                 </div>

                 {/* Heatmap Grid */}
                 <div className="glass-card rounded-xl p-5">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.5)]"></span>
                        Congestion Heatmap
                      </h3>
                      <div className="space-y-1">
                          {['Central Stn', 'North Loop', 'South Loop', 'Airport Line'].map((row, i) => (
                              <div key={i} className="flex items-center h-10 hover:bg-white/5 rounded-lg px-2 transition-colors cursor-pointer group">
                                  <div className="w-32 text-sm text-slate-300 group-hover:text-white transition-colors">{row}</div>
                                  <div className="flex-1 h-6 flex rounded-lg overflow-hidden backdrop-blur-sm border border-white/5">
                                      <div className={`h-full w-[20%] bg-blue-900/40 border-r border-black/20`}></div>
                                      <div className={`h-full w-[20%] ${i === 0 ? 'bg-rail-primary/60 shadow-[inset_0_0_10px_rgba(37,192,244,0.3)]' : 'bg-blue-800/40'} border-r border-black/20`}></div>
                                      <div className={`h-full w-[20%] ${i === 0 ? 'bg-rail-warning/80 shadow-[inset_0_0_10px_rgba(245,158,11,0.3)]' : 'bg-rail-primary/40'} border-r border-black/20 relative group/cell`}>
                                           {i === 0 && <div className="hidden group-hover/cell:block absolute -top-9 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-lg text-xs text-rail-warning border border-rail-warning/30 whitespace-nowrap shadow-[0_0_15px_rgba(245,158,11,0.2)]">High Load</div>}
                                      </div>
                                      <div className={`h-full w-[20%] ${i === 2 ? 'bg-rail-primary/50' : 'bg-blue-900/30'} border-r border-black/20`}></div>
                                      <div className={`h-full w-[20%] bg-blue-900/20`}></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                 </div>
            </div>

            {/* Recommendations Panel */}
            <div className="w-[400px] border-l border-white/10 bg-[#0f172a]/90 backdrop-blur-xl flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.3)]">
                <div className="p-6 border-b border-white/10 bg-gradient-to-r from-rail-primary/5 to-transparent">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-rail-primary">auto_awesome</span>
                      AI Recommendations
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Based on: <span className="text-rail-primary font-medium">Major Sport Event</span></p>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    {/* Rec Card 1 */}
                    <div className="glass-card-warning rounded-xl p-4 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all group cursor-pointer">
                        <div className="flex justify-between mb-2">
                             <div className="flex items-center gap-2 font-bold text-white text-sm">
                               <span className="material-symbols-outlined text-rail-warning text-sm drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]">timer</span>
                               Headway Adjustment
                             </div>
                             <span className="text-[10px] bg-rail-warning/15 text-rail-warning border border-rail-warning/30 px-2 py-0.5 rounded-full font-bold shadow-[0_0_8px_rgba(245,158,11,0.2)]">HIGH IMPACT</span>
                        </div>
                        <p className="text-xs text-slate-300 mb-4 leading-relaxed">Reduce headway from 4m to <strong className="text-white">2.5m</strong> for Line A between 17:00-19:00.</p>
                        <div className="flex gap-2">
                            <button className="flex-1 glass-button-solid text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1">
                              <span className="material-symbols-outlined text-sm">check</span> Execute
                            </button>
                            <button className="px-4 py-2.5 rounded-lg glass text-slate-400 text-xs font-bold hover:text-white hover:bg-white/10 transition-all">Dismiss</button>
                        </div>
                    </div>
                     {/* Rec Card 2 */}
                     <div className="glass-card-primary rounded-xl p-4 hover:shadow-[0_0_25px_rgba(37,192,244,0.15)] transition-all group cursor-pointer">
                        <div className="flex justify-between mb-2">
                             <div className="flex items-center gap-2 font-bold text-white text-sm">
                               <span className="material-symbols-outlined text-rail-primary text-sm drop-shadow-[0_0_6px_rgba(37,192,244,0.5)]">train</span>
                               Capacity Boost
                             </div>
                        </div>
                        <p className="text-xs text-slate-300 mb-4 leading-relaxed">Deploy <strong className="text-white">2 standby trains</strong> into South Loop to handle pre-game surge.</p>
                        <div className="flex gap-2">
                            <button className="flex-1 glass-button-solid text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1">
                              <span className="material-symbols-outlined text-sm">check</span> Deploy
                            </button>
                        </div>
                    </div>
                     {/* Rec Card 3 */}
                     <div className="glass-card-danger rounded-xl p-4 relative overflow-hidden animate-glow-pulse-danger">
                        <div className="absolute inset-0 bg-rail-danger/5 pointer-events-none"></div>
                        <div className="flex justify-between mb-2 relative z-10">
                             <div className="flex items-center gap-2 font-bold text-white text-sm">
                               <span className="material-symbols-outlined text-rail-danger text-sm drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">gavel</span>
                               Crowd Control
                             </div>
                             <span className="text-[10px] bg-rail-danger/20 text-rail-danger border border-rail-danger/30 px-2 py-0.5 rounded-full font-bold animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]">URGENT</span>
                        </div>
                        <p className="text-xs text-slate-300 mb-4 leading-relaxed relative z-10">Activate <strong className="text-white">Level 2 flow restrictions</strong> at Central Station.</p>
                         <div className="flex gap-2 relative z-10">
                            <button className="flex-1 bg-rail-danger hover:bg-rail-danger/90 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all">
                              <span className="material-symbols-outlined text-sm">warning</span> Activate
                            </button>
                            <button className="px-4 py-2.5 rounded-lg glass text-slate-400 text-xs font-bold hover:text-white hover:bg-white/10 transition-all">Ignore</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
