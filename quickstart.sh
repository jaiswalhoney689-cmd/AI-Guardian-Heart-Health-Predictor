#!/bin/bash

# Quick start script - run this after Node.js is installed

cd "$(dirname "$0")"

echo "🏥 CardioCheck AI - Quick Start"
echo "==============================="
echo ""

# Verify Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js first from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo ""

# Backend setup
echo "📦 Backend Setup..."
cd backend
npm install 2>&1 | tail -5
echo ""

# Frontend setup  
echo "📦 Frontend Setup..."
cd ../frontend
npm install 2>&1 | tail -5
echo ""

echo "✅ Dependencies installed!"
echo ""
echo "🚀 Starting servers..."
echo ""
echo "Open two terminal windows and run:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd \"$(pwd)/../backend\" && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd \"$(pwd)\" && npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
