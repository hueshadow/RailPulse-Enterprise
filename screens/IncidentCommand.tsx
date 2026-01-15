import React from 'react';
import { InteractiveMap } from '../components/InteractiveMap';

// Incident-specific stations for the map
const incidentStations = [
  { id: 's1', name: 'Station 4 (Incident)', lat: 40.7128, lng: -74.0060, status: 'critical' as const, line: 'Blue Line' },
  { id: 's2', name: 'Substation 7', lat: 40.7050, lng: -74.0150, status: 'warning' as const, line: 'Blue Line' },
  { id: 's3', name: 'Sector 4B', lat: 40.7200, lng: -74.0000, status: 'normal' as const, line: 'Blue Line' },
  { id: 's4', name: 'Central Station', lat: 40.7350, lng: -73.9900, status: 'normal' as const, line: 'Blue Line' },
];

export const IncidentCommand = () => {
  return (
    <div className="flex h-full bg-[#050910]">
      {/* Feed */}
      <aside className="glass-card rounded-xl flex flex-col overflow-hidden m-4 mr-0">
        <div className="p-3 border-b border-white/10 bg-white/5 backdrop-blur-sm flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
              <span className="w-1 h-3 bg-rail-danger rounded-full animate-pulse"></span>
              Incident Feed
            </h2>
            <button className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="p-3 rounded-lg backdrop-blur-sm border-l-2 bg-rail-danger/10 border-rail-danger hover:bg-rail-danger/15 transition-all duration-200 cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold bg-rail-danger text-black px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(239,68,68,0.4)]">P1</span>
                    <span className="text-[10px] font-mono text-slate-500">00:14:22</span>
                </div>
                <h3 className="text-sm font-medium text-white leading-tight mb-1 group-hover:text-quantix-purple transition-colors">Power Loss at Station 4</h3>
                <p className="text-[10px] text-slate-500 uppercase">Blue Line • Electrical</p>
            </div>
             <div className="p-3 rounded-lg backdrop-blur-sm border-l-2 bg-rail-warning/10 border-rail-warning hover:bg-rail-warning/15 transition-all duration-200 cursor-pointer group opacity-80">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold bg-rail-warning text-black px-1.5 py-0.5 rounded">P2</span>
                    <span className="text-[10px] font-mono text-slate-500">00:45:12</span>
                </div>
                <h3 className="text-sm font-medium text-white leading-tight mb-1 group-hover:text-quantix-purple transition-colors">Signal Delay - Sector 7</h3>
                <p className="text-[10px] text-slate-500 uppercase">Green Line • Signaling</p>
            </div>
             {/* Additional Incidents */}
             <div className="p-3 rounded-lg backdrop-blur-sm border-l-2 bg-rail-success/5 border-rail-success hover:bg-rail-success/10 transition-all duration-200 cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold bg-rail-success text-black px-1.5 py-0.5 rounded">P3</span>
                    <span className="text-[10px] font-mono text-slate-500">01:23:45</span>
                </div>
                <h3 className="text-sm font-medium text-white leading-tight mb-1 group-hover:text-quantix-purple transition-colors">HVAC Maintenance</h3>
                <p className="text-[10px] text-slate-500 uppercase">Central Station • Equipment</p>
            </div>
             <div className="p-3 rounded-lg backdrop-blur-sm border-l-2 bg-rail-success/5 border-rail-success hover:bg-rail-success/10 transition-all duration-200 cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold bg-rail-success text-black px-1.5 py-0.5 rounded">P3</span>
                    <span className="text-[10px] font-mono text-slate-500">02:15:30</span>
                </div>
                <h3 className="text-sm font-medium text-white leading-tight mb-1 group-hover:text-quantix-purple transition-colors">Ticket Gate Calibration</h3>
                <p className="text-[10px] text-slate-500 uppercase">North Gate • Systems</p>
            </div>
             <div className="p-3 rounded-lg backdrop-blur-sm border-l-2 bg-rail-success/5 border-rail-success hover:bg-rail-success/10 transition-all duration-200 cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold bg-rail-success text-black px-1.5 py-0.5 rounded">P4</span>
                    <span className="text-[10px] font-mono text-slate-500">03:45:00</span>
                </div>
                <h3 className="text-sm font-medium text-white leading-tight mb-1 group-hover:text-quantix-purple transition-colors">Platform Signage Update</h3>
                <p className="text-[10px] text-slate-500 uppercase">West Terminal • Planned</p>
            </div>
             <div className="p-3 rounded-lg backdrop-blur-sm border-l-2 bg-rail-success/5 border-rail-success hover:bg-rail-success/10 transition-all duration-200 cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold bg-rail-success text-black px-1.5 py-0.5 rounded">P4</span>
                    <span className="text-[10px] font-mono text-slate-500">04:12:18</span>
                </div>
                <h3 className="text-sm font-medium text-white leading-tight mb-1 group-hover:text-quantix-purple transition-colors">Cleaning Schedule</h3>
                <p className="text-[10px] text-slate-500 uppercase">Blue Line Depot • Routine</p>
            </div>
        </div>
      </aside>

      {/* Main Context */}
      <section className="flex-1 relative overflow-hidden flex flex-col p-4">
         <div className="pr-4">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-rail-danger font-bold text-xs uppercase tracking-widest drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">Critical Incident</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 font-mono text-xs">ID: INC-2024-892</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Power Loss at Station 4 (Blue Line)</h1>
                    <p className="text-slate-400 max-w-2xl text-sm">Reports of total power failure on Northbound platform. Emergency lighting active. Signals unresponsive in Sector 4B.</p>
                </div>
                <div className="glass-card-danger p-5 rounded-xl text-center animate-glow-pulse-danger">
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">SLA Remaining</div>
                    <div className="text-4xl font-mono font-bold text-rail-danger drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">00:14:22</div>
                </div>
            </div>
         </div>

         {/* Timeline */}
         <div className="px-6 py-4">
             <div className="relative">
                 <div className="absolute top-1/2 w-full h-0.5 bg-white/10 -translate-y-1/2"></div>
                 <div className="relative z-10 flex justify-between">
                     {['Detect', 'Confirm', 'Classify', 'Dispatch', 'Resolve', 'Review'].map((step, i) => (
                         <div key={step} className={`flex flex-col items-center gap-2 transition-all ${i < 3 ? 'opacity-100' : 'opacity-40'}`}>
                             <div className={`size-10 rounded-full flex items-center justify-center border-2 transition-all ${
                               i === 2
                                 ? 'bg-quantix-purple text-black border-quantix-purple shadow-[0_0_25px_rgba(37,192,244,0.6)] scale-125 animate-glow-pulse'
                                 : i < 2
                                   ? 'bg-rail-success/20 text-rail-success border-rail-success shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                                   : 'bg-slate-800/80 backdrop-blur-sm border-slate-600 text-slate-400'
                             }`}>
                                 <span className="material-symbols-outlined text-[18px]">{i < 2 ? 'check' : i === 2 ? 'radar' : 'pending'}</span>
                             </div>
                             <span className={`text-[10px] font-bold uppercase tracking-wider ${i === 2 ? 'text-quantix-purple' : i < 2 ? 'text-rail-success' : 'text-slate-500'}`}>{step}</span>
                         </div>
                     ))}
                 </div>
             </div>
         </div>

         <div className="flex-1 p-4 pt-2 grid grid-cols-2 gap-4 min-h-0">
             {/* Interactive Map */}
             <div className="glass-card rounded-xl overflow-hidden flex flex-col">
                  <div className="p-3 border-b border-white/10 bg-white/5 backdrop-blur-sm flex justify-between items-center">
                      <h3 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
                        <span className="w-1 h-3 bg-rail-danger rounded-full animate-pulse"></span>
                        Incident Map
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="size-2 bg-rail-danger rounded-full animate-ping"></span>
                        <span className="text-[10px] text-rail-danger font-bold">LIVE</span>
                      </div>
                  </div>
                  <div className="flex-1 relative">
                    <InteractiveMap
                      stations={incidentStations}
                      center={[40.7128, -74.0060]}
                      zoom={14}
                      showControls={false}
                      showHeatmap={false}
                      showLines={false}
                      incidentMode={true}
                      onStationClick={(station) => {
                        console.log('Station clicked:', station);
                      }}
                    />
                  </div>
             </div>

             {/* Audit Log */}
             <div className="glass-card rounded-xl flex flex-col overflow-hidden">
                 <div className="p-3 border-b border-white/10 bg-white/5 backdrop-blur-sm flex justify-between items-center">
                     <h3 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
                       <span className="w-1 h-3 bg-quantix-purple rounded-full"></span>
                       Audit Trail
                     </h3>
                     <button className="text-xs text-quantix-purple hover:text-white transition-colors px-2 py-1 rounded hover:bg-quantix-purple/10">Export</button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-rail-danger rounded-full mt-1.5 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:42:05</span>
                                 <span className="text-[10px] uppercase border border-rail-danger text-rail-danger px-1.5 py-0.5 rounded">Alert</span>
                             </div>
                             <p className="text-sm text-white mt-0.5">CRITICAL: Loss of signal communication with Sector 4B.</p>
                         </div>
                     </div>
                      <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-quantix-purple rounded-full mt-1.5 shadow-[0_0_8px_rgba(37,192,244,0.5)]"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:43:12</span>
                                 <span className="text-[10px] uppercase bg-quantix-purple/15 text-quantix-purple px-1.5 py-0.5 rounded border border-quantix-purple/30">User</span>
                                 <span className="text-xs text-slate-400">Cmdr. H. Vance</span>
                             </div>
                             <p className="text-sm text-slate-300 mt-0.5">Initiated P1 Protocol. Incident created manually.</p>
                         </div>
                     </div>
                     {/* Additional Audit Trail Entries */}
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-rail-warning rounded-full mt-1.5 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:44:30</span>
                                 <span className="text-[10px] uppercase bg-rail-warning/15 text-rail-warning px-1.5 py-0.5 rounded border border-rail-warning/30">Dispatch</span>
                             </div>
                             <p className="text-sm text-white mt-0.5">Technician T-102 dispatched to Station 4. ETA: 8 minutes.</p>
                         </div>
                     </div>
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-rail-success rounded-full mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:46:15</span>
                                 <span className="text-[10px] uppercase bg-rail-success/15 text-rail-success px-1.5 py-0.5 rounded border border-rail-success/30">Update</span>
                             </div>
                             <p className="text-sm text-white mt-0.5">Backup generators activated at Sector 4B. Emergency lighting restored.</p>
                         </div>
                     </div>
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-rail-success rounded-full mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:48:42</span>
                                 <span className="text-[10px] uppercase bg-rail-success/15 text-rail-success px-1.5 py-0.5 rounded border border-rail-success/30">Update</span>
                             </div>
                             <p className="text-sm text-white mt-0.5">Emergency services notified. Fire Station 12 responding.</p>
                         </div>
                     </div>
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-quantix-purple rounded-full mt-1.5 shadow-[0_0_8px_rgba(37,192,244,0.5)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:50:18</span>
                                 <span className="text-[10px] uppercase bg-quantix-purple/15 text-quantix-purple px-1.5 py-0.5 rounded border border-quantix-purple/30">User</span>
                                 <span className="text-xs text-slate-400">Ops Dir. M. Chen</span>
                             </div>
                             <p className="text-sm text-slate-300 mt-0.5">Command: Isolate power to affected track section initiated.</p>
                         </div>
                     </div>
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-rail-warning rounded-full mt-1.5 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:52:55</span>
                                 <span className="text-[10px] uppercase bg-rail-warning/15 text-rail-warning px-1.5 py-0.5 rounded border border-rail-warning/30">Alert</span>
                             </div>
                             <p className="text-sm text-white mt-0.5">Passenger evacuation in progress at Platform 2. Estimated 450 passengers affected.</p>
                         </div>
                     </div>
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-rail-success rounded-full mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:55:30</span>
                                 <span className="text-[10px] uppercase bg-rail-success/15 text-rail-success px-1.5 py-0.5 rounded border border-rail-success/30">Update</span>
                             </div>
                             <p className="text-sm text-white mt-0.5">Shuttle buses dispatched to Central Station. Arrival in 12 minutes.</p>
                         </div>
                     </div>
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-quantix-purple rounded-full mt-1.5 shadow-[0_0_8px_rgba(37,192,244,0.5)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:58:12</span>
                                 <span className="text-[10px] uppercase bg-quantix-purple/15 text-quantix-purple px-1.5 py-0.5 rounded border border-quantix-purple/30">User</span>
                                 <span className="text-xs text-slate-400">Cmdr. H. Vance</span>
                             </div>
                             <p className="text-sm text-slate-300 mt-0.5">SOP Step 2 completed. Power isolation verified. Initiating Step 3.</p>
                         </div>
                     </div>
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2.5 bg-rail-danger rounded-full mt-1.5 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                             <div className="w-px h-4 bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">11:00:45</span>
                                 <span className="text-[10px] uppercase border border-rail-danger text-rail-danger px-1.5 py-0.5 rounded">Alert</span>
                             </div>
                             <p className="text-sm text-white mt-0.5">Secondary power surge detected at Substation 7. Monitoring active.</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Right Sidebar: Playbook */}
      <aside className="glass-card rounded-xl flex flex-col overflow-hidden m-4 ml-0">
          <div className="p-3 border-b border-white/10 bg-white/5 backdrop-blur-sm flex justify-between items-center">
              <h2 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
                <span className="w-1 h-3 bg-quantix-purple rounded-full"></span>
                SOP Playbook
              </h2>
              <button className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5">
                <span className="material-symbols-outlined">expand_content</span>
              </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <div className="p-3 bg-rail-success/10 backdrop-blur-sm border border-rail-success/30 rounded-lg flex gap-3 opacity-60">
                  <div className="bg-rail-success text-black size-6 rounded flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                      <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div>
                      <h4 className="text-sm font-bold text-rail-success line-through">Verify Visuals</h4>
                  </div>
              </div>
               <div className="p-4 bg-quantix-purple/10 backdrop-blur-sm border border-quantix-purple/40 rounded-lg flex flex-col gap-3 shadow-[0_0_20px_rgba(46,92,255,0.15)] animate-glow-pulse">
                  <div className="flex gap-3">
                    <div className="border-2 border-quantix-purple text-quantix-purple size-6 rounded flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(46,92,255,0.3)]">
                        <div className="size-2.5 bg-quantix-purple rounded-sm"></div>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">Isolate Power</h4>
                        <p className="text-xs text-slate-400">Remotely cut power to Sector 4B track.</p>
                    </div>
                  </div>
                  <button className="w-full glass-button-solid text-xs font-bold py-2.5 rounded-lg">Execute Command</button>
              </div>
          </div>
          <div className="border-t border-white/10">
              <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <span className="w-1 h-3 bg-rail-success rounded-full"></span>
                    Comm Log
                  </span>
                  <div className="size-2.5 bg-rail-success rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className="flex-1 p-3 space-y-2 max-h-40 overflow-y-auto">
                  <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-lg rounded-tl-none border border-white/5">
                      <p className="text-[10px] text-quantix-purple font-bold">J. Doe (Site)</p>
                      <p className="text-xs text-slate-300">Team arriving at substation in 2 mins.</p>
                  </div>
              </div>
              <div className="p-3 border-t border-white/10">
                  <input className="w-full glass-input rounded-lg text-xs py-2 px-3" placeholder="Type message..." />
              </div>
          </div>
      </aside>
    </div>
  );
};
