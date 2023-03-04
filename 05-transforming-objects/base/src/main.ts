import * as THREE from 'three';

// scene
const scene = new THREE.Scene();

// Red Cube

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const sizes = {
    width: 800,
    height: 600,
};

// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
if (canvas) {

    const render = new THREE.WebGLRenderer({
        canvas,
    });
    render.setSize(sizes.width, sizes.height);

    render.render(scene, camera);
}

