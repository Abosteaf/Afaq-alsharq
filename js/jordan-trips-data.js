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
   فلتر النجوم: STAR_FILTERS أدناه (الخيارات والترتيب).
   ========================================================================== */
window.JP_DEFAULT_IMAGE = "../assets/images/cards/petra.jpg";

window.JP_CITIES = [
  { key: "all",             ar: "الجميع",         en: "All" },
  { key: "amman",           ar: "عمان",           en: "Amman" },
  { key: "aqaba",           ar: "العقبة",         en: "Aqaba" },
  { key: "golden-triangle", ar: "المثلث الذهبي",  en: "Golden Triangle" },
  { key: "maan",            ar: "معان",           en: "Ma'an" },
  { key: "tafileh",         ar: "الطفيلة",        en: "Tafilah" },
  { key: "ajloun",          ar: "عجلون",          en: "Ajloun" },
  { key: "irbid",           ar: "اربد",           en: "Irbid" },
  { key: "dead-sea",        ar: "البحر الميت",    en: "Dead Sea" },
  { key: "zarqa",           ar: "الزرقاء",        en: "Zarqa" },
  { key: "mafraq",          ar: "المفرق",         en: "Mafraq" },
  { key: "jerash",          ar: "جرش",            en: "Jerash", hidden: true },
  { key: "balqa",           ar: "البلقاء",        en: "Balqa", hidden: true },
  { key: "madaba",          ar: "مادبا",          en: "Madaba", hidden: true },
  { key: "karak",           ar: "الكرك",          en: "Karak", hidden: true },
  { key: "wadi-rum",        ar: "وادي رم",        en: "Wadi Rum", hidden: true }
];

window.JP_STAR_FILTERS = [
  { key: "all", ar: "جميع التصنيفات", en: "All ratings" },
  { key: "2",   ar: "⭐⭐ نجمتين",        en: "⭐⭐ 2 Stars" },
  { key: "3",   ar: "⭐⭐⭐ 3 نجوم",      en: "⭐⭐⭐ 3 Stars" },
  { key: "4",   ar: "⭐⭐⭐⭐ 4 نجوم",    en: "⭐⭐⭐⭐ 4 Stars" },
  { key: "5",   ar: "⭐⭐⭐⭐⭐ 5 نجوم",  en: "⭐⭐⭐⭐⭐ 5 Stars" }
];

window.JP_TRIPS = [
  /* ---------- معان ---------- */
  { id: "maan-petra-2", stars: 2,   city: "maan", name: "مبيت البتراء - نجمتين", nameEn: "Petra Overnight – 2 Stars", price: 12,   image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "maan-petra-3", stars: 3,   city: "maan", name: "مبيت البتراء 3 نجوم",   nameEn: "Petra Overnight – 3 Stars", price: 17,   image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "maan-petra-4", stars: 4,   city: "maan", name: "مبيت البتراء 4 نجوم",   nameEn: "Petra Overnight – 4 Stars", price: 22,   image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "maan-petra-5", stars: 5,   city: "maan", name: "مبيت البتراء 5 نجوم",   nameEn: "Petra Overnight – 5 Stars", price: 27.5, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "maan-shobak",    city: "maan", name: "قلعة الشوبك - قصر الملك المؤسس", nameEn: "Shobak Castle – Founding King's Palace", price: 10, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
  { id: "maan-petra-shobak", city: "maan", name: "البتراء والشوبك",    nameEn: "Petra & Shobak",            price: 10,   image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },

  /* ---------- العقبة ---------- */
  { id: "aqaba-2", stars: 2, city: "aqaba", name: "مبيت العقبة - فندق نجمتين", nameEn: "Aqaba Overnight – 2-Star Hotel", price: 15, image: "../assets/images/cards/aqaba.jpg", details: "", itinerary: "" },
  { id: "aqaba-3", stars: 3, city: "aqaba", name: "مبيت العقبة - فندق 3 نجوم", nameEn: "Aqaba Overnight – 3-Star Hotel", price: 20, image: "../assets/images/cards/aqaba.jpg", details: "", itinerary: "" },
  { id: "aqaba-4", stars: 4, city: "aqaba", name: "مبيت العقبة - فندق 4 نجوم", nameEn: "Aqaba Overnight – 4-Star Hotel", price: 25, image: "../assets/images/cards/aqaba.jpg", details: "", itinerary: "" },
  { id: "aqaba-5", stars: 5, city: "aqaba", name: "مبيت العقبة - فندق 5 نجوم", nameEn: "Aqaba Overnight – 5-Star Hotel", price: 40, image: "../assets/images/cards/aqaba.jpg", details: "", itinerary: "" },

  /* ---------- المثلث الذهبي ---------- */
  { id: "gt-3", stars: 3, city: "golden-triangle", name: "البتراء + مبيت وادي رم + زيارة العقبة - 3 نجوم", nameEn: "Petra + Wadi Rum Overnight + Aqaba Visit – 3 Stars", price: 25, image: "../assets/images/cards/golden-triangle.jpg", details: "", itinerary: "" },
  { id: "gt-4", stars: 4, city: "golden-triangle", name: "البتراء + مبيت وادي رم + زيارة العقبة - 4 نجوم", nameEn: "Petra + Wadi Rum Overnight + Aqaba Visit – 4 Stars", price: 30, image: "../assets/images/cards/golden-triangle.jpg", details: "", itinerary: "" },
  { id: "gt-5", stars: 5, city: "golden-triangle", name: "البتراء + مبيت وادي رم + زيارة العقبة - 5 نجوم", nameEn: "Petra + Wadi Rum Overnight + Aqaba Visit – 5 Stars", price: 35, image: "../assets/images/cards/golden-triangle.jpg", details: "", itinerary: "" }
];
