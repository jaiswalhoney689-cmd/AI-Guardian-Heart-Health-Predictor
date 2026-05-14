#!/bin/bash

# CardioCheck AI - Setup Script
# This script sets up the entire project with all dependencies

echo "🏥 CardioCheck AI - Project Setup"
echo "=================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo ""
    echo "To install Node.js, choose one of these methods:"
    echo ""
    echo "Option 1: Using Homebrew (Recommended)"
    echo "  1. Install Homebrew: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "  2. Install Node.js: brew install node@18"
    echo ""
    echo "Option 2: Download directly"
    echo "  Visit https://nodejs.org/ and download the LTS version (v18 or higher)"
    echo ""
    echo "Option 3: Using NVM (Node Version Manager)"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "  nvm install 18"
    echo "  nvm use 18"
    echo ""
    exit 1
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)

echo "✅ Node.js: $NODE_VERSION"
echo "✅ npm: $NPM_VERSION"
echo ""

# Check for Gemini API Key
if [ -z "$GEMINI_API_KEY" ]; then
    echo "⚠️  GEMINI_API_KEY not set in environment"
    echo "   Get a free API key from: https://aistudio.google.com/app/apikey"
    echo ""
fi

# Setup Backend
echo "📦 Setting up Backend..."
cd "$(dirname "$0")/backend"

if [ ! -f ".env" ]; then
    echo "  Creating .env file..."
    cp .env.example .env
    echo "  ⚠️  Edit .env and add your GEMINI_API_KEY"
fi

if [ ! -d "node_modules" ]; then
    echo "  Installing backend dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        echo "  ✅ Backend dependencies installed"
    else
        echo "  ❌ Failed to install backend dependencies"
        exit 1
    fi
else
    echo "  ✅ Backend dependencies already installed"
fi

echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd "../frontend"

if [ ! -d "node_modules" ]; then
    echo "  Installing frontend dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        echo "  ✅ Frontend dependencies installed"
    else
        echo "  ❌ Failed to install frontend dependencies"
        exit 1
    fi
else
    echo "  ✅ Frontend dependencies already installed"
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env and add your GEMINI_API_KEY"
echo "2. Open two terminal windows:"
echo "   - Terminal 1: cd backend && npm run dev"
echo "   - Terminal 2: cd frontend && npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
