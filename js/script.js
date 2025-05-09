document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Menu Functionality ==========
    const initMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    };

    // ========== Portfolio Filtering ==========
    const initPortfolioFilter = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (!filterButtons.length || !portfolioItems.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.dataset.filter;
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const itemCategories = item.dataset.category.split(' ');
                    const shouldShow = filterValue === 'all' || 
                                      itemCategories.includes(filterValue);
                    
                    item.style.display = shouldShow ? 'block' : 'none';
                    
                    // Add animation when showing
                    if (shouldShow) {
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    }
                });
            });
        });
    };

    // ========== Form Submission ==========
    const initContactForm = () => {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const formMessage = document.getElementById('form-message');
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Simulate form submission (replace with actual fetch in production)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                if (formMessage) {
                    formMessage.textContent = 'Thank you! Your message has been sent.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                }
                
                // Reset form
                this.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    if (formMessage) formMessage.style.display = 'none';
                }, 5000);
            } catch (error) {
                console.error('Form submission error:', error);
                if (formMessage) {
                    formMessage.textContent = 'Error sending message. Please try again.';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                }
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    };

    // ========== Smooth Scrolling ==========
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            });
        });
    };

    // ========== Animate Elements on Scroll ==========
    const initScrollAnimations = () => {
        const animateSkillBars = () => {
            document.querySelectorAll('.skill-level').forEach(bar => {
                const width = bar.parentElement.previousElementSibling?.lastElementChild?.textContent || '0%';
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.opacity = '1';
                }, 100);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate skill bars when skills section is visible
                    if (entry.target.classList.contains('skills-container')) {
                        animateSkillBars();
                    }
                    
                    // Add animation class to any observed element
                    entry.target.classList.add('animated');
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections with animation
        document.querySelectorAll('.section, .hero-content, .portfolio-item').forEach(section => {
            observer.observe(section);
        });
    };

    // ========== Theme Toggle Functionality ==========
    const initThemeToggle = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Check for saved theme preference or use system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        let currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');

        // Apply the current theme
        const applyTheme = (theme) => {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Update toggle icon
            if (themeToggle) {
                themeToggle.innerHTML = theme === 'dark' 
                    ? '<i class="fas fa-sun"></i>'
                    : '<i class="fas fa-moon"></i>';
            }
        };

        // Initialize theme
        applyTheme(currentTheme);

        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    };

    // ========== Back to Top Button ==========
    const initBackToTop = () => {
        const backToTopButton = document.querySelector('.back-to-top');
        if (!backToTopButton) return;

        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('active', window.scrollY > 300);
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // ========== Initialize All Functions ==========
    const init = () => {
        initMobileMenu();
        initPortfolioFilter();
        initContactForm();
        initSmoothScrolling();
        initScrollAnimations();
        initThemeToggle();
        initBackToTop();

        // Set current year in footer
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // Start the application
    init();
});