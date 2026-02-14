// Single Page App (SPA) Navigation
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const navToggle = document.getElementById('nav-toggle');
  
  // Show home page by default
  showPage('home');
  
  // Add click event listeners to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const pageName = this.getAttribute('data-page');
      
      // Close mobile menu
      navToggle.checked = false;
      
      // Update active states
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Show the selected page
      showPage(pageName);
    });
  });
  
  function showPage(pageName) {
    // Hide all pages with fade out
    pages.forEach(page => {
      page.classList.remove('active');
    });
    
    // Show selected page with fade in
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
      selectedPage.classList.add('active');
      window.scrollTo(0, 0); // Scroll to top
    }
  }
});
