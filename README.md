# Haolei QR Code Generator

A modern, offline-first QR code generator with live preview and multi-format downloads (PNG, SVG, PDF, JPG, WEBP). All processing happens locally in the browser.

## Features

- **Live preview** — QR code updates as you type
- **Custom size and colors** — choose foreground/background colors and size
- **Multi-format downloads** — PNG, SVG, PDF, JPG, WEBP
- **Privacy friendly** — no network calls, no tracking, no server processing
- **Multi-language support** — English, Mara, and Burmese with i18n
- **Dark / Light theme** — toggle between themes, preference is remembered
- **Cookie-based preferences** — size, colors, format, and theme are saved locally

## Works Offline — Powered by Service Worker Cache

Haolei QR Code Generator is built as a **Progressive Web App (PWA)** with full offline support. Once you visit the site for the first time, all essential files are automatically cached on your device using a Service Worker.

### How it works

When you first load the app, a Service Worker installs in the background and caches the HTML pages, stylesheets, scripts, translation files, and the app logo. After that initial visit, the entire application is available from your browser's cache — no internet connection required.

### What gets cached

- All pages: Generator, About, and Privacy
- Stylesheets and scripts for full functionality
- Translation files for all supported languages (English, Mara, Burmese)
- The app logo and icon

### Smart caching strategy

The app uses a **network-first** strategy for pages and a **cache-first** strategy for assets. This means you always get the latest version when online, but everything still works seamlessly when you lose connectivity. The cache updates automatically whenever a new version is deployed.

### Why this matters

Whether you are on an airplane, in a remote area with no signal, or simply want a fast experience without waiting for network requests, Haolei QR Code Generator is ready to use. No installation needed — just visit once and you are set.

## Open Source

MIT-licensed and easy to customize for your own workflows.

## Tech

- HTML, CSS, JavaScript
- QRCode.js
- jsPDF (PDF export)
- Service Worker (offline support)
- i18n system with JSON locale files

## Usage

Open `index.html` in any modern browser and start generating QR codes.

## License

MIT. See [LICENSE](LICENSE).

## Contact

Laitei — [laitei.dev](https://laitei.dev) — laitei@duck.com
