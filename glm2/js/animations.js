// Animations JavaScript - Neon glows and data stream effects

// Animation Controller
class AnimationController {
    constructor() {
        this.animations = [];
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (this.isReducedMotion) {
            console.log('Reduced motion detected, disabling some animations');
            return;
        }

        // Initialize all animation types
        this.initializeNeonEffects();
        this.initializeDataStreams();
        this.initializeFloatingElements();
        this.initializeParticleEffects();
        this.initializeProgressAnimations();

        // Start animation loop
        this.startAnimationLoop();
    }

    initializeNeonEffects() {
        // Enhanced neon glow animations
        const neonElements = document.querySelectorAll('.neon-text, .neon-border, .neon-button');

        neonElements.forEach(element => {
            this.createNeonPulse(element);
            this.createNeonFlicker(element);
        });

        // Add interactive neon effects
        this.addInteractiveNeonEffects();
    }

    createNeonPulse(element) {
        const pulse = {
            element: element,
            originalIntensity: this.getNeonIntensity(element),
            phase: Math.random() * Math.PI * 2,
            speed: 0.02 + Math.random() * 0.03,
            amplitude: 0.3 + Math.random() * 0.4
        };

        this.animations.push({
            type: 'neonPulse',
            data: pulse,
            update: this.updateNeonPulse.bind(this)
        });
    }

    createNeonFlicker(element) {
        const flicker = {
            element: element,
            nextFlicker: Date.now() + Math.random() * 5000,
            flickerDuration: 50 + Math.random() * 150,
            isActive: false
        };

        this.animations.push({
            type: 'neonFlicker',
            data: flicker,
            update: this.updateNeonFlicker.bind(this)
        });
    }

    updateNeonPulse(pulse, deltaTime) {
        pulse.phase += pulse.speed;
        const intensity = pulse.originalIntensity + Math.sin(pulse.phase) * pulse.amplitude;
        this.setNeonIntensity(pulse.element, Math.max(0.1, Math.min(1, intensity)));
    }

    updateNeonFlicker(flicker, deltaTime) {
        const now = Date.now();

        if (!flicker.isActive && now >= flicker.nextFlicker) {
            flicker.isActive = true;
            flicker.flickerStart = now;
            this.setNeonIntensity(flicker.element, 0.1);
        }

        if (flicker.isActive && now >= flicker.flickerStart + flicker.flickerDuration) {
            flicker.isActive = false;
            flicker.nextFlicker = now + Math.random() * 8000;
            this.setNeonIntensity(flicker.element, flicker.originalIntensity);
        }
    }

    getNeonIntensity(element) {
        const computedStyle = window.getComputedStyle(element);
        const opacity = parseFloat(computedStyle.opacity);
        return opacity;
    }

    setNeonIntensity(element, intensity) {
        element.style.opacity = intensity;
    }

