# موقع آفاق الشرق | Afaq Al-Sharq Website
Static bilingual (AR/EN) site: HTML + CSS + vanilla JS. No backend, no build step.

## Structure
index.html · pages/ (6 program pages) · css/ (style, responsive, pages) · js/ (language, main, slider, pages) · assets/ (logo, fonts, images/{hero,cards,pages})

## Run locally
Open `index.html` in a browser (or `python3 -m http.server`).

## Edit
- **Hero images:** edit the `<img class="slide">` list in `index.html` (files in `assets/images/hero/`, 1280px wide). Slides change every 2s (`js/slider.js`).
  **Makkah and Madinah slides are not included yet:** save `makkah-hero.jpg` / `madinah-hero.jpg` (1280px wide) and add two `<img class="slide" ...>` lines.
- **Card / page images:** replace files in `assets/images/cards/` (800×500) and `assets/images/pages/` (1600×900) keeping the same names. `hajj-umrah.jpg` and `flight-tickets.jpg` are branded placeholders — replace them.
- **Logo:** replace `assets/logo/afaq-logo.png` (transparent PNG/keep the name). The current file was cut from the supplied JPG; use an original SVG/PNG if you have one.
- **Program details:** in each `pages/*.html`, edit the block marked `EDITABLE CONTENT AREA`.
- **Ticker text / all UI text / translations:** `js/language.js` (keys `ticker`, `c1`..`c6`, ...).
- **Contact info:** phone, WhatsApp (`https://wa.me/962779977183`), map, Facebook, Instagram links are in `index.html` and in the footer of every page.
- **Add a program:** copy a file in `pages/`, add a key to `I18N` in `language.js`, add a `<a class="card">` in `index.html`.
- **Colors:** CSS variables at the top of `css/style.css` (taken from the brand board).

## Publish on GitHub Pages
Create a repo, upload the folder contents, Settings → Pages → Deploy from branch `main` / root. All paths are relative.

## Licensing
Photos (Aqaba, Petra, Wadi Rum, Ajloun) were supplied by the client; confirm you hold the rights. Fonts: Cairo and Montserrat (SIL Open Font License, via Fontsource). Mobi Arabic was not supplied.

## أردننا جنة | Jordan Is Our Paradise page
- Page: `pages/jordan-is-our-paradise.html` (styles: `css/jordan-paradise.css`, logic: `js/jordan-paradise.js`).
- **All trips, cities, prices, images, details and itineraries live in `js/jordan-trips-data.js`.** Add an object to `JP_TRIPS` to add a trip; fill its `details` / `itinerary` fields to populate the popup. Cities (and their order in the dropdown) are in `JP_CITIES`.
- **Hotel stars:** add `stars: 2|3|4|5` to a trip in `JP_TRIPS` (omit for non-hotel programs — no default stars). The hotel-rating filter (All ratings, 2, 3, 4, 5 stars) is one fixed list (`STARS`) in `js/jordan-paradise.js`, shared by every page. Card size is set by `--tw` in `.jp-grid` (`css/jordan-paradise.css`) and applies to all current and future trips.

## صفحات الأقسام الأخرى | Other section pages
- Pages: `aqaba-overnight`, `international-trips`, `hajj-umrah`, `flight-tickets` (in `pages/`). They use the same engine as أردننا جنة (`js/jordan-paradise.js`, `css/jordan-paradise.css`) with two filters: city/country + hotel rating.
- **Their data lives in `js/section-trips-data.js`**: per section, `cities` (filter list) and `trips`. Current programs are temporary (`placeholder: true`, `price: null` shows "السعر يُحدد لاحقًا"). Edit name / nameEn / stars / price / image / details / itinerary, then delete `placeholder: true`.
- Each section's data is independent; `jordan-trips-data.js` was not touched.

## فلاتر الوجهة (محدّثة) | Destination filters
- **أردننا جنة:** الجميع · رحلات اليوم الواحد · البتراء · العقبة · وادي رم (المثلث الذهبي). التصنيف من حقل `city` (أو `category:"day"`) لكل رحلة في `js/jordan-trips-data.js`؛ `city` يقبل قائمة لبرنامج يخص أكثر من وجهة (مثل «البتراء (يوم واحد)»).
- **الحج والعمرة:** الجميع · مكة والمدينة · مكة فقط. المفاتيح `makkah-madinah` و`makkah-only` في حقل `city` لكل برنامج في `js/section-trips-data.js`.

## فعاليات العقبة البحرية | Aqaba marine activities (popup)
- Homepage card `#ev-open` in `index.html` (card image: `assets/images/cards/aqaba-marine.svg`, title key `c8` in `js/language.js`). It opens a popup instead of navigating.
- Popup markup: `<dialog id="ev-modal">` at the end of `index.html`. Logic: `js/events.js`. Styles: `css/events.css` (prefix `ev-`, does not touch the Jordan page modal).
- **Activity data (name, price, note, image) lives in the `EVENTS` array in `js/events.js`.** Two prices are supported with labels (e.g. Aladdin: without / with lunch).
- Activity images are placeholder SVG illustrations in `assets/images/events/`. To use real photos, add JPG files (800×600) and set the `img` field in `EVENTS` (or keep the same names with `.jpg`, updating the field). Replace the card image the same way (800×500).

## Search icon, SEO and indexing
- **Favicon (Google search icon):** `favicon.ico` at the site root, plus `assets/icons/favicon-48x48.png`, `favicon-96x96.png` and `apple-touch-icon.png`, all generated from the official logo's emblem on a white square. Google requires the icon to be at least 48px and a multiple of 48px (here 48 and 96).
- **Canonical + description:** set in `index.html` (`https://afaqtravel.site/`); each page has its own canonical URL.
- **`robots.txt` and `sitemap.xml`** at the root. If you add pages, add them to `sitemap.xml`.
- After publishing, in Google Search Console: verify the domain, submit `https://afaqtravel.site/sitemap.xml`, and use URL Inspection on `https://afaqtravel.site/` → "Request indexing". Google may take days to weeks to show a new favicon.

## الحركات والتأثيرات | Motion & animations
- الملفان: `css/motion.css` و`js/motion.js` (مربوطان في كل الصفحات). لا مكتبات خارجية؛ CSS/SVG و`transform`/`opacity` فقط.
- الرئيسية: طائرات بمسارات متقطعة وسحب في الواجهة، مسار رحلة بين «رحلاتنا» و«عن الشركة»، أيقونات سفينة وحقيبة وطائرة خفيفة في «عن الشركة»، ظهور تدريجي للأقسام والبطاقات، لمعة وتكبير عند المرور على البطاقات، موجات على بطاقة فعاليات العقبة ونافذتها.
- الصفحات: طائرات/سحب في الرحلات الخارجية وتذاكر الطيران والرحلات الداخلية، شمس هادئة في أردننا جنة، **الحج والعمرة صورة فقط بحركة بطيئة جدًا بدون عناصر سفر**.
- لتعطيل عنصر: احذف سطره في `js/motion.js` (أقسام مرقّمة بتعليقات). عدد الطائرات والسرعات في `bannerSets` وفي قسم hero.
- تحترم `prefers-reduced-motion` (تُلغى كل الحركات)، وتتوقف الحركات خارج الشاشة.
