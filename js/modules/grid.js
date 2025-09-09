const module_grid = {
    title: "Grid",
    icon: '🔲',
    enabled: false,
    params: [
      { label: "Grid Lines", type: "range", min: 10, max: 400, step: 1, value: 50 },
      { label: "Shift X", type: "range", min: -100, max: 100, step: 1, value: 0 },
      { label: "Shift Y", type: "range", min: -100, max: 100, step: 1, value: 0 }
    ],
    apply: (imageData, params, canvas) => {
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      // Get current image data
      ctx.putImageData(imageData, 0, 0);
      
      // Draw grid
      const gridLines = params[0].value;
      const shiftX = params[1].value / 100 * gridLines;
      const shiftY = params[2].value / 100 * gridLines;
      
      ctx.strokeStyle = 'rgba(133, 17, 17, 0.8)';
      ctx.lineWidth = 1.5;
      
      // Draw vertical lines
      for (let i = 0; i <= width-shiftX; i=i+gridLines) {
          ctx.beginPath();
          ctx.moveTo(i+shiftX, 0);
          ctx.lineTo(i+shiftX, height);
          ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let i = 0; i <= height-shiftY; i=i+gridLines) {
          ctx.beginPath();
          ctx.moveTo(0, i+shiftY);
          ctx.lineTo(width, i+shiftY);
          ctx.stroke();
      }
      
      // Get the modified image data
      return ctx.getImageData(0, 0, width, height);
    }
  };

  export {module_grid};