// Product descriptions and programme status are drawn from the supplied company brief.
const aircraft = [
 {
  id:'rjs-h1', name:'RAJAS RJS-H1', subtitle:'Hydrogen Hybrid VTOL Fixed-Wing UAV', type:'Hydrogen UAV', image:'h1', design:'vtol',
  short:'Five hours in the air. No runway needed.',
  description:'RJS-H1 takes off and lands vertically on four lift rotors mounted on two wing booms. It then switches to a rear pusher propeller and flies on its high-aspect-ratio wing, steered by a V-tail. A hydrogen fuel cell powers it through the mission. You can launch it from a clearing, a road or a vessel deck, then keep it on station for a full patrol shift.',
  roles:'Roles: border and LoC surveillance, coastal watch, convoy overwatch, artillery spotting, disaster mapping.',
  facts:[['Configuration','Fixed wing with V-tail; 4 VTOL lift rotors on two booms; rear pusher propeller'],['Power','PEM hydrogen fuel cell + Li-ion buffer battery'],['Payload','5 kg'],['Endurance','Up to 5 hours'],['Take-off and landing','Vertical, no runway required']],
  points:[['Airframe','High-aspect-ratio fixed wing with V-tail for long-endurance cruise flight.'],['Lift rotors','Four VTOL lift rotors mounted on two wing booms for vertical take-off and landing.'],['Pusher propulsion','Rear pusher propeller powered by a PEM hydrogen fuel cell + Li-ion buffer battery.'],['Sensors & avionics','Forward EO/IR gimbal turret, air-data pitot probe, and dorsal SATCOM datalink.']],
  seoTitle:'RAJAS RJS-H1 Hydrogen VTOL Drone | 5 kg, 5 hrs',
  seoDesc:'Hydrogen hybrid VTOL fixed-wing UAV with 5 kg payload and up to 5 hours endurance, for border, coastal and ISR missions.'
 },
 {
  id:'heavy-lift', name:'RAJAS Heavy-Lift', subtitle:'100 kg Hydrogen VTOL', type:'Development programme', image:'h1', design:'cargo',
  status:'Development programme. Specifications are design targets.',
  short:'A supply run that doesn’t need a helicopter.',
  description:'The heavy-lift version scales the RJS-H1 layout up to carry 100 kg for up to 5 hours. It is designed for a job that today often needs a helicopter or a team of porters: moving rations, ammunition, medical supplies and spares to forward posts, island units and ships.',
  roles:'Planned roles: high-altitude logistics, casualty-care supply drop, ship-to-shore delivery, large-sensor ISR.',
  facts:[['Payload (target)','100 kg'],['Endurance (target)','Up to 5 hours'],['Power','Hydrogen fuel cell'],['Take-off and landing','Vertical, no runway required']],
  points:[['Heavy-lift airframe','Scaled RJS-H1 layout engineered for 100 kg forward-post logistics.'],['Cargo bay','Under-fuselage payload mount for rations, medical supplies, ammunition, and spares.'],['Vertical lift','Vertical take-off and landing without a runway or helicopter pad.']],
  seoTitle:'100 kg Hydrogen Cargo Drone (In Development)',
  seoDesc:'Heavy-lift hydrogen VTOL drone being developed for forward-post logistics: 100 kg payload, 5-hour design endurance.'
 },
 {
  id:'loitering-programme', name:'Hydrogen Loitering Munition', subtitle:'Hydrogen-powered loitering system', type:'Hydrogen UAV', image:'h2', design:'concept',
  short:'Search longer. Strike only on confirmation.',
  description:'A loitering munition flies to an area, searches it and engages a target only when the operator confirms. Most systems in this class run on batteries, which limits how long they can search. Ours runs on hydrogen, so it can stay over an area much longer and fly with a low acoustic signature.',
  bullets:['Hydrogen fuel-cell power for extended loiter time','Operator-in-the-loop target confirmation','Low acoustic signature'],
  note:'Detailed specifications available to authorised users on request.',
  facts:[['Power','Hydrogen fuel-cell power for extended loiter time'],['Confirmation','Operator-in-the-loop target confirmation'],['Signature','Low acoustic signature'],['Specifications','Available to authorised users on request']],
  points:[['Programme overview','Extended-loiter hydrogen airframe with low acoustic signature and operator-in-the-loop confirmation.']],
  seoTitle:'Hydrogen Loitering Munition | Raj Defence',
  seoDesc:'Long-loiter, operator-confirmed hydrogen loitering munition. Details for authorised users on request.'
 },
 {
  id:'hydrogen-isr', name:'Hydrogen ISR Drone', subtitle:'Long-endurance observation aircraft', type:'Hydrogen UAV', image:'h2', design:'survey',
  short:'Watch for a whole shift, not a single sortie.',
  description:'Intelligence, surveillance and reconnaissance work comes down to time on station. A drone that has to land every 45 minutes leaves gaps in coverage. Our hydrogen ISR platform keeps one aircraft over the area for hours, sending live day and night video to a ground station or command centre.',
  roles:'Suited to: border and LoC watch, anti-infiltration grids, coastal and creek monitoring, protection of critical infrastructure, security for major events.',
  note:'Detailed specifications available on request.',
  facts:[['Mission','Persistent day and night ISR'],['Power','Hydrogen fuel cell'],['Telemetry','Live day and night video to ground station or command centre'],['Specifications','Available on request']],
  points:[['ISR airframe','High-aspect-ratio wing for multi-hour persistent station-keeping.'],['EO/IR payload','Stabilised day and night video transmitted live to the ground control station.']],
  seoTitle:'Long-Endurance Hydrogen ISR Drone | Raj Defence',
  seoDesc:'Persistent day and night surveillance from a hydrogen drone that stays up for hours, not minutes.'
 },
 {
  id:'maritime-uav', name:'Maritime UAV', subtitle:'Ship-launched hydrogen aircraft', type:'Maritime & Underwater', image:'h1', design:'maritime',
  short:'Eyes above and below the waterline.',
  description:'A version of RJS-H1 designed for deck launch and recovery from patrol vessels, with no catapult or recovery net.',
  note:'Detailed specifications available on request.',
  facts:[['Platform family','RJS-H1 maritime variant'],['Launch & recovery','Patrol vessel deck — no catapult or recovery net'],['Power','Hydrogen fuel cell'],['Specifications','Available on request']],
  points:[['Maritime airframe','RJS-H1 variant adapted for patrol vessel deck launch and recovery.'],['Deck operations','Vertical take-off and recovery without a catapult or recovery net.']],
  seoTitle:'Maritime & Underwater Drones | Raj Defence',
  seoDesc:'Ship-launched hydrogen UAVs and fuel-cell underwater vehicles for coastal security and seabed survey.'
 },
 {
  id:'underwater-vehicle', name:'Unmanned Underwater Vehicle', subtitle:'Fuel-cell underwater survey vehicle', type:'Maritime & Underwater', image:'configuration', design:'underwater',
  short:'Eyes above and below the waterline.',
  description:'A fuel-cell-powered underwater vehicle for harbour security, seabed survey and underwater infrastructure inspection. Air-independent fuel-cell power can give it more time submerged than a vehicle of the same size running on batteries.',
  note:'Detailed specifications available on request.',
  facts:[['Power','Air-independent fuel cell'],['Roles','Harbour security, seabed survey, underwater infrastructure inspection'],['Endurance','More time submerged than battery equivalents'],['Specifications','Available on request']],
  points:[['Hydrodynamic hull','Fuel-cell-powered underwater hull for harbour security and seabed survey.'],['Subsurface inspection','Air-independent fuel-cell power for extended submerged inspection missions.']],
  seoTitle:'Maritime & Underwater Drones | Raj Defence',
  seoDesc:'Ship-launched hydrogen UAVs and fuel-cell underwater vehicles for coastal security and seabed survey.'
 },
 {
  id:'interceptor', name:'Interceptor Drone', subtitle:'Counter-drone interceptor UAV', type:'Development programme', image:'h2', design:'concept',
  status:'Development programme.',
  short:'Stop the threat before it reaches the fence.',
  description:'Small hostile drones are now used for surveillance, smuggling and attack across borders, airbases and critical sites. Shooting them down with guns or missiles is costly and risky near people and buildings. Our interceptor drone is a fast, recoverable aircraft that is launched when a threat is detected, guided onto the intruding drone and used to bring it down.',
  bullets:[
   'Detect: works with radar, RF and electro-optical sensors already at the site.',
   'Launch: vertical launch within seconds, with no runway or catapult.',
   'Track: onboard camera and guidance lock on to the target drone.',
   'Defeat: the operator authorises the interception before it happens.'
  ],
  roles:'Designed for: airbases, border outposts, forward bases, refineries, power plants, ports and protection of VIP events. Why it matters: an interceptor costs far less than a missile, can be reused when the mission allows, and keeps the engagement in the air, away from people on the ground.',
  note:'Detailed specifications available to authorised users on request.',
  facts:[['Status','Development programme'],['Launch','Vertical launch within seconds, no runway or catapult'],['Sensor integration','Radar, RF and electro-optical site sensors'],['Specifications','Available to authorised users on request']],
  points:[['Interceptor airframe','Fast, recoverable counter-drone aircraft with vertical launch capability.']],
  seoTitle:'Counter-Drone Interceptor UAV | Raj Defence',
  seoDesc:'Fast-launch interceptor drone to detect, track and bring down hostile small drones at bases, borders and critical sites.'
 }
];
const legacyAirframe = {
 id:'rjs-h2', name:'RJS-H2', subtitle:'Fixed-wing aircraft illustration', type:'Concept view', image:'h2', design:'survey',
 short:'Fixed-wing demonstrator from the original site reference.',
 description:'The RJS-H2 appeared in the original site reference. The company brief supplies no specifications for this designation.',
 facts:[['Visualisation','Exterior concept']], points:[['Airframe','A visual interpretation of the original reference.'],['Wing','The reference depicts a fixed-wing aircraft.']]
};
