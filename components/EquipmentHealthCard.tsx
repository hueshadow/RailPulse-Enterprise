import React from 'react';
import { useTranslation } from 'react-i18next';
import { RingChart } from './charts/RingChart';

export interface Equipment {
  id: string;
  name: string;
  type: 'escalator' | 'elevator' | 'gate' | 'signal' | 'switch' | 'sensor' | 'ac' | 'power';
  operationHours: number;
  failureCount: number;
  remainingLifespan: number; // 0-100 percentage
  status: 'healthy' | 'warning' | 'critical';
  lastMaintenance: Date;
  nextMaintenance: Date;
  location?: string;
}

interface EquipmentHealthCardProps {
  equipment: Equipment;
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}

const TYPE_ICONS: Record<Equipment['type'], string> = {
  escalator: 'escalator',
  elevator: 'elevator',
  gate: 'door_sliding',
  signal: 'signal_cellular_alt',
  switch: 'switch_left',
  sensor: 'sensors',
  ac: 'ac_unit',
  power: 'electrical_services',
};

const STATUS_CONFIG = {
  healthy: {
    color: 'success' as const,
    bgClass: 'bg-rail-success/10',
    borderClass: 'border-rail-success/30',
    textClass: 'text-rail-success',
    pulseClass: 'animate-pulse-slow',
  },
  warning: {
    color: 'warning' as const,
    bgClass: 'bg-rail-warning/10',
    borderClass: 'border-rail-warning/30',
    textClass: 'text-rail-warning',
    pulseClass: 'animate-pulse',
  },
  critical: {
    color: 'danger' as const,
    bgClass: 'bg-rail-danger/10',
    borderClass: 'border-rail-danger/30',
    textClass: 'text-rail-danger',
    pulseClass: 'animate-glow-pulse-danger',
  },
};

