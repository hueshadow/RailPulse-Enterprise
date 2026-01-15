import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskBoard, TaskColumnData, Task } from '../components/TaskBoard/TaskBoard';

// Mock task data for the kanban board
const mockTaskColumns: TaskColumnData[] = [
  {
    id: 'pending',
    title: 'Pending',
    icon: 'pending',
    color: 'primary',
    tasks: [
      {
        id: 'WO-8924',
        title: 'Signal Light Replacement',
        description: 'Replace faulty signal light at junction',
        priority: 'P2',
        location: 'Sector 4A',
        type: 'repair',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: 'WO-8925',
        title: 'Track Inspection',
        description: 'Routine track condition inspection',
        priority: 'P3',
        location: 'Line 2 South',
        type: 'inspection',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    icon: 'play_circle',
    color: 'warning',
    tasks: [
      {
        id: 'WO-8921',
        title: 'Switch Motor Repair',
        description: 'Operator reported intermittent failure. Error code E-404.',
        priority: 'P1',
        assignee: 'M. Kim',
        location: 'Sector 7G, Track 4',
        type: 'emergency',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: 'WO-8922',
        title: 'Sensor Calibration',
        description: 'Calibrate proximity sensors',
        priority: 'P2',
        assignee: 'A. Smith',
        location: 'Yard B, Gate 3',
        type: 'maintenance',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: 'completed',
    title: 'Completed',
    icon: 'check_circle',
    color: 'success',
    tasks: [
      {
        id: 'WO-8919',
        title: 'Escalator Belt Tension',
        description: 'Adjusted belt tension to spec',
        priority: 'P3',
        assignee: 'J. Chen',
        location: 'Station Central',
        type: 'maintenance',
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
    ],
  },
];

export const FieldService = () => {
    const { t } = useTranslation();
    const [tab, setTab] = useState<'inbox' | 'detail' | 'scanner' | 'kanban'>('inbox');
    const [taskColumns, setTaskColumns] = useState(mockTaskColumns);

    const handleTaskMove = (taskId: string, fromColumn: string, toColumn: string) => {
      console.log(`Task ${taskId} moved from ${fromColumn} to ${toColumn}`);
      // In a real app, this would sync with backend
    };

    return (
        <div className="flex h-full bg-[#0B1116] p-4 gap-6">
            {/* Task Board - Desktop View */}
            <div className="flex-1 hidden lg:flex flex-col min-w-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Task Board</h2>
                  <p className="text-xs text-gray-400">Drag and drop to update task status</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-quantix-purple/20 text-quantix-purple text-xs font-medium">
                    {taskColumns.reduce((acc, col) => acc + col.tasks.length, 0)} tasks
                  </span>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <TaskBoard
                  columns={taskColumns}
                  onTaskMove={handleTaskMove}
                  className="h-full"
                />
              </div>
            </div>

            {/* Mobile Frame */}
            <div className="w-full lg:w-auto flex justify-center">
             <div className="w-full max-w-[380px] bg-[#101e22]/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(37,192,244,0.1)] relative">

                {/* Header */}
                <div className="h-14 bg-[#162024]/90 backdrop-blur-xl flex items-center justify-between px-4 border-b border-white/10 shrink-0 z-20">
                    <div className="flex items-center gap-2">
                        {tab !== 'inbox' && (
                            <button onClick={() => setTab('inbox')} className="text-white hover:text-quantix-purple transition-colors p-1 rounded-lg hover:bg-white/5">
                              <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                        )}
                        <h2 className="text-white font-bold">{tab === 'inbox' ? 'Task Inbox' : tab === 'detail' ? 'WO-8921' : 'Asset Scanner'}</h2>
                    </div>
                    <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 bg-cover bg-center ring-2 ring-white/20 shadow-[0_0_12px_rgba(139,92,246,0.3)]" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqlidq8m3vVbUB-gYVUnMwFvKJY6Xl69vE6pAUtc0I8fhJjk9xFlWcWXHIWv4H7Tmquk1m5QAr-yi1b_mX_MTc9ui8XBG29VfaWumA2LeoW9SUYLw5I7gXXWDurQr7ZCSO-nb6alS6QPATsGmQC69gQ3wOwPYRnaxAuF4_ZmTeb7u1ICxu4Legil-iWvaJafY5BlMU5H3WnmrD_CXqXyWHLHxy7Igcphj0WeWjrLhi14jzcgCe4w0GLPG3EKfswJ_9zGIeT71BRhM')`}}></div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto relative bg-[#101e22]">

                    {/* INBOX VIEW */}
                    {tab === 'inbox' && (
                        <div className="p-4 space-y-4">
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                <div className="min-w-[120px] p-3 rounded-xl glass-card-primary">
                                    <span className="material-symbols-outlined text-2xl text-quantix-purple mb-1 drop-shadow-[0_0_8px_rgba(37,192,244,0.5)]">assignment</span>
                                    <div className="text-xs text-slate-400">Active</div>
                                    <div className="text-xl font-bold text-white">3</div>
                                </div>
                                <div className="min-w-[120px] p-3 rounded-xl glass-card-danger">
                                    <span className="material-symbols-outlined text-2xl text-rail-danger mb-1 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">warning</span>
                                    <div className="text-xs text-slate-400">Critical</div>
                                    <div className="text-xl font-bold text-white">1</div>
                                </div>
                            </div>

                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2 flex items-center gap-2">
                              <span className="w-1 h-3 bg-rail-danger rounded-full"></span>
                              Priority Tasks
                            </h3>

                            <div onClick={() => setTab('detail')} className="glass-card rounded-xl p-4 active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden group hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]">
                                <div className="absolute top-0 left-0 w-1 h-full bg-rail-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-3 items-center">
                                        <div className="size-10 rounded-lg bg-rail-danger/15 text-rail-danger flex items-center justify-center backdrop-blur-sm border border-rail-danger/20">
                                            <span className="material-symbols-outlined">fork_right</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold group-hover:text-quantix-purple transition-colors">Switch Motor Repair</h4>
                                            <p className="text-xs text-slate-500">Sector 7G, Track 4</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-0.5 bg-rail-danger/20 text-rail-danger text-[10px] font-bold rounded border border-rail-danger/30 shadow-[0_0_8px_rgba(239,68,68,0.3)]">P1</span>
                                </div>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                                    <div className="text-rail-danger text-xs font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">timer</span> 22m left
                                    </div>
                                    <button className="text-quantix-purple text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                        Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </button>
                                </div>
                            </div>

                             <div className="glass-card rounded-xl p-4 relative overflow-hidden hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all cursor-pointer group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-rail-warning shadow-[0_0_6px_rgba(245,158,11,0.4)]"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-3 items-center">
                                        <div className="size-10 rounded-lg bg-rail-warning/15 text-rail-warning flex items-center justify-center backdrop-blur-sm border border-rail-warning/20">
                                            <span className="material-symbols-outlined">sensors</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold group-hover:text-quantix-purple transition-colors">Sensor Calibration</h4>
                                            <p className="text-xs text-slate-500">Yard B, Gate 3</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-0.5 bg-rail-warning/20 text-rail-warning text-[10px] font-bold rounded border border-rail-warning/30">P2</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DETAIL VIEW */}
                    {tab === 'detail' && (
                        <div className="p-4 space-y-4">
                            <div className="glass-card rounded-xl p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-bold text-white">Current Status</h3>
                                    <span className="text-quantix-purple text-xs font-bold bg-quantix-purple/15 px-2.5 py-1 rounded-full border border-quantix-purple/30 shadow-[0_0_10px_rgba(37,192,244,0.2)]">On Site</span>
                                </div>
                                <div className="relative pl-4 border-l border-slate-700/50 space-y-6 my-2">
                                    <div className="relative">
                                        <div className="absolute -left-[19px] top-1 size-2.5 rounded-full bg-quantix-purple ring-4 ring-[#151e22] shadow-[0_0_8px_rgba(37,192,244,0.5)]"></div>
                                        <p className="text-sm font-bold text-white">Assigned</p>
                                        <p className="text-xs text-slate-500">08:35 AM • Dispatch</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-0 size-3.5 rounded-full bg-quantix-purple/30 animate-ping"></div>
                                        <div className="absolute -left-[19px] top-1 size-2.5 rounded-full bg-quantix-purple ring-4 ring-[#151e22] shadow-[0_0_10px_rgba(37,192,244,0.6)]"></div>
                                        <p className="text-sm font-bold text-quantix-purple">On Site</p>
                                        <p className="text-xs text-slate-500">10:05 AM • Current</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <div className="h-2 w-full bg-slate-800/60 rounded-full overflow-hidden backdrop-blur-sm">
                                        <div className="h-full bg-gradient-to-r from-quantix-purple to-[#1a9cc9] w-3/4 rounded-full shadow-[0_0_10px_rgba(37,192,244,0.5)]"></div>
                                    </div>
                                </div>
                            </div>

                             <div className="glass-card rounded-xl p-4">
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                  <span className="w-1 h-3 bg-quantix-purple rounded-full"></span>
                                  Description
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Operator reported intermittent failure of switch motor. Error code E-404. Check hydraulic levels.
                                </p>
                             </div>

                             <div className="grid grid-cols-2 gap-3">
                                <button className="p-4 rounded-xl glass-card flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all group">
                                    <span className="material-symbols-outlined text-white group-hover:text-quantix-purple transition-colors">menu_book</span>
                                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Manuals</span>
                                </button>
                                <button className="p-4 rounded-xl glass-card flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all group">
                                    <span className="material-symbols-outlined text-white group-hover:text-quantix-purple transition-colors">add_a_photo</span>
                                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Evidence</span>
                                </button>
                             </div>
                        </div>
                    )}

                    {/* SCANNER VIEW */}
                    {tab === 'scanner' && (
                        <div className="h-full relative flex flex-col items-center justify-center">
                             <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDC5iCXzdliIE14Zzd52lZPVkco5fYpHTBMHit5NvdHx34LOMPb6aAv9d-mMQfq22HJYM-QuyAgUSH4hT3S5t78ETuP-AJaKY-GJQCoa4DSdrOr9DgBg8NPgtrmYfhiCX9nDgAEZuXrzdTJVfLGbRNtAlb_tPP-_tTLR2J3-YqT3D0s5Nr6OjwRX3XhzyYwAxfnMLHA8njBsNzzn47Dv-XAv81sa7WKH7IcbsLCO3mlCgE4r0BdFdQNnLKTy3y1ccLOq29QKaarQFE')`}}></div>
                             <div className="absolute inset-0 bg-gradient-to-b from-[#101e22] via-transparent to-[#101e22] z-10"></div>

                             <div className="relative z-20 w-64 h-64 border-2 border-quantix-purple/60 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(37,192,244,0.4),inset_0_0_20px_rgba(37,192,244,0.1)] bg-quantix-purple/5 backdrop-blur-sm">
                                 <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-quantix-purple rounded-tl-xl shadow-[0_0_15px_rgba(37,192,244,0.5)]"></div>
                                 <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-quantix-purple rounded-tr-xl shadow-[0_0_15px_rgba(37,192,244,0.5)]"></div>
                                 <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-quantix-purple rounded-bl-xl shadow-[0_0_15px_rgba(37,192,244,0.5)]"></div>
                                 <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-quantix-purple rounded-br-xl shadow-[0_0_15px_rgba(37,192,244,0.5)]"></div>
                                 <div className="w-full h-1 bg-gradient-to-r from-transparent via-quantix-purple to-transparent absolute top-0 animate-[scan_2s_linear_infinite] shadow-[0_0_15px_#25c0f4,0_0_30px_#25c0f4]"></div>
                                 <style>{`@keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>
                             </div>

                             <div className="relative z-20 mt-8 bg-gradient-to-r from-quantix-purple to-[#1a9cc9] text-black px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_20px_rgba(37,192,244,0.4)] flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">check_circle</span> Asset Identified
                             </div>
                        </div>
                    )}
                </div>

                {/* Bottom Nav */}
                <div className="h-16 bg-[#162024]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around shrink-0 z-20 px-2">
                    <button onClick={() => setTab('inbox')} className={`flex flex-col items-center gap-1 p-2 transition-all ${tab === 'inbox' ? 'text-quantix-purple drop-shadow-[0_0_8px_rgba(37,192,244,0.5)]' : 'text-slate-500 hover:text-slate-300'}`}>
                        <span className="material-symbols-outlined">inbox</span>
                        <span className="text-[10px] font-medium">Tasks</span>
                    </button>
                    <button onClick={() => setTab('scanner')} className="size-14 -mt-8 bg-gradient-to-br from-quantix-purple to-[#1a9cc9] rounded-full flex items-center justify-center text-black shadow-[0_4px_20px_rgba(37,192,244,0.5),0_0_30px_rgba(37,192,244,0.3)] border-4 border-[#101e22] hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-slate-300 transition-all">
                        <span className="material-symbols-outlined">map</span>
                        <span className="text-[10px] font-medium">Map</span>
                    </button>
                </div>
             </div>
            </div>
        </div>
    );
};
