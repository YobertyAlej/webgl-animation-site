const loader = new THREE.FontLoader();

const fieldOfView = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
camera.position.z = 5;
let renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor("#020024");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

let geometry = null;
loader.load("/fonts/ABeeZee_Regular.json", function(font) {
  geometry = new THREE.TextGeometry("YobertyAlej ?!", {
    font: font,
    size: 0.7,
    height: 1
  });

  const material = new THREE.MeshPhysicalMaterial({ color: 0xf8b500 });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
});

const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);

scene.add(light);

const render = function() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

render();
