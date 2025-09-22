// modules/ui.js - UI management and module creation
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
import { 
  module_filter, 
} from "./modules/filter.js";
import { canvas } from './canvas.js';

const modulesDiv = document.getElementById('modules');

// Module definitions
const modules = [
  module_brightness, 
  module_contrast, 
  module_saturation, 
  module_filter,
  module_greyscale, 
  module_palette, 
  //module_crop, 
  module_grid, 
  module_measure,
];

let renderCallback = null;

// Initialize UI
function initializeUI(moduleList, onRender) {
  renderCallback = onRender;
  modules.forEach(m => createModuleUI(m));
  updatePipelineLine();
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

    if (renderCallback) renderCallback(module.title);
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
      
      // Handle different input types
      if (param.type === "select") {
        // Create select dropdown
        const select = document.createElement('select');
        select.value = param.value;
        select.style.cssText = 'flex: 1; margin-left: 5px; padding: 2px 4px; border: 1px solid #ccc; border-radius: 3px;';
        
        // Add options
        if (param.options) {
          param.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
          });
        }
        
        select.onchange = () => {
          param.value = select.value;
          if (renderCallback) renderCallback(module.title);
        };
        
        element.appendChild(select);
      } else if (param.type === "range") {
        // Value input field (for range inputs only)
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
          if (renderCallback) renderCallback(module.title); 
        };
        element.appendChild(valueInput);
        
        // Range input
        const input = document.createElement('input');
        input.type = param.type;
        input.value = param.value;
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
          if (renderCallback) renderCallback(module.title); 
        };
        element.appendChild(input);
      } else {
        // Other input types (checkbox, etc.)
        const input = document.createElement('input');
        input.type = param.type;
        input.value = param.value;
        input.oninput = () => { 
          param.value = input.type === 'checkbox' ? input.checked : Number(input.value); 
          if (renderCallback) renderCallback(module.title); 
        };
        element.appendChild(input);
      }
    }
    if(element) {
      paramsContainer.appendChild(element);
    }
  });
  
  container.appendChild(paramsContainer);

  // Set initial active state
  updateModuleActiveState(container, module.enabled);
  modulesDiv.appendChild(container);
  if(module && module.init) module.init(canvas, renderCallback); 
  
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

export { 
  initializeUI, 
  modules, 
  updatePipelineLine 
};