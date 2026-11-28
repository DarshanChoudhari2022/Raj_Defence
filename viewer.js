import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';

// The scene is an exterior display miniature in arbitrary scene units.
function makeModel(design, shaded) {
  const model = new THREE.Group();
  const finish = (color, metallic = 0.15) => shaded
    ? new THREE.MeshStandardMaterial({color, metalness: metallic, roughness: 0.34, side: THREE.DoubleSide})
    : new THREE.MeshLambertMaterial({color, side: THREE.DoubleSide});
  const pearl = finish(design === 'maritime' ? 0xd8e3e6 : 0xe1e4df, 0.4);
  const carbon = finish(0x282d2f, 0.45);
  const trim = finish(0x65706c, 0.5);
  const darkMetal = finish(0x3a4042, 0.7);
  const glass = finish(0x111518, 0.85);
  const navRed = finish(0xd93829, 0.2);
  const navGreen = finish(0x2fa84f, 0.2);
  const hiVis = finish(0xfa681c, 0.25);
  const accent = finish(design === 'underwater' ? 0xe39826 : design === 'maritime' ? 0x265d72 : 0x516141);
  function mesh(geometry, material, x=0,y=0,z=0) {
    const part = new THREE.Mesh(geometry,material);
    part.position.set(x,y,z);
    model.add(part);
    return part;
  }
  function oval(material,position,scale) {
    const part=mesh(new THREE.SphereGeometry(1,32,18),material,...position);
    part.scale.set(...scale);
    return part;
  }
  function bar(from,to,radius,material) {
    const a=new THREE.Vector3(...from), b=new THREE.Vector3(...to), direction=b.clone().sub(a);
    const part=mesh(new THREE.CylinderGeometry(radius,radius,direction.length(),12),material);
    part.position.copy(a).lerp(b,0.5);
    part.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());
    return part;
  }
  // Rounded lofts convey the external silhouette without modelling internal hardware.
  function surface(left,right,rootWidth,tipWidth,material) {
    const a=new THREE.Vector3(...left), b=new THREE.Vector3(...right);
    const span=b.clone().sub(a).normalize(), chord=new THREE.Vector3(0,0,1);
    const normal=chord.clone().cross(span).normalize();
    const vertices=[], indices=[], rings=15, sides=24;
    for(let r=0;r<=rings;r++){
      const t=r/rings,center=a.clone().lerp(b,t);
      const tip=t>.87?Math.sqrt(Math.max(.004,1-Math.pow((t-.87)/.13,2))):1;
      const width=THREE.MathUtils.lerp(rootWidth,tipWidth,t)*tip;
      for(let j=0;j<sides;j++){
        const angle=j/sides*Math.PI*2;
        const point=center.clone().addScaledVector(chord,Math.cos(angle)*width)
          .addScaledVector(normal,Math.sin(angle)*Math.min(.105,width*.2)*tip);
        vertices.push(point.x,point.y,point.z);
        if(r<rings){
          const p=r*sides+j,q=r*sides+(j+1)%sides;
          indices.push(p,q,p+sides,q,q+sides,p+sides);
        }
      }
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
    geo.setIndex(indices);geo.computeVertexNormals();return mesh(geo,material);
  }
  const cargo=design==='cargo', marine=design==='maritime', sub=design==='underwater';
  const lift=['vtol','cargo','maritime'].includes(design);
  const bodyWidth=sub?.52:cargo?.55:.36;
  const profile=[[0,-2.7],[.16,-2.45],[.32,-1.75],[.76,-.7],[1,.25],[1,.85],[.91,1.4],[.65,1.94],[.3,2.3],[0,2.43]];
  const curve=new THREE.SplineCurve(profile.map(([r,l])=>new THREE.Vector2(r*bodyWidth,l)));
  const fuselage=mesh(new THREE.LatheGeometry(curve.getPoints(72),56),sub?accent:pearl);
  fuselage.rotation.x=Math.PI/2;
  fuselage.scale.z=cargo?1.04:.87;
  if(shaded && !sub && design!=='concept'){
    const paint=document.createElement('canvas');
    paint.width=1024;paint.height=2048;
    const brush=paint.getContext('2d');
    brush.fillStyle='#e6e8e5';brush.fillRect(0,0,paint.width,paint.height);
    brush.strokeStyle='#a1a9a6';brush.lineWidth=1.4;
    for(const seam of [.29,.49,.81]){
      const y=Math.round(paint.height*seam);
      brush.beginPath();brush.moveTo(0,y);brush.lineTo(paint.width,y);brush.stroke();
      brush.fillStyle='#858c89';
      for(let x=5;x<1024;x+=43){brush.fillRect(x,y+4,2,2);}
    }
    for(const [x,angle] of [[250,-Math.PI/2],[770,Math.PI/2]]){
      brush.save();brush.translate(x,795);brush.rotate(angle);
      brush.fillStyle=marine?'#426773':'#4b5946';brush.font='600 44px Arial';
      brush.fillText('RAJ',-50,0);brush.font='20px Arial';brush.fillText('H₂',47,0);
      brush.fillRect(-160,12,240,3);brush.fillStyle='#d0793b';brush.fillRect(85,12,37,3);
      brush.restore();
    }
    const map=new THREE.CanvasTexture(paint);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=4;
    fuselage.material=pearl.clone();fuselage.material.map=map;
  }
  if(sub){
    oval(carbon,[0,.08,2.04],[.30,.25,.33]);
    oval(trim,[0,.44,.24],[.17,.15,.37]);
    for(const side of [-1,1])surface([0,0,-1.55],[side*.97,.05,-2.16],.32,.14,carbon);
    surface([0,.02,-1.48],[.018,.77,-2.14],.32,.12,carbon);
    return {model,anchors:[[.43,0,.65],[0,.44,.24]]};
  }
  const span=cargo?3.65:design==='survey'?4.05:design==='concept'?2.95:3.35;
  for(const side of [-1,1]){
    surface([side*.12,.12,.18],[side*span,.25,-.47],.58,.20,pearl);
    surface([side*(span-.31),.248,-.42],[side*(span-.10),.251,-.45],.183,.17,accent);
    surface([side*.065,.04,-1.89],[side*.96,.81,-2.5],.35,.105,pearl);
    // Wingtip fairing + navigation light + underwing flap actuator fairings
    oval(side<0?navRed:navGreen,[side*span,.255,-.47],[.045,.032,.09]);
    if(design!=='concept'){
      for(const frac of [.35,.65]){
        const fx=side*THREE.MathUtils.lerp(.35,span-.3,frac);
        const fy=THREE.MathUtils.lerp(.12,.24,frac)-.05;
        const fz=THREE.MathUtils.lerp(.12,-.42,frac)-.18;
        oval(trim,[fx,fy,fz],[.03,.028,.16]);
      }
    }
    if(lift){
      const x=side*1.65;
      oval(carbon,[x,.12,-.02],[.073,.076,1.36]);
      // Boom high-vis accent band
      bar([x,.12,-.88],[x,.12,-.74],.077,hiVis);
      for(const z of [-1.19,1.16]){
        const motor=mesh(new THREE.CylinderGeometry(.112,.094,.18,22),carbon,x,.22,z);
        mesh(new THREE.CylinderGeometry(.116,.116,.028,22),trim,x,.26,z);
        const hub=oval(trim,[x,.355,z],[.085,.065,.085]);
        const rotor=new THREE.Group();rotor.position.set(x,hub.position.y,z);rotor.rotation.y=side*.43+(z>0?.61:0);
        for(const flip of [-1,1]){
          const blade=new THREE.Mesh(new THREE.SphereGeometry(1,16,8),carbon);
          blade.scale.set(.42,.015,.068);blade.position.set(flip*.38,0,flip*.022);rotor.add(blade);
          const tip=new THREE.Mesh(new THREE.SphereGeometry(1,10,6),hiVis);
          tip.scale.set(.055,.016,.066);tip.position.set(flip*.75,0,flip*.042);rotor.add(tip);
        }
        model.add(rotor);
        motor.rotation.y=.2;
      }
    }
    if(design!=='concept'){
      // Main landing gear struts + wheels + wheel hubs
      bar([side*.18,-.18,-.42],[side*.46,-.64,-.48],.028,darkMetal);
      bar([side*.22,-.18,-.22],[side*.46,-.64,-.48],.020,trim);
      const wheel=mesh(new THREE.CylinderGeometry(.14,.14,.065,20),carbon,side*.48,-.67,-.48);
      wheel.rotation.z=Math.PI/2;
      const hub=mesh(new THREE.CylinderGeometry(.075,.075,.072,16),trim,side*.48,-.67,-.48);
      hub.rotation.z=Math.PI/2;
    }
  }
  // General exterior avionics & air-data hardware (no internal/proprietary parts)
  if(design!=='concept'){
    // Nose pitot air-data probe
    bar([0,-.02,bodyWidth*2.32],[0,-.02,bodyWidth*2.32+.52],.014,trim);
    bar([0,-.02,bodyWidth*2.32+.52],[0,-.02,bodyWidth*2.32+.64],.008,darkMetal);
    // Nose landing gear strut + fork + wheel
    bar([0,-.18,1.32],[0,-.64,1.42],.026,darkMetal);
    const noseWheel=mesh(new THREE.CylinderGeometry(.115,.115,.055,20),carbon,0,-.67,1.42);
    noseWheel.rotation.z=Math.PI/2;
    const noseHub=mesh(new THREE.CylinderGeometry(.06,.06,.06,16),trim,0,-.67,1.42);
    noseHub.rotation.z=Math.PI/2;
    // EO/IR stabilized gimbal turret under forward fuselage
    mesh(new THREE.CylinderGeometry(.14,.16,.11,20),trim,0,-.29,.95);
    oval(pearl,[0,-.41,.95],[.165,.155,.165]);
    oval(glass,[0,-.42,1.06],[.08,.075,.06]);
    // Dorsal SATCOM dome + blade datalink antenna
    mesh(new THREE.CylinderGeometry(.15,.17,.06,22),pearl,0,bodyWidth*.88,.68);
    oval(pearl,[0,bodyWidth*.92,.68],[.15,.065,.15]);
    bar([0,bodyWidth*.82,-.25],[0,bodyWidth*.82+.22,-.34],.014,trim);
    // Dorsal cooling intake scoop
    oval(darkMetal,[0,bodyWidth*.72,-1.18],[.14,.09,.36]);
  }
  oval(trim,[0,bodyWidth*.84,.48],[bodyWidth*.62,.036,.54]);
  oval(pearl,[0,bodyWidth*.87,.47],[bodyWidth*.56,.03,.49]);
  if(lift || design==='survey'){
    // Aft pusher engine shroud + spinner + propeller
    mesh(new THREE.CylinderGeometry(.13,.17,.22,20),darkMetal,0,.02,-2.48).rotation.x=Math.PI/2;
    oval(carbon,[0,.02,-2.62],[.095,.095,.14]);
    const propGroup=new THREE.Group();propGroup.position.set(0,.02,-2.65);
    for(const a of [0, Math.PI/2]){
      const p=new THREE.Mesh(new THREE.SphereGeometry(1,12,6),carbon);
      p.scale.set(.055,.46,.024);p.rotation.z=a+.35;propGroup.add(p);
    }
    model.add(propGroup);
  }
  if(marine)oval(accent,[0,.32,1.18],[.165,.035,.29]);
  if(cargo)oval(trim,[0,-.32,.37],[.35,.23,.82]);
  let anchors=[[bodyWidth*.72,.18,1.15],[span*.70,.23,-.22],[1.65,.35,1.16],[.77,.68,-2.4]];
  if(design==='survey')anchors=[anchors[0],[0,.21,1.81]];
  return {model,anchors};
}

