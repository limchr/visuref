const module_greyscale = {
  title: "Grayscale",
  enabled: false,
  params: [],
  apply: (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = data[i+1] = data[i+2] = avg;
    }
    return imageData;
  }
};
const module_brightness = {
  title: "Brightness",
  enabled: false,
  params: [
    { label: "Level", type: "range", min: -250, max: 250, step: 1, value: 0 }
  ],
  apply: (imageData, params) => {
    const data = imageData.data;
    let level = params[0].value;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.max(0, Math.min(255, data[i] + level));     // R
      data[i+1] = Math.max(0, Math.min(255, data[i+1] + level)); // G
      data[i+2] = Math.max(0, Math.min(255, data[i+2] + level)); // B
    }
    return imageData;
  }
};
const module_contrast = {
  title: "Contrast",
  enabled: false,
  params: [
    { label: "Level", type: "range", min: -250, max: 250, step: 1, value: 0 }
  ],
  apply: (imageData, params) => {
    const data = imageData.data;
    let factor = (259 * (params[0].value + 255)) / (255 * (259 - params[0].value));
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.max(0, Math.min(255, factor * (data[i] - 128) + 128));     // R
      data[i+1] = Math.max(0, Math.min(255, factor * (data[i+1] - 128) + 128)); // G
      data[i+2] = Math.max(0, Math.min(255, factor * (data[i+2] - 128) + 128)); // B
    }
    return imageData;
  }
};
const module_saturation = {
  title: "Saturation",
  enabled: false,
  params: [
    { label: "Level", type: "range", min: -250, max: 250, step: 1, value: 0 }
  ],
  apply: (imageData, params) => {
    const data = imageData.data;
    let factor = 1 + (params[0].value / 100);
    for (let i = 0; i < data.length; i += 4) {
      let gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
      data[i] = Math.max(0, Math.min(255, gray + factor * (data[i] - gray)));     // R
      data[i+1] = Math.max(0, Math.min(255, gray + factor * (data[i+1] - gray))); // G
      data[i+2] = Math.max(0, Math.min(255, gray + factor * (data[i+2] - gray))); // B
    }
    return imageData;
  }
};


export {
  module_greyscale,
  module_brightness,
  module_contrast,
  module_saturation
};