'use strict';
const $=(s,e=document)=>e.querySelector(s), sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ls={g:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},s:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const S={i:ls.g('rm_i',0),h:ls.g('rm_h',[])};
let tok=0,speed=1,stage=$('#stage');
const N=15, HEART_PAGES=[1,3,5,7,9]; // pages (0-based) hiding the 5 hearts

/* ---------- content ---------- */
const D={
letter:`محمد،
مش عارفة أبدأ منين، فقلت أبدأ من أبسط حاجة: إني أكتبلك.
في كلام كتير جوايا بيدوّر على طريق يوصلك، والموقع ده كان أحسن طريق لقيته.
كل صفحة هنا فيها حتة مني، وكل كلمة اتكتبت وأنا بفكر فيك.
خد وقتك، واقرا براحتك... لأن كل ده ليك.`,
why:[['حضورك','وجودك بيخلّي الحاجات العادية ليها طعم تاني.'],['طيبتك','فيك هدوء بيطمّن اللي حواليك من غير ما تحاول.'],['كلامك','بتعرف تقول الكلمة اللي تفرق.'],['ضحكتك','لما بتضحك الدنيا بتخفّ شوية.'],['قلبك','قلب نضيف، وده حاجة نادرة أوي.'],['إنك إنت','مفيش نسخة تانية منك، وأنا شايفة ده كويس.']],
never:['كنت نفسي أقولك إن وجودك مريّحني.','وإن اسمك لما بيجي في بالي، بيجي معاه إحساس حلو.','وإني بفرح لفرحك أكتر ما بفرح لنفسي.','وإن في أيام بتبقى أحلى لمجرد إنك فيها.','وإني ساعات بكتب كلام كتير وأمسحه، لأن مفيش كلمة تكفي.','بس الليلة قررت أقولهم كلهم.'],
open:[['افتح لما تكون زعلان','محمد، الزعل ده ضيف تقيل بس عمره ما بيقعد. خد نفس عميق، وافتكر إنك أقوى مما بتصدّق. أنا مؤمنة بيك حتى في الأيام اللي إنت نفسك مش مصدّق فيها. وهتعدّي، وأنا جنبك بالدعاء.'],['افتح لما تفتقدني','لو وحشتك، اعرف إنك وحشتني برضه. المسافة مش بتغيّر حاجة، والقلوب اللي بتفتكر بعض بتفضل قريبة. ابتسم، لأن في حد بيفكر فيك دلوقتي.'],['افتح لما تحتاج تسمع كلام حلو','إنت إنسان جميل من جوه قبل برّه. مجهودك بيبان، وطيبتك بتتحس، ومكانك في قلبي مش بيتاخد منه. كمّل، وافتخر بنفسك.'],['افتح لما تكون محتاج ابتسامة','ابتسم دلوقتي، حتى لو غصب عنك. شايفك وإنت بتبتسم في خيالي، وده كفاية يخلّيني أبتسم معاك.'],['افتح لما تحس إن الدنيا صعبة','الدنيا ساعات بتتقل، بس إنت مش لوحدك. خد الأمور خطوة خطوة، وارتاح لما تتعب. أنا واثقة إنك هتعدّيها، وإن ربنا هيعوّضك أحلى.']],
reasons:['علشان وجودك بيطمّن.','علشان طريقتك في الكلام.','علشان طيبتك من غير مقابل.','علشان بتسمع بجد.','علشان ضحكتك بتعدّي.','علشان صدقك.','علشان بتهتم بالتفاصيل.','علشان قلبك كبير.','علشان بتخلّي اللحظة أحلى.','علشان فيك أمان.','علشان إنت مختلف.','علشان ذوقك.','علشان احترامك للناس.','علشان بتحاول دايمًا تبقى أحسن.','علشان اسمك لوحده بيفرّحني.','علشان بتفضل إنت في كل الظروف.','علشان وجودك ليه معنى.','علشان بتخليني أشوف الدنيا أهدى.','علشان في عينك طيبة.','علشان ببساطة... إنت محمد.'],
mirror:['لو تشوف نفسك بعيني، هتفهم ليه أنا شايفاك مميز.','إنت مش محتاج تحاول تبقى حد تاني، إنت كفاية.','فيك طيبة بتتحس من غير ما تتقال.','مجهودك وإصرارك بيخلّوني أحترمك قبل ما أحبك.','وإنت بتحسب إنك عادي، إنت في الحقيقة نادر.'],
feel:['فخورة بيك.','بطمّن لما أسمع صوتك.','بدعيلك من قلبي.','بتمنّالك الخير دايمًا.','بشتاق لحاجات لسه محصلتش.','بحب هدوءك.','بحب طريقتك.','بخاف عليك من الدنيا.','بحس بالأمان.','بحب اسمك.','بضحك لما أفتكرك.','وبحبك بطريقتي.'],
stars:['كل نجمة في السما بتفكّرني بدعوة دعيتهالك.','في عالمنا الصغير، الهدوء له صوتك.','لو الدنيا زحمة، هلاقي فيك مكان هادي.','نجمة وراها نجمة، وكلهم بيقولوا اسمك.','ما بتحتاجش نور كتير، فيك نور.','وكل ليلة بتعدّي، بتمنّى إنك تبقى بخير.'],
long:`محمد،
أنا عارفة إن الرسالة دي طويلة، بس أنا كتبتها على مهل علشان تتقري على مهل.
مش هقول إني بعرف أعبّر كويس، لأن مشاعري ساعات بتسبق كلامي. بس هحاول.
إنت إنسان لما بيدخل حياة حد بيسيب فيها أثر هادي، أثر من النوع اللي مش بيعلى صوته بس بيفضل.
أنا بقدّر فيك صدقك، وطيبتك، واهتمامك، وإنك ماشي في طريقك بكرامة.
وعايزاك تعرف إن في حد مقتنع بيك، حتى لو إنت اتهزّيت.
عايزاك تفتكر إن التعب مش ضعف، وإنك تستاهل ترتاح وتفرح.
وإني هفضل أتمنالك كل الخير، في أي مكان وأي وقت.
دي مش كل كلماتي... دي أول الحكاية بس.`,
wish:['أتمنالك صحة وراحة بال.','أتمنالك نجاح يشبه تعبك.','أتمنالك ناس تحبك زي ما بتحبهم.','أتمنالك أيام هادية بعد الأيام التقيلة.','أتمنالك تحقق اللي في قلبك.','أتمنالك تضحك من قلبك كتير.','وأتمنالك دايمًا تفتكر إنك تستاهل الأحلى.'],
stop:`لو كان في إيدي أوقف الوقت، كنت هوقفه في اللحظة اللي بتبقى فيها مبسوط.
مش علشان أمنع الباقي، بس علشان أفضل أبص عليها شوية زيادة.
الوقت بيجري، بس الحاجات الحلوة بتفضل. وإنت منها.`,
secret:`وصلت للصفحة السرية يا محمد.
دي مكانها قلبي، ومفيش حد يعرفها غيرك.
كل اللي كنت خايفة أقوله وسط الناس، بقوله هنا بهدوء: إنت غالي عليا، أكتر مما الكلام يقدر يشرح.`,
gold:`محمد،
ده الظرف الأخير الأغلى، فيه أخص كلام عندي.
شكرًا إنك موجود. شكرًا على كل مرة خلّيتني أحس إني مسموعة ومفهومة.
وجودك نعمة، وأنا بحمد ربنا عليها.
كل سنة وإنت طيب، وكل يوم وإنت أقرب لأحلامك.`,
prom:['هفضل أدعيلك من غير ما تطلب.','هقف جنبك في الأيام الصعبة قبل الحلوة.','هسمعك من غير ما أحكم.','هفرح لنجاحك كأنه نجاحي.','هقولك الحقيقة بلطف.','وهفضل أكتبلك كل ما الكلام يزيد جوايا.']
};

