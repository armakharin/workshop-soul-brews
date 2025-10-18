// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeNavigation();
    initializeContactForm();
    initializeSystemStatus();
    initializeLastUpdateTime();
    initializeSmoothScrolling();
    initializeKeyboardShortcuts();
    initializeTheme();
    initializeAnalytics();
}

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', throttle(function() {
        updateActiveNavigationOnScroll();
    }, 100));

    // Initial navigation update
    updateActiveNavigationOnScroll();
}

function updateActiveNavigationOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    updateActiveNavigation(currentSection);
}

function updateActiveNavigation(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);

        // Add input validation listeners
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formStatus = document.getElementById('formStatus');

    // Validate all fields
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        updateFormStatus('Please fill in all required fields correctly.', 'error');
        return;
    }

    // Show loading state
    updateFormStatus('TRANSMITTING MESSAGE...', 'loading');
    form.querySelector('.comms-submit').disabled = true;

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        const submissionData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Log submission data (for demonstration)
        console.log('Form submitted:', submissionData);

        // Show success message
        updateFormStatus('MESSAGE TRANSMITTED SUCCESSFULLY', 'success');
        form.reset();

        // Re-enable submit button
        form.querySelector('.comms-submit').disabled = false;

        // Clear success message after 5 seconds
        setTimeout(() => {
            updateFormStatus('SYSTEMS READY', 'ready');
        }, 5000);

    }, 2000); // Simulate network delay
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${fieldName.toUpperCase()} is required`;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Message length validation
    if (field.name === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        } else if (value.length > 1000) {
            isValid = false;
            errorMessage = 'Message must be less than 1000 characters';
        }
    }

    // Name validation
    if (field.name === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('invalid');

    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ff0040;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        font-family: 'Share Tech Mono', monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    `;

    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);

    // Shake animation
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

function clearFieldError(field) {
    field.classList.remove('invalid');

    // Remove any existing error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.parentNode.removeChild(errorElement);
    }
}

function updateFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    if (!formStatus) return;

    const statusIndicator = formStatus.querySelector('.status-indicator');
    const statusText = formStatus.querySelector('.status-text');

    statusText.textContent = message;

    // Update styling based on status type
    switch (type) {
        case 'loading':
            statusIndicator.style.background = '#ffff00';
            statusIndicator.style.animation = 'pulse-active 1s ease-in-out infinite';
            statusText.style.color = '#ffff00';
            break;
        case 'success':
            statusIndicator.style.background = '#00ff80';
            statusIndicator.style.animation = 'pulse-active 2s ease-in-out infinite';
            statusText.style.color = '#00ff80';
            break;
        case 'error':
            statusIndicator.style.background = '#ff0040';
            statusIndicator.style.animation = 'pulse-active 0.5s ease-in-out infinite';
            statusText.style.color = '#ff0040';
            break;
        default:
            statusIndicator.style.background = '#ff0040';
            statusIndicator.style.animation = 'pulse-active 2s ease-in-out infinite';
            statusText.style.color = '#cccccc';
    }
}

// System Status Updates
function initializeSystemStatus() {
    updateSystemMetrics();

    // Update system metrics every 5 seconds
    setInterval(updateSystemMetrics, 5000);

    // Simulate random system events
    setInterval(simulateSystemEvent, 10000);
}

function updateSystemMetrics() {
    const metrics = {
        'cases solved': Math.floor(Math.random() * 50) + 500,
        'automation rate': Math.floor(Math.random() * 10) + 85,
        'response time': Math.floor(Math.random() * 3) + 2,
        'systems monitored': 12,
        'threats neutralized': Math.floor(Math.random() * 100) + 1200
    };

    // Update UI elements
    document.querySelectorAll('.stat-value').forEach(element => {
        const text = element.textContent.toLowerCase();
        Object.keys(metrics).forEach(key => {
            if (text.includes(key)) {
                const value = metrics[key];
                const suffix = text.includes('%') ? '%' : (text.includes('sec') ? ' sec' : '+');
                animateValue(element, parseInt(element.textContent), value, 1000, suffix);
            }
        });
    });

    // Update status indicators
    updateStatusIndicators();
}

function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(start + (end - start) * progress);
        element.textContent = currentValue + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }

    requestAnimationFrame(updateValue);
}

