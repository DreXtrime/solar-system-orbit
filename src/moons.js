import * as THREE from "three";

export default class Moon {
    constructor(name, radius, color, orbitRadius = 0.5, orbitSpeed = 0.5, texture = null) {
        this.name = name
        this.radius = radius
        this.color = color
        this.orbitRadius = orbitRadius
        this.orbitSpeed = orbitSpeed
        this.texture = texture
        this.angle = Math.random() * Math.PI * 2
        this.mesh = null
        this.orbitRing = null
    }

    create() {
        this.mesh = this.createMesh()
        this.orbitRing = this.createOrbit()
    }

    createMesh() {
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32)
        const material = this.texture
            ? new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load(`/textures/${this.texture}`),
                color: this.color
            })
            : new THREE.MeshStandardMaterial({ color: this.color })
        return new THREE.Mesh(geometry, material)
    }

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
}