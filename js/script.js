// [Kode JavaScript sebelumnya tetap sama...]

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderNodes();
    animateCounters();
    setupContactForm();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Add social links to footer (redundant since already in HTML)
    // This is just an example if you want to add dynamically
    const footerSocial = document.querySelector('.footer-social');
    if (footerSocial) {
        footerSocial.innerHTML = `
            <a href="https://github.com/ditsyandrea22" target="_blank"><i class="fab fa-github"></i></a>
            <a href="https://x.com/Crypto_ditsy" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://t.me/cryptodozu" target="_blank"><i class="fab fa-telegram"></i></a>
        `;
    }
});