export function mountViewer(stage,design,name){
  let renderer,environment;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(32,1,.1,100);
  let webgl=true;
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setClearColor(0x000000,0);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.88;
    const room=new RoomEnvironment(), generator=new THREE.PMREMGenerator(renderer);
    environment=generator.fromScene(room,.035);
    scene.environment=environment.texture;room.dispose();generator.dispose();
  }catch{
    renderer?.dispose();renderer=new SVGRenderer();webgl=false;
    renderer.setQuality('high');renderer.setPrecision(2);
  }
  const surface=renderer.domElement;
  surface.classList.add('orbit-surface');
  surface.setAttribute('role','img');surface.setAttribute('aria-label',name+' rotatable exterior concept');
  stage.prepend(surface);
  const {model,anchors}=makeModel(design,webgl);
  scene.add(model,new THREE.HemisphereLight(0xfffdf5,0x555c50,1.1));
  const key=new THREE.DirectionalLight(0xfff2d6,1.9);key.position.set(-2,7,5);scene.add(key);
  const rim=new THREE.DirectionalLight(0xd2e4ff,1.5);rim.position.set(4,3,-4);scene.add(rim);
  if(webgl){
    const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=128;
    const ctx=shadowCanvas.getContext('2d'), grad=ctx.createRadialGradient(64,64,0,64,64,64);
    grad.addColorStop(0,'rgba(8,11,7,.55)');grad.addColorStop(.5,'rgba(8,11,7,.18)');grad.addColorStop(1,'rgba(8,11,7,0)');
    ctx.fillStyle=grad;ctx.fillRect(0,0,128,128);
    const shadow=new THREE.Mesh(new THREE.PlaneGeometry(8,5),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));
    shadow.rotation.x=-Math.PI/2;shadow.position.y=-.74;scene.add(shadow);
  }else{scene.background=new THREE.Color(0x51523b);}
  const controls=new OrbitControls(camera,surface);
  controls.enablePan=false;controls.rotateSpeed=.75;controls.zoomSpeed=.75;
  controls.maxPolarAngle=Math.PI*.84;
  const dots=[...stage.querySelectorAll('[data-spot]')];
  function draw(){
    renderer.render(scene,camera);
    dots.forEach((dot,i)=>{
      const pos=new THREE.Vector3(...anchors[i]).project(camera);
      dot.style.left=((pos.x+1)*50)+'%';dot.style.top=((1-pos.y)*50)+'%';
      dot.style.visibility=Math.abs(pos.x)>.97||Math.abs(pos.y)>.96?'hidden':'visible';
    });
  }
  function reset(){
    const distance=Math.max(9.2,13/Math.max(.65,camera.aspect));
    camera.position.set(1,.78,1.06).normalize().multiplyScalar(distance);
    controls.target.set(0,0,0);controls.minDistance=distance*.53;controls.maxDistance=distance*1.75;
    camera.zoom=1;camera.updateProjectionMatrix();controls.update();camera.updateMatrixWorld();
    const sample=new THREE.Vector3();let extentX=.01,extentY=.01;
    model.updateMatrixWorld(true);
    model.traverse(part=>{
      const vertices=part.geometry?.attributes.position;
      if(!vertices)return;
      for(let i=0;i<vertices.count;i+=3){
        sample.fromBufferAttribute(vertices,i).applyMatrix4(part.matrixWorld).project(camera);
        extentX=Math.max(extentX,Math.abs(sample.x));extentY=Math.max(extentY,Math.abs(sample.y));
      }
    });
    camera.zoom=Math.min(.88/extentX,.80/extentY);
    camera.updateProjectionMatrix();draw();
  }
  function resize(){
    const {width,height}=stage.getBoundingClientRect();if(!width||!height)return;
    renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();reset();
  }
  function action(command){
    if(command==='reset')return reset();
    if(command==='left'||command==='right'){
      const offset=camera.position.clone().sub(controls.target);
      offset.applyAxisAngle(new THREE.Vector3(0,1,0),command==='left'?-.26:.26);
      camera.position.copy(controls.target).add(offset);
    }else {
      const direction=camera.position.clone().sub(controls.target);
      const distance=THREE.MathUtils.clamp(direction.length()*(command==='in'?.82:1.22),controls.minDistance,controls.maxDistance);
      camera.position.copy(controls.target).add(direction.setLength(distance));
    }
    controls.update();draw();
  }
  function click(event){const command=event.target.closest('[data-camera]')?.dataset.camera;if(command)action(command);}
  controls.addEventListener('change',draw);stage.addEventListener('click',click);
  const observer=new ResizeObserver(resize);observer.observe(stage);resize();
  stage.querySelector('.viewer-loading')?.remove();
  return ()=>{
    observer.disconnect();stage.removeEventListener('click',click);controls.dispose();surface.remove();
    const materials=new Set(),geometries=new Set();
    scene.traverse(obj=>{if(obj.geometry)geometries.add(obj.geometry);if(obj.material)materials.add(obj.material);});
    materials.forEach(m=>{m.map?.dispose();m.dispose();});geometries.forEach(g=>g.dispose());
    environment?.dispose();renderer.dispose?.();if(webgl)renderer.forceContextLoss();
  };
}

