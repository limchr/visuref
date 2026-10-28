// modules/export.js - Export functionality
import { canvas, ctx } from './canvas.js';
import { modules } from './ui.js';

const exportBtn = document.getElementById('exportBtn');
let originalImageRef = null;

// Initialize export functionality
function initializeExport() {
  exportBtn.addEventListener('click', () => {
    exportImage();
  });
}

// Export the current image with all applied modules
function exportImage() {
  if (!originalImageRef) {
    alert('Please load an image first');
    return;
  }
  
  // Create a temporary canvas for export
  const exportCanvas = document.createElement('canvas');
  const exportCtx = exportCanvas.getContext('2d');
  
  // Set export canvas to the same size as display canvas
  const displayWidth = parseInt(canvas.style.width) || originalImageRef.width;
  const displayHeight = parseInt(canvas.style.height) || originalImageRef.height;
  
  exportCanvas.width = displayWidth;
  exportCanvas.height = displayHeight;
  
  // Draw the original image scaled to fit
  exportCtx.drawImage(originalImageRef, 0, 0, displayWidth, displayHeight);
  
  // Apply all enabled modules
  let imageData = exportCtx.getImageData(0, 0, displayWidth, displayHeight);
  
  modules.forEach(m => {
    if (m.enabled) {
      if (m.title === 'Grid' || m.title === 'Crop' || m.title === 'Measure') {
        imageData = m.apply(imageData, m.params, exportCanvas);
      } else {
        imageData = m.apply(imageData, m.params);
      }
    }
  });
  
  exportCtx.putImageData(imageData, 0, 0);
  
  // Create download link
  const link = document.createElement('a');
  link.download = 'visuref-export.png';
  link.href = exportCanvas.toDataURL('image/png');
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Show success feedback
  const originalText = exportBtn.innerHTML;
  exportBtn.innerHTML = '<span class="export-icon">✅</span>Exported!';
  exportBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
  
  setTimeout(() => {
    exportBtn.innerHTML = originalText;
    exportBtn.style.background = '';
  }, 2000);
}

// Update original image reference
function updateOriginalImage(image) {
  originalImageRef = image;
}

export { 
  initializeExport, 
  exportImage,
  updateOriginalImage 
};