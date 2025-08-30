
// app.js
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const modulesDiv = document.getElementById('modules');
const uploadArea = document.getElementById('uploadArea');
const referenceGallery = document.getElementById('referenceGallery');
const galleryGrid = document.getElementById('galleryGrid');
const uploadTab = document.getElementById('uploadTab');
const galleryTab = document.getElementById('galleryTab');
const imageSelectionMode = document.getElementById('imageSelectionMode');
const exportBtn = document.getElementById('exportBtn');
const galleryModal = document.getElementById('galleryModal');
const closeModal = document.querySelector('.close-modal');

// Navigation elements
const navApp = document.getElementById('nav-app');
const navAbout = document.getElementById('nav-about');
const appContent = document.getElementById('app-content');
const aboutContent = document.getElementById('about-content');

let originalImage = null;
let galleryLoaded = false;

// Reference images data
const referenceImages = [
  { filename: 'man-844212_640.jpg', name: 'Portrait Study' },
  { filename: 'woman-3063914_640.jpg', name: 'Female Portrait' },
  { filename: 'woman-5815354_640.jpg', name: 'Woman Portrait' },
  { filename: 'woman-8631993_960_720.jpg', name: 'Woman Portrait 2' },
  { filename: 'woman-2789481_960_720.jpg', name: 'Woman Portrait 3' },
  { filename: 'girl-2806276_960_720.jpg', name: 'Girl Portrait' },
  { filename: 'man-6339003_960_720.jpg', name: 'Man Portrait' },
  { filename: 'girl-2205813_960_720.jpg', name: 'Girl Portrait 2' },
  { filename: 'mother-5374622_960_720.jpg', name: 'Mother Portrait' },
  { filename: 'mountains-440520_960_720.jpg', name: 'Mountain Landscape' },
  { filename: 'mountains-1913199_960_720.jpg', name: 'Mountain Range' },
  { filename: 'mt-fuji-2232246_960_720.jpg', name: 'Mount Fuji' },
  { filename: 'mountains-4420690_960_720.jpg', name: 'Mountain Peak' },
  { filename: 'mountains-8344601_960_720.jpg', name: 'Mountain Vista' },
  { filename: 'sunset-5536777_960_720.jpg', name: 'Sunset Sky' },
  { filename: 'sunset-410133_960_720.jpg', name: 'Sunset Landscape' },
  { filename: 'sunset-5800386_960_720.jpg', name: 'Sunset Horizon' },
  { filename: 'boat-9322331_960_720.jpg', name: 'Boat Scene' },
  { filename: 'dawn-8412840_960_720.jpg', name: 'Dawn Landscape' }
];


import { 
  module_greyscale, 
  module_brightness, 
  module_contrast, 
  module_saturation 
} from "./modules/color.js";
import { 
  module_grid, 
} from "./modules/grid.js";
import { 
  module_crop, 
} from "./modules/crop.js";
import { 
  module_palette, 
} from "./modules/palette.js";


let modules = [module_crop, module_brightness, module_contrast, module_saturation, module_greyscale, module_palette, module_grid];



// Navigation functions
function showApp() {
  appContent.style.display = 'flex';
  aboutContent.style.display = 'none';
  navApp.classList.add('active');
  navAbout.classList.remove('active');
}

function showAbout() {
  appContent.style.display = 'none';
  aboutContent.style.display = 'block';
  navAbout.classList.add('active');
  navApp.classList.remove('active');
}

// Navigation event listeners
navApp.addEventListener('click', (e) => {
  e.preventDefault();
  showApp();
});

navAbout.addEventListener('click', (e) => {
  e.preventDefault();
  showAbout();
});

// Upload area functionality
uploadArea.addEventListener('click', () => {
  fileInput.click();
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      loadImage(file);
    }
  }
});

// Load image function
function loadImage(file) {
  const img = new Image();
  img.onload = () => {
    originalImage = img;
    imageSelectionMode.style.display = 'none';
    canvas.classList.add('show');
    resizeCanvasToFit();
    render();
  };
  img.src = typeof file === 'string' ? file : URL.createObjectURL(file);
}

