import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js'
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js';
import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/OBJLoader.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1,1000);
const clock = new THREE.Clock();
const loader = new FBXLoader();
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0.4,0.7,0.9));
renderer.setSize(window.innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

let loadedAssets = 0;
const totalAssets = 5;

const keys = {};

const patito = {
    victory: false,
    death: false,
    mixer:null, //permite controlar las animaciones
    handler : null, //objeto literal
    action: {
        idle: null,
        run: null,
        jump:null,
		push:null
    }
}

const ranita = {
    victory: false,
    death: false,
    mixer:null, //permite controlar las animaciones
    handler : null, //objeto literal
    action: {
        idle: null,
        run: null,
        jump:null,
		push:null
    }
}
var cont=0;

//COLLISIONS
var colisionPlayer2;
var colisionPlataf0;
var colisionPlataf1;
var colisionPlataf2;
var colisionPlataf3;
var colisionPlataf4;
var colisionPlataf5;
var colisionPlataf6;


//POSICIONES INICIALES EN X
var posicionInicialX0 ;
var posicionInicialX1 ;
var posicionInicialX2 ;
var posicionInicialX3 ;
var posicionInicialX4 ;
var posicionInicialX5 ;
var posicionInicialX6 ;

//POSICIONES INICIALES EN Z
var posicionInicialZ0 ;
var posicionInicialZ1 ;
var posicionInicialZ2 ;
var posicionInicialZ3 ;
var posicionInicialZ4 ;
var posicionInicialZ5 ;
var posicionInicialZ6 ;


// function onStartFloor(){
//     const geometry = new THREE.PlaneGeometry(20,20);
//     const material = new THREE.MeshStandardMaterial({
//         color: 0xff0000 });
//     const plane = new THREE.Mesh (geometry, material);
//     plane.rotation.x = THREE.Math.degToRad(-90);
//     scene.add(plane);
// }


const listener = new THREE.AudioListener();
//audio loader para cargar todos los archivos de audio
const audioLoader = new THREE.AudioLoader();

const backgroundSound = new THREE.Audio (listener);

function onLoadAudio(){
audioLoader.load('../music/level.mp3',function(buffer){
    backgroundSound.setBuffer(buffer);
    backgroundSound.setLoop(true);
    backgroundSound.setVolume(0.3);//volumen entre 0-1
    backgroundSound.play(); // inicializa el sonido al instante
})
}

function collisions(){

    var Plataforma00 =  scene.getObjectByName("0");
    var Plataforma01 = scene.getObjectByName("1");
    var Plataforma02 =  scene.getObjectByName("2");
    var Plataforma03 = scene.getObjectByName("3");
    var Plataforma04 =  scene.getObjectByName("4");
    var Plataforma05 = scene.getObjectByName("5");
    var Plataforma06 = scene.getObjectByName("6");
    var playerPato =scene.getObjectByName("patito");

    //Bounding Box
    colisionPlataf0 = new THREE.Box3().setFromObject(Plataforma00);
    colisionPlataf1 = new THREE.Box3().setFromObject(Plataforma01);
    colisionPlataf2 = new THREE.Box3().setFromObject(Plataforma02);
    colisionPlataf3 = new THREE.Box3().setFromObject(Plataforma03);
    colisionPlataf4 = new THREE.Box3().setFromObject(Plataforma04);
    colisionPlataf5 = new THREE.Box3().setFromObject(Plataforma05);
    colisionPlataf6 = new THREE.Box3().setFromObject(Plataforma06);
    colisionPlayer2=new THREE.Box3().setFromObject(playerPato);

    var collisionP2YPL0 = colisionPlayer2.intersectsBox(colisionPlataf0);
    var collisionP2YPL1 = colisionPlayer2.intersectsBox(colisionPlataf1);
    var collisionP2YPL2 = colisionPlayer2.intersectsBox(colisionPlataf2);
    var collisionP2YPL3 = colisionPlayer2.intersectsBox(colisionPlataf3);
    var collisionP2YPL4 = colisionPlayer2.intersectsBox(colisionPlataf4);
    var collisionP2YPL5 = colisionPlayer2.intersectsBox(colisionPlataf5);
    var collisionP2YPL6 = colisionPlayer2.intersectsBox(colisionPlataf6);

    if(collisionP2YPL0 || collisionP2YPL1 || collisionP2YPL2 || collisionP2YPL3 || collisionP2YPL4 || collisionP2YPL5 || collisionP2YPL6){
        console.log("intersecta");
        
    }else{
        playerPato.position.y -=1;
        if(playerPato.position.y == -20){
            clock.stop();
            $("#game_over").fadeIn();
        }
    }


}


function onStartModels(){
    //ESCENARIO
    loadOBJWithMTL("../models/scenario/","scenario_lava.obj","scenario_lava.mtl", (miObjFinal)=> {

        miObjFinal.position.x = 180;
        miObjFinal.position.y = -100;
        miObjFinal.position.z = -150;
        miObjFinal.rotation.y =THREE.Math.degToRad(180);
        miObjFinal.scale.set(0.1,0.1,0.1);


        scene.add(miObjFinal);
        //isWorldReady[0] = true;
    });
   
    loadOBJWithMTL("../models/scenario/","coin.obj","coin.mtl", (miObjFinal)=> {

        miObjFinal.position.x = 0;
        miObjFinal.position.y = 1.5;
        miObjFinal.position.z = -8;
        miObjFinal.scale.set(1.5,1.5,1.5);
        miObjFinal.name = "coin00";


        scene.add(miObjFinal);
        //isWorldReady[0] = true;
    });

    //PLATAFORMA AMARILLA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_amarilla.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = 0;	
        miObjFinal.position.z = -80;
        posicionInicialX0=miObjFinal.position.x = 0;	
        posicionInicialZ0=miObjFinal.position.z = -80;		
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.name = "0";
    
        scene.add(miObjFinal);
    });

    //PLATAFORMA AZUL
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_azul.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = 9;
        miObjFinal.position.z = -64.5;	
        
        posicionInicialX1=miObjFinal.position.x = 9;
        posicionInicialZ1=miObjFinal.position.z = -64.5;
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.name = "1";	
    
        scene.add(miObjFinal);
    });

    //PLATAFORMA MORADA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_morada.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = -9;	
        miObjFinal.position.z = -64.5;	
        posicionInicialX2=miObjFinal.position.x = -9;	
        posicionInicialZ2=miObjFinal.position.z = -64.5;	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.name = "2";
    
        scene.add(miObjFinal);
    });

    //PLATAFORMA NARANJA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_naranja.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = 18;	
        miObjFinal.position.z = -80;	
        
        posicionInicialX3=miObjFinal.position.x = 18;	
        posicionInicialZ3=miObjFinal.position.z = -80;
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.name = "3";
    
        scene.add(miObjFinal);
    });

    //PLATAFORMA ROJA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_roja.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = -18;	
        miObjFinal.position.z = -80;
        posicionInicialX4=miObjFinal.position.x = -18;	
        posicionInicialZ4=miObjFinal.position.z = -80;	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.name = "4";
    
        scene.add(miObjFinal);
    });

    //PLATAFORMA ROSA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_rosa.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = 9;	
        miObjFinal.position.z = -95.5;	
        posicionInicialX5=miObjFinal.position.x = 9;	
        posicionInicialZ5=miObjFinal.position.z = -95.5;
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.name = "5";
    
        scene.add(miObjFinal);
    });

    //PLATAFORMA VERDE
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_verde.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = -9;	
        miObjFinal.position.z = -95.5;	
        posicionInicialX6=miObjFinal.position.x = -9;	
        posicionInicialZ6=miObjFinal.position.z = -95.5;
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.name = "6";
    
        scene.add(miObjFinal);
    });

        //RAYO ROJO
    loadOBJWithMTL("../models/scenario/","rayo.obj","rayo_rojo.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = -9;	
        miObjFinal.position.y = 1.5;	
        miObjFinal.position.z = -14;	
        miObjFinal.scale.set(1.5,1.5,1.5);
        miObjFinal.name = "rayo_rojo00";
    
        scene.add(miObjFinal);
        //isWorldReady[1] = true;
    });
    
    //RAYO VERDE
    loadOBJWithMTL("../models/scenario/","rayo.obj","rayo_verde.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = 9;	
        miObjFinal.position.y = 1.5;	
        miObjFinal.position.z = -14;	
        miObjFinal.scale.set(1.5,1.5,1.5);
        miObjFinal.name = "rayo_verde00";
    
        scene.add(miObjFinal);
    });

}

