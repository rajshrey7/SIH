# 🚀 Complete Procedure to Run NextAuth v4 in VS Code

## 📋 Prerequisites

Before you begin, ensure you have:
- **VS Code** installed
- **Node.js 18+** installed
- **Git** installed
- **GitHub OAuth credentials** (Client ID and Secret)

---

## 🛠️ Step 1: Clone and Open Project in VS Code

### 1.1 Clone the Repository
```bash
# Clone your GitHub repository
git clone https://github.com/rajshrey7/SIH.git

# Navigate to the project directory
cd SIH

# Open the project in VS Code
code .
```

### 1.2 Alternative: Open Existing Project
If you already have the project:
```bash
# Navigate to your project directory
cd /path/to/your/project

# Open in VS Code
code .
```

---

## 🔧 Step 2: Install Dependencies

### 2.1 Open Terminal in VS Code
- **VS Code Menu**: `Terminal > New Terminal`
- **Keyboard Shortcut**: `Ctrl + ` ` (backtick)

### 2.2 Install Node.js Dependencies
```bash
# Install all npm packages
npm install
```

**Expected Output:**
```
added 869 packages, and audited 870 packages in 25s
286 packages are looking for funding
  run `npm fund` for details
3 moderate severity vulnerabilities
```

---

## 🔑 Step 3: Set Up Environment Variables

### 3.1 Create .env File
In VS Code:
1. **Create new file**: `.env` in the root directory
2. **Add the following content**:

```env
DATABASE_URL=file:./prisma/dev.db
AUTH_SECRET=af202261fb427dfe6ade14e8be819f44fa0ca0a3
AUTH_GITHUB_ID=0v23li3nUSoodxGsLiWI
AUTH_GITHUB_SECRET=your-github-client-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### 3.2 Get GitHub OAuth Credentials
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: `STEM Learning Platform`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click **"Register application"**
5. Copy your **Client ID** and **Client Secret**
6. **Update .env file**:
   ```env
   # Replace this line with your actual Client Secret
   AUTH_GITHUB_SECRET=your-actual-github-client-secret-here
   ```

---

## 🗄️ Step 4: Set Up Database

### 4.1 Initialize Database
In VS Code terminal:
```bash
# Push Prisma schema to database
npm run db:push
```

**Expected Output:**
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
🚀  Your database is now in sync with your schema. Done in 23ms
```

### 4.2 Verify Database File
Check that the database file was created:
- **Location**: `prisma/dev.db`
- **VS Code Explorer**: You should see `dev.db` in the `prisma` folder

---

## 🚀 Step 5: Run the Development Server

### 5.1 Start Development Server
In VS Code terminal:
```bash
# Start the development server
npm run dev
```

**Expected Output:**
```
[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): server.ts src/**/*
[nodemon] watching extensions: ts,tsx,js,jsx
[nodemon] starting `npx tsx server.ts`
> Ready on http://0.0.0.0:3000
> Socket.IO server running at ws://0.0.0.0:3000/api/socketio
○ Compiling /...
✓ Compiled / in 6.7s (885 modules)
```

### 5.2 Access the Application
- **Open Browser**: Go to `http://localhost:3000`
- **Expected**: STEM Learning Platform homepage should load

---

## 🧪 Step 6: Test Authentication

### 6.1 Test Sign In
1. **Click "Sign In" button** on the homepage
2. **Redirect to GitHub**: Should redirect to GitHub OAuth page
3. **Authorize**: Click "Authorize" on GitHub
4. **Redirect Back**: Should return to your application
5. **Check Authentication**: You should see user info in the header

### 6.2 Test Session
Open browser developer tools:
1. **Console**: Check for any errors
2. **Network Tab**: Check `/api/auth/session` request
   - **Status**: Should be `200`
   - **Response**: Should contain session data

### 6.3 Test Sign Out
1. **Click user avatar** in the header
2. **Click "Sign Out"**
3. **Verify**: Should return to unauthenticated state

---

## 🔍 Step 7: Troubleshooting Common Issues

### 7.1 Port Already in Use
**Error**: `EADDRINUSE: address already in use 0.0.0.0:3000`

**Solution**:
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 <process_id>

