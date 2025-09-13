import * as THREE from "three";

class Renderer {
    canvas: HTMLCanvasElement;
    initialized: boolean;
    renderer!: THREE.WebGLRenderer;
    scene!: THREE.Scene;
    camera!: THREE.PerspectiveCamera;
    mesh!: THREE.Mesh;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.initialized = false;
    }

    init(): void {
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 2;

        // Quad geometry
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
        });
        this.mesh = new THREE.Mesh(geometry, material);

        this.scene.add(this.mesh);

        this.initialized = true;
    }

    render = (): void => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render);
    };

    resize = (): void => {
        if (!this.renderer || !this.camera) return;

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

    start(): void {
        if (!this.initialized) {
            this.init();
        }
        this.render();
    }
}

export { Renderer };
