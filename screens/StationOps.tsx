import React from 'react';

export const StationOps = () => {
    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-72 bg-rail-panel border-r border-rail-border flex flex-col">
                <div className="p-4 border-b border-rail-border">
                    <h2 className="text-lg font-bold text-white">Station Control</h2>
                    <p className="text-xs text-slate-400">Central Hub • Live Operations</p>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Staff Dispatch</h3>
                        <div className="space-y-2">
                             <div className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/5">
                                 <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-xs relative">
                                     AS <div className="absolute -bottom-1 -right-1 size-2.5 bg-green-500 border-2 border-rail-panel rounded-full"></div>
                                 </div>
                                 <div className="flex-1 min-w-0">
                                     <div className="text-sm font-bold text-white">A. Smith</div>
                                     <div className="text-xs text-slate-400 truncate">Security • Plat 1</div>
                                 </div>
                             </div>
                             <div className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/5">
                                 <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-xs relative">
                                     MK <div className="absolute -bottom-1 -right-1 size-2.5 bg-rail-warning border-2 border-rail-panel rounded-full"></div>
                                 </div>
                                 <div className="flex-1 min-w-0">
                                     <div className="text-sm font-bold text-white">M. Kim</div>
                                     <div className="text-xs text-slate-400 truncate">Maint • Esc UP-2</div>
                                 </div>
                             </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Infra Status</h3>
                         <div className="space-y-2">
                             <div className="flex justify-between p-2 bg-white/5 rounded border-l-2 border-green-500">
                                 <span className="text-sm text-slate-300">Elevators</span>
                                 <span className="flex gap-1"><span className="size-2 bg-green-500 rounded-full"></span><span className="size-2 bg-green-500 rounded-full"></span></span>
                             </div>
                             <div className="flex justify-between p-2 bg-white/5 rounded border-l-2 border-rail-warning">
                                 <span className="text-sm text-slate-300">Escalators</span>
                                 <span className="flex gap-1"><span className="size-2 bg-green-500 rounded-full"></span><span className="size-2 bg-rail-warning rounded-full animate-pulse"></span></span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            
            {/* Main Area */}
            <div className="flex-1 flex flex-col bg-black relative">
                 <div className="absolute top-4 left-4 z-10 flex gap-2">
                     <button className="bg-rail-panel border border-white/10 px-3 py-1.5 rounded text-sm text-white shadow-lg">Layers</button>
                     <button className="bg-rail-panel border border-white/10 px-3 py-1.5 rounded text-sm text-white shadow-lg">Heatmap</button>
                 </div>
                 
                 <div className="absolute top-4 right-4 z-10 flex gap-4">
                     <div className="glass p-3 rounded-lg min-w-[140px]">
                         <div className="text-[10px] uppercase font-bold text-slate-400">Gate Throughput</div>
                         <div className="text-2xl font-bold text-white font-mono">42 <span className="text-sm text-green-400">+5%</span></div>
                     </div>
                 </div>

                 {/* Map */}
                 <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                     <div 
                        className="w-[90%] h-[90%] rounded-xl border border-white/5 bg-cover bg-center opacity-80"
                        style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDk6uN4kX4BYkQNYgzTu92c48sm6cZZlDkItUCYX-nsHBz8TtlK4kz5Y9SFQD5lmErfagY8OzczBeXyU7HRQROov58BQoZvAa0iHLQo3awLO499G6Z88g7Id4IsbGEjC6mcpdrqxYcwK2EsjBqh9pgxWxcKm9mp-j28TcFMQPCwoQVzAVOUKP2_BkTMjOpTnsz9Ti8qJ1uMirKr4WoEZwcyB25myE0DqqfS6tU_dpk0eVI8lF7EPSEMDEysx09PmFC__qvSZkclbhc')`,
                            filter: 'hue-rotate(190deg) contrast(1.2) saturate(1.5)'
                        }}
                     >
                         <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
                             <div className="size-6 bg-rail-warning rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-bounce">
                                 <span className="material-symbols-outlined text-[14px] text-black font-bold">priority_high</span>
                             </div>
                             <div className="mt-2 bg-black/80 px-2 py-1 rounded text-xs text-white">Congestion</div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* CCTV Sidebar */}
            <div className="w-80 bg-rail-panel border-l border-rail-border flex flex-col">
                <div className="p-4 border-b border-rail-border flex justify-between">
                    <h3 className="font-bold text-white text-sm uppercase">Surveillance</h3>
                    <span className="material-symbols-outlined text-rail-primary cursor-pointer">grid_view</span>
                </div>
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                    <div className="rounded border border-rail-danger relative overflow-hidden group">
                         <div className="absolute top-2 left-2 bg-rail-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse z-10">MOTION</div>
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqBh_mmw95ECAPTZS-hWxog4DPe2yW5NFj2-GQpZrYuuEzIo543yX2KJ7ErFK413R1UI--G0jWCdHijdMrpbwtNDC8pwBI0jWh8YM1FS5qAnNeQFOM6kJ8ols1vHJRkUy2hg3XS5eS05-jvK5TKjtIK40eNN39o1XHHCSwb4q9-opEGPgMpPT3T_JQ8uhA0eoSxI8lmT5vuRQkKBkzBZ2WKyeRG-laXVI6osIJkkxH-682AFBQzSSv_o5vuHrtxpNm03uIUr1WEHA" className="w-full h-40 object-cover opacity-80" />
                         <div className="bg-rail-dark p-2 flex justify-between items-center">
                             <span className="text-xs text-white">Cam 04: Plat 1 N</span>
                             <div className="size-2 bg-rail-danger rounded-full"></div>
                         </div>
                    </div>
                    <div className="rounded border border-white/5 relative overflow-hidden group">
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgACOMCDZ4wT4IzLfiwJoRZW0EP8ZkWr7fiKB9sUC7i-RLrpKNNzbZOT0BJwO4T1JHzIlds1IjAqfnvEwX9obj3KxL8Ntm8FUJR_EKGGP5cuwHqMwPrYfafxB-e1D5qib1bYgsV0beoWCzevHqa6skI9t7DWEmfcCdO3p3jGW-WORTAennvbLSbtByIDInNWeWXd8ETJMJFg2Sm_QcxgUE4hr4URL3LhejzYsy60-Fz8k06U8ujAvN72c6mEC7tZMjZK7OeUFas-M" className="w-full h-40 object-cover opacity-60 grayscale group-hover:grayscale-0 transition" />
                         <div className="bg-rail-dark p-2 flex justify-between items-center">
                             <span className="text-xs text-white">Cam 01: Main Hall</span>
                             <div className="size-2 bg-green-500 rounded-full"></div>
                         </div>
                    </div>
                     <div className="rounded border border-white/5 relative overflow-hidden group">
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMhood9ZQT-ueuLyPdNACQGw9y3UhCVSwUktx9GvDSoacgrXE7M5nWPUjtOVD9s5mce_7NJlHmS-ikkJTk2nCWCEnpQ4LW-X0iETTdAHlZogTDoTiS7A4OQ4_Bl0Yf2svOZPspZv378o34Lkz5zRxcQBMF2VYIf5t3JHZLgwCm5bRAcc4cLmpgbcpWplA1uSsZrHL-QgW4-TO84p1a1tLU-LjoaSoMiKthNa4V1aUHARCXC0SZPufxSG_tqOwneKIxZduKUok8zNo" className="w-full h-40 object-cover opacity-60 grayscale group-hover:grayscale-0 transition" />
                         <div className="bg-rail-dark p-2 flex justify-between items-center">
                             <span className="text-xs text-white">Cam 02: East Gate</span>
                             <div className="size-2 bg-green-500 rounded-full"></div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