// Catalogue and home thumbnails are rendered from the same meshes as the viewer.
const thumbnails=new Map();
export function renderPreviews(slots){
  const pending=[...slots].filter(slot=>slot.isConnected);
  if(!pending.length)return;
  let renderer,roomTexture;
  let camera,scene;
  function release(){
    roomTexture?.dispose();renderer?.dispose();renderer?.forceContextLoss();
  }
  function next(){
    const slot=pending.shift();
    if(!slot){release();return;}
    if(slot.isConnected){
      const design=slot.dataset.preview;
      if(!thumbnails.has(design)){
        if(!renderer){
          try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}
          catch{return;}
          renderer.setSize(800,388);renderer.setClearColor(0,0);
          renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.88;
          scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(30,800/388,.1,100);
          camera.position.set(5.3,4.1,5.5);camera.lookAt(0,0,0);
          const room=new RoomEnvironment(),gen=new THREE.PMREMGenerator(renderer);
          roomTexture=gen.fromScene(room,.035);scene.environment=roomTexture.texture;gen.dispose();room.dispose();
          scene.add(new THREE.HemisphereLight(0xfffdf4,0x67705e,1.3));
          const light=new THREE.DirectionalLight(0xfff0cf,2);light.position.set(-2,7,5);scene.add(light);
        }
        const {model}=makeModel(design,true);scene.add(model);
        camera.zoom=design==='underwater'?1.48:1.20;camera.updateProjectionMatrix();
        renderer.render(scene,camera);thumbnails.set(design,renderer.domElement.toDataURL());
        scene.remove(model);
        const materials=new Set();
        model.traverse(o=>{o.geometry?.dispose();if(o.material)materials.add(o.material);});
        materials.forEach(m=>{m.map?.dispose();m.dispose();});
      }
      const img=document.createElement('img');img.alt='';img.src=thumbnails.get(design);
      slot.replaceChildren(img);slot.classList.add('rendered');
    }
    requestAnimationFrame(next);
  }
  next();
}

