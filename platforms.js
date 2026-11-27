// Product descriptions and programme status are drawn from the supplied company brief.
const aircraft = [
 {
  id:'rjs-h1', name:'RAJAS RJS-H1', subtitle:'Hydrogen hybrid VTOL fixed-wing UAV', type:'Hydrogen UAV', image:'h1', design:'vtol',
  short:'Five hours in the air. No runway needed.',
  description:'The RJS-H1 takes off vertically and cruises on a fixed wing. Raj reports up to five hours of endurance with a 5 kg payload.',
  facts:[['Payload','5 kg'],['Endurance','Up to 5 hours'],['Take-off and landing','Vertical'],['Power','Hydrogen fuel cell + battery']],
  points:[['Airframe','The RJS-H1 combines fixed-wing flight with vertical take-off and landing.'],['Wing','The aircraft cruises on its fixed wing.'],['Lift rotors','Four lift rotors support vertical take-off and landing.'],['V-tail','The V-tail is part of the exterior configuration described by Raj.']]
 },
 {
  id:'heavy-lift',name:'RAJAS Heavy-Lift',subtitle:'Hydrogen cargo VTOL',type:'Under development',image:'h1',design:'cargo',
  short:'Hydrogen-powered transport for remote supply routes.',
  description:'Raj is developing a vertical-lift cargo aircraft for medical supplies, rations and spares. The figures below are design targets.',
  facts:[['Programme','Under development'],['Payload target','100 kg'],['Endurance target','Up to 5 hours'],['Power','Hydrogen fuel cell']],
  points:[['Cargo airframe','A concept impression of the heavy-lift development programme.'],['Wing','The larger aircraft draws on the RJS-H1 family layout.'],['Vertical lift','Vertical take-off and landing are design goals.']]
 },
 {
  id:'hydrogen-isr',name:'Hydrogen ISR Drone',subtitle:'Long-endurance observation aircraft',type:'Hydrogen UAV',image:'h2',design:'survey',
  short:'Watch for a whole shift, not a single sortie.',
  description:'Raj describes a hydrogen aircraft for sustained observation, with day and night video for a ground team.',
  facts:[['Platform','Unmanned aircraft'],['Power','Hydrogen fuel cell'],['Observation','Day and night'],['Endurance figure','Unpublished']],
  points:[['Airframe','A representative exterior for the hydrogen observation programme.'],['Observation','The brief describes sustained day and night observation.']]
 },
 {
  id:'maritime-uav',name:'Maritime UAV',subtitle:'Ship-launched hydrogen aircraft',type:'Maritime systems',image:'h1',design:'maritime',
  short:'An RJS-H1 family aircraft for work at sea.',
  description:'The maritime UAV is a version of the RJS-H1 designed for deck launch and recovery from patrol vessels.',
  facts:[['Family','RJS-H1'],['Environment','Maritime'],['Launch and recovery','Vessel deck'],['Power','Hydrogen fuel cell']],
  points:[['Maritime airframe','This programme adapts the RJS-H1 family for operations at sea.'],['Wing','The maritime concept retains a fixed-wing silhouette.'],['Deck recovery','Raj describes deck launch and recovery without a catapult or net.']]
 },
 {
  id:'underwater-vehicle',name:'Unmanned Underwater Vehicle',subtitle:'Fuel-cell underwater survey vehicle',type:'Maritime systems',image:'configuration',design:'underwater',
  short:'Survey and inspection below the waterline.',
  description:'Raj describes a fuel-cell vehicle for seabed survey, harbour security and underwater infrastructure inspection.',
  facts:[['Environment','Subsurface'],['Power','Fuel cell'],['Survey','Seabed'],['Inspection','Underwater infrastructure']],
  points:[['Hull','A conceptual exterior for an underwater survey vehicle.'],['Survey role','The company brief identifies seabed survey and infrastructure inspection.']]
 },
 {
  id:'loitering-programme',name:'Hydrogen Loitering Munition',subtitle:'Hydrogen-powered programme',type:'Programme overview',image:'h2',design:'concept',
  short:'A hydrogen-powered programme in the RAJ portfolio.',
  description:'Raj lists a hydrogen loitering munition in its unmanned systems portfolio. The public brief does not specify its airframe geometry.',
  facts:[['Category','Unmanned systems'],['Power','Hydrogen fuel cell'],['Visualisation','Generic aircraft silhouette']],
  points:[['Programme illustration','This generic exterior represents the programme in the catalogue. The company has not supplied production geometry.']]
 },
 {
  id:'interceptor',name:'Interceptor Drone',subtitle:'Counter-drone research programme',type:'Under development',image:'h2',design:'concept',
  short:'A recoverable aircraft development programme.',
  description:'Raj identifies the interceptor as a recoverable aircraft under development. The public brief does not specify its airframe geometry.',
  facts:[['Programme','Under development'],['Platform','Recoverable aircraft'],['Visualisation','Generic aircraft silhouette']],
  points:[['Programme illustration','This generic exterior represents a development programme. The company has not supplied production geometry.']]
 }
];
const legacyAirframe = {
 id:'rjs-h2',name:'RJS-H2',subtitle:'Fixed-wing aircraft illustration',type:'Concept view',image:'h2',design:'survey',
 short:'Fixed-wing demonstrator from the original site reference.',
 description:'The RJS-H2 appeared in the original site reference. The company brief supplies no specifications for this designation.',
 facts:[['Visualisation','Exterior concept']],points:[['Airframe','A visual interpretation of the original reference.'],['Wing','The reference depicts a fixed-wing aircraft.']]
};
