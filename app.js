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
 return '<img class="' + cls + '" src="assets/' + name + '.webp" alt="' + alt + '" width="1920" height="1080" decoding="async" loading="' + loading + '"' + priority + '>';
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
const rajasMissions=[
 ['Border & LoC Surveillance',['Persistent 5-hour aerial watch over forward sectors without runway infrastructure.','Live day/night EO/IR video feed to ground command stations.','Low acoustic and thermal signature from electric PEM fuel-cell propulsion.']],
 ['Communication Support',['Airborne relay for extended-range tactical and homeland security networks.','Supports multi-agency coordination across difficult terrain.','Maintains steady station-keeping on fixed-wing cruise.']],
 ['Security Deployment',['Rapid vertical take-off from clearings, roads, or forward outposts.','5 kg modular payload bay for mission-specific surveillance sensors.','Minute-fast hydrogen cylinder swap for quick sortie turnaround.']],
 ['Emergency Deployment',['Immediate launch for disaster mapping and situational assessment.','No catapult, launcher, or prepared airstrip required.','Quiet electric operation suitable for dense or sensitive areas.']],
 ['Coastal & Maritime Watch',['Designed for patrol vessel deck launch and vertical recovery.','Sustained monitoring of coastlines, creeks, and harbour approaches.','Resilient airframe built and assembled in Pune, India.']],
 ['Critical Infrastructure',['Continuous perimeter overwatch for ports, refineries, and power plants.','Early detection of unauthorised intrusion or anomalous activity.','Zero-combustion flight with minimal maintenance overhead.']],
 ['Convoy Overwatch',['Multi-hour route reconnaissance ahead of moving ground convoys.','Real-time hazard identification across mountainous and remote corridors.','One shared hydrogen power family simplifies unit logistics.']],
 ['Artillery Spotting',['High-aspect-ratio wing flight for stable long-range observation.','Accurate target acquisition and post-strike assessment.','Indigenous design with domestic Indian supply chain.']]
];
const timelinePhases=[
 ['PHASE 01','GAS ENGINEERING HERITAGE','Raj Process Equipments & Systems builds industrial biogas, PSA purification, and 200–250 bar compressed-gas plants in Pune.'],
 ['PHASE 02','GREEN HYDROGEN INFRASTRUCTURE','Turnkey electrolysis-based green hydrogen generation, ~99.99% gas purification, and high-pressure storage testbeds.'],
 ['PHASE 03','HYBRID VTOL ARCHITECTURE','PEM hydrogen fuel cell paired with a Li-ion buffer battery for vertical lift and efficient fixed-wing cruise.'],
 ['PHASE 04','RAJAS RJS-H1 PLATFORM','Up to 5 hours endurance with 5 kg payload, 4 wing-boom lift rotors, V-tail, and rear pusher propeller.'],
 ['PHASE 05','MULTI-DOMAIN EXPANSION','Maritime deck-launched UAV, air-independent fuel-cell UUV, Hydrogen ISR, and Loitering Munition programmes.'],
 ['PHASE 06','NEXT-GEN DEVELOPMENT','100 kg Heavy-Lift Hydrogen VTOL logistics aircraft and rapid-launch Counter-Drone Interceptor UAV.']
];
// Positions are fractions of the hero photo and are illustrative. Update them when the photo changes.
const powerPoints=[
 {x:60,y:73,wire:130,flip:true,symbol:'zap',title:'Fuel cell for cruise',text:'Steady power in forward flight'},
 {x:68.1,y:64.8,wire:186,symbol:'battery-charging',title:'Battery buffer for lift',text:'Powers vertical take-off'},
 {x:86.8,y:72.6,wire:162,flip:true,symbol:'plane',title:'Fixed wing for range',text:'Less energy than hovering'}
];
function heroPoints() {
 return '<div class="hero-frame hero-overlay"><ul class="hero-scene" aria-label="How the hydrogen hybrid system works">' + powerPoints.map(p=>'<li class="point'+(p.flip?' flip':'')+'" style="left:'+p.x+'%;top:'+p.y+'%;--wire:'+p.wire+'px"><div class="point-card">'+icon(p.symbol)+'<span><strong>'+p.title+'</strong><small>'+p.text+'</small></span></div></li>').join('') + '</ul></div>';
}
function home() {
 const missionNodes=rajasMissions.map(([title],i)=>'<button class="mission-node pos-'+i+'" data-mission="'+i+'" aria-expanded="false"><span>'+title+'</span><b>+</b></button>').join('');
 const ticks='<span class="tl-major"></span>'+'<i></i>'.repeat(11);
 const tlItems=[...timelinePhases,...timelinePhases].map(([phase,title,desc])=>'<article class="tl-item"><div class="tl-ruler" aria-hidden="true">'+ticks+'</div><div class="tl-body"><strong>'+phase+'</strong><span>'+title+'</span><p>'+desc+'</p></div></article>').join('');
 return '<section class="hero" aria-labelledby="hero-title">' +
 '<div class="hero-frame"><div class="hero-scene">' + image('hero',mediaNames.hero,'backdrop') + '</div></div>' +
 '<div class="hero-shade" aria-hidden="true"></div>' +
 '<div class="hero-copy"><div class="marked">' + marker + '<div>' +
 '<h1 id="hero-title"><span class="line"><span>Hydrogen-powered</span></span><span class="line"><span>unmanned systems.</span></span><span class="line"><span>Built in India.</span></span></h1>' +
 '<p>Raj Defence and Aerospace designs and manufactures long-endurance hydrogen fuel-cell drones for the armed forces, central armed police forces and homeland security agencies.</p>' +
 '</div></div>' +
 '<div class="hero-actions"><a class="btn btn-primary" href="#/contact">Request a briefing'+icon('arrow-right')+'</a><button class="btn btn-ghost" data-panel="capability">'+icon('file-text')+'Capability statement</button></div>' +
 play('overview','Watch overview') +
 '</div>' +
 heroPoints() +
 '<a class="btn hero-3d-link" href="#/systems/rjs-h1/configuration">View RJS-H1 in 3D'+icon('rotate-3d')+'</a>' +
 floating('Why hydrogen','a cleaner, longer-endurance advantage','data-scroll="hydrogen"') +
 '</section>' +
 '<section class="hydrogen grid-paper" id="hydrogen"><div class="grid-overlay" aria-hidden="true"></div><div class="trace trace-a" aria-hidden="true"></div><div class="trace trace-b" aria-hidden="true"></div><div class="hydrogen-copy"><p class="orange-rule">RAJ develops hydrogen-powered unmanned systems that deliver extended endurance, higher payload flexibility, and a lower environmental footprint, aligned with India’s self-reliant defence and aerospace goals.</p><p>Our hydrogen platforms combine proven airframe design, advanced propulsion integration, and mission-specific modularity for real-world defence and surveillance needs.</p></div><div class="hydrogen-side"><i class="down" aria-hidden="true"></i><strong>Sustainable systems.<br>Operationally proven.<br>Built in India.</strong></div>' + button('Read more about our approach','data-panel="approach"') + '</section>' +
 '<section class="home-systems grid-paper" id="systems"><div class="section-heading"><h2>Our systems</h2><p>mission-ready platforms</p></div><div class="home-cards">' + smallCard(systems[0]) + '<div class="orange-card"><div>RJS-H1' + icon('plane') + '</div><nav><a href="#/systems/rjs-h1">Overview</a><button data-panel="rjs-h1">Key features</button><a href="#/systems/rjs-h1/configuration">Explore in 3D</a></nav></div>' + smallCard(systems[1]) + '</div></section>' +
 '<section class="fleet-showcase" id="fleet-showcase" aria-labelledby="showcase-heading">' +
 '<div class="showcase-head"><h2 id="showcase-heading">Hydrogen Unmanned Systems</h2><p>RAJ Defence &amp; Aerospace delivers mission-oriented hydrogen platforms built in India for long-endurance ISR, heavy-lift, and multi-domain readiness.</p></div>' +
 '<div class="showcase-stage"><div class="showcase-watermark" id="showcase-watermark" aria-hidden="true">RJS-H1</div>' +
 '<button class="showcase-nav prev" id="showcase-prev" aria-label="Previous platform">'+icon('arrow-left')+'</button>' +
 '<button class="showcase-nav next" id="showcase-next" aria-label="Next platform">'+icon('arrow-right')+'</button>' +
 '<div class="drag-pill" aria-hidden="true"><span></span>DRAG</div></div>' +
 '<div class="showcase-meta"><span class="showcase-tag" id="showcase-tag">RAJAS RJS-H1</span><h3 id="showcase-mission">Five hours in the air. No runway needed.</h3><a class="showcase-cta" id="showcase-cta" href="#/systems/rjs-h1/configuration">Discover More</a></div>' +
 '</section>' +
 '<section class="rajas-missions" id="rajas-missions" aria-labelledby="missions-heading">' +
 '<h2 id="missions-heading">Capabilities and typical missions<br>for RAJAS RJS-H1<span class="dot">.</span></h2>' +
 '<div class="missions-arena" id="missions-arena">' + missionNodes +
 '<div class="mission-popover" id="mission-popover" hidden><h3 id="mp-title"></h3><ul id="mp-list"></ul></div></div>' +
 '<div class="timeline-band" aria-label="Engineering and programme timeline"><div class="timeline-track">' + tlItems + '</div></div>' +
 '</section>' +
 '<section class="spotlight-band" id="heavy-lift-spotlight" aria-labelledby="spotlight-title">' +
 '<div class="spotlight-stats" aria-label="Heavy-lift targets"><div><span>Endurance</span><strong>Up to 5 Hours</strong></div><div><span>Payload</span><strong>100 kg</strong></div><div><span>Power</span><strong>Hydrogen Fuel Cell</strong></div></div>' +
 '<div class="spotlight-grid"><div class="spotlight-stage" id="spotlight-stage"></div>' +
 '<div class="spotlight-copy"><span class="spotlight-eyebrow">Unmanned Logistics Systems</span><h2 id="spotlight-title">RAJAS Heavy-Lift</h2><p class="spotlight-lead">A supply run that doesn’t need a helicopter.</p><p>The heavy-lift version scales the RJS-H1 layout up to carry 100 kg for up to 5 hours. Designed for moving rations, ammunition, medical supplies and spares to forward posts, island units and ships.</p>' +
 '<div class="spotlight-links"><button data-panel="heavy-lift">Technical Specification <span>›</span></button><a href="#/systems/heavy-lift/configuration">Key Features <span>›</span></a></div>' +
 '<a class="spotlight-btn" href="#/systems/heavy-lift/configuration">Read More</a></div></div>' +
 '</section>';
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
 const bullets=s.bullets?'<ul class="model-bullets">'+s.bullets.map(b=>'<li>'+b+'</li>').join('')+'</ul>':'';
 const status=s.status?'<p class="model-status">'+s.status+'</p>':'';
 const roles=s.roles?'<p class="model-roles">'+s.roles+'</p>':'';
 const note=s.note?'<p class="model-note">'+s.note+'</p>':'';
 return crumb(crumbs)+'<section class="showroom"><div class="showroom-info"><label class="model-choice">Platform<select id="model-choice">'+options+'</select></label><div class="model-summary"><div class="model-type">'+s.type+'</div><h1>'+s.name+'</h1><p>'+s.short+'</p></div><div class="component-info"><div class="component-nav"><button data-cycle="-1" aria-label="Previous detail">'+icon('chevron-left')+'</button><span id="spot-counter"></span><button data-cycle="1" aria-label="Next detail">'+icon('chevron-right')+'</button></div><div id="spot-text" aria-live="polite"></div></div></div><div class="orbit-stage" data-design="'+s.design+'"><p class="viewer-loading" role="status">Loading 3D view…</p>'+hotspots+'<div class="orbit-caption">Illustrative exterior concept</div><div class="orbit-controls" aria-label="Model controls">'+commands.map(([key,symbol,label])=>'<button data-camera="'+key+'" title="'+label+'" aria-label="'+label+'">'+icon(symbol)+'</button>').join('')+'</div></div></section><section class="model-overview"><div><h2>'+s.subtitle+'</h2>'+status+'<p>'+s.description+'</p>'+bullets+roles+note+'</div>'+facts(s)+'</section>';
}
const gasPillars=[
 ['pressure','Pressure','Engineered for high-pressure hydrogen storage and handling (up to 200–250 bar industrial heritage), with margins suitable for flight operations.'],
 ['purity','Purity','Multi-stage gas purification and PSA/membrane separation experience applied to PEM fuel-cell purity (~99.99% H₂) requirements.'],
 ['leak','Leak control','Every airborne fuel system is leak-tested before dispatch using parent-company industrial gas-plant inspection protocols.'],
 ['interlocks','Safety interlocks','Automated pressure, regulator, and valve safety interlocks adapted from PLC/SCADA industrial gas-plant architecture.']
];
function editorial(type) {
 const co=type==='company', title=co?'From gas<br>engineering<br>to aerospace.':'Built to<br>be inspected.';
 const lead=co?'Raj Defence and Aerospace Pvt. Ltd. is the defence company of the Raj group, Pune. The group began with process engineering. Raj Process Equipments and Systems has built biogas and compressed-gas plants for industry across India.':'Defence customers don’t take a supplier’s word for it, and they shouldn’t. Our processes are written down, our records are open to customer inspectors, and our products are tested to the standard the user specifies.';
 const story=co
  ?'<p>That work led us to hydrogen. A fuel-cell drone is basically a small, flying gas plant. It needs a pressure vessel, a regulator, a purity requirement and a power system that must not fail. We set up Raj Defence and Aerospace so we could apply that knowledge to unmanned aircraft.</p><p><strong>Our vision:</strong> To be India’s reference supplier of hydrogen-powered unmanned systems.<br><strong>Our mission:</strong> To give Indian forces aircraft that stay up longer and make less noise, designed and built in India.</p><ul class="model-bullets"><li><strong>Claims we can prove.</strong> Every figure we publish comes from our own testing. We invite users to verify it.</li><li><strong>Indian supply chain.</strong> We source domestically wherever it does not compromise performance.</li><li><strong>Lawful supply only.</strong> We supply governments and authorised entities, under Indian licensing and end-user rules.</li></ul>'
  :'<p><strong>Certifications and approvals:</strong> available on request.</p><p><strong>Export:</strong> Exports of Munitions List items require an authorisation from the Department of Defence Production, Ministry of Defence, which we obtain for each export.</p><p><strong>Responsible supply:</strong> We do not sell to individuals or unverified buyers. Every order is checked against end-user documentation.</p>';
 const gasSection=co
  ?'<section class="gas-schematic grid-paper" aria-labelledby="gas-title"><div class="gas-top"><div class="gas-copy"><h2 id="gas-title">We come from<br>gas engineering.</h2><p>Decades of experience in the design, storage and safe handling of industrial gases at Raj Process Equipments &amp; Systems (Pune), now applied to hydrogen flight systems.</p><span class="gas-rule" aria-hidden="true"></span></div><div class="gas-stage" id="gas-stage"><div class="gas-labels" aria-hidden="true"><span>HYDROGEN VESSEL<br><small>(H₂, HIGH-PRESSURE)</small></span><span>RAJAS PLATFORM<br><small>(HYDROGEN-POWERED)</small></span></div></div></div><div class="gas-bar"><div class="gas-tabs" role="tablist" aria-label="Gas engineering pillars">'+gasPillars.map(([k,label],i)=>'<button role="tab" data-pillar="'+k+'" aria-selected="'+(i===0?'true':'false')+'">'+label+'</button>').join('')+'</div><p class="gas-note" id="gas-note">'+gasPillars[0][2]+'</p></div></section>'
  +'<section class="heritage-band"><div class="section-heading"><h2>Raj Process Equipments &amp; Systems</h2><p>Parent company engineering heritage (Pune, India)</p></div><div class="heritage-grid"><div><h3>Green Hydrogen Plants</h3><p>Turnkey electrolysis-based green hydrogen production, ~99.99% gas purification, and high-pressure storage infrastructure.</p></div><div><h3>Compressed Gas &amp; CBG</h3><p>Industrial biogas upgradation, PSA &amp; membrane gas separation, and high-pressure compression skids up to 200–250 bar.</p></div><div><h3>Automated Safety</h3><p>PLC/SCADA process automation, real-time gas monitoring, pressure regulation, and multi-stage leak-control interlocks.</p></div><div><h3>Pune Manufacturing &amp; R&amp;D</h3><p>Manufacturing facilities across Bhosari, Chakan, and Satara with dedicated in-house R&amp;D and pilot testbeds.</p></div></div></section>'
  :'';
 const qualityCad='<div class="quality-cad" aria-hidden="true"><svg viewBox="0 0 680 420" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">'
  +'<g stroke-width="1.15">'
  // Left foreground propeller & hub
  +'<path d="M24 38 L242 82 L242 90 L24 44 Z"/><path d="M286 92 L462 126 L460 133 L284 98 Z"/>'
  +'<rect x="246" y="76" width="36" height="8" rx="2"/><circle cx="264" cy="76" r="2.5"/><line x1="252" y1="76" x2="252" y2="84"/><line x1="276" y1="76" x2="276" y2="84"/>'
  // Foreground brushless motor bell with cooling ribs & mounting flange
  +'<rect x="238" y="84" width="52" height="36" rx="3"/><ellipse cx="264" cy="84" rx="26" ry="4"/>'
  +'<path d="M238 92 H290 M238 98 H290 M238 104 H290 M238 110 H290 M238 116 H290"/>'
  +'<path d="M244 84 V120 M254 84 V120 M264 84 V120 M274 84 V120 M284 84 V120" stroke-width=".65" opacity=".7"/>'
  +'<rect x="234" y="120" width="60" height="10" rx="2"/><path d="M242 130 H286 L282 138 H246 Z"/>'
  // Foreground boom arm with collar rings into fuselage
  +'<path d="M288 122 L534 172 L530 186 L284 136 Z"/>'
  +'<path d="M312 127 L309 141 M502 165 L498 180 M524 170 L520 185"/>'
  // Rear-right propeller & motor assembly
  +'<path d="M364 16 L464 58 L462 65 L362 22 Z"/><path d="M498 72 L572 104 L570 110 L496 78 Z"/>'
  +'<rect x="466" y="54" width="30" height="7" rx="2"/>'
  +'<rect x="460" y="61" width="42" height="30" rx="3"/><ellipse cx="481" cy="61" rx="21" ry="3.5"/>'
  +'<path d="M460 68 H502 M460 74 H502 M460 80 H502 M460 86 H502"/>'
  +'<rect x="457" y="91" width="48" height="8" rx="2"/>'
  +'<path d="M503 94 L604 128 L600 138 L499 104 Z"/>'
  // Faceted upper avionics hood & airframe nose/bulkhead cutout
  +'<path d="M534 114 L576 74 L678 88 V412 H534 V320 C504 316 492 296 492 272 V248 C492 226 510 214 528 206 L516 184 L534 114 Z"/>'
  +'<path d="M576 74 L598 118 L678 128 M534 114 L598 118 M598 118 L586 188 L678 196"/>'
  +'<path d="M530 172 H588 M528 206 H678 M512 246 H678 M492 274 H678 M534 320 H678"/>'
  +'<path d="M558 120 V320 M612 124 V412 M648 126 V320" stroke-width=".75" opacity=".7"/>'
  // Payload mounting plate & detailed 3-axis EO/IR gimbal turret
  +'<rect x="498" y="318" width="44" height="12" rx="2"/><path d="M472 330 H564"/>'
  +'<path d="M454 330 V376 C454 402 474 416 498 416 C522 416 542 402 542 376 V330"/>'
  +'<circle cx="498" cy="376" r="36"/><circle cx="498" cy="376" r="24"/><circle cx="498" cy="376" r="12"/>'
  +'<circle cx="490" cy="374" r="5"/>'
  +'</g>'
  +'<g stroke-width=".65" stroke-dasharray="3 4" opacity=".48">'
  +'<line x1="264" y1="54" x2="264" y2="152"/><line x1="481" y1="38" x2="481" y2="112"/>'
  +'<line x1="498" y1="312" x2="498" y2="418"/><line x1="444" y1="376" x2="554" y2="376"/>'
  +'</g></svg></div>';
 return crumb([[co?'About Us':'Quality & Compliance']])+'<section class="inner-hero editorial">'+image(type,mediaNames[type],'backdrop')+'<div class="shade"></div><div class="inner-copy">'+marked('<h1>'+title+'</h1><p>'+lead+'</p>')+'</div>'+floating(co?'What we stand for':'Our quality approach',co?'engineering depth, aerospace focus':'disciplined, traceable, and compliant','data-scroll="story"')+'</section><section class="story grid-paper" id="story"><div class="section-heading"><h2>'+(co?'What we stand for':'Quality & compliance')+'</h2></div>'+story+(co?'':qualityCad)+'</section>'+gasSection;
}
function contact() {
 const productOpts=aircraft.map(a=>'<option value="'+a.name+'">'+a.name+'</option>').join('');
 return crumb([['Contact']])+'<section class="contact grid-paper"><div>'+marked('<h1>Talk to<br>our team.</h1><p>We work with the armed forces, central armed police forces, state police, defence PSUs and authorised integrators. Tell us about your requirement and our team will get back to you.</p><ul class="contact-list"><li>'+icon('mail')+'<a href="mailto:info@rajda.in">info@rajda.in</a></li><li>'+icon('map-pin')+'Pune, Maharashtra, India</li></ul>')+'</div><form id="enquiry"><label>Organisation<input name="organisation" autocomplete="organization" required></label><label>Name<input name="name" autocomplete="name" required></label><label>Designation<input name="designation" autocomplete="organization-title"></label><label>Official email (government / company domain)<input type="email" name="email" autocomplete="email" required></label><label>Phone<input type="tel" name="phone" autocomplete="tel"></label><label>Product of interest<select name="product">'+productOpts+'</select></label><label>Requirement<textarea name="enquiry" rows="4" required></textarea></label><label class="check-row"><input type="checkbox" name="confirm" required><span>I confirm this enquiry is on behalf of a government or authorised entity.</span></label><button class="line-btn" type="submit"><span></span>Prepare email enquiry</button><p class="form-note">Opens a draft in your email app.</p><p id="form-status" role="status"></p></form></section>';
}
function panel(key) {
 let title, body;
 const s=systems.find(item=>item.id===key);
 if(s){
  title=s.name;
  const bullets=s.bullets?'<ul class="model-bullets">'+s.bullets.map(b=>'<li>'+b+'</li>').join('')+'</ul>':'';
  body='<p><b>'+s.subtitle+'</b> — '+s.short+'</p><p>'+s.description+'</p>'+bullets+(s.roles?'<p>'+s.roles+'</p>':'')+(s.design?facts(s)+link('Explore in 3D','#/systems/'+s.id+'/configuration'):link('Explore system','#/systems/'+s.id));
 } else {
  const content={
   capability:['Capability statement','The capability statement is shared on request with government and authorised entities.',link('Request a copy','#/contact')],
   access:['Partner access','For partner portal access, contact the RAJ Defence & Aerospace team.',link('Contact the team','#/contact')],
   approach:['Why our drones run on hydrogen','Battery drones carry limited energy for their weight, while petrol-engine drones are noisy and run hot. A PEM hydrogen fuel cell combines onboard hydrogen with air to produce electricity, water vapour and minimal heat—delivering up to 5 hours endurance with a 5 kg payload on the RAJAS RJS-H1, low acoustic/thermal signature, and minute-fast cylinder swaps.',link('Explore our systems','#/systems')],
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
let unmountCarousel=null;
let unmountGas=null;
let unmountRajas=null;
let unmountSpotlight=null;
function openSpotlight(stage){
 import('./viewer.js').then(({mountSideSpotlight})=>{
  if(!stage.isConnected)return;
  unmountSpotlight=mountSideSpotlight(stage);
 }).catch(()=>{});
}
function openRajasMissions(arena){
 import('./viewer.js').then(({mountRajasShowcase})=>{
  if(!arena.isConnected)return;
  const ctrl=mountRajasShowcase(arena);
  unmountRajas=ctrl.destroy;
  const pop=document.getElementById('mission-popover');
  const titleEl=document.getElementById('mp-title');
  const listEl=document.getElementById('mp-list');
  let activeIdx=-1;
  arena.querySelectorAll('[data-mission]').forEach(btn=>{
   btn.addEventListener('click',()=>{
    const idx=Number(btn.dataset.mission);
    const same=activeIdx===idx;
    activeIdx=same?-1:idx;
    arena.querySelectorAll('[data-mission]').forEach((b,i)=>{
     const open=i===activeIdx;
     b.setAttribute('aria-expanded',String(open));
     b.querySelector('b').textContent=open?'−':'+';
    });
    if(same){pop.hidden=true;return;}
    const [title,items]=rajasMissions[idx];
    titleEl.textContent=title;
    listEl.innerHTML=items.map(t=>'<li>'+t+'</li>').join('');
    pop.hidden=false;
    ctrl.focus(idx);
   });
  });
 }).catch(()=>{});
}
function openGasSchematic(stage){
 import('./viewer.js').then(({mountGasSchematic})=>{
  if(!stage.isConnected)return;
  const ctrl=mountGasSchematic(stage);
  unmountGas=ctrl.destroy;
  document.querySelectorAll('[data-pillar]').forEach(btn=>{
   btn.addEventListener('click',()=>{
    const key=btn.dataset.pillar;
    document.querySelectorAll('[data-pillar]').forEach(b=>b.setAttribute('aria-selected',String(b===btn)));
    const note=document.getElementById('gas-note');
    const found=gasPillars.find(p=>p[0]===key);
    if(note&&found)note.textContent=found[2];
    ctrl.setStage(key);
   });
  });
 }).catch(()=>{});
}
const showcaseWatermark=s=>({ 'rjs-h1':'RJS-H1','heavy-lift':'HEAVY-LIFT','hydrogen-isr':'ISR-H2','maritime-uav':'MARITIME','underwater-vehicle':'UUV-H2','loitering-programme':'LOITER','interceptor':'INTERCEPT' }[s.id]||s.name);
function openCarousel(stage){
 import('./viewer.js').then(({mountCarousel})=>{
  if(!stage.isConnected)return;
  const ctrl=mountCarousel(stage,aircraft,idx=>{
   const s=aircraft[idx];
   const wm=document.getElementById('showcase-watermark');
   const tag=document.getElementById('showcase-tag');
   const mission=document.getElementById('showcase-mission');
   const cta=document.getElementById('showcase-cta');
   if(wm)wm.textContent=showcaseWatermark(s);
   if(tag)tag.textContent=s.name;
   if(mission)mission.textContent=s.short;
   if(cta)cta.href='#/systems/'+s.id+'/configuration';
  });
  document.getElementById('showcase-prev')?.addEventListener('click',ctrl.prev);
  document.getElementById('showcase-next')?.addEventListener('click',ctrl.next);
  unmountCarousel=ctrl.destroy;
 }).catch(()=>{});
}
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
function scrambleText(el, duration=1100, delay=0){
 const target=el.dataset.text||el.textContent;
 el.dataset.text=target;
 const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 const len=target.length;
 const start=performance.now()+delay;
 function frame(now){
  const t=Math.max(0,Math.min(1,(now-start)/duration));
  const locked=Math.floor(t*len);
  let out='';
  for(let i=0;i<len;i++){
   const ch=target[i];
   if(!/[A-Za-z0-9]/.test(ch)){out+=ch;}
   else if(i<locked){out+=ch;}
   else{out+=chars[Math.floor(Math.random()*chars.length)];}
  }
  el.textContent=out;
  if(t<1)requestAnimationFrame(frame);
  else el.textContent=target;
 }
 el.textContent=target.replace(/[A-Za-z0-9]/g,()=>chars[Math.floor(Math.random()*chars.length)]);
 requestAnimationFrame(frame);
}
function animateHero(){
 const lines=main.querySelectorAll('.hero h1 .line>span');
 lines.forEach((span,i)=>scrambleText(span,950,i*140));
 const sub=main.querySelector('.hero-copy p');
 if(sub){
  sub.style.height=sub.offsetHeight+'px';sub.style.overflow='hidden';
  scrambleText(sub,1200,260);
  setTimeout(()=>{sub.style.height='';sub.style.overflow='';},1600);
 }
 gsap.timeline({defaults:{ease:'power3.out',clearProps:'transform,opacity'}})
  .from('.hero .backdrop',{scale:1.05,duration:1.8},0)
  .from('.hero .marker',{opacity:0,y:-12,duration:.45},.1)
  .from('.hero .floating',{opacity:0,y:16,duration:.6},.65)
  .from('.hero-actions, .hero-copy>.film-link',{opacity:0,y:14,duration:.55,stagger:.08},.5)
  .from('.point',{opacity:0,duration:.5,stagger:.22},1.2)
  .from('.hero-3d-link',{opacity:0,duration:.45},1.7);
}
function render(){
 unmountViewer?.();unmountViewer=null;activeModel=null;
 unmountCarousel?.();unmountCarousel=null;
 unmountGas?.();unmountGas=null;
 unmountRajas?.();unmountRajas=null;
 unmountSpotlight?.();unmountSpotlight=null;
 motionContext?.revert();
 if(dialog.open)dialog.close();
 closeMenu();
 const [route,id,sub]=(location.hash.replace(/^#\/?/,'')||'').split('/');
 let html, name, seoTitle, seoDesc;
 if(route==='products'||(route==='systems'&&!id)){name='Systems';html=catalogue(name);seoTitle='Unmanned Systems | Raj Defence and Aerospace';seoDesc='Explore RAJAS RJS-H1, Heavy-Lift, ISR, Loitering Munition, Interceptor, and Maritime hydrogen platforms.';}
 else if(route==='systems'&&systems.some(s=>s.id===id)){const s=systems.find(s=>s.id===id); name=s.name; html=s.design&&sub==='configuration'?configuration(s):systemPage(s); seoTitle=s.seoTitle||(s.name+' | Raj Defence and Aerospace'); seoDesc=s.seoDesc||s.description;}
 else if(route==='company'||route==='quality'){name=route==='company'?'Company':'Quality';html=editorial(route);seoTitle=route==='company'?'About Raj Defence and Aerospace, Pune':'Quality & Compliance | Raj Defence and Aerospace';seoDesc=route==='company'?'The defence company of the Raj group. Gas-engineering experience applied to hydrogen-powered drones.':'Built to be inspected: documented processes, end-user verification, and Indian export compliance.';}
 else if(route==='contact'){name='Contact';html=contact();seoTitle='Contact Raj Defence and Aerospace';seoDesc='Enquiries from armed forces, CAPFs, police and authorised defence entities.';}
 else {name='Home';html=home();seoTitle='Raj Defence and Aerospace | Hydrogen VTOL Drones';seoDesc='Indian maker of hydrogen fuel-cell VTOL drones for defence and homeland security.';}
 header.classList.toggle('home-header',name==='Home');
 main.innerHTML=html;
 document.title=seoTitle;
 document.querySelector('meta[name="description"]')?.setAttribute('content',seoDesc);
 document.querySelectorAll('#primary-nav a').forEach(a=>{if(a.hash==='#/'+route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(main.querySelector('.orbit-stage'))openViewer(systems.find(s=>s.id===id));
 const showcaseStage=main.querySelector('.showcase-stage');
 if(showcaseStage)openCarousel(showcaseStage);
 const gasStage=main.querySelector('#gas-stage');
 if(gasStage)openGasSchematic(gasStage);
 const missionsArena=main.querySelector('#missions-arena');
 if(missionsArena)openRajasMissions(missionsArena);
 const spotlightStage=main.querySelector('#spotlight-stage');
 if(spotlightStage)openSpotlight(spotlightStage);
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
 const body=form.get('enquiry')+'\n\n'+['Organisation: '+form.get('organisation'),'Name: '+form.get('name'),form.get('designation')?'Designation: '+form.get('designation'):'','Email: '+form.get('email'),form.get('phone')?'Phone: '+form.get('phone'):'','Product of interest: '+form.get('product')].filter(Boolean).join('\n');
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