/* ---------- helpers ---------- */
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
async function type(e,txt,sp=34,t=tok){e.textContent='';e.classList.add('tw');for(const c of txt){if(t!==tok)return;e.textContent+=c;await sleep(c==='\n'?380:sp+Math.random()*20)}e.classList.remove('tw');e.classList.add('done')}
async function reveal(root,t=tok){const xs=[...root.querySelectorAll('.rv')];for(const x of xs){if(t!==tok)return;x.classList.add('in');await sleep(220)}}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function head(p,i,en){p.append(el('div','chap',`الفصل ${i+1}`),el('h2','',`${p.dataset.t}<small>${en}</small>`))}
function sig(){return el('span','sig','رحمة ♡')}
function hideHeart(p,i){
  if(!HEART_PAGES.includes(i))return;const k=HEART_PAGES.indexOf(i),b=el('button','hh','♥');
  b.setAttribute('aria-label','قلب مخفي');b.style.top=[12,70,38,85,55][k]+'%';b.style[k%2?'left':'right']=(6+k*3)+'%';
  if(S.h.includes(i))b.classList.add('got');
  b.onclick=()=>{if(!S.h.includes(i)){S.h.push(i);ls.s('rm_h',S.h);b.classList.add('got');toast(`قلب مخفي ${S.h.length} / 5 ♥`);if(S.h.length===5)setTimeout(()=>toast('اتفتحت صفحة سرية في الفصل ١٢'),2400)}};
  p.append(b)}