// Load reference image
function loadReferenceImage(imagePath, imageName) {
  const img = new Image();
  img.onload = () => {
    originalImage = img;
    imageSelectionMode.style.display = 'none';
    canvas.classList.add('show');
    resizeCanvasToFit();
    render();
  };
  img.src = imagePath;
}

// Resize canvas to fit available space while maintaining aspect ratio
function resizeCanvasToFit() {
  if (!originalImage) return;
  
  const mainContainer = document.getElementById('main');
  const containerWidth = mainContainer.clientWidth - 40; // Account for padding
  const containerHeight = mainContainer.clientHeight - 40; // Account for padding
  
  const imageAspectRatio = originalImage.width / originalImage.height;
  const containerAspectRatio = containerWidth / containerHeight;
  
  let canvasWidth, canvasHeight;
  
  if (imageAspectRatio > containerAspectRatio) {
    // Image is wider than container - fit to width
    canvasWidth = containerWidth;
    canvasHeight = containerWidth / imageAspectRatio;
  } else {
    // Image is taller than container - fit to height
    canvasHeight = containerHeight;
    canvasWidth = containerHeight * imageAspectRatio;
  }
  
  // Set canvas size
  canvas.style.width = canvasWidth + 'px';
  canvas.style.height = canvasHeight + 'px';
}

// Create gallery items
function createGalleryItems() {
  // Clear existing items
  galleryGrid.innerHTML = '';
  
  referenceImages.forEach((image, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = `data/images/${image.filename}`;
    img.alt = image.name;
    img.loading = 'lazy';
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-item-overlay';
    
    const overlayText = document.createElement('div');
    overlayText.className = 'gallery-item-overlay-text';
    overlayText.textContent = image.name;
    
    overlay.appendChild(overlayText);
    galleryItem.appendChild(img);
    galleryItem.appendChild(overlay);
    
    galleryItem.addEventListener('click', () => {
      // Remove selection from all items
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.remove('selected');
      });
      
      // Add selection to clicked item
      galleryItem.classList.add('selected');
      
      // Load the selected image
      loadReferenceImage(`data/images/${image.filename}`, image.name);
      
      // Close modal
      galleryModal.style.display = 'none';
    });
    
    galleryGrid.appendChild(galleryItem);
  });
}



