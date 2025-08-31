function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  let d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, v];
}

function hsvToRgb(h, s, v) {
  let c = v * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = v - c;
  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

const module_greyscale = {
  title: "Grayscale",
  enabled: false,
  params: [
    { label: "Red",   type: "range", min: -100, max: 100, step: 1, value: 0 },
    { label: "Green", type: "range", min: -100, max: 100, step: 1, value: 0 },
    { label: "Blue",  type: "range", min: -100, max: 100, step: 1, value: 0 }
  ],
  apply: (imageData, params) => {
    const data = imageData.data;
    const rm = params[0].value / 100.0;
    const gm = params[1].value / 100.0;
    const bm = params[2].value / 100.0;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i], g = data[i+1], b = data[i+2];

      // RGB → HSV
      let [h, s, v] = rgbToHsv(r, g, b);

      // determine closeness to red, green, blue
      let redDist   = Math.min(Math.abs(h - 0), Math.abs(h - 360));
      let greenDist = Math.abs(h - 120);
      let blueDist  = Math.abs(h - 240);

      // weights based on distance (0 = exact match, 60 = far)
      let redWeight   = Math.max(0, 1 - redDist / 60);
      let greenWeight = Math.max(0, 1 - greenDist / 60);
      let blueWeight  = Math.max(0, 1 - blueDist / 60);

      // adjust brightness (value) depending on color proximity
      v *= (1 + rm * redWeight + gm * greenWeight + bm * blueWeight);

      // clamp
      v = Math.min(1, Math.max(0, v));

      // HSV → RGB
      [r, g, b] = hsvToRgb(h, s, v);

      // grayscale (luminance)
      let avg = 0.299 * r + 0.587 * g + 0.114 * b;

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