const main = document.querySelector('#main');
const header = document.querySelector('#masthead');
const menu = document.querySelector('.menu-toggle');
const dialog = document.querySelector('#overlay');
const dialogBody = document.querySelector('#dialog-body');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const icon = name => '<i data-lucide="' + name + '" aria-hidden="true"></i>';
const button = (label, attrs) => '<button class="line-btn" ' + attrs + '><span></span>' + label + '</button>';
const link = (label, url) => '<a class="line-btn" href="' + url + '"><span></span>' + label + '</a>';
const marker = '<span class="marker" aria-hidden="true"></span>';
const marked = body => '<div class="marked">' + marker + '<div>' + body + '</div></div>';
function image(name, alt, cls = '', loading = 'eager') {
 const priority = name === 'hero' && cls === 'backdrop' ? ' fetchpriority="high"' : '';
 return '<img class="' + cls + '" src="assets/' + name + '.webp" alt="' + alt + '" decoding="async" loading="' + loading + '"' + priority + '>';
}
const play = (film, label) => '<button class="film-link" data-film="' + film + '"><span>' + icon('play') + '</span>' + label + '</button>';
const mediaNames = { hero:'Research aircraft and ground crew outside a canvas hangar in Pune', h1:'Silver VTOL research aircraft on the apron', h2:'Fixed-wing research aircraft above a grass runway', ground:'Mobile ground support station', company:'Gas processing plant under a cloudy sky', quality:'Engineer inspecting the surface of an airframe', configuration:'Three-quarter view of a fixed-wing VTOL aircraft' };
const systems = [...aircraft,legacyAirframe,
 {id:'ground-control',name:'Ground control systems',subtitle:'Ground support station', type:'Mission systems', image:'ground',short:'A mobile workspace for the ground team',description:'A field workspace that brings the ground team, communications and aircraft support together.'},
 {id:'infrastructure',name:'Deployment infrastructure',subtitle:'Field support infrastructure',type:'Support solutions',image:'hero',short:'Field shelter and platform support',description:'Sheltered workspaces and support infrastructure for field-based aircraft teams.'}
];
function crumb(items) {
 return '<div class="crumb"><a href="#/">Home</a>' + items.map(([label, url]) => '<span>›</span>' + (url ? '<a href="' + url + '">' + label + '</a>' : '<b>' + label + '</b>')).join('') + '</div>';
}
function floating(label, sub, attrs) {
 return '<button class="floating" ' + attrs + '><i class="down"></i><strong>' + label + '</strong><span>' + sub + '</span></button>';
}
function stat(symbol, value, label) {
 return '<li><div class="stat">'+icon(symbol)+'<p><strong>'+value+'</strong><span>'+label+'</span></p></div></li>';
}
function home() {
 return '<section class="hero" aria-labelledby="hero-title"><div class="hero-stage"><div class="hero-media">' + image('hero',mediaNames.hero,'backdrop') + '</div><div class="hero-shade"></div>' +
 '<div class="hero-copy"><div class="marked">' + marker + '<h1 id="hero-title"><span class="line"><span>Hydrogen-powered</span></span> <span class="line"><span>unmanned systems.</span></span> <span class="line accent"><span>Built in India.</span></span></h1></div>' +
 '<p>Raj Defence and Aerospace designs and manufactures long-endurance hydrogen fuel-cell drones for the armed forces, central armed police forces and homeland security agencies.</p>' +
 '<div class="hero-actions"><a class="btn btn-primary" href="#/contact">Request a briefing '+icon('arrow-right')+'</a><button class="btn btn-glass" data-panel="capability">'+icon('file-text')+' Capability statement</button></div>' +
 '<button class="film-link" data-film="overview"><span>'+icon('play')+'</span>Watch overview</button></div>' +
 '<a class="model-tag" href="#/systems/rjs-h1/configuration"><i class="pulse" aria-hidden="true"></i><span><small>RAJAS RJS-H1</small><strong>Explore in 3D</strong></span>'+icon('arrow-up-right')+'</a></div>' +
 '<div class="hero-dock"><ul class="hero-stats" aria-label="Key figures">' + stat('timer','Up to 5 hours','Endurance') + stat('package','5 kg','Payload') + stat('move-vertical','Vertical take-off','No runway') + stat('map-pin','Made in India','Pune') + '</ul>' +
 '<button class="scroll-cue" data-scroll="hydrogen"><span>Why hydrogen</span>'+icon('arrow-down')+'</button></div></section>' +
 '<section class="hydrogen grid-paper" id="hydrogen"><div class="trace trace-a"></div><div class="trace trace-b"></div><div class="hydrogen-copy"><p class="orange-rule">Raj Defence and Aerospace brings the Raj group’s gas-engineering experience to hydrogen-powered aircraft. Design and assembly take place in Pune, India.</p><p>The company reports up to five hours of endurance with a 5 kg payload on the RAJAS RJS-H1. It takes off and lands vertically.</p></div><div class="hydrogen-side"><i class="down"></i><strong>5 kg payload.<br>Up to 5 hours.<br>Built in India.</strong></div>' + button('Read more about our approach','data-panel="approach"') + '</section>' +
 '<section class="home-systems grid-paper" id="systems"><div class="section-heading"><h2>Our systems</h2><p>mission-ready platforms</p></div><div class="home-cards">' + smallCard(systems[0]) + '<div class="orange-card"><div>RJS-H1' + icon('plane') + '</div><nav><a href="#/systems/rjs-h1">Overview</a><button data-panel="rjs-h1">Key features</button><a href="#/systems/rjs-h1/configuration">Explore in 3D</a></nav></div>' + smallCard(systems[1]) + '</div></section>';
}
function smallCard(s) {
 return '<a class="small-card" href="#/systems/'+s.id+'">' + '<span class="card-preview" data-preview="'+s.design+'">'+image(s.image,mediaNames[s.image],'','lazy')+'</span>' + '<div><h3>'+s.name+ icon(s.id==='rjs-h1'?'square':'triangle-right') +'</h3><p>'+s.short+'</p><b>+</b></div></a>';
}
function catalogue(page) {
 const entries=aircraft.map(s=>'<a href="#/systems/'+s.id+'/configuration"><div class="library-preview" data-preview="'+s.design+'"></div><span>'+s.type+'</span><h2>'+s.name+'</h2><p>'+s.short+'</p><b>'+icon('box')+' Explore in 3D</b></a>').join('');
 return crumb([[page]])+'<section class="fleet-list"><div class="section-heading"><h1>Unmanned systems</h1><p>Explore the aircraft and maritime programmes in 3D.</p></div><div class="fleet-cards">'+entries+'</div><nav class="support-links" aria-label="Support systems"><a href="#/systems/ground-control">Ground control systems</a><a href="#/systems/infrastructure">Deployment infrastructure</a></nav></section>';
}
function facts(s){
 return '<dl class="aircraft-facts">'+s.facts.map(([term,value])=>'<div><dt>'+term+'</dt><dd>'+value+'</dd></div>').join('')+'</dl>';
}
function systemPage(s) {
 if(s.design)return configuration(s,false);
 return crumb([['Systems','#/systems'],[s.name]])+'<section class="inner-hero system-hero">'+image(s.image,mediaNames[s.image],'backdrop')+'<div class="shade"></div><div class="inner-copy">'+marked('<h1>'+s.name+'</h1><p>'+s.description+'</p>')+'</div></section>';
}
function configuration(s,configRoute=true) {
 const crumbs=[['Systems','#/systems'],[s.name,configRoute?'#/systems/'+s.id:null]];
 if(configRoute)crumbs.push(['Configuration']);
 const options=(s===legacyAirframe?[...aircraft,s]:aircraft).map(item=>'<option value="'+item.id+'"'+(item.id===s.id?' selected':'')+'>'+item.name+'</option>').join('');
 const hotspots=s.points.map(([label],i)=>'<button class="spot" data-spot="'+i+'" aria-label="'+label+'" aria-pressed="false">+</button>').join('');
 const commands=[['left','rotate-ccw','Rotate left'],['right','rotate-cw','Rotate right'],['in','plus','Zoom in'],['out','minus','Zoom out'],['reset','maximize','Reset view']];
 return crumb(crumbs)+'<section class="showroom"><div class="showroom-info"><label class="model-choice">Platform<select id="model-choice">'+options+'</select></label><div class="model-summary"><div class="model-type">'+s.type+'</div><h1>'+s.name+'</h1><p>'+s.subtitle+'</p></div><div class="component-info"><div class="component-nav"><button data-cycle="-1" aria-label="Previous detail">'+icon('chevron-left')+'</button><span id="spot-counter"></span><button data-cycle="1" aria-label="Next detail">'+icon('chevron-right')+'</button></div><div id="spot-text" aria-live="polite"></div></div></div><div class="orbit-stage" data-design="'+s.design+'"><p class="viewer-loading" role="status">Loading 3D view…</p>'+hotspots+'<div class="orbit-caption">Illustrative exterior concept</div><div class="orbit-controls" aria-label="Model controls">'+commands.map(([key,symbol,label])=>'<button data-camera="'+key+'" title="'+label+'" aria-label="'+label+'">'+icon(symbol)+'</button>').join('')+'</div></div></section><section class="model-overview"><div><h2>Programme overview</h2><p>'+s.description+'</p>'+(s.id==='rjs-h1'?play('overview','Watch overview'):'')+'</div>'+facts(s)+'</section>';
}
function editorial(type) {
 const co=type==='company', title=co?'From gas<br>engineering<br>to aerospace.':'Built to<br>be inspected.';
 return crumb([[co?'Company':'Quality']])+'<section class="inner-hero editorial">'+image(type,mediaNames[type],'backdrop')+'<div class="shade"></div><div class="inner-copy">'+marked('<h1>'+title+'</h1><p>'+(co?'Raj Defence and Aerospace Pvt. Ltd. is the defence company of the Raj group, Pune. Its parent company, Raj Process Equipments and Systems, builds biogas and compressed-gas plants for industry across India.':'Quality, airworthiness, and operational reliability are built into every stage of design, manufacturing, and integration.')+'</p>')+'</div>'+floating(co?'Our heritage':'Our quality approach',co?'engineering depth, aerospace focus':'disciplined, traceable, and compliant','data-scroll="story"')+'</section><section class="story grid-paper" id="story"><div class="section-heading"><h2>'+(co?'Our heritage':'Our quality approach')+'</h2></div><p>'+(co?'Design and assembly take place in Pune. Raj welcomes evaluation teams to inspect the work and verify its published claims. Its stated vision is to be India’s reference supplier of hydrogen-powered unmanned systems.':'Raj documents its processes, opens its records to customer inspectors and tests products against the standards specified by the customer. Certifications and approvals are available on request.')+'</p>'+play('engineering','Watch the engineering overview')+'</section>';
}
function contact() {
 return crumb([['Contact']])+'<section class="contact grid-paper"><div>'+marked('<h1>Talk to<br>our team.</h1><p>For system enquiries, partnerships, or general information, get in touch with Raj Defence & Aerospace.</p><ul class="contact-list"><li>'+icon('mail')+'<a href="mailto:info@rajda.in">info@rajda.in</a></li><li>'+icon('map-pin')+'Pune, Maharashtra, India</li></ul>')+'</div><form id="enquiry"><label>Name<input name="name" autocomplete="name" required></label><label>Organisation<input name="organisation" autocomplete="organization"></label><label>Email<input type="email" name="email" autocomplete="email" required></label><label>Enquiry<textarea name="enquiry" rows="5" required></textarea></label><button class="line-btn" type="submit"><span></span>Prepare email enquiry</button><p class="form-note">Opens a draft in your email app.</p><p id="form-status" role="status"></p></form></section>';
}
function panel(key) {
 let title, body;
 const s=systems.find(item=>item.id===key);
 if(s){
   title=s.name;
   body='<p><b>'+s.subtitle+'</b></p><p>'+s.description+'</p>'+(s.design?facts(s)+link('Explore in 3D','#/systems/'+s.id+'/configuration'):link('Explore system','#/systems/'+s.id));
 } else {
   const content={
     capability:['Capability statement','The capability statement is shared on request with government and authorised entities.',link('Request a copy','#/contact')],
     access:['Partner access','For partner portal access, contact the RAJ Defence & Aerospace team.',link('Contact the team','#/contact')],
     approach:['Why hydrogen','A hydrogen fuel cell converts hydrogen and oxygen into electricity, producing water vapour and heat. Raj’s hybrid aircraft use a fuel cell during cruise and a battery buffer for vertical lift.',link('Explore our systems','#/systems')],
     privacy:['Privacy policy','This demonstration prepares enquiries in your own email application. Form entries stay in this browser until you choose to send the email.',''],
     terms:['Terms of use','This site is an illustrative product presentation. The aircraft imagery and films are visualisations. Contact the team to confirm product information for a specific enquiry.','']
   };
   [title,body]=[content[key][0],'<p>'+content[key][1]+'</p>'+content[key][2]];
 }
 showDialog(title,marked('<h2 id="dialog-title">'+title+'</h2>'+body));
}
function showDialog(title,html,film=false) {
 dialogBody.innerHTML='<button class="close" aria-label="Close dialog" data-dismiss>Close '+icon('x')+'</button>'+html;
 dialog.classList.toggle('film-dialog',film);
 dialog.setAttribute('aria-label',title);
 dialog.showModal();
 document.body.classList.add('dialog-open');
 refreshIcons();
 if (!reduceMotion.matches && window.gsap) gsap.fromTo(dialog,{opacity:0,y:12},{opacity:1,y:0,duration:.22,clearProps:'transform,opacity'});
}
function showFilm(key) {
 const title=key==='overview'?'Aircraft overview':'Engineering overview';
 showDialog(title,'<h2>'+title+'</h2><video controls autoplay playsinline preload="metadata" poster="assets/'+(key==='overview'?'hero':'quality')+'.webp" aria-label="'+title+'"><source src="assets/'+key+'.mp4" type="video/mp4"></video>',true);
}
let selected=0;
let activeModel=null;
let unmountViewer=null;
function openViewer(s) {
 const stage=main.querySelector('.orbit-stage');
 activeModel=s;
 setSpot(0);
 import('./viewer.js').then(({mountViewer})=>{
   if(stage.isConnected)unmountViewer=mountViewer(stage,s.design,s.name);
 }).catch(()=>{
   if(!stage.isConnected)return;
   stage.classList.add('viewer-offline');
   const message=stage.querySelector('.viewer-loading');
   if(message)message.textContent='The 3D view could not load. Use the detail controls to explore this platform.';
 });
}
document.addEventListener('change',event=>{
 if(event.target.id==='model-choice')location.hash='/systems/'+event.target.value+'/configuration';
});
function setSpot(index) {
 const hotSpots=activeModel.points;
 selected=(index+hotSpots.length)%hotSpots.length;
 document.querySelector('#spot-text').innerHTML='<h2>'+hotSpots[selected][0]+'</h2><p>'+hotSpots[selected][1]+'</p>';
 document.querySelector('#spot-counter').textContent=(selected+1)+' / '+hotSpots.length;
 document.querySelectorAll('[data-spot]').forEach((node,i)=>node.setAttribute('aria-pressed',String(i===selected)));
}
function refreshIcons(){window.lucide?.createIcons();}
function closeMenu(){header.classList.remove('open');document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
let motionContext;
function animatePage(){
 if(!window.gsap || reduceMotion.matches)return;
 gsap.registerPlugin(ScrollTrigger);
 motionContext=gsap.context(()=>{
   if (main.querySelector('.hero')) animateHero();
   const headings = main.querySelectorAll('.inner-copy h1, .contact h1, .config-copy h1');
   const paragraphs = main.querySelectorAll('.inner-copy p, .contact .marked p');
   if (headings.length) gsap.from(headings,{opacity:0,y:18,duration:.75,stagger:.09,ease:'power3.out'});
   if (paragraphs.length) gsap.from(paragraphs,{opacity:0,y:8,duration:.6,delay:.15});
   gsap.utils.toArray('.home-cards, .section-heading, .hydrogen-copy, .feature-band').forEach(el=>{
     gsap.from(el,{y:12,duration:.6,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 98%',once:true}});
   });
 },main);
}
function animateHero(){
 gsap.timeline({defaults:{ease:'power3.out',clearProps:'transform,opacity'}})
  .from('.hero-media img',{scale:1.09,duration:1.8},0)
  .from('.hero .marker',{opacity:0,y:-14,duration:.5},.15)
  .from('.hero h1 .line>span',{yPercent:112,duration:.85,stagger:.1},.2)
  .from('.hero-copy>p, .hero-actions, .hero-copy>.film-link',{opacity:0,y:16,duration:.6,stagger:.09},.55)
  .from('.hero-stats li, .scroll-cue',{opacity:0,y:22,duration:.55,stagger:.07},.7)
  .from('.model-tag',{opacity:0,duration:.5},1.05);
}
function render(){
 unmountViewer?.();unmountViewer=null;activeModel=null;
 motionContext?.revert();
 if(dialog.open)dialog.close();
 closeMenu();
 const [route,id,sub]=(location.hash.replace(/^#\/?/,'')||'').split('/');
 let html, name;
 if(route==='products'||(route==='systems'&&!id)){name=route==='products'?'Products':'Systems';html=catalogue(name);}
 else if(route==='systems'&&systems.some(s=>s.id===id)){const s=systems.find(s=>s.id===id); name=s.name; html=s.design&&sub==='configuration'?configuration(s):systemPage(s);}
 else if(route==='company'||route==='quality'){name=route==='company'?'Company':'Quality';html=editorial(route);}
 else if(route==='contact'){name='Contact';html=contact();}
 else {name='Home';html=home();}
 header.classList.toggle('home-header',name==='Home');
 main.innerHTML=html;
 document.title=name+' | RAJ Defence & Aerospace';
 document.querySelectorAll('#primary-nav a').forEach(a=>{if(a.hash==='#/'+route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(main.querySelector('.orbit-stage'))openViewer(systems.find(s=>s.id===id));
 const previews=main.querySelectorAll('[data-preview]');
 if(previews.length)import('./viewer.js').then(module=>module.renderPreviews(previews)).catch(()=>{});
 refreshIcons();
 window.scrollTo({top:0,behavior:'instant'});
 movePill();updateHeader();
 animatePage();
}
document.addEventListener('click',event=>{
 const node=event.target.closest('button,a');
 if(!node)return;
 if(node.matches('.skip')){event.preventDefault();main.focus();}
 else if(node===menu){const opened=header.classList.toggle('open');document.body.classList.toggle('menu-open',opened);menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Close navigation':'Open navigation');}
 else if(node.hasAttribute('data-dismiss'))dialog.close();
 else if(node.dataset.panel)panel(node.dataset.panel);
 else if(node.dataset.film)showFilm(node.dataset.film);
 else if(node.dataset.scroll)document.getElementById(node.dataset.scroll)?.scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'start'});
 else if(node.hasAttribute('data-spot'))setSpot(Number(node.dataset.spot));
 else if(node.dataset.cycle)setSpot(selected+Number(node.dataset.cycle));
 else if(node.matches('a[href^="#/"]')){closeMenu();if(dialog.open)dialog.close();if(node.hash===location.hash)window.scrollTo({top:0,behavior:'instant'});}
});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{dialog.querySelector('video')?.pause();dialogBody.replaceChildren();document.body.classList.remove('dialog-open');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('submit',e=>{
 if(e.target.id!=='enquiry')return;
 e.preventDefault();
 const form=new FormData(e.target);
 const body=form.get('enquiry')+'\n\n'+[form.get('name'),form.get('organisation'),form.get('email')].filter(Boolean).join('\n');
 const mail='mailto:info@rajda.in?subject='+encodeURIComponent('Website enquiry from '+form.get('name'))+'&body='+encodeURIComponent(body);
 const status=document.getElementById('form-status');
 status.replaceChildren(document.createTextNode('Send the prepared draft from your email app. '));
 const retry=document.createElement('a');retry.href=mail;retry.textContent='Open draft again';status.append(retry);
 window.location.href=mail;
});
const nav=document.querySelector('#primary-nav');
const navPill=document.createElement('span');
navPill.className='nav-pill';navPill.setAttribute('aria-hidden','true');
nav.prepend(navPill);
function movePill(target=nav.querySelector('a[aria-current]:not(.menu-cta)')){
 navPill.classList.toggle('on',Boolean(target));
 if(!target)return;
 navPill.style.width=target.offsetWidth+'px';
 navPill.style.transform='translateX('+target.offsetLeft+'px)';
}
const navLink=event=>event.target.closest?.('a:not(.menu-cta)');
nav.addEventListener('pointerover',e=>{const a=navLink(e);if(a)movePill(a);});
nav.addEventListener('focusin',e=>{const a=navLink(e);if(a)movePill(a);});
nav.addEventListener('pointerleave',()=>movePill());
nav.addEventListener('focusout',e=>{if(!nav.contains(e.relatedTarget))movePill();});
window.addEventListener('resize',()=>{if(innerWidth>900)closeMenu();movePill();updateHeader();});
document.fonts?.ready.then(()=>movePill());
function updateHeader(){
 header.classList.toggle('scrolled',scrollY>24);
 const heroActions=main.querySelector('.hero-actions');
 header.classList.toggle('past-hero',!heroActions||heroActions.getBoundingClientRect().bottom<header.offsetHeight);
}
window.addEventListener('scroll',updateHeader,{passive:true});
document.addEventListener('click',e=>{if(header.classList.contains('open')&&!header.contains(e.target))closeMenu();});
const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)');
document.addEventListener('pointermove',e=>{
 if(reduceMotion.matches||!finePointer.matches)return;
 const hero=e.target.closest?.('.hero');
 if(hero){
  const r=hero.getBoundingClientRect();
  hero.style.setProperty('--px',((e.clientX-r.left)/r.width-.5).toFixed(3));
  hero.style.setProperty('--py',((e.clientY-r.top)/r.height-.5).toFixed(3));
 }
 const card=e.target.closest?.('.stat,.model-tag');
 if(card){
  const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  card.style.setProperty('--rx',((.5-y)*9).toFixed(2)+'deg');
  card.style.setProperty('--ry',((x-.5)*9).toFixed(2)+'deg');
  card.style.setProperty('--gx',(x*100).toFixed(1)+'%');
  card.style.setProperty('--gy',(y*100).toFixed(1)+'%');
 }
},{passive:true});
document.addEventListener('pointerout',e=>{
 const card=e.target.closest?.('.stat,.model-tag');
 if(card&&!card.contains(e.relatedTarget)){card.style.removeProperty('--rx');card.style.removeProperty('--ry');}
});
document.addEventListener('pointerdown',e=>{
 const target=e.target.closest?.('.btn,.nav-cta,.menu-cta,.login,.model-tag,.stat,.scroll-cue');
 if(!target||reduceMotion.matches)return;
 const r=target.getBoundingClientRect(),ripple=document.createElement('span');
 ripple.className='ripple';ripple.setAttribute('aria-hidden','true');
 ripple.style.left=(e.clientX-r.left)+'px';ripple.style.top=(e.clientY-r.top)+'px';
 ripple.addEventListener('animationend',()=>ripple.remove());
 target.append(ripple);
});
reduceMotion.addEventListener('change',()=>{motionContext?.revert();animatePage();});
window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true});});
render();
