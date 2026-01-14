export default {
  // Common
  common: {
    systemNormal: '系统正常',
    operations: '运营管理',
    analytics: '数据分析',
    mobile: '移动端',
    timeAgo: {
      justNow: '刚刚',
      minutes: '{{count}}分钟前',
      hours: '{{count}}小时前',
      days: '{{count}}天前',
    },
  },

  // Navigation
  nav: {
    networkOverview: '网络总览',
    incidentCommand: '事件指挥',
    lineDetail: '线路详情',
    stationOps: '车站运营',
    forecasting: '预测分析',
    fieldService: '现场服务',
  },

  // Screen titles
  screens: {
    overview: '网络总览',
    'incident-command': '事件指挥',
    'line-detail': '线路详情',
    'station-ops': '车站运营',
    forecasting: '预测分析',
    'field-service': '现场服务',
    'user-center': '用户中心',
  },

  // Language
  language: {
    switch: '语言',
    en: 'English',
    zh: '中文',
  },

  // Authentication
  auth: {
    login: {
      subtitle: '城市轨道交通运营指挥平台',
      username: '用户名',
      usernamePlaceholder: '请输入用户名',
      password: '密码',
      passwordPlaceholder: '请输入密码',
      rememberMe: '记住我',
      submit: '登录',
      loggingIn: '登录中...',
      demoHint: '演示账户（密码与用户名相同）：',
      allRightsReserved: '版权所有',
    },
    errors: {
      userNotFound: '用户不存在',
      invalidPassword: '密码错误',
      networkError: '网络错误，请重试',
    },
    roles: {
      admin: '系统管理员',
      dispatcher: '调度员',
      supervisor: '主管',
      fieldTech: '现场技术员',
      analyst: '分析师',
      viewer: '访客',
    },
    userCenter: {
      title: '用户中心',
      subtitle: '管理您的账户和偏好设置',
      logout: '退出登录',
      lastLogin: '上次登录',
      quickActions: '快捷操作',
      settings: '设置',
      notifications: '通知',
      help: '帮助与支持',
      permissions: '权限',
      permissionsDesc: '您当前角色的权限列表',
      activityLog: '活动日志',
      noActivity: '暂无活动记录',
      sessionInfo: '会话信息',
      browser: '浏览器',
      device: '设备',
      location: '位置',
    },
    userMenu: {
      userCenter: '用户中心',
      settings: '设置',
      help: '帮助',
      logout: '退出登录',
    },
    permissions: {
      groups: {
        network: '网络',
        incidents: '事件',
        lines: '线路',
        stations: '车站',
        forecasting: '预测',
        fieldService: '现场服务',
        users: '用户',
        system: '系统',
      },
      view_network: '查看',
      view_incidents: '查看',
      manage_incidents: '管理',
      view_lines: '查看',
      manage_lines: '管理',
      view_stations: '查看',
      manage_stations: '管理',
      view_forecasting: '查看',
      execute_forecasting: '执行',
      view_field_service: '查看',
      manage_field_service: '管理',
      view_users: '查看',
      manage_users: '管理',
      system_settings: '设置',
    },
  },

  // Equipment
  equipment: {
    types: {
      escalator: '扶梯',
      elevator: '电梯',
      gate: '闸机',
      signal: '信号',
      switch: '道岔',
      sensor: '传感器',
      ac: '空调',
      power: '供电设备',
    },
    status: {
      healthy: '正常',
      warning: '警告',
      critical: '故障',
    },
    lifespan: '剩余寿命',
    operationHours: '运行时长',
    failures: '故障次数',
    times: '次',
    lastMaintenance: '上次维护',
    nextIn: '{{days}}天后维护',
    overdue: '逾期',
    healthy: '正常',
    warning: '警告',
    critical: '故障',
  },

  // Task Board
  taskBoard: {
    pending: '待处理',
    inProgress: '处理中',
    completed: '已完成',
    dropHere: '拖放任务到这里',
    noTasks: '暂无任务',
  },
};
