import * as THREE from "three";

const EARTH_DIAMETER_KM = 12742;
const EARTH_DISTANCE_KM = 149598023;
const MAX_RADIUS = 15.0;
const MAX_SUN_RADIUS = 3.0;

export default class Planet {
    constructor(
        name,
        radius,
        color,
        orbitRadius,
        yearDuration,
        rotationSpeed,
        isStar = false,
    ) {
        this.name = name;
        this.isStar = isStar;
        this.color = color;
        this.radius = radius;
        this.scaledRadius = this.#scaleRadius();
        this.orbitRadius = orbitRadius;
        this.orbitScaledRadius = this.#scaleOrbit();
        this.yearDuration = yearDuration;
        this.rotationSpeed = rotationSpeed;
        this.angle = 0;
        this.mesh = null;
        this.orbitRing = null;
    }

    create() {
        this.mesh = this.createPlanet();
        if (!this.isStar) {
            this.orbitRing = this.createOrbit();
        }
    }

    // TODO: quality based on size
    createOrbit() {
        const points = [];
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            points.push(
                new THREE.Vector3(
                    Math.cos(angle) * this.orbitScaledRadius,
                    0,
                    Math.sin(angle) * this.orbitScaledRadius,
                ),
            );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x444444 });
        return new THREE.Line(geometry, material);
    }

    createPlanet() {
        const geometry = new THREE.SphereGeometry(this.scaledRadius);
        const material = new THREE.MeshBasicMaterial({ color: this.color });
        return new THREE.Mesh(geometry, material);
    }

    update(values) {
        this.name = values.name
        this.radius = values.radius
        this.color = values.color
        this.orbitRadius = values.orbitRadius
        this.orbitScaledRadius = this.#scaleOrbit()
        this.yearDuration = values.yearDuration
        this.scaledRadius = this.#scaleRadius()
    }

    #scaleRadius() {
        const scaled = Math.pow(this.radius, 0.55);
        const min = 0.2;
        const max = this.isStar ? MAX_SUN_RADIUS : MAX_RADIUS;
        return Math.min(max, Math.max(min, scaled));
    }

    #scaleOrbit() {
        const scaled = Math.log(this.orbitRadius + 1) * 15.0;
        return Math.max(5.0, scaled);
    }

    getRealDiameter() {
        return this.radius * 2 * EARTH_DIAMETER_KM;
    }

    getRealDistance() {
        return this.orbitRadius * EARTH_DISTANCE_KM;
    }
}
