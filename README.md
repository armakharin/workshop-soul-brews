# Site Navigator

A simple HTML server that serves at the root and allows navigation between multiple static sites (glm1 and glm2).

## 🚀 Quick Start

### Option 1: Node.js Server (Recommended)
```bash
npm start
# or
node server.js
```

### Option 2: Python Server
```bash
npm run start:python
# or
python3 server.py
```

### Custom Ports
```bash
# Node.js on port 3000
npm run start:3000

# Python on port 8000
npm run start:8000
```

## 📁 Project Structure

```
workshop-soul-brews/
├── index.html          # Main navigation page
├── server.js           # Node.js server
├── server.py           # Python server
├── package.json        # Node.js configuration
├── glm1/               # First static site
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
└── glm2/               # Second static site
    ├── index.html
    ├── css/
    ├── js/
    └── assets/
```

## 🌐 Accessing Sites

Once the server is running, you can access:

- **Main Navigator**: `http://localhost:3000/` (or your chosen port)
- **Site I**: `http://localhost:3000/glm1/`
- **Site II**: `http://localhost:3000/glm2/`

## ✨ Features

- **Beautiful Navigation Interface**: Modern, responsive design with smooth animations
- **Keyboard Navigation**: Press `1` for Site I, `2` for Site II
- **Mobile Responsive**: Works on all device sizes
- **Fast Static Serving**: Efficient file serving with proper MIME types
- **No Cache Headers**: Always serves fresh content during development
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🛠️ Development

The server includes:
- Custom logging with timestamps
- Proper MIME type handling
- Error handling for missing files
- Graceful shutdown on Ctrl+C
- Port conflict detection and suggestions

## 📝 Notes

- Both glm1 and glm2 are complete static sites with their own CSS, JavaScript, and assets
- The main navigator provides an elegant way to choose between sites
- Server automatically handles all static file types
- No external dependencies required for basic functionality