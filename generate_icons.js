const fs = require('fs');
const path = require('path');
const { createCanvas } = (() => {
  try { return require('canvas'); } catch (e) { return { createCanvas: null }; }
})();

// Minimal valid 1x1 PNG fallback if no canvas module, or draw nice icon if canvas available
function createSvgIcon(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#d97706"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="${size * 0.4}" fill="#ffffff">🍜</text>
    <text x="50%" y="78%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${size * 0.12}" fill="#fef3c7">MieAyamin</text>
  </svg>`;
}

const imgDir = path.join(__dirname, 'images');
fs.writeFileSync(path.join(imgDir, 'icon.svg'), createSvgIcon(512));
console.log('Created icon.svg');
