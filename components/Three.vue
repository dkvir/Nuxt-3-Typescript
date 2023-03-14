<script setup>
import {
  Scene,
  PerspectiveCamera,
  Mesh,
  PlaneGeometry,
  WebGLRenderer,
  TextureLoader,
  LinearFilter,
  DoubleSide,
  WebGLRenderTarget,
  SphereGeometry,
  MeshBasicMaterial,
  Vector3,
  HemisphereLight,
  Plane,
  AmbientLight,
  Object3D,
  SphereBufferGeometry,
  MeshStandardMaterial,
  Color,
  PointLight,
  BoxGeometry,
  DirectionalLight,
  PlaneHelper,
  Group,
  IncrementWrapStencilOp,
  BackSide,
  FrontSide,
  DecrementWrapStencilOp,
  NotEqualStencilFunc,
  ReplaceStencilOp,
  ShadowMaterial,
  AlwaysStencilFunc,
  TorusKnotGeometry,
  MeshPhysicalMaterial,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js';
import { ClearPass } from 'three/addons/postprocessing/ClearPass.js';
import {
  MaskPass,
  ClearMaskPass,
} from 'three/addons/postprocessing/MaskPass.js';
import { CopyShader } from 'three/addons/shaders/CopyShader.js';

let canvasEl = ref(null);

let renderer, scene, camera, controls, sphere;

function init() {
  // renderer
  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: document.querySelector('#canvas'),
  });
  renderer.autoClear = false;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.localClippingEnabled = true;
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new Scene();

  //light
  const light = new DirectionalLight('white', 1);
  light.position.set(10, 10, 0);
  const light2 = new DirectionalLight('white', 1);
  light2.position.set(-10, -10, -10);
  scene.add(light, light2);

  // camera
  camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(50, 10, 30);

  // planes
  const clipPlanes = [
    new Plane(new Vector3(-1, 0, 0), 0),
    new Plane(new Vector3(0, -1, 0), 0),
    new Plane(new Vector3(0, 0, -1), 0),
    new Plane(new Vector3(1, 0, 0), 0),
    new Plane(new Vector3(0, 1, 0), 0),
    new Plane(new Vector3(0, 0, 1), 0),
  ];
  clipPlanes[0].translate(new Vector3(5, 0, 0));
  clipPlanes[1].translate(new Vector3(0, 5, 0));
  clipPlanes[2].translate(new Vector3(0, 0, 5));
  clipPlanes[3].translate(new Vector3(-5, 0, 0));
  clipPlanes[4].translate(new Vector3(0, -5, 0));
  clipPlanes[5].translate(new Vector3(0, 0, -5));

  const planeHelper = clipPlanes.map(
    plane => new PlaneHelper(plane, 10, 0xffffff)
  );
  planeHelper.forEach(plane => {
    plane.visible = true;
    scene.add(plane);
  });

  // controls
  controls = new OrbitControls(camera, renderer.domElement);

  //materials
  const sphereMaterial = new MeshStandardMaterial({
    roughness: 0,
    metalness: 0,
    color: 0xffffff,
    side: DoubleSide,
    clippingPlanes: clipPlanes,
  });
  const boxMaterial = new MeshPhysicalMaterial({
    roughness: 0,
    transmission: 1,
    thickness: 0.5,
  });
  sphere = new Mesh(new SphereGeometry(5, 30, 30), sphereMaterial);
  const box = new Mesh(new BoxGeometry(12, 12, 12), boxMaterial);
  scene.add(box, sphere);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  const time = performance.now() * 0.002 + 6000;

  sphere.position.x = Math.cos(time) * 2;
  sphere.position.y = Math.sin(time / 1.5) * 5;
  sphere.rotation.x = time;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

onMounted(() => {
  init();
  animate();
});
</script>

<template>
  <div class="three">
    <canvas id="canvas" ref="canvasEl"></canvas>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
body {
  margin: 0px;
  background-color: #000000;
  overflow: hidden;
}

button {
  position: absolute;
  top: 10px;
  cursor: pointer;
}

#btn1 {
  left: 10px;
}

#btn2 {
  left: 150px;
}
</style>
