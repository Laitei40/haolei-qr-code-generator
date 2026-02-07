let qr;
const textInput = document.getElementById("text");
const sizeSelect = document.getElementById("size");
const fgInput = document.getElementById("fg");
const bgInput = document.getElementById("bg");
const formatSelect = document.getElementById("format");
const qrDiv = document.getElementById("qr");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const statusText = document.getElementById("statusText");
const cookieOverlay = document.getElementById("cookieOverlay");
const acceptCookiesBtn = document.getElementById("acceptCookies");
const openCookiesLink = document.getElementById("openCookies");
const languageSelect = document.getElementById("language");
const themeToggle = document.getElementById("themeToggle");

function setStatus(message) {
  statusText.textContent = message;
}

function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function hasConsent() {
  return getCookie("haolei_consent") === "true" || localStorage.getItem("haolei_consent") === "true";
}

// Theme Management
function getPreferredTheme() {
  const cookieTheme = getCookie("haolei_theme");
  if (cookieTheme) return cookieTheme;
  const localTheme = localStorage.getItem("haolei_theme");
  if (localTheme) return localTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  setCookie("haolei_theme", theme);
  localStorage.setItem("haolei_theme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
}

// Initialize theme on page load
setTheme(getPreferredTheme());

function showConsent(force = false) {
  if (!force && hasConsent()) return;
  cookieOverlay.classList.add("active");
  cookieOverlay.setAttribute("aria-hidden", "false");
  toggleUI(false);
}

function hideConsent() {
  cookieOverlay.classList.remove("active");
  cookieOverlay.setAttribute("aria-hidden", "true");
  toggleUI(true);
}

function toggleUI(enabled) {
  textInput.disabled = !enabled;
  sizeSelect.disabled = !enabled;
  fgInput.disabled = !enabled;
  bgInput.disabled = !enabled;
  formatSelect.disabled = !enabled;
  generateBtn.disabled = !enabled;
  downloadBtn.disabled = !enabled || downloadBtn.disabled;
}

function savePreferences() {
  setCookie("haolei_size", sizeSelect.value);
  setCookie("haolei_fg", fgInput.value);
  setCookie("haolei_bg", bgInput.value);
  setCookie("haolei_format", formatSelect.value);
  setCookie("haolei_text", textInput.value);
  if (languageSelect) setCookie("haolei_lang", languageSelect.value);
}

function loadPreferences() {
  const size = getCookie("haolei_size");
  const fg = getCookie("haolei_fg");
  const bg = getCookie("haolei_bg");
  const format = getCookie("haolei_format");
  const text = getCookie("haolei_text");
  const lang = getCookie("haolei_lang");

  if (size) sizeSelect.value = size;
  if (fg) fgInput.value = fg;
  if (bg) bgInput.value = bg;
  if (format) formatSelect.value = format;
  if (text) textInput.value = text;
  if (languageSelect && lang) languageSelect.value = lang;

  if (window.I18N && typeof window.I18N.apply === "function") {
    window.I18N.apply();
  } else {
    const label = formatSelect.value.toUpperCase();
    downloadBtn.textContent = `Download ${label}`;
  }
}

function generateQR() {
  const text = textInput.value.trim();
  const size = Number(sizeSelect.value);
  const colorDark = fgInput.value;
  const colorLight = bgInput.value;
  const format = formatSelect.value;

  if (!text) {
    if (window.I18N && typeof window.I18N.t === "function") {
      qrDiv.textContent = window.I18N.t("preview.placeholder");
      setStatus(window.I18N.t("status.addContent"));
    } else {
      qrDiv.textContent = "Your QR code will appear here";
      setStatus("Add content to generate");
    }
    qrDiv.style.border = "1px dashed rgba(148, 163, 184, 0.6)";
    qrDiv.style.background = "rgba(148, 163, 184, 0.15)";
    downloadBtn.disabled = true;
    return;
  }

  qrDiv.innerHTML = "";
  qrDiv.style.border = "none";
  qrDiv.style.background = "transparent";

  qr = new QRCode(qrDiv, {
    text,
    width: size,
    height: size,
    colorDark,
    colorLight,
    correctLevel: QRCode.CorrectLevel.H
  });

  downloadBtn.disabled = false;
  if (window.I18N && typeof window.I18N.t === "function") {
    setStatus(window.I18N.t("status.qrReady"));
  } else {
    setStatus("QR ready");
  }
  downloadBtn.setAttribute("data-i18n-format", format.toUpperCase());
  savePreferences();
}

function getQRImageDataURL() {
  const img = document.querySelector("#qr img");
  if (img && img.src) return img.src;
  const canvas = document.querySelector("#qr canvas");
  if (canvas) return canvas.toDataURL("image/png");
  return null;
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function renderToCanvas(dataUrl, size, fillColor) {
  const image = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = fillColor;
  ctx.fillRect(0, 0, size, size);
  ctx.drawImage(image, 0, 0, size, size);
  return canvas;
}

async function downloadQR() {
  const dataUrl = getQRImageDataURL();
  if (!dataUrl) {
    alert("Generate a QR first!");
    return;
  }

  const format = formatSelect.value;
  const size = Number(sizeSelect.value);
  const filenameBase = "qr-code";

  if (format === "png") {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${filenameBase}.png`;
    link.click();
    return;
  }

  if (format === "svg") {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
      `<image href="${dataUrl}" width="${size}" height="${size}" />` +
      `</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    downloadBlob(blob, `${filenameBase}.svg`);
    return;
  }

  if (format === "pdf") {
    const canvas = await renderToCanvas(dataUrl, size, bgInput.value);
    const pngData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "px", format: [size, size] });
    pdf.addImage(pngData, "PNG", 0, 0, size, size);
    pdf.save(`${filenameBase}.pdf`);
    return;
  }

  if (format === "jpg") {
    const canvas = await renderToCanvas(dataUrl, size, bgInput.value);
    const jpgData = canvas.toDataURL("image/jpeg", 0.92);
    const link = document.createElement("a");
    link.href = jpgData;
    link.download = `${filenameBase}.jpg`;
    link.click();
    return;
  }

  if (format === "webp") {
    const canvas = await renderToCanvas(dataUrl, size, bgInput.value);
    const webpData = canvas.toDataURL("image/webp", 0.92);
    const link = document.createElement("a");
    link.href = webpData;
    link.download = `${filenameBase}.webp`;
    link.click();
  }
}

