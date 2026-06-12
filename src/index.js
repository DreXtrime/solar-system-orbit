import * as THREE from 'three';
import Planet from './bodies.js';
import Moon from './moons.js';
import * as UI from './ui.js';
import { scene, camera, renderer, composer } from './scene.js';
import { animatePreview } from './preview.js';
import { controls } from './controls.js';
import { planets } from './planets.js';
import { drawPlanetLine, updateFocus } from './interaction.js';
import { setPreviewPlanet } from './preview.js';

const INTRO_DURATION = 5000;
let introStartTime = null;
let introComplete = false;
let simulationSpeed = 0.3;
let paused = false;

planets.forEach((planet) => {
    planet.create();
    scene.add(planet.mesh);
    if (planet.orbitRing) scene.add(planet.orbitRing);
    if (planet.ring) scene.add(planet.ring);
});
planets.forEach((planet) => {
    planet.moons.forEach((moon) => {
        moon.create();
        scene.add(moon.mesh);
        scene.add(moon.orbitRing);
    });
});

// Scene helpers
function addPlanetToScene(planet) {
    scene.add(planet.mesh);
    if (planet.orbitRing) scene.add(planet.orbitRing);
    if (planet.ring) scene.add(planet.ring);
}

function removePlanetFromScene(planet) {
    scene.remove(planet.mesh);
    if (planet.orbitRing) scene.remove(planet.orbitRing);
    if (planet.ring) scene.remove(planet.ring);
}

function addMoonToScene(moon) {
    scene.add(moon.mesh);
    if (moon.orbitRing) scene.add(moon.orbitRing);
}

function removeMoonFromScene(moon) {
    scene.remove(moon.mesh);
    if (moon.orbitRing) scene.remove(moon.orbitRing);
}

// Position sync when scene is paused
function syncPlanetPosition(planet) {
    planet.mesh.position.x = Math.cos(planet.angle) * planet.orbitScaledRadius;
    planet.mesh.position.z = Math.sin(planet.angle) * planet.orbitScaledRadius;
    if (planet.ring) planet.ring.position.copy(planet.mesh.position);
    planet.moons.forEach((moon) => syncMoonPosition(moon, planet));
}

function syncMoonPosition(moon, planet) {
    moon.mesh.position.x =
        planet.mesh.position.x + Math.cos(moon.angle) * moon.orbitRadius;
    moon.mesh.position.z =
        planet.mesh.position.z + Math.sin(moon.angle) * moon.orbitRadius;
    moon.orbitRing.position.x = planet.mesh.position.x;
    moon.orbitRing.position.z = planet.mesh.position.z;
}

// CRUD
function savePlanet(values, existingPlanet) {
    if (existingPlanet) {
        removePlanetFromScene(existingPlanet);
        existingPlanet.update(values);
        existingPlanet.create();
        syncPlanetPosition(existingPlanet);
        addPlanetToScene(existingPlanet);
        UI.renderPlanetList(planets, (planet) => UI.showEditView(planet));
        setPreviewPlanet(existingPlanet);
    } else {
        if (!values.name) return;
        const newPlanet = new Planet(
            values.name,
            values.radius,
            values.color,
            values.orbitRadius,
            values.yearDuration,
            0.02
        );
        newPlanet.create();
        addPlanetToScene(newPlanet);
        planets.push(newPlanet);
        UI.renderPlanetList(planets, (planet) => UI.showEditView(planet));
        UI.showEditView(newPlanet);
    }
}

function saveMoon(values, existingMoon, planet) {
    if (existingMoon) {
        removeMoonFromScene(existingMoon);
        existingMoon.name = values.name;
        existingMoon.radius = values.radius;
        existingMoon.color = values.color;
        existingMoon.orbitRadius = values.orbitRadius;
        existingMoon.orbitSpeed = values.orbitSpeed;
        existingMoon.create();
        syncMoonPosition(existingMoon, planet);
        addMoonToScene(existingMoon);
        UI.showMoonEditView(existingMoon, planet);
    } else {
        if (!values.name) return;
        const newMoon = new Moon(
            values.name,
            values.radius,
            values.color,
            values.orbitRadius,
            values.orbitSpeed
        );
        newMoon.create();
        addMoonToScene(newMoon);
        planet.moons.push(newMoon);
        UI.showMoonEditView(newMoon, planet);
    }
}

