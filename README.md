# موقع آفاق الشرق | Afaq Al-Sharq Website
Static bilingual (AR/EN) site: HTML + CSS + vanilla JS. No backend, no build step.

## Structure
index.html · pages/ (6 program pages) · css/ (style, responsive, pages) · js/ (language, main, slider, pages) · assets/ (logo, fonts, images/{hero,cards,pages})

## Run locally
Open `index.html` in a browser (or `python3 -m http.server`).

## Edit
- **Hero images:** edit the `<img class="slide">` list in `index.html` (files in `assets/images/hero/`, 1920×1080). Slides change every 2s (`js/slider.js`).
  **Makkah and Madinah slides are not included yet:** save `makkah-hero.jpg` / `madinah-hero.jpg` (1920×1080) and add two `<img class="slide" ...>` lines.
- **Card / page images:** replace files in `assets/images/cards/` (800×500) and `assets/images/pages/` (1600×900) keeping the same names. `hajj-umrah.jpg` and `flight-tickets.jpg` are branded placeholders — replace them.
- **Logo:** replace `assets/logo/afaq-logo.png` (transparent PNG/keep the name). The current file was cut from the supplied JPG; use an original SVG/PNG if you have one.
- **Program details:** in each `pages/*.html`, edit the block marked `EDITABLE CONTENT AREA`.
- **Ticker text / all UI text / translations:** `js/language.js` (keys `ticker`, `c1`..`c6`, ...).
- **Contact info:** phone, WhatsApp (`https://wa.me/962782977755`), map, Facebook, Instagram links are in `index.html` and in the footer of every page.
- **Add a program:** copy a file in `pages/`, add a key to `I18N` in `language.js`, add a `<a class="card">` in `index.html`.
- **Colors:** CSS variables at the top of `css/style.css` (taken from the brand board).

## Publish on GitHub Pages
Create a repo, upload the folder contents, Settings → Pages → Deploy from branch `main` / root. All paths are relative.

## Licensing
Photos (Aqaba, Petra, Wadi Rum, Ajloun) were supplied by the client; confirm you hold the rights. Fonts: Cairo and Montserrat (SIL Open Font License, via Fontsource). Mobi Arabic was not supplied.