const paper=(txt,t)=>{const d=el('div','paper rv');const s=el('span');d.append(s);d.after;return{d,run:()=>type(s,txt,40,t)}};

/* ---------- pages ---------- */
const T=['رسالة ليك','ليه إنت يا محمد؟','كلام ما قلتوش','افتح لما...','٢٠ سبب صغير','لو تشوف نفسك','ألف إحساس','عالمنا الصغير','اقراها براحة','أمنيات ليك','لو أقدر أوقف الوقت','رسالة سرية','ظرف كمان','بيني وبينك','الصفحة الأخيرة'];
const EN=['A Letter For You','Why You, Mohamed?','Things I Never Said','Open When...','20 Little Reasons','If You Could See Yourself','A Thousand Feelings','Our Little Universe','Read This Slowly','Things I Wish For You','If I Could Stop Time','A Secret Message','One More Envelope','Just Between Us','The Last Page'];

const R=[
(p,t)=>{const x=paper(D.letter,t);p.append(x.d);x.d.append(sig());x.run();},
(p)=>{const g=el('div','grid');D.why.forEach(([h,b])=>g.append(el('div','card rv',`<h3>${h}</h3><p>${b}</p>`)));p.append(g)},
(p,t)=>{const w=el('div');D.never.forEach(m=>w.append(el('p','note rv',m)));p.append(w)},
(p)=>{D.open.forEach(([h,m],k)=>{const b=el('button','env2 rv',`<b>♥</b><span>${h}</span>`),l=el('div','lt'),pp=el('div','paper');pp.textContent=m;l.append(pp);
  b.onclick=()=>{const o=l.classList.toggle('show');if(o)setTimeout(()=>l.scrollIntoView({behavior:'smooth',block:'center'}),400)};p.append(b,l)})},
(p)=>{const u=el('ol','list');D.reasons.forEach(r=>u.append(el('li','rv',r)));p.append(u)},
(p)=>{D.mirror.forEach(m=>p.append(el('p','note rv',m)))},
(p,t)=>{const w=el('div','grid');D.feel.forEach(f=>w.append(el('div','card rv','<p></p>')));p.append(w);
  (async()=>{const cs=[...w.children];for(let i=0;i<cs.length;i++){if(t!==tok)return;cs[i].classList.add('in');await type($('p',cs[i]),D.feel[i],45,t)}})()},
(p,t)=>{const sky=el('div','sky'),m=el('div','msg','المس نجمة ✦');
  D.stars.forEach((s,k)=>{const b=el('button','star','✦');b.style.top=(8+(k*37)%70)+'%';b.style.left=(8+(k*53)%76)+'%';
    b.onclick=()=>{b.classList.add('seen');tok++;type(m,s,45,tok)};sky.append(b)});p.append(sky,m)},
(p,t)=>{const x=paper(D.long,t);p.append(x.d);x.d.append(sig());x.run();stage.scrollTop=0},
(p)=>{const u=el('ol','list');D.wish.forEach(r=>u.append(el('li','rv',r)));p.append(u)},
(p,t)=>{const c=el('div','clock',`<i class="h1"></i><i class="h2"></i>`),b=el('button','btn gold','وقّف الوقت'),m=el('p','fin','');
  b.onclick=()=>{c.classList.add('stop');p.classList.add('frozen');speed=0;b.disabled=true;type(m,D.stop,45,t);setTimeout(()=>speed=.25,500)};p.append(c,el('div','',''),m);p.insertBefore(b,m);b.style.display='block';b.style.margin='0 auto 1.5rem'},
(p,t)=>{if(S.h.length<5){p.append(el('div','lock',`<big>🔒</big><p>الصفحة دي مقفولة.</p><p>في 5 قلوب صغيرة مستخبية في الموقع، لاقيت ${S.h.length} منهم.</p>`));return}
  const x=paper(D.secret,t);p.append(x.d);x.d.append(sig());x.run()},
(p,t)=>{const b=el('button','env2 gold-env','<b>♥</b><span>افتح الظرف الذهبي</span>'),l=el('div','lt'),pp=el('div','paper');l.append(pp);
  b.onclick=()=>{if(l.classList.contains('show'))return;l.classList.add('show');pp.append(el('span'),sig());type(pp.firstChild,D.gold,40,t)};p.append(b,l)},
(p)=>{const u=el('ol','list');D.prom.forEach(r=>u.append(el('li','rv',r)));p.append(u,sig())},
(p,t)=>{const n=el('div','names',''),q=el('p','fin rv','من رحمة لمحمد...<br>مهما حاولت أوصف، هيفضل جوايا كلام كتير أجمل من إنه يتقال.'),
  b=el('button','btn gold rv','مفاجأة الختام'),r=el('button','btn ghost rv','ابدأ من الأول');b.style.margin=r.style.margin='1.2rem auto 0';b.style.display=r.style.display='block';
  p.append(n,q,b,r);(async()=>{await sleep(900);const s='RAHMA ♡ MOHAMED';n.textContent='';for(const c of s){if(t!==tok)return;n.textContent+=c;await sleep(240)}await sleep(500);q.classList.add('in');await sleep(800);b.classList.add('in');r.classList.add('in')})();
  b.onclick=()=>{burst();q.innerHTML='رحمة بتحبك يا محمد.<br>ودي كانت أول ألف كلمة بس. ♥';b.disabled=true};r.onclick=restart}
];

