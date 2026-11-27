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
    if(lift){
      const x=side*1.65;
      oval(carbon,[x,.12,-.02],[.073,.076,1.36]);
      for(const z of [-1.19,1.16]){
        const motor=mesh(new THREE.CylinderGeometry(.105,.092,.17,20),carbon,x,.22,z);
        const hub=oval(trim,[x,.35,z],[.08,.06,.08]);
        const rotor=new THREE.Group();rotor.position.set(x,hub.position.y,z);rotor.rotation.y=side*.43+(z>0?.61:0);
        for(const flip of [-1,1]){
          const blade=new THREE.Mesh(new THREE.SphereGeometry(1,16,8),carbon);
          blade.scale.set(.395,.014,.063);blade.position.set(flip*.36,0,flip*.022);rotor.add(blade);
        }
        model.add(rotor);
        motor.rotation.y=.2;
      }
    }
    if(design!=='concept'){
      bar([side*.17,-.19,1.05],[side*.44,-.66,1.16],.031,trim);
      bar([side*.14,-.2,-.53],[side*.44,-.66,-.62],.031,trim);
      oval(carbon,[side*.44,-.66,.23],[.047,.045,1.06]);
    }
  }
  oval(trim,[0,bodyWidth*.84,.48],[bodyWidth*.62,.036,.54]);
  oval(pearl,[0,bodyWidth*.87,.47],[bodyWidth*.56,.03,.49]);
  if(lift){
    oval(carbon,[0,.02,-2.59],[.091,.091,.13]);
    const prop=oval(carbon,[0,.02,-2.62],[.061,.44,.026]);prop.rotation.z=.55;
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
