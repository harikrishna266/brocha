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
        this.addLight();
        this.loadObject();
        this.renderScene();
    }
    renderScene() {
        this.render.render(this.scene,this.camera);

        this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => {this.renderScene()}) );
    }

    addLight() {
        let AmbientLight = new THREE.AmbientLight(0xffffff,0.5);
        let PointLight = new THREE.PointLight(0xffffff,0.5);
        let light = new THREE.PointLight( 0xFFFFDD );
        light.position.set( -15, 10, 15 );
        this.scene.add(AmbientLight);
        this.scene.add(PointLight);
        this.scene.add(light);
    }
    setCamera() {
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / 600, .1,10000);
        this.camera.position.x = 2;
        this.camera.position.z = 7;
        this.camera.position.y = 1;
    }
    addMeshToScene() {
        this.scene.add(this.mesh);
    }
    createScene() {
        this.scene = new THREE.Scene();
    }
    swipe(unknow,direction) {
        if(direction =="panleft") {
            this.mesh.object.rotateX(10); 
        } else if(direction =="panright"){
            this.mesh.object.rotateX(10); 
        } else {

        }
    }
    
    loadObject() {
        let loader = new THREE.JSONLoader();
        loader.load( "./assets/models/box.json", (geometry, materials)=> {
            let material = new THREE.MeshFaceMaterial(materials);
            this.mesh = new THREE.Mesh( geometry, material );
            this.mesh.scale.set(1.5,1.5,1.5);
            this.scene.add(this.mesh);
        } );
    }
}
