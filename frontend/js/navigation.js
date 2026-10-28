// modules/navigation.js - Navigation between app sections
const navApp = document.getElementById('nav-app');
const navCourse = document.getElementById('nav-course');
const navAbout = document.getElementById('nav-about');
const appContent = document.getElementById('app-content');
const courseContent = document.getElementById('course-content');
const aboutContent = document.getElementById('about-content');

// Initialize navigation
function initializeNavigation() {
  // Navigation event listeners
  navApp.addEventListener('click', (e) => {
    e.preventDefault();
    showApp();
  });

  if(navCourse) navCourse.addEventListener('click', (e) => {
    e.preventDefault();
    showCourse();
  });

  navAbout.addEventListener('click', (e) => {
    e.preventDefault();
    showAbout();
  });

  // Set default view
  showApp();
}

// Navigation functions
function showApp() {
  appContent.style.display = 'flex';
  courseContent.style.display = 'none';
  aboutContent.style.display = 'none';
  navApp.classList.add('active');
  if (navCourse) navCourse.classList.remove('active');
  navAbout.classList.remove('active');
}

function showCourse() {
  appContent.style.display = 'none';
  courseContent.style.display = 'block';
  aboutContent.style.display = 'none';
  navApp.classList.remove('active');
  if (navCourse) navCourse.classList.add('active');
  navAbout.classList.remove('active');
  
  // Load the current lesson if not already loaded
  if (!courseContent.querySelector('.course-text').innerHTML.trim()) {
    import('./course.js').then(module => {
      module.loadLesson(0);
    });
  }
}

function showAbout() {
  appContent.style.display = 'none';
  courseContent.style.display = 'none';
  aboutContent.style.display = 'block';
  navApp.classList.remove('active');
  if (navCourse) navCourse.classList.remove('active');
  navAbout.classList.add('active');
}

export { 
  initializeNavigation, 
  showApp, 
  showCourse, 
  showAbout 
};