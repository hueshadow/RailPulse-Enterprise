export type ScreenType =
  | 'overview'
  | 'incident-command'
  | 'line-detail'
  | 'station-ops'
  | 'field-service'
  | 'forecasting'
  | 'user-center';

export interface KPI {
  label: string;
  value: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  color?: string;
}

export interface Incident {
  id: string;
  title: string;
  priority: 'P1' | 'P2' | 'P3' | 'Resolved';
  time: string;
  location: string;
  status: string;
}
