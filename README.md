<div align="center">
<img width="1200" height="475" alt="RailPulse Enterprise" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# RailPulse Enterprise

Urban Rail Transit Operations Command Platform

## 🚀 Live Demo

**[View Live Application](https://railpulse-enterprise.netlify.app)**

### Demo Accounts
- **Username:** `admin` / **Password:** `admin`
- **Username:** `dispatcher` / **Password:** `dispatcher`
- **Username:** `analyst` / **Password:** `analyst`

## 📋 Overview

RailPulse Enterprise is a comprehensive urban rail transit operations command platform built with React, TypeScript, and modern web technologies. It provides real-time monitoring, task management, and operational insights for urban rail systems.

### ✨ Features

- **Multi-language Support** - Chinese/English switching
- **User Authentication** - Secure login system with role-based access
- **Glassmorphism UI** - Modern, elegant design system
- **Task Management** - Interactive task board for field services
- **Real-time Monitoring** - Equipment health and system status
- **Data Visualization** - Charts and analytics dashboards
- **Responsive Design** - Optimized for desktop and mobile

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Charts:** Custom chart components
- **State Management:** React Context
- **Deployment:** Netlify

## 🏃‍♂️ Run Locally

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hueshadow/RailPulse-Enterprise.git
   cd RailPulse-Enterprise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment

### Automatic Deployment

This project is configured for automatic deployment to Netlify via GitHub integration.

1. Push to the `main` branch
2. Netlify automatically builds and deploys

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
RailPulse-Enterprise/
├── components/          # Reusable UI components
│   ├── charts/        # Chart components
│   ├── TaskBoard/     # Task management
│   ├── EquipmentHealthCard.tsx
│   ├── Layout.tsx
│   └── UserMenu.tsx
├── contexts/           # React Context providers
│   └── AuthContext.tsx
├── locales/           # Internationalization
│   ├── en.ts         # English translations
│   └── zh.ts         # Chinese translations
├── screens/           # Page components
│   ├── FieldService.tsx
│   ├── Login.tsx
│   ├── StationOps.tsx
│   └── UserCenter.tsx
├── types/             # TypeScript type definitions
│   └── auth.ts
└── netlify.toml       # Netlify configuration
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

© 2024 RailPulse Enterprise. All rights reserved.
