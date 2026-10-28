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
    if (!module_crop.cropData) return imageData;

    const dpr = window.devicePixelRatio || 1;
    const crop = module_crop.cropData;

    // Create a crop canvas
    const cropCanvas = document.createElement('canvas');
    const cropCtx = cropCanvas.getContext('2d');

    cropCanvas.width = crop.width * dpr;
    cropCanvas.height = crop.height * dpr;

    // Copy cropped area at device-pixel precision
    cropCtx.drawImage(
      canvas,
      crop.x * dpr, crop.y * dpr, crop.width * dpr, crop.height * dpr,
      0, 0, crop.width * dpr, crop.height * dpr
    );

    // Update main canvas size
    canvas.width = crop.width * dpr;
    canvas.height = crop.height * dpr;

    return cropCtx.getImageData(0, 0, cropCanvas.width, cropCanvas.height);
  }
};

// ---------------- Crop selection state ----------------
let isSelectingCrop = false;
let cropMouseDown = false;
let cropStartX = 0, cropStartY = 0;
let cropEndX = 0, cropEndY = 0;

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

  ctx.strokeStyle = '#667eea';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.strokeRect(x, y, width, height);
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
  ctx.fillRect(x, y, width, height);
}

export { module_crop };
