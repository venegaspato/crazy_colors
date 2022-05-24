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

// var particleSystem;
// var particleCount = 50;
// var particles;
// var reproducirParticulas = false;

let loadedAssets = 0;
const totalAssets = 5;

var puntaje = 0;

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
var patitoSpeed = 15;
var ranitaSpeed = 15;

//COLLISIONS
var colisionPlayer1;
var colisionPlayer2;
var colisionPlataf0;
var colisionPlataf1;
var colisionPlataf2;
var colisionPlataf3;
var colisionPlataf4;
var colisionPlataf5;
var colisionPlataf6;
var colisionRayoVerde;
var colisionRayoRojo;
var colisionMoneda;


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

// cronometro

const enemy = {
    mixer:null, //permite controlar las animaciones
    handler : null, //objeto literal
    action: {
        idle: null,
        run: null,
		attack:null
    }
}
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

/*Colisiones enemigo

const rayCastEnemy = new THREE.Raycaster();
const search = []; //direcciones de todos los raycaster
const lag = 0.02; // velocidad del enemigo

for(let i=0 ; i<360; i+=3){ //cada 3 grados
    search[i] = new THREE.Vector3(Math.cos(i),0,Math.sin(i))
}


const enemigo = scene.getObjectByName("enemyEstrella");

function checkForTarget(){
    search.forEach((direction)=>{
                    //inicia raycast    direccion, cerca, lejos
        rayCastEnemy.set(enemigo.position,direction,0,50);
        // el enemigo solo detecta el objeto al que le pegue, el jugador se puede esconder detras de objetos
        // checa si hay algun objeto en la escena
        const intersects = rayCastEnemy.intersectObjects(scene.children,false);
        // si el enemigo primero intersecta con un objeto con nombre se movera
        if(intersects[0].object.name){
            enemigo.position.x +=(direction.x * lag);
            enemigo.position.z +=(direction.z * lag);

        }
    });
}

//Colisiones enemigo fin*/

