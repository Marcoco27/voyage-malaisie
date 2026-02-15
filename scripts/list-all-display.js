const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function listAllWithDisplayName() {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(200)
      .execute();
    
    console.log('All photos with display_name:\n');
    for (const r of result.resources) {
      if (r.public_id.startsWith('samples') || r.public_id.startsWith('cld-') || r.public_id.startsWith('main-')) continue;
      console.log(`public_id: ${r.public_id}`);
      console.log(`  display_name: "${r.display_name}"`);
      console.log(`  original_filename: "${r.original_filename}"`);
      console.log('');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listAllWithDisplayName();
