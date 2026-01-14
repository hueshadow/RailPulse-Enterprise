import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, ActivityLog, MOCK_USERS, Permission } from '../types/auth';

// Auth context type
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  activityLogs: ActivityLog[];
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEY = 'railpulse_auth';
const ACTIVITY_KEY = 'railpulse_activity';

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // Load auth state from storage on mount
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.user && parsed.isAuthenticated) {
            setAuthState({
              isAuthenticated: true,
              user: parsed.user,
              loading: false
            });
            // Load activity logs
            const storedActivity = localStorage.getItem(ACTIVITY_KEY);
            if (storedActivity) {
              setActivityLogs(JSON.parse(storedActivity));
            }
            return;
          }
        }
      } catch (e) {
        console.error('Failed to load auth state:', e);
      }
      setAuthState(prev => ({ ...prev, loading: false }));
    };

    // Simulate async loading
    setTimeout(loadAuthState, 500);
  }, []);

  // Add activity log
  const addActivityLog = useCallback((action: string, details?: string) => {
    const newLog: ActivityLog = {
      id: `log_${Date.now()}`,
      action,
      timestamp: new Date(),
      details,
      ip: '192.168.1.100' // Mock IP
    };
    setActivityLogs(prev => {
      const updated = [newLog, ...prev].slice(0, 50); // Keep last 50 logs
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = MOCK_USERS[credentials.username];

    if (!mockUser) {
      return { success: false, error: 'auth.errors.userNotFound' };
    }

    if (mockUser.password !== credentials.password) {
      return { success: false, error: 'auth.errors.invalidPassword' };
    }

    const user: User = {
      ...mockUser.user,
      lastLogin: new Date()
    };

    setAuthState({
      isAuthenticated: true,
      user,
      loading: false
    });

    // Save to storage if remember is checked
    if (credentials.remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        isAuthenticated: true,
        user
      }));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        isAuthenticated: true,
        user
      }));
    }

    addActivityLog('login', `User ${user.username} logged in`);

    return { success: true };
  }, [addActivityLog]);

  // Logout function
  const logout = useCallback(() => {
    if (authState.user) {
      addActivityLog('logout', `User ${authState.user.username} logged out`);
    }

    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });

    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  }, [authState.user, addActivityLog]);

  // Permission check functions
  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!authState.user) return false;
    return authState.user.permissions.includes(permission);
  }, [authState.user]);

  const hasAnyPermission = useCallback((permissions: Permission[]): boolean => {
    if (!authState.user) return false;
    return permissions.some(p => authState.user!.permissions.includes(p));
  }, [authState.user]);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    activityLogs
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Permission gate component
interface PermissionGateProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  children
}) => {
  const { user, hasPermission, hasAnyPermission } = useAuth();

  if (!user) return <>{fallback}</>;

  if (permission) {
    return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
  }

  if (permissions) {
    if (requireAll) {
      const hasAll = permissions.every(p => hasPermission(p));
      return hasAll ? <>{children}</> : <>{fallback}</>;
    }
    return hasAnyPermission(permissions) ? <>{children}</> : <>{fallback}</>;
  }

  return <>{children}</>;
};
