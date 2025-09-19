// modules/renderer.js - Rendering pipeline and image processing
import { canvas, ctx, resizeCanvasToFit } from './canvas.js';
import { modules } from './ui.js';

let moduleOutputs = {};

// Main render function
function render(originalImage, renderFrom = null) {
  renderFrom = null;
  if (!originalImage) return;
  
  console.log('Rendering with modules:', modules.filter(m => m.enabled).map(m => m.title));
  
  const { drawWidth, drawHeight, dpr } = resizeCanvasToFit(originalImage);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // ensure drawing scale matches DPR

  // Clear and draw scaled image
  ctx.clearRect(0, 0, drawWidth, drawHeight);
  ctx.drawImage(originalImage, 0, 0, drawWidth, drawHeight);

  // Extract pixel data at internal resolution
  let imageData = ctx.getImageData(0, 0, drawWidth * dpr, drawHeight * dpr);

  // Handle selective rendering from a specific module
  let renderEnabled = renderFrom ? false : true;

  modules.forEach(m => {
    if (renderFrom === m.title) {
      renderEnabled = true;
    } 
    
    if (renderEnabled && m.enabled) {
      // Pass canvas if module needs dimensions
      if (["Grid", "Crop", "Measure"].includes(m.title)) {
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

  // Put image back at internal resolution
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