import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const lowGraphics = new URLSearchParams(window.location.search).has('lowGraphics');

// ============================================================
// SCENE
// ============================================================

export const scene = new THREE.Scene();
// Skybox
const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('/textures/stars.webp'),
    side: THREE.BackSide,
});
const skybox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skybox);

// Starfield
function createStarfield() {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 800;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 });
    return new THREE.Points(geometry, material);
}
if (!lowGraphics) {
    scene.add(createStarfield());
}

// Sunlight
const sunLight = new THREE.PointLight(0xca3e09, 1, 0, 0.1);
sunLight.position.set(0, 0, 0);
sunLight.power = 100;
scene.add(sunLight);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040, 7);
scene.add(ambientLight);

// ============================================================
// CAMERA
// ============================================================
export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(200, 100, 200);
camera.lookAt(0, 0, 0);

// Hint
document.addEventListener(
    'mousedown',
    () => {
        setTimeout(removeHint, 3000);
    },
    { once: true }
);
function removeHint() {
    const hint = document.getElementById('hint');
    if (!hint) return;
    hint.style.opacity = '0';
    hint.addEventListener('transitionend', () => hint.remove());
}

// ============================================================
// RENDERER
// ============================================================
export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Resizing
window.addEventListener('resize', handleResize);
document.body.appendChild(renderer.domElement);
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    composer.setSize(width, height);
}

// Tonemapper
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// ============================================================
// COMPOSER
// ============================================================
export const composer = new EffectComposer(renderer);
// Bloom
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth * 0.1, window.innerHeight * 0.1),
    1.5,
    0.9,
    0.5
);
if (!lowGraphics) {
    composer.addPass(bloomPass);
}
