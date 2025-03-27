// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after content loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = 'visible'; // Enable scrolling
            
            // Start animations after preloader is gone
            setTimeout(() => {
                initAnimations();
            }, 300);
        }, 500);
    });
    
    // Detect mobile devices for better experience
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Remove particles.js on mobile for better performance
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
        
        // Add mobile class to body for specific mobile styling
        document.body.classList.add('mobile-device');
        
        // Ensure cursor is visible on mobile
        document.body.style.cursor = 'auto';
        
        // Initialize mobile-specific optimizations
        initMobileOptimizations();
    } else {
        // Initialize particles on desktop only
        initializeParticles();
        
        // Setup custom cursor on desktop
        setupCustomCursor();
        
        // Initialize tilt effects for cards on desktop
        initTiltEffects();
    }

    // Add a loading animation while the page initializes
    const body = document.body;
    body.classList.add('loading');
    
    // Remove loading class after a short delay
    setTimeout(() => {
        body.classList.remove('loading');
    }, 1000);

    // Initialize sticky navbar behavior
    initStickyNavbar();
    
    // Initialize scroll reveal animation
    initScrollReveal();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize skill progress animations
    initSkillAnimations();
    
    // Initialize form validation and submission
    if (document.querySelector('.contact-form')) {
        initContactForm();
    }
    
    // Initialize theme toggling
    initThemeToggle();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize section highlighting based on scroll
    initSectionHighlighting();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize particles.js with enhanced configuration
    if (typeof particlesJS !== 'undefined') {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const particleColor = currentTheme === 'dark' ? '#64ffda' : '#0a9e88';
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: particleColor
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.8,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: particleColor,
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        line_linked: {
                            opacity: 0.6
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Initialize mobile navigation menu
    function initMobileNav() {
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
        
        // Smooth scroll behavior for navigation links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    
                    // Reset icon
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Smooth scroll to section
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Initialize theme toggling
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const htmlElement = document.documentElement;
        
        // Check for saved theme preference or use default
        const savedTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // Toggle theme when button is clicked
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = htmlElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                // Add transition class for smooth theme change
                htmlElement.classList.add('theme-transition');
                
                // Update theme
                htmlElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update icon
                updateThemeIcon(newTheme);
                
                // Update particles color if particles are initialized
                if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
                    const particleColor = newTheme === 'dark' ? '#64ffda' : '#007565';
                    pJSDom[0].pJS.particles.color.value = particleColor;
                    pJSDom[0].pJS.particles.line_linked.color = particleColor;
                    pJSDom[0].pJS.fn.particlesRefresh();
                }
                
                // Remove transition class after transition is complete
                setTimeout(() => {
                    htmlElement.classList.remove('theme-transition');
                }, 500);
            });
        }
        
        // Update theme icon based on current theme
        function updateThemeIcon(theme) {
            if (themeIcon) {
                if (theme === 'dark') {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        }
    }
    
    // Initialize sticky navbar behavior
    function initStickyNavbar() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            // Check initial scroll position
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            }
            
            // Add event listener for scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }
    
    // Initialize scroll reveal animation
    function initScrollReveal() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            section.classList.add('section-hidden');
        });
        
        const revealSection = function(entries, observer) {
            const [entry] = entries;
            
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        };
        
        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.15,
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Initialize skill progress animations
    function initSkillAnimations() {
        // Set up skill progress bars
        const progressBars = document.querySelectorAll('.progress-value');
        
        progressBars.forEach(bar => {
            const percentage = bar.parentElement.previousElementSibling.querySelector('.progress-percentage').textContent;
            bar.style.setProperty('--width', percentage);
        });
        
        // Set up skill card level indicators
        const skillCards = document.querySelectorAll('.skill-card[data-skill-level]');
        
        skillCards.forEach(card => {
            const level = card.getAttribute('data-skill-level');
            const skillLevel = document.createElement('div');
            skillLevel.classList.add('skill-level-indicator');
            skillLevel.textContent = level;
            card.appendChild(skillLevel);
        });
    }
    
    // Initialize project filtering
    function initProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');
        
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Get filter value
                    const filter = button.getAttribute('data-filter');
                    
                    // Filter projects
                    filterProjects(filter);
                });
            });
        }
        
        function filterProjects(filter) {
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.classList.remove('hidden');
                    }, 10);
                } else {
                    project.style.display = 'none';
                    setTimeout(() => {
                        project.classList.add('hidden');
                    }, 300);
                }
            });
        }
    }
    
    // Initialize tilt effects for cards
    function initTiltEffects() {
        const cards = document.querySelectorAll('.project-card, .skill-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        });
        
        function handleTilt(e) {
            const card = this;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add a highlight effect
            const glare = card.querySelector('.card-glare') || document.createElement('div');
            if (!card.querySelector('.card-glare')) {
                glare.classList.add('card-glare');
                card.appendChild(glare);
            }
            
            // Calculate the position of the glare based on cursor
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)`;
        }
        
        function resetTilt() {
            this.style.transform = '';
            const glare = this.querySelector('.card-glare');
            if (glare) {
                glare.remove();
            }
        }
    }
    
    // Initialize mobile optimizations
    function initMobileOptimizations() {
        // Reduce animation intensity on mobile
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 768px) {
                .skill-card:hover {
                    transform: translateY(-5px);
                }
                .project-card:hover {
                    transform: translateY(-5px);
                }
                .progress-value::after {
                    animation: progressShine 4s infinite linear;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Enable lazy loading for images
        const images = document.querySelectorAll('img');
        if ('loading' in HTMLImageElement.prototype) {
            images.forEach(img => {
                if (img.getAttribute('src') && !img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            });
        }
    }
    
    // Initialize section highlighting based on scroll
    function initSectionHighlighting() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Initialize back to top button
    function initBackToTop() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            // Show button when scrolled down
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
            
            // Scroll back to top when clicked
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    // Initialize contact form validation and submission
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                
                // Simple validation
                if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                    showFormMessage('Please fill out all fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(email.value)) {
                    showFormMessage('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showFormMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 1500);
            });
        }
    }
    
    // Display form message
    function showFormMessage(text, type) {
        const messageElement = document.querySelector('.form-message') || document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = text;
        
        const contactForm = document.querySelector('.contact-form');
        if (!document.querySelector('.form-message')) {
            contactForm.appendChild(messageElement);
        }
        
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
    
    // Validate email format
    function isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    
    // Initialize particles on desktop
    function initializeParticles() {
        // Particles.js initialization is done in the outer scope
    }
    
    // Initialize custom cursor on desktop
    function setupCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        const cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        
        cursor.appendChild(cursorDot);
        cursor.appendChild(cursorOutline);
        document.body.appendChild(cursor);
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        let cursorVisible = true;
        let cursorEnlarged = false;
        
        // Set up event listeners
        document.addEventListener('mousemove', animateCursor);
        document.addEventListener('mousedown', enlargeCursor);
        document.addEventListener('mouseup', resetCursor);
        document.addEventListener('mouseenter', showCursor);
        document.addEventListener('mouseleave', hideCursor);
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .skill-card, .project-card, .primary-btn, .secondary-btn, .theme-toggle, .nav-toggle, input, textarea'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
        
        // Animate cursor based on mouse position
        function animateCursor(e) {
            if (cursorVisible) {
                // Position cursor dot at cursor position
                cursorDot.style.top = `${e.clientY}px`;
                cursorDot.style.left = `${e.clientX}px`;
                
                // Add slight delay to cursor outline
                setTimeout(() => {
                    cursorOutline.style.top = `${e.clientY}px`;
                    cursorOutline.style.left = `${e.clientX}px`;
                }, 80);
            }
        }
        
        // Enlarge cursor on mousedown
        function enlargeCursor() {
            cursorEnlarged = true;
            cursor.classList.add('cursor-enlarged');
        }
        
        // Reset cursor on mouseup
        function resetCursor() {
            cursorEnlarged = false;
            cursor.classList.remove('cursor-enlarged');
        }
        
        // Show cursor when entering viewport
        function showCursor() {
            cursorVisible = true;
            cursor.style.opacity = 1;
        }
        
        // Hide cursor when leaving viewport
        function hideCursor() {
            cursorVisible = false;
            cursor.style.opacity = 0;
        }
    }
    
    // Initialize tooltips
    function initTooltips() {
        const elements = document.querySelectorAll('[data-tooltip]');
        
        elements.forEach(element => {
            const tooltipText = element.getAttribute('data-tooltip');
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            // Add events
            element.addEventListener('mouseenter', () => {
                document.body.appendChild(tooltip);
                const rect = element.getBoundingClientRect();
                
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10 + window.scrollY}px`;
                tooltip.style.left = `${rect.left + (rect.width/2) - (tooltip.offsetWidth/2)}px`;
                tooltip.style.opacity = '1';
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    }
    
    // Initialize animations after preloader
    function initAnimations() {
        // Add a subtle entrance animation to skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
        
        // Add a subtle entrance animation to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }
}); 