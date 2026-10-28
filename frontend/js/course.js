// modules/course.js - Course and lesson management
const courseLessons = [
  { id: '01-basics', title: 'Drawing Basics', file: 'course/01-basics.md' },
  { id: '02-proportions-perspective', title: 'Proportions & Perspective', file: 'course/02-proportions-perspective.md' },
  { id: '03-light-shadow-value', title: 'Light, Shadow & Value', file: 'course/03-light-shadow-value.md' },
  { id: '04-anatomy-nature', title: 'Anatomy & Nature', file: 'course/04-anatomy-nature.md' },
  { id: '05-style-creativity', title: 'Style & Creativity', file: 'course/05-style-creativity.md' }
];

let currentLessonIndex = 0;

// Initialize course functionality
function initializeCourse() {
  // Course navigation event listeners
  document.querySelectorAll('.lesson-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      loadLesson(index);
    });
  });
  
  // Course navigation buttons
  document.getElementById('prev-lesson').addEventListener('click', () => {
    if (currentLessonIndex > 0) {
      loadLesson(currentLessonIndex - 1);
    }
  });
  
  document.getElementById('next-lesson').addEventListener('click', () => {
    if (currentLessonIndex < courseLessons.length - 1) {
      loadLesson(currentLessonIndex + 1);
    }
  });
}

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li>$1. $2</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(?!<[h|l])/gm, '<p>')
    .replace(/(?<!>)$/gm, '</p>')
    // Clean up list items
    .replace(/<p><li>/g, '<li>')
    .replace(/<\/li><\/p>/g, '</li>')
    // Wrap consecutive list items in ul/ol
    .replace(/(<li>.*<\/li>)/gs, function(match) {
      if (match.includes('1.') || match.includes('2.') || match.includes('3.')) {
        return '<ol>' + match + '</ol>';
      } else {
        return '<ul>' + match + '</ul>';
      }
    })
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p><br><\/p>/g, '');
}

// Load a specific lesson
async function loadLesson(index) {
  if (index < 0 || index >= courseLessons.length) return;
  
  currentLessonIndex = index;
  const lesson = courseLessons[index];
  
  try {
    const response = await fetch(lesson.file);
    const markdown = await response.text();
    const html = markdownToHtml(markdown);
    
    // Update the course content
    document.getElementById('course-title').textContent = lesson.title;
    document.getElementById('course-text').innerHTML = html;
    
    // Update lesson navigation
    updateLessonNavigation();
    
    // Update active lesson in sidebar
    document.querySelectorAll('.lesson-item').forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    
  } catch (error) {
    console.error('Error loading lesson:', error);
    document.getElementById('course-text').innerHTML = '<p>Error loading lesson. Please try again.</p>';
  }
}

// Update lesson navigation buttons
function updateLessonNavigation() {
  const prevBtn = document.getElementById('prev-lesson');
  const nextBtn = document.getElementById('next-lesson');
  
  prevBtn.disabled = currentLessonIndex === 0;
  nextBtn.disabled = currentLessonIndex === courseLessons.length - 1;
}

export { 
  initializeCourse, 
  loadLesson, 
  courseLessons, 
  currentLessonIndex 
};