import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { NetworkOverview } from './screens/NetworkOverview';
import { IncidentCommand } from './screens/IncidentCommand';
import { LineDetail } from './screens/LineDetail';
import { StationOps } from './screens/StationOps';
import { FieldService } from './screens/FieldService';
import { Forecasting } from './screens/Forecasting';
import { UserCenter } from './screens/UserCenter';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ScreenType } from './types';

// Loading screen component
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-quantix-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-quantix-purple to-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(46,92,255,0.4)]">
        <span className="material-symbols-outlined text-2xl text-black font-bold animate-pulse">train</span>
      </div>
      <p className="text-gray-400">Loading RailPulse...</p>
    </div>
  </div>
);

// Main app content
const AppContent: React.FC = () => {
  const { loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');

  // Show loading screen while auth is initializing
  if (loading) {
    return <LoadingScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'overview': return <NetworkOverview />;
      case 'incident-command': return <IncidentCommand />;
      case 'line-detail': return <LineDetail />;
      case 'station-ops': return <StationOps />;
      case 'field-service': return <FieldService />;
      case 'forecasting': return <Forecasting />;
      case 'user-center': return <UserCenter onNavigate={setCurrentScreen} />;
      default: return <NetworkOverview />;
    }
  };

  return (
    <Layout currentScreen={currentScreen} onScreenChange={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
