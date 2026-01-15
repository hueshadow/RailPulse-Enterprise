import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const data = [
  { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 30 }, { v: 25 }, { v: 40 }, { v: 35 }, { v: 50 }, { v: 45 }
];

const incidents = [
  { id: 'P1', time: '10:42 AM', title: 'Signal Failure at Central Stn', loc: 'Line A • Track 4', status: 'Technician Dispatched', priority: 'P1' },
  { id: 'P3', time: '10:38 AM', title: 'Minor Obstruction', loc: 'Line B • Sector 7', status: 'Investigating', priority: 'P3' },
  { id: 'P4', time: '09:15 AM', title: 'Maintenance Scheduled', loc: 'Line A • Overnight', status: 'Planned', priority: 'P4' },
];

export const NetworkOverview = () => {
  return (
    <div className="grid grid-cols-12 h-full gap-px bg-quantix-border/50">
      {/* Left Sidebar: Incidents */}
      <div className="col-span-3 bg-quantix-black/80 backdrop-blur-sm flex flex-col border-r border-quantix-border/50">
        <div className="p-4 border-b border-quantix-border/50 flex justify-between items-center bg-rail-panel/60 backdrop-blur-sm">
           <h3 className="text-sm font-bold uppercase flex items-center gap-2">
             <span className="material-symbols-outlined text-rail-danger animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">campaign</span> Incident Feed
           </h3>
           <span className="text-[10px] bg-rail-danger/20 text-rail-danger px-2.5 py-1 rounded-full font-bold border border-rail-danger/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">2 CRITICAL</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
           {incidents.map((inc, i) => (
             <div key={i} className={`p-3 rounded-xl backdrop-blur-sm border-l-2 transition-all duration-200 cursor-pointer group ${
               inc.priority === 'P1'
                 ? 'bg-rail-danger/10 border-rail-danger hover:bg-rail-danger/15 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                 : inc.priority === 'P3'
                   ? 'bg-rail-warning/10 border-rail-warning hover:bg-rail-warning/15 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                   : 'bg-rail-panel/60 border-quantix-purple hover:bg-rail-panel/80 hover:shadow-[0_0_15px_rgba(37,192,244,0.1)]'
             }`}>
                <div className="flex justify-between items-start mb-1">
                   <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${inc.priority === 'P1' ? 'bg-rail-danger text-black shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-slate-700 text-white'}`}>{inc.priority}</span>
                   <span className="text-[10px] font-mono text-slate-400">{inc.time}</span>
                </div>
                <h4 className="text-sm font-medium text-white leading-tight mb-1 group-hover:text-quantix-purple transition-colors">{inc.title}</h4>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] text-slate-500 uppercase">{inc.loc}</span>
                   <span className={`text-[10px] font-bold ${inc.priority === 'P1' ? 'text-rail-danger' : 'text-slate-400'}`}>{inc.status}</span>
                </div>
             </div>
           ))}
        </div>
        <div className="p-4 border-t border-quantix-border/50 bg-rail-panel/40 backdrop-blur-sm">
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
            <span className="w-1 h-3 bg-rail-danger rounded-full"></span>
            Alarm Trend (24h)
          </h4>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <YAxis hide domain={[0, 60]} />
                <Area type="monotone" dataKey="v" stroke="#ef4444" fillOpacity={1} fill="url(#colorV)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Center: Map */}
      <div className="col-span-6 bg-[#050910] relative overflow-hidden group">
         <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen" 
          style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyc40qarNFYr7Nn_IZudrfPlfX5tRc_4MjEXM-s458pFebMLue_GXsLUgGJvxGhJ1_znMrJrBFcL23ICxHZ5iPc_fApys1m0F-2HLErrLJW9ld48DIH7uaWzpch5V13f9384069FZ6Cm2E2nnMc1_Z5S390g0E4OdYy2FJB_39ziozBv_tz2VaYYSAoKYORxptI_7jSCbfRmY-ypaKWimbXypWLsPYZduXyYsKmccY--4QXSpJbGjz6zD-GFro62MqNyCEI13wpwA')`}}
         />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(37,192,244,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,192,244,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         
         {/* Map Overlay SVG */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 100 400 Q 250 200 400 300 T 800 200" fill="none" stroke="#258cf4" strokeWidth="3" className="drop-shadow-[0_0_5px_rgba(37,140,244,0.5)]" />
            <path d="M 200 600 C 300 500 400 400 500 300 S 700 100 900 150" fill="none" stroke="#8b5cf6" strokeWidth="3" className="opacity-80" />
            <path d="M 300 100 L 400 300 L 500 600" fill="none" stroke="#ef4444" strokeWidth="3" className="opacity-90" />
            
            {/* Station Node */}
            <g transform="translate(400, 300)">
               <circle r="6" fill="#111" stroke="white" strokeWidth="2" className="animate-pulse" />
               <text x="15" y="5" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter" opacity="0.8">CENTRAL STN</text>
            </g>

             {/* Train Dot */}
             <circle r="4" fill="#00e5ff" className="drop-shadow-[0_0_8px_#00e5ff]">
               <animateMotion dur="20s" repeatCount="indefinite" path="M 100 400 Q 250 200 400 300 T 800 200" />
             </circle>
             {/* Problem Dot */}
             <circle cx="450" cy="450" r="4" fill="#ef4444" className="animate-ping" />
         </svg>

         {/* Bottom Controls */}
         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
            <div className="glass rounded-xl p-3 flex items-center gap-4 border border-quantix-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
               <button className="size-9 rounded-full bg-gradient-to-br from-quantix-purple to-[#1a9cc9] text-black flex items-center justify-center hover:scale-105 transition shadow-[0_0_15px_rgba(37,192,244,0.4)]">
                 <span className="material-symbols-outlined">play_arrow</span>
               </button>
               <div className="flex-1 relative h-1.5 bg-white/10 rounded-full backdrop-blur-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-[85%] bg-gradient-to-r from-quantix-purple to-[#1a9cc9] rounded-full shadow-[0_0_8px_rgba(37,192,244,0.5)]"></div>
                  <div className="absolute left-[85%] top-1/2 -translate-y-1/2 size-4 bg-white rounded-full shadow-[0_0_12px_white] ring-2 ring-quantix-purple/30"></div>
               </div>
               <span className="text-xs font-mono text-white px-2 py-1 bg-rail-success/20 rounded border border-rail-success/30 animate-pulse">LIVE</span>
            </div>
         </div>
      </div>

      {/* Right: Stats */}
      <div className="col-span-3 bg-quantix-black/80 backdrop-blur-sm border-l border-quantix-border/50 flex flex-col p-4 gap-4">
         <div className="glass-card p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-1 h-3 bg-quantix-purple rounded-full"></span>
              Line Delays
            </h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-white">
                     <span className="size-2.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]"></span> Line A
                  </div>
                  <span className="text-xs font-mono font-bold text-rail-danger bg-rail-danger/15 px-2 py-0.5 rounded-full border border-rail-danger/30">+12m</span>
               </div>
               <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-white">
                     <span className="size-2.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(139,92,246,0.5)]"></span> Line B
                  </div>
                  <span className="text-xs font-mono font-bold text-rail-success bg-rail-success/15 px-2 py-0.5 rounded-full border border-rail-success/30">On Time</span>
               </div>
               <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-white">
                     <span className="size-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]"></span> Line C
                  </div>
                  <span className="text-xs font-mono font-bold text-rail-warning bg-rail-warning/15 px-2 py-0.5 rounded-full border border-rail-warning/30">+4m</span>
               </div>
            </div>
         </div>

         <div className="glass-card p-4 flex-1">
             <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
               <span className="w-1 h-3 bg-rail-warning rounded-full"></span>
               Crowding Top 5
             </h3>
             <div className="space-y-4">
                 {[{n:'Union Station', v:92, c:'rail-danger'}, {n:'West Term', v:85, c:'rail-warning'}, {n:'North Gate', v:45, c:'rail-success'}].map((st, i) => (
                    <div key={i} className="group">
                       <div className="flex justify-between text-xs mb-1">
                          <span className="text-white group-hover:text-quantix-purple transition-colors">{st.n}</span>
                          <span className="font-mono">{st.v}%</span>
                       </div>
                       <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                          <div className={`h-full bg-${st.c} rounded-full transition-all duration-500`} style={{width: `${st.v}%`, boxShadow: st.c === 'rail-danger' ? '0 0 8px rgba(239,68,68,0.4)' : st.c === 'rail-warning' ? '0 0 8px rgba(245,158,11,0.3)' : '0 0 8px rgba(16,185,129,0.3)'}}></div>
                       </div>
                    </div>
                 ))}
             </div>
         </div>
      </div>
    </div>
  );
};
