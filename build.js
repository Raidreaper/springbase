#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vite build process...');

try {
  // Check if vite is available
  console.log('📦 Checking dependencies...');
  execSync('npm list vite', { stdio: 'inherit' });
  
  // Run the build
  console.log('🔨 Building project...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Verify build output
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    console.log('✅ Build completed successfully!');
    console.log(`📁 Output directory: ${distPath}`);
    
    // List build contents
    const files = fs.readdirSync(distPath);
    console.log('📋 Build contents:', files);
  } else {
    throw new Error('Build output directory not found');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