function collisions(){

    var Plataforma00 =  scene.getObjectByName("0");
    var Plataforma01 = scene.getObjectByName("1");
    var Plataforma02 =  scene.getObjectByName("2");
    var Plataforma03 = scene.getObjectByName("3");
    var Plataforma04 =  scene.getObjectByName("4");
    var Plataforma05 = scene.getObjectByName("5");
    var Plataforma06 = scene.getObjectByName("6");
    var playerRana =scene.getObjectByName("ranita");
    var playerPato =scene.getObjectByName("patito");
    var rayoVerde = scene.getObjectByName("rayo_verde00");
    var rayoRojo = scene.getObjectByName("rayo_rojo00");
    var moneda = scene.getObjectByName("coin00");
    

    //Bounding Box
    colisionPlataf0 = new THREE.Box3().setFromObject(Plataforma00);
    colisionPlataf1 = new THREE.Box3().setFromObject(Plataforma01);
    colisionPlataf2 = new THREE.Box3().setFromObject(Plataforma02);
    colisionPlataf3 = new THREE.Box3().setFromObject(Plataforma03);
    colisionPlataf4 = new THREE.Box3().setFromObject(Plataforma04);
    colisionPlataf5 = new THREE.Box3().setFromObject(Plataforma05);
    colisionPlataf6 = new THREE.Box3().setFromObject(Plataforma06);
    colisionRayoVerde = new THREE.Box3().setFromObject(rayoVerde);
    colisionRayoRojo = new THREE.Box3().setFromObject(rayoRojo);
    colisionMoneda = new THREE.Box3().setFromObject(moneda);
    colisionPlayer1=new THREE.Box3().setFromObject(playerRana);
    colisionPlayer2=new THREE.Box3().setFromObject(playerPato);

    var collisionP2YPL0 = colisionPlayer2.intersectsBox(colisionPlataf0);
    var collisionP2YPL1 = colisionPlayer2.intersectsBox(colisionPlataf1);
    var collisionP2YPL2 = colisionPlayer2.intersectsBox(colisionPlataf2);
    var collisionP2YPL3 = colisionPlayer2.intersectsBox(colisionPlataf3);
    var collisionP2YPL4 = colisionPlayer2.intersectsBox(colisionPlataf4);
    var collisionP2YPL5 = colisionPlayer2.intersectsBox(colisionPlataf5);
    var collisionP2YPL6 = colisionPlayer2.intersectsBox(colisionPlataf6);
    var collisionVERDE2 = colisionPlayer2.intersectsBox(colisionRayoVerde);
    var collisionROJO2 = colisionPlayer2.intersectsBox(colisionRayoRojo);
    var collisionMONEDA2 = colisionPlayer2.intersectsBox(colisionMoneda);

    var collisionP1YPL0 = colisionPlayer1.intersectsBox(colisionPlataf0);
    var collisionP1YPL1 = colisionPlayer1.intersectsBox(colisionPlataf1);
    var collisionP1YPL2 = colisionPlayer1.intersectsBox(colisionPlataf2);
    var collisionP1YPL3 = colisionPlayer1.intersectsBox(colisionPlataf3);
    var collisionP1YPL4 = colisionPlayer1.intersectsBox(colisionPlataf4);
    var collisionP1YPL5 = colisionPlayer1.intersectsBox(colisionPlataf5);
    var collisionP1YPL6 = colisionPlayer1.intersectsBox(colisionPlataf6);
    var collisionVERDE1 = colisionPlayer1.intersectsBox(colisionRayoVerde);
    var collisionROJO1 = colisionPlayer1.intersectsBox(colisionRayoRojo);
    var collisionMONEDA1 = colisionPlayer1.intersectsBox(colisionMoneda);

    if(collisionP2YPL0 || collisionP2YPL1 || collisionP2YPL2 || collisionP2YPL3 || collisionP2YPL4 || collisionP2YPL5 || collisionP2YPL6){
        console.log("intersecta");
    }else{
        playerPato.position.y -=1;
        if(playerPato.position.y == -20){
            clock.stop();
            $("#game_over").fadeIn();
            $("#input_score").val(puntaje);
        }
    }

    if(collisionP1YPL0 || collisionP1YPL1 || collisionP1YPL2 || collisionP1YPL3 || collisionP1YPL4 || collisionP1YPL5 || collisionP1YPL6){
        console.log("intersecta");
        
    }else{
        playerRana.position.y -=1;
        if(playerRana.position.y == -20){
            clock.stop();
            $("#game_over").fadeIn();
            $("#input_score").val(puntaje);
        }
    }

    if(collisionVERDE1){
        console.log("intersecta");
        var item= scene.getObjectByName("rayo_verde00");
        removePlataforma(item);
        ranitaSpeed = ranitaSpeed * 1.5;

    }

    if(collisionROJO1){
        console.log("intersecta");
        var item= scene.getObjectByName("rayo_rojo00");
        removePlataforma(item);
        ranitaSpeed = ranitaSpeed  -7;
    }

    if(collisionMONEDA1){
        console.log("intersecta");
        var item= scene.getObjectByName("coin00");
        removePlataforma(item);
        ranitaSpeed = ranitaSpeed * -1;
    }

    if(collisionVERDE2){
        console.log("intersecta");
        var item= scene.getObjectByName("rayo_verde00");
        removePlataforma(item);
        patitoSpeed = patitoSpeed * 1.5;

        // setTimeout(function(){
        //     random(patitoSpeed)
        // },2000);

    }

    if(collisionROJO2){
        console.log("intersecta");
        var item= scene.getObjectByName("rayo_rojo00");
        removePlataforma(item);
        patitoSpeed = patitoSpeed  -7;

        // setTimeout(function(){
        //     random(patitoSpeed)
        // },2000);

    }

    if(collisionMONEDA2){
        console.log("intersecta");
        var item= scene.getObjectByName("coin00");
        removePlataforma(item);
        patitoSpeed = patitoSpeed * -1;

        // setTimeout(function(){
        //     random(patitoSpeed)
        // },2000);

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
        miObjFinal.position.z = -16;
        //miObjFinal.scale.set(1.5,1.5,1.5);
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
        
        miObjFinal.position.x = -13;	
        miObjFinal.position.y = 1.5;	
        miObjFinal.position.z = -14;	
        //miObjFinal.scale.set(1.5,1.5,1.5);
        miObjFinal.name = "rayo_rojo00";
    
        scene.add(miObjFinal);
        //isWorldReady[1] = true;
    });
    
    //RAYO VERDE
    loadOBJWithMTL("../models/scenario/","rayo.obj","rayo_verde.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = 13;	
        miObjFinal.position.y = 1.5;	
        miObjFinal.position.z = -14;	
        //miObjFinal.scale.set(1.5,1.5,1.5);
        miObjFinal.name = "rayo_verde00";
    
        scene.add(miObjFinal);
    });

}


