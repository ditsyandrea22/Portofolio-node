document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  
  mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
  });
  
  closeMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
  });
  
  mobileMenuOverlay.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
  });
  
  // Close mobile menu when clicking on links
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          mobileMenuOverlay.classList.remove('active');
          document.body.style.overflow = '';
      });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Sticky header on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Animation on scroll
  const animateOnScroll = () => {
      const elements = document.querySelectorAll('.feature-card, .about-content');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // Dark mode functionality
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleIcons(currentTheme);

  // Toggle theme function
  function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateToggleIcons(newTheme);
  }

  // Update toggle icons
  function updateToggleIcons(theme) {
      const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
      if (themeToggle) themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
      if (mobileThemeToggle) mobileThemeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
  }

  // Event listeners
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  // Check for system preference
  if (currentTheme === 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleTheme();
  }

  // Form submission (if form exists)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = contactForm.querySelector('input[type="text"]').value;
          const email = contactForm.querySelector('input[type="email"]').value;
          const message = contactForm.querySelector('textarea').value;
          
          // Here you would typically send the data to a server
          console.log({ name, email, message });
          
          // Show success message
          alert('Thank you for your message! I will get back to you soon.');
          
          // Reset form
          contactForm.reset();
      });
  }
});