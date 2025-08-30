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
  
  // Copy _redirects file to dist directory for Vercel
  const redirectsSource = path.join(process.cwd(), 'public', '_redirects');
  const redirectsDest = path.join(process.cwd(), 'dist', '_redirects');
  
  if (fs.existsSync(redirectsSource)) {
    fs.copyFileSync(redirectsSource, redirectsDest);
    console.log('✅ _redirects file copied to dist directory');
  }
  
  // Copy vercel.json from public to dist directory
  const vercelSource = path.join(process.cwd(), 'public', 'vercel.json');
  const vercelDest = path.join(process.cwd(), 'dist', 'vercel.json');
  
  if (fs.existsSync(vercelSource)) {
    fs.copyFileSync(vercelSource, vercelDest);
    console.log('✅ vercel.json copied to dist directory');
  }
  
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
