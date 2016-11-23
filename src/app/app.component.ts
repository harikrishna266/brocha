import { Component,ViewChild,NgZone } from '@angular/core';
declare const THREE;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public render: any;
    public camera: any;
    public scene: any;
    public cubeGeometry: any;
    public material: any;
    public mesh: any;
    public AmbientLight: any;
    public PointLight: any;
    @ViewChild('canvas') canvas;
    constructor(public ngZone: NgZone) {

    }
    ngAfterViewInit() {
        this.initCanvas();
    }

    initCanvas() {
        let canvasSettings = {
            canvas : this.canvas.nativeElement,
            antialias: true,
        }
        this.render =  new THREE.WebGLRenderer(canvasSettings);
        this.render.setClearColor('0x00ff00');
        this.render.setPixelRatio(window.devicePixelRatio);
        this.render.setSize(600,600);
        
        this.setCamera();
        this.createScene();
        this.createGeometry();
        this.creatematerial();
        this.addLight();
        this.renderScene();
    }
    renderScene() {
        this.render.render(this.scene,this.camera);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => {this.renderScene()}) );
        
    }
    addLight() {
        this.AmbientLight = new THREE.AmbientLight(0xffffff,0.5);
        this.PointLight = new THREE.PointLight(0xffffff,0.5);
        this.scene.add(this.AmbientLight);
        this.scene.add(this.PointLight);
    }
    setCamera() {
        this.camera = new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,0.1,3000);
    }
    createGeometry() {
        this.cubeGeometry = new THREE.BoxGeometry(200, 200, 200);
    }
    creatematerial() {
        this.material = new THREE.MeshLambertMaterial({color: 0xcfcfcf});
        this.mesh = new THREE.Mesh(this.cubeGeometry,this.material);
        this.mesh.position.set(0,0,-1000);
        this.addMeshToScene();
    }
    addMeshToScene() {
        this.scene.add(this.mesh);
    }
    createScene() {
        this.scene = new THREE.Scene();
    }
}
