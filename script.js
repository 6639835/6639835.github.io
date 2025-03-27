// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after content loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = 'visible'; // Enable scrolling
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
    } else {
        // Initialize particles on desktop only
        initializeParticles();
        
        // Setup custom cursor on desktop
        setupCustomCursor();
    }

    // Add a loading animation while the page initializes
    const body = document.body;
    body.classList.add('loading');
    
    // Remove loading class after a short delay
    setTimeout(() => {
        body.classList.remove('loading');
    }, 1000);

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
            
            // Update particles color if particles.js is active
            if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
                const particleColor = newTheme === 'dark' ? '#64ffda' : '#0a9e88';
                pJSDom[0].pJS.particles.color.value = particleColor;
                pJSDom[0].pJS.particles.line_linked.color = particleColor;
                pJSDom[0].pJS.fn.particlesRefresh();
            }
        });
    }
    
    // Update theme icon with animation
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        
        themeIcon.style.transform = 'rotate(360deg)';
        
        setTimeout(() => {
            if (theme === 'dark') {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            themeIcon.style.transform = 'rotate(0)';
        }, 200);
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

    // Enhanced scroll animations - reveal elements as they enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');
                
                // Animate skill bars when skills section becomes visible
                if (entry.target.id === 'skills') {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 300);
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Apply to all sections and project cards
    document.querySelectorAll('.section, .project-card, .skill-card').forEach(element => {
        element.classList.add('section-hidden');
        observer.observe(element);
    });
    
    // Add navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
    
    // Add fade-in animation to sections
    const sectionElements = document.querySelectorAll('.section');
    sectionElements.forEach(section => {
        section.classList.add('section-hidden');
    });

    // Use the existing observer instead of creating a new one
    sectionElements.forEach(section => {
        observer.observe(section);
    });
    
    // Enhanced Scroll to section smoothly when clicking on nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add a highlight effect to the target section
                targetElement.classList.add('section-highlight');
                
                // Scroll with enhanced easing
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Remove highlight after scrolling completes
                setTimeout(() => {
                    targetElement.classList.remove('section-highlight');
                }, 1500);
                
                // Update URL without page reload (for better UX)
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Add a more advanced intersection observer for sections
    const allSections = document.querySelectorAll('.section');
    
    // Configure Intersection Observer with options
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class
                entry.target.classList.add('section-visible');
                
                // Animate skill bars if this is the skills section
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Unobserve once animation is applied
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe all sections
    allSections.forEach(section => {
        // Set initial state
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
    
    // Make the first section visible immediately without animation
    if (allSections.length > 0) {
        allSections[0].classList.remove('section-hidden');
        allSections[0].classList.add('section-visible');
    }
    
    // Function to animate skill bars
    function animateSkillBars() {
        const progressBars = document.querySelectorAll('.progress-value');
        const progressPercentages = document.querySelectorAll('.progress-percentage');
        
        // Animate each bar from 0 to target width
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            const percentValue = parseInt(width);
            
            // Reset width to 0
            bar.style.width = '0%';
            
            // Animate to target width
            setTimeout(() => {
                bar.style.width = width;
                
                // Also animate the counter
                if (progressPercentages[index]) {
                    animateCounter(progressPercentages[index], percentValue);
                }
            }, 200);
        });
    }
    
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
    
    // Skill Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-value');
    const progressPercentages = document.querySelectorAll('.progress-percentage');
    
    // Function to animate percentage counters
    function animateCounter(element, targetValue) {
        const duration = 1500;
        const startTime = performance.now();
        const startValue = 0;
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
            
            element.textContent = `${currentValue}%`;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Project Card Hover Effects with 3D Tilt
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateX = 10 * mouseY / (cardHeight / 2);
        const rotateY = -10 * mouseX / (cardWidth / 2);
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        card.style.transition = 'transform 0.1s ease';
        
        // Dynamic shine effect
        const glare = card.querySelector('.card-glare') || document.createElement('div');
        if (!card.querySelector('.card-glare')) {
            glare.classList.add('card-glare');
            card.appendChild(glare);
        }
        
        const glareX = (e.offsetX / cardWidth) * 100;
        const glareY = (e.offsetY / cardHeight) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%)`;
    }
    
    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        this.style.transition = 'transform 0.5s ease';
        
        const glare = this.querySelector('.card-glare');
        if (glare) {
            glare.style.background = 'none';
        }
    }

    // Project Filter Functionality
    function filterProjects(filter) {
        const projectItems = document.querySelectorAll('.project-card');
        
        projectItems.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            // Show all projects if filter is 'all'
            if (filter === 'all') {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
                return;
            }
            
            // Check if card has the selected category
            if (categories && categories.includes(filter)) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 500);
            }
        });
    }
    
    // Animated Counter for GitHub Stats
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Lazy load GitHub stats
    const githubStatsSection = document.getElementById('github-stats');
    if (githubStatsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a custom animation to stats when they become visible
                    const statImages = entry.target.querySelectorAll('img');
                    statImages.forEach((img, index) => {
                        img.style.opacity = '0';
                        img.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            img.style.opacity = '1';
                            img.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        statsObserver.observe(githubStatsSection);
    }
    
    // Add a loading spinner to the body
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    loadingSpinner.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingSpinner);
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    // Function to initialize particles
    function initializeParticles() {
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
    }
    
    // Function to setup custom cursor
    function setupCustomCursor() {
        // Create cursor elements if they don't exist
        if (!document.querySelector('.cursor-dot')) {
            const cursorDot = document.createElement('div');
            cursorDot.classList.add('cursor-dot');
            document.body.appendChild(cursorDot);
        }
        
        if (!document.querySelector('.cursor-outline')) {
            const cursorOutline = document.createElement('div');
            cursorOutline.classList.add('cursor-outline');
            document.body.appendChild(cursorOutline);
        }
        
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        // Variables for cursor position
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        let isVisible = false;
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor elements
            if (!isVisible) {
                isVisible = true;
                cursorDot.style.opacity = '1';
                cursorOutline.style.opacity = '0.5';
            }
            
            // Update dot position immediately
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });
        
        // Animate outline with smooth following effect
        function animateCursor() {
            // Calculate smooth outline movement with easing
            const easing = 8; // Higher = slower follow
            outlineX += (mouseX - outlineX) / easing;
            outlineY += (mouseY - outlineY) / easing;
            
            // Update outline position
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            // Continue animation
            requestAnimationFrame(animateCursor);
        }
        
        // Start animation
        animateCursor();
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseout', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
            isVisible = false;
        });
        
        // Show cursor when mouse enters window
        document.addEventListener('mouseover', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '0.5';
            isVisible = true;
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-toggle, .theme-toggle, .back-to-top, input, textarea, .filter-btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('cursor-hover');
                cursorOutline.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('cursor-hover');
                cursorOutline.classList.remove('cursor-hover');
            });
        });
        
        // Add click animation
        document.addEventListener('mousedown', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.7)';
        });
        
        document.addEventListener('mouseup', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    // Improved contact form handling with validation and feedback
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormMessage('Please fill out all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showFormMessage('Something went wrong. Please try again later.', 'error');
                }
            } catch (error) {
                showFormMessage('An error occurred. Please try again later.', 'error');
            }
        });
    }
    
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message';
        formMessage.classList.add(type);
        
        setTimeout(() => {
            formMessage.classList.add('fade-out');
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 500);
        }, 5000);
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = document.querySelector('.nav-toggle i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Add highlight effect to section
                document.querySelectorAll('.section-highlight').forEach(el => {
                    el.classList.remove('section-highlight');
                });
                
                targetElement.classList.add('section-highlight');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
}); 