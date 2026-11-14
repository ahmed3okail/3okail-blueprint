/* 3okail Blueprint · shared behaviour: language, theme, header, footer, reveal */
(function(){
"use strict";
var root=document.documentElement;
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function $(id){return document.getElementById(id)}

var C={
 en:{coT:'Companies I have worked with',toolT:'Tools I use',langBtn:'العربية',nav:['Home','Career','EVM lab','Delay lab','Contact'],fullName:'Ahmed Abd El-Basset AbuOkail',titleSfx:'Ahmed AbuOkail',home:'← Home'},
 ar:{coT:'شركات عملت بها',toolT:'الأدوات اللي بستخدمها',langBtn:'English',nav:['الرئيسية','المسيرة','معمل EVM','معمل التأخير','تواصل'],fullName:'أحمد عبد الباسط أبوعقيل',titleSfx:'أحمد أبوعقيل',home:'→ الرئيسية'}
};
var NAV=[['index.html','home'],['career.html','career'],['evm.html','evm'],['delay.html','delay'],['index.html#contact','contact']];
var page=null, lang='en';

var TOOLS=[['p6','Primavera P6'],['excel','Excel'],['powerbi','Power BI'],['autocad','AutoCAD'],['word','Word'],['powerpoint','PowerPoint'],['ai',{en:'AI tools',ar:'أدوات AI'}]];
var COS=[{id:'dmc',n:'DMC-CURVE',m:'DMC'},{id:'eco',n:'Ecologi',m:'EC'},{id:'tab',n:{en:'Tabarak',ar:'تبارك'},m:'TB'},{id:'acc',n:{en:'Alexandria Construction · TMG',ar:'الإسكندرية للإنشاءات · TMG'},m:'TMG'}];
/* company ids that have a real logo file at assets/logos/<id>.png; others show a monogram */
var LOGOS={};
function tr(v){return typeof v==='string'?v:(v[lang]||v.en)}
var Site={
 esc:esc, $:$, store:store,
 coLogo:function(id,cls){var c=COS.filter(function(x){return x.id===id})[0];if(!c)return '';
   return '<span class="co-logo'+(cls?' '+cls:'')+'">'+(LOGOS[id]?'<img src="assets/logos/'+id+'.png" alt="'+esc(tr(c.n))+'">':'<b>'+c.m+'</b>')+'</span>'},
 toolIcon:function(id){return '<img class="tool-ic" src="assets/tools/'+id+'.svg" alt="" width="22" height="22">'},
 brands:function(){
   var co=$('coRow'),tl=$('toolRow');
   if(co)co.innerHTML=COS.map(function(c){return '<div class="co">'+Site.coLogo(c.id)+'<span>'+esc(tr(c.n))+'</span></div>'}).join('');
   if(tl)tl.innerHTML=TOOLS.map(function(x){return '<div class="tool">'+Site.toolIcon(x[0])+'<span>'+esc(tr(x[1]))+'</span></div>'}).join('');
 },
 get lang(){return lang},
 t:function(k){var P=page&&page.T||{};
   if(P[lang]&&P[lang][k]!==undefined)return P[lang][k];
   if(C[lang][k]!==undefined)return C[lang][k];
   if(P.en&&P.en[k]!==undefined)return P.en[k];
   return C.en[k];},
 setLang:function(l){
   lang=l; root.lang=l; root.dir=l==='ar'?'rtl':'ltr'; store('lang',l);
   var t=Site.t;
   document.title=(page.title?page.title[l]+' · ':'')+'3okail Blueprint · '+t('titleSfx');
   document.querySelectorAll('[data-i]').forEach(function(el){el.textContent=t(el.getAttribute('data-i'))});
   document.querySelectorAll('[data-h]').forEach(function(el){el.innerHTML=t(el.getAttribute('data-h'))});
   $('langBtn').textContent=t('langBtn');
   var cur=document.body.getAttribute('data-page');
   $('nav').innerHTML=NAV.map(function(n,i){return '<a href="'+n[0]+'"'+(n[1]===cur?' class="cur" aria-current="page"':'')+'><span class="n">0'+(i+1)+'</span>'+esc(t('nav')[i])+'</a>'}).join('');
   Site.brands();
   if(page.render)page.render(l);
 },
 init:function(p){
   page=p||{};
   var th=store('theme'); if(th==='dark'||th==='light')root.setAttribute('data-theme',th);
   $('themeBtn').onclick=function(){var c=root.getAttribute('data-theme'),dark=c?c==='dark':matchMedia('(prefers-color-scheme: dark)').matches,n=dark?'light':'dark';root.setAttribute('data-theme',n);store('theme',n)};
   var mb=$('menuBtn'),nv=$('nav');mb.onclick=function(){var o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',o)};nv.addEventListener('click',function(e){if(e.target.closest('a')){nv.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
   $('langBtn').onclick=function(){Site.setLang(lang==='ar'?'en':'ar')};
   var y=$('yr'); if(y)y.textContent=new Date().getFullYear();
   var q=new URLSearchParams(location.search).get('lang');
   Site.setLang(q==='ar'||q==='en'?q:(store('lang')==='ar'?'ar':'en'));
   Site.reveal();
 },
 countUp:function(el){var to=+el.getAttribute('data-to'),st=null;function f(ts){if(!st)st=ts;var p=Math.min((ts-st)/1200,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)},
 reveal:function(){
   var els=document.querySelectorAll('.reveal');
   function show(el){el.classList.add('in');el.querySelectorAll('.count').forEach(Site.countUp);if(page.onReveal)page.onReveal(el)}
   if(!('IntersectionObserver' in window)){els.forEach(show);return}
   var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target)}})},{threshold:.1});
   els.forEach(function(el){io.observe(el)});
 }
};
window.Site=Site;
})();
