import * as THREE from 'three';
import { planets } from './planets.js';
import { camera, renderer } from './scene.js';
import { showInfoPanel } from './ui.js';
import { planetData } from './planetData.js';

const tooltip = document.getElementById('tooltip');
const tooltipName = document.getElementById('tooltip-name');
const tooltipSize = document.getElementById('tooltip-size');
const tooltipDistance = document.getElementById('tooltip-distance');
const dom = {
    planetPanel: document.getElementById('planet-panel'),
}

// Raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredPlanet = null;

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const overUI = event.target !== renderer.domElement;
    if (overUI) {
        tooltip.classList.add('hidden');
        return;
    }

    raycaster.setFromCamera(mouse, camera);

    const planetMeshes = planets.map((p) => p.mesh);
    const orbitMeshes = planets.map((p) => p.orbitRing).filter(Boolean);

    const planetHits = raycaster.intersectObjects(planetMeshes, true);
    let planet = null;
    if (planetHits.length > 0) {
        planet = planets.find((p) => p.mesh === planetHits[0].object);
    }

    if (!planet) {
        const orbitHits = raycaster.intersectObjects(orbitMeshes, true);

        if (orbitHits.length > 0) {
            planet = planets.find((p) => p.orbitRing === orbitHits[0].object);
        }
    }

    if (!planet) {
        tooltip.classList.add('hidden');
        return;
    }

    tooltip.classList.remove('hidden');

    const offsetX = 15;
    const offsetY = 15;
    hoveredPlanet = planet;

    tooltipName.textContent = planet.name;
    tooltipSize.textContent = `Size: ${planet.radius} Earths`;
    tooltipDistance.textContent = `Distance: ${planet.orbitRadius} AU`;

    tooltip.style.left = event.clientX + offsetX + 'px';
    tooltip.style.top = event.clientY + offsetY + 'px';
});
// Current planet line
const lineCanvas = document.getElementById('line-canvas');
const lineCtx = lineCanvas.getContext('2d');
lineCanvas.width = window.innerWidth;
lineCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    lineCanvas.width = window.innerWidth;
    lineCanvas.height = window.innerHeight;
});
export function drawPlanetLine(planet, camera) {
    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    if (!planet) return;
    const vector = planet.mesh.position.clone();
    vector.project(camera);
    if (vector.z > 1) return; // planet behind camera
    const px = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const py = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    const rect = dom.planetPanel.getBoundingClientRect();
    const panelX = rect.right;
    const panelY = rect.top + rect.height / 2;
    lineCtx.beginPath();
    lineCtx.moveTo(panelX, panelY);
    lineCtx.lineTo(px, py);
    lineCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    lineCtx.lineWidth = 1;
    lineCtx.stroke();
}

// Click to focus
let focusTarget = null;
let mouseMoved = false;

export function startFocus(planet) {
    focusTarget = planet;
}

export function updateFocus(camera, controls) {
    if (!focusTarget) return;
    const targetPos = focusTarget.mesh.position;

    const offset = new THREE.Vector3();
    offset.subVectors(camera.position, controls.target);

    const desiredPos = targetPos.clone().add(offset);
    camera.position.lerp(desiredPos, 0.05);
    controls.target.lerp(targetPos, 0.05);
    controls.update();
}

renderer.domElement.addEventListener('mousedown', () => {
    mouseMoved = false;
});
renderer.domElement.addEventListener('mousemove', () => {
    mouseMoved = true;
});
renderer.domElement.addEventListener('click', () => {
    if (!mouseMoved && hoveredPlanet) {
        startFocus(hoveredPlanet);
        showInfoPanel(
            hoveredPlanet.name,
            planetData[hoveredPlanet.name.toLowerCase()]
        );
    }
});
