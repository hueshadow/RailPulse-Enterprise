import React, { useState } from 'react';

export const FieldService = () => {
    const [tab, setTab] = useState<'inbox' | 'detail' | 'scanner'>('inbox');

    return (
        <div className="flex justify-center h-full bg-[#0B1116] p-4">
             {/* Mobile Frame */}
             <div className="w-full max-w-[380px] bg-[#101e22] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl relative">
                
                {/* Header */}
                <div className="h-14 bg-[#162024] flex items-center justify-between px-4 border-b border-white/5 shrink-0 z-20">
                    <div className="flex items-center gap-2">
                        {tab !== 'inbox' && (
                            <button onClick={() => setTab('inbox')} className="text-white"><span className="material-symbols-outlined">arrow_back</span></button>
                        )}
                        <h2 className="text-white font-bold">{tab === 'inbox' ? 'Task Inbox' : tab === 'detail' ? 'WO-8921' : 'Asset Scanner'}</h2>
                    </div>
                    <div className="size-8 rounded-full bg-slate-700 bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqlidq8m3vVbUB-gYVUnMwFvKJY6Xl69vE6pAUtc0I8fhJjk9xFlWcWXHIWv4H7Tmquk1m5QAr-yi1b_mX_MTc9ui8XBG29VfaWumA2LeoW9SUYLw5I7gXXWDurQr7ZCSO-nb6alS6QPATsGmQC69gQ3wOwPYRnaxAuF4_ZmTeb7u1ICxu4Legil-iWvaJafY5BlMU5H3WnmrD_CXqXyWHLHxy7Igcphj0WeWjrLhi14jzcgCe4w0GLPG3EKfswJ_9zGIeT71BRhM')`}}></div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto relative bg-[#101e22]">
                    
                    {/* INBOX VIEW */}
                    {tab === 'inbox' && (
                        <div className="p-4 space-y-4">
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                <div className="min-w-[120px] p-3 rounded-xl bg-gradient-to-br from-[#1b262c] to-[#162024] border border-white/5">
                                    <span className="material-symbols-outlined text-2xl text-rail-primary mb-1">assignment</span>
                                    <div className="text-xs text-slate-400">Active</div>
                                    <div className="text-xl font-bold text-white">3</div>
                                </div>
                                <div className="min-w-[120px] p-3 rounded-xl bg-gradient-to-br from-[#1b262c] to-[#162024] border border-white/5">
                                    <span className="material-symbols-outlined text-2xl text-rail-danger mb-1">warning</span>
                                    <div className="text-xs text-slate-400">Critical</div>
                                    <div className="text-xl font-bold text-white">1</div>
                                </div>
                            </div>
                            
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">Priority Tasks</h3>
                            
                            <div onClick={() => setTab('detail')} className="bg-[#1b262c] rounded-xl p-4 border border-white/5 active:scale-95 transition-transform cursor-pointer relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-rail-danger"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-3 items-center">
                                        <div className="size-10 rounded-lg bg-rail-danger/10 text-rail-danger flex items-center justify-center">
                                            <span className="material-symbols-outlined">fork_right</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">Switch Motor Repair</h4>
                                            <p className="text-xs text-slate-500">Sector 7G, Track 4</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-0.5 bg-rail-danger/20 text-rail-danger text-[10px] font-bold rounded">P1</span>
                                </div>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                                    <div className="text-rail-danger text-xs font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">timer</span> 22m left
                                    </div>
                                    <button className="text-rail-primary text-xs font-bold flex items-center gap-1">
                                        Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </button>
                                </div>
                            </div>

                             <div className="bg-[#1b262c] rounded-xl p-4 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-rail-warning"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-3 items-center">
                                        <div className="size-10 rounded-lg bg-rail-warning/10 text-rail-warning flex items-center justify-center">
                                            <span className="material-symbols-outlined">sensors</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">Sensor Calibration</h4>
                                            <p className="text-xs text-slate-500">Yard B, Gate 3</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-0.5 bg-rail-warning/20 text-rail-warning text-[10px] font-bold rounded">P2</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DETAIL VIEW */}
                    {tab === 'detail' && (
                        <div className="p-4 space-y-4">
                            <div className="bg-[#1c2a2e] rounded-xl p-4 border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-bold text-white">Current Status</h3>
                                    <span className="text-rail-primary text-xs font-bold bg-rail-primary/10 px-2 py-1 rounded-full">On Site</span>
                                </div>
                                <div className="relative pl-4 border-l border-slate-700 space-y-6 my-2">
                                    <div className="relative">
                                        <div className="absolute -left-[19px] top-1 size-2.5 rounded-full bg-rail-primary ring-4 ring-[#1c2a2e]"></div>
                                        <p className="text-sm font-bold text-white">Assigned</p>
                                        <p className="text-xs text-slate-500">08:35 AM • Dispatch</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-0 size-3.5 rounded-full bg-rail-primary/30 animate-ping"></div>
                                        <div className="absolute -left-[19px] top-1 size-2.5 rounded-full bg-rail-primary ring-4 ring-[#1c2a2e]"></div>
                                        <p className="text-sm font-bold text-rail-primary">On Site</p>
                                        <p className="text-xs text-slate-500">10:05 AM • Current</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-rail-primary w-3/4 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                             <div className="bg-[#1c2a2e] rounded-xl p-4 border border-white/5">
                                <h3 className="text-white font-bold mb-2">Description</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Operator reported intermittent failure of switch motor. Error code E-404. Check hydraulic levels.
                                </p>
                             </div>

                             <div className="grid grid-cols-2 gap-3">
                                <button className="p-3 rounded-xl bg-[#283539] flex flex-col items-center justify-center gap-2 hover:bg-white/10">
                                    <span className="material-symbols-outlined text-white">menu_book</span>
                                    <span className="text-xs text-slate-300">Manuals</span>
                                </button>
                                <button className="p-3 rounded-xl bg-[#283539] flex flex-col items-center justify-center gap-2 hover:bg-white/10">
                                    <span className="material-symbols-outlined text-white">add_a_photo</span>
                                    <span className="text-xs text-slate-300">Evidence</span>
                                </button>
                             </div>
                        </div>
                    )}

                    {/* SCANNER VIEW */}
                    {tab === 'scanner' && (
                        <div className="h-full relative flex flex-col items-center justify-center">
                             <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDC5iCXzdliIE14Zzd52lZPVkco5fYpHTBMHit5NvdHx34LOMPb6aAv9d-mMQfq22HJYM-QuyAgUSH4hT3S5t78ETuP-AJaKY-GJQCoa4DSdrOr9DgBg8NPgtrmYfhiCX9nDgAEZuXrzdTJVfLGbRNtAlb_tPP-_tTLR2J3-YqT3D0s5Nr6OjwRX3XhzyYwAxfnMLHA8njBsNzzn47Dv-XAv81sa7WKH7IcbsLCO3mlCgE4r0BdFdQNnLKTy3y1ccLOq29QKaarQFE')`}}></div>
                             <div className="absolute inset-0 bg-gradient-to-b from-[#101e22] via-transparent to-[#101e22] z-10"></div>
                             
                             <div className="relative z-20 w-64 h-64 border-2 border-rail-primary/50 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(37,192,244,0.3)] bg-rail-primary/5">
                                 <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-rail-primary rounded-tl-lg"></div>
                                 <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-rail-primary rounded-tr-lg"></div>
                                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-rail-primary rounded-bl-lg"></div>
                                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-rail-primary rounded-br-lg"></div>
                                 <div className="w-full h-0.5 bg-rail-primary absolute top-0 animate-[scan_2s_linear_infinite] shadow-[0_0_10px_#25c0f4]"></div>
                                 <style>{`@keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>
                             </div>
                             
                             <div className="relative z-20 mt-8 bg-rail-primary text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">check_circle</span> Asset Identified
                             </div>
                        </div>
                    )}
                </div>

                {/* Bottom Nav */}
                <div className="h-16 bg-[#162024] border-t border-white/5 flex items-center justify-around shrink-0 z-20 px-2">
                    <button onClick={() => setTab('inbox')} className={`flex flex-col items-center gap-1 p-2 ${tab === 'inbox' ? 'text-rail-primary' : 'text-slate-500'}`}>
                        <span className="material-symbols-outlined">inbox</span>
                        <span className="text-[10px] font-medium">Tasks</span>
                    </button>
                    <button onClick={() => setTab('scanner')} className="size-14 -mt-8 bg-rail-primary rounded-full flex items-center justify-center text-[#101e22] shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-4 border-[#101e22]">
                        <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 text-slate-500">
                        <span className="material-symbols-outlined">map</span>
                        <span className="text-[10px] font-medium">Map</span>
                    </button>
                </div>
             </div>
        </div>
    );
};
