import * as THREE from "three";
import Planet from "./bodies.js";
import Moon from "./moons.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as UI from "./ui.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

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
    new Planet("Sun", 109.1, 0xffffff, 0, 0.1, 0.04, "sun.jpg", true),
    new Planet("Mercury", 0.383, 0xffffff, 0.387, 0.240846, 0.02, "mercury.jpg"),
    new Planet("Venus",   0.949, 0xffffff, 0.723, 0.615198, 0.01, "venus_atmosphere.jpg", false, true),
    new Planet("Earth",   1.0, 0xffffff, 1.00, 1.0, 0.07, "earth.jpg"),
    new Planet("Mars",    0.532, 0xffffff, 1.52, 1.8808, 0.021, "mars.jpg"),
    new Planet("Jupiter", 10.97, 0xffffff, 5.20, 11.862, 0.07, "jupiter.jpg"),
    new Planet("Saturn",  9.14, 0xffffff, 9.58, 29.457, 0.035, "saturn.jpg", false, false,),
    new Planet("Uranus",  3.98, 0xffffff, 19.2, 84.017, 0.025, "uranus.jpg", false, true),
    new Planet("Neptune", 3.86, 0xffffff, 30.05, 164.79, 0.025, "neptune.jpg"),
    new Planet("Pluto",   0.187, 0xffffff, 39.5, 248.0, 0.02, "pluto.jpg", false, true),
];

planets.find(p => p.name === 'Earth').moons.push(new Moon('Moon', 0.18, 0xffffff, 1.3, 1.5));
planets.find(p => p.name === 'Jupiter').moons.push(new Moon('Io', 0.4, 0xffffff, 4.2, 1.8));
planets.find(p => p.name === 'Jupiter').moons.push(new Moon('Europa', 0.3, 0xffffff, 4.3, 0.95));

planets.forEach(planet => {
    planet.create();
    scene.add(planet.mesh)
    if (planet.orbitRing) scene.add(planet.orbitRing)
});
planets.forEach(planet => {
    planet.moons.forEach(moon => {
        moon.create()
        scene.add(moon.mesh)
        scene.add(moon.orbitRing)
    })
})

function savePlanet(values, existingPlanet) {
    if (existingPlanet) {
        scene.remove(existingPlanet.mesh);
        scene.remove(existingPlanet.orbitRing);
        existingPlanet.update(values);
        existingPlanet.create();
        scene.add(existingPlanet.mesh);
        if (existingPlanet.orbitRing) scene.add(existingPlanet.orbitRing);
        UI.renderPlanetList(planets, (planet) => UI.showEditView(planet))
    } else {
        if (!values.name) return
        const newPlanet = new Planet(
            values.name,
            values.radius,
            values.color,
            values.orbitRadius,
            values.yearDuration,
            0.02,
        );
        newPlanet.create();
        scene.add(newPlanet.mesh);
        if (newPlanet.orbitRing) scene.add(newPlanet.orbitRing);
        planets.push(newPlanet);
        UI.renderPlanetList(planets, (planet) => UI.showEditView(planet))
        UI.showEditView(newPlanet)
    }
}

function saveMoon(values, existingMoon, planet) {
    if (existingMoon) {
        scene.remove(existingMoon.mesh)
        scene.remove(existingMoon.orbitRing)
        existingMoon.name = values.name
        existingMoon.radius = values.radius
        existingMoon.color = values.color
        existingMoon.orbitRadius = values.orbitRadius
        existingMoon.orbitSpeed = values.orbitSpeed
        existingMoon.create()
        scene.add(existingMoon.mesh)
        scene.add(existingMoon.orbitRing)
        UI.showMoonEditView(existingMoon, planet)
    } else {
        if (!values.name) return
        const newMoon = new Moon(values.name, values.radius, values.color, values.orbitRadius, values.orbitSpeed)
        newMoon.create()
        scene.add(newMoon.mesh)
        scene.add(newMoon.orbitRing)
        planet.moons.push(newMoon)
        UI.showMoonEditView(newMoon, planet)
    }
}

function deletePlanet(planet) {
    planet.moons.forEach(moon => {
        scene.remove(moon.mesh)
        scene.remove(moon.orbitRing)
    })
    scene.remove(planet.mesh)
    scene.remove(planet.orbitRing)
    const planetIndex = planets.indexOf(planet)
    planets.splice(planetIndex, 1)
    UI.renderPlanetList(planets, (p) => UI.showEditView(p))
    UI.showListView()
}

function deleteMoon(moon, planet) {
    scene.remove(moon.mesh)
    scene.remove(moon.orbitRing)
    const index = planet.moons.indexOf(moon)
    planet.moons.splice(index, 1)
    UI.showEditView(planet)
}

const sunLight = new THREE.PointLight( 0xca3e09, 1, 0, 0.1);
sunLight.position.set(0, 0, 0);
sunLight.power = 100;
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight( 0x404040, 7 );
scene.add(ambientLight);

