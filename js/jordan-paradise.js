/* أردننا جنة — city filter, trip cards, details modal. Data: jordan-trips-data.js */
(function(){
  "use strict";
  var CITIES=(window.JP_CITIES||[]).filter(function(c){return !c.hidden}),TRIPS=window.JP_TRIPS||[],STARS=window.JP_STAR_FILTERS||[],DEF=window.JP_DEFAULT_IMAGE;
  var state={city:"all",stars:"all",lang:"ar"};
  var $=function(s,r){return(r||document).querySelector(s)};
  var T={ar:{choose:"اختر المدينة",chooseStars:"تصنيف الفندق",reset:"إعادة ضبط الفلاتر",currency:"د.أ",details:"التفاصيل",close:"إغلاق",dTitle:"تفاصيل الرحلة",iTitle:"مسار الرحلة",
    empty:"لا توجد رحلات متاحة لهذه الوجهة حاليًا، ترقبوا برامجنا القادمة.",emptyStars:"لا توجد برامج بهذا التصنيف في هذه الوجهة. جرّب تصنيفًا آخر أو أعد ضبط الفلاتر.",
    star:["","","نجمتان","3 نجوم","4 نجوم","5 نجوم"],heroSub:"اختر وجهتك واستعرض برامجنا السياحية في أنحاء المملكة"},
   en:{choose:"Choose a city",chooseStars:"Hotel rating",reset:"Reset filters",currency:"JOD",details:"Details",close:"Close",dTitle:"Trip Details",iTitle:"Itinerary",
    empty:"No trips are available for this destination right now. Stay tuned for our upcoming programs.",emptyStars:"No programs match this rating in this destination. Try another rating or reset the filters.",
    star:["","","2 stars","3 stars","4 stars","5 stars"],heroSub:"Pick your destination and browse our tours across the Kingdom"}};
  var tx=function(k){return T[state.lang][k]};
  var itemName=function(c){return state.lang==="en"?c.en:c.ar};
  var tripName=function(t){return state.lang==="en"&&t.nameEn?t.nameEn:t.name};
  var fmt=function(n){return String(n)};
  var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
  var grid=$("#jp-grid"),empty=$("#jp-empty"),resetBtn=$("#jp-reset");

  /* ---------- dropdowns (one factory for city + stars) ---------- */
  function makeDD(id,items,stateKey){
    var dd=$("#"+id),btn=$("#"+id+"-btn"),list=$("#"+id+"-list"),val=$("#"+id+"-val"),active=0;
    function cur(){return items.filter(function(c){return c.key===state[stateKey]})[0]||items[0]}
    function build(){
      list.innerHTML=items.map(function(c,i){
        return '<li role="option" id="'+id+'-opt-'+i+'" data-key="'+c.key+'" aria-selected="'+(c.key===state[stateKey])+'">'+esc(itemName(c))+'</li>';
      }).join("");
      val.textContent=itemName(cur());
    }
    function setActive(i){
      active=Math.max(0,Math.min(items.length-1,i));
      [].forEach.call(list.children,function(li,n){li.classList.toggle("is-active",n===active)});
      btn.setAttribute("aria-activedescendant",id+"-opt-"+active);
      var el=list.children[active];if(el&&el.scrollIntoView)el.scrollIntoView({block:"nearest"});
    }
    function open(){dd.classList.add("open");btn.setAttribute("aria-expanded","true");
      setActive(Math.max(0,items.indexOf(cur())));}
    function close(f){dd.classList.remove("open");btn.setAttribute("aria-expanded","false");if(f)btn.focus()}
    function choose(key){state[stateKey]=key;close(true);refresh(true)}
    btn.addEventListener("click",function(){dd.classList.contains("open")?close():open()});
    list.addEventListener("click",function(e){var li=e.target.closest("li");if(li)choose(li.dataset.key)});
    btn.addEventListener("keydown",function(e){
      var o=dd.classList.contains("open");
      if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(!o)open();else setActive(active+(e.key==="ArrowDown"?1:-1))}
      else if(e.key==="Home"&&o){e.preventDefault();setActive(0)}
      else if(e.key==="End"&&o){e.preventDefault();setActive(items.length-1)}
      else if((e.key==="Enter"||e.key===" ")&&o){e.preventDefault();choose(items[active].key)}
      else if(e.key==="Escape"&&o){e.preventDefault();close(true)}
      else if(e.key==="Tab"&&o){close()}
    });
    document.addEventListener("click",function(e){if(!dd.contains(e.target))close()});
    return {build:build};
  }
  var ddCity=makeDD("jp-dd",CITIES,"city"),ddStars=makeDD("jp-sd",STARS,"stars");
  function refresh(animate){ddCity.build();ddStars.build();render(animate)}
  resetBtn.addEventListener("click",function(){state.city="all";state.stars="all";refresh(true)});

  /* ---------- cards ---------- */
  function visible(){return TRIPS.filter(function(t){
    return (state.city==="all"||t.city===state.city)&&(state.stars==="all"||String(t.stars)===state.stars)})}
  function starBadge(t){
    var n=+t.stars;if(!(n>=2&&n<=5))return"";   /* no stars => no badge, never a default */
    return '<span class="trip-stars" role="img" aria-label="'+esc(tx("star")[n])+'">'+new Array(n+1).join("\u2B50")+'</span>';
  }
  function render(animate){
    var items=visible();
    grid.innerHTML=items.map(function(t){
      return '<article class="trip" data-id="'+esc(t.id)+'"><div class="trip-img"><img src="'+esc(t.image||DEF)+'" alt="" width="800" height="500" loading="lazy">'+starBadge(t)+'</div>'+
        '<div class="trip-body"><h3 class="trip-title">'+esc(tripName(t))+'</h3>'+
        '<div class="trip-foot"><span class="trip-price"><b>'+fmt(t.price)+'</b> '+tx("currency")+'</span>'+
        '<button type="button" class="trip-btn" data-id="'+esc(t.id)+'">'+tx("details")+'</button></div></div></article>';
    }).join("");
    [].forEach.call(grid.querySelectorAll("img"),function(im){
      im.addEventListener("error",function(){if(im.dataset.fb)return;im.dataset.fb=1;im.src=DEF});
    });
    empty.hidden=items.length>0;
    grid.hidden=items.length===0;
    empty.textContent=state.stars!=="all"?tx("emptyStars"):tx("empty");
    resetBtn.textContent=tx("reset");
    if(animate){[grid,empty].forEach(function(el){el.classList.remove("jp-fade");void el.offsetWidth;el.classList.add("jp-fade")})}
  }
  grid.addEventListener("click",function(e){
    var card=e.target.closest(".trip");if(card)openModal(card.dataset.id,card.querySelector(".trip-btn"));
  });

  /* ---------- modal ---------- */
  var dlg=$("#jp-modal"),mTitle=$("#jp-m-title"),mPrice=$("#jp-m-price"),mD=$("#jp-m-details"),mI=$("#jp-m-itin"),lastFocus=null,current=null;
  function fillModal(){
    if(!current)return;
    mTitle.textContent=tripName(current);
    mPrice.innerHTML='<b>'+fmt(current.price)+'</b> '+tx("currency");
    $("#jp-m-dh").textContent=tx("dTitle");$("#jp-m-ih").textContent=tx("iTitle");
    $("#jp-m-close").setAttribute("aria-label",tx("close"));
    mD.innerHTML=current.details||"";mI.innerHTML=current.itinerary||"";
  }
  function openModal(id,from){
    current=TRIPS.filter(function(t){return t.id===id})[0];if(!current)return;
    lastFocus=from||document.activeElement;fillModal();
    if(dlg.showModal)dlg.showModal();else dlg.setAttribute("open","");
    document.documentElement.classList.add("jp-lock");dlg.scrollTop=0;
  }
  function closeModal(){if(dlg.close)dlg.close();else dlg.removeAttribute("open");onClosed()}
  function onClosed(){document.documentElement.classList.remove("jp-lock");current=null;
    if(lastFocus&&lastFocus.focus&&document.contains(lastFocus))lastFocus.focus()}
  dlg.addEventListener("close",onClosed);
  $("#jp-m-close").addEventListener("click",closeModal);
  dlg.addEventListener("click",function(e){if(e.target===dlg)closeModal()});   /* click on backdrop */

  /* ---------- language ---------- */
  function applyLang(){
    state.lang=document.documentElement.lang==="en"?"en":"ar";
    $("#jp-dd-label").textContent=tx("choose");$("#jp-sd-label").textContent=tx("chooseStars");
    var s=$("#jp-hero-sub");if(s)s.textContent=tx("heroSub");
    refresh(false);fillModal();
  }
  document.addEventListener("langchange",applyLang);
  document.addEventListener("DOMContentLoaded",applyLang);
  if(document.readyState!=="loading")applyLang();
})();
