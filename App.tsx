import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { NetworkOverview } from './screens/NetworkOverview';
import { IncidentCommand } from './screens/IncidentCommand';
import { LineDetail } from './screens/LineDetail';
import { StationOps } from './screens/StationOps';
import { FieldService } from './screens/FieldService';
import { Forecasting } from './screens/Forecasting';
import { ScreenType } from './types';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'overview': return <NetworkOverview />;
      case 'incident-command': return <IncidentCommand />;
      case 'line-detail': return <LineDetail />;
      case 'station-ops': return <StationOps />;
      case 'field-service': return <FieldService />;
      case 'forecasting': return <Forecasting />;
      default: return <NetworkOverview />;
    }
  };

  return (
    <Layout currentScreen={currentScreen} onScreenChange={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
};

export default App;
