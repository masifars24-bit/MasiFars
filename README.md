# Massi Fars — کۆدی تەواو دابەشکراو

کۆدی ئەسڵی (١ فایل، ~٣.٢MB) بە تەواوی دابەش کرا.

## قەبارە

| بەش | قەبارە | ژمارە |
|-----|--------|--------|
| **index.html** | **~٣٩٩ KB** | ١ |
| css/ | ~٦٧٩ KB | ٦١ |
| js/ | ~٢.٢ MB | ٤٩ |
| sw.js | ~٥ KB | ١ |

پێشتر: **٣.٢ MB** لە یەک فایل. ئێستا: index تەنها **٣٩٩ KB**.

## پێکهاتە

```
massi-fars/
├── index.html                 ← HTML + لینکەکان (~399KB)
├── index-original-backup.html ← پاشەکەوتی ئەسڵی
├── sw.js                      ← Service Worker (114 فایل)
├── manifest.webmanifest
├── README.md
├── css/                       ← ٦١ فایل
│   ├── app-main.css           ← ستایلی سەرەکی
│   ├── receipt-v2.css, numpad.css, mfrq.css, ...
│   └── ...
├── js/                        ← ٤٩ فایل
│   ├── app-core.js            ← لۆژیکی سەرەکی ئەپ (~1MB)
│   ├── app-character.js       ← کارەکتەر / V24
│   ├── lib-jspdf.js, lib-html2canvas.js  ← lazy
│   ├── sync.js, numpad.js, sysctl.js, ...
│   └── ...
└── icons/                     ← ئایکۆنەکان لێرە دابنێ
```

## فایلە گرنگەکان

| فایل | ناوەڕۆک |
|------|---------|
| `js/config-and-utils.js` | mfEsc, MF_AUTH, MF_CONTACT |
| `js/app-core.js` | لۆژیکی سەرەکی سیستەم |
| `js/sync.js` | سینک لەگەڵ Supabase |
| `js/numpad.js` | کیبۆردی تایبەت |
| `js/sysctl.js` | بەڕێوەبردنی سیستەم |
| `js/mfrq.js` | داواکاری هەژماری نوێ |
| `css/app-main.css` | ستایلی گشتی |
| `css/receipt-v2.css` | وەسڵ |
| `sw.js` | cache و offline |

## چۆن بەکاری بهێنیت؟

```bash
cd massi-fars
# ئایکۆنەکان دابنێ: icon-192.png, apple-touch-icon.png

python3 -m http.server 8080
# یان: npx serve .
```

بکەرەوە: `http://localhost:8080`

## گۆڕانکاری

- کیبۆرد → `js/numpad.js` + `css/numpad.css`
- سینک → `js/sync.js`
- سیستەم کۆنترۆڵ → `js/sysctl.js`
- وەسڵ → `css/receipt-v2.css` + `js/receipt-v2.js`
- لۆژیکی سەرەکی → `js/app-core.js`
- ستایلی گشتی → `css/app-main.css`

دوای گۆڕانکاری گەورە، hard-refresh بکە (Ctrl+Shift+R) یان وەشانی CACHE لە `sw.js` بگۆڕە.

## تێبینی

- هەموو ناوی گۆڕاوە جیهانییەکان هەمان ماونەتەوە.
- `index-original-backup.html` پاشەکەوتی تەواوە.
- PWA: `sw.js` + `manifest.webmanifest` ئامادەن.
