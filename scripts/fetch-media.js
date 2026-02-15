const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const FOLDER_MAP = {
  'kuala-lumpur': 'kuala-lumpur',
  'kuala-lumpur-fin': 'kuala-lumpur-fin',
  'cameron-highlands': 'cameron-highlands',
  'taman-negara': 'taman-negara',
  'kuala-besut': 'kuala-besut',
  'perhentian': 'perhentian',
  'cherating': 'cherating',
  'tioman': 'tioman',
  'singapour': 'singapour',
  'melaka': 'melaka',
  'kuala-selangor': 'kuala-selangor'
};

function inferLocation(publicId) {
  const id = publicId.toLowerCase();
  
  if (id.includes('kuala-lumpur') || id.includes('kl_') || id.includes('kl ')) return 'kuala-lumpur';
  if (id.includes('cameron') || id.includes('camero')) return 'cameron-highlands';
  if (id.includes('taman') || id.includes('jungle')) return 'taman-negara';
  if (id.includes('besut')) return 'kuala-besut';
  if (id.includes('perhentian') || id.includes('perenthian') || id.includes('peren')) return 'perhentian';
  if (id.includes('cherating')) return 'cherating';
  if (id.includes('tioman')) return 'tioman';
  if (id.includes('singapour') || id.includes('singapor') || id.includes('sing')) return 'singapour';
  if (id.includes('melaka') || id.includes('malacca')) return 'melaka';
  if (id.includes('selangor')) return 'kuala-selangor';
  
  // IMG_ numbers -> infer from IMG number ranges
  const imgMatch = publicId.match(/IMG_(\d+)/i);
  if (imgMatch) {
    const num = parseInt(imgMatch[1]);
    if (num >= 8012 && num <= 8077) return 'kuala-lumpur';
    if (num >= 8078 && num <= 8105) return 'taman-negara';
    if (num >= 8106 && num <= 8132) return 'kuala-besut';
    if (num >= 8133 && num <= 8170) return 'perhentian';
    if (num >= 8171 && num <= 8200) return 'cherating';
    if (num >= 8201 && num <= 8300) return 'tioman';
    if (num >= 8301 && num <= 8430) return 'singapour';
    if (num >= 8431 && num <= 8480) return 'melaka';
    if (num >= 8481 && num <= 8499) return 'kuala-lumpur-fin';
  }
  
  return 'unknown';
}

async function fetchAllMedia() {
  const results = {
    photos: {},
    videos: {}
  };
  
  try {
    const photos = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: 500
    });
    
    const videos = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'video',
      max_results: 500
    });
    
    console.log(`Photos: ${photos.resources.length}`);
    console.log(`Videos: ${videos.resources.length}\n`);
    
    // Process photos (exclude samples)
    for (const r of photos.resources) {
      if (r.public_id.startsWith('samples/')) continue;
      
      const location = inferLocation(r.public_id);
      const name = r.public_id.split('/').pop();
      
      if (!results.photos[location]) results.photos[location] = [];
      results.photos[location].push({
        name: name,
        publicId: r.public_id,
        url: r.secure_url,
        width: r.width,
        height: r.height
      });
    }
    
    // Process videos (exclude samples)
    for (const r of videos.resources) {
      if (r.public_id.startsWith('samples/')) continue;
      
      const location = inferLocation(r.public_id);
      const name = r.public_id.split('/').pop();
      
      if (!results.videos[location]) results.videos[location] = [];
      results.videos[location].push({
        name: name,
        publicId: r.public_id,
        url: r.secure_url,
        thumbnail: cloudinary.url(r.public_id, {
          resource_type: 'video',
          format: 'jpg',
          width: 640,
          height: 360,
          crop: 'fill',
          start_offset: 'auto'
        }),
        width: r.width,
        height: r.height,
        duration: Math.round(r.duration || 0)
      });
    }
    
    const outputFile = 'data/media-urls.json';
    require('fs').writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`Saved to ${outputFile}`);
    
    console.log('\n--- SUMMARY ---');
    console.log('\nPhotos:');
    for (const [folder, items] of Object.entries(results.photos)) {
      console.log(`  ${folder}: ${items.length}`);
    }
    console.log('\nVideos:');
    for (const [folder, items] of Object.entries(results.videos)) {
      console.log(`  ${folder}: ${items.length}`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchAllMedia();
