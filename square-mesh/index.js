import * as THREE from 'https://cdn.skypack.dev/three';

//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
camera.position.z = 64;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//

const light = new THREE.HemisphereLight();
scene.add( light );
const geometry = new THREE.BufferGeometry();

const indices = [
    0,1,2,
    1, 2, 3,
];

const vertices =  [
 1, 1, 1,// 0 
 1, -1, 1, // 1
 -1, 1, 1, //2 
 -1, -1, 1, // 3

];

const normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1
];

const colors = [
    1, 0, 0, // red
    0, 1, 0, // green
    1, 1, 1, // white
    0, 1, 1 // blue
];

geometry.setIndex(indices);
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
geometry.setAttribute( 'color', new THREE.Float32BufferAttribute(colors, 3));
geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute(normals, 3));

const material = new THREE.MeshPhongMaterial( {
    side: THREE.DoubleSide,
    vertexColors: true
} );

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

window.addEventListener( 'resize', onWindowResize );

// camera.position.set(0, 0, 5);


function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.01;
    mesh.rotation.z += 0.01;
    renderer.render( scene, camera );
};

animate();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();



    renderer.setSize( window.innerWidth, window.innerHeight );

}