export function mountCarousel(stage, items, onSelect){
  let renderer, environment, raf=0;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(34,1,.1,100);
  camera.position.set(0, 2.0, 9.2);
  camera.lookAt(0, -.1, 0);
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setClearColor(0x000000,0);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.92;
    const room=new RoomEnvironment(), gen=new THREE.PMREMGenerator(renderer);
    environment=gen.fromScene(room,.035);scene.environment=environment.texture;room.dispose();gen.dispose();
  }catch{return ()=>{};}
  const canvas=renderer.domElement;
  canvas.className='showcase-gl';
  stage.prepend(canvas);
  scene.add(new THREE.HemisphereLight(0xfffdf5,0x3d412c,1.2));
  const key=new THREE.DirectionalLight(0xfff2d6,2.0);key.position.set(-3,8,6);scene.add(key);
  const rim=new THREE.DirectionalLight(0xd2e4ff,1.4);rim.position.set(5,4,-5);scene.add(rim);

  const count=items.length;
  const slots=items.map((item,i)=>{
    const {model}=makeModel(item.design,true);
    const baseScale=item.design==='underwater'?1.05:item.design==='survey'?.86:.94;
    const group=new THREE.Group();
    group.add(model);
    scene.add(group);
    return {group, baseScale, x:0, y:0, z:0, s:baseScale, ry:-.68};
  });

  let active=0, dragYaw=0, dragPitch=0, dragging=false, hovered=false, visibleInView=true, lastX=0, lastY=0, startTime=performance.now(), lastSwitch=performance.now();
  const io=new IntersectionObserver(e=>{visibleInView=Boolean(e[0]?.isIntersecting);},{threshold:.02});
  io.observe(stage);
  function wrapOffset(i){
    let d=i-active;
    if(d>count/2)d-=count;
    if(d<-count/2)d+=count;
    return d;
  }
  function setIndex(next){
    active=((next%count)+count)%count;
    dragYaw=0;dragPitch=0;lastSwitch=performance.now();
    onSelect?.(active);
  }
  function resize(){
    const {width,height}=stage.getBoundingClientRect();
    if(!width||!height)return;
    renderer.setSize(width,height);
    camera.aspect=width/height;
    camera.position.z=width<700?11.6:9.2;
    camera.updateProjectionMatrix();
  }
  const observer=new ResizeObserver(resize);
  observer.observe(stage);resize();

  function onDown(e){
    if(e.target.closest('button,a'))return;
    dragging=true;lastX=e.clientX;lastY=e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  }
  function onMove(e){
    if(!dragging)return;
    dragYaw+=(e.clientX-lastX)*.009;
    dragPitch=THREE.MathUtils.clamp(dragPitch+(e.clientY-lastY)*.005,-.38,.42);
    lastX=e.clientX;lastY=e.clientY;
  }
  function onUp(){dragging=false;lastSwitch=performance.now();}
  function onEnter(){hovered=true;}
  function onLeave(){hovered=false;lastSwitch=performance.now();}
  stage.addEventListener('pointerdown',onDown);
  stage.addEventListener('pointerenter',onEnter);
  stage.addEventListener('pointerleave',onLeave);
  window.addEventListener('pointermove',onMove);
  window.addEventListener('pointerup',onUp);

  let lastFrame=performance.now();
  function tick(now){
    raf=requestAnimationFrame(tick);
    if(!visibleInView)return;
    const dt=Math.min(.05,(now-lastFrame)/1000);lastFrame=now;
    if(!dragging&&!hovered&&now-lastSwitch>4200)setIndex(active+1);
    const damp=1-Math.exp(-7.5*dt);
    const bob=Math.sin((now-startTime)*.0015)*.09;
    const idleYaw=dragging?0:Math.sin((now-startTime)*.0007)*.14;
    slots.forEach((slot,i)=>{
      const off=wrapOffset(i);
      const visible=Math.abs(off)<=1;
      const tx=off===0?0:off<0?-7.4:7.4;
      const ty=off===0?bob:.55;
      const tz=off===0?.9:-5.6;
      const ts=(off===0?1.38:.72)*slot.baseScale;
      const tryRot=off===0?(-.68+dragYaw+idleYaw):(off<0?-.35:-1.05);
      const trx=off===0?(.16+dragPitch):.22;
      slot.x=THREE.MathUtils.lerp(slot.x,tx,damp);
      slot.y=THREE.MathUtils.lerp(slot.y,ty,damp);
      slot.z=THREE.MathUtils.lerp(slot.z,tz,damp);
      slot.s=THREE.MathUtils.lerp(slot.s,ts,damp);
      slot.ry=THREE.MathUtils.lerp(slot.ry,tryRot,damp);
      slot.group.position.set(slot.x,slot.y,slot.z);
      slot.group.scale.setScalar(slot.s);
      slot.group.rotation.set(trx,slot.ry,off===0?Math.sin((now-startTime)*.0011)*.03:0);
      slot.group.visible=visible||Math.abs(slot.x)<9.0;
    });
    renderer.render(scene,camera);
  }
  onSelect?.(0);
  raf=requestAnimationFrame(tick);

  return {
    prev:()=>setIndex(active-1),
    next:()=>setIndex(active+1),
    destroy:()=>{
      cancelAnimationFrame(raf);io.disconnect();observer.disconnect();
      stage.removeEventListener('pointerdown',onDown);
      stage.removeEventListener('pointerenter',onEnter);
      stage.removeEventListener('pointerleave',onLeave);
      window.removeEventListener('pointermove',onMove);
      window.removeEventListener('pointerup',onUp);
      canvas.remove();
      const mats=new Set(),geos=new Set();
      scene.traverse(o=>{if(o.geometry)geos.add(o.geometry);if(o.material)mats.add(o.material);});
      mats.forEach(m=>{m.map?.dispose();m.dispose();});geos.forEach(g=>g.dispose());
      environment?.dispose();renderer.dispose();
    }
  };
}

