/* Hero slideshow: add/remove <img class="slide"> in index.html to change slides. */
document.addEventListener("DOMContentLoaded",()=>{
  const s=[...document.querySelectorAll(".hero .slide")];if(s.length<2)return;
  const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(reduce)s.forEach(x=>x.style.transition="none");
  let i=0;
  const pre=n=>{const im=s[n];if(im&&im.loading==="lazy"){im.loading="eager"}};
  setInterval(()=>{
    s[i].classList.remove("active");i=(i+1)%s.length;s[i].classList.add("active");pre((i+1)%s.length);
  },2000);
  pre(1);
});
