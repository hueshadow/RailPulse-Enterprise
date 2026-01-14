import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { ROLE_LABELS } from '../types/auth';
import { ScreenType } from '../types';

interface UserMenuProps {
  onNavigate: (screen: ScreenType) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleUserCenter = () => {
    setIsOpen(false);
    onNavigate('user-center' as ScreenType);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rail-primary to-purple-500 flex items-center justify-center text-sm font-bold text-white">
          {user.displayName.charAt(0).toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm text-white font-medium leading-tight">{user.displayName}</p>
          <p className="text-xs text-gray-400 leading-tight">{t(ROLE_LABELS[user.role])}</p>
        </div>
        <span className={`material-symbols-outlined text-gray-400 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 glass-card rounded-xl p-2 shadow-glass-lg animate-scale-in z-50">
          {/* User Info Header */}
          <div className="px-3 py-2 border-b border-rail-border/50 mb-2">
            <p className="text-white font-medium">{user.displayName}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <button
              onClick={handleUserCenter}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left group"
            >
              <span className="material-symbols-outlined text-gray-400 group-hover:text-rail-primary transition-colors">account_circle</span>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {t('auth.userMenu.userCenter')}
              </span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left group"
            >
              <span className="material-symbols-outlined text-gray-400 group-hover:text-rail-primary transition-colors">settings</span>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {t('auth.userMenu.settings')}
              </span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left group"
            >
              <span className="material-symbols-outlined text-gray-400 group-hover:text-rail-primary transition-colors">help</span>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {t('auth.userMenu.help')}
              </span>
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-rail-border/50 mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-rail-danger/10 transition-colors text-left group"
            >
              <span className="material-symbols-outlined text-rail-danger">logout</span>
              <span className="text-sm text-rail-danger">
                {t('auth.userMenu.logout')}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
