/* ΔΕΥΑΟ demo – κοινό script */
var A={};try{A=JSON.parse(localStorage.getItem('a11y')||'{}')}catch(e){}
function sv(){try{localStorage.setItem('a11y',JSON.stringify(A))}catch(e){}}
function $(s,r){return (r||document).querySelector(s)}function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function ap(){var h=document.documentElement;['dark','hc','lh','readable','links','noanim'].forEach(function(k){h.classList.toggle(k,!!A[k])});h.style.setProperty('--fs',(A.f||17)+'px');var r=$('#ruler');if(r)r.style.display=A.ruler?'block':'none';$$('#a11yp [data-k]').forEach(function(b){b.setAttribute('aria-pressed',A[b.dataset.k]?'true':'false')})}
function fs(d){A.f=Math.min(24,Math.max(14,(A.f||17)+d*2));sv();ap()}
function resetA(){A={};sv();ap()}
function openA(e){if(e)e.preventDefault();var p=$('#a11yp'),o=!p.classList.contains('open');p.classList.toggle('open',o);$('#a11yb').setAttribute('aria-expanded',o);if(o)$('button',p).focus()}
function speak(){var t=String(window.getSelection());if(!t){alert('Επιλέξτε πρώτα κείμενο στη σελίδα.');return}if(!window.speechSynthesis){alert('Η συσκευή δεν υποστηρίζει ανάγνωση κειμένου.');return}var u=new SpeechSynthesisUtterance(t);u.lang='el-GR';speechSynthesis.cancel();speechSynthesis.speak(u)}
function ck(v){try{localStorage.setItem('ck',v)}catch(e){}$('#ck').style.display='none'}
document.addEventListener('DOMContentLoaded',function(){
 renderGal();
 $$('#a11yp [data-k]').forEach(function(b){b.onclick=function(){A[b.dataset.k]=!A[b.dataset.k];sv();ap()}});
 var m=$('.menu');if(m)m.onclick=function(){var n=$('#n');var o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)};
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){var p=$('#a11yp');if(p&&p.classList.contains('open')){p.classList.remove('open');$('#a11yb').focus()}}});
 document.addEventListener('mousemove',function(e){if(A.ruler)$('#ruler').style.top=(e.clientY-23)+'px'});
 try{if(!localStorage.getItem('ck'))$('#ck').style.display='block'}catch(e){$('#ck').style.display='block'}
 ap();
 // αναζήτηση: μετάβαση στη σελίδα αποτελεσμάτων
 $$('form[data-search]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var q=$('input',f).value.trim();location.href=(f.dataset.search||'')+'search.html?q='+encodeURIComponent(q)})});
 // σελίδα αποτελεσμάτων
 var out=$('#results');if(out){var q=new URLSearchParams(location.search).get('q')||'';$('#sq').value=q;var n=function(t){return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')};var v=n(q);var l=window.SITE_INDEX.filter(function(x){return !v||n(x.t+' '+x.d).indexOf(v)>-1});out.innerHTML=l.length?l.map(function(x){return '<a class="doc" href="'+x.u+'"><div><b>'+x.t+'</b><br><small>'+x.d+'</small></div><span>→</span></a>'}).join(''):'<p>Δεν βρέθηκαν αποτελέσματα για «'+q.replace(/</g,'')+'». Δοκιμάστε άλλη λέξη ή καλέστε στο 25520 81880.</p>';var c=$('#rc');if(c)c.textContent=l.length+' αποτελέσματα'}
 // διακοπές νερού: φίλτρα
 var it=$('#items');if(it&&window.OUTAGES){var area='',st='';var draw=function(){var l=window.OUTAGES.filter(function(d){return(!area||d.a==area)&&(!st||d.s==st)});it.innerHTML=l.length?l.map(function(d){return '<div class="it '+d.s+'"><div><b>'+d.a+'</b>'+d.t+'<br><small>'+d.w+'</small></div><span class="st '+d.s+'">'+(d.s=='now'?'Σε εξέλιξη':d.s=='plan'?'Προγραμματισμένη':'Ολοκληρώθηκε')+'</span></div>'}).join(''):'<div class="it">Καμία διακοπή για αυτά τα κριτήρια.</div>'};$('#area').onchange=function(){area=this.value;draw()};$$('.chip[data-s]').forEach(function(c){c.onclick=function(){$$('.chip[data-s]').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false')});c.classList.add('on');c.setAttribute('aria-pressed','true');st=c.dataset.s;draw()}});draw()}
 // φίλτρο λίστας (νέα/διαγωνισμοί)
 $$('[data-filter]').forEach(function(g){$$('.chip',g).forEach(function(c){c.onclick=function(){$$('.chip',g).forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false')});c.classList.add('on');c.setAttribute('aria-pressed','true');var k=c.dataset.k;$$('[data-cat]').forEach(function(e){e.style.display=(!k||e.dataset.cat==k)?'':'none'})}})});
 // φόρμες demo
 $$('form[data-demo]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var o=$('.ok',f);if(o){o.style.display='block';o.focus()}})});
});
/* Φωτογραφίες: εμφάνιση από το assets/photos.js και μεγέθυνση (lightbox) */
function mk(tag,at,tx){var e=document.createElement(tag);for(var k in at)e.setAttribute(k,at[k]);if(tx)e.textContent=tx;return e}
function gitem(c,it,i){var cap=it.t||(c.label+' ('+(i+1)+')');var a=mk('a',{'class':'g',href:'photos/'+c.folder+'/'+it.n+'.jpg','data-cat':c.k,'data-cap':cap,'aria-label':'Μεγέθυνση: '+cap});a.appendChild(mk('img',{src:'photos/'+c.folder+'/thumbs/'+it.n+'.jpg',alt:it.a||cap,loading:'lazy'}));return a}
function renderGal(){var D=window.PHOTOS||[];var g=$('#gallery');
 if(g){var tabs=$('#galtabs');var all=mk('button',{'class':'chip on','data-k':'','aria-pressed':'true',type:'button'},'Όλες ('+D.reduce(function(s,c){return s+c.items.length},0)+')');tabs.appendChild(all);D.forEach(function(c){tabs.appendChild(mk('button',{'class':'chip','data-k':c.k,'aria-pressed':'false',type:'button'},c.label+' ('+c.items.length+')'))});D.forEach(function(c){c.items.forEach(function(it,i){g.appendChild(gitem(c,it,i))})})}
 var h=$('#homegal');if(h){var f=[];D.forEach(function(c){c.items.forEach(function(it,i){if(it.p)f.push([c,it,i])})});if(f.length<3)D.forEach(function(c){if(f.length<3&&c.items.length&&!c.items[0].p)f.push([c,c.items[0],0])});h.innerHTML='';f.slice(0,3).forEach(function(x){h.appendChild(gitem(x[0],x[1],x[2]))})}}
document.addEventListener('DOMContentLoaded',function(){
 var lb=mk('div',{id:'lb',role:'dialog','aria-modal':'true','aria-label':'Μεγέθυνση φωτογραφίας'});
 lb.innerHTML='<img alt=""><p></p><div class="bar"><button type="button" id="lbp" aria-label="Προηγούμενη φωτογραφία">←</button><button type="button" id="lbc">Κλείσιμο</button><button type="button" id="lbn" aria-label="Επόμενη φωτογραφία">→</button></div>';
 document.body.appendChild(lb);var cur=0,last=null,list=[];
 function vis(){return $$('a.g[data-cap]').filter(function(a){return a.style.display!=='none'})}
 function show(i){list=vis();if(!list.length)return;cur=(i+list.length)%list.length;var a=list[cur];$('img',lb).src=a.getAttribute('href');$('img',lb).alt=$('img',a).alt;$('p',lb).textContent=a.dataset.cap+' ('+(cur+1)+'/'+list.length+')'}
 function close(){lb.classList.remove('open');if(last)last.focus()}
 document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a.g[data-cap]');if(!a)return;e.preventDefault();last=a;list=vis();show(list.indexOf(a));lb.classList.add('open');$('#lbc').focus()});
 $('#lbc').onclick=close;$('#lbp').onclick=function(){show(cur-1)};$('#lbn').onclick=function(){show(cur+1)};
 lb.addEventListener('click',function(e){if(e.target===lb)close()});
 document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
});
