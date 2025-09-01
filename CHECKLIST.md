# ✅ VS Code Setup Checklist

## 🚀 Pre-Setup Checklist

### System Requirements
- [ ] **Node.js 18+** installed (`node --version`)
- [ ] **npm** installed (`npm --version`)
- [ ] **VS Code** installed
- [ ] **Git** installed (`git --version`)

### Project Setup
- [ ] **Clone repository**: `git clone https://github.com/rajshrey7/SIH.git`
- [ ] **Navigate to project**: `cd SIH`
- [ ] **Open in VS Code**: `code .`

---

## 🔧 Installation Checklist

### Dependencies
- [ ] **Install npm packages**: `npm install`
- [ ] **Verify installation**: Check `node_modules/` folder exists
- [ ] **Check for errors**: No error messages in terminal

### Environment Configuration
- [ ] **Create `.env` file** in root directory
- [ ] **Add database URL**: `DATABASE_URL=file:./prisma/dev.db`
- [ ] **Add auth secret**: `AUTH_SECRET=af202261fb427dfe6ade14e8be819f44fa0ca0a3`
- [ ] **Add GitHub Client ID**: `AUTH_GITHUB_ID=0v23li3nUSoodxGsLiWI`
- [ ] **Add GitHub Client Secret**: `AUTH_GITHUB_SECRET=your-actual-secret-here`
- [ ] **Add NextAuth URL**: `NEXTAUTH_URL=http://localhost:3000`

### GitHub OAuth Setup
- [ ] **Go to GitHub Developer Settings**: https://github.com/settings/developers
- [ ] **Create new OAuth App**
- [ ] **Set Application name**: "STEM Learning Platform"
- [ ] **Set Homepage URL**: `http://localhost:3000`
- [ ] **Set Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
- [ ] **Register application**
- [ ] **Copy Client ID and Client Secret**
- [ ] **Update `.env` file** with actual credentials

---

## 🗄️ Database Setup Checklist

### Database Initialization
- [ ] **Run database push**: `npm run db:push`
- [ ] **Verify database file**: `prisma/dev.db` exists
- [ ] **Check for errors**: No Prisma errors in terminal

### Database Schema
- [ ] **Verify schema file**: `prisma/schema.prisma` exists
- [ ] **Check User model**: With NextAuth fields
- [ ] **Check Account model**: For OAuth providers
- [ ] **Check Session model**: For session management
- [ ] **Check VerificationToken model**: For email verification

---

## 🚀 Development Server Checklist

### Start Server
- [ ] **Start development server**: `npm run dev`
- [ ] **Check for errors**: No error messages in terminal
- [ ] **Verify server is running**: "Ready on http://0.0.0.0:3000" message
- [ ] **Check Socket.IO**: "Socket.IO server running" message

### Browser Access
- [ ] **Open browser**: Navigate to `http://localhost:3000`
- [ ] **Verify homepage loads**: STEM Learning Platform homepage
- [ ] **Check for console errors**: No JavaScript errors in browser console
- [ ] **Check network requests**: All resources load successfully

---

## 🔐 Authentication Testing Checklist

### Sign-In Flow
- [ ] **Click "Sign In" button**
- [ ] **Redirect to GitHub**: Should go to GitHub OAuth page
- [ ] **Authorize application**: Click "Authorize" on GitHub
- [ ] **Redirect back**: Should return to your application
- [ ] **Check user state**: Should be authenticated

### Session Management
- [ ] **Check session endpoint**: `/api/auth/session` returns 200
- [ ] **Verify session data**: Contains user information
- [ ] **Check session persistence**: Session survives page refresh
- [ ] **Test session expiration**: Session expires correctly

### Sign-Out Flow
- [ ] **Click user avatar**: Shows user menu
- [ ] **Click "Sign Out"**: Should sign out successfully
- [ ] **Verify sign-out**: Returns to unauthenticated state
- [ ] **Check session cleared**: Session data is removed

---

