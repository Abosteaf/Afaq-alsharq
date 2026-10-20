/* فعاليات العقبة البحرية — homepage card opens a popup (no navigation).
   Data lives in EVENTS below. Prices/notes are shown in the current language. */
(function(){
  var IMG="assets/images/events/";
  var EVENTS=[
    {nameAr:"قارب الوايت برنس",nameEn:"White Prince Boat",img:"white-prince.svg",
     prices:[{ar:"تبدأ من 15 دينار",en:"From 15 JOD"}]},
    {nameAr:"يخت علاء الدين",nameEn:"Aladdin Boat",img:"aladdin.svg",
     prices:[{label:{ar:"بدون غداء",en:"Without lunch"},ar:"13 دينار",en:"13 JOD"},
             {label:{ar:"مع غداء",en:"With lunch"},ar:"17 دينار",en:"17 JOD"}],
     diff:{ar:"الفرق بين السعرين: وجبة الغداء",en:"Difference between the two prices: lunch"}},
    {nameAr:"البراشوب",nameEn:"Parachute",img:"parachute.svg",
     prices:[{ar:"ابتداءً من 40 دينار",en:"From 40 JOD"}]},
    {nameAr:"الغواصة البحرية",nameEn:"Submarine",img:"submarine.svg",
     prices:[{ar:"15 دينار",en:"15 JOD"}],
     note:{ar:"حسب مدة الرحلة",en:"Depends on trip duration"}},
    {nameAr:"السيارة المائية",nameEn:"See Car",img:"see-car.svg",
     prices:[{ar:"ابتداءً من 35 دينار",en:"From 35 JOD"}]},
    {nameAr:"الدراجة المائية",nameEn:"Jet Ski",img:"jet-ski.svg",
     prices:[{ar:"ابتداءً من 30 دينار",en:"From 30 JOD"}]},
    {nameAr:"الكنباي الصوفا البحرية",nameEn:"Sofa Ride",img:"sofa-ride.svg",
     prices:[{ar:"10 دنانير",en:"10 JOD"}]},
    {nameAr:"الموزة البحرية",nameEn:"Banana Boat",img:"banana-boat.svg",
     prices:[{ar:"8 دنانير",en:"8 JOD"}]},
    {nameAr:"الغوص البحري",nameEn:"Diving",img:"diving.svg",
     prices:[{ar:"35 دينار",en:"35 JOD"}],
     note:{ar:"شامل دخولية شالهيات الأمن العام بالشاطئ الجنوبي",en:"Includes entry to the General Security beach chalets (South Beach)"}}
  ];
  var T={
    ar:{title:"فعاليات العقبة البحرية 🌊",close:"إغلاق"},
    en:{title:"Aqaba Marine Activities 🌊",close:"Close"}
  };
  var dlg=document.getElementById("ev-modal"),grid=document.getElementById("ev-grid"),
      title=document.getElementById("ev-title"),closeBtn=document.getElementById("ev-close"),
      trigger=document.getElementById("ev-open"),lastFocus=null;
  if(!dlg||!grid||!trigger)return;

  function lang(){return document.documentElement.lang==="en"?"en":"ar"}
  function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}

  function render(){
    var l=lang(),t=T[l];
    title.textContent=t.title;
    closeBtn.setAttribute("aria-label",t.close);
    closeBtn.title=t.close;
    grid.textContent="";
    EVENTS.forEach(function(ev){
      var li=el("li","ev-item");
      var media=el("div","ev-media");
      var img=el("img");
      img.src=IMG+ev.img;img.alt=ev.nameAr;img.width=800;img.height=600;img.loading="lazy";
      media.appendChild(img);li.appendChild(media);

      var body=el("div","ev-body");
      body.appendChild(el("h4","ev-name",ev.nameAr));
      var en=el("p","ev-name-en",ev.nameEn);en.setAttribute("dir","ltr");body.appendChild(en);

      var prices=el("div","ev-prices");
      ev.prices.forEach(function(p){
        var chip=el("div","ev-price");
        if(p.label)chip.appendChild(el("span","ev-price-label",p.label[l]));
        chip.appendChild(el("b","ev-price-val",p[l]));
        prices.appendChild(chip);
      });
      body.appendChild(prices);

      if(ev.diff)body.appendChild(el("p","ev-diff",ev.diff[l]));
      if(ev.note)body.appendChild(el("p","ev-note",ev.note[l]));
      li.appendChild(body);
      grid.appendChild(li);
    });
  }

  function open(){
    lastFocus=trigger;
    render();
    if(dlg.showModal)dlg.showModal();else dlg.setAttribute("open","");
    document.documentElement.classList.add("ev-lock");
    closeBtn.focus();
  }
  function close(){
    if(dlg.close)dlg.close();else{dlg.removeAttribute("open");onClosed()}
  }
  function onClosed(){
    document.documentElement.classList.remove("ev-lock");
    if(lastFocus)lastFocus.focus();
  }

  trigger.addEventListener("click",open);
  trigger.addEventListener("keydown",function(e){
    if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}
  });
  closeBtn.addEventListener("click",close);
  dlg.addEventListener("click",function(e){if(e.target===dlg)close()}); /* backdrop */
  dlg.addEventListener("close",onClosed);                              /* Escape + close() */
  document.addEventListener("langchange",function(){if(dlg.open)render()});
})();
