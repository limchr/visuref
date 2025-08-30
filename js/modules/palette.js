// modules/palette.js - K-means color palette extraction

// K-means clustering implementation
function kMeans(data, k, maxIterations = 100) {
  // Initialize centroids randomly
  let centroids = [];
  for (let i = 0; i < k; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    centroids.push([...data[randomIndex]]);
  }
  
  let iterations = 0;
  let converged = false;
  
  while (!converged && iterations < maxIterations) {
    // Assign points to nearest centroid
    const clusters = Array.from({ length: k }, () => []);
    
    for (let i = 0; i < data.length; i++) {
      let minDistance = Infinity;
      let closestCentroid = 0;
      
      for (let j = 0; j < k; j++) {
        const distance = euclideanDistance(data[i], centroids[j]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroid = j;
        }
      }
      
      clusters[closestCentroid].push(data[i]);
    }
    
    // Update centroids
    const newCentroids = [];
    let centroidsChanged = false;
    
    for (let i = 0; i < k; i++) {
      if (clusters[i].length === 0) {
        // If cluster is empty, keep old centroid
        newCentroids.push([...centroids[i]]);
        continue;
      }
      
      const newCentroid = [0, 0, 0];
      for (let j = 0; j < clusters[i].length; j++) {
        newCentroid[0] += clusters[i][j][0];
        newCentroid[1] += clusters[i][j][1];
        newCentroid[2] += clusters[i][j][2];
      }
      
      newCentroid[0] = Math.round(newCentroid[0] / clusters[i].length);
      newCentroid[1] = Math.round(newCentroid[1] / clusters[i].length);
      newCentroid[2] = Math.round(newCentroid[2] / clusters[i].length);
      
      newCentroids.push(newCentroid);
      
      // Check if centroid changed
      if (euclideanDistance(newCentroid, centroids[i]) > 0.1) {
        centroidsChanged = true;
      }
    }
    
    centroids = newCentroids;
    converged = !centroidsChanged;
    iterations++;
  }
  
  return centroids;
}

// Euclidean distance between two RGB colors
function euclideanDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
}

// Find closest centroid for a color
function findClosestCentroid(color, centroids) {
  let minDistance = Infinity;
  let closestIndex = 0;
  
  for (let i = 0; i < centroids.length; i++) {
    const distance = euclideanDistance(color, centroids[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  }
  
  return closestIndex;
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Create palette module
export const module_palette = {
  title: "Palette",
  enabled: false,
  params: [
    { label: "Number of Colors", type: "range", min: 2, max: 32, step: 1, value: 4 },
    { label: "Calculate Color Palette", type: "button", id: "calculate_palette", value: "Calculate Color Palette" }
  ],
  centroids: [],
  paletteContainer: null,
  
  apply: function(imageData, params) {
    const k = params[0].value;
    const data = imageData.data;
    
    // Extract unique colors from image (for performance, sample every 10th pixel)
    const colors = [];
    const num_samples = 5000;
    let step_size = data.length / num_samples;
    step_size = Math.round(step_size - step_size % 4);


    for (let i = 0; i < data.length; i += step_size) { // Sample every 10th pixel (4 channels * 10)
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Skip if this color is already in our sample
      const colorKey = `${r},${g},${b}`;
      if (!colors.some(color => `${color[0]},${color[1]},${color[2]}` === colorKey)) {
        colors.push([r, g, b]);
      }
    }
    
    // If we have fewer unique colors than k, use all colors
    if (colors.length < k) {
      this.centroids = colors.map(color => [...color]);
    } else {
      // Run k-means clustering
      this.centroids = kMeans(colors, k);
    }
    
    // Update palette display
    this.updatePaletteDisplay();
    
    // Replace each pixel with the closest centroid color
    for (let i = 0; i < data.length; i += 4) {
      const pixelColor = [data[i], data[i + 1], data[i + 2]];
      const closestIndex = findClosestCentroid(pixelColor, this.centroids);
      const centroid = this.centroids[closestIndex];
      
      data[i] = centroid[0];     // R
      data[i + 1] = centroid[1]; // G
      data[i + 2] = centroid[2]; // B
    }
    
    return imageData;
  },
  
  updatePaletteDisplay: function() {
    if (!this.paletteContainer) return;
    
    // Clear existing palette
    this.paletteContainer.innerHTML = '';
    
    // Create color swatches
    this.centroids.forEach((centroid, index) => {
      const swatch = document.createElement('div');
      swatch.className = 'palette-swatch';
      swatch.style.backgroundColor = rgbToHex(centroid[0], centroid[1], centroid[2]);
      swatch.title = `RGB(${centroid[0]}, ${centroid[1]}, ${centroid[2]})`;
      
      const label = document.createElement('div');
      label.className = 'palette-swatch-label';
      label.textContent = `#${rgbToHex(centroid[0], centroid[1], centroid[2]).slice(1)}`;
      
      swatch.appendChild(label);
      this.paletteContainer.appendChild(swatch);
    });
  },
  
  // Called when module UI is created
  onUICreated: function(container) {
    // Create palette display container
    this.paletteContainer = document.createElement('div');
    this.paletteContainer.className = 'palette-container';
    this.paletteContainer.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 10px;
      padding: 10px;
      background: #f5f5f5;
      border-radius: 5px;
    `;
    
    // Add palette container to the module
    const paramsContainer = container.querySelector('.module-params');
    if (paramsContainer) {
      paramsContainer.appendChild(this.paletteContainer);
    }
  }
}; 