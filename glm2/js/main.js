// Main JavaScript - Core interactions and navigation

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll event listener for navigation
let ticking = false;
function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateActiveNav);
        ticking = true;
        setTimeout(() => {
            ticking = false;
        }, 100);
    }
}

window.addEventListener('scroll', requestTick);

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const formData = new FormData(contactForm);

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Simulate form submission (replace with actual endpoint)
        try {
            await simulateFormSubmission(formData);

            // Show success message
            formStatus.textContent = 'MESSAGE TRANSMITTED SUCCESSFULLY. AWAITING RESPONSE.';
            formStatus.className = 'form-status success';
            contactForm.reset();

            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);

        } catch (error) {
            // Show error message
            formStatus.textContent = 'TRANSMISSION FAILED. PLEASE TRY AGAIN.';
            formStatus.className = 'form-status error';
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Simulate form submission (replace with actual implementation)
async function simulateFormSubmission(formData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get form data
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Validate required fields
    if (!name || !email || !subject || !message) {
        throw new Error('All fields are required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email address');
    }

    // Simulate successful submission
    console.log('Form data submitted:', { name, email, subject, message });

    return { success: true };
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe cards and sections
    const cards = document.querySelectorAll('.case-card, .report-card, .profile-card');
    cards.forEach(card => observer.observe(card));

    // Add hover effects to interactive elements
    addInteractiveEffects();

    // Initialize animations
    initializeAnimations();
});

// Add interactive effects to elements
function addInteractiveEffects() {
    // Add hover effect to cards
    const cards = document.querySelectorAll('.case-card, .report-card, .profile-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.submit-btn, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Add loading animation to skill bars
    const skillBars = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Add typewriter effect to section titles
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';

        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                title.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && title.textContent === '') {
                    typeWriter();
                }
            });
        }, { threshold: 0.5 });

        titleObserver.observe(title);
    });
}

// Parallax effect for background elements
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.data-stream, .matrix-rain');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Throttled scroll event for parallax
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        parallaxEffect();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close any open modals or overlays
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Press '/' to focus search (if implemented)
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const searchInput = document.querySelector('#search');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
});

// Performance optimization - Debounce function
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

// Debounced resize handler
const debouncedResize = debounce(() => {
    // Recalculate any size-dependent elements
    updateActiveNav();
}, 250);

window.addEventListener('resize', debouncedResize);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Optionally send error reports to monitoring service
});

// Export for external use if needed
window.DigitalFraudDetective = {
    updateActiveNav,
    simulateFormSubmission,
    addInteractiveEffects,
    initializeAnimations
};