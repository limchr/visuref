
// app.js
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const modulesDiv = document.getElementById('modules');
const uploadArea = document.getElementById('uploadArea');
const referenceGallery = document.getElementById('referenceGallery');
const galleryGrid = document.getElementById('galleryGrid');
const imageSelectionMode = document.getElementById('imageSelectionMode');
const exportBtn = document.getElementById('exportBtn');
const galleryModal = document.getElementById('galleryModal');
const closeModal = document.querySelector('.close-modal');

// Navigation elements
const navApp = document.getElementById('nav-app');
const navCourse = document.getElementById('nav-course');
const navAbout = document.getElementById('nav-about');
const appContent = document.getElementById('app-content');
const courseContent = document.getElementById('course-content');
const aboutContent = document.getElementById('about-content');

let originalImage = null;
let galleryLoaded = false;

// Reference images data
const referenceImages = [
  { filename: 'own/simple_shapes/3_shapes.png', name: 'Rendering of Simple Shapes' },
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
  { filename: 'dawn-8412840_960_720.jpg', name: 'Dawn Landscape' },
  { filename: 'own/two_apples.jpg', name: 'Two Apples' },
  { filename: 'own/every_vegetable.jpg', name: 'Fruits and Vegetables' },
  { filename: 'own/onion_ginger.jpg', name: 'Ginger and Onion' },
  { filename: 'own/single_apple.jpg', name: 'Red Apple' },
  { filename: 'own/side_boob.jpg', name: 'Statue Side' },
  { filename: 'own/frontal_boob.jpg', name: 'Statue Frontal' },
  { filename: 'own/rear_view.jpg', name: 'Statue Rear' },
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
import { 
  module_measure, 
} from "./modules/measure.js";


let modules = [module_crop, module_brightness, module_contrast, module_saturation, module_greyscale, module_palette, module_grid, module_measure];



// Course data
const courseLessons = [
  { id: '01-basics', title: 'Drawing Basics', file: 'course/01-basics.md' },
  { id: '02-proportions-perspective', title: 'Proportions & Perspective', file: 'course/02-proportions-perspective.md' },
  { id: '03-light-shadow-value', title: 'Light, Shadow & Value', file: 'course/03-light-shadow-value.md' },
  { id: '04-anatomy-nature', title: 'Anatomy & Nature', file: 'course/04-anatomy-nature.md' },
  { id: '05-style-creativity', title: 'Style & Creativity', file: 'course/05-style-creativity.md' }
];

let currentLessonIndex = 0;

// Navigation functions
function showApp() {
  appContent.style.display = 'flex';
  courseContent.style.display = 'none';
  aboutContent.style.display = 'none';
  navApp.classList.add('active');
  navCourse.classList.remove('active');
  navAbout.classList.remove('active');
}

function showCourse() {
  appContent.style.display = 'none';
  courseContent.style.display = 'block';
  aboutContent.style.display = 'none';
  navApp.classList.remove('active');
  navCourse.classList.add('active');
  navAbout.classList.remove('active');
  
  // Load the current lesson if not already loaded
  if (!courseContent.querySelector('.course-text').innerHTML.trim()) {
    loadLesson(currentLessonIndex);
  }
}

function showAbout() {
  appContent.style.display = 'none';
  courseContent.style.display = 'none';
  aboutContent.style.display = 'block';
  navApp.classList.remove('active');
  navCourse.classList.remove('active');
  navAbout.classList.add('active');
}

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li>$1. $2</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(?!<[h|l])/gm, '<p>')
    .replace(/(?<!>)$/gm, '</p>')
    // Clean up list items
    .replace(/<p><li>/g, '<li>')
    .replace(/<\/li><\/p>/g, '</li>')
    // Wrap consecutive list items in ul/ol
    .replace(/(<li>.*<\/li>)/gs, function(match) {
      if (match.includes('1.') || match.includes('2.') || match.includes('3.')) {
        return '<ol>' + match + '</ol>';
      } else {
        return '<ul>' + match + '</ul>';
      }
    })
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p><br><\/p>/g, '');
}

// Load a specific lesson
async function loadLesson(index) {
  if (index < 0 || index >= courseLessons.length) return;
  
  currentLessonIndex = index;
  const lesson = courseLessons[index];
  
  try {
    const response = await fetch(lesson.file);
    const markdown = await response.text();
    const html = markdownToHtml(markdown);
    
    // Update the course content
    document.getElementById('course-title').textContent = lesson.title;
    document.getElementById('course-text').innerHTML = html;
    
    // Update lesson navigation
    updateLessonNavigation();
    
    // Update active lesson in sidebar
    document.querySelectorAll('.lesson-item').forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    
  } catch (error) {
    console.error('Error loading lesson:', error);
    document.getElementById('course-text').innerHTML = '<p>Error loading lesson. Please try again.</p>';
  }
}