## 🛠️ VS Code Configuration Checklist

### Recommended Extensions
- [ ] **ESLint**: `dbaeumer.vscode-eslint`
- [ ] **Prettier**: `esbenp.prettier-vscode`
- [ **Prisma**: `Prisma.prisma`
- [ ] **Tailwind CSS**: `bradlc.vscode-tailwindcss`
- [ ] **TypeScript Importer**: `pmneo.tsimporter`

### VS Code Settings
- [ ] **Create `.vscode` folder**
- [ ] **Create `settings.json`**: With recommended settings
- [ ] **Create `tasks.json`**: With development tasks
- [ ] **Configure formatting**: Format on save enabled

### Debug Configuration
- [ ] **Create `.vscode/launch.json`**
- [ ] **Configure Node.js debugging**
- [ ] **Set breakpoints**: In key files
- [ ] **Test debugging**: Debug session works correctly

---

## 🧪 Testing Checklist

### Unit Tests
- [ ] **Run tests**: `npm test` (if tests exist)
- [ ] **Check test coverage**: All critical paths covered
- [ ] **Verify test results**: All tests pass

### Integration Tests
- [ ] **Test authentication flow**: End-to-end auth works
- [ ] **Test database operations**: CRUD operations work
- [ ] **Test API endpoints**: All endpoints return correct responses

### Browser Testing
- [ ] **Test in Chrome**: All features work
- [ ] **Test in Firefox**: All features work
- [ ] **Test in Safari**: All features work (if available)
- [ ] **Test mobile responsive**: Works on mobile devices

---

## 📦 Build & Deployment Checklist

### Build Process
- [ ] **Run build**: `npm run build`
- [ ] **Check for errors**: No build errors
- [ ] **Verify build output**: `.next` folder created
- [ ] **Test production build**: `npm start`

### Production Readiness
- [ ] **Set production environment variables**
- [ ] **Configure database for production**
- [ ] **Set up production OAuth credentials**
- [ ] **Test production deployment**

---

## 🎯 Success Criteria Checklist

### Core Functionality
- [ ] **Application starts** without errors
- [ ] **Homepage loads** correctly
- [ ] **Authentication works** with GitHub OAuth
- [ ] **Session management** functions properly
- [ ] **Database operations** work correctly

### Performance
- [ ] **Page load time** < 3 seconds
- [ ] **API response time** < 1 second
- [ ] **Database queries** optimized
- [ ] **Bundle size** reasonable

### Security
- [ ] **Environment variables** properly set
- [ ] **OAuth credentials** secure
- [ ] **Session management** secure
- [ ] **Database access** properly configured

### Code Quality
- [ ] **No TypeScript errors**
- [ ] **No ESLint errors**
- [ ] **Code properly formatted**
- [ ] **All tests pass**

---

## 🆘 Troubleshooting Checklist

### Common Issues
- [ ] **Port 3000 in use**: Kill process using port
- [ ] **Database errors**: Run `npm run db:push`
- [ ] **Environment variables**: Check `.env` file
- [ ] **OAuth issues**: Verify GitHub OAuth settings

### Debug Steps
- [ ] **Check console errors**: Browser and terminal
- [ ] **Check network requests**: Failed requests
- [ ] **Check logs**: Server and application logs
- [ ] **Clear cache**: Browser and Next.js cache

### Final Verification
- [ ] **All checkboxes above** are marked
- [ ] **Application works** as expected
- [ ] **No errors** in console or terminal
- [ ] **Ready for development** or production

---

## 🎉 Completion Checklist

### Project Ready
- [ ] **All setup steps** completed
- [ ] **All tests passing**
- [ ] **Documentation updated**
- [ ] **Ready for team use**

### Next Steps
- [ ] **Start development** of new features
- [ ] **Deploy to staging** environment
- [ ] **Set up CI/CD** pipeline
- [ ] **Monitor production** performance

---

**🎊 Congratulations! Your NextAuth v4 project is ready for VS Code development!**