import * as THREE from 'three';
import gsap from "gsap";

// scene
const scene = new THREE.Scene();

// Red Cube

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
mesh.position.x += 1;

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
    // let time = Date.now();

    // const setTime = (value: number) => {
    //     time = value;
    // }
    // const clock = new THREE.Clock();
    // gsap has it's own tick
    gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
    gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})
    const tick = () => {

        // const elapsedTime = clock.getElapsedTime();
        // setTime(currentTime);
        // console.log(elapsedTime)

        // mesh.position.x += .001;
        // mesh.position.y += .001;

        // camera.position.y = Math.sin(elapsedTime);
        // camera.position.x = Math.cos(elapsedTime);

        // camera.lookAt(mesh.position)

        // mesh.rotation.y = elapsedTime * Math.PI * 2;
        // mesh.rotation.x += 0.01
        // mesh.rotation.z += 0.01

        // this is to request the frame
        window.requestAnimationFrame(tick);
        console.log("tick");
        render.render(scene, camera);
    }
    tick();
}

// Animations



