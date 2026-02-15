const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function listFolder() {
  try {
    // Get all resources
    const photos = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: 500
    });
    
    console.log('All photos with their public_ids:\n');
    for (const r of photos.resources) {
      if (r.public_id.startsWith('samples') || r.public_id.startsWith('cld-')) continue;
      console.log(r.public_id);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listFolder();
