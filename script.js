// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#64ffda'
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
                        speed: 1,
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
                    color: '#64ffda',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
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
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
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
    
    // Intersection Observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get all progress bars and percentages in this section
                const section = entry.target;
                const bars = section.querySelectorAll('.progress-value');
                const percentages = section.querySelectorAll('.progress-percentage');
                
                // Animate each progress bar and counter
                bars.forEach((bar, index) => {
                    const width = bar.style.width;
                    const percentValue = parseInt(width);
                    
                    // Reset the width to 0 before animation
                    bar.style.width = '0%';
                    
                    // After a small delay, animate to the target width
                    setTimeout(() => {
                        bar.style.width = width;
                        
                        // Also animate the counter if available
                        if (percentages[index]) {
                            animateCounter(percentages[index], percentValue);
                        }
                    }, 200);
                });
                
                // Unobserve once animated
                progressObserver.unobserve(section);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe the skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        progressObserver.observe(skillsSection);
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill all required fields.';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Simulate form submission (in a real app, you'd send data to a server)
            formMessage.textContent = 'Sending...';
            formMessage.className = 'form-message';
            
            // Simulate success after delay (replace with actual form submission in production)
            setTimeout(() => {
                formMessage.textContent = 'Message sent successfully! I\'ll be in touch soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                
                // Clear success message after some time
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            }, 1500);
        });
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
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Show loading spinner
            document.body.classList.add('loading');
            
            // Filter projects with delay for animation
            setTimeout(() => {
                filterProjects(filterValue);
                document.body.classList.remove('loading');
            }, 500);
        });
    });
    
    function filterProjects(filter) {
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
    
    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    let cursorVisible = false;
    let cursorEnlarged = false;
    
    const endX = (window.innerWidth / 2);
    const endY = (window.innerHeight / 2);
    let cursorX = endX;
    let cursorY = endY;
    
    const mouseStopped = debounce(() => {
        if (cursorVisible) {
            cursor.style.opacity = '0';
            cursorVisible = false;
        }
    }, 3000);
    
    document.addEventListener('mousemove', e => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        if (!cursorVisible) {
            cursor.style.opacity = '1';
            cursorVisible = true;
        }
        
        cursor.style.top = `${cursorY}px`;
        cursor.style.left = `${cursorX}px`;
        
        mouseStopped();
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
    
    // Add hover effect for custom cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-toggle, .theme-toggle, .back-to-top');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }
}); 