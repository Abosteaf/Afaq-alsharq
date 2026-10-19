const I18N={ar:{brand:"آفاق | Afaq",company:"آفاق الشرق للسياحة والسفر والحج والعمرة",ticker_label:"آخر الأخبار",
ticker:"أهلاً وسهلاً بكم في آفاق الشرق للسياحة والسفر والحج والعمرة",
nav_home:"الرئيسية",nav_programs:"جميع الرحلات",nav_hajj:"الحج والعمرة",nav_flights:"تذاكر الطيران",nav_contact:"اتصل بنا",
hero_cta1:"استعرض الرحلات",hero_cta2:"تواصل عبر واتساب",programs_title:"رحلاتنا وخدماتنا",
c1:"الرحلات الداخلية",c2:"رحلة مبيت البتراء مع زيارة العقبة",c3:"رحلة المثلث الذهبي",c4:"أردننا جنة",c5:"الحج والعمرة",c6:"تذاكر طيران",c7:"الرحلات الخارجية",
loc_title:"موقعنا",loc_addr:"العبدلي - إشارة صلاح الدين",loc_btn:"افتح على Google Maps",btn_call:"اتصل بنا",btn_msg:"راسلنا",btn_follow:"تابعنا",about_title:"عن الشركة",contact_title:"تواصل معنا",lbl_phone:"الهاتف",lbl_whatsapp:"واتساب",lbl_location:"الموقع",open_map:"افتح الموقع على الخريطة",
lbl_hours:"ساعات العمل",hours_val:"24 ساعة",lbl_fb:"فيسبوك",lbl_ig:"إنستغرام",footer_links:"روابط",footer_contact:"التواصل",
back_home:"العودة إلى الرئيسية",details_title:"تفاصيل البرنامج",details_note:"للاستفسار عن تفاصيل هذا البرنامج، تواصل معنا مباشرة.",call_btn:"اتصل الآن",wa_btn:"واتساب",rights:"جميع الحقوق محفوظة"},
en:{brand:"Afaq | آفاق",company:"Afaq Al-Sharq Tourism, Travel, Hajj and Umrah",ticker_label:"Latest News",
ticker:"Welcome to Afaq Al-Sharq Tourism, Travel, Hajj and Umrah",
nav_home:"Home",nav_programs:"All Trips",nav_hajj:"Hajj & Umrah",nav_flights:"Flight Tickets",nav_contact:"Contact Us",
hero_cta1:"Browse Trips",hero_cta2:"Chat on WhatsApp",programs_title:"Our Trips & Services",
c1:"Domestic Trips",c2:"Petra Overnight with Aqaba Visit",c3:"Golden Triangle Trip",c4:"Jordan Is Our Paradise",c5:"Hajj & Umrah",c6:"Flight Tickets",c7:"International Trips",
loc_title:"Our Location",loc_addr:"Abdali – Salah Al-Din Signal",loc_btn:"Open in Google Maps",btn_call:"Call Us",btn_msg:"Message Us",btn_follow:"Follow Us",about_title:"About the Company",contact_title:"Contact Us",lbl_phone:"Phone",lbl_whatsapp:"WhatsApp",lbl_location:"Location",open_map:"Open location on map",
lbl_hours:"Business Hours",hours_val:"24 hours",lbl_fb:"Facebook",lbl_ig:"Instagram",footer_links:"Links",footer_contact:"Contact",
back_home:"Back to Home",details_title:"Program Details",details_note:"For details about this program, contact us directly.",call_btn:"Call Now",wa_btn:"WhatsApp",rights:"All rights reserved"}};
function setLang(l){
  const d=I18N[l]||I18N.ar,h=document.documentElement;
  h.lang=l;h.dir=l==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(e=>{const v=d[e.dataset.i18n];if(v)e.textContent=v});
  document.querySelectorAll("[data-i18n-alt]").forEach(e=>{e.alt=d[e.dataset.i18nAlt]||e.alt});
  document.querySelectorAll(".lang-btn").forEach(b=>b.textContent=l==="ar"?"EN":"العربية");
  const k=document.body.dataset.titlekey;document.title=d.brand+(k?" | "+d[k]:"");
  try{localStorage.setItem("afaq-lang",l)}catch(e){}
  document.dispatchEvent(new CustomEvent("langchange",{detail:l}));
}
function currentLang(){try{return localStorage.getItem("afaq-lang")||"ar"}catch(e){return"ar"}}
document.addEventListener("DOMContentLoaded",()=>{
  setLang(currentLang());
  document.querySelectorAll(".lang-btn").forEach(b=>b.addEventListener("click",()=>setLang(document.documentElement.lang==="ar"?"en":"ar")));
});
