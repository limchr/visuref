// modules/gallery-ui.js - Gallery UI management
import { 
  galleryGroups, 
  getCurrentView, 
  setCurrentView, 
  getCurrentGroup, 
  setCurrentGroup 
} from "./gallery.js";
import { loadReferenceImage } from './canvas.js';

const referenceGallery = document.getElementById('referenceGallery');
const galleryGrid = document.getElementById('galleryGrid');
const galleryModal = document.getElementById('galleryModal');
const closeModal = document.querySelector('.close-modal');

let galleryLoaded = false;
let onImageLoad = null;

// Initialize gallery functionality
function initializeGallery(onLoad) {
  onImageLoad = onLoad;
  
  // Modal functionality
  referenceGallery.addEventListener("click", () => {
    // Reset to groups view when opening modal
    setCurrentView("groups");
    setCurrentGroup(null);
    
    if (!galleryLoaded) {
      createGalleryItems();
      galleryLoaded = true;
    } else {
      // Refresh gallery items to ensure we are in groups view
      createGalleryItems();
    }
    galleryModal.style.display = "block";
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
}

// Create gallery items - now supports both group view and image view
function createGalleryItems() {
  // Clear existing items
  galleryGrid.innerHTML = "";
  
  const currentView = getCurrentView();
  const currentGroup = getCurrentGroup();
  
  // Update modal header based on current view
  const modalHeader = document.querySelector(".modal-header h2");
  
  if (currentView === "groups") {
    modalHeader.textContent = "Reference Images";
    
    // Show group thumbnails
    galleryGroups.forEach((group, groupIndex) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item gallery-group";
      galleryItem.dataset.groupIndex = groupIndex;
      
      // Use thumbnail image (first image in group)
      const thumbnailImage = group.images[group.group_thumbnail_index];
      
      const img = document.createElement("img");
      img.src = thumbnailImage.file_path;
      img.alt = group.group_name;
      img.loading = "lazy";
      
      const overlay = document.createElement("div");
      overlay.className = "gallery-item-overlay";
      
      const overlayText = document.createElement("div");
      overlayText.className = "gallery-item-overlay-text";
      overlayText.innerHTML = `<strong>${group.group_name}</strong><br><span style="font-size: 0.9em;">${group.images.length} images</span>`;
      
      overlay.appendChild(overlayText);
      galleryItem.appendChild(img);
      galleryItem.appendChild(overlay);
      
      galleryItem.addEventListener("click", () => {
        // Switch to image view for this group
        setCurrentGroup(group);
        setCurrentView("images");
        createGalleryItems();
      });
      
      galleryGrid.appendChild(galleryItem);
    });
  } else if (currentView === "images" && currentGroup) {
    // Update header with back button
    modalHeader.innerHTML = `${currentGroup.group_name} <button class="back-btn" style="background: none; border: none; color: #666; font-size: 0.8em; margin-left: 10px; cursor: pointer;">← Back</button>`;
    modalHeader.querySelector(".back-btn").addEventListener("click", () => {
      setCurrentView("groups");
      setCurrentGroup(null);
      createGalleryItems();
    });
    
    // Show images in the current group
    currentGroup.images.forEach((image, imageIndex) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.dataset.imageIndex = imageIndex;
      
      const img = document.createElement("img");
      img.src = image.file_path;
      img.alt = image.title;
      img.loading = "lazy";
      
      // Add source button if URL exists
      if (image.url) {
        const sourceBtn = document.createElement("a");
        sourceBtn.href = image.url;
        sourceBtn.target = "_blank";
        sourceBtn.className = "gallery-source-btn";
        sourceBtn.textContent = "Source";
        sourceBtn.onclick = (e) => e.stopPropagation(); // Prevent image selection when clicking source
        galleryItem.appendChild(sourceBtn);
      }
      
      const overlay = document.createElement("div");
      overlay.className = "gallery-item-overlay";
      
      const overlayText = document.createElement("div");
      overlayText.className = "gallery-item-overlay-text";
      overlayText.innerHTML = `<strong>${image.title}</strong>`;
      if (image.info) {
        overlayText.innerHTML += `<br><span style="font-size: 0.8em;">${image.info}</span>`;
      }
      
      overlay.appendChild(overlayText);
      galleryItem.appendChild(img);
      galleryItem.appendChild(overlay);
      
      galleryItem.addEventListener("click", () => {
        // Remove selection from all items
        document.querySelectorAll(".gallery-item").forEach(item => {
          item.classList.remove("selected");
        });
        
        // Add selection to clicked item
        galleryItem.classList.add("selected");
        
        // Load the selected image
        loadReferenceImage(image.file_path, image.title, onImageLoad);
        
        // Close modal
        galleryModal.style.display = "none";
      });
      
      galleryGrid.appendChild(galleryItem);
    });
  }
}

export { 
  initializeGallery, 
  createGalleryItems 
};