function onStartPlayer2(){
    loader.load('../models/ranita/ranita_ex_base.fbx', (model) => {
        model.scale.set(1.9,1.9,1.9);
        model.name="ranita";
        ranita.handler = model;
        ranita.mixer = new THREE.AnimationMixer(ranita.handler);
        
            loader.load('../models/ranita/ranita_ex_base@Idle.fbx',(asset)=>{
                const idleAnimation = asset.animations[0];
                ranita.action.idle = ranita.mixer.clipAction(idleAnimation);
                ranita.action.idle.play();
                loadedAssets++;
            });
            loader.load('../models/ranita/ranita_ex_base@Running.fbx',(asset)=>{
                const runAnimation = asset.animations[0];
                ranita.action.run = ranita.mixer.clipAction(runAnimation);
                //ranita.action.run.play();
                loadedAssets++;
            });
            loader.load('../models/ranita/ranita_ex_base@Jump.fbx',(asset)=>{
                const jumpAnimation = asset.animations[0];
                ranita.action.jump = ranita.mixer.clipAction(jumpAnimation);
                //ranita.action.jump.play();
                loadedAssets++;
            });
         model.position.x = 5;
         model.position.z = -11;
         model.name='ranita';
         
         //model.position.y = 0;
            loadedAssets++;
            scene.add(model);
        });
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
     model.name="patito";
     
     
        loadedAssets++;
        scene.add(model);
    });
}

