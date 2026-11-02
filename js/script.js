// CAD & 3D Printing Club Website - Main JavaScript
// Add any interactive functionality here

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navBar = document.querySelector('.navbar');
    
    // Get navbar height for scroll offset
    const getNavbarHeight = () => {
        return navBar ? navBar.offsetHeight : 0;
    };
    
    // Hamburger menu toggle for mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }
    
    // Close mobile menu when a link is clicked
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links with navbar offset
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId && targetId !== '#' ? document.querySelector(targetId) : null;
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - getNavbarHeight() - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    if (navBar) {
        const updateNavbar = () => navBar.classList.toggle('scrolled', window.scrollY > 24);
        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
    }
    
    // Add touch-friendly hover effect for images on mobile
    const images = document.querySelectorAll('.glow-red, .adv-svg, .gallery-item img');
    
    images.forEach(img => {
        img.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Intersection Observer for scroll animations (optional enhancement)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-in forwards';
                }
            });
        }, observerOptions);
        
        // Observe all content sections
        const sections = document.querySelectorAll('#about-us, #projects, #achievements, #members, #gallery-section, #contact');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
});

