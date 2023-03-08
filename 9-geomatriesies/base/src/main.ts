import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import './style.css'

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (evt) => {
    cursor.x = (evt.clientX / sizes.width - 0.5) * -1;
    // because the y-axis is inverted in js
    cursor.y = ((evt.clientY / sizes.height) - 0.5);


})

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.getAspectRatio();

    camera.updateProjectionMatrix();

    render.setSize(sizes.width, sizes.height);
    render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        canvas.requestFullscreen();
    }
})

// scene
const scene = new THREE.Scene();

const vertices = [
    // front
    {pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 0],},
    {pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0],},
    {pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1],},

    {pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1],},
    {pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0],},
    {pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1],},
    // right
    {pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 0],},
    {pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0],},
    {pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1],},

    {pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1],},
    {pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0],},
    {pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 1],},
    // back
    {pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0],},
    {pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0],},
    {pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1],},

    {pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1],},
    {pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0],},
    {pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1],},
    // left
    {pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 0],},
    {pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0],},
    {pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1],},

    {pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1],},
    {pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0],},
    {pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 1],},
    // top
    {pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0],},
    {pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0],},
    {pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1],},

    {pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1],},
    {pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0],},
    {pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 1],},
    // bottom
    {pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 0],},
    {pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0],},
    {pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1],},

    {pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1],},
    {pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0],},
    {pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 1],},
];
const positions = [];
const normals = [];
const uvs = [];
for (const vertex of vertices) {
    positions.push(...vertex.pos);
    normals.push(...vertex.norm);
    uvs.push(...vertex.uv);
}
// const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 3);
const geometry = new THREE.BufferGeometry();

const positionNumComponents = 3;
const normalNumComponents = 3;
const uvNumComponents = 2;
geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
geometry.setAttribute(
    'normal',
    new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
geometry.setAttribute(
    'uv',
    new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

const material = new THREE.MeshBasicMaterial({
    wireframe: true, color: '#dcd6d6',

});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    getAspectRatio() {
        return this.width / this.height
    }
};

// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// const camera = new THREE.OrthographicCamera(-1 * sizes.getAspectRatio(), 1 * sizes.getAspectRatio(), 1, -1, 0.1, 100);

camera.position.z = 1;
// camera.position.y = 2;
// camera.position.x = 2;


scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl")!;
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
// controls.target.y = 1;
// controls.update()


const render = new THREE.WebGLRenderer({
    canvas,
});
render.setSize(sizes.width, sizes.height);
render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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


// Animations



