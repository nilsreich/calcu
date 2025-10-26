#!/bin/bash

# Generate PWA icons from SVG
# This script uses ImageMagick or similar tools to convert SVG to PNG

echo "Generating PWA icons..."

# Check if we're in the right directory
if [ ! -f "public/icon.svg" ]; then
    echo "Error: public/icon.svg not found"
    exit 1
fi

# Create a simple colored square as fallback if no image conversion tool is available
# Using canvas in browser via node

cat > generate-icons.mjs << 'EOF'
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

const sizes = [64, 192, 512];

async function generateIcons() {
  const svgContent = fs.readFileSync('public/icon.svg', 'utf-8');
  
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(1, '#2563EB');
    
    // Draw rounded rectangle
    const radius = size * 0.225; // 115/512 ratio
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();
    
    // Add some calculator elements (simplified)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.roundRect(size * 0.15, size * 0.15, size * 0.7, size * 0.2, size * 0.04);
    ctx.fill();
    
    // Add button representation
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x = size * (0.15 + col * 0.25);
        const y = size * (0.4 + row * 0.17);
        const buttonSize = size * 0.14;
        ctx.beginPath();
        ctx.arc(x + buttonSize/2, y + buttonSize/2, buttonSize/2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Save
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/pwa-${size}x${size}.png`, buffer);
    if (size === 512) {
      fs.writeFileSync(`public/maskable-icon-${size}x${size}.png`, buffer);
    }
    console.log(`Generated pwa-${size}x${size}.png`);
  }
  
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
EOF

echo "Icon generation script created. Install canvas package to generate icons:"
echo "pnpm add -D canvas"
echo "Then run: node generate-icons.mjs"
