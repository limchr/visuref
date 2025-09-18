// modules/renderer.js - Rendering pipeline and image processing
import { canvas, ctx, resizeCanvasToFit } from './canvas.js';
import { modules } from './ui.js';

let moduleOutputs = {};

// Main render function
function render(originalImage, renderFrom = null) {
  if (!originalImage) return;
  
  console.log('Rendering with modules:', modules.filter(m => m.enabled).map(m => m.title));
  
  // Resize canvas to fit the image
  resizeCanvasToFit(originalImage);
  
  // Set canvas internal resolution to match display size
  const displayWidth = parseInt(canvas.style.width) || originalImage.width;
  const displayHeight = parseInt(canvas.style.height) || originalImage.height;
  
  canvas.width = displayWidth;
  canvas.height = displayHeight;
  
  // Clear canvas and draw image scaled to fit
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
  
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Handle selective rendering from a specific module
  let renderEnabled = renderFrom ? false : true;

  modules.forEach(m => {
    if (renderFrom === m.title) {
      renderEnabled = true;
    } 
    
    if (renderEnabled && m.enabled) {
      // Pass canvas to modules that need it (like Grid and Crop)
      if (m.title === 'Grid' || m.title === 'Crop' || m.title === 'Measure') {
        imageData = m.apply(imageData, m.params, canvas);
      } else {
        imageData = m.apply(imageData, m.params);
      }
      
      // Store module output for potential reuse
      moduleOutputs[m.title] = new ImageData(
        new Uint8ClampedArray(imageData.data), // deep copy
        imageData.width,
        imageData.height
      );
    } else if (m.enabled && moduleOutputs[m.title]) {
      // Use cached output if available
      imageData = moduleOutputs[m.title];
    }
  });
  
  ctx.putImageData(imageData, 0, 0);
}

// Get the previous enabled module (utility function)
function getPreviousEnabledModule(moduleTitle) {
  let lastModule = null;
  modules.forEach(m => {
    if (m.title === moduleTitle) {
      return lastModule;
    }
    if (m.enabled) lastModule = m.title;
  });
  return null; // no module before is enabled
}

// Clear cached outputs
function clearModuleOutputs() {
  moduleOutputs = {};
}

export { 
  render, 
  getPreviousEnabledModule, 
  clearModuleOutputs 
};