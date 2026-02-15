const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function listWithDetails() {
  try {
    const result = await cloudinary.search
      .expression('folder:The_Good_Photos')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();
    
    console.log('Photos in The_Good_Photos:\n');
    for (const r of result.resources) {
      console.log(`public_id: ${r.public_id}`);
      console.log(`  original_filename: ${r.original_filename}`);
      console.log(`  display_name: ${r.display_name}`);
      console.log('');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listWithDetails();
