import * as THREE from "three";
import Planet from "./bodies.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as UI from "./ui.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);

const tooltip = document.getElementById('tooltip');
const tooltipName = document.getElementById('tooltip-name');
const tooltipSize = document.getElementById('tooltip-size');
const tooltipDistance = document.getElementById('tooltip-distance');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener('resize', handleResize);

document.body.appendChild(renderer.domElement);

const planets = [
    new Planet("Sun", 109.1, 0xf6d821, 0, 0.1, 0.02, true),
    new Planet("Mercury", 0.383, 0xaaaaaa, 0.387, 0.240846, 0.004),
    new Planet("Venus",   0.949, 0xffaa33, 0.723, 0.615198, 0.002),
    new Planet("Earth",   1.0, 0x2233ff, 1.00, 1.0, 0.02),
    new Planet("Mars",    0.532, 0xcc5533, 1.52, 1.8808, 0.018),
    new Planet("Jupiter", 10.97, 0xd9b38c, 5.20, 11.862, 0.04),
    new Planet("Saturn",  9.14, 0xe6d28c, 9.58, 29.457, 0.035),
    new Planet("Uranus",  3.98, 0x99ddff, 19.2, 84.017, 0.025),
    new Planet("Neptune", 3.86, 0x3366ff, 30.05, 164.79, 0.025),
    new Planet("Pluto",   0.187, 0xc8b8a8, 39.5, 248.0, 0.01),
];

planets.forEach(planet => {
    planet.create();
    scene.add(planet.mesh)
    if (planet.orbitRing) scene.add(planet.orbitRing)
});

function savePlanet(values, existingPlanet) {
    console.log(values.yearDuration)
    if (existingPlanet) {
        scene.remove(existingPlanet.mesh);
        scene.remove(existingPlanet.orbitRing);

        existingPlanet.name = values.name;
        existingPlanet.radius = values.radius;
        existingPlanet.color = values.color;
        existingPlanet.orbitRadius = values.orbitRadius;
        existingPlanet.yearDuration = values.yearDuration;
        existingPlanet.rotationSpeed = values.rotationSpeed;

        existingPlanet.update(values);
        existingPlanet.create();
        scene.add(existingPlanet.mesh);
        if (existingPlanet.orbitRing) scene.add(existingPlanet.orbitRing);
    } else {
        const newPlanet = new Planet(
            values.name,
            values.radius,
            values.color,
            values.orbitRadius,
            values.yearDuration,
            values.rotationSpeed,
            values.isStar,
        );
        newPlanet.create();
        scene.add(newPlanet.mesh);
        scene.add(newPlanet.orbitRing);
        planets.push(newPlanet);
    }
    UI.renderPlanetList(planets, (planet) => UI.showEditView(planet))
}


const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()


window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const meshes = planets.map(p => p.mesh)
    const orbits = planets.filter(p => p.orbitRing).map(p => p.orbitRing)
    const intersects = raycaster.intersectObjects([...meshes, ...orbits])

    const planet = intersects.length > 0
        ? planets.find(p => p.mesh === intersects[0].object || p.orbitRing === intersects[0].object)
        : null

    if (planet === null) {
        tooltip.classList.add('hidden');
        return;
    } else {
        tooltip.classList.remove('hidden');
        const offsetX = 15;
        const offsetY = 15;

        tooltipName.textContent = planet.name;
        tooltipSize.textContent = `Size: ${planet.radius} Earths`;
        tooltipDistance.textContent = `Distance: ${planet.orbitRadius} AU`;
        tooltip.style.left = (event.clientX + offsetX) + 'px';
        tooltip.style.top = (event.clientY + offsetY) + 'px';
    }
})

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false
camera.lookAt(0, 0, 0);
camera.position.set( 0, 10, 10 );

let simulationSpeed = 0.3;
let paused = false;

UI.renderPlanetList(planets, (planet) => {
    UI.showEditView(planet)
})

UI.initUI(planets, {
    onSave: (values, planet) => { savePlanet(values, planet) },
    onDelete: (planet) => { },
});

function animate(time) {
    controls.update();
    if (!paused) {
        planets.forEach(planet => {
            if (planet.isStar) return;
            planet.angle += 0.01 * simulationSpeed / planet.yearDuration;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.orbitScaledRadius;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.orbitScaledRadius;
        });
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
