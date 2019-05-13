# 3D Website Animation

[![Netlify Status](https://api.netlify.com/api/v1/badges/c5e602c5-a20b-4e4f-9c00-d5ba49babf09/deploy-status)](https://app.netlify.com/sites/affectionate-joliot-5070d3/deploys)

Using WebGL and Three.js, we will explore the advantages and usage of the ui/ux animation

## Hello World

In Lewy Blue's "Discover Three.js" e-book, we found this good example of the necessary parts
of a fluid animation

```js
/**
 * Elements/Variables of an animation
 *
 * These need to be accessed inside more than one
 * function so we'll declare them first
 */

let container; // DOM element where will be injected the canvas
let camera; // Handles the vision perspective, pov, angle, etc
let controls; // Handles the movements
let renderer; // It renders the app, using either WebGL/Canvas/SVG as its main tech
let scene; // The ambient, the objects that will be represented in the animation aka universe
let mesh; // Mesh is an object represented in the scene,  Mesh = Geometry + Material
```

We can see that the main "ingredients" of a 3D Web Animation are
at least 6, and around them we can build a minimal example of
usage on the library

A _scene_ is composed by _meshs_, _lights_, and other _objects_.
The scene is being captured by a _camera_, and controled by defined _controls_
The scene it's displayed in the screen using a _renderer_ which can be using
_WebGL_, or _Canvas_ or _SVG_

```js
const init = function() {
  /**
   * Creates the animation scene, and its 6 elements
   * and starts the animation loop
   */

  container = document.querySelector("#scene-container"); // 1-6

  scene = new THREE.Scene(); // 2-6
  scene.background = new THREE.Color(0x8fbcd4);

  createCamera(); // 3-6
  createControls(); // 4-6
  createLights(); // 5-6
  createMeshes(); // 5-6
  createRenderer(); // 6-6

  // start the animation loop
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
};
```

We bootstrap the animation by calling the _init_ function,
the container is selected from the DOM, the background of the scene it's set
to a solid color, and the remaning elements gets set calling some functions,
(createCamera, createControls, createLights, createMeshes and createRenderer).

We also start the _animation loop_, using the _setAnimationLoop_ method, where we
will call the render function aswell as the update function, to update any updated
values before render the animation

```js
const createCamera = function() {
  /**
   * 1 of the 6 elements of the animation
   * Camera
   */

  camera = new THREE.PerspectiveCamera(
    35, // FOV
    container.clientWidth / container.clientHeight, // aspect ratio
    0.1, // near clipping plane
    100 // far clipping plane
  );

  camera.position.set(-4, 4, 10); // x,y,z
};

const createControls = function() {
  /**
   * 2 of the 6 elements of the animation
   * Controls
   *
   * To move around
   */

  controls = new THREE.OrbitControls(camera, container); // Orbit controls allows us to move around
};

const createLights = function() {
  /**
   * 3 of the 6 elements of the animation
   * Lights
   *
   * Ambient Light and Main light pointing one direction
   */

  const ambientLight = new THREE.HemisphereLight(
    0xddeeff, // sky color
    0x202020, // ground color
    5 // intensity
  );

  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(10, 10, 10);

  scene.add(ambientLight, mainLight); // adds the elements to the scene
};

const createMeshes = function() {
  /**
   * 4 of the 6 elements of the animation
   * Mesh
   *
   * The objects in the scene
   * Composed by a Geometry as skeleton and a material as texture
   */

  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load(
    "textures/1-camera-controls/uv_test_bw.png"
  );

  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;

  const material = new THREE.MeshStandardMaterial({
    map: texture
  });

  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
};

const createRenderer = function() {
  /**
   * 5-6 elements of the animation
   * Renderer
   *
   * Creates the rendered element, and appends it to the DOM
   */

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);
};

const update = function() {
  /**
   * Perform any updates to the scene,
   * called once per frame, avoid
   * heavy computation here
   */
};

const render = function() {
  /**
   * Render
   *
   * Or 'draw a still image',
   * of the scene
   */

  renderer.render(scene, camera);
};

const onWindowResize = function() {
  /**
   * A function that will be called every time the window gets resized.
   *
   * It can get called a lot, so don't put any heavy computation in here
   */

  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);
};

window.addEventListener("resize", onWindowResize);

// call the init function to set everything up
init();
```
