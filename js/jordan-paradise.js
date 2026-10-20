/* أردننا جنة — city filter, trip cards, details modal. Data: jordan-trips-data.js */
(function(){
  "use strict";
  var CITIES=(window.JP_CITIES||[]).filter(function(c){return !c.hidden}),TRIPS=window.JP_TRIPS||[],DEF=window.JP_DEFAULT_IMAGE||"../assets/images/cards/petra.jpg";
  /* hotel-rating filter: ONE fixed list shared by every page that has the filter (order is final).
     Options are never hidden; a rating with no programs simply shows the "no programs match" message. */
  var STARS=[{key:"all",ar:"جميع التصنيفات",en:"All ratings"},{key:"2",ar:"⭐⭐ نجمتين",en:"⭐⭐ 2 Stars"},{key:"3",ar:"⭐⭐⭐ 3 نجوم",en:"⭐⭐⭐ 3 Stars"},{key:"4",ar:"⭐⭐⭐⭐ 4 نجوم",en:"⭐⭐⭐⭐ 4 Stars"},{key:"5",ar:"⭐⭐⭐⭐⭐ 5 نجوم",en:"⭐⭐⭐⭐⭐ 5 Stars"}];
  var state={city:"all",stars:"all",lang:"ar"};
  var $=function(s,r){return(r||document).querySelector(s)};
  var T={ar:{choose:"اختر المدينة",chooseStars:"تصنيف الفندق",reset:"إعادة ضبط الفلاتر",currency:"د.أ",priceTbd:"السعر يُحدد لاحقًا",details:"التفاصيل",close:"إغلاق",dTitle:"تفاصيل الرحلة",iTitle:"مسار الرحلة",
    empty:"لا توجد رحلات متاحة لهذه الوجهة حاليًا، ترقبوا برامجنا القادمة.",emptyNone:"لا توجد برامج متاحة حاليًا في هذا القسم، ترقبوا برامجنا القادمة.",emptyFilter:"لا توجد برامج مطابقة للفلاتر المحددة",emptyStars:"لا توجد برامج بهذا التصنيف في هذه الوجهة. جرّب تصنيفًا آخر أو أعد ضبط الفلاتر.",
    star:["","","نجمتين","3 نجوم","4 نجوم","5 نجوم"],heroSub:"اختر وجهتك واستعرض برامجنا السياحية في أنحاء المملكة"},
   en:{choose:"Choose a city",chooseStars:"Hotel rating",reset:"Reset filters",currency:"JOD",priceTbd:"Price to be announced",details:"Details",close:"Close",dTitle:"Trip Details",iTitle:"Itinerary",
    empty:"No trips are available for this destination right now. Stay tuned for our upcoming programs.",emptyNone:"No programs are available in this section right now. Stay tuned for our upcoming programs.",emptyFilter:"No programs match the selected filters",emptyStars:"No programs match this rating in this destination. Try another rating or reset the filters.",
    star:["","","2 stars","3 stars","4 stars","5 stars"],heroSub:"Pick your destination and browse our tours across the Kingdom"}};
  var MSG=window.JP_MSGS||{};   /* optional per-page text overrides, e.g. {ar:{emptyFilter:"..."}} */
  var tx=function(k){var o=MSG[state.lang];return o&&o[k]!==undefined?o[k]:T[state.lang][k]};
  var itemName=function(c){return state.lang==="en"?c.en:c.ar};
  var tripName=function(t){return state.lang==="en"&&t.nameEn?t.nameEn:t.name};
  var fmt=function(n){return String(n)};
  /* price is optional: placeholder programs (price null/empty) show "price to be announced", never a made-up number */
  var hasPrice=function(t){return t.price!==null&&t.price!==undefined&&t.price!==""};
  var priceHtml=function(t){if(t.priceText&&t.priceText[state.lang])return t.priceText[state.lang];return hasPrice(t)?'<b>'+fmt(t.price)+'</b> '+tx("currency"):'<span class="trip-tbd">'+tx("priceTbd")+'</span>'};
  var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
  var grid=$("#jp-grid"),empty=$("#jp-empty"),resetBtn=$("#jp-reset");

  /* ---------- dropdowns (one factory for city + stars) ---------- */
  function makeDD(id,items,stateKey){
    var dd=$("#"+id),btn=$("#"+id+"-btn"),list=$("#"+id+"-list"),val=$("#"+id+"-val"),active=0;
    if(!dd)return {build:function(){}};   /* this filter is not on the page */
    function cur(){return items.filter(function(c){return c.key===state[stateKey]})[0]||items[0]}
    function build(){
      list.innerHTML=items.map(function(c,i){
        return '<li role="option" id="'+id+'-opt-'+i+'" data-key="'+c.key+'"'+(c.parent?' class="jp-sub"':'')+' aria-selected="'+(c.key===state[stateKey])+'">'+esc(itemName(c))+'</li>';
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
  var ddCity=CITIES.length?makeDD("jp-dd",CITIES,"city"):makeDD("jp-none",[],"city"),ddStars=makeDD("jp-sd",STARS,"stars");
  function refresh(animate){ddCity.build();ddStars.build();render(animate)}
  if(resetBtn)resetBtn.addEventListener("click",function(){state.city="all";state.stars="all";refresh(true)});   /* pages without filters have no reset button */

  /* ---------- cards ---------- */
  function cityOk(t){
    if(state.city==="all")return true;
    var it=CITIES.filter(function(c){return c.key===state.city})[0];
    return it&&it.category?t.category===it.category:[].concat(t.city).indexOf(state.city)>-1}   /* t.city may be a list */   /* category item = group of destinations */
  function visible(){return TRIPS.filter(function(t){
    return cityOk(t)&&(state.stars==="all"||String(t.stars)===state.stars)})}   /* both filters: AND */
  function starBadge(t){
    var n=+t.stars;if(!(n>=2&&n<=5))return"";   /* no stars => no badge, never a default */
    return '<span class="trip-stars"><span class="ts-e" aria-hidden="true">'+starEmoji(n)+'</span><span class="ts-t">'+esc(tx("star")[n])+'</span></span>';
  }
  function starEmoji(n){return new Array(n+1).join("\u2B50")}
  function subLine(t){var v=state.lang==='en'&&t.subEn?t.subEn:t.sub;return v?'<p class="trip-sub">'+esc(v)+'</p>':''}
  function render(animate){
    var items=visible();
    grid.innerHTML=items.map(function(t){
      return '<article class="trip" data-id="'+esc(t.id)+'"><div class="trip-img"><img src="'+esc(t.image||DEF)+'" alt="" width="800" height="500" loading="lazy">'+starBadge(t)+'</div>'+
        '<div class="trip-body"><h3 class="trip-title">'+esc(tripName(t))+'</h3>'+subLine(t)+
        '<div class="trip-foot"><span class="trip-price">'+priceHtml(t)+'</span>'+
        '<button type="button" class="trip-btn" data-id="'+esc(t.id)+'">'+tx("details")+'</button></div></div></article>';
    }).join("");
    [].forEach.call(grid.querySelectorAll("img"),function(im){
      im.addEventListener("error",function(){if(im.dataset.fb)return;im.dataset.fb=1;im.src=DEF});
    });
    empty.hidden=items.length>0;
    grid.hidden=items.length===0;
    empty.textContent=!TRIPS.length?tx("emptyNone"):(state.stars!=="all"||(window.JP_MSGS&&state.city!=="all"))?tx("emptyFilter"):tx("empty");
    if(resetBtn)resetBtn.textContent=tx("reset");
    if(animate){[grid,empty].forEach(function(el){el.classList.remove("jp-fade");void el.offsetWidth;el.classList.add("jp-fade")})}
  }
  grid.addEventListener("click",function(e){
    var card=e.target.closest(".trip");if(card)openModal(card.dataset.id,card.querySelector(".trip-btn"));
  });

  /* ---------- modal ---------- */
  var dlg=$("#jp-modal"),mTitle=$("#jp-m-title"),mPrice=$("#jp-m-price"),mD=$("#jp-m-details"),mI=$("#jp-m-itin"),lastFocus=null,current=null;
  var mStars=document.createElement("span");mStars.className="jp-m-stars";mStars.hidden=true;if(mPrice&&mPrice.parentNode)mPrice.parentNode.appendChild(mStars);
  function fillModal(){
    if(!current)return;
    var n=+current.stars,ok=n>=2&&n<=5;mStars.hidden=!ok;mStars.textContent=ok?starEmoji(n)+" "+tx("star")[n]:"";
    mTitle.textContent=tripName(current);
    mPrice.innerHTML=priceHtml(current);
    $("#jp-m-dh").textContent=tx("dTitle");$("#jp-m-ih").textContent=tx("iTitle");
    $("#jp-m-close").setAttribute("aria-label",tx("close"));
    var en=state.lang==="en";mD.innerHTML=(en&&current.detailsEn)||current.details||"";mI.innerHTML=(en&&current.itineraryEn)||current.itinerary||"";
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
    var l1=$("#jp-dd-label"),l2=$("#jp-sd-label");var cl=window.JP_CITY_LABEL;if(l1)l1.textContent=cl?cl[state.lang]:tx("choose");if(l2)l2.textContent=tx("chooseStars");
    var s=$("#jp-hero-sub");if(s)s.textContent=tx("heroSub");
    refresh(false);fillModal();
  }
  document.addEventListener("langchange",applyLang);
  document.addEventListener("DOMContentLoaded",applyLang);
  if(document.readyState!=="loading")applyLang();
})();
