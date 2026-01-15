import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { InteractiveMap } from '../components/InteractiveMap';

const data = [
  { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 30 }, { v: 25 }, { v: 40 }, { v: 35 }, { v: 50 }, { v: 45 }
];

const incidents = [
  // P1 - Critical
  { id: 'INC-2024-1847', time: '10:42 AM', title: 'Signal Failure at Central Station', loc: 'Line A • Track 4', status: 'Technician Dispatched', priority: 'P1' },
  { id: 'INC-2024-1846', time: '09:17 AM', title: 'Track Obstruction - Object on Line', loc: 'Line C • Mile 12.3', status: 'Clearing in Progress', priority: 'P1' },
  { id: 'INC-2024-1845', time: '08:55 AM', title: 'Power Supply Failure - Substation 7', loc: 'Line B • Zone 3', status: 'Rerouting Power', priority: 'P1' },
  // P2 - High Priority
  { id: 'INC-2024-1844', time: '10:28 AM', title: 'Door Malfunction - Train T-204', loc: 'Line A • Between Stations 5-6', status: 'Train Held', priority: 'P2' },
  { id: 'INC-2024-1843', time: '10:15 AM', title: 'Communication System Outage', loc: 'Line D • Full Segment', status: 'Investigating', priority: 'P2' },
  { id: 'INC-2024-1842', time: '09:45 AM', title: 'Escalator Failure - North Gate', loc: 'Station North Gate', status: 'Maintenance Assigned', priority: 'P2' },
  // P3 - Medium Priority
  { id: 'INC-2024-1841', time: '10:38 AM', title: 'Minor Obstruction on Platform', loc: 'Line B • Sector 7', status: 'Investigating', priority: 'P3' },
  { id: 'INC-2024-1840', time: '10:20 AM', title: 'HVAC System Warning', loc: 'Union Station', status: 'Monitoring', priority: 'P3' },
  { id: 'INC-2024-1839', time: '09:52 AM', title: 'Passenger Medical Emergency', loc: 'Line C • Station 15', status: 'Resolved', priority: 'P3' },
  { id: 'INC-2024-1838', time: '09:35 AM', title: 'Ticket Machine Out of Service', loc: 'West Terminal', status: 'Parts Ordered', priority: 'P3' },
  // P4 - Low Priority
  { id: 'INC-2024-1837', time: '09:15 AM', title: 'Scheduled Maintenance', loc: 'Line A • Overnight', status: 'Planned', priority: 'P4' },
  { id: 'INC-2024-1836', time: '08:45 AM', title: 'Platform Signage Update', loc: 'South Park Station', status: 'In Progress', priority: 'P4' },
  { id: 'INC-2024-1835', time: '08:30 AM', title: 'Cleaning Required - Car 112', loc: 'Line B • Depot', status: 'Scheduled', priority: 'P4' },
  { id: 'INC-2024-1834', time: '08:00 AM', title: 'Landscaping Work Notice', loc: 'Line D • Above Ground', status: 'Planned', priority: 'P4' },
  { id: 'INC-2024-1833', time: '07:45 AM', title: 'Advertising Display Maintenance', loc: 'Central Station', status: 'Pending Parts', priority: 'P4' },
  // Resolved
  { id: 'INC-2024-1832', time: '07:30 AM', title: 'Minor Delay - Signal Issue', loc: 'Line A • Resolved', status: 'Resolved', priority: 'P4' },
  { id: 'INC-2024-1831', time: '06:55 AM', title: 'Track Inspection Complete', loc: 'Line C • Full Line', status: 'Resolved', priority: 'P4' },
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
           <span className="text-[10px] bg-rail-danger/20 text-rail-danger px-2.5 py-1 rounded-full font-bold border border-rail-danger/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">3 CRITICAL</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
           {incidents.map((inc, i) => (
             <div key={i} className={`p-3 rounded-xl backdrop-blur-sm border-l-2 transition-all duration-200 cursor-pointer group ${
               inc.priority === 'P1'
                 ? 'bg-rail-danger/10 border-rail-danger hover:bg-rail-danger/15 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                 : inc.priority === 'P2'
                   ? 'bg-orange-500/10 border-orange-500 hover:bg-orange-500/15 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                   : inc.priority === 'P3'
                     ? 'bg-rail-warning/10 border-rail-warning hover:bg-rail-warning/15 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                     : inc.status === 'Resolved'
                       ? 'bg-rail-success/5 border-rail-success/50 hover:bg-rail-success/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                       : 'bg-rail-panel/60 border-quantix-purple hover:bg-rail-panel/80 hover:shadow-[0_0_15px_rgba(37,192,244,0.1)]'
             }`}>
                <div className="flex justify-between items-start mb-1">
                   <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                     inc.priority === 'P1' ? 'bg-rail-danger text-black shadow-[0_0_8px_rgba(239,68,68,0.4)]' :
                     inc.priority === 'P2' ? 'bg-orange-500 text-white shadow-[0_0_8px_rgba(245,158,11,0.4)]' :
                     'bg-slate-700 text-white'
                   }`}>{inc.priority}</span>
                   <span className="text-[10px] font-mono text-slate-400">{inc.time}</span>
                </div>
                <h4 className="text-sm font-medium text-white leading-tight mb-1 group-hover:text-quantix-purple transition-colors">{inc.title}</h4>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] text-slate-500 uppercase">{inc.loc}</span>
                   <span className={`text-[10px] font-bold ${
                     inc.priority === 'P1' ? 'text-rail-danger' :
                     inc.priority === 'P2' ? 'text-orange-400' :
                     inc.status === 'Resolved' ? 'text-rail-success' :
                     'text-slate-400'
                   }`}>{inc.status}</span>
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

      {/* Center: Interactive Map */}
      <div className="col-span-6 relative overflow-hidden">
        <InteractiveMap
          onStationClick={(station) => {
            console.log('Station clicked:', station);
          }}
        />
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