function color(min, max){

    var rand= Math.floor((Math.random() * (max - min + 1)) + min);
    if(rand==0){
        $("#colors").addClass("yellow");
        $("#colors").removeClass("red"); 
        $("#colors").removeClass("green");
        $("#colors").removeClass("purple");
        $("#colors").removeClass("blue"); 
        $("#colors").removeClass("pink");
        $("#colors").removeClass("orange");
        $("#amarillo").fadeIn();
        $("#azul").hide();
        $("#morado").hide();
        $("#naranja").hide();
        $("#rojo").hide();
        $("#rosa").hide();
        $("#verde").hide();

    }else if (rand==1 ){ 
        $("#colors").addClass("blue");
        $("#colors").removeClass("red"); 
        $("#colors").removeClass("green");
        $("#colors").removeClass("purple");
        $("#colors").removeClass("yellow"); 
        $("#colors").removeClass("pink");
        $("#colors").removeClass("orange");
        $("#azul").fadeIn();
        $("#amarillo").hide();
        $("#morado").hide();
        $("#naranja").hide();
        $("#rojo").hide();
        $("#rosa").hide();
        $("#verde").hide();
    }else if(rand==2){
        $("#colors").addClass("purple");
        $("#colors").removeClass("red"); 
        $("#colors").removeClass("green");
        $("#colors").removeClass("blue");
        $("#colors").removeClass("yellow"); 
        $("#colors").removeClass("pink");
        $("#colors").removeClass("orange");
        $("#morado").fadeIn();
        $("#azul").hide();
        $("#amarillo").hide();
        $("#naranja").hide();
        $("#rojo").hide();
        $("#rosa").hide();
        $("#verde").hide();
    }else if(rand==3){
        $("#colors").addClass("orange");
        $("#colors").removeClass("red"); 
        $("#colors").removeClass("green");
        $("#colors").removeClass("purple");
        $("#colors").removeClass("yellow"); 
        $("#colors").removeClass("pink");
        $("#colors").removeClass("blue");
        $("#naranja").fadeIn();
        $("#morado").hide();
        $("#azul").hide();
        $("#amarillo").hide();
        $("#rojo").hide();
        $("#rosa").hide();
        $("#verde").hide();
    }else if(rand==4){
        $("#colors").addClass("red");
        $("#colors").removeClass("blue"); 
        $("#colors").removeClass("green");
        $("#colors").removeClass("purple");
        $("#colors").removeClass("yellow"); 
        $("#colors").removeClass("pink");
        $("#colors").removeClass("orange");
        $("#rojo").fadeIn();
        $("#naranja").hide();
        $("#morado").hide();
        $("#azul").hide();
        $("#amarillo").hide();
        $("#rosa").hide();
        $("#verde").hide();
    } else if(rand==5){
        $("#colors").addClass("pink");
        $("#colors").removeClass("red"); 
        $("#colors").removeClass("green");
        $("#colors").removeClass("purple");
        $("#colors").removeClass("yellow"); 
        $("#colors").removeClass("blue");
        $("#colors").removeClass("orange");
        $("#rosa").fadeIn();
        $("#rojo").hide();
        $("#naranja").hide();
        $("#morado").hide();
        $("#azul").hide();
        $("#amarillo").hide();
        $("#verde").hide();
    } else if(rand==6){
        $("#colors").addClass("green");
        $("#colors").removeClass("red"); 
        $("#colors").removeClass("blue");
        $("#colors").removeClass("purple");
        $("#colors").removeClass("yellow"); 
        $("#colors").removeClass("pink");
        $("#colors").removeClass("orange");
        $("#verde").fadeIn();
        $("#rosa").hide();
        $("#rojo").hide();
        $("#naranja").hide();
        $("#morado").hide();
        $("#azul").hide();
        $("#amarillo").hide();
    }
    setTimeout(function(){
        random(rand)
    },10000);

}

