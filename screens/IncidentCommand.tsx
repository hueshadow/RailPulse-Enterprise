import React from 'react';

export const IncidentCommand = () => {
  return (
    <div className="flex h-full">
      {/* Feed */}
      <aside className="w-80 bg-[#0f172a] border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
            <h2 className="text-lg font-bold text-white">Incident Feed</h2>
            <div className="relative mt-2">
                <span className="material-symbols-outlined absolute left-2 top-1.5 text-slate-500 text-lg">search</span>
                <input className="w-full bg-white/5 border-none rounded text-sm py-1.5 pl-8 text-white focus:ring-1 focus:ring-rail-primary" placeholder="Search..." />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
            <div className="p-3 bg-white/5 border-l-4 border-rail-danger rounded cursor-pointer">
                <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold bg-rail-danger text-black px-1 rounded">P1</span>
                    <span className="text-[10px] font-mono text-slate-400">00:14:22</span>
                </div>
                <h3 className="text-sm font-bold text-white">Power Loss at Station 4</h3>
                <p className="text-xs text-slate-400 mt-1">Blue Line • Electrical</p>
            </div>
             <div className="p-3 border border-white/5 rounded opacity-60 hover:opacity-100 cursor-pointer">
                <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold bg-rail-warning text-black px-1 rounded">P2</span>
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
                        <span className="text-rail-danger font-bold text-xs uppercase tracking-widest">Critical Incident</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 font-mono text-xs">ID: INC-2024-892</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Power Loss at Station 4 (Blue Line)</h1>
                    <p className="text-slate-400 max-w-2xl text-sm">Reports of total power failure on Northbound platform. Emergency lighting active. Signals unresponsive in Sector 4B.</p>
                </div>
                <div className="glass p-4 rounded-xl text-center">
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">SLA Remaining</div>
                    <div className="text-3xl font-mono font-bold text-rail-danger animate-pulse">00:14:22</div>
                </div>
            </div>
         </div>

         {/* Timeline */}
         <div className="px-6 py-4">
             <div className="relative">
                 <div className="absolute top-1/2 w-full h-0.5 bg-white/10 -translate-y-1/2"></div>
                 <div className="relative z-10 flex justify-between">
                     {['Detect', 'Confirm', 'Classify', 'Dispatch', 'Resolve', 'Review'].map((step, i) => (
                         <div key={step} className={`flex flex-col items-center gap-2 ${i < 3 ? 'opacity-100' : 'opacity-40'}`}>
                             <div className={`size-8 rounded-full flex items-center justify-center border ${i === 2 ? 'bg-rail-primary text-black border-rail-primary shadow-[0_0_15px_rgba(37,192,244,0.5)] scale-125' : i < 2 ? 'bg-rail-success/20 text-rail-success border-rail-success' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>
                                 <span className="material-symbols-outlined text-[16px]">{i < 2 ? 'check' : i === 2 ? 'radar' : 'pending'}</span>
                             </div>
                             <span className={`text-[10px] font-bold uppercase tracking-wider ${i === 2 ? 'text-rail-primary' : i < 2 ? 'text-rail-success' : 'text-slate-500'}`}>{step}</span>
                         </div>
                     ))}
                 </div>
             </div>
         </div>

         <div className="flex-1 p-6 pt-2 grid grid-cols-2 gap-6 min-h-0">
             {/* Map Placeholder */}
             <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                  <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuArWJgDy7OnxqwDwyhKvEayi8P9-Q7LhLfhg4txIt-BEc29ZpQizNaSSj_MbRC9DzCkq8fUiFch2e4ElqxWOV7wa8nZ_nKwdmgg8xwLhQd4jHHjvaCiOBWo99fI1_6JjceBWFycix8I3WAM6LFBdQ3MQOCIssuJREkwIMmRmoXvW9FcN6Adzw7sUHookRjGBDyNjRHKo4gGhoyAcbepBVbbGaVLuKurvSye5O5BJEA7Q7-NpTwD-NNRRjmoLOctqcWkPblmHRQ4W6k')`}}></div>
                  <div className="absolute top-4 left-4 glass px-2 py-1 rounded flex items-center gap-2">
                      <div className="size-2 bg-rail-danger rounded-full animate-ping"></div>
                      <span className="text-xs font-bold text-white">LIVE FEED - CAM 04B</span>
                  </div>
             </div>
             
             {/* Audit Log */}
             <div className="glass rounded-xl flex flex-col overflow-hidden">
                 <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
                     <h3 className="text-xs font-bold uppercase text-slate-300">Audit Trail</h3>
                     <button className="text-xs text-rail-primary">Export</button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2 bg-rail-danger rounded-full mt-1.5 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                             <div className="w-px h-full bg-white/10 my-1"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:42:05</span>
                                 <span className="text-[10px] uppercase border border-rail-danger text-rail-danger px-1 rounded">Alert</span>
                             </div>
                             <p className="text-sm text-white mt-0.5">CRITICAL: Loss of signal communication with Sector 4B.</p>
                         </div>
                     </div>
                      <div className="flex gap-3">
                         <div className="flex flex-col items-center">
                             <div className="size-2 bg-rail-primary rounded-full mt-1.5"></div>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs font-mono text-slate-500">10:43:12</span>
                                 <span className="text-[10px] uppercase bg-rail-primary/10 text-rail-primary px-1 rounded">User</span>
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
      <aside className="w-80 border-l border-white/10 bg-[#0f172a] flex flex-col">
          <div className="p-4 border-b border-white/10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">SOP Playbook</h2>
              <div className="space-y-3">
                  <div className="p-3 bg-rail-success/10 border border-rail-success/30 rounded flex gap-3 opacity-60">
                      <div className="bg-rail-success text-black size-5 rounded flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                      <div>
                          <h4 className="text-sm font-bold text-rail-success line-through">Verify Visuals</h4>
                      </div>
                  </div>
                   <div className="p-3 bg-rail-primary/10 border border-rail-primary/40 rounded flex flex-col gap-2 shadow-[0_0_15px_rgba(37,192,244,0.1)]">
                      <div className="flex gap-3">
                        <div className="border border-rail-primary text-rail-primary size-5 rounded flex items-center justify-center shrink-0">
                            <div className="size-2 bg-rail-primary rounded-sm"></div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">Isolate Power</h4>
                            <p className="text-xs text-slate-400">Remotely cut power to Sector 4B track.</p>
                        </div>
                      </div>
                      <button className="w-full bg-rail-primary text-black text-xs font-bold py-1.5 rounded hover:bg-white transition">Execute Command</button>
                  </div>
              </div>
          </div>
          <div className="flex-1 flex flex-col justify-end p-4">
               <div className="h-48 bg-[#020617] rounded border border-white/10 flex flex-col">
                   <div className="p-2 border-b border-white/10 flex justify-between">
                       <span className="text-xs font-bold text-slate-500 uppercase">Comm Log</span>
                       <div className="size-2 bg-rail-success rounded-full animate-pulse"></div>
                   </div>
                   <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                       <div className="bg-white/5 p-2 rounded rounded-tl-none">
                           <p className="text-[10px] text-rail-primary font-bold">J. Doe (Site)</p>
                           <p className="text-xs text-slate-300">Team arriving at substation in 2 mins.</p>
                       </div>
                   </div>
                   <div className="p-2 border-t border-white/10">
                       <input className="w-full bg-transparent text-xs text-white border-none p-0 focus:ring-0" placeholder="Type message..." />
                   </div>
               </div>
          </div>
      </aside>
    </div>
  );
};
