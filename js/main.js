document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
      let theme;
      if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        theme = 'light';
        this.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        theme = 'dark';
        this.innerHTML = '<i class="fas fa-sun"></i>';
      }
      localStorage.setItem('theme', theme);
    });
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const action = this.getAttribute('action');
        
        fetch(action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            formMessage.innerHTML = 'Message sent successfully!';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            contactForm.reset();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch(error => {
          formMessage.innerHTML = 'Oops! There was a problem sending your message.';
          formMessage.classList.add('error');
          formMessage.style.display = 'block';
          console.error('Error:', error);
        })
        .finally(() => {
          setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.classList.remove('success', 'error');
          }, 5000);
        });
      });
    }
    
    // Scroll Header Shadow
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
        bar.style.width = width;
      });
    }
    
    // Intersection Observer for skills animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skills-container').forEach(section => {
      observer.observe(section);
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });