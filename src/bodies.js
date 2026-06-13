import * as THREE from 'three';

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
        texture = null,
        isStar = false,
        clockwiseRotation = false,
        hasRing = false
    ) {
        this.name = name;
        this.isStar = isStar;
        this.clockwiseRotation = clockwiseRotation;
        this.color = color;
        this.radius = radius;
        this.scaledRadius = this.#scaleRadius();
        this.orbitRadius = orbitRadius;
        this.orbitScaledRadius = this.#scaleOrbit();
        this.yearDuration = yearDuration;
        this.rotationSpeed = rotationSpeed;
        this.texture = texture;
        this.moons = [];
        this.angle = Math.random() * Math.PI * 2;
        this.mesh = null;
        this.orbitRing = null;
        this.hasRing = hasRing;
    }

    create() {
        if (this.isStar) {
            this.mesh = this.createStar();
        } else {
            this.mesh = this.createPlanet();
        }
        if (!this.isStar) {
            this.orbitRing = this.createOrbit();
        }
        if (this.hasRing) {
            this.ring = this.createRing();
        }
    }

    createOrbit() {
        const points = Math.max(64, Math.floor(this.orbitScaledRadius * 8));
        const segments = [];
        for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            segments.push(
                new THREE.Vector3(
                    Math.cos(angle) * this.orbitScaledRadius,
                    0,
                    Math.sin(angle) * this.orbitScaledRadius
                )
            );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(segments);
        const material = new THREE.LineBasicMaterial({ color: 0x707070 });
        return new THREE.Line(geometry, material);
    }

    createPlanet() {
        const geometry = new THREE.SphereGeometry(this.scaledRadius);
        if (this.texture && !this._textureCache) {
            this._textureCache = new THREE.TextureLoader().load(
                `/textures/${this.texture}`
            );
        }
        const material = new THREE.MeshStandardMaterial({
            map: this.texture ? this._textureCache : null,
            color: this.color,
        });
        return new THREE.Mesh(geometry, material);
    }

    createStar() {
        const geometry = new THREE.SphereGeometry(this.scaledRadius);
        const material = this.texture
            ? new THREE.MeshBasicMaterial({
                  map: new THREE.TextureLoader().load(
                      `/textures/${this.texture}`
                  ),
              })
            : new THREE.MeshBasicMaterial({ color: this.color });
        return new THREE.Mesh(geometry, material);
    }

    createRing() {
        const innerRadius = this.scaledRadius * 1.0;
        const outerRadius = this.scaledRadius * 2.2;
        const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
        const pos = geometry.attributes.position;
        const uv = geometry.attributes.uv;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const dist = Math.sqrt(x * x + y * y);
            const u = (dist - innerRadius) / (outerRadius - innerRadius);
            uv.setXY(i, u, 1);
        }
        const texture = new THREE.TextureLoader().load(
            '/textures/saturn_ring.png'
        );
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2.5;
        return ring;
    }

    update(values) {
        this.name = values.name;
        this.radius = values.radius;
        this.color = values.color;
        this.orbitRadius = values.orbitRadius;
        this.orbitScaledRadius = this.#scaleOrbit();
        this.yearDuration = values.yearDuration;
        this.scaledRadius = this.#scaleRadius();
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
}
