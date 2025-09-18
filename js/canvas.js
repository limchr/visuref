// modules/canvas.js - Canvas and image loading functionality
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadArea = document.getElementById('uploadArea');
const imageSelectionMode = document.getElementById('imageSelectionMode');

let loadImageCallback = null;

// Initialize canvas functionality
function initializeCanvas(onLoadImage) {
  loadImageCallback = onLoadImage;
  
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
        if (loadImageCallback) loadImageCallback(file);
      }
    }
  });

  // File input change handler
  fileInput.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (loadImageCallback) loadImageCallback(file);
  };
}

// Load image function
function loadImage(file, onLoad) {
  const img = new Image();
  img.onload = () => {
    imageSelectionMode.style.display = 'none';
    canvas.classList.add('show');
    resizeCanvasToFit(img);
    if (onLoad) onLoad(img);
  };
  img.src = typeof file === 'string' ? file : URL.createObjectURL(file);
}

// Load reference image
function loadReferenceImage(imagePath, imageName, onLoad) {
  const img = new Image();
  img.onload = () => {
    imageSelectionMode.style.display = 'none';
    canvas.classList.add('show');
    resizeCanvasToFit(img);
    if (onLoad) onLoad(img);
  };
  img.src = imagePath;
}

// Resize canvas to fit available space while maintaining aspect ratio
function resizeCanvasToFit(image) {
  if (!image) return;
  
  const mainContainer = document.getElementById('main');
  const containerWidth = mainContainer.clientWidth - 10; // Account for padding
  const containerHeight = mainContainer.clientHeight - 10; // Account for padding
  
  const imageAspectRatio = image.width / image.height;
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

export { 
  initializeCanvas, 
  loadImage, 
  loadReferenceImage, 
  resizeCanvasToFit,
  canvas,
  ctx 
};