import * as THREE from "three";
import Planet from "./bodies.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planets = [
    new Planet("Sun", 1.5, 0xf6d821, 0, 0, 0.02, true),
    new Planet("Mercury", 0.15, 0xaaaaaa, 2, 0.24, 0.004),
    new Planet("Venus",   0.35, 0xffaa33, 3, 0.62, 0.002),
    new Planet("Earth",   0.38, 0x2233ff, 4, 1.00, 0.02),
    new Planet("Mars",    0.25, 0xcc5533, 5, 1.88, 0.018),
    new Planet("Jupiter", 0.90, 0xd9b38c, 8, 11.86, 0.04),
    new Planet("Saturn",  0.80, 0xe6d28c, 11, 29.46, 0.035),
    new Planet("Uranus",  0.60, 0x99ddff, 14, 84.01, 0.025),
    new Planet("Neptune", 0.58, 0x3366ff, 17, 164.8, 0.025),
    new Planet("Pluto",   0.08, 0xc8b8a8, 21, 248.0, 0.01),
];

planets.forEach(planet => {
    planet.mesh = planet.createPlanet(planet.radius, planet.color);
    planet.orbitRing = planet.createOrbit(planet.orbitRadius);
    scene.add(planet.mesh)
    scene.add(planet.orbitRing)
});

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const tooltip = document.getElementById('tooltip');

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(planets.map(p => p.mesh))

    const planet = intersects.length > 0
        ? planets.find(p => p.mesh === intersects[0].object)
        : null

    if (planet === null) {
        tooltip.classList.add('hidden');
        return;
    } else {
        tooltip.classList.remove('hidden');
        const offsetX = 15;
        const offsetY = 15;

        tooltip.textContent = planet.name;
        tooltip.style.left = (event.clientX + offsetX) + 'px';
        tooltip.style.top = (event.clientY + offsetY) + 'px';
    }
    console.log(planet?.name)
})

camera.lookAt(0, 0, 0);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false
camera.position.set( 0, 10, 10 );

function animate(time) {
    controls.update();
    planets.forEach(planet => {
        if (planet.isStar) return;
        planet.angle += 0.01 / planet.yearDuration;
        planet.mesh.position.x = Math.cos(planet.angle) * planet.orbitRadius;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.orbitRadius;
    });
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