function onStartEnemy(){

    loader.load('../models/estrella/estrella_ex_base.fbx', (model) => {
        model.scale.set(1,1,1);
    
    enemy.handler = model;
    enemy.mixer = new THREE.AnimationMixer(enemy.handler);
    
        loader.load('../models/estrella/estrella_base_ex@Idle.fbx',(asset)=>{
            const idleAnimation = asset.animations[0];
            enemy.action.idle = enemy.mixer.clipAction(idleAnimation);
            enemy.action.idle.play();
            loadedAssets++;
        });
        loader.load('../models/estrella/estrella_base_ex@Running.fbx',(asset)=>{
            const runAnimation = asset.animations[0];
            enemy.action.run = enemy.mixer.clipAction(runAnimation);
            //enemy.action.run.play();
            loadedAssets++;
        });
        loader.load('../models/estrella/estrella_base_ex@Attack.fbx',(asset)=>{
            const attackAnimation = asset.animations[0];
            enemy.action.attack = enemy.mixer.clipAction(attackAnimation);
            //enemy.action.attack.loop=THREE.LoopOnce;
            //enemy.action.attack.play();
            loadedAssets++;
        });

     model.position.x = 0;
     model.position.z = -15;
     model.name="enemyEstrella";
    
     
     //model.position.y = 0;sad
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
    onStartPlayer2();
    onStartPlayer();
    onStartEnemy();
    setInterval(function(){
        color(0,6)
    },10000);
    camera.position.y = 30;
    camera.rotation.x = THREE.Math.degToRad(-25);
    camera.position.z = 45;
    camera.add(listener);
}

let lastState = 'idle';
function onUpdatePlayer(dt){
    let state = 'idle';
    patito.mixer.update(dt);

    //const patitoSpeed = 15;
    if(keys['w']){
        patito.handler.position.z -= patitoSpeed * dt;
        patito.handler.rotation.y = THREE.Math.degToRad(180);
        state = 'run';
        puntaje += 1;
    }
    if(keys['s']){
        patito.handler.position.z += patitoSpeed * dt;
        patito.handler.rotation.y = 0;
        state = 'run';
        puntaje += 1;
    }
    if(keys['a']){
        patito.handler.position.x -= patitoSpeed * dt;
        patito.handler.rotation.y = THREE.Math.degToRad(-90);
        state = 'run';
        puntaje += 1;
    }
    if(keys['d']){
        patito.handler.position.x += patitoSpeed * dt;
        patito.handler.rotation.y = THREE.Math.degToRad(90);
        state = 'run';
        puntaje += 1;
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
function onUpdatePlayer2(dt){
    
    let state2 = 'idle';
    ranita.mixer.update(dt);

    //const ranitaSpeed = 15;
    if(keys['i']){
        ranita.handler.position.z -= ranitaSpeed * dt;
        ranita.handler.rotation.y = THREE.Math.degToRad(180);
        state2 = 'run';
    }
    if(keys['k']){
        ranita.handler.position.z += ranitaSpeed * dt;
        ranita.handler.rotation.y = 0;
        state2 = 'run';
    }
    if(keys['j']){
        ranita.handler.position.x -= ranitaSpeed * dt;
        ranita.handler.rotation.y = THREE.Math.degToRad(-90);
        state2 = 'run';
    }
    if(keys['l']){
        ranita.handler.position.x += ranitaSpeed * dt;
        ranita.handler.rotation.y = THREE.Math.degToRad(90);
        state2 = 'run';
    }
    
    if(keys['b']){
        state2 = 'jump';
    }


    if(lastState2 != state2){

        const lastAnimation2 = ranita.action[lastState2];
        const newAnimation2 = ranita.action[state2];

        lastAnimation2.reset();
        newAnimation2.reset();

        const crossFadeTime = 0.3; //desvanecido entre animaciones
        lastAnimation2.crossFadeTo(newAnimation2, crossFadeTime).play(); // pasamos de la animacion anterior a la nueva
        lastState2 = state2; //el estado actual pase a ser el anterior 
    }

    // if (reproducirParticulas == false) {
    //     var rana =  scene.getObjectByName("ranita");
    //     var pato = scene.getObjectByName("patito");
        

    //     //var bueno = scene.getObjectByName("rayo_rojo00");
	// 	//var malo = scene.getObjectByName("rayo_verde00");
	// 	var coin = scene.getObjectByName("coin00");
       

    //     //Bounding Box
    //     var firstBB = new THREE.Box3().setFromObject(rana);

    //     var secondBB = new THREE.Box3().setFromObject(coin);

    //     var collision = firstBB.intersectsBox(secondBB);
       
    //     if (collision) {
    //         console.log("colisionan");
            
    //         reproducirParticulas = true;
            
    //         spawnParticulas(secondBB.position);
    //         scene.remove(secondBB);
    //     }
        
    
    // }
    // if (reproducirParticulas) {
    //     contadorAnim += dt;
    //    // particleSystem.rotation.y +=0.01;
    //     if(contadorAnim>=duracionParticula){
    //         contadorAnim=0;
    //         reproducirParticulas=false;
    //         scene.remove(particleSystem);
    //     }
				
    // }
   
    
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

// function spawnParticulas(target) {

//     // create the particle variables
    
//     particles = new THREE.Geometry();
//     //material especial para las particulas
//     var pMaterial = new THREE.PointsMaterial({
//         color: 0xFFFFFF,
//         size: 1,
//         map: THREE.ImageUtils.loadTexture(
//            "../particulas/particula.png"
//          ),
//          blending: THREE.AdditiveBlending,
//          transparent: true
//     });



//     // now create the individual particles
//     for (var p = 0; p < particleCount; p++) {

//       // create a particle with random
//       // position values, -250 -> 250
//       var pX = Math.random() * 500 - 250,
//       pY = Math.random() * 500 - 250,
//       pZ = Math.random() * 500 - 250
//           particle = new THREE.Vertex(
//             new THREE.Vector3(pX, pY, pZ)
//           );
    
//          // create a velocity vector
//       particle.velocity = new THREE.Vector3(0, -Math.random(), 0);            

//       particles.vertices.push(particle);// se agrega los nuevos vertices a la geometria vacia creada
//     }

//     // create the particle system
//     particleSystem = new THREE.Points(particles,pMaterial);

//     particleSystem.sortParticles = true;

//     // add it to the scene
//     scene.add(particleSystem);

// }

// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }
 
function onUpdateEnemy(dt){
    enemy.mixer.update(dt);
}

function onUpdate(dt){
    onUpdatePlayer(dt);
    onUpdatePlayer2(dt);
    onUpdateEnemy(dt);
    
}
// function onUpdateTime(){
//     var interval = 10000; // ms
// var expected = Date.now() + interval;
// setTimeout(step, interval);
// function step() {
//     var dtt = Date.now() - expected; // the drift (positive for overshooting)
//     if (dtt > interval) {
//         // something really bad happened. Maybe the browser (tab) was inactive?tion
//         // possibly special handling to avoid futile "catch up" run
//     }
//     random(0,6); // do what is to be done

//     expected += interval;
//     setTimeout(step, Math.max(0, interval - dtt)); // take into account drift
// }

// }

// function contador(){
//     var segundos = Math.floor(cont/100);
// 	var contador = document.getElementById("Tiempo");
// 	contador.value = segundos;
// 	cont++;
    
// }

// var contadorAnim = 0;
// 	var duracionParticula = 2;

function render(){
    requestAnimationFrame(render);
    // contador();
     collisions();
    const dt = clock.getDelta();
    if(loadedAssets >= totalAssets){
        onUpdate(dt);
        //checkForTarget();
        renderer.render(scene,camera);
     
    }
  
    //onUpdateTime();
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