export function mountGasSchematic(stage){
  let renderer, raf=0;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(28,1,.1,100);
  camera.position.set(0, 1.35, 11.4);
  camera.lookAt(0, .05, 0);
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setClearColor(0x000000,0);
  }catch{return {setStage:()=>{},destroy:()=>{}};}
  const canvas=renderer.domElement;
  canvas.className='schematic-gl';
  stage.prepend(canvas);

  const wireMat=new THREE.LineBasicMaterial({color:0xe2e5ce,transparent:true,opacity:.72});
  const hiMat=new THREE.LineBasicMaterial({color:0xfa681c,transparent:true,opacity:1});
  const fillMat=new THREE.MeshBasicMaterial({color:0x595d3e,transparent:true,opacity:.36,side:THREE.DoubleSide});
  const craftFill=new THREE.MeshBasicMaterial({color:0x6e734e,transparent:true,opacity:.48,side:THREE.DoubleSide});

  function wireGroup(geo, mat=wireMat, edgeAngle=5){
    const g=new THREE.Group();
    g.add(new THREE.Mesh(geo,fillMat));
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo,edgeAngle),mat));
    return g;
  }

  // 1. High-pressure Hydrogen Vessel (left)
  const vessel=new THREE.Group();
  vessel.position.set(-3.05, .2, 0);
  const tankCyl=wireGroup(new THREE.CylinderGeometry(.68,.68,2.1,20,3,true),wireMat,4);
  tankCyl.rotation.z=Math.PI/2;vessel.add(tankCyl);
  for(const sx of [-1,1]){
    const cap=wireGroup(new THREE.SphereGeometry(.68,16,8,0,Math.PI*2,0,Math.PI/2),wireMat,4);
    cap.rotation.z=sx<0?Math.PI/2:-Math.PI/2;cap.position.x=sx*1.05;vessel.add(cap);
    const leg=wireGroup(new THREE.BoxGeometry(.22,.44,.56),wireMat,15);
    leg.position.set(sx*.65,-.72,0);vessel.add(leg);
    const band=wireGroup(new THREE.CylinderGeometry(.71,.71,.06,20,1,true),wireMat,4);
    band.rotation.z=Math.PI/2;band.position.x=sx*.65;vessel.add(band);
  }
  const neck=wireGroup(new THREE.CylinderGeometry(.13,.15,.34,12),wireMat,10);
  neck.rotation.z=Math.PI/2;neck.position.x=1.82;vessel.add(neck);
  scene.add(vessel);

  // 2. Regulator / Purification Manifold (center)
  const regulator=new THREE.Group();
  regulator.position.set(-.62, -.24, 0);
  regulator.add(wireGroup(new THREE.BoxGeometry(.44,.5,.36),wireMat,15));
  const dome=wireGroup(new THREE.CylinderGeometry(.12,.14,.2,12),wireMat,10);
  dome.position.y=.35;regulator.add(dome);
  scene.add(regulator);

  // 3. Curved High-Pressure Pipeline + Flow Particles
  const pipeCurve=new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.22,.2,0),
    new THREE.Vector3(-.94,.2,0),
    new THREE.Vector3(-.86,-.24,0),
    new THREE.Vector3(-.40,-.24,0),
    new THREE.Vector3(-.20,.14,0),
    new THREE.Vector3(.42,.14,0)
  ]);
  const pipeGeo=new THREE.TubeGeometry(pipeCurve,48,.04,10,false);
  const pipeLines=new THREE.LineSegments(new THREE.EdgesGeometry(pipeGeo,8),wireMat.clone());
  scene.add(pipeLines);

  const pulseMat=new THREE.MeshBasicMaterial({color:0xfa681c});
  const pulses=Array.from({length:7},(_,i)=>({
    mesh:new THREE.Mesh(new THREE.SphereGeometry(.065,10,10),pulseMat),
    t:i/7
  }));
  pulses.forEach(p=>scene.add(p.mesh));

  // 4. RAJAS RJS-H1 Wireframe Platform (right)
  const craft=new THREE.Group();
  craft.position.set(2.45, .18, 0);
  craft.scale.setScalar(.62);
  craft.rotation.set(.2, -Math.PI/2+.18, 0);
  const {model:rawCraft}=makeModel('vtol',false);
  const craftMeshes=[];
  rawCraft.traverse(o=>{if(o.isMesh)craftMeshes.push(o);});
  const craftEdges=[];
  for(const o of craftMeshes){
    o.material=craftFill;
    const line=new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry,8),wireMat.clone());
    o.add(line);
    craftEdges.push(line);
  }
  craft.add(rawCraft);
  scene.add(craft);

  function setStage(key){
    const setGroup=(grp,on)=>grp.traverse(o=>{if(o.isLineSegments)o.material=on?hiMat:wireMat;});
    setGroup(vessel, key==='pressure'||key==='interlocks');
    setGroup(regulator, key==='purity'||key==='interlocks');
    pipeLines.material=(key==='leak'||key==='interlocks')?hiMat:wireMat;
    craftEdges.forEach(l=>l.material=key==='interlocks'?hiMat:wireMat);
  }
  setStage('pressure');

  function resize(){
    const {width,height}=stage.getBoundingClientRect();
    if(!width||!height)return;
    renderer.setSize(width,height);
    camera.aspect=width/height;
    camera.position.z=width<680?15.8:11.4;
    camera.updateProjectionMatrix();
  }
  const observer=new ResizeObserver(resize);
  observer.observe(stage);resize();

  let start=performance.now();
  function tick(now){
    const elapsed=Math.max(0,(now-start)*.001);
    pulses.forEach(p=>{
      const u=((p.t+elapsed*.32)%1+1)%1;
      p.mesh.position.copy(pipeCurve.getPointAt(u));
    });
    craft.position.y=.15+Math.sin(elapsed*1.4)*.05;
    craft.rotation.y=-Math.PI/2+.16+Math.sin(elapsed*.65)*.08;
    renderer.render(scene,camera);
    raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);

  return {
    setStage,
    destroy:()=>{
      cancelAnimationFrame(raf);observer.disconnect();canvas.remove();
      const geos=new Set(),mats=new Set();
      scene.traverse(o=>{if(o.geometry)geos.add(o.geometry);if(o.material)mats.add(o.material);});
      geos.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());
      renderer.dispose();
    }
  };
}

