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
      load_image_from_fileobj(file);
      }
  });

  // File input change handler
  fileInput.onchange = e => {
    const file = e.target.files[0];
    load_image_from_fileobj(file);
  };

function load_image_from_fileobj(file_obj) {
  if (file_obj.type.startsWith('image/')) {
    const img = new Image();
    img.src = URL.createObjectURL(file_obj);
    img.onload = () => {
      imageSelectionMode.style.display = 'none';
      canvas.classList.add('show');
      resizeCanvasToFit(img);
      if (loadImageCallback) loadImageCallback(img);
    };
  }
}


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
  const containerWidth = mainContainer.clientWidth;
  const maxHeight = window.innerHeight;

  const imageAspectRatio = image.width / image.height;
  const maxAspectRatio = containerWidth / maxHeight;

  let drawWidth, drawHeight;

  if (imageAspectRatio > maxAspectRatio) {
    drawWidth = containerWidth;
    drawHeight = drawWidth / imageAspectRatio;
  } else {
    drawHeight = maxHeight;
    drawWidth = drawHeight * imageAspectRatio;
  }

  const dpr = window.devicePixelRatio || 1;

  // Internal buffer size
  canvas.width = Math.round(drawWidth * dpr);
  canvas.height = Math.round(drawHeight * dpr);

  // CSS display size
  canvas.style.width = drawWidth + "px";
  canvas.style.height = drawHeight + "px";

  // Container adapts to canvas height but capped by viewport
  mainContainer.style.height = Math.min(drawHeight, maxHeight) + "px";

  return { drawWidth, drawHeight, dpr };
}


export { 
  initializeCanvas, 
  loadImage, 
  loadReferenceImage, 
  resizeCanvasToFit,
  canvas,
  ctx 
};