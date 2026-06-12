import { camera, renderer } from './scene.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.maxDistance = 110;
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.zoomSpeed = 0.5;
controls.minDistance = 4;
camera.lookAt(0, 0, 0);
camera.position.set(200, 100, 200);
