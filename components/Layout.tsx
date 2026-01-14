import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenType } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface LayoutProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
  children: React.ReactNode;
}

const NavItem = ({ 
  active, 
  icon, 
  label, 
  onClick 
}: { 
  active: boolean; 
  icon: string; 
  label: string; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${
      active 
        ? 'bg-rail-primary/10 text-rail-primary border border-rail-primary/20 shadow-[0_0_15px_rgba(37,192,244,0.1)]' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className="material-symbols-outlined text-[20px]">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ currentScreen, onScreenChange, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-rail-dark selection:bg-rail-primary selection:text-black">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-16'} flex-shrink-0 border-r border-rail-border bg-[#0e1318] flex flex-col transition-all duration-300 z-50`}
      >
        <div className="h-16 flex items-center px-4 border-b border-rail-border">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="min-w-[32px] h-8 flex items-center justify-center bg-rail-primary rounded text-black font-bold">
              <span className="material-symbols-outlined">train</span>
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-white leading-none">RailPulse</span>
                <span className="text-[10px] text-rail-primary font-mono tracking-wider">OCC-SYSTEM</span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 no-scrollbar">
          <div className={`text-xs font-bold text-slate-500 uppercase mb-2 px-3 ${!sidebarOpen && 'hidden'}`}>{t('common.operations')}</div>
          <NavItem active={currentScreen === 'overview'} icon="dashboard" label={sidebarOpen ? t('nav.networkOverview') : ""} onClick={() => onScreenChange('overview')} />
          <NavItem active={currentScreen === 'incident-command'} icon="e911_emergency" label={sidebarOpen ? t('nav.incidentCommand') : ""} onClick={() => onScreenChange('incident-command')} />
          <NavItem active={currentScreen === 'line-detail'} icon="alt_route" label={sidebarOpen ? t('nav.lineDetail') : ""} onClick={() => onScreenChange('line-detail')} />
          <NavItem active={currentScreen === 'station-ops'} icon="domain" label={sidebarOpen ? t('nav.stationOps') : ""} onClick={() => onScreenChange('station-ops')} />

          <div className={`text-xs font-bold text-slate-500 uppercase mt-4 mb-2 px-3 ${!sidebarOpen && 'hidden'}`}>{t('common.analytics')}</div>
          <NavItem active={currentScreen === 'forecasting'} icon="query_stats" label={sidebarOpen ? t('nav.forecasting') : ""} onClick={() => onScreenChange('forecasting')} />

          <div className={`text-xs font-bold text-slate-500 uppercase mt-4 mb-2 px-3 ${!sidebarOpen && 'hidden'}`}>{t('common.mobile')}</div>
          <NavItem active={currentScreen === 'field-service'} icon="smartphone" label={sidebarOpen ? t('nav.fieldService') : ""} onClick={() => onScreenChange('field-service')} />
        </nav>

        <div className="p-3 border-t border-rail-border">
           <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded hover:bg-white/5 text-slate-400"
          >
            <span className="material-symbols-outlined">{sidebarOpen ? 'chevron_left' : 'chevron_right'}</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Dynamic Header */}
        <header className="h-16 border-b border-rail-border bg-rail-panel/50 backdrop-blur-md flex items-center justify-between px-6 z-40">
           <div className="flex items-center gap-4">
             <h2 className="text-lg font-bold text-white">{t(`screens.${currentScreen}`)}</h2>
             <span className="px-2 py-0.5 rounded bg-rail-success/20 text-rail-success border border-rail-success/30 text-[10px] font-bold">{t('common.systemNormal')}</span>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>UTC 14:42:05</span>
                <span className="text-rail-primary">OCT 24, 2023</span>
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <LanguageSwitcher />
              <div className="h-6 w-px bg-white/10"></div>
              <div className="flex items-center gap-3">
                 <button className="relative text-slate-400 hover:text-white">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-0 right-0 size-2 bg-rail-danger rounded-full animate-pulse"></span>
                 </button>
                 <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white border border-white/20">JD</div>
              </div>
           </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden relative bg-[#0B1116]">
          {children}
        </div>
      </main>
    </div>
  );
};
