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
      "language.label": "Language"
    },
    my: {
      "app.title": "Haolei QR ကုဒ် ထုတ်လုပ်သူ",
      "app.subtitle": "အင်တာနက်မလို • မတင်ကြား • API မလို • အပြည့်အစုံ လိုကယ်",
      "label.text": "စာသား သို့မဟုတ် URL",
      "placeholder.text": "လင့်ခ်၊ စာသား သို့မဟုတ် Wi‑Fi အချက်အလက် ထည့်ပါ",
      "label.size": "အရွယ်အစား",
      "label.foreground": "အရှေ့အရောင်",
      "label.background": "နောက်ခံအရောင်",
      "label.format": "ဒေါင်းလုပ် ဖော်မတ်",
      "nav.generator": "ထုတ်လုပ်ကိရိယာ",
      "nav.about": "အကြောင်း",
      "nav.privacy": "ကိုယ်ရေးမူဝါဒ",
      "nav.language": "ဘာသာစကား",
      "format.png": "PNG (ပုံမှန်)",
      "format.svg": "SVG",
      "format.pdf": "PDF",
      "format.jpg": "JPG",
      "format.webp": "WEBP",
      "action.generate": "QR တည်ဆောက်ရန်",
      "action.download": "{format} ဒေါင်းလုပ်",
      "preview.title": "တိုက်ရိုက် မြင်ကွင်း",
      "preview.subtitle": "ရေးသလို အလိုအလျောက် ပြောင်းလဲမည်",
      "preview.placeholder": "သင်၏ QR ကုဒ်ကို ဒီမှာ ပြမည်",
      "status.ready": "တည်ဆောက်ရန် အဆင်သင့်",
      "status.addContent": "တည်ဆောက်ရန် အကြောင်းအရာ ထည့်ပါ",
      "status.qrReady": "QR အဆင်သင့်",
      "cookies.title": "ကွကီးများ နှင့် နှစ်သက်မှု",
      "cookies.body": "သင်၏ နှစ်သက်မှုနှင့် လက်ခံချက်ကို မှတ်သားရန် ကွကီးများကို အသုံးပြုသည်။ အသုံးပြုရန် လက်ခံရပါမည်။",
      "cookies.item1": "အရွယ်အစားနှင့် အရောင်များကို မှတ်သား",
      "cookies.item2": "ဒေါင်းလုပ် ဖော်မတ်ကို မှတ်သား",
      "cookies.item3": "အပြင်အဆင်ကို မှတ်သား",
      "cookies.item4": "လက်ခံချက်ကို မှတ်သား",
      "cookies.accept": "လက်ခံပြီး ဆက်လက်လုပ်ဆောင်ရန်",
      "footer.cookies": "ကွကီးများ",
      "footer.privacy": "ကိုယ်ရေးကိုယ်တာ မူဝါဒ",
      "footer.about": "အကြောင်းအရာ",
      "footer.copyright": "© 2026 Laitei. မူပိုင်ခွင့်များ သိမ်းဆည်းထားသည်။",
      "privacy.title": "ကိုယ်ရေးကိုယ်တာ မူဝါဒ",
      "privacy.effective": "တည်ရက်: 2026 ဖေဖော်ဝါရီ 5",
      "privacy.overview.title": "အကျဉ်းချုပ်",
      "privacy.overview.body": "Haolei QR ကုဒ် ထုတ်လုပ်သူသည် အော့ဖ်လိုင်းပထမ ကိုယ်တိုင်လုပ်ဆောင်သော ကိရိယာ ဖြစ်သည်။ QR ထုတ်လုပ်ခြင်းသည် သင့်ဘရောက်ဇာထဲတွင်ပင် ဖြစ်သည်။ သင့်ဒေတာကို ဆာဗာသို့ မပို့ပါ။",
      "privacy.data.title": "ကျွန်ုပ်တို့ ကုသိုလ်ယူသော ဒေတာ",
      "privacy.data.item1": "အကြောင်းအရာ: သင်ထည့်သော စာသား သို့မဟုတ် URL ကို ဒေသတွင်းတွင် QR အဖြစ် ပြောင်းလဲသည်။",
      "privacy.data.item2": "နှစ်သက်မှု: အရွယ်အစား၊ အရောင်၊ ဖော်မတ်၊ အပြင်အဆင်များကို သင့်စက်၏ ကွကီးတွင် သိမ်းဆည်းသည်။",
      "privacy.cookies.title": "ကွကီးများ",
      "privacy.cookies.body": "ကွကီးများသည် သင့်နှစ်သက်မှုနှင့် လက်ခံချက်ကိုသာ မှတ်သားရန် ဖြစ်ပြီး ခြေရာခံခြင်း မပြုလုပ်ပါ။",
      "privacy.third.title": "ပြင်ပစာကြည့်တိုက်များ",
      "privacy.third.body": "ဤဆိုက်တွင် QRCode.js နှင့် jsPDF ကို အများသုံး CDN များမှ တင်သွင်းပြီး အသုံးပြုထားသည်။",
      "privacy.choice.title": "သင့်ရွေးချယ်မှု",
      "privacy.choice.body": "ဘရောက်ဇာဆက်တင်မှ ကွကီးများကို ဖျက်နိုင်သည်။ ထို့နောက် နှစ်သက်မှုနှင့် လက်ခံချက်များ ပြန်လည်သတ်မှတ်မည်။",
      "privacy.contact.title": "ဆက်သွယ်ရန်",
      "about.title": "Haolei QR ကုဒ် ထုတ်လုပ်သူ အကြောင်း",
      "about.subtitle": "အော့ဖ်လိုင်းပထမ QR ထုတ်လုပ်မှုနှင့် မော်ဒန် UX",
      "about.what.title": "ဘာလုပ်ပေးသည်",
      "about.what.body": "ဘရောက်ဇာတွင် ချက်ချင်း QR ကို ထုတ်လုပ်ပေးသည်။ အင်တာနက်မရှိသည့်အချိန်တွင်ပါ လုပ်ဆောင်နိုင်သည်။",
      "about.offline.title": "အော့ဖ်လိုင်းတွင် အလုပ်လုပ်သည် — Service Worker Cache ဖြင့်",
      "about.offline.intro": "Haolei QR Code Generator သည် Progressive Web App (PWA) အဖြစ် တည်ဆောက်ထားသည်။ ပထမဆုံး ဝက်ဘ်ဆိုက်ကို ဝင်ရောက်သည်နှင့် လိုအပ်သော ဖိုင်များအားလုံးကို Service Worker ဖြင့် သင့်စက်တွင် အလိုအလျောက် သိမ်းဆည်းသည်။",
      "about.offline.how.title": "အလုပ်လုပ်ပုံ",
      "about.offline.how.body": "Service Worker သည် နောက်ကွယ်တွင် HTML စာမျက်နှာများ၊ stylesheets၊ scripts၊ ဘာသာပြန်ဖိုင်များနှင့် app logo ကို သိမ်းဆည်းသည်။ ပထမအကြိမ် ဝင်ရောက်ပြီးနောက် အက်ပ်တစ်ခုလုံးကို ဘရောက်ဇာ cache မှ ရရှိနိုင်သည် — အင်တာနက် ချိတ်ဆက်မှု မလိုအပ်ပါ။",
      "about.offline.what.title": "ဘာတွေ သိမ်းဆည်းသည်",
      "about.offline.item1": "စာမျက်နှာဪားလုံး: Generator၊ About နှင့် Privacy",
      "about.offline.item2": "Stylesheets နှင့် scripts များ",
      "about.offline.item3": "ဘာသာပြန်ဖိုင်များ (English, Mara, Burmese)",
      "about.offline.item4": "အက်ပ် logo နှင့် icon",
      "about.offline.strategy.title": "စမတ် သိမ်းဆည်းမှု နည်းဗျူဟာ",
      "about.offline.strategy.body": "စာမျက်နှာများအတွက် network-first နှင့် assets များအတွက် cache-first နည်းဗျူဟာ အသုံးပြုသည်။ အွန်လိုင်းဖြစ်သည့်အခါ နောက်ဆုံးဗားရှင်းကို ရရှိပြီး ချိတ်ဆက်မှု ပြတ်တောက်သည့်အခါလည်း အဆင်ပြေစွာ အလုပ်လုပ်သည်။ ဗားရှင်းအသစ် တင်သည်နှင့် cache အလိုအလျောက် မွမ်းမံသည်။",
      "about.offline.benefit.title": "ဘာကြောင့် အရေးကြီးသည်",
      "about.offline.benefit.body": "လေယာဉ်ပေါ်တွင်ဖြစ်စေ၊ signal မရှိသော ဒေသတွင်ဖြစ်စေ၊ network request များ စောင့်စရာမလိုဘဲ လျင်မြန်သော အတွေ့အကြုံ လိုချင်သည်ဖြစ်စေ Haolei QR Code Generator သည် အသုံးပြုရန် အဆင်သင့်ဖြစ်သည်။ ထည့်သွင်းစရာ မလိုပါ — တစ်ကြိမ် ဝင်ရောက်ရုံဖြင့် အဆင်သင့်ဖြစ်သည်။",
      "about.why.title": "ဘာကြောင့် အရေးကြီးသည်",
      "about.why.body": "သင့်ဒေတာသည် သင့်စက်တွင်ပဲ ရှိနေပြီး ခြေရာခံခြင်း မရှိပါ။",
      "about.open.title": "အဖွင့်ရင်းမြစ်",
      "about.open.body": "MIT လိုင်စင်ဖြင့် ဖွင့်ထားပြီး သင့်လိုအပ်ချက်အတွက် ပြင်ဆင်လွယ်ကူသည်။",
      "about.contact.title": "ဆက်သွယ်ရန်",
      "language.label": "ဘာသာစကား"
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
      "language.label": "Reih"
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
