// Interactive Animations and Visual Effects
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeHoverEffects();
    initializeFormAnimations();
});

// Core Animation Initialization
function initializeAnimations() {
    // Initialize particle system
    createParticleSystem();

    // Initialize floating animations
    initializeFloatingElements();

    // Initialize connection lines
    drawConnectionLines();

    // Initialize data streams
    initializeDataStreams();
}

// Particle System
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #ff0040;
        border-radius: 50%;
        box-shadow: 0 0 5px #ff0040;
        opacity: 0;
        pointer-events: none;
    `;

    // Random starting position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';

    container.appendChild(particle);

    // Animate particle
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 10000 + 5000; // 5-15 seconds
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;

    // Fade in
    particle.style.transition = 'opacity 1s ease-in';
    particle.style.opacity = Math.random() * 0.5 + 0.3;

    // Move particle
    setTimeout(() => {
        particle.style.transition = `all ${duration}ms linear`;
        particle.style.left = endX + 'px';
        particle.style.top = endY + 'px';
    }, 1000);

    // Fade out and restart
    setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => {
            particle.style.transition = 'none';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            animateParticle(particle);
        }, 1000);
    }, duration + 1000);
}

// Scroll-based Animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.case-card, .report-card, .skill-category, .form-group').forEach(element => {
        element.classList.add('animate-on-scroll');
        scrollObserver.observe(element);
    });
}

// Hover Effects
function initializeHoverEffects() {
    // Card hover effects
    document.querySelectorAll('.case-card, .report-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-neon');
            createRippleEffect(this);
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-neon');
        });
    });

    // Navigation hover effects
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            createNavigationEffect(this);
        });
    });

    // Button hover effects
    document.querySelectorAll('.comms-submit').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            createButtonGlow(this);
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Ripple Effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 0, 64, 0.3), transparent);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        animation: ripple-expand 1s ease-out forwards;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Remove after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1000);
}

// Navigation Effect
function createNavigationEffect(link) {
    const effect = document.createElement('div');
    const rect = link.getBoundingClientRect();

    effect.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        background: linear-gradient(90deg, transparent, rgba(255, 0, 64, 0.2), transparent);
        pointer-events: none;
        animation: nav-pulse 0.6s ease-out forwards;
        z-index: 9999;
    `;

    document.body.appendChild(effect);

    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 600);
}

// Button Glow Effect
function createButtonGlow(button) {
    button.style.boxShadow = '0 0 30px rgba(255, 0, 64, 0.6), 0 0 60px rgba(255, 0, 64, 0.3)';

    setTimeout(() => {
        button.style.boxShadow = '';
    }, 300);
}

