// filter.js - Image filtering module with convolution-based filters

// Generate Gaussian kernel
function generateGaussianKernel(size, sigma = null) {
  if (sigma === null) {
    sigma = size / 6.0; // Standard deviation based on kernel size
  }
  
  const kernel = [];
  const center = Math.floor(size / 2);
  let sum = 0;
  
  for (let y = 0; y < size; y++) {
    kernel[y] = [];
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const value = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
      kernel[y][x] = value;
      sum += value;
    }
  }
  
  // Normalize kernel
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      kernel[y][x] /= sum;
    }
  }
  
  return kernel;
}

// Generate Box blur kernel
function generateBoxKernel(size) {
  const kernel = [];
  const value = 1.0 / (size * size);
  
  for (let y = 0; y < size; y++) {
    kernel[y] = [];
    for (let x = 0; x < size; x++) {
      kernel[y][x] = value;
    }
  }
  
  return kernel;
}

// Generate Sharpen kernel
function generateSharpenKernel(size, strength = 'light') {
  const kernel = [];
  const center = Math.floor(size / 2);
  const centerValue = strength === 'light' ? 5 : 9;
  
  for (let y = 0; y < size; y++) {
    kernel[y] = [];
    for (let x = 0; x < size; x++) {
      if (x === center && y === center) {
        kernel[y][x] = centerValue;
      } else if (x === center || y === center) {
        kernel[y][x] = -1;
      } else {
        kernel[y][x] = 0;
      }
    }
  }
  
  return kernel;
}

// Generate Sobel X kernel (vertical edges)
function generateSobelXKernel(size) {
  const kernel = [];
  const center = Math.floor(size / 2);
  
  for (let y = 0; y < size; y++) {
    kernel[y] = [];
    for (let x = 0; x < size; x++) {
      if (x < center) {
        kernel[y][x] = -1;
      } else if (x > center) {
        kernel[y][x] = 1;
      } else {
        kernel[y][x] = 0;
      }
    }
  }
  
  return kernel;
}

// Generate Sobel Y kernel (horizontal edges)
function generateSobelYKernel(size) {
  const kernel = [];
  const center = Math.floor(size / 2);
  
  for (let y = 0; y < size; y++) {
    kernel[y] = [];
    for (let x = 0; x < size; x++) {
      if (y < center) {
        kernel[y][x] = -1;
      } else if (y > center) {
        kernel[y][x] = 1;
      } else {
        kernel[y][x] = 0;
      }
    }
  }
  
  return kernel;
}

// Filter type definitions
const filterTypes = {
  'gaussian_blur': {
    name: 'Gaussian Blur',
    generateKernel: (size) => generateGaussianKernel(size)
  },
  'box_blur': {
    name: 'Box Blur',
    generateKernel: (size) => generateBoxKernel(size)
  },
  'sharpen_light': {
    name: 'Sharpen Light',
    generateKernel: (size) => generateSharpenKernel(size, 'light')
  },
  'sharpen_medium': {
    name: 'Sharpen Medium',
    generateKernel: (size) => generateSharpenKernel(size, 'medium')
  },
  'sobel_x': {
    name: 'Sobel X (Vertical Edges)',
    generateKernel: (size) => generateSobelXKernel(size)
  },
  'sobel_y': {
    name: 'Sobel Y (Horizontal Edges)',
    generateKernel: (size) => generateSobelYKernel(size)
  },
  'sobel_combined': {
    name: 'Sobel Combined',
    generateKernel: (size) => null // Special case handled separately
  }
};

