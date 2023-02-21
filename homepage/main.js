import * as THREE from 'three';
import './style.css';
import gsap from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { DragControls } from "three/examples/jsm/controls/DragControls"

//Scene
const scene = new THREE.Scene();


//Object
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
  roughness: 0.001,
  });
const sphere = new THREE.Mesh( geometry, material );
scene.add(sphere);

//Ligth
const light = new THREE.PointLight( 0xffff00, 1, 100 );
light.position.set( 0, 10, 10 );
scene.add( light );

//Sizes 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//AmbientLight
const ambientlight = new THREE.AmbientLight( 0x00ff00, 0.3, 100);
scene.add(ambientlight);

//Camera
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height);
camera.position.z = 20;

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(3);

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;


const loop = () => {
  controls.update();
  renderer.render( scene, camera );
  window.requestAnimationFrame(loop);
}
loop();

//Resize
window.addEventListener("resize", () => {
  //Upadte Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  
})

//timeline
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(sphere.scale,  {z:0, x:0, y:0}, {z:1, x:1, y:1} );
tl.fromTo('nav', {y: "-100%"}, {y: "0%"});
tl.fromTo(".title", {opacity: 0},  {opacity: 1})


//Mouse ANimation Colorrrrr
let MouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (MouseDown = true));
window.addEventListener('mouseup', () => (MouseDown = false));

window.addEventListener('mousemove', (e) => {
  if(MouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150
    ] 
    //animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
      gsap.to(sphere.material.color, {
      r: newColor.r, 
      g: newColor.g,
      b: newColor.b, 
    })
  }
})

//https://insiders.vscode.dev/+ms-vscode.remote-server/julian-devpc