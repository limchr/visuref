const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



let module_crop = {
    title: "Crop",
    icon: '✂️',
    enabled: false,
    params: [
      { label: "Crop", type: "button", id: "crop_button", value: "Select Area" }
    ],
    cropData: null,
    init: (canvas, render) => {
      document.getElementById('crop_button').onclick = () => startCropSelection(render);
    },
    apply: (imageData, params, canvas) => {
      // If no crop data, return original image
      if (!module_crop.cropData) {
        return imageData;
      }
      
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      

      // Put the current image data on canvas
      ctx.putImageData(imageData, 0, 0);
      
      // Create a new canvas for the cropped image
      const cropCanvas = document.createElement('canvas');
      const cropCtx = cropCanvas.getContext('2d');
      
      // Set crop canvas size to the selected area
      cropCanvas.width = module_crop.cropData.width;
      cropCanvas.height = module_crop.cropData.height;
      
      // Draw the cropped portion
      cropCtx.drawImage(
        canvas,
        module_crop.cropData.x, module_crop.cropData.y, module_crop.cropData.width, module_crop.cropData.height,
        0, 0, module_crop.cropData.width, module_crop.cropData.height
      );
      
      // Update the main canvas size
      canvas.width = module_crop.cropData.width;
      canvas.height = module_crop.cropData.height;
      
      // Get the cropped image data
      return cropCtx.getImageData(0, 0, module_crop.cropData.width, module_crop.cropData.height);
    }
  };

  let isSelectingCrop = false;
  let cropMouseDown = false;
  let cropStartX = 0;
  let cropStartY = 0;
  let cropEndX = 0;
  let cropEndY = 0;
  
// Crop selection functionality
function startCropSelection(render) {
  isSelectingCrop = true;
  canvas.style.cursor = 'crosshair';

  canvas.addEventListener('mousedown', onCropMouseDown);
  canvas.addEventListener('mousemove', (e) => onCropMouseMove(e, render));
  canvas.addEventListener('mouseup', (e) => onCropMouseUp(e, render));
  cropMouseDown = false;
  module_crop.cropData = null;
  render();
}

function stopCropSelection() {
  isSelectingCrop = false;
  canvas.style.cursor = 'default';
  
  // Remove event listeners
  canvas.removeEventListener('mousedown', onCropMouseDown);
  canvas.removeEventListener('mousemove', onCropMouseMove);
  canvas.removeEventListener('mouseup', onCropMouseUp);
}

function onCropMouseDown(e) {
  if (!isSelectingCrop) return;
  
  const rect = canvas.getBoundingClientRect();
  cropStartX = e.clientX - rect.left;
  cropStartY = e.clientY - rect.top;
  cropEndX = cropStartX;
  cropEndY = cropStartY;

  cropMouseDown = true;
}

function onCropMouseMove(e, render) {
  if (!isSelectingCrop || !cropMouseDown) return;

  const rect = canvas.getBoundingClientRect();
  cropEndX = e.clientX - rect.left;
  cropEndY = e.clientY - rect.top;

  render();
  drawCropSelection();
}

function onCropMouseUp(e, render) {
  if (!isSelectingCrop || !cropMouseDown) return;

  const rect = canvas.getBoundingClientRect();
  cropEndX = e.clientX - rect.left;
  cropEndY = e.clientY - rect.top;

  const x = Math.min(cropStartX, cropEndX);
  const y = Math.min(cropStartY, cropEndY);
  const width = Math.abs(cropEndX - cropStartX);
  const height = Math.abs(cropEndY - cropStartY);

  if (width > 10 && height > 10) {
    module_crop.cropData = { x, y, width, height };
    stopCropSelection();
    render();
  } else {
    cropMouseDown = false;
  }
}

function drawCropSelection() {
  if (!isSelectingCrop) return;
  
  const x = Math.min(cropStartX, cropEndX);
  const y = Math.min(cropStartY, cropEndY);
  const width = Math.abs(cropEndX - cropStartX);
  const height = Math.abs(cropEndY - cropStartY);
  
  // Draw selection rectangle
  ctx.strokeStyle = '#667eea';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.strokeRect(x, y, width, height);
  ctx.setLineDash([]);
  
  // Draw semi-transparent overlay
  ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
  ctx.fillRect(x, y, width, height);
}

export {module_crop};