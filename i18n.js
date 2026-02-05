const I18N = (() => {
  const supported = ["en", "mrh", "my"];
  let current = "en";
  let dict = {};

  // Embedded fallbacks so language switching still works if fetch fails (e.g., offline or file://)
  const embedded = {
    en: {
      "app.title": "Haolei QR Code Generator",
      "app.subtitle": "No internet • No tracking • No API • 100% local",
      "label.text": "Text or URL",
      "placeholder.text": "Paste a link, text, or Wi‑Fi details",
      "label.size": "Size",
      "label.foreground": "Foreground",
      "label.background": "Background",
      "label.format": "Download format",
      "format.png": "PNG (default)",
      "format.svg": "SVG",
      "format.pdf": "PDF",
      "format.jpg": "JPG",
      "format.webp": "WEBP",
      "action.generate": "Generate QR",
      "action.download": "Download {format}",
      "preview.title": "Live Preview",
      "preview.subtitle": "Updates as you type",
      "preview.placeholder": "Your QR code will appear here",
      "status.ready": "Ready to generate",
      "status.addContent": "Add content to generate",
      "status.qrReady": "QR ready",
      "cookies.title": "Cookies & Preferences",
      "cookies.body": "We use cookies to remember your preferences and consent. You must accept to use the generator.",
      "cookies.item1": "Remember size and colors",
      "cookies.item2": "Remember download format",
      "cookies.item3": "Store consent choice",
      "cookies.accept": "Accept & Continue",
      "footer.cookies": "Cookies",
      "footer.privacy": "Privacy Policy",
      "footer.about": "About",
      "footer.copyright": "© 2026 Laitei. All rights reserved.",
      "privacy.title": "Privacy Policy",
      "privacy.effective": "Effective date: February 5, 2026",
      "privacy.overview.title": "Overview",
      "privacy.overview.body": "Haolei QR Code Generator is an offline-first tool. QR generation happens entirely in your browser. We do not send your data to any server.",
      "privacy.data.title": "Data We Process",
      "privacy.data.item1": "Input content: The text or URL you enter is processed locally to generate QR codes.",
      "privacy.data.item2": "Preferences: We store your size, color, and format preferences in cookies on your device.",
      "privacy.cookies.title": "Cookies",
      "privacy.cookies.body": "We use cookies strictly to remember your preferences and consent choice. These cookies do not track you across sites.",
      "privacy.third.title": "Third‑Party Libraries",
      "privacy.third.body": "This site uses QRCode.js and jsPDF, loaded from public CDNs. These libraries are required for QR rendering and PDF export.",
      "privacy.choice.title": "Your Choices",
      "privacy.choice.body": "You can delete cookies at any time via your browser settings. This will reset your saved preferences and consent.",
      "privacy.contact.title": "Contact",
      "privacy.back": "Back to generator",
      "about.title": "About Haolei QR Code Generator",
      "about.subtitle": "Offline-first QR generation with modern UX.",
      "about.what.title": "What it does",
      "about.what.body": "Create QR codes instantly in your browser. Everything runs locally, even when the internet is unavailable.",
      "about.why.title": "Why it matters",
      "about.why.body": "Your data stays on your device. No tracking, no server processing, just fast QR generation.",
      "about.open.title": "Open source",
      "about.open.body": "MIT-licensed and easy to customize for your own workflows.",
      "about.contact.title": "Contact",
      "about.back": "Back to generator",
      "language.label": "Language"
    }
  };

  function getSavedLang() {
    const match = document.cookie.match(/(^| )haolei_lang=([^;]+)/);
    return match ? decodeURIComponent(match[2]) : null;
  }

  function setLangCookie(lang) {
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `haolei_lang=${encodeURIComponent(lang)}; expires=${date.toUTCString()}; path=/`;
  }

  function resolveText(key, vars = {}) {
    let value = dict[key] || key;
    Object.keys(vars).forEach((k) => {
      value = value.replace(`{${k}}`, vars[k]);
    });
    return value;
  }

  async function load(lang) {
    const langToLoad = supported.includes(lang) ? lang : "en";
    try {
      const response = await fetch(`./locales/${langToLoad}.json`, { cache: "no-store" });
      dict = await response.json();
    } catch (err) {
      dict = embedded[langToLoad] || embedded.en || {};
    }
    current = langToLoad;
    setLangCookie(current);
    apply();
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const format = el.getAttribute("data-i18n-format");
      const value = resolveText(key, format ? { format } : undefined);
      if (el.hasAttribute("data-i18n-placeholder")) {
        el.setAttribute("placeholder", value);
      } else {
        el.textContent = value;
      }
    });

    const downloadBtn = document.getElementById("downloadBtn");
    const formatSelect = document.getElementById("format");
    if (downloadBtn && formatSelect) {
      const formatLabel = formatSelect.value.toUpperCase();
      downloadBtn.textContent = resolveText("action.download", { format: formatLabel });
    }
  }

  function init(defaultLang = "en") {
    const saved = getSavedLang();
    const lang = saved || defaultLang;
    return load(lang);
  }

  return { init, load, apply, t: resolveText };
})();
