import * as THREE from 'three';

// scene
const scene = new THREE.Scene();


const group = new THREE.Group();

scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
    color: 0xff0000,
}))

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
    color: 0x00ff00,
}))

cube2.position.x = -2

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
    color: 0x0000ff,
}))

cube3.position.x = 2

group.add(cube1)
group.add(cube2)
group.add(cube3)
const fullRound = Math.PI * 2;
group.rotation.y = fullRound / 12;

const axisHelper = new THREE.AxesHelper(1);
// const arrowHelper = new THREE.ArrowHelper();
scene.add(axisHelper);
// scene.add(arrowHelper);

const sizes = {
    width: 800,
    height: 600,
};

// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.position.x = 0.5;
// camera.position.y = 1.5;

// console.log(mesh.position.distanceTo(camera.position))

camera.lookAt(group.position)
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


/*

// Red Cube

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-2, 1, -1);
scene.add(mesh);


// POSITION
// we can give individual position coordinates
// mesh.position.x = 1;
// mesh.position.y = 1.1;
// mesh.position.z = -1;
// console.log(mesh.position.x)

// this will make center to mesh = 1
// mesh.position.normalize();
// console.log(mesh.position.length())

// SCALE

mesh.scale.x = 2;
// mesh.scale.y = 2;
// mesh.scale.z = 0.5;

// mesh.scale.set(2, 2, 0.5)


// ROTATION
// half a rotation PI full rotation 2PI
// to avoid gimble lock we use reorder
mesh.rotation.reorder('YXZ')
const fullRound = Math.PI * 2;
mesh.rotation.y = fullRound / 4;
mesh.rotation.x = fullRound / 8;
mesh.rotation.z = fullRound / 8;



*/