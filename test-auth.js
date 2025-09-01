// Simple test to verify authentication setup
const fs = require('fs');
const path = require('path');

// Check if required files exist
const requiredFiles = [
  'src/app/api/auth/[...nextauth]/route.ts',
  'src/app/auth/signin/page.tsx',
  'src/app/auth/signup/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/lib/auth.ts',
  'src/components/providers/SessionProvider.tsx',
  'prisma/schema.prisma',
  '.env'
];

console.log('🔍 Checking authentication setup...\n');

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(file);
  if (fs.existsSync(filePath)) {
    console.log('✅', file);
  } else {
    console.log('❌', file, '- MISSING');
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 All required authentication files are present!');
} else {
  console.log('\n⚠️  Some required files are missing!');
}

// Check package.json for required dependencies
console.log('\n📦 Checking dependencies...\n');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['next-auth', '@next-auth/prisma-adapter', 'bcryptjs'];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log('✅', dep, `v${packageJson.dependencies[dep]}`);
  } else {
    console.log('❌', dep, '- MISSING');
  }
});

// Check if auth configuration is properly set up
console.log('\n⚙️  Checking authentication configuration...\n');
try {
  const authConfig = fs.readFileSync('src/lib/auth.ts', 'utf8');
  if (authConfig.includes('NextAuth') && authConfig.includes('CredentialsProvider')) {
    console.log('✅ NextAuth configuration found');
  } else {
    console.log('❌ NextAuth configuration incomplete');
  }
} catch (error) {
  console.log('❌ Could not read auth configuration');
}

console.log('\n🚀 Authentication setup check complete!');
console.log('\nTo test the application:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000');
console.log('3. Try signing up with demo credentials');
console.log('4. Test sign in functionality');
console.log('5. Access protected dashboard routes');