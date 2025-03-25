// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Change icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.nav-toggle')) {
            navMenu.classList.remove('active');
            
            // Reset icon
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset icon
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.section');
    
    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Make the first section (About Me) visible immediately
    if (sections.length > 0) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }
    
    // Observe each section except the first one
    sections.forEach((section, index) => {
        // Apply initial styles
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Only set opacity to 0 for sections after the first one
        if (index > 0) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            observer.observe(section);
        }
    });
    
    // Scroll to section smoothly when clicking on nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add CSS class to handle faded in elements
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add current year to footer copyright
    const yearEl = document.querySelector('footer p');
    if (yearEl) {
        const year = new Date().getFullYear();
        yearEl.innerHTML = yearEl.innerHTML.replace('2023', year);
    }
    
    // Add a subtle parallax effect to the header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            header.style.backgroundPosition = `center ${scrollValue * 0.5}px`;
        });
    }

    // Add skill progress animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = 'var(--secondary)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = 'var(--card-bg)';
        });
    });
    
    // Initialize GitHub stats with loading animation
    const githubStats = document.querySelector('.github-stats');
    if (githubStats) {
        const imgs = githubStats.querySelectorAll('img');
        imgs.forEach(img => {
            // Set initial styles
            img.style.transition = 'opacity 0.5s ease';
            
            // Make images visible by default
            img.style.opacity = '1';
            
            // Fallback to ensure images become visible
            setTimeout(() => {
                img.style.opacity = '1';
            }, 1000);
            
            // Still try to use the load event as a backup
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        });
    }
}); 