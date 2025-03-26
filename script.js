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

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeIcon(newTheme);
            
            // Add animation to the body
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 1000);
        });
    }
    
    // Update theme icon
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

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

    // Enhanced skill cards interaction
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = 'var(--secondary)';
            const icon = card.querySelector('i');
            if (icon) icon.style.transform = 'scale(1.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = 'var(--card-bg)';
            const icon = card.querySelector('i');
            if (icon) icon.style.transform = 'scale(1)';
        });
    });
    
    // Enhance project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = 'var(--secondary)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = 'var(--card-bg)';
        });
    });
    
    // Add typing effect to the tagline
    const tagline = document.querySelector('.tagline');
    if (tagline && tagline.textContent) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1500);
    }
    
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