let debounceTimer;
function scheduleGenerate() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(generateQR, 300);
}

textInput.addEventListener("input", scheduleGenerate);
sizeSelect.addEventListener("change", generateQR);
fgInput.addEventListener("input", generateQR);
bgInput.addEventListener("input", generateQR);
generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);
formatSelect.addEventListener("change", () => {
  const format = formatSelect.value.toUpperCase();
  if (window.I18N && typeof window.I18N.t === "function") {
    downloadBtn.textContent = window.I18N.t("action.download", { format });
  } else {
    downloadBtn.textContent = `Download ${format}`;
  }
  savePreferences();
});

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    const lang = languageSelect.value;
    if (window.I18N) {
      window.I18N.load(lang).then(() => {
        if (textInput.value.trim()) generateQR();
        if (languageSelect) languageSelect.value = lang;
      });
    }
    savePreferences();
  });
}

acceptCookiesBtn.addEventListener("click", () => {
  setCookie("haolei_consent", "true");
  localStorage.setItem("haolei_consent", "true");
  hideConsent();
  loadPreferences();
  if (textInput.value.trim()) generateQR();
});

openCookiesLink.addEventListener("click", (event) => {
  event.preventDefault();
  showConsent(true);
});

themeToggle.addEventListener("click", toggleTheme);

if (window.I18N && typeof window.I18N.init === "function") {
  window.I18N.init("en").then(() => {
    // Sync language selector to saved language
    const savedLang = getCookie("haolei_lang");
    if (savedLang && languageSelect) languageSelect.value = savedLang;

    if (hasConsent()) {
      hideConsent();
      loadPreferences();
      if (textInput.value.trim()) generateQR();
    } else {
      showConsent();
    }
  });
} else {
  if (hasConsent()) {
    hideConsent();
    loadPreferences();
    if (textInput.value.trim()) generateQR();
  } else {
    showConsent();
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      setStatus("Offline cache not available");
    });
  });
}
