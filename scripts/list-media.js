const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function generateImageUrl(publicId, options = {}) {
  return cloudinary.url(publicId, {
    resource_type: 'image',
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  });
}

function generateVideoUrl(publicId, options = {}) {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  });
}

function generateResponsiveImages(publicId) {
  return {
    thumb: generateImageUrl(publicId, { width: 400, crop: 'fill' }),
    medium: generateImageUrl(publicId, { width: 800, crop: 'fill' }),
    large: generateImageUrl(publicId, { width: 1200, crop: 'fill' }),
    full: generateImageUrl(publicId, { width: 2000, crop: 'limit' })
  };
}

function generateVideoThumb(publicId) {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    width: 640,
    height: 360,
    crop: 'fill',
    start_offset: 'auto'
  });
}

function generateHlsStream(publicId) {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'm3u8',
    streaming_profile: 'hd'
  });
}

function generateVideoThumbnails(publicId) {
  return {
    poster: generateVideoThumb(publicId),
    hls: generateHlsStream(publicId),
    mp4: generateVideoUrl(publicId, { format: 'mp4' })
  };
}

async function listMedia() {
  try {
    const photos = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'malaisie',
      resource_type: 'image',
      max_results: 500
    });
    
    const videos = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'malaisie',
      resource_type: 'video',
      max_results: 500
    });
    
    console.log(`Found ${photos.resources.length} photos and ${videos.resources.length} videos\n`);
    
    const formatResource = (r) => ({
      name: r.public_id.split('/').pop(),
      url: r.secure_url,
      width: r.width,
      height: r.height,
      bytes: r.bytes
    });
    
    console.log('## PHOTOS');
    for (const r of photos.resources) {
      console.log(`- ${r.public_id}: ${r.width}x${r.height}`);
    }
    
    console.log('\n## VIDEOS');
    for (const r of videos.resources) {
      console.log(`- ${r.public_id}: ${r.width}x${r.height} (${Math.round(r.duration || 0)}s)`);
    }
    
    return { photos: photos.resources, videos: videos.resources };
  } catch (error) {
    console.error('Error listing media:', error.message);
  }
}

const args = process.argv.slice(2);
if (args[0] === '--list') {
  listMedia();
} else {
  console.log('Usage: node list-media.js --list');
  console.log('\nURL Generators available:');
  console.log('- generateResponsiveImages(publicId)');
  console.log('- generateVideoThumbnails(publicId)');
}
