(function(){
'use strict';
var ASSETS={
  heroFront:'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/658f62c6-fdb2-41b9-aa0f-10837f9e72cb.png',
  heroBack:'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260914_123603_5ac5732a-900b-4919-9d9c-3c454194b0a5.png',
  material:'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/96ef2bcd-ed69-4b7e-ab83-8a18d2129d99.png',
  avatars:[
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/caf08036-c63c-4d0c-9b81-43c5a7a49343.png',
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/599a5a28-c9f1-44f9-b01b-adb8b22e8c12.png',
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/fc804805-b23c-40ba-97b0-9ab2ba3efb5d.png',
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0cb0c1f0-f84a-47bb-bfa1-43b6c7f1575d.png',
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/64e651b1-a8ba-44e8-8fbe-e85fcd6e5cf0.png'
  ]
};
function setSrc(sel,src){document.querySelectorAll(sel).forEach(function(el){el.src=src;});}
setSrc('[data-nival-hero]',ASSETS.heroFront);
setSrc('[data-nival-front]',ASSETS.heroFront);
setSrc('[data-nival-back]',ASSETS.heroBack);
setSrc('[data-nival-material]',ASSETS.material);
ASSETS.avatars.forEach(function(src,i){setSrc('[data-nival-av="'+i+'"]',src);});

var toast=document.getElementById('nivalToast'),timer;
function say(m){if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(function(){toast.classList.remove('show')},1700);}

var hero=document.getElementById('nivalHeroImg'),play=document.getElementById('nivalPlay'),eye=document.getElementById('nivalEye');
function setAwake(on,msg){
  if(hero)hero.classList.toggle('awake',on);
  if(play){play.classList.toggle('active',on);play.setAttribute('aria-pressed',String(on));}
  if(eye)eye.setAttribute('aria-pressed',String(on));
  if(msg)say(msg);
}
if(play)play.addEventListener('click',function(){
  var on=!hero.classList.contains('awake');
  setAwake(on,on?'Board mode activated — pick your class':'Paused');
  if(on){var m=document.getElementById('modules');if(m)setTimeout(function(){m.scrollIntoView({behavior:'smooth'})},350);}
});
if(eye)eye.addEventListener('click',function(){
  var on=!hero.classList.contains('awake');
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

// spotlight mask on hero
(function(){
  if(!hero)return;
  var back=hero.querySelector('.back'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),R=185;
  var mouse={x:-9999,y:-9999},sm={x:-9999,y:-9999};
  canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0';
  hero.style.position='relative';hero.appendChild(canvas);
  function size(){canvas.width=hero.clientWidth;canvas.height=hero.clientHeight;}
  size();addEventListener('resize',size,{passive:true});
  hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect(),sx=hero.clientWidth/r.width,sy=hero.clientHeight/r.height;
    mouse.x=(e.clientX-r.left)*sx;mouse.y=(e.clientY-r.top)*sy;
  });
  hero.addEventListener('pointerleave',function(){mouse.x=-9999;mouse.y=-9999;});
  function render(x,y){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(x<-500)return;
    var g=ctx.createRadialGradient(x,y,0,x,y,R);
    g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.62,'rgba(255,255,255,1)');
    g.addColorStop(.8,'rgba(255,255,255,.5)');g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,R,0,Math.PI*2);ctx.fill();
    try{var url=canvas.toDataURL();back.style.maskImage='url('+url+')';back.style.webkitMaskImage='url('+url+')';}catch(e){}
  }
  (function loop(){sm.x+=(mouse.x-sm.x)*.1;sm.y+=(mouse.y-sm.y)*.1;render(sm.x,sm.y);requestAnimationFrame(loop);})();
})();
})();
