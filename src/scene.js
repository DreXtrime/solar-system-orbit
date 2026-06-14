import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer();
initRenderer();
export const composer = new EffectComposer(renderer);
export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(200, 100, 200);
camera.lookAt(0, 0, 0);
const lowGraphics = new URLSearchParams(window.location.search).has(
    'lowGraphics'
);

function initRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    window.addEventListener('resize', handleResize);
    document.body.appendChild(renderer.domElement);
}

function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    composer.setSize(width, height);
}

function createSkybox() {
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/textures/stars.webp'),
        side: THREE.BackSide,
    });
    return new THREE.Mesh(skyGeometry, skyMaterial);
}

function createStarfield(count) {
    const positions = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 });
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 800;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return new THREE.Points(geometry, material);
}

function createSunPointLight() {
    const sunPointLight = new THREE.PointLight(0xca3e09, 1, 100, 0.1);
    sunPointLight.position.set(0, 0, 0);
    sunPointLight.power = 100;
    return sunPointLight;
}

function createAmbientLight() {
    return new THREE.AmbientLight(0x404040, 7);
}

function createBloomPass() {
    return new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth * 0.1, window.innerHeight * 0.1),
        1.5,
        0.9,
        0.5
    );
}

composer.addPass(new RenderPass(scene, camera));
scene.add(createSkybox());
scene.add(createSunPointLight());
scene.add(createAmbientLight());
if (!lowGraphics) {
    scene.add(createStarfield(5000));
    composer.addPass(createBloomPass());
}