function random(rand) {
    for (var i=0 ; i<7; i++ ){
        if(i != rand){
            var plataforma= scene.getObjectByName(i.toString());
            removePlataforma(plataforma);
            console.log(rand);
        }

    }
    setTimeout(function(){
        addRandom(rand)
    },5000)


}
    

function addRandom(random){
    for (var i=0 ; i<7; i++ ){
        if(i!=random){
            var plataforma= scene.getObjectByName(i.toString());
            addPlataforma(plataforma,i);
            console.log(random);
            
        }
    
    }
}
function removePlataforma(object){
    object.position.x=500
}
function addPlataforma(object,i){
    if(i==0){
        object.position.x=posicionInicialX0;
        object.position.z=posicionInicialZ0;

    }else if(i==1){
        object.position.x=posicionInicialX1;
        object.position.z=posicionInicialZ1;

    }else if(i==2){
        object.position.x=posicionInicialX2;
        object.position.z=posicionInicialZ2;
    }else if(i==3){
        object.position.x=posicionInicialX3;
        object.position.z=posicionInicialZ3;
    }else if(i==4){
        object.position.x=posicionInicialX4;
        object.position.z=posicionInicialZ4;
    }else if(i==5){
        object.position.x=posicionInicialX5;
        object.position.z=posicionInicialZ5;
    }else if(i==6){
        object.position.x=posicionInicialX6;
        object.position.z=posicionInicialZ6;
    }
}
//inicializamos el jugador
function onStartPlayer(){

    loader.load('../models/patito/patito_ex_base.fbx', (model) => {
        model.scale.set(1.95,1.95,1.95);
    
    patito.handler = model;
    patito.mixer = new THREE.AnimationMixer(patito.handler);
    
        loader.load('../models/patito/patito_ex_base@Idle.fbx',(asset)=>{
            const idleAnimation = asset.animations[0];
            patito.action.idle = patito.mixer.clipAction(idleAnimation);
            patito.action.idle.play();
            loadedAssets++;
        });
        loader.load('../models/patito/pato_ext@Running.fbx',(asset)=>{
            const runAnimation = asset.animations[0];
            patito.action.run = patito.mixer.clipAction(runAnimation);
            //patito.action.run.play();
            loadedAssets++;
        });
        loader.load('../models/patito/Jump.fbx',(asset)=>{
            const jumpAnimation = asset.animations[0];
            patito.action.jump = patito.mixer.clipAction(jumpAnimation);
            //patito.action.jump.loop=THREE.LoopOnce;
            //patito.action.jump.play();
            loadedAssets++;
        });
        loader.load('../models/patito/pato_ext@Push.fbx',(asset)=>{
            const pushAnimation = asset.animations[0];
            patito.action.push = patito.mixer.clipAction(pushAnimation);
            //patito.action.push.loop=THREE.LoopOnce;
            //patito.action.push.play();
            loadedAssets++;
        });
     model.position.x = -3;
     model.position.z = -11;
     //model.position.y = 0;
     model.name="patito"
        loadedAssets++;
        scene.add(model);
    });
}



