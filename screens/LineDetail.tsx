import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [{v:40}, {v:35}, {v:38}, {v:20}, {v:25}, {v:10}, {v:15}, {v:12}];
const barData = [{v:20}, {v:35}, {v:25}, {v:60, fill:'#f59e0b'}, {v:30}, {v:40}, {v:25}, {v:20}];

export const LineDetail = () => {
  return (
    <div className="p-6 h-full overflow-y-auto">
       <div className="flex justify-between items-center mb-6">
           <h1 className="text-xl font-bold text-white">BLUE LINE <span className="text-slate-400 font-normal text-lg">– Live Monitor</span></h1>
           <div className="flex gap-2">
               <button className="px-4 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-xs text-white hover:bg-white/10 hover:border-white/20 transition-all">All Stations</button>
               <button className="px-4 py-1.5 rounded-lg bg-rail-primary/15 backdrop-blur-sm border border-rail-primary/30 text-xs text-rail-primary hover:bg-rail-primary/25 transition-all shadow-[0_0_10px_rgba(37,192,244,0.1)]">Northbound</button>
           </div>
       </div>

       {/* Schematic */}
       <div className="glass-card rounded-xl p-8 mb-6 relative overflow-hidden h-40 flex items-center">
            {/* Track */}
            <div className="w-full h-2 bg-slate-700/60 rounded-full relative backdrop-blur-sm">
                 <div className="absolute left-0 top-0 h-full bg-rail-primary/50 w-[65%] rounded-full shadow-[0_0_10px_rgba(37,192,244,0.3)]"></div>
                 <div className="absolute left-[65%] top-0 h-full bg-rail-warning/60 w-[15%] rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
            </div>

            {/* Stations */}
            {[5, 25, 50, 70, 95].map((pos, i) => (
                <div key={i} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer" style={{left: `${pos}%`}}>
                     <div className={`size-5 rounded-full border-2 border-rail-primary transition-all duration-200 ${
                       pos === 50
                         ? 'bg-white size-6 border-[3px] shadow-[0_0_20px_rgba(37,192,244,0.7)] ring-4 ring-rail-primary/20'
                         : 'bg-[#0B1116] group-hover:bg-rail-primary group-hover:shadow-[0_0_12px_rgba(37,192,244,0.5)]'
                     }`}></div>
                     <span className={`absolute top-6 text-xs font-medium whitespace-nowrap ${pos === 50 ? 'text-white font-bold' : 'text-slate-500 group-hover:text-white transition-colors'}`}>
                        {['South Gateway', 'Market Dist', 'Central Station', 'Tech Park', 'North Harbor'][i]}
                     </span>

                     {/* Active Tooltip for Center */}
                     {pos === 50 && (
                         <div className="absolute bottom-8 mb-2 glass-card p-3 rounded-xl shadow-xl w-48 z-10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white font-bold text-sm">Central Station</span>
                                <span className="text-[10px] bg-rail-success/20 text-rail-success px-1.5 py-0.5 rounded-full border border-rail-success/30">Active</span>
                            </div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Capacity</span>
                                <span className="text-rail-warning font-bold">88%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-700/60 rounded-full overflow-hidden backdrop-blur-sm">
                                <div className="h-full bg-rail-warning w-[88%] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
                            </div>
                         </div>
                     )}
                </div>
            ))}

            {/* Trains */}
            {[15, 42, 85].map((pos, i) => (
                <div key={i} className="absolute top-1/2 -translate-y-[12px] flex flex-col items-center z-20" style={{left: `${pos}%`}}>
                    <div className="bg-[#0B1116]/80 backdrop-blur-sm border border-rail-primary text-rail-primary px-2 py-1 rounded text-[10px] font-mono mb-1 shadow-[0_0_15px_rgba(37,192,244,0.4)]">TR-{104+i}</div>
                    <div className="w-10 h-5 bg-gradient-to-r from-rail-primary to-[#1a9cc9] rounded flex items-center justify-center shadow-[0_0_15px_rgba(37,192,244,0.6)]">
                         <span className="material-symbols-outlined text-black text-[16px] rotate-90 font-bold">arrow_right_alt</span>
                    </div>
                </div>
            ))}

            <div className="absolute left-[32%] top-1/2 -translate-y-1/2 glass px-3 py-1 rounded-lg">
                <span className="text-[10px] text-slate-400 font-mono">HEADWAY: <span className="text-white font-bold">3m 20s</span></span>
            </div>
       </div>

       <div className="grid grid-cols-3 gap-6">
           <div className="glass-card p-5 h-64 flex flex-col">
               <div className="flex justify-between items-center mb-4">
                   <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                     <span className="w-1 h-4 bg-rail-primary rounded-full"></span>
                     Punctuality Trend (7d)
                   </h3>
                   <span className="text-xs text-rail-primary font-mono bg-rail-primary/10 px-2 py-1 rounded border border-rail-primary/20">98.2%</span>
               </div>
               <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#25c0f4" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#25c0f4" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="v" stroke="#25c0f4" fill="url(#grad1)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
               </div>
           </div>

           <div className="glass-card p-5 h-64 flex flex-col">
               <div className="flex justify-between items-center mb-4">
                   <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                     <span className="w-1 h-4 bg-rail-success rounded-full"></span>
                     Headway Variance
                   </h3>
                   <span className="text-xs text-slate-400 font-mono">24h</span>
               </div>
               <div className="flex-1 flex items-end justify-between gap-1 px-2">
                    {barData.map((d, i) => (
                        <div key={i} className="w-full rounded-t-sm opacity-80 hover:opacity-100 transition-all cursor-pointer hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{height: `${d.v}%`, backgroundColor: d.fill || '#10b981'}}></div>
                    ))}
               </div>
               <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2 pt-1 border-t border-white/5">
                   <span>00:00</span><span>12:00</span><span>23:59</span>
               </div>
           </div>

           <div className="glass-card p-5 h-64">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                      Pax Forecast
                    </h3>
                    <span className="text-xs text-slate-400">AI Prediction</span>
                </div>
                <div className="w-full h-full relative">
                    <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-32">
                         <path d="M0 30 Q50 10 100 25 L100 45 Q50 30 0 40 Z" fill="#9cb2ba" fillOpacity="0.1" />
                         <path d="M0 35 Q50 20 100 35" fill="none" stroke="#fff" strokeDasharray="3,2" strokeWidth="1.5" />
                    </svg>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 glass px-2 py-1 rounded text-[10px] text-rail-primary font-mono">Peak: 18:45</div>
                </div>
           </div>
       </div>
    </div>
  );
};
