"use strict";

/**
 * Main Scene
 */

const loader = new THREE.FontLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/**
 * Camera Config
 */

const fieldOfView = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

/**
 * Scene Config
 */

const background = "#020024";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
let renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.z = 5;
renderer.setClearColor(background);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

/**
 * Figure #1 · Typograpghy Figure
 */

let nameGeometry = null;
let nameMaterial = null;
let nameMesh = null;

let signsGeometry = null;
let signsMaterial = null;
let signsMesh = null;

loader.load("/fonts/ABeeZee_Regular.json", function(font) {
  nameGeometry = new THREE.TextGeometry("YobertyAlej", {
    font: font,
    size: 0.7,
    height: 0.02
  });

  signsGeometry = new THREE.TextGeometry("?!", {
    font: font,
    size: 0.7,
    height: 0
  });

  nameMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
  signsMaterial = new THREE.MeshToonMaterial({ color: 0xf8b500 });

  nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);
  signsMesh = new THREE.Mesh(signsGeometry, signsMaterial);

  nameMesh.position.x = -7;
  nameMesh.position.y = 0.05;
  scene.add(nameMesh);

  signsMesh.position.x = -1.5;
  signsMesh.position.y = 0.2;
  scene.add(signsMesh);
  const event = new Event("figureLoaded");
  window.dispatchEvent(event);
});

/**
 * Figure #2 · Square
 */
let squareGeometry = new THREE.BoxGeometry(4, 1.4, 1);
let squareMaterial = new THREE.MeshBasicMaterial({ color: 0xf61067 });
let squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);

squareMesh.position.x = -6;
squareMesh.position.y = 0.4;
squareMesh.position.z = -1;

scene.add(squareMesh);

/**
 * Stars Background
 */

let starsGeometry = new THREE.Geometry();

for (let i = 0; i < 10000; i++) {
  let star = new THREE.Vector3();
  star.x = THREE.Math.randFloatSpread(2000);
  star.y = THREE.Math.randFloatSpread(2000);
  star.z = THREE.Math.randFloatSpread(2000);

  starsGeometry.vertices.push(star);
}

let starsMaterial = new THREE.PointsMaterial({ color: 0x00d4ff });

let starField = new THREE.Points(starsGeometry, starsMaterial);

scene.add(starField);

/**
 * Light
 */

const light = new THREE.PointLight(0xffffff, 1.5, 0);
light.position.set(-1, 0, 25);

scene.add(light);

/**
 * Render
 */
const render = function() {
  requestAnimationFrame(render);

  squareMesh.rotation.x += 0.005;

  renderer.render(scene, camera);
};

/**
 * Mouse handler
 */
let intersects;
const onMouseMove = function(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  intersects = raycaster.intersectObjects(scene.children, true);

  for (figure of intersects) {
    figure.object.material.color.set(0xff0000);
  }
};

window.addEventListener("mousemove", onMouseMove);

/**
 * Animation
 */

let self = this;
let interval = null;
window.addEventListener("figureLoaded", function(event) {
  self.tl = new TimelineMax().delay(0.3);

  interval = setInterval(function() {
    self.tl.to(signsMesh.rotation, 0.3, { z: -0.5, ease: Expo.easeOut });
    self.tl.to(signsMesh.rotation, 0.3, { z: 0, ease: Expo.easeIn });
    self.tl.to(signsMesh.rotation, 0.3, { z: -0.5, ease: Expo.easeOut });
    self.tl.to(signsMesh.rotation, 0.3, { z: 0, ease: Expo.easeIn });
  }, 2500);
});

/**
 * Excecution
 */

render();