function loadOBJWithMTL(path, objFile, mtlFile, cuandoTodoTermine) {
    var mtlLoader = new MTLLoader();

    mtlLoader.setPath(path);
    //debugger;
    mtlLoader.load(mtlFile, (misMateriales)=>{
        //aqui nos va a avisar cuando se termine la carga de materiales

    var objLoader = new OBJLoader();
    objLoader.setMaterials(misMateriales)
    objLoader.setPath(path);
    objLoader.load(objFile, (miObj)=>{
        //aqui nos avisa cuando el OBJ este cargado

        cuandoTodoTermine(miObj);
    });
    
    });

}

function onStart(){
    const light = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(light);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    scene.add(directionalLight);

    // onStartFloor();
    onStartModels();
    onStartPlayer();
    setInterval(function(){
        color(0,6)
    },10000);
    camera.position.y = 30;
    camera.rotation.x = THREE.Math.degToRad(-25);
    camera.position.z = 45;
}

let lastState = 'idle';
function onUpdatePlayer(dt){
    let state = 'idle';
    patito.mixer.update(dt);

    const patitoSpeed = 15;
    if(keys['w']){
        patito.handler.position.z -= patitoSpeed * dt;
        patito.handler.rotation.y = THREE.Math.degToRad(180);
        state = 'run';
    }
    if(keys['s']){
        patito.handler.position.z += patitoSpeed * dt;
        patito.handler.rotation.y = 0;
        state = 'run';
    }
    if(keys['a']){
        patito.handler.position.x -= patitoSpeed * dt;
        patito.handler.rotation.y = THREE.Math.degToRad(-90);
        state = 'run';
    }
    if(keys['d']){
        patito.handler.position.x += patitoSpeed * dt;
        patito.handler.rotation.y = THREE.Math.degToRad(90);
        state = 'run';
    }
    
    if(keys['shift']){
        state = 'jump';
    }

    if(lastState != state){

        const lastAnimation = patito.action[lastState];
        const newAnimation = patito.action[state];

        lastAnimation.reset();
        newAnimation.reset();

        const crossFadeTime = 0.3; //desvanecido entre animaciones
        lastAnimation.crossFadeTo(newAnimation, crossFadeTime).play(); // pasamos de la animacion anterior a la nueva
        lastState = state; //el estado actual pase a ser el anterior 
    }

    var bueno = scene.getObjectByName("rayo_rojo00");
		var malo = scene.getObjectByName("rayo_verde00");
		var coin = scene.getObjectByName("coin00");

		bueno.rotation.y += THREE.Math.degToRad(0.8);
		malo.rotation.y += THREE.Math.degToRad(0.7);
		coin.rotation.y += THREE.Math.degToRad(1);
}

let lastState2 = 'idle';

 

function onUpdate(dt){
    onUpdatePlayer(dt);
}

function render(){
    requestAnimationFrame(render);
    collisions()
    const dt = clock.getDelta();
    if(loadedAssets >= totalAssets){
        onUpdate(dt);
        renderer.render(scene,camera);
    }
}

document.addEventListener('keydown',(e)=>{
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup',(e)=>{
    keys[e.key.toLowerCase()] = false;
});

document.addEventListener('keypress',(e)=>{
    keys[e.key.toLowerCase()] = true;
});

onStart();
onLoadAudio();
render();
