/* ==========================================================================
   بيانات أردننا جنة | Jordan Is Our Paradise data
   لإضافة رحلة جديدة: انسخ أحد الكائنات داخل TRIPS وغيّر القيم.
   - id:      معرف فريد (لا يتكرر)
   - city:    مفتاح المدينة من CITIES (مثل "maan" أو "amman")
   - name:    اسم الرحلة بالعربية   | nameEn: (اختياري) الاسم بالإنجليزية
   - stars:   (اختياري) عدد نجوم الفندق: 2 أو 3 أو 4 أو 5. اتركه بدون تعيين للبرامج غير الفندقية (لا تُعطَ نجومًا افتراضية)
   - price:   السعر بالدينار الأردني (رقم)
   - image:   مسار الصورة (إن تُركت فارغة تُستخدم الصورة الافتراضية)
   - details: محتوى "تفاصيل الرحلة" (نص أو HTML) — فارغ حاليًا
   - itinerary: محتوى "مسار الرحلة" (نص أو HTML) — فارغ حاليًا
   لإضافة مدينة: أضف سطرًا إلى CITIES (الترتيب هنا هو ترتيب القائمة). hidden:true يخفي المدينة من القائمة دون حذفها.
   فلتر النجوم: موحّد في js/jordan-paradise.js (STARS).
   ========================================================================== */
window.JP_DEFAULT_IMAGE = "../assets/images/cards/petra.jpg";

window.JP_CITIES = [
  { key: "all",             ar: "الجميع",         en: "All" },
  /* فلتر «الوجهة» (بالترتيب النهائي): الجميع، رحلات اليوم الواحد، البتراء، العقبة، وادي رم (المثلث الذهبي).
     الربط ببيانات البرامج: «رحلات اليوم الواحد» = category:"day"، والبقية = حقل city في كل رحلة (قد يكون قائمة). */
  { key: "day-trips",       ar: "رحلات اليوم الواحد", en: "One-Day Trips", category: "day" },
  { key: "petra",           ar: "البتراء",        en: "Petra" },
  { key: "aqaba",           ar: "العقبة",         en: "Aqaba" },
  { key: "wadi-rum",        ar: "وادي رم (المثلث الذهبي)", en: "Wadi Rum (Golden Triangle)" },
  /* وجهات رحلات اليوم الواحد: لم تعد خيارات في الفلتر (مخفية، لم تُحذف) — مفاتيحها تبقى في بيانات الرحلات */
  { key: "day-ajloun",      ar: "عجلون",          en: "Ajloun",          parent: "day-trips", hidden: true },
  { key: "day-tafileh",     ar: "الطفيلة",        en: "Tafilah",         parent: "day-trips", hidden: true },
  { key: "day-madaba",      ar: "مادبا",          en: "Madaba",          parent: "day-trips", hidden: true },
  { key: "day-azraq",       ar: "الأزرق",         en: "Azraq",           parent: "day-trips", hidden: true },
  { key: "day-umm-qais",    ar: "أم قيس",         en: "Umm Qais",        parent: "day-trips", hidden: true },
  { key: "day-petra-1day",  ar: "البتراء (يوم واحد)", en: "Petra (One Day)", parent: "day-trips", hidden: true },
  { key: "day-qasr-alnakheel", ar: "منتجع قصر النخيل", en: "Qasr Al-Nakheel Resort", parent: "day-trips", hidden: true },
  { key: "day-royal-moon",  ar: "منتجع الرويال مون", en: "Royal Moon Resort", parent: "day-trips", hidden: true },
  { key: "day-salt",        ar: "السلط",          en: "As-Salt",         parent: "day-trips", hidden: true },
  { key: "day-karak",       ar: "الكرك",          en: "Karak",           parent: "day-trips", hidden: true },
  /* مدن قديمة غير مستخدمة حاليًا (مخفية، لم تُحذف) */
  { key: "amman",           ar: "عمان",           en: "Amman", hidden: true },
  { key: "golden-triangle", ar: "المثلث الذهبي",  en: "Golden Triangle", hidden: true },
  { key: "maan",            ar: "معان",           en: "Ma'an", hidden: true },
  { key: "tafileh",         ar: "الطفيلة",        en: "Tafilah", hidden: true },
  { key: "ajloun",          ar: "عجلون",          en: "Ajloun", hidden: true },
  { key: "irbid",           ar: "اربد",           en: "Irbid", hidden: true },
  { key: "dead-sea",        ar: "البحر الميت",    en: "Dead Sea", hidden: true },
  { key: "zarqa",           ar: "الزرقاء",        en: "Zarqa", hidden: true },
  { key: "mafraq",          ar: "المفرق",         en: "Mafraq", hidden: true },
  { key: "jerash",          ar: "جرش",            en: "Jerash", hidden: true },
  { key: "balqa",           ar: "البلقاء",        en: "Balqa", hidden: true },
  { key: "madaba",          ar: "مادبا",          en: "Madaba", hidden: true },
  { key: "karak",           ar: "الكرك",          en: "Karak", hidden: true }
];
window.JP_CITY_LABEL = { ar: "الوجهة", en: "Destination" };
window.JP_MSGS = {
  ar: { emptyFilter: "لا توجد رحلات تطابق خيارات البحث الحالية" },
  en: { emptyFilter: "No trips match the current search options" }
};

