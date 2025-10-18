#!/usr/bin/env node
/**
 * Simple HTTP server to serve the site navigator and static sites
 * Usage: node server.js [port]
 * Default port: 3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.argv[2] ? parseInt(process.argv[2]) : 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;

    // Normalize path
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Remove trailing slash for directory requests (except root)
    if (pathname !== '/' && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
    }

    // Prevent directory traversal
    if (pathname.includes('..')) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    // Create file path
    const filePath = path.join(__dirname, pathname);

    // Log request
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} -> ${filePath}`);

    // Check if path is a directory first
    fs.stat(filePath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, try adding index.html
                const indexPath = path.join(filePath, 'index.html');
                fs.readFile(indexPath, (indexErr, indexData) => {
                    if (indexErr) {
                        res.writeHead(404);
                        res.end('File not found');
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'text/html',
                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                            'Pragma': 'no-cache',
                            'Expires': '0'
                        });
                        res.end(indexData);
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end('Server error');
            }
            return;
        }

        // If it's a directory, serve index.html
        if (stats.isDirectory()) {
            const indexPath = path.join(filePath, 'index.html');
            fs.readFile(indexPath, (indexErr, indexData) => {
                if (indexErr) {
                    res.writeHead(404);
                    res.end('Directory found but no index.html');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    });
                    res.end(indexData);
                }
            });
            return;
        }

        // It's a file, serve it normally
        const ext = path.parse(filePath).ext;
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
                return;
            }

            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });

            res.end(data);
        });
    });
});

// Start server
server.listen(PORT, () => {
    console.log('🚀 Starting Site Navigator Server');
    console.log(`📁 Serving directory: ${__dirname}`);
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log('📱 Available sites:');
    console.log(`   • Root: http://localhost:${PORT}/ (Site Navigator)`);
    console.log(`   • Site I: http://localhost:${PORT}/glm1/`);
    console.log(`   • Site II: http://localhost:${PORT}/glm2/`);
    console.log('\n💡 Press Ctrl+C to stop the server');
    console.log('='.repeat(50));
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Server stopped by user');
    process.exit(0);
});

// Handle port already in use
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use. Try a different port:`);
        console.error(`   node server.js ${PORT + 1}`);
    } else {
        console.error(`\n❌ Error starting server: ${err}`);
    }
    process.exit(1);
});