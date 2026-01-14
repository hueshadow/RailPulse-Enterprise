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
    <div className="grid grid-cols-12 h-full gap-px bg-rail-border">
      {/* Left Sidebar: Incidents */}
      <div className="col-span-3 bg-rail-dark flex flex-col border-r border-rail-border">
        <div className="p-4 border-b border-rail-border flex justify-between items-center bg-rail-panel/50">
           <h3 className="text-sm font-bold uppercase flex items-center gap-2">
             <span className="material-symbols-outlined text-rail-danger">campaign</span> Incident Feed
           </h3>
           <span className="text-[10px] bg-rail-danger/20 text-rail-danger px-2 py-0.5 rounded font-bold">2 CRITICAL</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
           {incidents.map((inc, i) => (
             <div key={i} className={`p-3 rounded border-l-2 ${inc.priority === 'P1' ? 'bg-rail-danger/10 border-rail-danger' : inc.priority === 'P3' ? 'bg-rail-warning/10 border-rail-warning' : 'bg-rail-panel border-rail-primary'} hover:bg-white/5 cursor-pointer transition-colors`}>
                <div className="flex justify-between items-start mb-1">
                   <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${inc.priority === 'P1' ? 'bg-rail-danger text-black' : 'bg-slate-700 text-white'}`}>{inc.priority}</span>
                   <span className="text-[10px] font-mono text-slate-400">{inc.time}</span>
                </div>
                <h4 className="text-sm font-medium text-white leading-tight mb-1">{inc.title}</h4>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] text-slate-500 uppercase">{inc.loc}</span>
                   <span className={`text-[10px] font-bold ${inc.priority === 'P1' ? 'text-rail-danger' : 'text-slate-400'}`}>{inc.status}</span>
                </div>
             </div>
           ))}
        </div>
        <div className="p-4 border-t border-rail-border bg-rail-panel/30">
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Alarm Trend (24h)</h4>
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
            <div className="glass rounded-xl p-3 flex items-center gap-4">
               <button className="size-8 rounded-full bg-rail-primary text-black flex items-center justify-center hover:scale-105 transition">
                 <span className="material-symbols-outlined">play_arrow</span>
               </button>
               <div className="flex-1 relative h-1 bg-white/20 rounded-full">
                  <div className="absolute left-0 top-0 bottom-0 w-[85%] bg-rail-primary rounded-full"></div>
                  <div className="absolute left-[85%] top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
               </div>
               <span className="text-xs font-mono text-white">LIVE</span>
            </div>
         </div>
      </div>

      {/* Right: Stats */}
      <div className="col-span-3 bg-rail-dark border-l border-rail-border flex flex-col p-4 gap-4">
         <div className="glass rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Line Delays</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-white">
                     <span className="size-2 rounded-full bg-blue-500"></span> Line A
                  </div>
                  <span className="text-xs font-mono font-bold text-rail-danger bg-rail-danger/10 px-1.5 rounded">+12m</span>
               </div>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-white">
                     <span className="size-2 rounded-full bg-purple-500"></span> Line B
                  </div>
                  <span className="text-xs font-mono font-bold text-rail-success text-rail-success/10 px-1.5 rounded">On Time</span>
               </div>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-white">
                     <span className="size-2 rounded-full bg-red-500"></span> Line C
                  </div>
                  <span className="text-xs font-mono font-bold text-rail-warning bg-rail-warning/10 px-1.5 rounded">+4m</span>
               </div>
            </div>
         </div>

         <div className="glass rounded-xl p-4 flex-1">
             <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Crowding Top 5</h3>
             <div className="space-y-4">
                 {[{n:'Union Station', v:92, c:'bg-rail-danger'}, {n:'West Term', v:85, c:'bg-rail-warning'}, {n:'North Gate', v:45, c:'bg-rail-success'}].map((st, i) => (
                    <div key={i}>
                       <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">{st.n}</span>
                          <span className="font-mono">{st.v}%</span>
                       </div>
                       <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${st.c}`} style={{width: `${st.v}%`}}></div>
                       </div>
                    </div>
                 ))}
             </div>
         </div>
      </div>
    </div>
  );
};
