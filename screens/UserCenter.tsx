import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { ROLE_LABELS } from '../types/auth';
import { ScreenType } from '../types';

interface UserCenterProps {
  onNavigate?: (screen: ScreenType) => void;
}

export const UserCenter: React.FC<UserCenterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user, logout, activityLogs } = useAuth();

  if (!user) return null;

  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return t('common.timeAgo.days', { count: days });
    if (hours > 0) return t('common.timeAgo.hours', { count: hours });
    if (minutes > 0) return t('common.timeAgo.minutes', { count: minutes });
    return t('common.timeAgo.justNow');
  };

  const permissionGroups = [
    { key: 'network', permissions: ['view_network'] },
    { key: 'incidents', permissions: ['view_incidents', 'manage_incidents'] },
    { key: 'lines', permissions: ['view_lines', 'manage_lines'] },
    { key: 'stations', permissions: ['view_stations', 'manage_stations'] },
    { key: 'forecasting', permissions: ['view_forecasting', 'execute_forecasting'] },
    { key: 'fieldService', permissions: ['view_field_service', 'manage_field_service'] },
    { key: 'users', permissions: ['view_users', 'manage_users'] },
    { key: 'system', permissions: ['system_settings'] }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('auth.userCenter.title')}</h1>
          <p className="text-gray-400 text-sm mt-1">{t('auth.userCenter.subtitle')}</p>
        </div>
        <button
          onClick={handleLogout}
          className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 text-rail-danger border-rail-danger/30 hover:bg-rail-danger/20"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>{t('auth.userCenter.logout')}</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - User Profile */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Profile Card */}
          <div className="glass-card p-6">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="avatar-ring mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-quantix-purple to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              </div>

              <h2 className="text-xl font-semibold text-white">{user.displayName}</h2>
              <p className="text-gray-400 text-sm">@{user.username}</p>

              {/* Role Badge */}
              <div className="mt-3 px-3 py-1 rounded-full bg-quantix-purple/20 border border-quantix-purple/30 text-quantix-purple text-sm font-medium">
                {t(ROLE_LABELS[user.role])}
              </div>
            </div>

            {/* User Details */}
            <div className="mt-6 pt-6 border-t border-quantix-border/50 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-gray-500 text-lg">mail</span>
                <span className="text-gray-300">{user.email}</span>
              </div>
              {user.department && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-gray-500 text-lg">business</span>
                  <span className="text-gray-300">{user.department}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-gray-500 text-lg">schedule</span>
                <span className="text-gray-400">
                  {t('auth.userCenter.lastLogin')}: {formatDate(user.lastLogin)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">{t('auth.userCenter.quickActions')}</h3>
            <div className="space-y-2">
              <button className="w-full glass-button px-4 py-2.5 rounded-lg flex items-center gap-3 text-left">
                <span className="material-symbols-outlined text-lg">settings</span>
                <span>{t('auth.userCenter.settings')}</span>
              </button>
              <button className="w-full glass-button px-4 py-2.5 rounded-lg flex items-center gap-3 text-left">
                <span className="material-symbols-outlined text-lg">notifications</span>
                <span>{t('auth.userCenter.notifications')}</span>
              </button>
              <button className="w-full glass-button px-4 py-2.5 rounded-lg flex items-center gap-3 text-left">
                <span className="material-symbols-outlined text-lg">help</span>
                <span>{t('auth.userCenter.help')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column - Permissions */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-quantix-purple">security</span>
              <h3 className="text-lg font-semibold text-white">{t('auth.userCenter.permissions')}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{t('auth.userCenter.permissionsDesc')}</p>

            <div className="space-y-3">
              {permissionGroups.map(group => {
                const hasAny = group.permissions.some(p => user.permissions.includes(p as any));
                if (!hasAny) return null;

                return (
                  <div key={group.key} className="glass-light rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-rail-success" />
                      <span className="text-sm font-medium text-white">
                        {t(`auth.permissions.groups.${group.key}`)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.permissions.map(p => {
                        const has = user.permissions.includes(p as any);
                        return (
                          <span
                            key={p}
                            className={`px-2 py-0.5 rounded text-xs ${
                              has
                                ? 'bg-rail-success/20 text-rail-success border border-rail-success/30'
                                : 'bg-gray-800/50 text-gray-500 border border-gray-700/50'
                            }`}
                          >
                            {t(`auth.permissions.${p}`)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Activity Log */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-quantix-purple">history</span>
              <h3 className="text-lg font-semibold text-white">{t('auth.userCenter.activityLog')}</h3>
            </div>

            {activityLogs.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">inbox</span>
                <p className="text-gray-500 text-sm">{t('auth.userCenter.noActivity')}</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
                {activityLogs.slice(0, 10).map(log => (
                  <div key={log.id} className="glass-light rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-lg ${
                          log.action === 'login' ? 'text-rail-success' :
                          log.action === 'logout' ? 'text-rail-warning' :
                          'text-gray-400'
                        }`}>
                          {log.action === 'login' ? 'login' :
                           log.action === 'logout' ? 'logout' : 'pending_actions'}
                        </span>
                        <span className="text-sm text-white capitalize">{log.action}</span>
                      </div>
                      <span className="text-xs text-gray-500">{formatTimeAgo(log.timestamp)}</span>
                    </div>
                    {log.details && (
                      <p className="text-xs text-gray-400 mt-1 ml-7">{log.details}</p>
                    )}
                    {log.ip && (
                      <p className="text-xs text-gray-600 mt-1 ml-7">IP: {log.ip}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Session Info */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">{t('auth.userCenter.sessionInfo')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('auth.userCenter.browser')}</span>
                <span className="text-gray-300">Chrome 120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('auth.userCenter.device')}</span>
                <span className="text-gray-300">Desktop</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('auth.userCenter.location')}</span>
                <span className="text-gray-300">Shanghai, CN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