export const EquipmentHealthCard: React.FC<EquipmentHealthCardProps> = ({
  equipment,
  compact = false,
  onClick,
  className = '',
}) => {
  const { t } = useTranslation();
  const statusConfig = STATUS_CONFIG[equipment.status];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const getDaysUntilMaintenance = () => {
    const now = new Date();
    const next = new Date(equipment.nextMaintenance);
    const diff = next.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysUntilMaintenance = getDaysUntilMaintenance();

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`glass-card p-3 cursor-pointer hover:scale-[1.02] transition-all ${className}`}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-lg ${statusConfig.bgClass} ${statusConfig.borderClass} border flex items-center justify-center`}>
            <span className={`material-symbols-outlined ${statusConfig.textClass} text-lg`}>
              {TYPE_ICONS[equipment.type]}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{equipment.name}</p>
            <p className="text-xs text-gray-500">{t(`equipment.types.${equipment.type}`)}</p>
          </div>

          {/* Mini Ring */}
          <RingChart
            value={equipment.remainingLifespan}
            size="sm"
            color={statusConfig.color}
            showValue={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`glass-card p-4 cursor-pointer hover:scale-[1.01] transition-all group ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Status indicator */}
          <div className="relative">
            <div className={`w-12 h-12 rounded-xl ${statusConfig.bgClass} ${statusConfig.borderClass} border flex items-center justify-center`}>
              <span className={`material-symbols-outlined ${statusConfig.textClass} text-xl`}>
                {TYPE_ICONS[equipment.type]}
              </span>
            </div>
            {/* Status dot */}
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
              equipment.status === 'healthy' ? 'bg-rail-success' :
              equipment.status === 'warning' ? 'bg-rail-warning' : 'bg-rail-danger'
            } ${statusConfig.pulseClass}`} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white group-hover:text-rail-primary transition-colors">
              {equipment.name}
            </h3>
            <p className="text-xs text-gray-500">{t(`equipment.types.${equipment.type}`)}</p>
            {equipment.location && (
              <p className="text-xs text-gray-600 mt-0.5">{equipment.location}</p>
            )}
          </div>
        </div>

        {/* Status badge */}
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgClass} ${statusConfig.textClass} ${statusConfig.borderClass} border`}>
          {t(`equipment.status.${equipment.status}`)}
        </span>
      </div>

      {/* Main content */}
      <div className="flex items-center gap-4">
        {/* Ring Chart */}
        <RingChart
          value={equipment.remainingLifespan}
          size="md"
          color={statusConfig.color}
          label={t('equipment.lifespan')}
          showValue={true}
        />

        {/* Stats */}
        <div className="flex-1 space-y-3">
          {/* Operation Hours */}
          <div className="glass-light rounded-lg p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{t('equipment.operationHours')}</span>
              <span className="text-sm font-mono font-bold text-white">
                {formatNumber(equipment.operationHours)}h
              </span>
            </div>
            {/* Progress bar for hours (assume 50000h lifecycle) */}
            <div className="mt-1.5 h-1.5 bg-rail-border/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rail-primary to-cyan-400 rounded-full"
                style={{ width: `${Math.min((equipment.operationHours / 50000) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Failure Count */}
          <div className="flex items-center justify-between glass-light rounded-lg p-2.5">
            <span className="text-xs text-gray-400">{t('equipment.failures')}</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-mono font-bold ${
                equipment.failureCount === 0 ? 'text-rail-success' :
                equipment.failureCount <= 2 ? 'text-rail-warning' : 'text-rail-danger'
              }`}>
                {equipment.failureCount}
              </span>
              <span className="text-xs text-gray-500">{t('equipment.times')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Maintenance info */}
      <div className="mt-4 pt-3 border-t border-rail-border/30 flex items-center justify-between text-xs">
        <div className="text-gray-500">
          <span>{t('equipment.lastMaintenance')}: </span>
          <span className="text-gray-400">{formatDate(equipment.lastMaintenance)}</span>
        </div>
        <div className={`flex items-center gap-1 ${
          daysUntilMaintenance <= 7 ? 'text-rail-warning' : 'text-gray-400'
        }`}>
          <span className="material-symbols-outlined text-sm">event</span>
          <span>
            {daysUntilMaintenance > 0
              ? t('equipment.nextIn', { days: daysUntilMaintenance })
              : t('equipment.overdue')}
          </span>
        </div>
      </div>
    </div>
  );
};

// Equipment Health Dashboard - Grid of cards
interface EquipmentHealthDashboardProps {
  equipment: Equipment[];
  columns?: 1 | 2 | 3;
  compact?: boolean;
  className?: string;
}

export const EquipmentHealthDashboard: React.FC<EquipmentHealthDashboardProps> = ({
  equipment,
  columns = 2,
  compact = false,
  className = '',
}) => {
  const { t } = useTranslation();

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  // Summary stats
  const healthyCount = equipment.filter(e => e.status === 'healthy').length;
  const warningCount = equipment.filter(e => e.status === 'warning').length;
  const criticalCount = equipment.filter(e => e.status === 'critical').length;

  return (
    <div className={className}>
      {/* Summary bar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rail-success" />
          <span className="text-xs text-gray-400">{t('equipment.healthy')}</span>
          <span className="text-sm font-mono font-bold text-rail-success">{healthyCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rail-warning" />
          <span className="text-xs text-gray-400">{t('equipment.warning')}</span>
          <span className="text-sm font-mono font-bold text-rail-warning">{warningCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rail-danger" />
          <span className="text-xs text-gray-400">{t('equipment.critical')}</span>
          <span className="text-sm font-mono font-bold text-rail-danger">{criticalCount}</span>
        </div>
      </div>

      {/* Equipment grid */}
      <div className={`grid ${gridClass[columns]} gap-4`}>
        {equipment.map(eq => (
          <EquipmentHealthCard key={eq.id} equipment={eq} compact={compact} />
        ))}
      </div>
    </div>
  );
};
