// Terminal JavaScript - Loading animations and terminal effects

// Terminal Loader
class TerminalLoader {
    constructor() {
        this.loader = document.getElementById('terminal-loader');
        this.lines = this.loader ? this.loader.querySelectorAll('.terminal-line') : [];
        this.init();
    }

    init() {
        if (!this.loader) return;

        // Start terminal animation
        this.startTerminalAnimation();

        // Hide loader after animation completes
        setTimeout(() => {
            this.hideLoader();
        }, 4500);
    }

    startTerminalAnimation() {
        this.lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 1000);
        });
    }

    hideLoader() {
        if (this.loader) {
            this.loader.classList.add('hidden');

            // Remove from DOM after transition
            setTimeout(() => {
                if (this.loader.parentNode) {
                    this.loader.parentNode.removeChild(this.loader);
                }
            }, 500);
        }

        // Initialize main content animations
        this.initializeMainContent();
    }

    initializeMainContent() {
        // Add entrance animations to main sections
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('section-visible');
            }, index * 200);
        });

        // Start background animations
        this.startBackgroundEffects();
    }

    startBackgroundEffects() {
        // Initialize matrix rain effect
        this.createMatrixRain();

        // Start data stream animations
        this.startDataStreams();

        // Add glitch effects randomly
        this.startGlitchEffects();
    }

    createMatrixRain() {
        const body = document.body;
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-rain';
        body.appendChild(matrixContainer);

        // Create falling characters
        const columns = Math.floor(window.innerWidth / 20);
        for (let i = 0; i < columns; i++) {
            this.createMatrixColumn(matrixContainer, i);
        }
    }

    createMatrixColumn(container, index) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = index * 20 + 'px';
        column.style.top = '-100px';
        column.style.color = this.getRandomGreenColor();
        column.style.fontFamily = 'Share Tech Mono, monospace';
        column.style.fontSize = '14px';
        column.style.opacity = '0.7';
        column.style.pointerEvents = 'none';

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        let text = '';

        for (let i = 0; i < 20; i++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }

        column.innerHTML = text;
        container.appendChild(column);

        // Animate column
        this.animateMatrixColumn(column);
    }

    animateMatrixColumn(column) {
        const duration = 5000 + Math.random() * 10000;
        const delay = Math.random() * 5000;

        setTimeout(() => {
            column.style.transition = `transform ${duration}ms linear`;
            column.style.transform = `translateY(${window.innerHeight + 200}px)`;

            setTimeout(() => {
                // Reset and restart
                column.style.transition = 'none';
                column.style.transform = 'translateY(-100px)';
                column.style.color = this.getRandomGreenColor();

                // Regenerate characters
                const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
                let text = '';
                for (let i = 0; i < 20; i++) {
                    text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
                }
                column.innerHTML = text;

                this.animateMatrixColumn(column);
            }, duration);
        }, delay);
    }

    getRandomGreenColor() {
        const greens = ['#00ff00', '#00dd00', '#00bb00', '#00ff41', '#39ff14'];
        return greens[Math.floor(Math.random() * greens.length)];
    }

    startDataStreams() {
        const dataFeeds = document.querySelectorAll('.data-feed');

        dataFeeds.forEach(feed => {
            this.createDataStream(feed);
        });
    }

    createDataStream(container) {
        const items = [
            { label: 'SYSTEM SCAN', value: 'ACTIVE', highlight: true },
            { label: 'FIREWALL', value: 'SECURED', highlight: false },
            { label: 'DATABASE', value: 'ONLINE', highlight: false },
            { label: 'API STATUS', value: 'RESPONDING', highlight: true },
            { label: 'CACHE', value: 'PRIMED', highlight: false },
            { label: 'MONITORING', value: 'ACTIVE', highlight: true },
            { label: 'BACKUP', value: 'SCHEDULED', highlight: false },
            { label: 'SSL CERT', value: 'VALID', highlight: false }
        ];

        const feedContainer = document.createElement('div');
        feedContainer.className = 'data-feed-items';

        // Create initial items
        items.forEach(item => this.createDataItem(feedContainer, item));

        container.appendChild(feedContainer);

        // Update data feed periodically
        setInterval(() => {
            this.updateDataFeed(feedContainer, items);
        }, 3000);
    }

    createDataItem(container, data) {
        const item = document.createElement('div');
        item.className = 'data-item';

        const label = document.createElement('span');
        label.className = 'data-label';
        label.textContent = data.label;

        const value = document.createElement('span');
        value.className = `data-value ${data.highlight ? 'highlight' : ''}`;
        value.textContent = data.value;

        item.appendChild(label);
        item.appendChild(value);
        container.appendChild(item);
    }

    updateDataFeed(container, items) {
        const randomItem = items[Math.floor(Math.random() * items.length)];

        // Update random item value
        const values = ['ACTIVE', 'IDLE', 'SCANNING', 'UPDATING', 'SECURED', 'RESPONDING', 'ONLINE', 'OFFLINE'];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        randomItem.value = randomValue;
        randomItem.highlight = Math.random() > 0.7;

        // Refresh display
        container.innerHTML = '';
        items.forEach(item => this.createDataItem(container, item));
    }

    startGlitchEffects() {
        const glitchElements = document.querySelectorAll('.neon-text, .section-title');

        setInterval(() => {
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            this.addGlitchEffect(randomElement);
        }, 5000);
    }

    addGlitchEffect(element) {
        element.classList.add('glitch');
        element.setAttribute('data-text', element.textContent);

        setTimeout(() => {
            element.classList.remove('glitch');
            element.removeAttribute('data-text');
        }, 200);
    }

    // Typing effect for terminal text
    typeText(element, text, callback) {
        let index = 0;
        element.textContent = '';

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50 + Math.random() * 50);
            } else if (callback) {
                callback();
            }
        };

        type();
    }

    // Create custom terminal cursor
    createCursor(element) {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        cursor.textContent = '_';
        cursor.style.animation = 'cursorBlink 1s infinite';
        element.appendChild(cursor);
        return cursor;
    }
}