/* فلتر النجوم موحّد لكل الصفحات ومعرَّف في js/jordan-paradise.js (جميع التصنيفات، نجمتين، 3، 4، 5 نجوم). */
window.JP_TRIPS = [
  /* ---------- رحلات 10 دنانير للشخص ---------- */
  { id: "day-ajloun", category: "day", city: "day-ajloun", name: "عجلون", nameEn: "Ajloun", price: 10, image: "../assets/images/cards/ajloun.jpg", details: "", itinerary: "" },
  { id: "day-tafileh", category: "day", city: "day-tafileh", name: "الطفيلة", nameEn: "Tafilah", price: 10, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
  { id: "day-madaba", category: "day", city: "day-madaba", name: "مادبا", nameEn: "Madaba", price: 10, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
  { id: "day-azraq", category: "day", city: "day-azraq", name: "الأزرق", nameEn: "Azraq", price: 10, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
  { id: "day-umm-qais", category: "day", city: "day-umm-qais", name: "أم قيس", nameEn: "Umm Qais", price: 10, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
  { id: "day-petra-1day", category: "day", city: ["day-petra-1day", "petra"], name: "البتراء (يوم واحد)", nameEn: "Petra (One Day)", price: 10, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "day-qasr-alnakheel", category: "day", city: "day-qasr-alnakheel", name: "منتجع قصر النخيل", nameEn: "Qasr Al-Nakheel Resort", price: 10, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
  { id: "day-royal-moon", category: "day", city: "day-royal-moon", name: "منتجع الرويال مون", nameEn: "Royal Moon Resort", price: 10, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
  { id: "day-salt", category: "day", city: "day-salt", name: "السلط", nameEn: "As-Salt", price: 10, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
  { id: "day-karak", category: "day", city: "day-karak", name: "الكرك", nameEn: "Karak", price: 10, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },

  /* ---------- العقبة (مبيت) ---------- */
  { id: "aqaba-2", city: "aqaba", stars: 2, name: "العقبة (مبيت)", nameEn: "Aqaba (Overnight)", price: 15, image: "../assets/images/cards/aqaba-new.jpg", details: "", itinerary: "" },
  { id: "aqaba-3", city: "aqaba", stars: 3, name: "العقبة (مبيت) - فندق الزيتونة", nameEn: "Aqaba (Overnight) – Al-Zaytouna Hotel", price: 20, image: "../assets/images/cards/aqaba.jpg", details: "", itinerary: "" },
  { id: "aqaba-4", city: "aqaba", stars: 4, name: "العقبة (مبيت) - فندق بيتي بوتيك", nameEn: "Aqaba (Overnight) – Betty Boutique Hotel", price: 25, image: "../assets/images/cards/aqaba-new.jpg", details: "", itinerary: "" },
  { id: "aqaba-5", city: "aqaba", stars: 5, name: "العقبة (مبيت)", nameEn: "Aqaba (Overnight)", price: 40, image: "../assets/images/cards/aqaba.jpg", details: "", itinerary: "" },

  /* ---------- البتراء (مبيت) ---------- */
  { id: "maan-petra-2", city: "petra", stars: 2, name: "البتراء (مبيت) - فندق شقيلة", nameEn: "Petra (Overnight) – Shqeila Hotel", price: 12, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "maan-petra-3", city: "petra", stars: 3, name: "البتراء (مبيت) - فندق الأنباط", nameEn: "Petra (Overnight) – Al-Anbat Hotel", price: 17, image: "../assets/images/hero/petra-hero.jpg", details: "", itinerary: "" },
  { id: "maan-petra-4", city: "petra", stars: 4, name: "البتراء (مبيت) - فندق إيليت", nameEn: "Petra (Overnight) – Elite Hotel", price: 22, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "maan-petra-5", city: "petra", stars: 5, name: "البتراء (مبيت) - فندق حياة زمان", nameEn: "Petra (Overnight) – Hayat Zaman Hotel", price: 27, image: "../assets/images/hero/petra-hero.jpg", details: "", itinerary: "" },
  { id: "maan-petra-5b", city: "petra", stars: 5, name: "البتراء (مبيت) - فندق القرية القديمة", nameEn: "Petra (Overnight) – Old Village Hotel", price: 27, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },

  /* ---------- المثلث الذهبي (مبيت وادي رم) ---------- */
  { id: "gt-3", city: "wadi-rum", stars: 3, name: "المثلث الذهبي (مبيت وادي رم) - مخيم حرير رم", nameEn: "Golden Triangle (Wadi Rum Overnight) – Harir Rum Camp", price: 25, image: "../assets/images/cards/wadi-rum.jpg", details: "البتراء + مبيت وادي رم + زيارة العقبة", itinerary: "" },
  { id: "gt-4", city: "wadi-rum", stars: 4, name: "المثلث الذهبي (مبيت وادي رم) - مخيم حسن الزوايدة", nameEn: "Golden Triangle (Wadi Rum Overnight) – Hassan Al-Zawaideh Camp", price: 30, image: "../assets/images/hero/wadi-rum-hero.jpg", details: "البتراء + مبيت وادي رم + زيارة العقبة", itinerary: "" },
  { id: "gt-5", city: "wadi-rum", stars: 5, name: "المثلث الذهبي (مبيت وادي رم) - مخيم الواحة", nameEn: "Golden Triangle (Wadi Rum Overnight) – Al-Waha Camp", price: 35, image: "../assets/images/cards/wadi-rum.jpg", details: "البتراء + مبيت وادي رم + زيارة العقبة", itinerary: "" },
  { id: "gt-5b", city: "wadi-rum", stars: 5, name: "المثلث الذهبي (مبيت وادي رم) - مخيم السلطانة", nameEn: "Golden Triangle (Wadi Rum Overnight) – Al-Sultana Camp", price: 35, image: "../assets/images/hero/wadi-rum-hero.jpg", details: "البتراء + مبيت وادي رم + زيارة العقبة", itinerary: "" },

  /* ---------- برامج موجودة سابقًا (لم تتغير) ---------- */
  { id: "maan-shobak", name: "قلعة الشوبك - قصر الملك المؤسس", nameEn: "Shobak Castle – Founding King's Palace", price: 10, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "maan-petra-shobak", city: "petra", name: "البتراء والشوبك", nameEn: "Petra & Shobak", price: 10, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" }
];
