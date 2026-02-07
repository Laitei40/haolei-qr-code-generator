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
      "nav.generator": "Generator",
      "nav.about": "About",
      "nav.privacy": "Privacy",
      "nav.language": "Language",
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
      "cookies.item3": "Remember theme preference",
      "cookies.item4": "Store consent choice",
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
      "privacy.data.item2": "Preferences: We store your size, color, format, and theme preferences in cookies on your device.",
      "privacy.cookies.title": "Cookies",
      "privacy.cookies.body": "We use cookies strictly to remember your preferences and consent choice. These cookies do not track you across sites.",
      "privacy.third.title": "Third‑Party Libraries",
      "privacy.third.body": "This site uses QRCode.js and jsPDF, loaded from public CDNs. These libraries are required for QR rendering and PDF export.",
      "privacy.choice.title": "Your Choices",
      "privacy.choice.body": "You can delete cookies at any time via your browser settings. This will reset your saved preferences and consent.",
      "privacy.contact.title": "Contact",
      "about.title": "About Haolei QR Code Generator",
      "about.subtitle": "Offline-first QR generation with modern UX.",
      "about.what.title": "What it does",
      "about.what.body": "Create QR codes instantly in your browser. Everything runs locally, even when the internet is unavailable.",
      "about.offline.title": "Works Offline — Powered by Service Worker Cache",
      "about.offline.intro": "Haolei QR Code Generator is built as a Progressive Web App (PWA) with full offline support. Once you visit the site for the first time, all essential files are automatically cached on your device using a Service Worker.",
      "about.offline.how.title": "How it works",
      "about.offline.how.body": "When you first load the app, a Service Worker installs in the background and caches the HTML pages, stylesheets, scripts, translation files, and the app logo. After that initial visit, the entire application is available from your browser's cache — no internet connection required.",
      "about.offline.what.title": "What gets cached",
      "about.offline.item1": "All pages: Generator, About, and Privacy",
      "about.offline.item2": "Stylesheets and scripts for full functionality",
      "about.offline.item3": "Translation files for all supported languages (English, Mara, Burmese)",
      "about.offline.item4": "The app logo and icon",
      "about.offline.strategy.title": "Smart caching strategy",
      "about.offline.strategy.body": "The app uses a network-first strategy for pages and a cache-first strategy for assets. This means you always get the latest version when online, but everything still works seamlessly when you lose connectivity. The cache updates automatically whenever a new version is deployed.",
      "about.offline.benefit.title": "Why this matters",
      "about.offline.benefit.body": "Whether you are on an airplane, in a remote area with no signal, or simply want a fast experience without waiting for network requests, Haolei QR Code Generator is ready to use. No installation needed — just visit once and you are set.",
      "about.why.title": "Why it matters",
      "about.why.body": "Your data stays on your device. No tracking, no server processing, just fast QR generation.",
      "about.open.title": "Open source",
      "about.open.body": "MIT-licensed and easy to customize for your own workflows.",
      "about.contact.title": "Contact",
      "language.label": "Language",
      "langpick.title": "Choose Your Language",
      "langpick.body": "Select your preferred language to continue.",
      "langpick.confirm": "Continue"
    },
    my: {
      "app.title": "Haolei QR ကုဒ် ဖန်တီးရာ",
      "app.subtitle": "အင်တာနက် မလို • Upload မလုပ် • API မသုံး • အပြည့်အဝ Local ဖြစ်သည်",
      "label.text": "စာသား သို့မဟုတ် URL",
      "placeholder.text": "လင့်ခ်၊ စာသား သို့မဟုတ် Wi‑Fi အချက်အလက် ထည့်ပါ",
      "label.size": "အရွယ်အစား",
      "label.foreground": "QR အရောင်",
      "label.background": "နောက်ခံအရောင်",
      "label.format": "ဒေါင်းလုပ် ဖော်မတ်",
      "nav.generator": "QR ဖန်တီးရန်",
      "nav.about": "အကြောင်းအရာ",
      "nav.privacy": "ကိုယ်ရေးမူဝါဒ",
      "nav.language": "ဘာသာစကား",
      "format.png": "PNG (ပုံမှန်)",
      "format.svg": "SVG",
      "format.pdf": "PDF",
      "format.jpg": "JPG",
      "format.webp": "WEBP",
      "action.generate": "QR ကုဒ် ဖန်တီးမယ်",
      "action.download": "{format} ဒေါင်းလုပ်ရယူမယ်",
      "preview.title": "လက်တွေ့ မြင်ကွင်း",
      "preview.subtitle": "ရိုက်ထည့်လိုက်တာနဲ့ အလိုအလျောက် ပြောင်းလဲပေးပါမယ်",
      "preview.placeholder": "သင့် QR ကုဒ် ဒီနေရာမှာ ပေါ်လာပါမယ်",
      "status.ready": "ဖန်တီးရန် အဆင်သင့်",
      "status.addContent": "ဖန်တီးရန် စာသား သို့မဟုတ် လင့်ခ် ထည့်ပါ",
      "status.qrReady": "QR ကုဒ် ရပါပြီ",
      "cookies.title": "Cookies နှင့် စိတ်ကြိုက်ရွေးချယ်မှုများ",
      "cookies.body": "သင်၏ theme နဲ့ setting များကို မှတ်သားထားရန် cookies အသုံးပြုထားပါတယ်။ ဆက်လက်အသုံးပြုလိုပါက လက်ခံပေးပါ။",
      "cookies.item1": "အရွယ်အစားနှင့် အရောင်များကို မှတ်သားရန်",
      "cookies.item2": "ဒေါင်းလုပ် ဖော်မတ်ကို မှတ်သားရန်",
      "cookies.item3": "Theme အပြင်အဆင်ကို မှတ်သားရန်",
      "cookies.item4": "လက်ခံချက်ကို မှတ်သားရန်",
      "cookies.accept": "လက်ခံပြီး ဆက်လက်လုပ်ဆောင်မယ်",
      "footer.cookies": "Cookies",
      "footer.privacy": "ကိုယ်ရေးကိုယ်တာ မူဝါဒ",
      "footer.about": "အကြောင်းအရာ",
      "footer.copyright": "© 2026 Laitei. မူပိုင်ခွင့် ရယူထားသည်။",
      "privacy.title": "ကိုယ်ရေးကိုယ်တာ မူဝါဒ",
      "privacy.effective": "စတင်အသက်ဝင်သည့်ရက်: ၂၀၂၆ ဖေဖော်ဝါရီ ၅",
      "privacy.overview.title": "အကျဉ်းချုပ်",
      "privacy.overview.body": "Haolei QR ကုဒ် ဖန်တီးရာသည် Offline-first (အင်တာနက်မလိုဘဲ ဦးစားပေးလုပ်ဆောင်သော) tool တစ်ခုဖြစ်ပါတယ်။ QR ကုဒ် ဖန်တီးခြင်းကို သင့် browser ထဲမှာပဲ လုပ်ဆောင်ပေးတာဖြစ်ပြီး သင့် data တွေကို server ဆီ ပို့ဆောင်ခြင်း မရှိပါဘူး။",
      "privacy.data.title": "ကျွန်ုပ်တို့ ရယူသော Data များ",
      "privacy.data.item1": "အကြောင်းအရာ: သင်ထည့်လိုက်သော စာသား သို့မဟုတ် URL ကို သင့်စက်ထဲမှာပဲ QR အဖြစ် ပြောင်းလဲပေးပါတယ်။",
      "privacy.data.item2": "စိတ်ကြိုက်ရွေးချယ်မှုများ: အရွယ်အစား၊ အရောင်၊ ဖော်မတ် နှင့် theme များကို သင့်စက်ရဲ့ Cookie ထဲမှာပဲ သိမ်းဆည်းပါတယ်။",
      "privacy.cookies.title": "Cookies",
      "privacy.cookies.body": "Cookies တွေကို သင့်ရွေးချယ်မှုများ (Preferences) မှတ်သားဖို့အတွက်သာ သုံးထားပြီး ခြေရာခံခြင်း (Tracking) မပြုလုပ်ပါ။",
      "privacy.third.title": "ပြင်ပ Libraries များ",
      "privacy.third.body": "ဒီ site မှာ QRCode.js နဲ့ jsPDF ကို အများသုံး CDN များမှတဆင့် ရယူအသုံးပြုထားပါတယ်။",
      "privacy.choice.title": "သင့်ရွေးချယ်ခွင့်",
      "privacy.choice.body": "Browser setting မှတဆင့် cookies များကို ဖျက်နိုင်ပါတယ်။ ဖျက်လိုက်ပါက မှတ်သားထားသော setting များကို ပြန်စရပါမယ်။",
      "privacy.contact.title": "ဆက်သွယ်ရန်",
      "about.title": "Haolei QR ကုဒ် ဖန်တီးရာ အကြောင်း",
      "about.subtitle": "Offline-first QR ကုဒ် ဖန်တီးမှု နှင့် ခေတ်မီ UX",
      "about.what.title": "ဘာလုပ်ပေးနိုင်လဲ",
      "about.what.body": "Browser ထဲမှာတင် ချက်ချင်း QR ကုဒ် ထုတ်ပေးနိုင်ပါတယ်။ အင်တာနက် မရှိချိန်မှာလည်း အသုံးပြုလို့ ရပါတယ်။",
      "about.offline.title": "Offline မှာ အလုပ်လုပ်ပုံ — Service Worker Cache",
      "about.offline.intro": "Haolei QR Code Generator ကို Progressive Web App (PWA) တစ်ခုအနေနဲ့ တည်ဆောက်ထားပါတယ်။ ဆိုက်ကို စဝင်လိုက်တာနဲ့ service worker က လိုအပ်တဲ့ ဖိုင်တွေအားလုံးကို သင့်စက်ထဲမှာ အလိုအလျောက် သိမ်းဆည်းထားလိုက်ပါတယ်။",
      "about.offline.how.title": "ဘယ်လို အလုပ်လုပ်လဲ",
      "about.offline.how.body": "Service Worker က နောက်ကွယ်မှာ HTML ၊ stylesheets၊ scripts၊ ဘာသာပြန်ဖိုင်တွေနဲ့ logo တွေကို သိမ်းဆည်း (Cache) ပေးထားပါတယ်။ ဒါကြောင့် နောက်တစ်ခါ ဝင်တဲ့အခါ အင်တာနက် မရှိရင်တောင် အက်ပ်တစ်ခုလုံးကို ချက်ချင်း သုံးလို့ရနေမှာ ဖြစ်ပါတယ်။",
      "about.offline.what.title": "ဘာတွေ သိမ်းဆည်းထားလဲ",
      "about.offline.item1": "စာမျက်နှာများ: Generator၊ About နှင့် Privacy",
      "about.offline.item2": "Stylesheets နှင့် script ဖိုင်များ",
      "about.offline.item3": "ဘာသာပြန်ဖိုင်များ (English, Mara, မြန်မာ)",
      "about.offline.item4": "အက်ပ် Logo နှင့် icon များ",
      "about.offline.strategy.title": "Smart Caching စနစ်",
      "about.offline.strategy.body": "စာမျက်နှာတွေအတွက် Network-first နဲ့ Assets တွေအတွက် Cache-first စနစ်ကို သုံးထားပါတယ်။ အွန်လိုင်းဖြစ်နေရင် version အသစ်ကို ရယူပြီး၊ အင်တာနက်လိုင်း ကျသွားရင်လည်း အဆင်ပြေပြေ ဆက်သုံးလို့ ရပါမယ်။ Update အသစ်ရှိရင် Cache ကို အလိုအလျောက် မွမ်းမံပေးပါတယ်။",
      "about.offline.benefit.title": "ဘာကြောင့် ကောင်းတာလဲ",
      "about.offline.benefit.body": "လေယာဉ်ပေါ်မှာပဲဖြစ်ဖြစ်၊ လိုင်းမကောင်းတဲ့ နေရာမှာပဲဖြစ်ဖြစ်၊ loading စောင့်စရာမလိုဘဲ မြန်မြန်ဆန်ဆန် သုံးချင်ရင် Haolei QR Code Generator က အသင့်ရှိနေမှာပါ။ Install လုပ်စရာမလိုဘဲ တစ်ကြိမ်ဝင်ထားရုံနဲ့ အဆင်ပြေပါတယ်။",
      "about.why.title": "ဘာကြောင့် သုံးသင့်လဲ",
      "about.why.body": "သင့် Data တွေက သင့်စက်ထဲမှာပဲ ရှိနေပြီး ဘယ်သူမှ ခြေရာခံမကြည့်နိုင်လို့ပါ။",
      "about.open.title": "Open Source",
      "about.open.body": "MIT License နဲ့ Open Source ပေးထားလို့ လိုအပ်သလို လွတ်လပ်စွာ ပြင်ဆင်အသုံးပြုနိုင်ပါတယ်။",
      "about.contact.title": "ဆက်သွယ်ရန်",
      "language.label": "ဘာသာစကား",
      "langpick.title": "ဘာသာစကား ရွေးချယ်ပါ",
      "langpick.body": "ဆက်လက်လုပ်ဆောင်ရန် သင့်ဘာသာစကားကို ရွေးချယ်ပါ။",
      "langpick.confirm": "ဆက်လက်လုပ်ဆောင်မယ်"
    },
    mrh: {
      "app.title": "Haolei QR Code Taona",
      "app.subtitle": "Internet Leipa • Pazi Leipa • API Leipa • 100% local",
      "label.text": "Text a URL",
      "placeholder.text": "Link, text, ema Wi‑Fi hluhpêk",
      "label.size": "Laichyhzie",
      "label.foreground": "Front color",
      "label.background": "Background color",
      "label.format": "Adaona pho",
      "nav.generator": "Taona",
      "nav.about": "Thâtih",
      "nav.privacy": "Pôhkha kyh",
      "nav.language": "Reih",
      "format.png": "PNG (ypâpa)",
      "format.svg": "SVG",
      "format.pdf": "PDF",
      "format.jpg": "JPG",
      "format.webp": "WEBP",
      "action.generate": "QR Generate",
      "action.download": "Adaona {format}",
      "preview.title": "Live Mochhilina",
      "preview.subtitle": "Nawh a hna hrawh tawh",
      "preview.placeholder": "Nang QR a he a awm",
      "status.ready": "Generate theih",
      "status.addContent": "Generate awm piak",
      "status.qrReady": "QR amâ chiehpa",
      "cookies.title": "Cookies & Khotlynazy",
      "cookies.body": "Preferences leh consent hna cangpiak a, cookies kan hman. Generator hman thei a, accept a ngai.",
      "cookies.item1": "Size leh color hna hrua",
      "cookies.item2": "Download format hrua",
      "cookies.item3": "Hmiarôh atlyna â vao",
      "cookies.item4": "Apyna atlypa kha a paso",
      "cookies.accept": "Apyh & Hmiatôh",
      "footer.cookies": "Cookies",
      "footer.privacy": "Pôhkha Pawlisi",
      "footer.about": "Thâtih",
      "footer.copyright": "© 2026 Laitei. Biehneina zydua a pyhpa.",
      "privacy.title": "Pôhkha Pawlisi",
      "privacy.effective": "Apyna târi: Hmypi 5, 2026",
      "privacy.overview.title": "Achyu pachhohpa",
      "privacy.overview.body": "Haolei QR Code Generator hi offline-first tool a ni. QR hna hi browser ah a hman. Data hna server ah kan hman lo.",
      "privacy.data.title": "Data kan hman",
      "privacy.data.item1": "Input content: Nang text ema URL hluh hi local ah QR a siam.",
      "privacy.data.item2": "Kotlynazy: Nâ tlypa laichyhzie, rôh, pho, nata rôh khotlynazy kha na chhaichhi chhôh liata eima so.",
      "privacy.cookies.title": "Cookies",
      "privacy.cookies.body": "Preferences leh consent a hrua nak a, cookies kan hman. Tracking hna kan hman lo.",
      "privacy.third.title": "Py-Thôh Châbusonazy",
      "privacy.third.body": "He site he khâh chiehpa public CNDzy tawhta QRCode.js nata jsPDF zy a hmâh. He châbupasonazy he QR taona nata PDF papuana liata abyuhpazy a châ.",
      "privacy.choice.title": "Nâ Tlypazy",
      "privacy.choice.body": "Cookies cha na browser paraihna liata na khona daihti maih liata na thy thei. He heta nâ tlypypa nata na khotlyna pachôpazy a soh pathi khai aw.",
      "privacy.contact.title": "Azaona",
      "about.title": "Haolei QR Code Taona Kyh",
      "about.subtitle": "Offline-hmiapasahpa UX chhâphapa QR taona.",
      "about.what.title": "A taohriapazy",
      "about.what.body": "QR code-zy browser liata thlai a tao. Ato zydua na chhaichhi liata rai a hria, internet a y lei no chhao ta.",
      "about.offline.title": "Offline ta Raihriapa — Service Worker Cache ta hmahlapa",
      "about.offline.intro": "Haolei QR Code Taona he Progressive Web App (PWA) ta taopa châ ta, offline lia tlokhuh ta rai a hria. Website he na charei tua chai no ta, abyuhpa faihzy cha anotata na chhaichhi liata Chakaona Raihriapa hmâpa ta a paso.",
      "about.offline.how.title": "Rai a hria dâh",
      "about.offline.how.body": "App na khâ tua chai nota, Chakaona Raihriapa cha HTML hmiazy, stylesheet-zy, script-zy, reihpaliepa faihzy, nata app logo zy kha a chhôh liata a patyh. Cha khai tawhta application cha na browser cache liata tlokhuh ta â hmo haw — internet azaona cha a byuh khao vei.",
      "about.offline.what.title": "Cache-pazy",
      "about.offline.item1": "Hmia zydua: Taona, Thâtih, nata Pôhkha kyh",
      "about.offline.item2": "Raihriana tlokhuh châta tylesheet-zy nata scriptzy",
      "about.offline.item3": "A hmôpa reih zydua (English, Mara, မြန်မာ) châta reihpaliepa faihzy",
      "about.offline.item4": "App logo nata icon",
      "about.offline.strategy.title": "Cache taona pha kawpa",
      "about.offline.strategy.body": "He app he a tlôhpazy cache tao nawpa ta hmia zydua châta internet kha a hmâ tua. A yzie cha online nâ pazao heih tita version hnôh chaipa kha na to parei aw, cha chhaota internet na hnei vei no a pha kawpa ta rai a hria thei pyly. Cache ta version thiepa a pua tita a pathieh lymâ.",
      "about.offline.benefit.title": "A peimawhna dâh",
      "about.offline.benefit.body": "Vâbalyh nâ khâh tita tlyma, signal y leina su lia na y tita tlyma, châveikhiah online hâ leipa ta chatlie kawpa hmâ byuhna na khoh khiah. Haolei QR Code Taona he hmâ awpa ta â mâ thlâh. Patyh awpa abyuh vei — eikha na chareipa tlai ta a pha khai haw.",
      "about.why.title": "Khazia a peimawh",
      "about.why.body": "Na data cha na chhaichhi liata a tlôh. Hneipazina, nata server taohriana zy y leipa ta, QR Code taona châta deita a châ.",
      "about.open.title": "Hnawh Pahypa",
      "about.open.body": "MIT-licensed-pa châ ta, na raihriana liata a hmâh thei.",
      "about.contact.title": "Azaona",
      "language.label": "Reih",
      "langpick.title": "Na Reih Tlyh",
      "langpick.body": "Hmiatôh awna châta na reih tlyh.",
      "langpick.confirm": "Hmiatôh"
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

  function bindLanguageSelector(selectOrId) {
    const el = typeof selectOrId === "string" ? document.getElementById(selectOrId) : selectOrId;
    if (!el) return;
    const saved = getSavedLang();
    if (saved && supported.includes(saved)) {
      el.value = saved;
    }
    el.addEventListener("change", () => {
      const lang = el.value;
      load(lang);
    });
  }

  function init(defaultLang = "en") {
    const saved = getSavedLang();
    const lang = saved || defaultLang;
    return load(lang);
  }

  return { init, load, apply, t: resolveText, bindLanguageSelector };
})();
