const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MEDIA_DIR = path.join(__dirname, '..', 'media');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'media-urls.json');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const FOLDER_MAP = {
  '01-kuala-lumpur': 'kuala-lumpur',
  '02-cameron-highlands': 'cameron-highlands',
  '03-taman-negara': 'taman-negara',
  '04-kuala-besut': 'kuala-besut',
  '05-perhentian': 'perhentian',
  '06-cherating': 'cherating',
  '07-tioman': 'tioman',
  '08-singapour': 'singapour',
  '09-melaka': 'melaka',
  '10-kuala-selangor': 'kuala-selangor',
  '11-kuala-lumpur-fin': 'kuala-lumpur-fin'
};

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.heic'];
const VIDEO_EXTS = ['.mp4', '.mov', '.avi', '.webm'];

function getResourceType(ext) {
  if (IMAGE_EXTS.includes(ext.toLowerCase())) return 'image';
  if (VIDEO_EXTS.includes(ext.toLowerCase())) return 'video';
  return null;
}

async function uploadFile(filePath, folder) {
  const ext = path.extname(filePath);
  const publicId = path.basename(filePath, ext);
  const resourceType = getResourceType(ext);
  
  if (!resourceType) {
    console.log(`Skipping ${filePath} (unsupported type)`);
    return null;
  }
  
  const uploadOptions = {
    folder: `malaisie/${folder}`,
    public_id: publicId,
    resource_type: resourceType
  };
  
  if (resourceType === 'image') {
    uploadOptions.transformation = [
      { quality: 'auto', fetch_format: 'auto' }
    ];
  } else if (resourceType === 'video') {
    uploadOptions.resource_type = 'video';
    uploadOptions.eager = [
      { streaming_profile: 'hd', format: 'm3u8' }
    ];
  }
  
  try {
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);
    
    return {
      originalName: path.basename(filePath),
      type: resourceType,
      publicId: result.public_id,
      url: result.secure_url,
      duration: result.duration,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error.message);
    return null;
  }
}

async function uploadAllMedia() {
  const results = {
    photos: {},
    videos: {}
  };
  
  for (const [folderName, cloudFolder] of Object.entries(FOLDER_MAP)) {
    const photosDir = path.join(MEDIA_DIR, folderName, 'photos');
    
    if (!fs.existsSync(photosDir)) {
      console.log(`No photos folder for ${folderName}`);
      continue;
    }
    
    const files = fs.readdirSync(photosDir);
    
    console.log(`\n--- ${folderName} (${files.length} files) ---`);
    
    results.photos[folderName] = [];
    results.videos[folderName] = [];
    
    for (const file of files) {
      const filePath = path.join(photosDir, file);
      const ext = path.extname(file);
      const type = getResourceType(ext);
      
      if (!type) continue;
      
      process.stdout.write(`Uploading ${file} (${type})... `);
      
      const result = await uploadFile(filePath, cloudFolder);
      
      if (result) {
        console.log('✓');
        if (type === 'image') {
          results.photos[folderName].push(result);
        } else {
          results.videos[folderName].push(result);
        }
      } else {
        console.log('✗');
      }
    }
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\n\nResults saved to ${OUTPUT_FILE}`);
  console.log(`\nTotal: ${Object.values(results.photos).flat().length} photos, ${Object.values(results.videos).flat().length} videos`);
  
  return results;
}

uploadAllMedia().catch(console.error);
