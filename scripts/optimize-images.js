const fs = require('fs');
const path = require('path');

// Script para verificar otimização de imagens
function checkImageOptimization() {
  const publicDir = path.join(__dirname, '../public');
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
  const maxSize = 1024 * 1024; // 1MB
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (imageExtensions.some(ext => item.toLowerCase().endsWith(ext))) {
        const relativePath = path.relative(publicDir, fullPath);
        
        if (stat.size > maxSize) {
          console.warn(`⚠️  Large image detected: ${relativePath} (${Math.round(stat.size / 1024)}KB)`);
        } else {
          console.log(`✅ Optimized: ${relativePath} (${Math.round(stat.size / 1024)}KB)`);
        }
      }
    }
  }
  
  console.log('🔍 Checking image optimization...\n');
  scanDirectory(publicDir);
  console.log('\n✨ Image optimization check complete!');
}

if (require.main === module) {
  checkImageOptimization();
}

module.exports = { checkImageOptimization };