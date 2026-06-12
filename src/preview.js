import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const canvas = document.getElementById('planet-preview');
const previewRenderer = new THREE.WebGLRenderer({ canvas, alpha: true });
previewRenderer.setSize(300, 300, false);
canvas.style.width = '';
canvas.style.height = '';

const previewScene = new THREE.Scene();
const previewCamera = new THREE.PerspectiveCamera(20, 1, 0.1, 100);
previewCamera.position.set(0, 0, 7);

const previewLight = new THREE.PointLight(0xffffff, 5);
previewLight.position.set(5, 5, 5);
previewScene.add(previewLight);
previewScene.add(new THREE.AmbientLight(0x404040, 5));

const ambientLight = new THREE.AmbientLight(0x404040, 7);
previewScene.add(ambientLight);

const previewComposer = new EffectComposer(previewRenderer);
previewComposer.addPass(new RenderPass(previewScene, previewCamera));
const previewBloom = new UnrealBloomPass(
    new THREE.Vector2(240, 240),
    0.2,
    0.2,
    0.001
);
previewComposer.addPass(previewBloom);

let previewMesh = null;

previewRenderer.setClearColor(0x000000, 0);

export function setPreviewPlanet(planet) {
    if (!planet) {
        if (previewMesh) previewScene.remove(previewMesh);
        previewMesh = null;
        return;
    }
    if (!previewMesh) {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        previewMesh = new THREE.Mesh(geometry, planet.mesh.material.clone());
        previewScene.add(previewMesh);
    }
    previewMesh.material = planet.mesh.material.clone();
    previewMesh.children = [];
    if (planet.hasRing && planet.ring) {
        const ringClone = planet.ring.clone();
        ringClone.scale.setScalar(1 / planet.scaledRadius);
        previewMesh.add(ringClone);
    }
}

export function animatePreview() {
    if (previewMesh) previewMesh.rotation.y += 0.005;
    previewComposer.render();
}
