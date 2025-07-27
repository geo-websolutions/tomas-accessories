// src/utils/imageResizer.js
export async function resizeImage(file, width, height, options = {}) {
  const { mode = 'fit', lockAspect = false, outputFormat = 'original' } = options;
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let targetWidth = width;
        let targetHeight = height;

        // Calculate dimensions if aspect ratio is locked
        if (lockAspect) {
          const sourceAspect = img.width / img.height;
          targetHeight = targetWidth / sourceAspect;
        }

        // Handle different resize modes
        switch (mode) {
          case 'fit': {
            const ratio = Math.min(targetWidth / img.width, targetHeight / img.height);
            targetWidth = img.width * ratio;
            targetHeight = img.height * ratio;
            break;
          }
          case 'crop': {
            const sourceAspect = img.width / img.height;
            const targetAspect = width / height;
            let srcX = 0, srcY = 0, srcWidth = img.width, srcHeight = img.height;

            if (targetAspect > sourceAspect) {
              srcHeight = img.width / targetAspect;
              srcY = (img.height - srcHeight) / 2;
            } else {
              srcWidth = img.height * targetAspect;
              srcX = (img.width - srcWidth) / 2;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(
              img,
              srcX, srcY, srcWidth, srcHeight,
              0, 0, width, height
            );
            
            return convertCanvasToBlob(canvas, file, outputFormat, resolve);
          }
          case 'stretch':
          default:
            // No special handling needed for stretch
            break;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        return convertCanvasToBlob(canvas, file, outputFormat, resolve);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function convertCanvasToBlob(canvas, originalFile, outputFormat, resolve) {
  const format = outputFormat === 'original' 
    ? originalFile.type || 'image/jpeg' 
    : `image/${outputFormat}`;
  
  canvas.toBlob(
    (blob) => resolve(blob),
    format,
    0.8 // Quality
  );
}

export async function batchResizeImages(files, options) {
  return Promise.all(
    files.map(file => resizeImage(file, options.width, options.height, options))
  )
}