/* ---------- navigation ---------- */
function show(i){
  i=Math.max(0,Math.min(N-1,i));S.i=i;ls.s('rm_i',i);tok++;const t=tok;speed=1;
  const p=el('section','page pg');p.dataset.t=T[i];head(p,i,EN[i]);stage.replaceChildren(p);stage.scrollTop=0;
  R[i](p,t);hideHeart(p,i);reveal(p,t);
  $('#count').textContent=`${i+1} / ${N}`;$('#barFill').style.width=((i+1)/N*100)+'%';
  $('#prev').disabled=i===0;$('#next').disabled=i===N-1;
}
function restart(){S.i=0;S.h=[];ls.s('rm_i',0);ls.s('rm_h',[]);show(0);toast('بدأنا من الأول')}
$('#next').onclick=()=>show(S.i+1);$('#prev').onclick=()=>show(S.i-1);$('#restart').onclick=restart;
let sx=0;stage.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
stage.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>90)show(S.i+(d<0?1:-1))},{passive:true});

/* ---------- intro ---------- */
$('#openBtn').onclick=async function(){
  this.disabled=true;music(true);$('#env').classList.add('open');this.style.opacity=0;await sleep(2600);
  $('#intro').classList.add('out');$('#app').hidden=false;burst(14);show(S.i);await sleep(1700);$('#intro').remove()};

/* ---------- audio (soft generated pad) ---------- */
let ac,mg,on=false;
function music(force){
  if(!ac){try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
    mg=ac.createGain();mg.gain.value=0;mg.connect(ac.destination);
    [174.6,220,261.6,329.6,392].forEach((f,k)=>{const o=ac.createOscillator(),g=ac.createGain(),l=ac.createOscillator(),lg=ac.createGain();
      o.type='sine';o.frequency.value=f;g.gain.value=.035;l.frequency.value=.06+k*.02;lg.gain.value=.025;l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(mg);o.start();l.start()})}
  on=force===true?true:!on;ac.resume();mg.gain.linearRampToValueAtTime(on?.6:0,ac.currentTime+1.5);$('#mute').classList.toggle('on',on)}
$('#mute').onclick=()=>music();

/* ---------- particles ---------- */
const cv=$('#fx'),cx=cv.getContext('2d');let W,H,ps=[];
function size(){W=cv.width=innerWidth*devicePixelRatio;H=cv.height=innerHeight*devicePixelRatio}size();addEventListener('resize',size);
const mk=(h,y)=>({x:Math.random()*W,y:y??H+20,r:(Math.random()*1.6+.4)*devicePixelRatio,v:(Math.random()*.3+.1)*devicePixelRatio,h,a:Math.random()*.6+.2,w:Math.random()*6});
for(let i=0;i<46;i++)ps.push(mk(i%9===0,Math.random()*H));
function burst(n=40){for(let i=0;i<n;i++){const p=mk(true,H*(.5+Math.random()*.5));p.v*=4;p.r*=3;ps.push(p)}}
function loop(){cx.clearRect(0,0,W,H);ps=ps.filter(p=>p.y>-30);
  for(const p of ps){p.y-=p.v*speed;p.w+=.01*speed;p.x+=Math.sin(p.w)*.4*speed;cx.globalAlpha=p.a;
    if(p.h){cx.fillStyle='#b88a8a';cx.font=`${p.r*5}px serif`;cx.fillText('♥',p.x,p.y)}
    else{cx.fillStyle='#e6cf9a';cx.shadowColor='#c9a45c';cx.shadowBlur=8;cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();cx.shadowBlur=0}}
  if(ps.length<46)ps.push(mk(Math.random()<.1));requestAnimationFrame(loop)}
loop();
