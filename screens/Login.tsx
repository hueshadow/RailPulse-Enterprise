import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login({ username, password, remember });
      if (!result.success && result.error) {
        setError(t(result.error));
      }
    } catch (err) {
      setError(t('auth.errors.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rail-dark flex items-center justify-center relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 login-bg-grid opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rail-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-card p-8 animate-scale-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rail-primary to-cyan-400 flex items-center justify-center shadow-glow-primary">
                <span className="material-symbols-outlined text-2xl text-black font-bold">train</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">RailPulse</h1>
                <p className="text-xs text-gray-400 tracking-widest uppercase">Enterprise</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{t('auth.login.subtitle')}</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="glass-card-danger p-3 mb-6 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rail-danger text-lg">error</span>
                <span className="text-sm text-rail-danger">{error}</span>
              </div>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t('auth.login.username')}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">person</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input w-full pl-10 pr-4 py-3 rounded-lg text-white placeholder-gray-500"
                  placeholder={t('auth.login.usernamePlaceholder')}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t('auth.login.password')}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-10 pr-4 py-3 rounded-lg text-white placeholder-gray-500"
                  placeholder={t('auth.login.passwordPlaceholder')}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all ${
                    remember
                      ? 'bg-rail-primary border-rail-primary'
                      : 'border-gray-600 group-hover:border-gray-500'
                  }`}>
                    {remember && (
                      <span className="material-symbols-outlined text-black text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">check</span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300">{t('auth.login.rememberMe')}</span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="glass-button-solid w-full py-3 rounded-lg font-semibold text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>{t('auth.login.loggingIn')}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">login</span>
                  <span>{t('auth.login.submit')}</span>
                </>
              )}
            </button>
          </form>

          {/* Demo accounts hint */}
          <div className="mt-6 pt-6 border-t border-rail-border/50">
            <p className="text-xs text-gray-500 text-center mb-3">{t('auth.login.demoHint')}</p>
            <div className="grid grid-cols-3 gap-2">
              {['admin', 'dispatcher', 'analyst'].map((user) => (
                <button
                  key={user}
                  onClick={() => { setUsername(user); setPassword(user); }}
                  className="glass-button px-2 py-1.5 rounded text-xs hover:bg-rail-primary/20"
                >
                  {user}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          © 2024 RailPulse Enterprise. {t('auth.login.allRightsReserved')}
        </p>
      </div>
    </div>
  );
};