    addInteractiveNeonEffects() {
        const interactiveElements = document.querySelectorAll('.hover-neon, .hover-neon-red');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.createNeonBurst(element);
            });

            element.addEventListener('mouseleave', () => {
                this.removeNeonBurst(element);
            });
        });
    }

    createNeonBurst(element) {
        const burst = document.createElement('div');
        burst.className = 'neon-burst';
        burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 0, 64, 0.3) 0%, transparent 70%);
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
            z-index: -1;
            animation: neonBurst 0.6s ease-out forwards;
        `;

        element.style.position = 'relative';
        element.appendChild(burst);

        // Add animation keyframe if not exists
        if (!document.querySelector('#neon-burst-animation')) {
            const style = document.createElement('style');
            style.id = 'neon-burst-animation';
            style.textContent = `
                @keyframes neonBurst {
                    to {
                        transform: translate(-50%, -50%) scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    removeNeonBurst(element) {
        const burst = element.querySelector('.neon-burst');
        if (burst) {
            burst.remove();
        }
    }

    initializeDataStreams() {
        // Create flowing data stream effects
        const dataContainers = document.querySelectorAll('.data-stream, .scanlines');

        dataContainers.forEach(container => {
            this.createDataStream(container);
        });

        // Add background data particles
        this.createDataParticles();
    }

    createDataStream(container) {
        const stream = {
            container: container,
            particles: [],
            nextParticle: Date.now(),
            particleInterval: 200 + Math.random() * 800,
            maxParticles: 15
        };

        this.animations.push({
            type: 'dataStream',
            data: stream,
            update: this.updateDataStream.bind(this)
        });
    }

    updateDataStream(stream, deltaTime) {
        const now = Date.now();

        // Add new particles
        if (now >= stream.nextParticle && stream.particles.length < stream.maxParticles) {
            stream.particles.push(this.createDataParticle(stream.container));
            stream.nextParticle = now + stream.particleInterval;
        }

        // Update existing particles
        stream.particles = stream.particles.filter(particle => {
            return this.updateDataParticle(particle, deltaTime);
        });
    }

    createDataParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 20px;
            background: linear-gradient(180deg, transparent, var(--neon-red), transparent);
            left: ${Math.random() * 100}%;
            top: -20px;
            opacity: 0.7;
            pointer-events: none;
        `;

        container.style.position = 'relative';
        container.appendChild(particle);

        return {
            element: particle,
            speed: 50 + Math.random() * 100,
            acceleration: 1 + Math.random() * 2,
            opacity: 0.7,
            wiggle: Math.random() * Math.PI * 2
        };
    }

    updateDataParticle(particle, deltaTime) {
        const speed = particle.speed * (deltaTime / 16);
        particle.element.style.top = `${parseFloat(particle.element.style.top) + speed}px`;

        // Add wiggle effect
        particle.wiggle += 0.1;
        const wiggleAmount = Math.sin(particle.wiggle) * 2;
        particle.element.style.transform = `translateX(${wiggleAmount}px)`;

        // Remove if out of bounds
        if (parseFloat(particle.element.style.top) > window.innerHeight) {
            particle.element.remove();
            return false;
        }

        return true;
    }

    createDataParticles() {
        // Create floating background particles
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;

        document.body.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 30; i++) {
            this.createFloatingParticle(particleContainer);
        }
    }

    createFloatingParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            background: var(--neon-light-gray);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.1 + Math.random() * 0.3};
        `;

        container.appendChild(particle);

        const floatData = {
            element: particle,
            x: parseFloat(particle.style.left),
            y: parseFloat(particle.style.top),
            vx: (Math.random() - 0.5) * 0.1,
            vy: -Math.random() * 0.2 - 0.1,
            size: 1,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03
        };

        this.animations.push({
            type: 'floatingParticle',
            data: floatData,
            update: this.updateFloatingParticle.bind(this)
        });
    }

    updateFloatingParticle(particle, deltaTime) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = 100;
        if (particle.x > 100) particle.x = 0;
        if (particle.y < 0) particle.y = 100;

        // Update pulse
        particle.pulsePhase += particle.pulseSpeed;
        const pulseFactor = 0.5 + Math.sin(particle.pulsePhase) * 0.5;
        const opacity = 0.1 + pulseFactor * 0.2;

        // Apply styles
        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
        particle.element.style.opacity = opacity;
    }

    initializeFloatingElements() {
        // Add subtle floating animation to cards and other elements
        const floatElements = document.querySelectorAll('.case-card, .report-card, .profile-card');

        floatElements.forEach(element => {
            this.addFloatingAnimation(element);
        });
    }

    addFloatingAnimation(element) {
        const float = {
            element: element,
            baseY: 0,
            phase: Math.random() * Math.PI * 2,
            amplitude: 3 + Math.random() * 5,
            speed: 0.01 + Math.random() * 0.02
        };

        this.animations.push({
            type: 'floating',
            data: float,
            update: this.updateFloatingAnimation.bind(this)
        });
    }

    updateFloatingAnimation(float, deltaTime) {
        float.phase += float.speed;
        const y = Math.sin(float.phase) * float.amplitude;
        float.element.style.transform = `translateY(${y}px)`;
    }

    initializeParticleEffects() {
        // Add particle effects on user interactions
        document.addEventListener('click', (e) => {
            this.createClickParticles(e.clientX, e.clientY);
        });

        // Add hover particles
        const hoverElements = document.querySelectorAll('.neon-button, .submit-btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createHoverParticles(e.target);
            });
        });
    }

    createClickParticles(x, y) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--neon-red);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 6px var(--neon-red);
            `;

            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 8;
            const velocity = 100 + Math.random() * 100;
            const lifetime = 1000 + Math.random() * 500;

            this.animateParticle(particle, angle, velocity, lifetime);
        }
    }

    createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 2px;
                    height: 2px;
                    background: var(--neon-white);
                    border-radius: 50%;
                    left: ${centerX + (Math.random() - 0.5) * rect.width}px;
                    top: ${centerY + (Math.random() - 0.5) * rect.height}px;
                    pointer-events: none;
                    z-index: 1000;
                    box-shadow: 0 0 4px var(--neon-white);
                `;

                document.body.appendChild(particle);

                const angle = Math.random() * Math.PI * 2;
                const velocity = 50 + Math.random() * 50;
                const lifetime = 800 + Math.random() * 400;

                this.animateParticle(particle, angle, velocity, lifetime);
            }, i * 100);
        }
    }

    animateParticle(particle, angle, velocity, lifetime) {
        const startTime = Date.now();
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / lifetime;

            if (progress >= 1) {
                particle.remove();
                return;
            }

            const x = startX + vx * progress;
            const y = startY + vy * progress + (progress * progress * 100); // gravity
            const opacity = 1 - progress;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = opacity;

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    initializeProgressAnimations() {
        // Animate progress bars and counters
        const progressBars = document.querySelectorAll('.skill-fill');
        const counters = document.querySelectorAll('.metric-value');

        progressBars.forEach(bar => {
            this.animateProgressBar(bar);
        });

        counters.forEach(counter => {
            this.animateCounter(counter);
        });
    }

    animateProgressBar(bar) {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.transition = 'width 2s ease-out';
            bar.style.width = targetWidth;
        }, 100);
    }

    animateCounter(counter) {
        const text = counter.textContent;
        const isNumeric = /^\d+/.test(text);

        if (!isNumeric) return;

        const targetValue = parseInt(text);
        const suffix = text.replace(/^\d+/, '');
        let currentValue = 0;
        const increment = targetValue / 50;

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }

            counter.textContent = Math.floor(currentValue) + suffix;
        }, 30);
    }

    startAnimationLoop() {
        let lastTime = 0;

        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Update all animations
            this.animations.forEach(animation => {
                if (animation.update) {
                    animation.update(animation.data, deltaTime);
                }
            });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    // Performance monitoring
    getAnimationCount() {
        return this.animations.length;
    }

    optimizeAnimations() {
        // Remove animations for off-screen elements
        this.animations = this.animations.filter(animation => {
            if (animation.data && animation.data.element) {
                const rect = animation.data.element.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom > 0;
            }
            return true;
        });
    }
}

// Performance optimization with Intersection Observer
class AnimationOptimizer {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                { threshold: 0.1 }
            );

            this.observeElements();
        }
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('.case-card, .report-card, .profile-card, .skill-bar');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                // Optional: remove animation when out of view
                // entry.target.classList.remove('animate-in');
            }
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
    window.animationOptimizer = new AnimationOptimizer();

    // Add performance monitoring
    setInterval(() => {
        if (window.animationController) {
            window.animationController.optimizeAnimations();
        }
    }, 5000);
});

// Export for external use
window.AnimationController = AnimationController;
window.AnimationOptimizer = AnimationOptimizer;