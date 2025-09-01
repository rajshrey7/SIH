#!/bin/bash

echo "🚀 Quick Start Guide for NextAuth v4 in VS Code"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project directory detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "🔑 Creating .env file..."
    cat > .env << EOF
DATABASE_URL=file:./prisma/dev.db
AUTH_SECRET=af202261fb427dfe6ade14e8be819f44fa0ca0a3
AUTH_GITHUB_ID=0v23li3nUSoodxGsLiWI
AUTH_GITHUB_SECRET=your-github-client-secret-here
NEXTAUTH_URL=http://localhost:3000
EOF
    echo "✅ .env file created"
    echo "⚠️  Don't forget to update your GitHub Client Secret!"
else
    echo "✅ .env file already exists"
fi

# Initialize database
echo "🗄️ Setting up database..."
npm run db:push

# Start development server
echo "🌟 Starting development server..."
echo "📱 Open http://localhost:3000 in your browser"
echo "⚠️  Remember to update your GitHub Client Secret in .env file!"
echo ""
echo "🚀 To open in VS Code, run: code ."
echo "📚 For detailed instructions, see RUNNING_IN_VSCODE.md"
echo ""

npm run dev