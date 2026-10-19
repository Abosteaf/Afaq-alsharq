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
- **Contact info:** phone, WhatsApp (`https://wa.me/962792900675`), map, Facebook, Instagram links are in `index.html` and in the footer of every page.
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