// Apply convolution to image data
function applyConvolution(imageData, kernel, divisor, offset = 0) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const kernelSize = kernel.length;
  const halfKernel = Math.floor(kernelSize / 2);
  
  // Create output data
  const outputData = new Uint8ClampedArray(data.length);
  
  // Copy original data
  for (let i = 0; i < data.length; i++) {
    outputData[i] = data[i];
  }
  
  // Apply convolution
  for (let y = halfKernel; y < height - halfKernel; y++) {
    for (let x = halfKernel; x < width - halfKernel; x++) {
      let r = 0, g = 0, b = 0;
      
      // Apply kernel
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const pixelY = y + ky - halfKernel;
          const pixelX = x + kx - halfKernel;
          const pixelIndex = (pixelY * width + pixelX) * 4;
          
          const weight = kernel[ky][kx];
          r += data[pixelIndex] * weight;
          g += data[pixelIndex + 1] * weight;
          b += data[pixelIndex + 2] * weight;
        }
      }
      
      // Apply divisor and offset
      r = Math.max(0, Math.min(255, (r / divisor) + offset));
      g = Math.max(0, Math.min(255, (g / divisor) + offset));
      b = Math.max(0, Math.min(255, (b / divisor) + offset));
      
      const outputIndex = (y * width + x) * 4;
      outputData[outputIndex] = r;
      outputData[outputIndex + 1] = g;
      outputData[outputIndex + 2] = b;
      // Alpha channel remains unchanged
    }
  }
  
  return new ImageData(outputData, width, height);
}

// Special handling for Sobel combined (magnitude calculation)
function applySobelCombined(imageData, size) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const outputData = new Uint8ClampedArray(data.length);
  
  // Copy original data
  for (let i = 0; i < data.length; i++) {
    outputData[i] = data[i];
  }
  
  const sobelX = generateSobelXKernel(size);
  const sobelY = generateSobelYKernel(size);
  const halfKernel = Math.floor(size / 2);
  
  for (let y = halfKernel; y < height - halfKernel; y++) {
    for (let x = halfKernel; x < width - halfKernel; x++) {
      let gx = 0, gy = 0;
      
      // Calculate gradients
      for (let ky = 0; ky < size; ky++) {
        for (let kx = 0; kx < size; kx++) {
          const pixelY = y + ky - halfKernel;
          const pixelX = x + kx - halfKernel;
          const pixelIndex = (pixelY * width + pixelX) * 4;
          
          // Convert to grayscale for edge detection
          const gray = (data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2]) / 3;
          
          gx += gray * sobelX[ky][kx];
          gy += gray * sobelY[ky][kx];
        }
      }
      
      // Calculate magnitude
      const magnitude = Math.sqrt(gx * gx + gy * gy);
      const edgeValue = Math.min(255, magnitude);
      
      const outputIndex = (y * width + x) * 4;
      outputData[outputIndex] = edgeValue;
      outputData[outputIndex + 1] = edgeValue;
      outputData[outputIndex + 2] = edgeValue;
    }
  }
  
  return new ImageData(outputData, width, height);
}

// Get filter options for dropdown
function getFilterOptions() {
  return Object.keys(filterTypes).map(key => ({
    value: key,
    text: filterTypes[key].name
  }));
}

// Filter module definition
const module_filter = {
  title: "Filter",
  icon: "🔍",
  enabled: false,
  params: [
    {
      label: "Filter Type",
      type: "select",
      value: "gaussian_blur",
      options: getFilterOptions()
    },
    {
      label: "Filter Size",
      type: "range",
      min: 3,
      max: 15,
      step: 2,
      value: 3
    }
  ],
  apply: (imageData, params) => {
    const filterType = params[0].value;
    const filterSize = params[1].value;
    
    if (!filterTypes[filterType]) {
      console.warn('Unknown filter type:', filterType);
      return imageData;
    }
    
    // Special case for Sobel combined
    if (filterType === 'sobel_combined') {
      return applySobelCombined(imageData, filterSize);
    }
    
    // Generate kernel for the specified size
    const kernel = filterTypes[filterType].generateKernel(filterSize);
    
    // Apply convolution with divisor of 1 (kernels are already normalized)
    return applyConvolution(imageData, kernel, 1);
  }
};

export { module_filter };