// Floating Elements Animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.case-card, .report-card');

    floatingElements.forEach((element, index) => {
        element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Connection Lines
function drawConnectionLines() {
    const connectionContainer = document.createElement('div');
    connectionContainer.id = 'connection-lines';
    connectionContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(connectionContainer);

    // Create animated connection lines
    for (let i = 0; i < 10; i++) {
        createConnectionLine(connectionContainer, i);
    }
}

function createConnectionLine(container, index) {
    const line = document.createElement('div');
    line.style.cssText = `
        position: absolute;
        width: 100px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 0, 64, 0.5), transparent);
        opacity: 0.3;
        pointer-events: none;
    `;

    // Random position and rotation
    line.style.left = Math.random() * window.innerWidth + 'px';
    line.style.top = Math.random() * window.innerHeight + 'px';
    line.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(line);

    // Animate line
    animateConnectionLine(line);
}

function animateConnectionLine(line) {
    const duration = Math.random() * 10000 + 5000;

    line.style.animation = `connection-pulse ${duration}ms ease-in-out infinite`;
    line.style.animationDelay = Math.random() * 2000 + 'ms';
}

// Data Streams
function initializeDataStreams() {
    const dataStreams = document.querySelectorAll('.data-stream');

    dataStreams.forEach(stream => {
        createDataStreamParticles(stream);
    });
}

function createDataStreamParticles(container) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ff0040;
            border-radius: 50%;
            box-shadow: 0 0 10px #ff0040;
            left: ${Math.random() * 100}%;
            animation: data-stream-particle ${3 + Math.random() * 2}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
        `;

        container.appendChild(particle);
    }
}

// Form Animations
function initializeFormAnimations() {
    const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');

    formInputs.forEach(input => {
        // Focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            createInputFocusEffect(this);
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // Input validation animations
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
}

// Input Focus Effect
function createInputFocusEffect(input) {
    const rect = input.getBoundingClientRect();
    const effect = document.createElement('div');

    effect.style.cssText = `
        position: fixed;
        top: ${rect.top - 2}px;
        left: ${rect.left - 2}px;
        width: ${rect.width + 4}px;
        height: ${rect.height + 4}px;
        border: 2px solid #ff0040;
        border-radius: ${input.style.borderRadius || '6px'};
        pointer-events: none;
        animation: input-focus-glow 0.5s ease-out forwards;
        z-index: 1000;
    `;

    document.body.appendChild(effect);

    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 500);
}

// Input Validation
function validateInput(input) {
    const value = input.value.trim();

    if (value.length > 0) {
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            updateInputValidation(input, emailRegex.test(value));
        } else if (input.required) {
            updateInputValidation(input, value.length > 2);
        } else {
            updateInputValidation(input, true);
        }
    } else {
        updateInputValidation(input, null);
    }
}

function updateInputValidation(input, isValid) {
    // Remove previous validation classes
    input.classList.remove('valid', 'invalid');

    if (isValid === true) {
        input.classList.add('valid');
        input.style.borderColor = '#00ff80';
        input.style.boxShadow = '0 0 5px rgba(0, 255, 128, 0.5)';
    } else if (isValid === false) {
        input.classList.add('invalid');
        input.style.borderColor = '#ff0040';
        input.style.boxShadow = '0 0 5px rgba(255, 0, 64, 0.5)';
    } else {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
}

// Progress Animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const percentage = bar.dataset.percentage || 50;

        // Create observer for progress bar animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar(bar, percentage);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(bar);
    });
}

// Counter Animation
function animateCounter(element, targetValue, duration = 2000) {
    const startValue = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue.toLocaleString();
        }
    }

    requestAnimationFrame(updateCounter);
}

// Text Reveal Animation
function animateTextReveal(elements) {
    elements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';

        setTimeout(() => {
            revealText(element, text, 30);
        }, index * 200);
    });
}

function revealText(element, text, speed = 50) {
    let charIndex = 0;

    function typeChar() {
        if (charIndex < text.length) {
            element.textContent += text[charIndex];
            charIndex++;
            setTimeout(typeChar, speed + Math.random() * 30);
        }
    }

    typeChar();
}

// Stagger Animation
function staggerAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delay);
    });
}

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars if they exist
    setTimeout(() => {
        animateProgressBars();
    }, 1000);

    // Animate counters
    document.querySelectorAll('.stat-value').forEach(counter => {
        const text = counter.textContent;
        const number = parseInt(text.replace(/\D/g, ''));

        if (number && !isNaN(number)) {
            counter.dataset.originalText = text;
            animateCounter(counter, number);
        }
    });

    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        @keyframes ripple-expand {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }

        @keyframes nav-pulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.1); opacity: 0; }
        }

        @keyframes connection-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
        }

        @keyframes data-stream-particle {
            0% { transform: translateY(100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100%); opacity: 0; }
        }

        @keyframes input-focus-glow {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.05); opacity: 0; }
        }

        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }

        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .form-group.focused .form-label {
            color: #ff0040;
            text-shadow: 0 0 5px #ff0040;
        }

        .form-input.valid,
        .form-textarea.valid,
        .form-select.valid {
            border-color: #00ff80;
        }

        .form-input.invalid,
        .form-textarea.invalid,
        .form-select.invalid {
            border-color: #ff0040;
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;

    document.head.appendChild(animationStyles);
});

// Performance optimization - throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function() {
        // Scroll-based animations
        updateScrollAnimations();
    }, 16); // ~60fps
});

function updateScrollAnimations() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}