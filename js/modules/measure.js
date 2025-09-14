const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let module_measure = {
    title: "Measure",
    icon: '📏',
    enabled: false,
    params: [
        { label: "Start Measuring", type: "button", id: "start_measure_button", value: "Start Measuring" },
        { label: "Clear All", type: "button", id: "clear_measure_button", value: "Clear Lines" },
        { label: "Line Color", type: "range", min: 0, max: 360, step: 1, value: 0 },
    ],
    measurements: [], // Array to store all measurement lines
    isDrawing: false,
    currentLine: null,
    isMeasuring: false,
    init: (canvas, render) => {
        document.getElementById('start_measure_button').onclick = () => {
            if (module_measure.isMeasuring) {
                stopMeasureMode();
                document.getElementById('start_measure_button').textContent = 'Start Measuring';
                module_measure.isMeasuring = false;
            } else {
                startMeasureMode(render);
                document.getElementById('start_measure_button').textContent = 'Stop Measuring';
                module_measure.isMeasuring = true;
            }
        };
        document.getElementById('clear_measure_button').onclick = () => clearAllMeasurements(render);
    },
    apply: (imageData, params, canvas) => {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Get current image data
        ctx.putImageData(imageData, 0, 0);
        
        // Draw all measurement lines
        drawAllMeasurements(ctx, params);
        
        // Draw current line being drawn (if any)
        if (module_measure.isDrawing && module_measure.currentLine) {
            drawCurrentLine(ctx, module_measure.currentLine, params);
        }
        
        // Get the modified image data
        return ctx.getImageData(0, 0, width, height);
    }
};

// Variables for mouse interaction
let isSelectingMeasure = false;
let measureMouseDown = false;
let measureStartX = 0;
let measureStartY = 0;
let measureEndX = 0;
let measureEndY = 0;

// Start measurement mode
function startMeasureMode(render) {
    isSelectingMeasure = true;
    canvas.style.cursor = 'crosshair';
    
    // Remove any existing event listeners first
    canvas.removeEventListener('mousedown', onMeasureMouseDown);
    canvas.removeEventListener('mousemove', onMeasureMouseMove);
    canvas.removeEventListener('mouseup', onMeasureMouseUp);
    
    // Add new event listeners
    canvas.addEventListener('mousedown', onMeasureMouseDown);
    canvas.addEventListener('mousemove', (e) => onMeasureMouseMove(e, render));
    canvas.addEventListener('mouseup', (e) => onMeasureMouseUp(e, render));
    
    measureMouseDown = false;
    module_measure.isDrawing = false;
    module_measure.currentLine = null;
    render();
}

// Stop measurement mode
function stopMeasureMode() {
    isSelectingMeasure = false;
    canvas.style.cursor = 'default';
    
    // Remove event listeners
    canvas.removeEventListener('mousedown', onMeasureMouseDown);
    canvas.removeEventListener('mousemove', onMeasureMouseMove);
    canvas.removeEventListener('mouseup', onMeasureMouseUp);
    
    module_measure.isDrawing = false;
    module_measure.currentLine = null;
}

// Mouse down event
function onMeasureMouseDown(e) {
    if (!isSelectingMeasure) return;
    
    const rect = canvas.getBoundingClientRect();
    measureStartX = e.clientX - rect.left;
    measureStartY = e.clientY - rect.top;
    measureEndX = measureStartX;
    measureEndY = measureStartY;
    
    measureMouseDown = true;
    module_measure.isDrawing = true;
    module_measure.currentLine = {
        startX: measureStartX,
        startY: measureStartY,
        endX: measureEndX,
        endY: measureEndY
    };
}

// Mouse move event
function onMeasureMouseMove(e, render) {
    if (!isSelectingMeasure || !measureMouseDown) return;
    
    const rect = canvas.getBoundingClientRect();
    measureEndX = e.clientX - rect.left;
    measureEndY = e.clientY - rect.top;
    
    // Update current line
    if (module_measure.currentLine) {
        module_measure.currentLine.endX = measureEndX;
        module_measure.currentLine.endY = measureEndY;
    }
    
    render();
}

// Mouse up event
function onMeasureMouseUp(e, render) {
    if (!isSelectingMeasure || !measureMouseDown) return;
    
    const rect = canvas.getBoundingClientRect();
    measureEndX = e.clientX - rect.left;
    measureEndY = e.clientY - rect.top;
    
    // Calculate line length
    const dx = measureEndX - measureStartX;
    const dy = measureEndY - measureStartY;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    // Only add line if it's long enough
    if (length > 5) {
        const measurement = {
            startX: measureStartX,
            startY: measureStartY,
            endX: measureEndX,
            endY: measureEndY,
            length: length
        };
        
        module_measure.measurements.push(measurement);
    }
    
    measureMouseDown = false;
    module_measure.isDrawing = false;
    module_measure.currentLine = null;
    render();
}

// Draw all measurement lines
function drawAllMeasurements(ctx, params) {
    const lineColor = `hsl(${params[2].value}, 70%, 50%)`;
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    
    module_measure.measurements.forEach((measurement, index) => {
        // Draw the line
        ctx.beginPath();
        ctx.moveTo(measurement.startX, measurement.startY);
        ctx.lineTo(measurement.endX, measurement.endY);
        ctx.stroke();
        
        // Calculate line length for display
        const displayLength = Math.round(measurement.length);
        
        // Calculate relative length compared to first line (if exists)
        let relativeText = `${displayLength}px`;
        if (module_measure.measurements.length > 1 && index > 0) {
            const firstLineLength = module_measure.measurements[0].length;
            const ratio = measurement.length / firstLineLength;
            relativeText = `${displayLength}px (${ratio.toFixed(2)}:1)`;
        } else if (index === 0 && module_measure.measurements.length > 1) {
            relativeText = `${displayLength}px (1:1)`;
        }
        
        // Draw length text
        const midX = (measurement.startX + measurement.endX) / 2;
        const midY = (measurement.startY + measurement.endY) / 2;
        
        ctx.fillStyle = lineColor;
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add background for better readability
        const textMetrics = ctx.measureText(relativeText);
        const textWidth = textMetrics.width;
        const textHeight = 16;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(midX - textWidth/2 - 4, midY - textHeight/2 - 2, textWidth + 8, textHeight + 4);
        
        // Add border to text background
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(midX - textWidth/2 - 4, midY - textHeight/2 - 2, textWidth + 8, textHeight + 4);
        
        ctx.fillStyle = lineColor;
        ctx.fillText(relativeText, midX, midY);
        
        // Draw small circles at line endpoints
        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(measurement.startX, measurement.startY, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(measurement.endX, measurement.endY, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw line number
        ctx.fillStyle = 'white';
        ctx.font = 'bold 11px Arial';
        ctx.fillText((index + 1).toString(), measurement.startX, measurement.startY);
    });
}

// Draw current line being drawn
function drawCurrentLine(ctx, line, params) {
    const lineColor = `hsl(${params[2].value}, 70%, 50%)`;
    const lineWidth = 2;
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(line.startX, line.startY);
    ctx.lineTo(line.endX, line.endY);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Show current length while drawing
    const dx = line.endX - line.startX;
    const dy = line.endY - line.startY;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    const midX = (line.startX + line.endX) / 2;
    const midY = (line.startY + line.endY) / 2;
    
    ctx.fillStyle = lineColor;
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(length)}px`, midX, midY - 10);
}

// Clear all measurements
function clearAllMeasurements(render) {
    module_measure.measurements = [];
    module_measure.isDrawing = false;
    module_measure.currentLine = null;
    render();
}

export {module_measure, startMeasureMode, stopMeasureMode};
