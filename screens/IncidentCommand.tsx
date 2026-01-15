import React from 'react';

export const IncidentCommand = () => {
  return (
    <div className="flex h-full">
      {/* Feed */}
      <aside className="w-80 bg-[#0f172a]/90 backdrop-blur-xl border-r border-white/10 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.3)]">
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-quantix-purple/5 to-transparent">
            <h2 className="text-lg font-bold text-white">Incident Feed</h2>
            <div className="relative mt-2">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
                <input className="w-full glass-input rounded-lg text-sm py-2 pl-10" placeholder="Search..." />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="p-3 bg-white/5 backdrop-blur-sm border-l-4 border-rail-danger rounded-xl cursor-pointer hover:bg-white/10 transition-all group shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold bg-rail-danger text-black px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(239,68,68,0.4)]">P1</span>
                    <span className="text-[10px] font-mono text-slate-400">00:14:22</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-quantix-purple transition-colors">Power Loss at Station 4</h3>
                <p className="text-xs text-slate-400 mt-1">Blue Line • Electrical</p>
            </div>
             <div className="p-3 backdrop-blur-sm border border-white/10 rounded-xl opacity-60 hover:opacity-100 cursor-pointer transition-all hover:bg-white/5">
                <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold bg-rail-warning text-black px-1.5 py-0.5 rounded">P2</span>
                    <span className="text-[10px] font-mono text-slate-400">00:45:12</span>
                </div>
                <h3 className="text-sm font-bold text-slate-200">Signal Delay - Sector 7</h3>
                <p className="text-xs text-slate-400 mt-1">Green Line • Signaling</p>
            </div>
        </div>
      </aside>

      {/* Main Context */}
      <section className="flex-1 bg-[#020617] flex flex-col relative overflow-hidden">
         <div className="p-6 pb-2">
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

         <div className="flex-1 p-6 pt-2 grid grid-cols-2 gap-6 min-h-0">
             {/* Map Placeholder */}
             <div className="relative rounded-xl overflow-hidden border border-white/10 group glass-card">
                  <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuArWJgDy7OnxqwDwyhKvEayi8P9-Q7LhLfhg4txIt-BEc29ZpQizNaSSj_MbRC9DzCkq8fUiFch2e4ElqxWOV7wa8nZ_nKwdmgg8xwLhQd4jHHjvaCiOBWo99fI1_6JjceBWFycix8I3WAM6LFBdQ3MQOCIssuJREkwIMmRmoXvW9FcN6Adzw7sUHookRjGBDyNjRHKo4gGhoyAcbepBVbbGaVLuKurvSye5O5BJEA7Q7-NpTwD-NNRRjmoLOctqcWkPblmHRQ4W6k')`}}></div>
                  <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <div className="size-2 bg-rail-danger rounded-full animate-ping"></div>
                      <span className="text-xs font-bold text-white">LIVE FEED - CAM 04B</span>
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
                 </div>
             </div>
         </div>
      </section>

      {/* Right Sidebar: Playbook */}
      <aside className="w-80 border-l border-white/10 bg-[#0f172a]/90 backdrop-blur-xl flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.3)]">
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-quantix-purple/5 to-transparent">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">SOP Playbook</h2>
              <div className="space-y-3">
                  <div className="p-3 bg-rail-success/10 backdrop-blur-sm border border-rail-success/30 rounded-xl flex gap-3 opacity-60">
                      <div className="bg-rail-success text-black size-6 rounded flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                          <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                      <div>
                          <h4 className="text-sm font-bold text-rail-success line-through">Verify Visuals</h4>
                      </div>
                  </div>
                   <div className="p-4 bg-quantix-purple/10 backdrop-blur-sm border border-quantix-purple/40 rounded-xl flex flex-col gap-3 shadow-[0_0_20px_rgba(37,192,244,0.15)] animate-glow-pulse">
                      <div className="flex gap-3">
                        <div className="border-2 border-quantix-purple text-quantix-purple size-6 rounded flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(37,192,244,0.3)]">
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
          </div>
          <div className="flex-1 flex flex-col justify-end p-4">
               <div className="h-48 glass-card rounded-xl flex flex-col overflow-hidden">
                   <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                       <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                         <span className="w-1 h-3 bg-rail-success rounded-full"></span>
                         Comm Log
                       </span>
                       <div className="size-2.5 bg-rail-success rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                   </div>
                   <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                       <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xl rounded-tl-none border border-white/5">
                           <p className="text-[10px] text-quantix-purple font-bold">J. Doe (Site)</p>
                           <p className="text-xs text-slate-300">Team arriving at substation in 2 mins.</p>
                       </div>
                   </div>
                   <div className="p-3 border-t border-white/10">
                       <input className="w-full glass-input rounded-lg text-xs py-2 px-3" placeholder="Type message..." />
                   </div>
               </div>
          </div>
      </aside>
    </div>
  );
};