# Or use this command
npx kill-port 3000
```

### 7.2 Database Issues
**Error**: `Error: ENOENT: no such file or directory, open './prisma/dev.db'`

**Solution**:
```bash
# Create prisma directory if it doesn't exist
mkdir -p prisma

# Run database push again
npm run db:push
```

### 7.3 Environment Variables Not Loading
**Error**: `AUTH_GITHUB_ID is not defined`

**Solution**:
1. **Check .env file location**: Must be in root directory
2. **Restart server**: Stop and restart `npm run dev`
3. **Verify syntax**: No quotes around values, no spaces around `=`

### 7.4 GitHub OAuth Issues
**Error**: `redirect_uri_mismatch` on GitHub

**Solution**:
1. **Check GitHub OAuth App settings**
2. **Verify callback URL**: `http://localhost:3000/api/auth/callback/github`
3. **Update .env**: Ensure `NEXTAUTH_URL=http://localhost:3000`

### 7.5 TypeScript Errors
**Error**: TypeScript compilation errors

**Solution**:
```bash
# Install TypeScript types if missing
npm install --save-dev @types/node @types/react @types/react-dom

# Build the project
npm run build

# Check for errors
npm run lint
```

---

## 🛠️ Step 8: VS Code Setup (Optional but Recommended)

### 8.1 Install Recommended Extensions
Install these VS Code extensions for better development experience:

1. **ESLint**: `dbaeumer.vscode-eslint`
2. **Prettier**: `esbenp.prettier-vscode`
3. **Prisma**: `Prisma.prisma`
4. **Tailwind CSS**: `bradlc.vscode-tailwindcss`
5. **TypeScript Importer**: `pmneo.tsimporter`

### 8.2 Configure VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### 8.3 Configure VS Code Tasks
Create `.vscode/tasks.json` for common tasks:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Development Server",
      "type": "shell",
      "command": "npm run dev",
      "group": "build",
      "isBackground": true,
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Build Project",
      "type": "shell",
      "command": "npm run build",
      "group": "build"
    },
    {
      "label": "Run Linting",
      "type": "shell",
      "command": "npm run lint",
      "group": "build"
    }
  ]
}
```

---

## 🚀 Step 9: Development Workflow

### 9.1 Daily Development
```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Start development server
npm run dev

# 4. Make changes and test
# VS Code will automatically recompile on save
```

### 9.2 Testing Changes
```bash
# Run linter
npm run lint

# Build project
npm run build

# Test production build
npm start
```

### 9.3 Database Changes
```bash
# After changing prisma/schema.prisma
npm run db:push

# Or for production migrations
npm run db:migrate
```

---

## 📱 Step 10: Access the Application

### 10.1 Local Development
- **URL**: `http://localhost:3000`
- **API Routes**: `http://localhost:3000/api/*`
- **NextAuth**: `http://localhost:3000/api/auth/*`

### 10.2 Key Features to Test
1. **Homepage**: `http://localhost:3000`
2. **Sign In**: `http://localhost:3000/auth/signin`
3. **Dashboard**: `http://localhost:3000/dashboard` (protected)
4. **API Health**: `http://localhost:3000/api/health`

---

## 🎯 Success Criteria

Your project is successfully running when:

✅ **VS Code opens without errors**
✅ **`npm install` completes successfully**
✅ **`npm run db:push` creates database file**
✅ **`npm run dev` starts without errors**
✅ **Browser shows `http://localhost:3000`**
✅ **GitHub OAuth sign-in works**
✅ **Session management works**
✅ **All pages load without errors**

---

## 🆘 Getting Help

### Common Issues and Solutions:
1. **Server won't start**: Check port 3000 is free
2. **Database errors**: Run `npm run db:push`
3. **OAuth fails**: Check GitHub OAuth settings
4. **TypeScript errors**: Run `npm run build`

### Debug Commands:
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check installed packages
npm list

# Check running processes
ps aux | grep node

# Check port usage
lsof -i :3000
```

---

## 🎉 Congratulations!

You have successfully set up and running your NextAuth v4 project in VS Code! 

**Next Steps:**
1. Start building your features
2. Test the authentication flow
3. Deploy to production when ready

**Happy Coding!** 🚀