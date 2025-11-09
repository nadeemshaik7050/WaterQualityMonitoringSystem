# Water Quality User Portal - Installation Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

1. **Navigate to project directory**
```bash
cd /path/to/your/project/ADMIN-PORTAL


## Install dependencies
npm install

## Add your keycloack url's, realm name and client ids in keycloack utils and config.js


# Start development server
npm run dev

# Build production version
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

src/
├── api/            # API service calls
├── components/     # Reusable UI components
├── context/        # User and Auth context
├── hooks/          # Custom hooks
├── lib/            # Keycloak configuration
├── pages/          # Route pages: Dashboard, MakeReview, Profile, Rankings
├── App.jsx         # App routing
└── main.jsx        # Entry point

