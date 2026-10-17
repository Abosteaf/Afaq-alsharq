/* Light/dark theme toggle. Light is the default; the choice is saved in localStorage ("afaq-theme"). */
(function(){
  var KEY="afaq-theme",root=document.documentElement;
  var L={ar:{dark:"التبديل إلى الوضع الداكن",light:"التبديل إلى الوضع الساطع"},en:{dark:"Switch to dark mode",light:"Switch to light mode"}};
  function get(){try{return localStorage.getItem(KEY)==="dark"?"dark":"light"}catch(e){return root.dataset.theme==="dark"?"dark":"light"}}
  function labels(){
    var t=root.dataset.theme==="dark"?"dark":"light",d=L[root.lang==="en"?"en":"ar"],txt=t==="dark"?d.light:d.dark;
    document.querySelectorAll(".theme-btn").forEach(function(b){b.setAttribute("aria-label",txt);b.title=txt;b.setAttribute("aria-pressed",t==="dark")});
  }
  function apply(t,animate){
    if(animate&&!matchMedia("(prefers-reduced-motion:reduce)").matches){root.classList.add("theme-anim");setTimeout(function(){root.classList.remove("theme-anim")},400)}
    if(t==="dark")root.dataset.theme="dark";else root.removeAttribute("data-theme");
    try{localStorage.setItem(KEY,t)}catch(e){}
    labels();
  }
  document.addEventListener("DOMContentLoaded",function(){
    apply(get(),false);
    document.querySelectorAll(".theme-btn").forEach(function(b){b.addEventListener("click",function(){apply(root.dataset.theme==="dark"?"light":"dark",true)})});
  });
  document.addEventListener("langchange",labels);
})();
