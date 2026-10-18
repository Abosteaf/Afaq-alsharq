/* ==========================================================================
   برامج الأقسام (غير أردننا جنة) | Programs of the other home-page sections
   يستخدم نفس محرك الفلاتر في js/jordan-paradise.js (فلتر المدينة/البلد + فلتر تصنيف الفندق).
   !! البرامج الحالية مؤقتة (placeholder:true): بلا سعر مؤكد، وأسماؤها وصورها وتصنيفاتها قابلة للتعديل.
   لتعديل برنامج: غيّر name / nameEn / stars / price / image / details / itinerary ثم احذف placeholder:true.
   لإضافة برنامج: أضف كائنًا داخل مصفوفة القسم المناسب:
   { id: "unique-id", city: "مفتاح من cities", stars: 3, name: "اسم البرنامج", nameEn: "Program name", price: 25,
     image: "../assets/images/cards/xxx.jpg", details: "", itinerary: "" }
   - price: رقم بالدينار. اتركه null (أو احذفه) ليظهر "السعر يُحدد لاحقًا".
   - stars: 2 أو 3 أو 4 أو 5 فقط عندما يكون التصنيف مسجّلًا فعلًا؛ بدونه لا تظهر نجوم.
   - خيارات فلتر النجوم ثابتة وموحّدة في كل الصفحات (جميع التصنيفات، نجمتين، 3، 4، 5 نجوم) وتُصفّي حسب stars.
   - المدن/البلدان: مصفوفة cities لكل قسم (الترتيب هنا = ترتيب القائمة). hidden:true يخفي عنصرًا دون حذفه.
   - cityLabel: عنوان القائمة (اختر المدينة / اختر البلد).
   - المفتاح هو قيمة data-section في وسم body لصفحة القسم. كل قسم مستقل تمامًا عن الأقسام الأخرى وعن أردننا جنة.
   ========================================================================== */
