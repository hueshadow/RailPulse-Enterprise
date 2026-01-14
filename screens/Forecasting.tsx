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
                         <label className="text-xs font-bold text-slate-500 uppercase">Scenario Simulation</label>
                         <div className="flex gap-2 mt-2">
                             <button className="px-4 py-2 bg-rail-panel border border-rail-border rounded text-sm text-slate-300">Normal</button>
                             <button className="px-4 py-2 bg-rail-panel border border-rail-border rounded text-sm text-slate-300">Heavy Rain</button>
                             <button className="px-4 py-2 bg-rail-primary/20 border border-rail-primary text-rail-primary rounded text-sm font-bold flex items-center gap-2">
                                 <span className="material-symbols-outlined text-sm">stadium</span> Major Sport Event
                             </button>
                         </div>
                     </div>
                     <div className="flex gap-4">
                         <div className="glass p-4 rounded min-w-[160px] border-l-4 border-rail-primary">
                             <div className="text-xs text-slate-400">Predicted Delta</div>
                             <div className="text-2xl font-bold text-white mt-1">+24.5% <span className="text-xs text-rail-primary">▲ vs Baseline</span></div>
                         </div>
                     </div>
                 </div>

                 {/* Charts */}
                 <div className="grid grid-cols-2 gap-6 h-80">
                     <div className="glass rounded-xl p-5 flex flex-col">
                         <h3 className="text-white font-bold mb-4 flex items-center gap-2"><span className="w-1.5 h-4 bg-rail-primary rounded-full"></span> Real-time Network Flow</h3>
                         <div className="flex-1">
                             <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={forecastData}>
                                     <defs>
                                         <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                                             <stop offset="5%" stopColor="#25c0f4" stopOpacity={0.8}/>
                                             <stop offset="95%" stopColor="#25c0f4" stopOpacity={0}/>
                                         </linearGradient>
                                     </defs>
                                     <Tooltip contentStyle={{backgroundColor: '#151e22', border: '1px solid #2a3b42'}} />
                                     <Area type="monotone" dataKey="flow" stroke="#25c0f4" fillOpacity={1} fill="url(#colorFlow)" />
                                 </AreaChart>
                             </ResponsiveContainer>
                         </div>
                     </div>
                     <div className="glass rounded-xl p-5 flex flex-col relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4">
                             <div className="text-right">
                                 <div className="text-xs text-slate-500 uppercase">Peak Hour</div>
                                 <div className="text-3xl font-bold text-white">18:30</div>
                                 <div className="text-sm text-rail-primary">~42,500 pax</div>
                             </div>
                         </div>
                         <h3 className="text-white font-bold mb-4 flex items-center gap-2"><span className="w-1.5 h-4 bg-rail-warning rounded-full"></span> 24h Forecast Band</h3>
                         {/* Abstract Vis for band */}
                         <div className="flex-1 relative mt-8">
                             <div className="absolute inset-0 flex items-end">
                                 <div className="w-full h-32 bg-rail-primary/5 rounded-t-[50%] blur-xl"></div>
                             </div>
                             <svg viewBox="0 0 400 100" className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                                 <path d="M0 80 Q 100 80, 200 60 T 400 20" fill="none" stroke="#25c0f4" strokeWidth="2" strokeDasharray="4 4" />
                                 <path d="M0 90 Q 100 90, 200 70 T 400 30" fill="none" stroke="#25c0f4" strokeWidth="1" opacity="0.3" />
                                 <path d="M0 70 Q 100 70, 200 50 T 400 10" fill="none" stroke="#25c0f4" strokeWidth="1" opacity="0.3" />
                             </svg>
                         </div>
                     </div>
                 </div>

                 {/* Heatmap Grid */}
                 <div className="glass rounded-xl p-5">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2"><span className="w-1.5 h-4 bg-purple-500 rounded-full"></span> Congestion Heatmap</h3>
                      <div className="space-y-1">
                          {['Central Stn', 'North Loop', 'South Loop', 'Airport Line'].map((row, i) => (
                              <div key={i} className="flex items-center h-10 hover:bg-white/5 rounded px-2">
                                  <div className="w-32 text-sm text-slate-300">{row}</div>
                                  <div className="flex-1 h-6 flex rounded overflow-hidden">
                                      <div className={`h-full w-[20%] bg-blue-900/40 border-r border-black/20`}></div>
                                      <div className={`h-full w-[20%] ${i === 0 ? 'bg-rail-primary/60' : 'bg-blue-800/40'} border-r border-black/20`}></div>
                                      <div className={`h-full w-[20%] ${i === 0 ? 'bg-rail-warning/80' : 'bg-rail-primary/40'} border-r border-black/20 relative group`}>
                                           {i === 0 && <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded text-rail-warning border border-rail-warning">High Load</div>}
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
            <div className="w-[400px] border-l border-rail-border glass flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white">AI Recommendations</h2>
                    <p className="text-xs text-slate-400 mt-1">Based on: <span className="text-rail-primary">Major Sport Event</span></p>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    {/* Rec Card 1 */}
                    <div className="bg-[#161b22] border-l-4 border-l-rail-warning border border-white/10 rounded-r p-4 hover:bg-white/5 transition group">
                        <div className="flex justify-between mb-2">
                             <div className="flex items-center gap-2 font-bold text-white text-sm"><span className="material-symbols-outlined text-rail-warning text-sm">timer</span> Headway Adjustment</div>
                             <span className="text-[10px] bg-rail-warning/10 text-rail-warning border border-rail-warning/20 px-1.5 py-0.5 rounded font-bold">HIGH IMPACT</span>
                        </div>
                        <p className="text-xs text-slate-300 mb-4 leading-relaxed">Reduce headway from 4m to <strong className="text-white">2.5m</strong> for Line A between 17:00-19:00.</p>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-rail-primary text-black text-xs font-bold py-2 rounded hover:bg-rail-primary/90 flex items-center justify-center gap-1"><span className="material-symbols-outlined text-sm">check</span> Execute</button>
                            <button className="px-3 py-2 rounded border border-white/10 text-slate-400 text-xs font-bold hover:text-white">Dismiss</button>
                        </div>
                    </div>
                     {/* Rec Card 2 */}
                     <div className="bg-[#161b22] border-l-4 border-l-rail-primary border border-white/10 rounded-r p-4 hover:bg-white/5 transition group">
                        <div className="flex justify-between mb-2">
                             <div className="flex items-center gap-2 font-bold text-white text-sm"><span className="material-symbols-outlined text-rail-primary text-sm">train</span> Capacity Boost</div>
                        </div>
                        <p className="text-xs text-slate-300 mb-4 leading-relaxed">Deploy <strong className="text-white">2 standby trains</strong> into South Loop to handle pre-game surge.</p>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-rail-primary text-black text-xs font-bold py-2 rounded hover:bg-rail-primary/90 flex items-center justify-center gap-1"><span className="material-symbols-outlined text-sm">check</span> Deploy</button>
                        </div>
                    </div>
                     {/* Rec Card 3 */}
                     <div className="bg-[#161b22] border-l-4 border-l-rail-danger border border-white/10 rounded-r p-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-rail-danger/5 pointer-events-none"></div>
                        <div className="flex justify-between mb-2 relative z-10">
                             <div className="flex items-center gap-2 font-bold text-white text-sm"><span className="material-symbols-outlined text-rail-danger text-sm">gavel</span> Crowd Control</div>
                             <span className="text-[10px] bg-rail-danger/10 text-rail-danger border border-rail-danger/20 px-1.5 py-0.5 rounded font-bold animate-pulse">URGENT</span>
                        </div>
                        <p className="text-xs text-slate-300 mb-4 leading-relaxed relative z-10">Activate <strong className="text-white">Level 2 flow restrictions</strong> at Central Station.</p>
                         <div className="flex gap-2 relative z-10">
                            <button className="flex-1 bg-rail-danger text-white text-xs font-bold py-2 rounded hover:bg-rail-danger/90 flex items-center justify-center gap-1"><span className="material-symbols-outlined text-sm">warning</span> Activate</button>
                            <button className="px-3 py-2 rounded border border-white/10 text-slate-400 text-xs font-bold hover:text-white">Ignore</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
