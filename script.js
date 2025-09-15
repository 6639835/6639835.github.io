// Throttle utility function for performance optimization
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Cache frequently accessed DOM elements for better performance
    const domCache = {
        preloader: document.querySelector('.preloader'),
        navbar: document.querySelector('.navbar'),
        backToTopButton: document.querySelector('.back-to-top'),
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.getElementById('theme-icon'),
        navMenu: document.querySelector('.nav-menu'),
        navToggle: document.querySelector('.nav-toggle'),
        sections: document.querySelectorAll('.section'),
        navLinks: document.querySelectorAll('.nav-menu a'),
        body: document.body,
        documentElement: document.documentElement
    };
    
    // Handle preloader
    const preloader = domCache.preloader;
    
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
        domCache.body.classList.add('mobile-device');
        
        // Ensure cursor is visible on mobile
        domCache.body.style.cursor = 'auto';
        
        // Initialize mobile-specific optimizations
        initMobileOptimizations();
    } else {
        // Initialize particles on desktop only - delayed for better initial load
        setTimeout(() => {
            initializeParticles();
        }, 1000);
        
        // Setup custom cursor on desktop - delayed
        setTimeout(() => {
            setupCustomCursor();
        }, 1500);
        
        // Initialize tilt effects for cards on desktop - delayed
        setTimeout(() => {
            initTiltEffects();
        }, 2000);
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
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Initialize project search - deferred for better performance
    setTimeout(() => {
        initProjectSearch();
    }, 2500);
    
    // Initialize blog functionality - deferred
    setTimeout(() => {
        initBlogFunctionality();
    }, 3000);
    
    // Initialize particles.js with enhanced configuration
    if (typeof particlesJS !== 'undefined') {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const particleColor = currentTheme === 'dark' ? '#64ffda' : '#0a9e88';
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 30, // Reduced from 60 for better performance
                    density: {
                        enable: true,
                        value_area: 1200 // Increased area for better distribution with fewer particles
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
                    value: 0.25, // Slightly increased to compensate for fewer particles
                    random: false, // Disabled random for better performance
                    anim: {
                        enable: true,
                        speed: 0.5, // Reduced animation speed
                        opacity_min: 0.15,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false, // Disabled size animation for better performance
                        speed: 1,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120, // Reduced connection distance
                    color: particleColor,
                    opacity: 0.2, // Slightly increased opacity
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5, // Reduced speed for smoother performance
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false // Disabled attract for better performance
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
                        enable: false // Disabled click interaction for better performance
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140, // Reduced grab distance
                        line_linked: {
                            opacity: 0.4 // Reduced opacity for subtler effect
                        }
                    }
                }
            },
            retina_detect: false // Disabled for better performance on high-DPI displays
        });
    }

    // Initialize mobile navigation menu
    function initMobileNav() {
        const navToggle = domCache.navToggle;
        const navMenu = domCache.navMenu;
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navMenu.classList.contains('active');
                navMenu.classList.toggle('active');
                
                // Update ARIA attributes for accessibility
                navToggle.setAttribute('aria-expanded', !isExpanded);
                
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
        const navLinks = domCache.navLinks;
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
        const themeToggle = domCache.themeToggle;
        const themeIcon = domCache.themeIcon;
        
        // Check for saved theme preference or use default dark theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        domCache.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update icon based on current theme
        updateThemeIcon(savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                // Add transition class to body for smoother theme switching
                domCache.documentElement.classList.add('theme-transition');
                
                // Toggle theme
                const currentTheme = domCache.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                // Add visual effect for theme change
                const ripple = document.createElement('span');
                ripple.classList.add('theme-toggle-ripple');
                themeToggle.appendChild(ripple);
                
                // Add transform origin based on theme
                if (newTheme === 'light') {
                    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                } else {
                    ripple.style.backgroundColor = 'rgba(10, 25, 47, 0.8)';
                }
                
                // Animate the ripple
                setTimeout(() => {
                    ripple.style.transform = 'scale(150)';
                    ripple.style.opacity = '0.3';
                }, 10);
                
                // Apply theme change
                setTimeout(() => {
                    domCache.documentElement.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                    updateThemeIcon(newTheme);
                    
                    // Update particles color if particles.js is initialized
                    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
                        const particleColor = newTheme === 'dark' ? '#64ffda' : '#0056b3';
                        pJSDom[0].pJS.particles.color.value = particleColor;
                        pJSDom[0].pJS.particles.line_linked.color = particleColor;
                        pJSDom[0].pJS.fn.particlesRefresh();
                    }
                    
                    // Clean up the ripple effect
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                }, 300);
                
                // Remove transition class after theme change is complete
                setTimeout(() => {
                    domCache.documentElement.classList.remove('theme-transition');
                }, 1000);
            });
        }
        
        // Update theme icon based on current theme
        function updateThemeIcon(theme) {
            if (themeIcon) {
                if (theme === 'dark') {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    
                    // Add subtle animation
                    themeIcon.style.animation = 'rotate 0.5s ease-in-out';
                    setTimeout(() => {
                        themeIcon.style.animation = '';
                    }, 500);
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    
                    // Add subtle animation
                    themeIcon.style.animation = 'rotate 0.5s ease-in-out';
                    setTimeout(() => {
                        themeIcon.style.animation = '';
                    }, 500);
                }
            }
        }
    }
    
    // Initialize sticky navbar behavior
    function initStickyNavbar() {
        const navbar = domCache.navbar;
        
        if (navbar) {
            // Check initial scroll position
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            }
            
            // Add throttled event listener for scroll
            const handleScroll = throttle(() => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, 16); // ~60fps
            
            window.addEventListener('scroll', handleScroll, { passive: true });
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
            const throttledTilt = throttle(handleTilt.bind(card), 16); // ~60fps
            card.addEventListener('mousemove', throttledTilt, { passive: true });
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
        const sections = domCache.sections;
        const navLinks = domCache.navLinks;
        
        const handleSectionHighlight = throttle(() => {
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
        }, 50); // Throttle to 20fps for less critical highlighting
        
        window.addEventListener('scroll', handleSectionHighlight, { passive: true });
    }
    
    // Initialize back to top button
    function initBackToTop() {
        const backToTopButton = domCache.backToTopButton;
        
        if (backToTopButton) {
            // Show button when scrolled down - throttled for better performance
            const handleBackToTopScroll = throttle(() => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            }, 100); // Throttle to 10fps for back-to-top visibility
            
            window.addEventListener('scroll', handleBackToTopScroll, { passive: true });
            
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
            // Add real-time validation
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => clearFieldError(input));
            });
            
            contactForm.addEventListener('submit', function(e) {
                // Prevent default form submission
                e.preventDefault();
                
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                
                // Clear previous errors
                clearAllErrors();
                
                let hasErrors = false;
                
                // Validate name
                if (!name.value.trim()) {
                    showFieldError(name, 'Name is required');
                    hasErrors = true;
                } else if (name.value.trim().length < 2) {
                    showFieldError(name, 'Name must be at least 2 characters');
                    hasErrors = true;
                }
                
                // Validate email
                if (!email.value.trim()) {
                    showFieldError(email, 'Email is required');
                    hasErrors = true;
                } else if (!isValidEmail(email.value)) {
                    showFieldError(email, 'Please enter a valid email address');
                    hasErrors = true;
                }
                
                // Validate message
                if (!message.value.trim()) {
                    showFieldError(message, 'Message is required');
                    hasErrors = true;
                } else if (message.value.trim().length < 10) {
                    showFieldError(message, 'Message must be at least 10 characters');
                    hasErrors = true;
                }
                
                if (hasErrors) {
                    // Focus on first error field
                    const firstError = contactForm.querySelector('.error');
                    if (firstError) {
                        firstError.focus();
                    }
                    return;
                }
                
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Get form data
                const formData = new FormData(contactForm);
                
                // Submit form with fetch API
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show success message
                        showFormMessage('Your message has been sent successfully!', 'success');
                        // Reset form
                        contactForm.reset();
                    } else {
                        // Show error message
                        showFormMessage('There was a problem sending your message. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    showFormMessage('There was a problem sending your message. Please try again.', 'error');
                    console.error('Error:', error);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
            });
        }
    }
    
    // Display form message
    function showFormMessage(text, type) {
        const messageElement = document.querySelector('.form-message') || document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = text;
        messageElement.setAttribute('role', 'alert');
        messageElement.setAttribute('aria-live', 'polite');
        
        const contactForm = document.querySelector('.contact-form');
        if (!document.querySelector('.form-message')) {
            contactForm.appendChild(messageElement);
        }
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
    
    // Show field-specific error
    function showFieldError(field, message) {
        const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
    }
    
    // Clear field error
    function clearFieldError(field) {
        const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
    }
    
    // Clear all form errors
    function clearAllErrors() {
        const contactForm = document.querySelector('.contact-form');
        const errorMessages = contactForm.querySelectorAll('.error-message');
        const errorFields = contactForm.querySelectorAll('.error');
        
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.classList.remove('show');
        });
        
        errorFields.forEach(field => {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
        });
    }
    
    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        
        switch (field.type) {
            case 'text':
                if (field.id === 'name') {
                    if (!value) {
                        showFieldError(field, 'Name is required');
                        return false;
                    } else if (value.length < 2) {
                        showFieldError(field, 'Name must be at least 2 characters');
                        return false;
                    }
                }
                break;
            case 'email':
                if (!value) {
                    showFieldError(field, 'Email is required');
                    return false;
                } else if (!isValidEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
            default:
                if (field.tagName === 'TEXTAREA') {
                    if (!value) {
                        showFieldError(field, 'Message is required');
                        return false;
                    } else if (value.length < 10) {
                        showFieldError(field, 'Message must be at least 10 characters');
                        return false;
                    }
                }
        }
        
        clearFieldError(field);
        return true;
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
        
        // Create main cursor ring
        const cursorRing = document.createElement('div');
        cursorRing.className = 'cursor-ring';
        
        // Create trailing dots for effect
        const trailingDots = document.createElement('div');
        trailingDots.className = 'trailing-dots';
        
        // Create 5 dots for the trail
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            dot.style.animationDelay = `${i * 0.1}s`;
            trailingDots.appendChild(dot);
        }
        
        cursor.appendChild(cursorRing);
        cursor.appendChild(trailingDots);
        document.body.appendChild(cursor);
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        let cursorVisible = true;
        let cursorEnlarged = false;
        
        // Create an array to store previous mouse positions for trail
        const mousePositions = [];
        
        // Set up event listeners with throttling for better performance
        document.addEventListener('mousemove', throttle(animateCursor, 8), { passive: true }); // ~120fps
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
                // Store current mouse position
                mousePositions.unshift({ x: e.clientX, y: e.clientY });
                
                // Limit the array to only store positions needed for the trail
                if (mousePositions.length > 5) {
                    mousePositions.pop();
                }
                
                // Position cursor ring at cursor position
                cursorRing.style.top = `${e.clientY}px`;
                cursorRing.style.left = `${e.clientX}px`;
                
                // Update positions of trailing dots
                const trailDots = document.querySelectorAll('.trail-dot');
                trailDots.forEach((dot, index) => {
                    if (mousePositions[index]) {
                        dot.style.top = `${mousePositions[index].y}px`;
                        dot.style.left = `${mousePositions[index].x}px`;
                        dot.style.opacity = 1 - (index * 0.2); // Fade out as they trail
                    }
                });
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
    
    // Initialize the testimonials slider
    function initTestimonialsSlider() {
        const slides = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;
        
        if (slides.length === 0 || dots.length === 0) return;
        
        // Function to set the active slide
        const setActiveSlide = (index) => {
            // Remove active class from all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Move the slider - position all slides
            slides.forEach((slide, i) => {
                // Position each slide relative to the active one
                // This ensures proper positioning for all slides
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
                slide.style.opacity = i === index ? '1' : '0.4';
                slide.style.zIndex = i === index ? '2' : '1';
            });
        };
        
        // Make all slides initially visible but positioned off-screen
        slides.forEach((slide, i) => {
            slide.style.display = 'block';
            slide.style.position = 'absolute';
            slide.style.width = '100%';
            slide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            if (i !== 0) {
                slide.style.transform = `translateX(100%)`;
                slide.style.opacity = '0.4';
            }
        });
        
        // Set first slide as active initially
        setActiveSlide(0);
        
        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                setActiveSlide(currentIndex);
            });
        });
        
        // Auto-rotate slides
        const autoRotate = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            setActiveSlide(currentIndex);
        };
        
        // Set interval for auto-rotation (7 seconds)
        let rotationInterval = setInterval(autoRotate, 7000);
        
        // Pause rotation on hover
        const sliderContainer = document.querySelector('.testimonials-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(rotationInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                clearInterval(rotationInterval);
                rotationInterval = setInterval(autoRotate, 7000);
            });
            
            // Handle touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            const handleSwipe = () => {
                // Swipe left (next slide)
                if (touchStartX - touchEndX > 50) {
                    currentIndex = (currentIndex + 1) % slides.length;
                    setActiveSlide(currentIndex);
                }
                
                // Swipe right (previous slide)
                if (touchEndX - touchStartX > 50) {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    setActiveSlide(currentIndex);
                }
            };
        }
    }
    
    // Initialize project search functionality
    function initProjectSearch() {
        const projectSearchContainer = document.createElement('div');
        projectSearchContainer.className = 'project-search-container';
        
        const projectsSection = document.querySelector('#projects .container');
        
        if (!projectsSection) return;
        
        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'project-search-input';
        searchInput.placeholder = 'Search projects...';
        
        // Create search icon
        const searchIcon = document.createElement('i');
        searchIcon.className = 'fas fa-search search-icon';
        
        // Append elements
        projectSearchContainer.appendChild(searchIcon);
        projectSearchContainer.appendChild(searchInput);
        
        // Insert search container after the section title
        const sectionTitle = projectsSection.querySelector('.section-title');
        if (sectionTitle && sectionTitle.nextElementSibling) {
            projectsSection.insertBefore(projectSearchContainer, sectionTitle.nextElementSibling);
        } else {
            projectsSection.appendChild(projectSearchContainer);
        }
        
        // Add event listener for search
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const projects = document.querySelectorAll('.project-card');
            
            projects.forEach(project => {
                const title = project.querySelector('.project-header h3').textContent.toLowerCase();
                const description = project.querySelector('.project-desc').textContent.toLowerCase();
                const tags = Array.from(project.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                // Check if project matches search term
                const matchesSearch = title.includes(searchTerm) || 
                                    description.includes(searchTerm) || 
                                    tags.some(tag => tag.includes(searchTerm));
                
                // Show or hide based on search
                if (matchesSearch || searchTerm === '') {
                    project.style.display = 'flex';
                    // Animate the appearance
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show "no results" message if no projects match
            let noResultsMsg = document.querySelector('.no-results-message');
            const hasVisibleProjects = Array.from(projects).some(p => p.style.display !== 'none');
            
            if (!hasVisibleProjects && searchTerm !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results-message';
                    noResultsMsg.innerHTML = `
                        <i class="fas fa-search"></i>
                        <p>No projects found matching "${searchTerm}"</p>
                        <button class="clear-search-btn">Clear Search</button>
                    `;
                    document.querySelector('.projects-grid').after(noResultsMsg);
                    
                    // Add event listener to the clear button
                    document.querySelector('.clear-search-btn').addEventListener('click', () => {
                        searchInput.value = '';
                        searchInput.dispatchEvent(new Event('input'));
                    });
                } else {
                    noResultsMsg.querySelector('p').textContent = `No projects found matching "${searchTerm}"`;
                    noResultsMsg.style.display = 'flex';
                }
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
        
        // Add clear button inside search input
        const clearButton = document.createElement('button');
        clearButton.className = 'search-clear-btn';
        clearButton.innerHTML = '<i class="fas fa-times"></i>';
        clearButton.style.display = 'none';
        projectSearchContainer.appendChild(clearButton);
        
        // Show/hide clear button based on input
        searchInput.addEventListener('input', () => {
            clearButton.style.display = searchInput.value ? 'block' : 'none';
        });
        
        // Clear search when button is clicked
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            clearButton.style.display = 'none';
            searchInput.focus();
        });
    }
    
    // Initialize blog functionality
    function initBlogFunctionality() {
        const viewAllBtn = document.querySelector('.blog-section-cta .secondary-btn');
        
        if (!viewAllBtn) {
            // Try alternative selector if the first one doesn't match
            const alternativeBtn = document.querySelector('#blog .section-cta .secondary-btn');
            if (alternativeBtn) {
                setupBlogButton(alternativeBtn);
            }
        } else {
            setupBlogButton(viewAllBtn);
        }
        
        // Handle individual blog article links
        setupArticleLinks();
        
        function setupBlogButton(button) {
            // Update button to prevent default navigation
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Show loading state
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Simulate loading additional blog posts
                setTimeout(() => {
                    // Add more blog articles
                    const blogGrid = document.querySelector('.blog-grid');
                    if (blogGrid) {
                        // Get existing template
                        const existingArticles = document.querySelectorAll('.blog-card');
                        if (existingArticles.length > 0) {
                            const newArticles = [
                                {
                                    date: { day: '05', month: 'May' },
                                    image: 'https://via.placeholder.com/600x400',
                                    title: 'Understanding Kubernetes for Beginners',
                                    excerpt: 'A step-by-step guide to understanding container orchestration and deploying your first Kubernetes cluster.',
                                    tags: ['DevOps', 'Kubernetes'],
                                    alt: 'Kubernetes Diagram'
                                },
                                {
                                    date: { day: '22', month: 'Apr' },
                                    image: 'https://via.placeholder.com/600x400',
                                    title: 'Building Responsive UIs with Tailwind CSS',
                                    excerpt: 'How to create beautiful, responsive user interfaces quickly using the utility-first CSS framework.',
                                    tags: ['CSS', 'Frontend'],
                                    alt: 'Responsive UI Design'
                                },
                                {
                                    date: { day: '15', month: 'Apr' },
                                    image: 'https://via.placeholder.com/600x400',
                                    title: 'Testing Strategies for Modern Applications',
                                    excerpt: 'Effective approaches for testing large-scale applications including unit, integration, and end-to-end testing.',
                                    tags: ['Testing', 'JavaScript'],
                                    alt: 'Code Testing'
                                },
                                {
                                    date: { day: '02', month: 'Apr' },
                                    image: 'https://via.placeholder.com/600x400',
                                    title: 'Introduction to GraphQL API Development',
                                    excerpt: 'Learn how to build efficient APIs with GraphQL for better data fetching and improved frontend performance.',
                                    tags: ['GraphQL', 'API'],
                                    alt: 'GraphQL Schema'
                                }
                            ];
                            
                            // Add each new article to the grid
                            newArticles.forEach(article => {
                                const articleElement = document.createElement('article');
                                articleElement.className = 'blog-card';
                                articleElement.style.opacity = '0';
                                articleElement.style.transform = 'translateY(20px)';
                                
                                articleElement.innerHTML = `
                                    <div class="blog-image">
                                        <img src="${article.image}" alt="${article.alt}">
                                        <div class="blog-date">
                                            <span class="day">${article.date.day}</span>
                                            <span class="month">${article.date.month}</span>
                                        </div>
                                    </div>
                                    <div class="blog-content">
                                        <div class="blog-tags">
                                            ${article.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                                        </div>
                                        <h3 class="blog-title">${article.title}</h3>
                                        <p class="blog-excerpt">${article.excerpt}</p>
                                        <a href="#" class="blog-read-more">Read Article <i class="fas fa-arrow-right"></i></a>
                                    </div>
                                `;
                                
                                blogGrid.appendChild(articleElement);
                                
                                // Animate in
                                setTimeout(() => {
                                    articleElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                                    articleElement.style.opacity = '1';
                                    articleElement.style.transform = 'translateY(0)';
                                }, 100);
                            });
                            
                            // Setup event handlers for new articles
                            setupArticleLinks();
                        }
                    }
                    
                    // Update button text and function
                    button.innerHTML = '<i class="fas fa-check"></i> All Articles Loaded';
                    button.disabled = true;
                    button.style.opacity = '0.7';
                    button.style.cursor = 'default';
                    button.removeEventListener('click', arguments.callee);
                }, 1200);
            });
        }
        
        function setupArticleLinks() {
            // Add click handlers to all blog article links
            const articleLinks = document.querySelectorAll('.blog-read-more');
            
            articleLinks.forEach(link => {
                if (!link.hasAttribute('data-handler-attached')) {
                    link.setAttribute('data-handler-attached', 'true');
                    
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Get article details
                        const article = this.closest('.blog-card');
                        const title = article.querySelector('.blog-title').textContent;
                        const image = article.querySelector('.blog-image img').getAttribute('src');
                        
                        // Create modal
                        createArticleModal(title, image);
                    });
                }
            });
        }
        
        function createArticleModal(title, image) {
            // Create modal container
            const modal = document.createElement('div');
            modal.className = 'article-modal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            modal.style.zIndex = '1000';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.3s ease';
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.className = 'article-modal-content';
            modalContent.style.backgroundColor = 'var(--card-bg)';
            modalContent.style.borderRadius = '10px';
            modalContent.style.width = '90%';
            modalContent.style.maxWidth = '800px';
            modalContent.style.maxHeight = '90vh';
            modalContent.style.overflowY = 'auto';
            modalContent.style.padding = '30px';
            modalContent.style.position = 'relative';
            modalContent.style.transform = 'translateY(20px)';
            modalContent.style.transition = 'transform 0.3s ease';
            modalContent.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '15px';
            closeBtn.style.right = '15px';
            closeBtn.style.backgroundColor = 'transparent';
            closeBtn.style.border = 'none';
            closeBtn.style.color = 'var(--accent)';
            closeBtn.style.fontSize = '24px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.zIndex = '1';
            
            // Add close button event listener
            closeBtn.addEventListener('click', () => {
                modalContent.style.transform = 'translateY(20px)';
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            });
            
            // Create article content
            const articleContent = document.createElement('div');
            articleContent.innerHTML = `
                <div class="article-header" style="margin-bottom: 20px;">
                    <h2 style="color: var(--light); font-size: 28px; margin-bottom: 20px;">${title}</h2>
                    <div class="article-meta" style="display: flex; align-items: center; margin-bottom: 20px; color: var(--gray);">
                        <span style="margin-right: 15px;"><i class="far fa-calendar-alt"></i> Published on May 15, 2023</span>
                        <span><i class="far fa-clock"></i> 10 min read</span>
                    </div>
                </div>
                <div class="article-featured-image" style="margin-bottom: 30px;">
                    <img src="${image}" alt="${title}" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                </div>
                <div class="article-text" style="color: var(--text); line-height: 1.8; font-size: 16px;">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.</p>
                    
                    <h3 style="color: var(--light); font-size: 22px; margin: 30px 0 15px;">Introduction</h3>
                    <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui.</p>
                    
                    <h3 style="color: var(--light); font-size: 22px; margin: 30px 0 15px;">Main Section</h3>
                    <p>Cras mattis consectetur purus sit amet fermentum. Etiam porta sem malesuada magna mollis euismod. Vestibulum id ligula porta felis euismod semper.</p>
                    <ul style="margin-left: 20px; margin-bottom: 20px;">
                        <li style="margin-bottom: 10px;">First important point about this topic</li>
                        <li style="margin-bottom: 10px;">Second important point about this topic</li>
                        <li style="margin-bottom: 10px;">Third important point about this topic</li>
                    </ul>
                    
                    <h3 style="color: var(--light); font-size: 22px; margin: 30px 0 15px;">Conclusion</h3>
                    <p>Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
                </div>
            `;
            
            // Append elements
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(articleContent);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
            
            // Animate in
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
            
            // Close on click outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modalContent.style.transform = 'translateY(20px)';
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        }
    }
    
    // Initialize animations after preloader
    function initAnimations() {
        // Initialize typing effect
        initTypingEffect();
        
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
        
        // Add parallax scrolling effect - deferred for better performance
        setTimeout(() => {
            initParallaxEffect();
        }, 1000);
        
        // Add interactive project card effects - deferred
        setTimeout(() => {
            initInteractiveCards();
        }, 1500);
    }
    
    // Initialize typing effect for hero section
    function initTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        
        const texts = [
            'Software Engineer & Developer',
            'Full-Stack Developer',
            'Aviation Technology Expert',
            'Cloud Solutions Architect',
            'Problem Solver & Innovator'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 75;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            // Add cursor effect
            typingElement.style.borderRight = '2px solid var(--accent)';
            
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of text
                setTimeout(() => {
                    isDeleting = true;
                    typeText();
                }, 2000);
                return;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Start typing effect after a delay
        setTimeout(typeText, 1000);
    }
    
    // Initialize parallax scrolling effect
    function initParallaxEffect() {
        if (isMobile) return; // Skip on mobile for performance
        
        const handleParallaxScroll = throttle(() => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('header');
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            // Parallax effect for header - use transform3d for better performance
            if (header) {
                header.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
            }
            
            // Parallax effect for other elements
            parallaxElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
            });
        }, 16); // 60fps for smooth parallax
        
        window.addEventListener('scroll', handleParallaxScroll, { passive: true });
    }
    
    // Initialize interactive card effects
    function initInteractiveCards() {
        const cards = document.querySelectorAll('.project-card, .skill-card, .blog-card');
        
        cards.forEach(card => {
            // Add magnetic effect on hover
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
            
            const throttledMouseMove = throttle(function(e) {
                if (isMobile) return;
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale3d(1.05, 1.05, 1.05)
                `;
                
                // Add dynamic shadow
                const shadowX = (x - centerX) / 5;
                const shadowY = (y - centerY) / 5;
                this.style.boxShadow = `
                    ${shadowX}px ${shadowY}px 25px rgba(0, 0, 0, 0.2),
                    0 0 0 1px rgba(var(--accent-rgb), 0.1)
                `;
            }.bind(card), 16); // ~60fps
            
            card.addEventListener('mousemove', throttledMouseMove, { passive: true });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.transition = 'all 0.3s ease';
            });
            
            // Add click ripple effect
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(var(--accent-rgb), 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}); 