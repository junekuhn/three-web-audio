import * as THREE from 'https://cdn.skypack.dev/three';
import { GUI } from '../deps/dat.gui.min.js';
import Particle from './particle.js';


//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
camera.position.z = 64;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//

const clock = new THREE.Clock(true);

const light = new THREE.HemisphereLight();
scene.add( light );

const particles = [];

for (let i = -10; i<10; i+=2) {
    for (let j = 0; j<10; j++) {
    let myParticle = new Particle(new THREE.Vector3(i*2,j,0), new THREE.Vector3(1, 1, 1));
    particles.push(myParticle);
    scene.add(myParticle.mesh);
    }
}


window.addEventListener( 'resize', onWindowResize );

// camera.position.set(0, 0, 5);

const controls = new function() {
    this.amp = 0.001;
    this.freq = 1.;
    this.scale = 1;
}

const gui = new GUI();
const animationFolder = gui.addFolder('Animation');
animationFolder.add(controls, 'amp', 0.001, 1);
animationFolder.add(controls, 'freq', 0.1, 10);
animationFolder.add(controls, 'scale', 0.1, 100);
// animationFolder.onchange(animate);
animationFolder.open();

function animate() {
    requestAnimationFrame( animate );
    particles.map(particle => particle.update(controls.amp, controls.freq, controls.scale, clock.getElapsedTime()));
    renderer.render( scene, camera );
};

animate();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}