/* AFAQ motion layer — injects decorative, non-interactive travel animations
   (planes, ship, bus, clouds on inner banners, routes, waves), scroll-reveal and button ripples.
   Pure vanilla JS, no libraries. Does nothing when the user prefers reduced motion
   (CSS in motion.css is also wrapped in prefers-reduced-motion:no-preference). */
(function(){
  "use strict";
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(reduce)return;

  var PLANE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>';
  var CLOUD='<svg viewBox="0 0 200 80" aria-hidden="true"><circle cx="62" cy="50" r="22"/><circle cx="96" cy="36" r="29"/><circle cx="136" cy="48" r="24"/><rect x="40" y="46" width="124" height="28" rx="14"/></svg>';
  var SHIP='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 15h20l-3 6H5z"/><path d="M5 13V8h14v5z"/><path d="M8 8V4h8v4z"/><path d="M11 1h2v3h-2z"/></svg>';
  var BAG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6v2h4a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4zm1.500 1.500V5h3v-.5zM7 8v10h1.500V8zm8.500 0v10H17V8z" fill-rule="evenodd"/></svg>';
  /* cruise ship (bow to the right) and tour coach (front to the right) — flat, light SVGs */
  var CRUISE='<svg viewBox="0 0 220 96" aria-hidden="true">'+
    '<g class="fx-smoke"><circle cx="126" cy="16" r="4"/><circle cx="126" cy="16" r="4"/><circle cx="126" cy="16" r="4"/></g>'+
    '<path fill="#ff7300" d="M118 22h16l2 15h-20z"/><path fill="#003a8c" d="M117 22h18v5h-18z"/>'+
    '<path fill="#fff" d="M92 34h54a4 4 0 014 4v6H88v-6a4 4 0 014-4z"/>'+
    '<path fill="#fff" d="M62 44h112a5 5 0 015 5v6H57v-6a5 5 0 015-5z"/>'+
    '<path fill="#fff" d="M44 55h140a6 6 0 016 6v8H38v-8a6 6 0 016-6z"/>'+
    '<path fill="none" stroke="#0061d1" stroke-width="3.500" stroke-dasharray="4.500 4" d="M98 39h46M68 49.500h104M50 60h132"/>'+
    '<path fill="#cfe0f7" d="M100 34h42v1.500h-42z"/>'+
    '<path fill="#003a8c" d="M12 68h196q8 0 4 6l-14 14a8 8 0 01-6 3H38a10 10 0 01-8-4z"/>'+
    '<path fill="#ff7300" d="M15 73h198l-3 3.500H18z"/><path fill="#ffd43b" d="M17 77.500h190l-2.500 2H20z"/>'+
    '</svg>';
  var COACH='<svg viewBox="0 0 180 76" aria-hidden="true">'+
    '<defs><clipPath id="fx-bus-clip"><path d="M12 10h138q20 0 24 20l2 22q0 6-6 6H12q-8 0-8-8V18q0-8 8-8z"/></clipPath></defs>'+
    '<ellipse cx="92" cy="71" rx="82" ry="3" fill="#000" opacity=".22"/>'+
    '<rect x="48" y="5" width="62" height="6" rx="3" fill="#d6e3f6"/>'+
    '<g clip-path="url(#fx-bus-clip)"><rect x="0" y="0" width="180" height="70" fill="#fff"/>'+
    '<rect x="0" y="40" width="180" height="9" fill="#0061d1"/><rect x="0" y="49" width="180" height="4.500" fill="#ff7300"/><rect x="0" y="53.500" width="180" height="3" fill="#ffd43b"/></g>'+
    '<path fill="#0b3a7a" d="M12 16h112v22H12a4 4 0 01-4-4V20a4 4 0 014-4z"/>'+
    '<path fill="#0b3a7a" d="M129 16h20q14 0 17 16l.5 6H129z"/>'+
    '<path stroke="#fff" stroke-width="2.200" d="M40 16v22M68 16v22M96 16v22M126 16v22"/>'+
    '<path fill="#fff" opacity=".28" d="M20 16h14l-10 22H12z"/><path fill="#fff" opacity=".22" d="M138 17h8l-8 21h-7z"/>'+
    '<circle cx="174" cy="45" r="3" fill="#ffd43b"/><rect x="5" y="44" width="3" height="5" rx="1.500" fill="#e63946"/>'+
    '<g class="fx-wheels"><g transform="translate(36 60)"><circle r="11" fill="#17243b"/><g class="fx-wheel"><circle r="6" fill="#e8eef8"/><path stroke="#17243b" stroke-width="1.800" d="M-5 0h10M0 -5v10"/></g></g>'+
    '<g transform="translate(140 60)"><circle r="11" fill="#17243b"/><g class="fx-wheel"><circle r="6" fill="#e8eef8"/><path stroke="#17243b" stroke-width="1.800" d="M-5 0h10M0 -5v10"/></g></g></g>'+
    '</svg>';
  var PIN='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 00-7 7c0 5.250 7 13 7 13s7-7.750 7-13a7 7 0 00-7-7zm0 9.500A2.500 2.500 0 119.500 9 2.500 2.500 0 0112 11.500z"/></svg>';
  var WAVE='<svg viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22C50 6 100 38 200 22S350 6 400 22V40H0z"/></svg>';

  function h(tag,cls,html,style){
    var e=document.createElement(tag);
    if(cls)e.className=cls;
    if(html)e.innerHTML=html;
    if(style)e.style.cssText=style;
    e.setAttribute("aria-hidden","true");
    return e;
  }
  function plane(y,t,delay,size,trail,rev,extra){
    var w=h("div","fx-plane-wrap"+(rev?" rev":"")+(extra?" "+extra:""),
      '<div class="fx-trail"></div><div class="fx-plane">'+PLANE+'</div>',
      "--y:"+y+";--t:"+t+"s;--dl:"+delay+"s;--s:"+size+"px;--tl:"+trail+"px");
    return w;
  }
  function cloud(y,w,t,delay,cls){
    return h("div","fx-cloud "+(cls||""),CLOUD,"top:"+y+";width:"+w+"px;height:"+(w*.4)+"px;--t:"+t+"s;--dl:"+delay+"s");
  }
  function ship(){
    return h("div","fx-ship-wrap",'<div class="fx-ship">'+CRUISE+'</div><div class="fx-sea">'+WAVE+'</div>');
  }
  function bus(){
    return h("div","fx-lane",'<div class="fx-road"></div><div class="fx-bus-wrap"><div class="fx-bus">'+COACH+'</div></div>');
  }
  function layer(){return h("div","fx-layer")}

  var body=document.body,key=body.getAttribute("data-titlekey")||"";
  var path=location.pathname;
  var isHome=!!document.querySelector(".hero#home");

  /* ---------- 1. home hero: planes with contrails + cruise ship (sea) + tour bus (road) ---------- */
  if(isHome){
    var hero=document.querySelector(".hero"),sky=layer();
    sky.appendChild(plane("13%",26,0,50,190,false,"p1"));
    sky.appendChild(plane("86%",34,-14,36,130,true,"p2"));
    sky.appendChild(plane("27%",44,-30,26,90,false,"p3"));
    sky.appendChild(bus());
    sky.appendChild(ship());
    hero.insertBefore(sky,hero.querySelector(".hero-content"));
    watch(hero,sky);
  }

  /* ---------- 2. section / page banners ---------- */
  var bannerSets={
    c1:{clouds:2,planes:[["16%",32,0,34,120,false]]},                         /* domestic trips: gentle travel */
    c7:{clouds:2,planes:[["18%",28,0,40,150,false],["78%",38,-16,30,110,true]]}, /* international trips */
    c6:{clouds:2,planes:[["16%",24,0,44,170,false],["74%",30,-12,34,130,true],["46%",40,-24,24,90,false,"p3"]]}, /* flight tickets */
    c4:{clouds:2,sun:true,planes:[]},                                          /* Jordan is our paradise: nature, calm */
    c5:{clouds:0,planes:[]},                                                   /* Hajj & Umrah: quiet — photo only */
    c2:{clouds:2,planes:[]},
    c3:{clouds:2,planes:[]}
  };
  var cfg=bannerSets[key];
  if(!isHome&&cfg){
    var host=document.querySelector(".jp-hero-bg")||document.querySelector(".page-hero");
    if(host&&(cfg.clouds||cfg.planes.length||cfg.sun)){
      var L=layer();
      if(document.querySelector(".jp-hero--banner"))L.classList.add("fx-dark");
      if(cfg.sun)L.appendChild(h("div","fx-sun"));
      if(cfg.clouds>0)L.appendChild(cloud("10%",150,95,-25,"c1"));
      if(cfg.clouds>1)L.appendChild(cloud("66%",120,120,-80,"c2"));
      cfg.planes.forEach(function(p){L.appendChild(plane.apply(null,p))});
      host.appendChild(L);
      watch(host,L);
    }
  }

  /* ---------- 3. home: route divider + About icons ---------- */
  var programs=document.getElementById("programs");
  if(programs){
    var rt=h("div","fx-route",
      '<svg viewBox="0 0 1000 84" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+
      '<path id="fx-rt" class="rt-line" d="M-20 62C180 6 330 8 500 44S820 82 1020 20"/>'+
      '<circle class="rt-dot" cx="120" cy="34" r="4"/><circle class="rt-dot" cx="880" cy="58" r="4"/>'+
      '<g class="rt-plane"><path transform="translate(-14 -14) scale(1.15)" d="M21 16v-2l-8-5V3.500a1.500 1.500 0 00-3 0V9l-8 5v2l8-2.500V19l-2 1.500V22l3.500-1 3.500 1v-1.500L13 19v-5.500z"/>'+
      '<animateMotion dur="14s" repeatCount="indefinite" rotate="auto"><mpath href="#fx-rt"/></animateMotion></g></svg>');
    programs.appendChild(rt);
    var svg=rt.querySelector("svg");
    /* the plane glyph points "up"; rotate it so it points along the path */
    var pg=svg.querySelector(".rt-plane path");pg.setAttribute("transform","rotate(90) translate(-12 -12) scale(1.15)");
    watchSvg(rt,svg);
  }
  var about=document.getElementById("about");
  if(about){
    about.appendChild(h("div","fx-icon",SHIP,"top:14%;inset-inline-start:4%;--t:8s"));
    about.appendChild(h("div","fx-icon o",BAG,"bottom:12%;inset-inline-end:5%;--t:6.500s;--dl:-2s"));
    about.appendChild(h("div","fx-icon",PLANE,"top:10%;inset-inline-end:8%;--s:44px;--t:9s;--dl:-4s"));
  }

  /* ---------- 4. home cards: small thematic touches ---------- */
  function cardFx(sel,build,needCq){
    var c=document.querySelector(sel);if(!c)return;
    var box=h("span","card-fx");build(box);c.appendChild(box);
    if(needCq)c.classList.add("has-fx");
  }
  cardFx('.card[href$="aqaba-overnight.html"]',function(b){b.appendChild(h("span","cf-pin",PIN))});
  cardFx('.card[href$="international-trips.html"]',function(b){b.appendChild(h("span","cf-plane",PLANE,"--dl:-2s"))},true);
  cardFx('.card[href$="flight-tickets.html"]',function(b){b.appendChild(h("span","cf-plane",PLANE,"--dl:-5s"))},true);
  cardFx('.card[href$="jordan-is-our-paradise.html"]',function(b){b.appendChild(h("span","cf-sun"))});
  cardFx("#ev-open",function(b){
    b.appendChild(h("span","cf-wave",WAVE+WAVE));
    b.appendChild(h("span","cf-wave b",WAVE+WAVE));
  });
  /* Hajj & Umrah card and page: intentionally no travel/decorative motion */

  /* events popup header: soft waves */
  var evHead=document.querySelector(".ev-head");
  if(evHead){
    evHead.insertBefore(h("span","cf-wave",WAVE+WAVE),evHead.firstChild);
    evHead.insertBefore(h("span","cf-wave b",WAVE+WAVE),evHead.firstChild);
  }

  /* ---------- 5. scroll reveal ---------- */
  var groups=[
    [".sec-title",0,""],
    [".about .logo-plate",0,"fx-zoom"],[".about-text",120,""],
    [".ct-card",90,""],[".hours",0,"fx-zoom"],
    [".map-wrap",0,""],[".loc-card",140,""],
    [".back",0,""],[".details",0,""],[".jp-empty",0,""]
  ];
  var cards=[].slice.call(document.querySelectorAll(".cards>.card"));
  cards.forEach(function(el,i){tag(el,(i%3)*90,"fx-zoom")});
  groups.forEach(function(g){
    [].slice.call(document.querySelectorAll(g[0])).forEach(function(el,i){tag(el,g[1]?Math.min(i,4)*g[1]:0,g[2])});
  });
  function tag(el,delay,cls){
    if(el.getBoundingClientRect().top<innerHeight*.9&&scrollY===0&&el.closest(".hero,.jp-hero,.page-hero"))return;
    el.classList.add("fx-reveal");if(cls)el.classList.add(cls);
    el.style.setProperty("--d",delay+"ms");
  }
  var targets=[].slice.call(document.querySelectorAll(".fx-reveal"));
  function done(el){
    /* after the entrance finishes, drop the helper classes so the element's own hover transitions are untouched */
    var d=parseInt(el.style.getPropertyValue("--d"))||0;
    setTimeout(function(){el.classList.remove("fx-reveal","fx-zoom","in");el.style.removeProperty("--d")},900+d);
  }
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);done(e.target)}});
    },{threshold:.12,rootMargin:"0px 0px -6% 0px"});
    targets.forEach(function(el){io.observe(el)});
  }else{targets.forEach(function(el){el.classList.remove("fx-reveal","fx-zoom")})}

  /* ---------- 6. button ripple ---------- */
  document.addEventListener("pointerdown",function(e){
    var b=e.target.closest&&e.target.closest(".btn");
    if(!b||e.button>0)return;
    var r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2;
    var s=document.createElement("span");s.className="fx-ripple";
    s.style.cssText="width:"+d+"px;height:"+d+"px;left:"+(e.clientX-r.left-d/2)+"px;top:"+(e.clientY-r.top-d/2)+"px";
    b.appendChild(s);setTimeout(function(){s.remove()},650);
  },{passive:true});

  /* ---------- helpers: pause decor when off-screen / tab hidden ---------- */
  function watch(host,el){
    if(!("IntersectionObserver" in window))return;
    new IntersectionObserver(function(es){
      es.forEach(function(e){el.classList.toggle("fx-paused",!e.isIntersecting)});
    }).observe(host);
    document.addEventListener("visibilitychange",function(){el.classList.toggle("fx-paused",document.hidden)});
  }
  function watchSvg(host,svg){
    if(!("IntersectionObserver" in window)||!svg.pauseAnimations)return;
    new IntersectionObserver(function(es){
      es.forEach(function(e){
        host.classList.toggle("fx-paused",!e.isIntersecting);
        if(e.isIntersecting)svg.unpauseAnimations();else svg.pauseAnimations();
      });
    }).observe(host);
  }
})();
