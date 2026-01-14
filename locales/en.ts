export default {
  // Common
  common: {
    systemNormal: 'SYSTEM NORMAL',
    operations: 'Operations',
    analytics: 'Analytics',
    mobile: 'Mobile',
    timeAgo: {
      justNow: 'Just now',
      minutes: '{{count}}m ago',
      hours: '{{count}}h ago',
      days: '{{count}}d ago',
    },
  },

  // Navigation
  nav: {
    networkOverview: 'Network Overview',
    incidentCommand: 'Incident Command',
    lineDetail: 'Line Detail',
    stationOps: 'Station Ops',
    forecasting: 'Forecasting',
    fieldService: 'Field Service',
  },

  // Screen titles
  screens: {
    overview: 'Network Overview',
    'incident-command': 'Incident Command',
    'line-detail': 'Line Detail',
    'station-ops': 'Station Ops',
    forecasting: 'Forecasting',
    'field-service': 'Field Service',
    'user-center': 'User Center',
  },

  // Language
  language: {
    switch: 'Language',
    en: 'English',
    zh: '中文',
  },

  // Authentication
  auth: {
    login: {
      subtitle: 'Urban Rail Transit Operations Command Platform',
      username: 'Username',
      usernamePlaceholder: 'Enter your username',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      submit: 'Sign In',
      loggingIn: 'Signing in...',
      demoHint: 'Demo accounts (password same as username):',
      allRightsReserved: 'All rights reserved.',
    },
    errors: {
      userNotFound: 'User not found',
      invalidPassword: 'Invalid password',
      networkError: 'Network error, please try again',
    },
    roles: {
      admin: 'Administrator',
      dispatcher: 'Dispatcher',
      supervisor: 'Supervisor',
      fieldTech: 'Field Technician',
      analyst: 'Analyst',
      viewer: 'Viewer',
    },
    userCenter: {
      title: 'User Center',
      subtitle: 'Manage your account and preferences',
      logout: 'Sign Out',
      lastLogin: 'Last login',
      quickActions: 'Quick Actions',
      settings: 'Settings',
      notifications: 'Notifications',
      help: 'Help & Support',
      permissions: 'Permissions',
      permissionsDesc: 'Your current role permissions',
      activityLog: 'Activity Log',
      noActivity: 'No recent activity',
      sessionInfo: 'Session Info',
      browser: 'Browser',
      device: 'Device',
      location: 'Location',
    },
    userMenu: {
      userCenter: 'User Center',
      settings: 'Settings',
      help: 'Help',
      logout: 'Sign Out',
    },
    permissions: {
      groups: {
        network: 'Network',
        incidents: 'Incidents',
        lines: 'Lines',
        stations: 'Stations',
        forecasting: 'Forecasting',
        fieldService: 'Field Service',
        users: 'Users',
        system: 'System',
      },
      view_network: 'View',
      view_incidents: 'View',
      manage_incidents: 'Manage',
      view_lines: 'View',
      manage_lines: 'Manage',
      view_stations: 'View',
      manage_stations: 'Manage',
      view_forecasting: 'View',
      execute_forecasting: 'Execute',
      view_field_service: 'View',
      manage_field_service: 'Manage',
      view_users: 'View',
      manage_users: 'Manage',
      system_settings: 'Settings',
    },
  },

  // Equipment
  equipment: {
    types: {
      escalator: 'Escalator',
      elevator: 'Elevator',
      gate: 'Fare Gate',
      signal: 'Signal',
      switch: 'Switch',
      sensor: 'Sensor',
      ac: 'HVAC',
      power: 'Power Supply',
    },
    status: {
      healthy: 'Healthy',
      warning: 'Warning',
      critical: 'Critical',
    },
    lifespan: 'Lifespan',
    operationHours: 'Operation Hours',
    failures: 'Failures',
    times: 'times',
    lastMaintenance: 'Last maintenance',
    nextIn: 'Next in {{days}}d',
    overdue: 'Overdue',
    healthy: 'Healthy',
    warning: 'Warning',
    critical: 'Critical',
  },

  // Task Board
  taskBoard: {
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    dropHere: 'Drop tasks here',
    noTasks: 'No tasks',
  },
};