const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
bloomPass.threshold = 0.5
composer.addPass(bloomPass)

const skyGeometry = new THREE.SphereGeometry(500, 32, 32)
const skyMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('/textures/stars.jpg'),
    side: THREE.BackSide
})
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0

function createStarfield() {
    const count = 5000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 800
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 })
    return new THREE.Points(geometry, material)
}



scene.add(createStarfield())

const skybox = new THREE.Mesh(skyGeometry, skyMaterial)

scene.add(skybox)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()


window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    const overUI = event.target !== renderer.domElement
    if (overUI) {
        tooltip.classList.add('hidden')
        return
    }

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

document.getElementById('btn-playpause').addEventListener('click', () => {
    paused = !paused
    document.getElementById('btn-playpause').textContent = paused ? 'Play' : 'Pause'
})
document.getElementById('speed-slider').addEventListener('input', (e) => {
    simulationSpeed = (parseFloat(e.target.value));
    document.getElementById('speed-label').textContent = `${simulationSpeed}x`
})

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false
controls.maxDistance = 110
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.zoomSpeed = 0.5
controls.minDistance = 4
camera.lookAt(0, 0, 0);
camera.position.set(0, 10, 10);

let simulationSpeed = 0.3;
let paused = false;

UI.renderPlanetList(planets, (planet) => {
    UI.showEditView(planet)
})

UI.initUI(planets, {
    onSave: (values, planet) => { savePlanet(values, planet) },
    onDelete: (planet) => deletePlanet(planet),
    onMoonSave: (values, moon, planet) => saveMoon(values, moon, planet),
    onMoonDelete: (moon, planet) => deleteMoon(moon, planet),
    onBack: () => lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height),
});

const INTRO_DURATION = 5000
let introComplete = false

window.addEventListener('load', () => {
    setTimeout(() => {
        const overlay = document.getElementById('fade-overlay')
        overlay.style.opacity = '0'
        overlay.addEventListener('transitionend', () => overlay.remove())
    }, 300)
})

setTimeout(() => {
    const hint = document.getElementById('hint')
    hint.style.opacity = '0'
    hint.addEventListener('transitionend', () => hint.remove())
}, 12000)

const lineCanvas = document.getElementById('line-canvas')
const lineCtx = lineCanvas.getContext('2d')
lineCanvas.width = window.innerWidth
lineCanvas.height = window.innerHeight

window.addEventListener('resize', () => {
    lineCanvas.width = window.innerWidth
    lineCanvas.height = window.innerHeight
})

function animate(time) {
    controls.update()

    if (!introComplete) {
        const progress = Math.min(time / INTRO_DURATION, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic

        camera.position.x = THREE.MathUtils.lerp(200, 0, eased)
        camera.position.y = THREE.MathUtils.lerp(100, 10, eased)
        camera.position.z = THREE.MathUtils.lerp(200, 10, eased)

        const lookTarget = new THREE.Vector3(
            THREE.MathUtils.lerp(0, 0, eased),
            THREE.MathUtils.lerp(50, 0, eased),
            THREE.MathUtils.lerp(0, 0, eased)
        )
        camera.lookAt(lookTarget)

        if (progress >= 1) {
            introComplete = true
            controls.enabled = true
        } else {
            controls.enabled = false
        }
    }
    if (!paused) {
        planets.forEach(planet => {
            if (planet.clockwiseRotation) {
                planet.mesh.rotation.y -= 0.01 * planet.rotationSpeed * simulationSpeed;
            } else {
                planet.mesh.rotation.y += 0.01 * planet.rotationSpeed * simulationSpeed ;
            }
            if (planet.isStar) return;
            planet.angle += 0.01 * simulationSpeed / planet.yearDuration;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.orbitScaledRadius;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.orbitScaledRadius;

            planet.moons.forEach(moon => {
                moon.angle += moon.orbitSpeed * simulationSpeed * 0.01
                moon.mesh.position.x = planet.mesh.position.x + Math.cos(moon.angle) * moon.orbitRadius
                moon.mesh.position.z = planet.mesh.position.z + Math.sin(moon.angle) * moon.orbitRadius
                moon.orbitRing.position.x = planet.mesh.position.x
                moon.orbitRing.position.z = planet.mesh.position.z
            })
        });

    }

    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height)
    if (UI.getCurrentPlanet()) {
        const planet = UI.getCurrentPlanet()
        const vector = planet.mesh.position.clone()
        vector.project(camera)
        const px = (vector.x * 0.5 + 0.5) * window.innerWidth
        const py = (-vector.y * 0.5 + 0.5) * window.innerHeight
        const panel = document.getElementById('planet-panel')
        const rect = panel.getBoundingClientRect()
        const panelX = rect.right
        const panelY = rect.top + rect.height / 2
        lineCtx.beginPath()
        lineCtx.moveTo(panelX, panelY)
        lineCtx.lineTo(px, py)
        lineCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
        lineCtx.lineWidth = 1
        lineCtx.stroke()
    }

    composer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
