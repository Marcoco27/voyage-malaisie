const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function listAllFolders() {
  try {
    const result = await cloudinary.api.root_folders();
    console.log('Root folders:');
    for (const folder of result.folders) {
      console.log(`  - ${folder.name}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  try {
    const photos = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: 100
    });
    console.log(`\nAll photos (${photos.resources.length}):`);
    for (const r of photos.resources) {
      console.log(`  - ${r.public_id}`);
    }
  } catch (error) {
    console.error('Error photos:', error.message);
  }
  
  try {
    const videos = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'video',
      max_results: 100
    });
    console.log(`\nAll videos (${videos.resources.length}):`);
    for (const r of videos.resources) {
      console.log(`  - ${r.public_id}`);
    }
  } catch (error) {
    console.error('Error videos:', error.message);
  }
}

listAllFolders();
