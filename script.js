const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>navLinks.classList.toggle('show'));
document.querySelectorAll('.nav-links a').forEach(l=>l.addEventListener('click',()=>navLinks.classList.remove('show')));

const slideIds=["home","about","education","skills","certificates","contact","thankyou"];
let currentSlide=0;
const sections=document.querySelectorAll('section');
const navA=document.querySelectorAll('.nav-links a');
const dots=document.querySelectorAll('.dot');
const nextBtn=document.getElementById('nextBtn');

function updateActive(){
  let current='';
  sections.forEach((sec,i)=>{
    if(window.pageYOffset >= sec.offsetTop - 250){current=sec.id; currentSlide=i;}
  });
  navA.forEach(a=>{a.classList.remove('active'); if(a.getAttribute('href')===`#${current}`)a.classList.add('active')});
  dots.forEach((d,i)=>{d.classList.toggle('active',i===currentSlide)});
  // hide next btn on last slide
  nextBtn.style.display = currentSlide===slideIds.length-1? 'none' : 'grid';
}
window.addEventListener('scroll',updateActive);

nextBtn.addEventListener('click',()=>{
  currentSlide=(currentSlide+1)%slideIds.length;
  document.getElementById(slideIds[currentSlide]).scrollIntoView({behavior:'smooth'});
});

document.addEventListener('keydown',(e)=>{
  if(e.key==='ArrowDown' || e.key===' '){
    e.preventDefault();
    currentSlide=Math.min(currentSlide+1,slideIds.length-1);
    document.getElementById(slideIds[currentSlide]).scrollIntoView({behavior:'smooth'});
  }
  if(e.key==='ArrowUp'){
    e.preventDefault();
    currentSlide=Math.max(currentSlide-1,0);
    document.getElementById(slideIds[currentSlide]).scrollIntoView({behavior:'smooth'});
  }
});

// Swipe for mobile
let touchStartY=0;
document.addEventListener('touchstart',e=>{touchStartY=e.touches[0].clientY});
document.addEventListener('touchend',e=>{
  let diff=touchStartY-e.changedTouches[0].clientY;
  if(Math.abs(diff)>60){
    if(diff>0){currentSlide=Math.min(currentSlide+1,slideIds.length-1);}else{currentSlide=Math.max(currentSlide-1,0);}
    document.getElementById(slideIds[currentSlide]).scrollIntoView({behavior:'smooth'});
  }
});