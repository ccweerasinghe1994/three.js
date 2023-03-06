import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (evt) => {
    cursor.x = (evt.clientX / sizes.width - 0.5) * -1;
    // because the y-axis is inverted in js
    cursor.y = ((evt.clientY / sizes.height) - 0.5);
})


// scene
const scene = new THREE.Scene();

// Red Cube

const geometry = new THREE.BoxGeometry(1, 1, 1, 6, 6, 6);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


const sizes = {
    width: 800,
    height: 600,
    getAspectRatio() {
        return this.width / this.height
    }
};

// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// const camera = new THREE.OrthographicCamera(-1 * sizes.getAspectRatio(), 1 * sizes.getAspectRatio(), 1, -1, 0.1, 100);

camera.position.z = 5;
// camera.position.y = 2;
// camera.position.x = 2;


scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
// controls.target.y = 1;
// controls.update()
if (canvas) {

    const render = new THREE.WebGLRenderer({
        canvas,
    });
    render.setSize(sizes.width, sizes.height);
    // const clock = new THREE.Clock();
    const tick = () => {
        // const timeElapsed = clock.getElapsedTime();
        // mesh.rotation.y = timeElapsed * 0.5;
        // this is to request the frame
        window.requestAnimationFrame(tick);
        // camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3;
        // camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 3;
        // camera.position.y = cursor.y * 5;
        // camera.lookAt(mesh.position)

        controls.update()
        render.render(scene, camera);
    }
    tick();
}

// Animations



