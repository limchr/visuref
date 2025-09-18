// main.js - Updated entry point
import { initializeCanvas } from './canvas.js';
import { initializeUI, modules } from './ui.js';
import { initializeGallery } from './gallery_ui.js';
import { initializeNavigation } from './navigation.js';
import { initializeCourse } from './course.js';
import { initializeExport, updateOriginalImage } from './export.js';
import { render } from './renderer.js';

// Import title animation if it exists and is independent
import './title_animation.js';

// Import gallery data
import { 
  galleryGroups, 
  getCurrentView, 
  setCurrentView, 
  getCurrentGroup, 
  setCurrentGroup 
} from "./gallery.js";

// Import module files
import { 
  module_greyscale, 
  module_brightness, 
  module_contrast, 
  module_saturation 
} from "./modules/color.js";
import { module_grid } from "./modules/grid.js";
import { module_crop } from "./modules/crop.js";
import { module_palette } from "./modules/palette.js";
import { module_measure } from "./modules/measure.js";




// Global state
let originalImage = null;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules with proper callbacks
  initializeCanvas(handleImageLoad);
  initializeUI(modules, handleModuleRender);
  initializeGallery(handleImageLoad);
  initializeNavigation();
  initializeCourse();
  initializeExport();
  
  console.log('VisuRef application initialized');
});

// Handle image loading from various sources
function handleImageLoad(img) {
  originalImage = img;
  updateOriginalImage(img);
  render(originalImage);
}

// Handle module parameter changes
function handleModuleRender(moduleTitle) {
  console.log('Module render triggered:', moduleTitle);
  if (originalImage) {
    render(originalImage, moduleTitle);
  }
}

// Handle window resize
window.addEventListener('resize', function() {
  if (originalImage) {
    render(originalImage);
  }
}, true);

// Export references for other modules that might need them
export { originalImage, handleImageLoad };