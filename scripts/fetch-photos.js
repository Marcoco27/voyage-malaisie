const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const LOCATION_CODES = {
  'KL01': 'kuala-lumpur',
  'KL02': 'kuala-lumpur-fin',
  'CH01': 'cameron-highlands',
  'CH02': 'cherating',
  'TN01': 'taman-negara',
  'KB01': 'kuala-besut',
  'PE01': 'perhentian',
  'PE02': 'perhentian',
  'TI01': 'tioman',
  'SG01': 'singapour',
  'ML01': 'melaka',
  'KS01': 'kuala-selangor'
};

async function fetchPhotos() {
  const results = {};
  
  try {
    // Search ALL images (no folder filter)
    const result = await cloudinary.search
      .expression('resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(200)
      .execute();
    
    console.log(`Found ${result.resources.length} total photos\n`);
    
    let matched = 0;
    let skipped = 0;
    
    for (const r of result.resources) {
      // Skip samples
      if (r.public_id.startsWith('samples') || r.public_id.startsWith('cld-') || r.public_id.startsWith('main-')) {
        skipped++;
        continue;
      }
      
      // Use display_name as the code
      let code = null;
      if (r.display_name) {
        code = r.display_name.toUpperCase().replace(/\s*\(\d+\)/, '');
      }
      
      // Also try to extract from filename directly
      if (!code) {
        const filename = r.public_id.split('/').pop();
        const match = filename.match(/^([A-Z]{2}\d{2})/i);
        if (match) code = match[1].toUpperCase();
      }
      
      const location = code ? LOCATION_CODES[code] : null;
      
      if (location) {
        matched++;
        if (!results[location]) results[location] = [];
        results[location].push({
          name: r.public_id.split('/').pop(),
          code: code,
          publicId: r.public_id,
          url: r.secure_url,
          width: r.width,
          height: r.height
        });
      } else {
        skipped++;
      }
    }
    
    console.log(`Matched: ${matched}, Skipped: ${skipped}`);
    
    const outputFile = 'data/media-urls.json';
    const currentData = require('fs').existsSync(outputFile) 
      ? JSON.parse(require('fs').readFileSync(outputFile, 'utf8'))
      : { photos: {}, videos: {} };
    
    currentData.photos = results;
    
    require('fs').writeFileSync(outputFile, JSON.stringify(currentData, null, 2));
    console.log(`\nSaved to ${outputFile}`);
    
    console.log('\n--- SUMMARY ---');
    let total = 0;
    for (const [location, items] of Object.entries(results)) {
      console.log(`  ${location}: ${items.length} photos`);
      total += items.length;
    }
    console.log(`\nTotal: ${total} photos`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchPhotos();