export function mountRajasShowcase(stage){
  let renderer, environment, raf=0;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(30,1,.1,100);
  camera.position.set(0, 1.8, 9.6);
  camera.lookAt(0, -.05, 0);
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setClearColor(0x000000,0);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.94;
    const room=new RoomEnvironment(), gen=new THREE.PMREMGenerator(renderer);
    environment=gen.fromScene(room,.035);scene.environment=environment.texture;room.dispose();gen.dispose();
  }catch{return {focus:()=>{},destroy:()=>{}};}
  const canvas=renderer.domElement;
  canvas.className='rajas-gl';
  stage.prepend(canvas);
  scene.add(new THREE.HemisphereLight(0xfffdf5,0x40442d,1.25));
  const key=new THREE.DirectionalLight(0xfff2d6,2.0);key.position.set(-3,8,6);scene.add(key);
  const rim=new THREE.DirectionalLight(0xd2e4ff,1.5);rim.position.set(5,4,-5);scene.add(rim);

  const {model}=makeModel('vtol',true);
  const rig=new THREE.Group();
  rig.add(model);
  rig.scale.setScalar(1.08);
  scene.add(rig);

  let targetYaw=-Math.PI/2+.22, targetPitch=.16;
  function focus(index){
    const angles=[-.85,-.42,.35,.78,-.95,-.25,.48,.92];
    const pitches=[.22,.14,.18,.26,.12,.2,.15,.24];
    targetYaw=angles[index%angles.length];
    targetPitch=pitches[index%pitches.length];
  }
  function resize(){
    const {width,height}=canvas.getBoundingClientRect();
    if(!width||!height)return;
    renderer.setSize(width,height,false);
    camera.aspect=width/height;
    camera.position.z=width<700?11.8:9.6;
    camera.updateProjectionMatrix();
  }
  const observer=new ResizeObserver(resize);
  observer.observe(canvas);resize();

  let curYaw=targetYaw, curPitch=targetPitch, start=performance.now(), rajasVisible=true;
  const rajasIo=new IntersectionObserver(e=>{rajasVisible=Boolean(e[0]?.isIntersecting);},{threshold:.02});
  rajasIo.observe(stage);
  function tick(now){
    raf=requestAnimationFrame(tick);
    if(!rajasVisible)return;
    const t=Math.max(0,(now-start)*.001);
    curYaw=THREE.MathUtils.lerp(curYaw, targetYaw+Math.sin(t*.45)*.12, .05);
    curPitch=THREE.MathUtils.lerp(curPitch, targetPitch+Math.cos(t*.38)*.04, .05);
    rig.rotation.set(curPitch, curYaw, Math.sin(t*.8)*.025);
    rig.position.y=Math.sin(t*1.2)*.08;
    renderer.render(scene,camera);
  }
  raf=requestAnimationFrame(tick);

  return {
    focus,
    destroy:()=>{
      cancelAnimationFrame(raf);rajasIo.disconnect();observer.disconnect();canvas.remove();
      const geos=new Set(),mats=new Set();
      scene.traverse(o=>{if(o.geometry)geos.add(o.geometry);if(o.material)mats.add(o.material);});
      mats.forEach(m=>{m.map?.dispose();m.dispose();});geos.forEach(g=>g.dispose());
      environment?.dispose();renderer.dispose();
    }
  };
}

