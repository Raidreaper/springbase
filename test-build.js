#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing build process...');

try {
  // Check if all required dependencies are available
  console.log('📦 Checking dependencies...');
  execSync('npm list vite', { stdio: 'inherit' });
  execSync('npm list @vitejs/plugin-react', { stdio: 'inherit' });
  execSync('npm list typescript', { stdio: 'inherit' });
  
  // Clean previous build
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync(distPath, { recursive: true, force: true });
  }
  
  // Run the build
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Verify build output
  if (fs.existsSync(distPath)) {
    console.log('✅ Build completed successfully!');
    console.log(`📁 Output directory: ${distPath}`);
    
    // List build contents
    const files = fs.readdirSync(distPath);
    console.log('📋 Build contents:', files);
    
    // Check for key files
    const hasIndexHtml = files.includes('index.html');
    const hasAssets = fs.existsSync(path.join(distPath, 'assets'));
    
    if (hasIndexHtml && hasAssets) {
      console.log('🎉 All required build files are present!');
    } else {
      console.log('⚠️  Some build files may be missing');
    }
  } else {
    throw new Error('Build output directory not found');
  }
  
} catch (error) {
  console.error('❌ Build test failed:', error.message);
  process.exit(1);
}
