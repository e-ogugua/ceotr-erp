const fs = require('fs');
const path = require('path');

// List of HEIC files to convert
const heicFiles = [
  'public/images/portfolio/JepliggomProject.HEIC',
  'public/images/portfolio/JesusPowerArena.HEIC', 
  'public/images/portfolio/organicFarm.HEIC',
  'public/images/portfolio/poshpoulefarm2.HEIC',
  'public/images/portfolio/poshpoulefarms.HEIC',
  'public/images/portfolio/roka1.HEIC',
  'public/images/portfolio/rokaProject-delivery.HEIC',
  'public/images/portfolio/rokaTableWater.HEIC',
  'public/images/portfolio/roka.HEIC',
  'public/images/testimonials/testimonial4.HEIC'
];

console.log('Converting HEIC images to WebP...');
console.log('Found', heicFiles.length, 'HEIC files');

heicFiles.forEach(file => {
  const webpFile = file.replace('.HEIC', '.webp');
  console.log(`Would convert: ${file} -> ${webpFile}`);
});

console.log('Conversion script created. Run with: node convert-images.js');