function deletePlanet(planet) {
    planet.moons.forEach((moon) => removeMoonFromScene(moon));
    removePlanetFromScene(planet);
    const planetIndex = planets.indexOf(planet);
    planets.splice(planetIndex, 1);
    UI.renderPlanetList(planets, (p) => UI.showEditView(p));
    UI.showListView();
}

function deleteMoon(moon, planet) {
    removeMoonFromScene(moon);
    const index = planet.moons.indexOf(moon);
    planet.moons.splice(index, 1);
    UI.showEditView(planet);
}

document.getElementById('btn-playpause').addEventListener('click', () => {
    paused = !paused;
    document.getElementById('btn-playpause').textContent = paused
        ? 'Play'
        : 'Pause';
});
document.getElementById('speed-slider').addEventListener('input', (e) => {
    simulationSpeed = parseFloat(e.target.value);
    document.getElementById('speed-label').textContent = `${simulationSpeed}x`;
});

UI.renderPlanetList(planets, (planet) => {
    UI.showEditView(planet);
});

UI.initUI(planets, {
    onSave: (values, planet) => {
        if (planet?.isStar) return;
        savePlanet(values, planet);
    },
    onDelete: (planet) => deletePlanet(planet),
    onMoonSave: (values, moon, planet) => saveMoon(values, moon, planet),
    onMoonDelete: (moon, planet) => deleteMoon(moon, planet),
    onBack: () => drawPlanetLine(null, camera),
});

// Fade in
window.addEventListener('load', () => {
    setTimeout(() => {
        const overlay = document.getElementById('fade-overlay');
        overlay.style.opacity = '0';
        overlay.addEventListener('transitionend', () => overlay.remove());
        introStartTime = performance.now();
        introComplete = false;
    }, 800);
});

animatePreview();
renderer.compile(scene, camera);

function animate(time) {
    controls.update();
    if (!introComplete) {
        if (introStartTime === null) {
            controls.enabled = false;
            composer.render(scene, camera);
            return;
        }
        const progress = Math.min((time - introStartTime) / INTRO_DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        camera.position.x = THREE.MathUtils.lerp(200, 0, eased);
        camera.position.y = THREE.MathUtils.lerp(100, 10, eased);
        camera.position.z = THREE.MathUtils.lerp(200, 10, eased);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        if (progress >= 1) {
            introComplete = true;
            controls.enabled = true;
        } else {
            controls.enabled = false;
        }
    }

    if (!paused) {
        planets.forEach((planet) => {
            if (planet.clockwiseRotation) {
                planet.mesh.rotation.y -=
                    0.01 * planet.rotationSpeed * simulationSpeed;
            } else {
                planet.mesh.rotation.y +=
                    0.01 * planet.rotationSpeed * simulationSpeed;
            }
            if (planet.ring) {
                planet.ring.position.copy(planet.mesh.position);
            }
            if (planet.isStar) return;
            planet.angle += (0.01 * simulationSpeed) / planet.yearDuration;
            planet.mesh.position.x =
                Math.cos(planet.angle) * planet.orbitScaledRadius;
            planet.mesh.position.z =
                Math.sin(planet.angle) * planet.orbitScaledRadius;

            planet.moons.forEach((moon) => {
                moon.angle += moon.orbitSpeed * simulationSpeed * 0.01;
                moon.mesh.position.x =
                    planet.mesh.position.x +
                    Math.cos(moon.angle) * moon.orbitRadius;
                moon.mesh.position.z =
                    planet.mesh.position.z +
                    Math.sin(moon.angle) * moon.orbitRadius;
                moon.orbitRing.position.x = planet.mesh.position.x;
                moon.orbitRing.position.z = planet.mesh.position.z;
                moon.mesh.rotation.y += 0.01;
            });
        });
    }
    animatePreview();
    updateFocus(camera, controls);
    drawPlanetLine(UI.getCurrentPlanet(), camera);
    composer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
