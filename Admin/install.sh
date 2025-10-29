#!/bin/bash

echo "🌊 Water Quality Admin Portal - Installation Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install additional packages
echo "📦 Installing additional packages..."
npm install react-router-dom @tanstack/react-query axios keycloak-js react-hook-form lucide-react
npm install -D tailwindcss postcss autoprefixer

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your Keycloak configuration"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📖 For more information, check QUICKSTART.md"