// Helper: create UI for a module
function createModuleUI(module) {
  const container = document.createElement('div');
  container.className = 'module';
  container.dataset.moduleId = module.title.toLowerCase().replace(/\s+/g, '-');

  // Status indicator
  const statusIndicator = document.createElement('div');
  statusIndicator.className = 'module-status';
  container.appendChild(statusIndicator);

  // Module header with toggle switch
  const header = document.createElement('div');
  header.className = 'module-header';
  
  // Toggle switch
  const toggleSwitch = document.createElement('label');
  toggleSwitch.className = 'toggle-switch';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = module.enabled;
  checkbox.onchange = () => { 
    module.enabled = checkbox.checked; 
    updateModuleActiveState(container, module.enabled);
    updatePipelineLine();
    
    // Scroll to module when enabling
    if (module.enabled) {
      setTimeout(() => {
        container.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
    
    render(); 
  };
  
  const slider = document.createElement('span');
  slider.className = 'toggle-slider';
  
  toggleSwitch.appendChild(checkbox);
  toggleSwitch.appendChild(slider);
  
  // Title container
  const titleContainer = document.createElement('div');
  titleContainer.className = 'module-title-container';
  
  const title = document.createElement('h3');
  
  // Module icon
  const icon = document.createElement('div');
  icon.className = 'module-icon';
  icon.textContent = getModuleIcon(module.title);
  
  title.appendChild(icon);
  title.appendChild(document.createTextNode(module.title));
  
  titleContainer.appendChild(title);
  header.appendChild(toggleSwitch);
  header.appendChild(titleContainer);
  container.appendChild(header);

  // Params container
  const paramsContainer = document.createElement('div');
  paramsContainer.className = 'module-params';
  
  // Params UI
  module.params.forEach(param => {
    const label = document.createElement('label');
    label.textContent = param.label;
    
    if (param.type === 'button') {
      const button = document.createElement('button');
      button.textContent = param.value;
      button.className = 'module-button';
      button.id = param.id;
      label.appendChild(button);
    } else {
      const input = document.createElement('input');
      input.type = param.type;
      input.value = param.value;
      if (param.type === "range") {
        input.min = param.min;
        input.max = param.max;
        input.step = param.step;
      }
      input.oninput = () => { param.value = input.type === 'checkbox' ? input.checked : Number(input.value); render(); };
      label.appendChild(input);
    }
    
    paramsContainer.appendChild(label);
    paramsContainer.appendChild(document.createElement('br'));
  });
  
  container.appendChild(paramsContainer);

  // Pipeline node
  const node = document.createElement('div');
  node.className = 'pipeline-node';
  container.appendChild(node);

  // Set initial active state
  updateModuleActiveState(container, module.enabled);
  modulesDiv.appendChild(container);
  if(module && module.init) module.init(canvas, render); 
  
  // Call onUICreated if module has it
  if(module && module.onUICreated) module.onUICreated(container);
}

// Get module icon based on title
function getModuleIcon(title) {
  const icons = {
    'Grayscale': '⚫',
    'Brightness': '☀️',
    'Contrast': '🌓',
    'Saturation': '🎨',
    'Grid': '🔲',
    'Crop': '✂️',
    'Palette': '🎨',
    'Blur': '💫',
    'Sharpen': '🔪',
    'Invert': '🔄',
    'Sepia': '📷'
  };
  return icons[title] || '⚙️';
}

// Update module active state
function updateModuleActiveState(container, isActive) {
  if (isActive) {
    container.classList.add('active');
  } else {
    container.classList.remove('active');
  }
}

// Update pipeline line based on active modules
function updatePipelineLine() {
  const pipelineLine = document.getElementById('pipelineLine');
  const activeModules = modules.filter(m => m.enabled);
  
  if (activeModules.length > 0) {
    pipelineLine.classList.add('active');
  } else {
    pipelineLine.classList.remove('active');
  }
}



// Init UI when document is ready
document.addEventListener('DOMContentLoaded', () => {
  modules.forEach(m => createModuleUI(m));
  updatePipelineLine();
  // Don't initialize gallery automatically - it will be loaded when modal opens
  
  // Modal functionality
  referenceGallery.addEventListener('click', () => {
    if (!galleryLoaded) {
      createGalleryItems();
      galleryLoaded = true;
    }
    galleryModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    galleryModal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      galleryModal.style.display = 'none';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.style.display === 'block') {
      galleryModal.style.display = 'none';
    }
  });

  // Export functionality
  exportBtn.addEventListener('click', () => {
    if (!originalImage) {
      alert('Please load an image first');
      return;
    }
    
    // Create a temporary canvas for export
    const exportCanvas = document.createElement('canvas');
    const exportCtx = exportCanvas.getContext('2d');
    
    // Set export canvas to the same size as display canvas
    const displayWidth = parseInt(canvas.style.width) || originalImage.width;
    const displayHeight = parseInt(canvas.style.height) || originalImage.height;
    
    exportCanvas.width = displayWidth;
    exportCanvas.height = displayHeight;
    
    // Draw the original image scaled to fit
    exportCtx.drawImage(originalImage, 0, 0, displayWidth, displayHeight);
    
    // Apply all enabled modules
    let imageData = exportCtx.getImageData(0, 0, displayWidth, displayHeight);
    
    modules.forEach(m => {
      if (m.enabled) {
        if (m.title === 'Grid' || m.title === 'Crop') {
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
    }, 2000);
  });
});



// Render pipeline
function render() {
  if (!originalImage) return;
  
  // Set canvas internal resolution to match display size
  const displayWidth = parseInt(canvas.style.width) || originalImage.width;
  const displayHeight = parseInt(canvas.style.height) || originalImage.height;
  
  canvas.width = displayWidth;
  canvas.height = displayHeight;
  
  // Clear canvas and draw image scaled to fit
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
  
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  modules.forEach(m => {
    if (m.enabled) {
      // Pass canvas to modules that need it (like Grid and Crop)
      if (m.title === 'Grid' || m.title === 'Crop') {
        imageData = m.apply(imageData, m.params, canvas);
      } else {
        imageData = m.apply(imageData, m.params);
      }
    }
  });
  ctx.putImageData(imageData, 0, 0);
}

// Load image
fileInput.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  loadImage(file);
};

export {canvas, ctx, render};
