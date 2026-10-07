(function(){
'use strict';
// No external robot imagery — class avatars are text badges, hero art is pure CSS.
var toast=document.getElementById('nivalToast'),timer;
function say(m){if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(function(){toast.classList.remove('show')},1700);}

var hero=document.getElementById('nivalHeroImg'),play=document.getElementById('nivalPlay'),eye=document.getElementById('nivalEye');
function isAwake(){return !!(hero&&hero.classList.contains('awake'))||!!(play&&play.classList.contains('active'));}
function setAwake(on,msg){
  if(hero)hero.classList.toggle('awake',on);
  if(play){play.classList.toggle('active',on);play.setAttribute('aria-pressed',String(on));}
  if(eye)eye.setAttribute('aria-pressed',String(on));
  if(msg)say(msg);
}
if(play)play.addEventListener('click',function(){
  var on=!isAwake();
  setAwake(on,on?'Board mode activated — pick your class':'Paused');
  if(on){var m=document.getElementById('modules');if(m)setTimeout(function(){m.scrollIntoView({behavior:'smooth'})},350);}
});
if(eye)eye.addEventListener('click',function(){
  var on=!isAwake();
  setAwake(on,on?'Previewing AI identity':'Preview paused');
});

var CLASSES=[
  {label:'Class 9',href:'pages/class9/index.html',hue:'2',sat:'1.2',count:'Class 9',sub:'AI + IT · 417 / 402'},
  {label:'Class 10',href:'pages/class10/index.html',hue:'0',sat:'.42',count:'Class 10',sub:'AI + IT · board ready'},
  {label:'Class 11',href:'pages/class11/python.html',hue:'6',sat:'1.3',count:'Class 11',sub:'CS Python 083'},
  {label:'Class 12',href:'pages/class12/python.html',hue:'0',sat:'.2',count:'Class 12',sub:'CS Python 083'},
  {label:'Quiz',href:'pages/quiz/index.html',hue:'0',sat:'.68',count:'Quiz',sub:'MCQs + practice'}
];
var avatars=Array.prototype.slice.call(document.querySelectorAll('.nival-avatar'));
var startLabel=document.getElementById('nivalStartLabel'),countEl=document.getElementById('nivalCountNum'),countSub=document.getElementById('nivalCountSub'),current=0;
function choose(i,opts){
  opts=opts||{};
  current=((i%CLASSES.length)+CLASSES.length)%CLASSES.length;
  avatars.forEach(function(b,n){b.classList.toggle('active',n===current);});
  if(hero){hero.style.setProperty('--hero-hue',CLASSES[current].hue+'deg');hero.style.setProperty('--hero-sat',CLASSES[current].sat);}
  if(startLabel)startLabel.textContent=CLASSES[current].label;
  if(countEl)countEl.textContent=CLASSES[current].count;
  if(countSub)countSub.textContent=CLASSES[current].sub;
  if(!opts.silent)say(CLASSES[current].label+' selected — tap again to open');
}
avatars.forEach(function(b,i){
  b.addEventListener('click',function(){
    if(i===current){location.href=b.getAttribute('data-href')||CLASSES[i].href;return;}
    choose(i);
  });
});
var shuffle=document.getElementById('nivalShuffle'),next=document.getElementById('nivalNext');
if(shuffle)shuffle.addEventListener('click',function(){choose(current+1);});
if(next)next.addEventListener('click',function(){choose(current+1);});
choose(0,{silent:true});
})();
