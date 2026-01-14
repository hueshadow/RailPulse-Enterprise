import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { NetworkOverview } from './screens/NetworkOverview';
import { IncidentCommand } from './screens/IncidentCommand';
import { LineDetail } from './screens/LineDetail';
import { StationOps } from './screens/StationOps';
import { FieldService } from './screens/FieldService';
import { Forecasting } from './screens/Forecasting';
import { Login } from './screens/Login';
import { UserCenter } from './screens/UserCenter';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ScreenType } from './types';

// Main app content with authentication
const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');
  const { isAuthenticated, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-rail-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rail-primary/30 border-t-rail-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return <Login />;
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

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