// Terminal Window Manager
class TerminalWindow {
    constructor(element) {
        this.element = element;
        this.header = element.querySelector('.terminal-header');
        this.body = element.querySelector('.terminal-body');
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;

        this.init();
    }

    init() {
        if (this.header) {
            this.header.addEventListener('mousedown', this.dragStart.bind(this));
            document.addEventListener('mousemove', this.drag.bind(this));
            document.addEventListener('mouseup', this.dragEnd.bind(this));
        }

        // Add terminal functionality
        this.addTerminalCommands();
    }

    dragStart(e) {
        if (e.target.classList.contains('terminal-button')) return;

        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;

        if (e.target === this.header || this.header.contains(e.target)) {
            this.isDragging = true;
        }
    }

    drag(e) {
        if (this.isDragging) {
            e.preventDefault();
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.element.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
        }
    }

    dragEnd(e) {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.isDragging = false;
    }

    addTerminalCommands() {
        if (!this.body) return;

        // Add command input
        const inputContainer = document.createElement('div');
        inputContainer.className = 'terminal-input-container';
        inputContainer.style.display = 'flex';
        inputContainer.style.alignItems = 'center';
        inputContainer.style.marginTop = '1rem';

        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = '>';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'terminal-input';
        input.style.background = 'transparent';
        input.style.border = 'none';
        input.style.color = 'var(--neon-light-gray)';
        input.style.fontFamily = 'Share Tech Mono, monospace';
        input.style.fontSize = '0.9rem';
        input.style.outline = 'none';
        input.style.flex = '1';

        inputContainer.appendChild(prompt);
        inputContainer.appendChild(input);
        this.body.appendChild(inputContainer);

        // Handle command input
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(input.value);
                input.value = '';
            }
        });

        input.focus();
    }

    executeCommand(command) {
        if (!command.trim()) return;

        // Add command to output
        const output = document.createElement('div');
        output.style.marginBottom = '0.5rem';
        output.innerHTML = `<span style="color: var(--neon-red);">></span> ${command}`;

        // Insert before input container
        const inputContainer = this.body.querySelector('.terminal-input-container');
        this.body.insertBefore(output, inputContainer);

        // Process command
        this.processCommand(command.trim().toLowerCase());
    }

    processCommand(command) {
        const output = document.createElement('div');
        output.style.marginBottom = '0.5rem';
        output.style.color = 'var(--text-secondary)';

        const commands = {
            'help': 'Available commands: help, clear, status, scan, about, exit',
            'clear': () => {
                const outputs = this.body.querySelectorAll('.terminal-output, div:not(.terminal-input-container)');
                outputs.forEach(el => el.remove());
            },
            'status': 'System Status: All systems operational',
            'scan': 'Initiating security scan... Scan complete. No threats detected.',
            'about': 'Digital Fraud Detective v1.0 - Portfolio Command Center',
            'exit': 'Goodbye, Agent.'
        };

        if (commands[command]) {
            if (typeof commands[command] === 'function') {
                commands[command]();
            } else {
                output.textContent = commands[command];
                this.body.insertBefore(output, this.body.querySelector('.terminal-input-container'));
            }
        } else {
            output.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
            output.style.color = 'var(--neon-red)';
            this.body.insertBefore(output, this.body.querySelector('.terminal-input-container'));
        }

        // Scroll to bottom
        this.body.scrollTop = this.body.scrollHeight;
    }
}

// Initialize terminal functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal loader
    window.terminalLoader = new TerminalLoader();

    // Initialize terminal windows
    const terminalWindows = document.querySelectorAll('.terminal-window');
    terminalWindows.forEach(window => {
        new TerminalWindow(window);
    });

    // Add terminal class to body for global styles
    document.body.classList.add('terminal-active');
});

// Export for external use
window.TerminalLoader = TerminalLoader;
window.TerminalWindow = TerminalWindow;