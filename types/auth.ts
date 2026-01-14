// User role types for RBAC
export type UserRole =
  | 'admin'        // 系统管理员 - 全部权限
  | 'dispatcher'   // 调度员 - 运营调度相关权限
  | 'supervisor'   // 主管 - 监控和审核权限
  | 'field_tech'   // 现场技术员 - 工单处理权限
  | 'analyst'      // 分析师 - 数据分析权限
  | 'viewer';      // 只读用户 - 查看权限

// Permission types
export type Permission =
  | 'view_network'         // 查看网络总览
  | 'view_incidents'       // 查看事件
  | 'manage_incidents'     // 管理事件（创建、更新、关闭）
  | 'view_lines'           // 查看线路
  | 'manage_lines'         // 管理线路调度
  | 'view_stations'        // 查看车站
  | 'manage_stations'      // 管理车站设备
  | 'view_forecasting'     // 查看预测
  | 'execute_forecasting'  // 执行预测模拟
  | 'view_field_service'   // 查看外勤服务
  | 'manage_field_service' // 管理工单
  | 'view_users'           // 查看用户
  | 'manage_users'         // 管理用户
  | 'system_settings';     // 系统设置

// User information
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  department?: string;
  lastLogin?: Date;
  createdAt?: Date;
}

// Authentication state
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// Login credentials
export interface LoginCredentials {
  username: string;
  password: string;
  remember?: boolean;
}

// Activity log entry
export interface ActivityLog {
  id: string;
  action: string;
  timestamp: Date;
  details?: string;
  ip?: string;
}

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'view_network', 'view_incidents', 'manage_incidents',
    'view_lines', 'manage_lines', 'view_stations', 'manage_stations',
    'view_forecasting', 'execute_forecasting',
    'view_field_service', 'manage_field_service',
    'view_users', 'manage_users', 'system_settings'
  ],
  dispatcher: [
    'view_network', 'view_incidents', 'manage_incidents',
    'view_lines', 'manage_lines', 'view_stations'
  ],
  supervisor: [
    'view_network', 'view_incidents', 'view_lines', 'view_stations',
    'view_forecasting', 'view_field_service', 'view_users'
  ],
  field_tech: [
    'view_field_service', 'manage_field_service', 'view_stations'
  ],
  analyst: [
    'view_network', 'view_lines', 'view_stations',
    'view_forecasting', 'execute_forecasting'
  ],
  viewer: [
    'view_network', 'view_lines', 'view_stations'
  ]
};

// Role display names (for i18n keys)
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'auth.roles.admin',
  dispatcher: 'auth.roles.dispatcher',
  supervisor: 'auth.roles.supervisor',
  field_tech: 'auth.roles.fieldTech',
  analyst: 'auth.roles.analyst',
  viewer: 'auth.roles.viewer'
};

// Mock users for development
export const MOCK_USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: 'admin',
    user: {
      id: 'usr_001',
      username: 'admin',
      displayName: '系统管理员',
      email: 'admin@railpulse.com',
      avatar: undefined,
      role: 'admin',
      permissions: ROLE_PERMISSIONS.admin,
      department: '信息技术部',
      lastLogin: new Date(),
      createdAt: new Date('2024-01-01')
    }
  },
  dispatcher: {
    password: 'dispatcher',
    user: {
      id: 'usr_002',
      username: 'dispatcher',
      displayName: '张调度',
      email: 'dispatcher@railpulse.com',
      role: 'dispatcher',
      permissions: ROLE_PERMISSIONS.dispatcher,
      department: '运营调度中心',
      lastLogin: new Date(),
      createdAt: new Date('2024-03-15')
    }
  },
  analyst: {
    password: 'analyst',
    user: {
      id: 'usr_003',
      username: 'analyst',
      displayName: '李分析',
      email: 'analyst@railpulse.com',
      role: 'analyst',
      permissions: ROLE_PERMISSIONS.analyst,
      department: '数据分析部',
      lastLogin: new Date(),
      createdAt: new Date('2024-05-20')
    }
  }
};
