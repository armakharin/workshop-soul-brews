// Terminal Loading and Effects
document.addEventListener('DOMContentLoaded', function() {
    initializeTerminal();
    createMatrixRain();
    initializeTypingEffects();
});

// Terminal Loader
function initializeTerminal() {
    const terminalLoader = document.getElementById('terminal-loader');

    if (terminalLoader) {
        // Start the terminal sequence
        setTimeout(() => {
            hideTerminalLoader();
        }, 5000); // 5 seconds for the full terminal sequence
    }
}

function hideTerminalLoader() {
    const terminalLoader = document.getElementById('terminal-loader');

    if (terminalLoader) {
        terminalLoader.classList.add('hidden');

        // Remove the loader after fade out
        setTimeout(() => {
            terminalLoader.style.display = 'none';
            // Trigger power-on animation for main content
            document.body.classList.add('power-on');
        }, 1000);
    }
}

// Matrix Rain Effect
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);

    // Create multiple falling columns
    const numberOfColumns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < numberOfColumns; i++) {
        createMatrixColumn(matrixContainer, i);
    }
}

function createMatrixColumn(container, index) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = `${index * 20}px`;
    column.style.animationDuration = `${Math.random() * 3 + 2}s`;
    column.style.animationDelay = `${Math.random() * 2}s`;

    // Random characters
    const characters = '01';
    const numberOfChars = Math.floor(Math.random() * 15 + 10);

    for (let i = 0; i < numberOfChars; i++) {
        const char = document.createElement('div');
        char.textContent = characters[Math.floor(Math.random() * characters.length)];
        char.style.opacity = Math.random();
        column.appendChild(char);
    }

    container.appendChild(column);
}

// Typing Effects
function initializeTypingEffects() {
    // Typing effect for section titles when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTyping(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        observer.observe(title);
    });
}

function animateTyping(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    element.classList.add('cursor-blink');

    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
            element.textContent += text[charIndex];
            charIndex++;
        } else {
            clearInterval(typingInterval);
            setTimeout(() => {
                element.classList.remove('cursor-blink');
            }, 1000);
        }
    }, 50 + Math.random() * 50); // Randomized typing speed
}

// Console Log Effect
function createConsoleLog(message, level = 'info') {
    const consoleContainer = document.createElement('div');
    consoleContainer.className = 'console-log';

    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-level-${level}`;
    logEntry.innerHTML = `
        <span class="log-timestamp">[${timestamp}]</span>
        <span class="log-message">${message}</span>
    `;

    consoleContainer.appendChild(logEntry);

    return consoleContainer;
}

// Status Monitor Updates
function updateStatusMonitor(statusData) {
    const statusItems = document.querySelectorAll('.status-value');

    statusData.forEach((data, index) => {
        if (statusItems[index]) {
            // Animate the value change
            const currentValue = statusItems[index].textContent;
            if (currentValue !== data.value) {
                statusItems[index].style.color = '#ffff00';
                setTimeout(() => {
                    statusItems[index].textContent = data.value;
                    statusItems[index].style.color = data.color || '#ff0040';
                }, 300);
            }
        }
    });
}

// Alert System
function showAlert(title, message, type = 'info', duration = 5000) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-title">${title}</div>
        <div class="alert-message">${message}</div>
    `;

    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(alert, mainContent.firstChild);

        // Auto-remove after duration
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 500);
        }, duration);
    }
}

// Progress Bar Animation
function animateProgressBar(progressBar, targetPercentage) {
    const progressFill = progressBar.querySelector('.progress-fill');
    const progressPercentage = progressBar.querySelector('.progress-percentage');

    if (progressFill && progressPercentage) {
        // Animate the fill
        setTimeout(() => {
            progressFill.style.width = targetPercentage + '%';
        }, 100);

        // Animate the percentage counter
        let currentPercentage = 0;
        const increment = targetPercentage / 50; // Animate over 50 steps
        const incrementInterval = setInterval(() => {
            currentPercentage += increment;
            if (currentPercentage >= targetPercentage) {
                currentPercentage = targetPercentage;
                clearInterval(incrementInterval);
            }
            progressPercentage.textContent = Math.floor(currentPercentage) + '%';
        }, 20);
    }
}

// Terminal Command Simulation
function simulateTerminalCommand(command, output, error = false) {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;

    // Add command
    const commandLine = document.createElement('div');
    commandLine.innerHTML = `
        <span class="terminal-prompt">detective@command-center:~$</span>
        <span class="terminal-command">${command}</span>
    `;
    terminalBody.appendChild(commandLine);

    // Add output after a delay
    setTimeout(() => {
        const outputLine = document.createElement('div');
        outputLine.className = error ? 'terminal-error' : 'terminal-output';
        outputLine.textContent = output;
        terminalBody.appendChild(outputLine);

        // Auto-scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 500 + Math.random() * 1000);
}

// Hologram Effect
function addHologramEffect(element) {
    element.classList.add('hologram');

    // Add random flickering
    setInterval(() => {
        if (Math.random() > 0.95) {
            element.style.opacity = '0.8';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 100);
        }
    }, 3000);
}

// Scanline Effect
function addScanlineEffect(element) {
    element.classList.add('scanlines');

    // Create moving scanline
    const scanline = document.createElement('div');
    scanline.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 0, 64, 0.5), transparent);
        pointer-events: none;
        animation: scanline-move 4s linear infinite;
    `;

    element.style.position = 'relative';
    element.appendChild(scanline);
}

// Power On Sequence
function initiatePowerOnSequence() {
    const elements = document.querySelectorAll('.case-card, .report-card, .skill-category');

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// System Status Simulation
function simulateSystemStatus() {
    const statusIndicators = document.querySelectorAll('.status-indicator');

    setInterval(() => {
        statusIndicators.forEach(indicator => {
            // Random status changes
            if (Math.random() > 0.9) {
                const currentClass = indicator.className;

                // Brief warning state
                indicator.className = 'status-indicator warning';
                setTimeout(() => {
                    indicator.className = currentClass;
                }, 2000);
            }
        });
    }, 5000);
}

// Glitch Effect
function addGlitchEffect(element, intensity = 'low') {
    element.classList.add('glitch');
    element.setAttribute('data-text', element.textContent);

    // Random glitch triggers based on intensity
    const glitchInterval = intensity === 'high' ? 1000 : intensity === 'medium' ? 3000 : 5000;

    setInterval(() => {
        if (Math.random() > 0.7) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 100);
        }
    }, glitchInterval);
}

// Initialize all terminal effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize power on sequence after terminal loader
    setTimeout(() => {
        initiatePowerOnSequence();
        simulateSystemStatus();
    }, 6000);

    // Add hologram effects to key elements
    document.querySelectorAll('.agent-name, .section-title').forEach(element => {
        addHologramEffect(element);
    });

    // Add glitch effects to neon elements
    document.querySelectorAll('.neon-glow').forEach(element => {
        addGlitchEffect(element, 'low');
    });

    // Add scanline effects to data displays
    document.querySelectorAll('.status-panel, .data-stream').forEach(element => {
        addScanlineEffect(element);
    });
});