window.SECTIONS = {
  "aqaba-overnight": {
    cityLabel: { ar: "اختر المدينة", en: "Choose a city" },
    cities: [
      { key: "all", ar: "الجميع", en: "All" },
      { key: "aqaba", ar: "العقبة", en: "Aqaba" },
      { key: "amman", ar: "عمان", en: "Amman" },
      { key: "maan", ar: "معان", en: "Ma'an" },
      { key: "dead-sea", ar: "البحر الميت", en: "Dead Sea" }
    ],
    trips: [
      { id: "aqaba-overnight-aqaba-3", placeholder: true, city: "aqaba", stars: 3, name: "برنامج مؤقت - العقبة - 3 نجوم", nameEn: "Placeholder program – Aqaba – 3 stars", price: null, image: "../assets/images/cards/aqaba.jpg", details: "", itinerary: "" },
      { id: "aqaba-overnight-aqaba-4", placeholder: true, city: "aqaba", stars: 4, name: "برنامج مؤقت - العقبة - 4 نجوم", nameEn: "Placeholder program – Aqaba – 4 stars", price: null, image: "../assets/images/cards/aqaba.jpg", details: "", itinerary: "" },
      { id: "aqaba-overnight-amman-3", placeholder: true, city: "amman", stars: 3, name: "برنامج مؤقت - عمان - 3 نجوم", nameEn: "Placeholder program – Amman – 3 stars", price: null, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
      { id: "aqaba-overnight-amman-4", placeholder: true, city: "amman", stars: 4, name: "برنامج مؤقت - عمان - 4 نجوم", nameEn: "Placeholder program – Amman – 4 stars", price: null, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
      { id: "aqaba-overnight-maan-3", placeholder: true, city: "maan", stars: 3, name: "برنامج مؤقت - معان - 3 نجوم", nameEn: "Placeholder program – Ma'an – 3 stars", price: null, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
      { id: "aqaba-overnight-maan-4", placeholder: true, city: "maan", stars: 4, name: "برنامج مؤقت - معان - 4 نجوم", nameEn: "Placeholder program – Ma'an – 4 stars", price: null, image: "../assets/images/cards/petra.jpg", details: "", itinerary: "" },
      { id: "aqaba-overnight-dead-sea-3", placeholder: true, city: "dead-sea", stars: 3, name: "برنامج مؤقت - البحر الميت - 3 نجوم", nameEn: "Placeholder program – Dead Sea – 3 stars", price: null, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" },
      { id: "aqaba-overnight-dead-sea-4", placeholder: true, city: "dead-sea", stars: 4, name: "برنامج مؤقت - البحر الميت - 4 نجوم", nameEn: "Placeholder program – Dead Sea – 4 stars", price: null, image: "../assets/images/cards/jordan-paradise.jpg", details: "", itinerary: "" }
    ]
  },
  "international-trips": {
    cityLabel: { ar: "اختر البلد", en: "Choose a country" },
    cities: [
      { key: "all", ar: "الجميع", en: "All" },
      { key: "uae", ar: "الإمارات", en: "UAE" },
      { key: "egypt", ar: "مصر", en: "Egypt" },
      { key: "france", ar: "فرنسا", en: "France" },
      { key: "turkey", ar: "تركيا", en: "Turkey" }
    ],
    trips: [
      { id: "international-trips-uae-3", placeholder: true, city: "uae", stars: 3, name: "برنامج مؤقت - الإمارات - 3 نجوم", nameEn: "Placeholder program – UAE – 3 stars", price: null, image: "../assets/images/hero/dubai-hero.jpg", details: "", itinerary: "" },
      { id: "international-trips-uae-4", placeholder: true, city: "uae", stars: 4, name: "برنامج مؤقت - الإمارات - 4 نجوم", nameEn: "Placeholder program – UAE – 4 stars", price: null, image: "../assets/images/hero/dubai-hero.jpg", details: "", itinerary: "" },
      { id: "international-trips-egypt-3", placeholder: true, city: "egypt", stars: 3, name: "برنامج مؤقت - مصر - 3 نجوم", nameEn: "Placeholder program – Egypt – 3 stars", price: null, image: "../assets/images/hero/egypt-pyramids-hero.jpg", details: "", itinerary: "" },
      { id: "international-trips-egypt-4", placeholder: true, city: "egypt", stars: 4, name: "برنامج مؤقت - مصر - 4 نجوم", nameEn: "Placeholder program – Egypt – 4 stars", price: null, image: "../assets/images/hero/egypt-pyramids-hero.jpg", details: "", itinerary: "" },
      { id: "international-trips-france-3", placeholder: true, city: "france", stars: 3, name: "برنامج مؤقت - فرنسا - 3 نجوم", nameEn: "Placeholder program – France – 3 stars", price: null, image: "../assets/images/hero/paris-hero.jpg", details: "", itinerary: "" },
      { id: "international-trips-france-4", placeholder: true, city: "france", stars: 4, name: "برنامج مؤقت - فرنسا - 4 نجوم", nameEn: "Placeholder program – France – 4 stars", price: null, image: "../assets/images/hero/paris-hero.jpg", details: "", itinerary: "" },
      { id: "international-trips-turkey-3", placeholder: true, city: "turkey", stars: 3, name: "برنامج مؤقت - تركيا - 3 نجوم", nameEn: "Placeholder program – Turkey – 3 stars", price: null, image: "../assets/images/cards/international-trips.jpg", details: "", itinerary: "" },
      { id: "international-trips-turkey-4", placeholder: true, city: "turkey", stars: 4, name: "برنامج مؤقت - تركيا - 4 نجوم", nameEn: "Placeholder program – Turkey – 4 stars", price: null, image: "../assets/images/cards/international-trips.jpg", details: "", itinerary: "" }
    ]
  },
  "hajj-umrah": {
    cityLabel: { ar: "اختر المدينة", en: "Choose a city" },
    cities: [
      { key: "all", ar: "الجميع", en: "All" },
      { key: "makkah", ar: "مكة المكرمة", en: "Makkah" },
      { key: "madinah", ar: "المدينة المنورة", en: "Madinah" }
    ],
    trips: [
      { id: "hajj-umrah-makkah-3", placeholder: true, city: "makkah", stars: 3, name: "برنامج مؤقت - مكة المكرمة - 3 نجوم", nameEn: "Placeholder program – Makkah – 3 stars", price: null, image: "../assets/images/hero/makkah-madinah-hero.jpg", details: "", itinerary: "" },
      { id: "hajj-umrah-makkah-5", placeholder: true, city: "makkah", stars: 5, name: "برنامج مؤقت - مكة المكرمة - 5 نجوم", nameEn: "Placeholder program – Makkah – 5 stars", price: null, image: "../assets/images/hero/makkah-madinah-hero.jpg", details: "", itinerary: "" },
      { id: "hajj-umrah-madinah-3", placeholder: true, city: "madinah", stars: 3, name: "برنامج مؤقت - المدينة المنورة - 3 نجوم", nameEn: "Placeholder program – Madinah – 3 stars", price: null, image: "../assets/images/hero/makkah-madinah-hero.jpg", details: "", itinerary: "" },
      { id: "hajj-umrah-madinah-5", placeholder: true, city: "madinah", stars: 5, name: "برنامج مؤقت - المدينة المنورة - 5 نجوم", nameEn: "Placeholder program – Madinah – 5 stars", price: null, image: "../assets/images/hero/makkah-madinah-hero.jpg", details: "", itinerary: "" }
    ]
  },
  "flight-tickets": {
    cityLabel: { ar: "اختر البلد", en: "Choose a country" },
    cities: [
      { key: "all", ar: "الجميع", en: "All" },
      { key: "uae", ar: "الإمارات", en: "UAE" },
      { key: "egypt", ar: "مصر", en: "Egypt" },
      { key: "turkey", ar: "تركيا", en: "Turkey" },
      { key: "france", ar: "فرنسا", en: "France" }
    ],
    trips: [
      { id: "flight-tickets-uae-3", placeholder: true, city: "uae", stars: 3, name: "برنامج مؤقت - الإمارات - 3 نجوم", nameEn: "Placeholder program – UAE – 3 stars", price: null, image: "../assets/images/cards/flight-tickets.jpg", details: "", itinerary: "" },
      { id: "flight-tickets-uae-4", placeholder: true, city: "uae", stars: 4, name: "برنامج مؤقت - الإمارات - 4 نجوم", nameEn: "Placeholder program – UAE – 4 stars", price: null, image: "../assets/images/cards/flight-tickets.jpg", details: "", itinerary: "" },
      { id: "flight-tickets-egypt-3", placeholder: true, city: "egypt", stars: 3, name: "برنامج مؤقت - مصر - 3 نجوم", nameEn: "Placeholder program – Egypt – 3 stars", price: null, image: "../assets/images/cards/flight-tickets.jpg", details: "", itinerary: "" },
      { id: "flight-tickets-egypt-4", placeholder: true, city: "egypt", stars: 4, name: "برنامج مؤقت - مصر - 4 نجوم", nameEn: "Placeholder program – Egypt – 4 stars", price: null, image: "../assets/images/cards/flight-tickets.jpg", details: "", itinerary: "" },
      { id: "flight-tickets-turkey-3", placeholder: true, city: "turkey", stars: 3, name: "برنامج مؤقت - تركيا - 3 نجوم", nameEn: "Placeholder program – Turkey – 3 stars", price: null, image: "../assets/images/cards/flight-tickets.jpg", details: "", itinerary: "" },
      { id: "flight-tickets-turkey-4", placeholder: true, city: "turkey", stars: 4, name: "برنامج مؤقت - تركيا - 4 نجوم", nameEn: "Placeholder program – Turkey – 4 stars", price: null, image: "../assets/images/cards/flight-tickets.jpg", details: "", itinerary: "" },
      { id: "flight-tickets-france-3", placeholder: true, city: "france", stars: 3, name: "برنامج مؤقت - فرنسا - 3 نجوم", nameEn: "Placeholder program – France – 3 stars", price: null, image: "../assets/images/cards/flight-tickets.jpg", details: "", itinerary: "" },
      { id: "flight-tickets-france-4", placeholder: true, city: "france", stars: 4, name: "برنامج مؤقت - فرنسا - 4 نجوم", nameEn: "Placeholder program – France – 4 stars", price: null, image: "../assets/images/cards/flight-tickets.jpg", details: "", itinerary: "" }
    ]
  }
};
(function(){
  var s = window.SECTIONS[document.body.dataset.section] || { cities: [], trips: [] };
  window.JP_CITIES = s.cities;
  window.JP_TRIPS = s.trips;
  window.JP_CITY_LABEL = s.cityLabel;
})();
