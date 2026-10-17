document.addEventListener("DOMContentLoaded",()=>{
  const b=document.querySelector(".menu-btn"),n=document.querySelector(".nav-links");
  if(!b||!n)return;
  b.addEventListener("click",()=>{const o=n.classList.toggle("open");b.setAttribute("aria-expanded",o)});
  n.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{n.classList.remove("open");b.setAttribute("aria-expanded","false")}));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")n.classList.remove("open")});
});
