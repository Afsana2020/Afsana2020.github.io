// Particles.js Configuration
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
            value: ['#8b5cf6', '#f59e0b', '#10b981']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#8b5cf6',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
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
        }
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#a27bfcff;';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#a27bfcff;';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Details Sections Management
const detailsSections = {
    init: function() {
        // Get all details section elements
        this.sections = document.querySelectorAll('.details-section');
        this.closeButtons = document.querySelectorAll('.close-details');
        this.viewDetailButtons = document.querySelectorAll('.btn-view-details');
        
        // Add event listeners
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => this.closeAllSections());
        });
        
        this.viewDetailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const sectionId = e.target.closest('.btn-view-details').getAttribute('data-details');
                this.openSection(sectionId);
            });
        });
        
        // Close section when clicking outside
        this.sections.forEach(section => {
            section.addEventListener('click', (e) => {
                if (e.target === section) {
                    this.closeAllSections();
                }
            });
        });
        
        // Close section with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllSections();
            }
        });
    },
    
    openSection: function(sectionId) {
        this.closeAllSections();
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },
    
    closeAllSections: function() {
        this.sections.forEach(section => {
            section.style.display = 'none';
        });
        document.body.style.overflow = '';
    }
};

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
};

// Typing effect for terminal
const typeTerminal = () => {
    const terminal = document.querySelector('.terminal-body');
    const lines = [
        { text: '$ whoami', delay: 300 },
        { text: 'afsana_hena', delay: 600, class: 'output' },
        { text: '$ cat skills.txt', delay: 300 },
        { text: 'Python • ML • NLP • Web Dev • AI', delay: 600, class: 'output' },
        { text: '$ ', delay: 300 }
    ];

    let currentLine = 0;
    
    const typeLine = () => {
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            const lineElement = document.createElement('div');
            lineElement.className = `code-line ${line.class || ''}`;
            
            if (line.class === 'output') {
                lineElement.textContent = line.text;
                terminal.appendChild(lineElement);
                setTimeout(typeLine, line.delay);
            } else {
                let charIndex = 0;
                const typeChar = () => {
                    if (charIndex < line.text.length) {
                        lineElement.textContent += line.text.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, 30);
                    } else {
                        terminal.appendChild(lineElement);
                        setTimeout(typeLine, line.delay);
                    }
                };
                typeChar();
            }
            currentLine++;
        } else {
            // Add blinking cursor
            const cursorElement = document.createElement('div');
            cursorElement.className = 'code-line';
            cursorElement.innerHTML = '$ <span class="cursor">|</span>';
            terminal.appendChild(cursorElement);
        }
    };

    // Clear terminal and start typing
    terminal.innerHTML = '';
    setTimeout(typeLine, 500);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate skill bars when skills section is in view
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 200);
            }
        }
    });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize details sections
    detailsSections.init();
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-card, .education-card, .certification-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Start terminal typing effect
    typeTerminal();

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS for animations programmatically
const style = document.createElement('style');
style.textContent = `
    .skill-progress {
        transition: width 0.8s ease-in-out;
    }
`;
document.head.appendChild(style);