function updateStatusIndicators() {
    const indicators = document.querySelectorAll('.status-indicator');

    indicators.forEach(indicator => {
        // Random status changes
        if (Math.random() > 0.8) {
            const statuses = ['online', 'scanning', 'warning'];
            const currentStatus = statuses[Math.floor(Math.random() * statuses.length)];

            indicator.className = `status-indicator ${currentStatus}`;
        }
    });
}

function simulateSystemEvent() {
    const events = [
        { type: 'info', title: 'SYSTEM SCAN', message: 'Completed routine security scan' },
        { type: 'warning', title: 'ANOMALY DETECTED', message: 'Unusual activity pattern identified' },
        { type: 'success', title: 'UPDATE INSTALLED', message: 'Security definitions updated successfully' },
        { type: 'info', title: 'BACKUP COMPLETE', message: 'System backup completed successfully' }
    ];

    const event = events[Math.floor(Math.random() * events.length)];

    // Create notification (optional - can be implemented)
    console.log(`[${event.type.toUpperCase()}] ${event.title}: ${event.message}`);
}

// Last Update Time
function initializeLastUpdateTime() {
    const updateElement = document.getElementById('lastUpdate');
    if (updateElement) {
        updateLastUpdateTime(updateElement);

        // Update every minute
        setInterval(() => {
            updateLastUpdateTime(updateElement);
        }, 60000);
    }
}

function updateLastUpdateTime(element) {
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    element.textContent = formattedTime;
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Already handled in navigation, but add smooth scroll behavior to document
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for quick navigation
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showQuickNavigation();
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            closeModals();
        }

        // Number keys for quick section navigation
        if (e.key >= '1' && e.key <= '4' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const sections = ['profile', 'cases', 'reports', 'comms'];
            const sectionIndex = parseInt(e.key) - 1;

            if (sections[sectionIndex]) {
                const targetSection = document.getElementById(sections[sectionIndex]);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
}

function showQuickNavigation() {
    // Create quick navigation modal (placeholder)
    console.log('Quick navigation activated - Press 1-4 to navigate to sections');
}

function closeModals() {
    // Close any open modals (placeholder)
    console.log('Closing modals');
}

// Theme Management
function initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Add theme toggle functionality if needed
    // Currently only supports dark theme as per design
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Analytics and Performance
function initializeAnalytics() {
    // Track page view
    trackPageView();

    // Track user interactions
    initializeInteractionTracking();

    // Monitor performance
    initializePerformanceMonitoring();
}

function trackPageView() {
    // Placeholder for analytics tracking
    console.log('Page view tracked:', {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
}

function initializeInteractionTracking() {
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            trackInteraction('navigation', {
                destination: this.getAttribute('href'),
                text: this.textContent
            });
        });
    });

    // Track card interactions
    document.querySelectorAll('.case-card, .report-card').forEach(card => {
        card.addEventListener('click', function() {
            trackInteraction('card_click', {
                type: this.classList.contains('case-card') ? 'case' : 'report',
                title: this.querySelector('h3').textContent
            });
        });
    });

    // Track form interactions
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('focus', function() {
            trackInteraction('form_field_focus', {
                fieldName: this.name,
                fieldType: this.type || this.tagName.toLowerCase()
            });
        });
    });
}

function trackInteraction(eventType, data) {
    // Placeholder for analytics tracking
    console.log('Interaction tracked:', {
        type: eventType,
        data: data,
        timestamp: new Date().toISOString()
    });
}

function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const performanceData = {
                loadTime: performance.now(),
                domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
                resources: performance.getEntriesByType('resource').length
            };

            console.log('Performance metrics:', performanceData);
        }, 1000);
    });

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 50) { // Long task threshold
                    console.warn('Long task detected:', {
                        duration: entry.duration,
                        startTime: entry.startTime
                    });
                }
            });
        });

        observer.observe({ entryTypes: ['longtask'] });
    }
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error && e.error.stack
    });
});

// Service Worker Registration (for future PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export functions for external use if needed
window.DigitalFraudDetective = {
    navigateToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    showNotification: (message, type = 'info') => {
        updateFormStatus(message, type);
    },
    getSystemMetrics: () => {
        return {
            timestamp: new Date().toISOString(),
            uptime: performance.now()
        };
    }
};