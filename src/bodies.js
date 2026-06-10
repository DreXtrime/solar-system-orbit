import * as THREE from "three";

export default class Planet {
    constructor(name, radius, color, orbitRadius, yearDuration, rotationSpeed, isStar = false) {
        this.name = name
        this.radius = radius
        this.color = color
        this.orbitRadius = orbitRadius
        this.yearDuration = yearDuration
        this.rotationSpeed = rotationSpeed
        this.isStar = isStar
        this.angle = 0
        this.mesh = null
        this.orbitRing = null
    }

    create() {
        this.mesh = this.createPlanet(this.radius, this.color)
        if (!this.isStar) {
            this.orbitRing = this.createOrbit(this.orbitRadius)
        }
    }

    // TODO: quality based on size
    createOrbit() {
        const points = []
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2
            points.push(new THREE.Vector3(Math.cos(angle) * this.orbitRadius, 0, Math.sin(angle) * this.orbitRadius))
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({ color: 0x444444 })
        return new THREE.Line(geometry, material)
    }

    createPlanet() {
        const geometry = new THREE.SphereGeometry(this.radius);
        const material = new THREE.MeshBasicMaterial({ color: this.color });
        return new THREE.Mesh(geometry, material);
    }
}
