import * as THREE from 'https://cdn.skypack.dev/three';

class Particle {

    constructor(pos, dir) {
        this.pos = pos;
        this.origPos = pos;
        this.dir = dir;
        this.size = 0.1;
        this.vel = new THREE.Vector3(0, 0, 0);

        //create a mesh and return it to the scene
        const geometry = new THREE.SphereGeometry( 15, 32, 16 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const sphere = new THREE.Mesh( geometry, material );
        this.mesh = sphere;

        this.mesh.position.set(pos.x, pos.y, pos.z);
        this.mesh.scale.set(0.1, 0.1, 0.1);
    }


    update(amp, freq, scale, time) {
        //calculate the new position and offset per animation frame
        const offset = amp * Math.sin(freq * time);

        this.vel.z += offset * 0.01;

        this.pos.add(this.vel);

        this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    }


}

export default Particle;