export function mountSideSpotlight(stage){
  let renderer, environment, raf=0;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(28,1,.1,100);
  camera.position.set(1.2, 1.05, 8.8);
  camera.lookAt(0, -.15, 0);
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setClearColor(0x000000,0);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.96;
    const room=new RoomEnvironment(), gen=new THREE.PMREMGenerator(renderer);
    environment=gen.fromScene(room,.035);scene.environment=environment.texture;room.dispose();gen.dispose();
  }catch{return ()=>{};}
  const canvas=renderer.domElement;
  canvas.className='spotlight-gl';
  stage.prepend(canvas);
  scene.add(new THREE.HemisphereLight(0xfffdf5,0x343825,1.25));
  const key=new THREE.DirectionalLight(0xfff0d0,2.2);key.position.set(-2,7,6);scene.add(key);
  const rim=new THREE.DirectionalLight(0xd2e4ff,1.5);rim.position.set(5,3,-4);scene.add(rim);

  const {model}=makeModel('cargo',true);
  const rig=new THREE.Group();
  rig.add(model);
  rig.scale.setScalar(1.12);
  rig.rotation.set(.08, Math.PI/2-.28, 0);
  rig.position.set(-4.5, -.1, 0);
  scene.add(rig);

  // Subtle orange fuselage strobe
  const strobe=new THREE.Mesh(
    new THREE.SphereGeometry(.055,12,12),
    new THREE.MeshBasicMaterial({color:0xfa681c})
  );
  strobe.position.set(.38,.05,.6);
  model.add(strobe);

  let inView=window.innerWidth<900, spotVisible=true, pointerX=0, pointerY=0;
  const io=new IntersectionObserver(entries=>{
    spotVisible=Boolean(entries[0]?.isIntersecting);
    if(spotVisible)inView=true;
  },{threshold:.02});
  io.observe(stage);

  function onMove(e){
    const r=stage.getBoundingClientRect();
    pointerX=((e.clientX-r.left)/r.width-.5);
    pointerY=((e.clientY-r.top)/r.height-.5);
  }
  stage.addEventListener('pointermove',onMove);

  function resize(){
    const {width,height}=stage.getBoundingClientRect();
    if(!width||!height)return;
    renderer.setSize(width,height);
    camera.aspect=width/height;
    camera.position.z=width<680?11.2:8.8;
    camera.updateProjectionMatrix();
  }
  const ro=new ResizeObserver(resize);
  ro.observe(stage);resize();

  let start=performance.now();
  function tick(now){
    raf=requestAnimationFrame(tick);
    if(!spotVisible)return;
    const t=Math.max(0,(now-start)*.001);
    const tx=inView?(-.35+pointerX*.55):-4.5;
    rig.position.x=THREE.MathUtils.lerp(rig.position.x, tx, .045);
    rig.position.y=-.1+Math.sin(t*1.2)*.07;
    rig.rotation.y=THREE.MathUtils.lerp(rig.rotation.y, Math.PI/2-.28+pointerX*.22+Math.sin(t*.45)*.08, .05);
    rig.rotation.x=THREE.MathUtils.lerp(rig.rotation.x, .08+pointerY*.08, .05);
    strobe.visible=Math.sin(t*5.5)>0;
    renderer.render(scene,camera);
  }
  raf=requestAnimationFrame(tick);

  return ()=>{
    cancelAnimationFrame(raf);io.disconnect();ro.disconnect();
    stage.removeEventListener('pointermove',onMove);canvas.remove();
    const geos=new Set(),mats=new Set();
    scene.traverse(o=>{if(o.geometry)geos.add(o.geometry);if(o.material)mats.add(o.material);});
    mats.forEach(m=>{m.map?.dispose();m.dispose();});geos.forEach(g=>g.dispose());
    environment?.dispose();renderer.dispose();
  };
}