// Update lesson navigation buttons
function updateLessonNavigation() {
  const prevBtn = document.getElementById('prev-lesson');
  const nextBtn = document.getElementById('next-lesson');
  
  prevBtn.disabled = currentLessonIndex === 0;
  nextBtn.disabled = currentLessonIndex === courseLessons.length - 1;
}

window.addEventListener('resize', function(event) {
  resizeCanvasToFit();
}, true);


// Navigation event listeners
navApp.addEventListener('click', (e) => {
  e.preventDefault();
  showApp();
});

if(navCourse) navCourse.addEventListener('click', (e) => {
  e.preventDefault();
  showCourse();
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
  const containerWidth = mainContainer.clientWidth - 10; // Account for padding
  const containerHeight = mainContainer.clientHeight - 10; // Account for padding
  
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

    // let previous_enabled_module = get_previous_enabled_module(module.title);
    render(module.title);

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
  icon.textContent = module.icon;
  
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
    let element = null;
    
    
    if (param.type === 'button') {
      element = document.createElement('button');
      element.textContent = param.value;
      element.className = 'module-button';
      element.id = param.id;
    } else {
      element = document.createElement('label');
      element.className = 'param-label';
      element.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;';
      
      // Label text
      const labelText = document.createElement('span');
      labelText.textContent = param.label;
      element.appendChild(labelText);
      
      // Value input field (for range inputs only)
      if (param.type === "range") {
        const valueInput = document.createElement('input');
        valueInput.type = 'number';
        valueInput.value = param.value;
        valueInput.min = param.min;
        valueInput.max = param.max;
        valueInput.step = param.step;
        valueInput.style.cssText = 'width: 40px; margin-left: 5px; text-align: right; padding: 2px 4px; border: 1px solid #ccc; border-radius: 3px;';
        valueInput.oninput = () => { 
          param.value = Number(valueInput.value); 
          // Update the range slider to match
          const rangeInput = element.querySelector('input[type="range"]');
          if (rangeInput) {
            rangeInput.value = param.value;
          }
          render(module.title); 
        };
        element.appendChild(valueInput);
      }
      
      // Range input
      const input = document.createElement('input');
      input.type = param.type;
      input.value = param.value;
      if (param.type === "range") {
        input.min = param.min;
        input.max = param.max;
        input.step = param.step;
        input.style.cssText = 'flex: 1; margin-left: 5px;';
        input.oninput = () => { 
          param.value = Number(input.value); 
          // Update the number input to match
          const numberInput = element.querySelector('input[type="number"]');
          if (numberInput) {
            numberInput.value = param.value;
          }
          render(module.title); 
        };
      } else {
        input.oninput = () => { param.value = input.type === 'checkbox' ? input.checked : Number(input.value); render(module.title); };
      }
      element.appendChild(input);
    }
    if(element) {
      paramsContainer.appendChild(element);
    }
  });
  
  container.appendChild(paramsContainer);

  // Set initial active state
  updateModuleActiveState(container, module.enabled);
  modulesDiv.appendChild(container);
  if(module && module.init) module.init(canvas, render); 
  
  // Call onUICreated if module has it
  if(module && module.onUICreated) module.onUICreated(container);
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
  
  // Course navigation event listeners
  document.querySelectorAll('.lesson-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      loadLesson(index);
    });
  });
  
  // Course navigation buttons
  document.getElementById('prev-lesson').addEventListener('click', () => {
    if (currentLessonIndex > 0) {
      loadLesson(currentLessonIndex - 1);
    }
  });
  
  document.getElementById('next-lesson').addEventListener('click', () => {
    if (currentLessonIndex < courseLessons.length - 1) {
      loadLesson(currentLessonIndex + 1);
    }
  });
  
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
    }, 2000);
  });
});

let module_outputs = {};


function get_previous_enabled_module(module_title) {
  let last_module = null;
  modules.forEach(m => {
    if (m.title == module_title) {
      return last_module;
    }
    if(m.enabled) last_module = m.title;
  });
  return null; // no module before is enabled
}

// Render pipeline
function render(render_from) {
  render_from = null;
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

  let render_enabled = true;
  if(render_from) render_enabled = false;

  modules.forEach(m => {
    if (render_from == m.title) {
      render_enabled = true;
    } 
    if (render_enabled && m.enabled) {
      // Pass canvas to modules that need it (like Grid and Crop)
      if (m.title === 'Grid' || m.title === 'Crop' || m.title === 'Measure') {
        imageData = m.apply(imageData, m.params, canvas);
      } else {
        imageData = m.apply(imageData, m.params);
      }
      module_outputs[m.title] = new ImageData(
        new Uint8ClampedArray(imageData.data), // deep copy
        imageData.width,
        imageData.height
      );
      render_enabled = true;
    } else if(m.enabled) {
      imageData = module_outputs[m.title];
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
