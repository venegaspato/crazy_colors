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
renderer.setClearColor(new THREE.Color(1,0.3,0.2));
renderer.setSize(window.innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

let loadedAssets = 0;
const totalAssets = 9;

const keys = {};

var rayCaster = new THREE.Raycaster();

var objetosConColision = [];

var patitoSpeed = 15;

// VARIABLE PARA CONTAR LOS PUNTOS
var puntaje = 20;

const patito = {
    victory: false,
    death: false,
    mixer:null, //permite controlar las animaciones
    handler: null, //objeto literal
    action: {
        idle: null,
        run: null,
        jump: null,
		push: null
    }
}

const ranita = {
    victory: false,
    death: false,
    mixer:null, //permite controlar las animaciones
    handler: null, //objeto literal
    action: {
        idle: null,
        run: null,
        jump: null,
		push: null
    }
}

const enemy = {
    mixer: null,
    handler: null,
    action: {
        idle: null,
        run: null,
        attack: null
    }
}
//COLLISIONS
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

        var Plataforma00 = scene.getObjectByName("0");
        var Plataforma01 = scene.getObjectByName("1");
        var Plataforma02 = scene.getObjectByName("2");
        var Plataforma03 = scene.getObjectByName("3");
        var Plataforma04 = scene.getObjectByName("4");
        var Plataforma05 = scene.getObjectByName("5");
        var Plataforma06 = scene.getObjectByName("6");
        var rayoVerde = scene.getObjectByName("rayo_verde00");
        var rayoRojo = scene.getObjectByName("rayo_rojo00");
        var moneda = scene.getObjectByName("coin00");
        var playerPato = scene.getObjectByName("patito_model");
    
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
        colisionPlayer2=new THREE.Box3().setFromObject(playerPato);
    
        var collisionP2YPL0 = colisionPlayer2.intersectsBox(colisionPlataf0);
        var collisionP2YPL1 = colisionPlayer2.intersectsBox(colisionPlataf1);
        var collisionP2YPL2 = colisionPlayer2.intersectsBox(colisionPlataf2);
        var collisionP2YPL3 = colisionPlayer2.intersectsBox(colisionPlataf3);
        var collisionP2YPL4 = colisionPlayer2.intersectsBox(colisionPlataf4);
        var collisionP2YPL5 = colisionPlayer2.intersectsBox(colisionPlataf5);
        var collisionP2YPL6 = colisionPlayer2.intersectsBox(colisionPlataf6);
        var collisionVERDE = colisionPlayer2.intersectsBox(colisionRayoVerde);
        var collisionROJO = colisionPlayer2.intersectsBox(colisionRayoRojo);
        var collisionMONEDA = colisionPlayer2.intersectsBox(colisionMoneda);
    
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

        if(collisionVERDE){
            console.log("intersecta");
            var item= scene.getObjectByName("rayo_verde00");
            removePlataforma(item);
            patitoSpeed = patitoSpeed * 1.5;

            // setTimeout(function(){
            //     random(patitoSpeed)
            // },2000);

        }

        if(collisionROJO){
            console.log("intersecta");
            var item= scene.getObjectByName("rayo_rojo00");
            removePlataforma(item);
            patitoSpeed = patitoSpeed  -7;

            // setTimeout(function(){
            //     random(patitoSpeed)
            // },2000);

        }

        if(collisionMONEDA){
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
        miObjFinal.position.y = -150;
        miObjFinal.position.z = -150;
        miObjFinal.rotation.y =THREE.Math.degToRad(180);
        miObjFinal.scale.set(0.1,0.1,0.1);
        


        scene.add(miObjFinal);
        //isWorldReady[0] = true;
    });

    loadOBJWithMTL("../models/scenario/","coin.obj","coin.mtl", (miObjFinal)=> {

        miObjFinal.position.x = 0;
        miObjFinal.position.y = 1.5;
        miObjFinal.position.z = 30;
        miObjFinal.scale.set(1.5,1.5,1.5);
        miObjFinal.name = "coin00";


        scene.add(miObjFinal);
        //isWorldReady[0] = true;
    });

    //PLATAFORMA VERDE
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_verde.mtl", (miObjFinal)=> {
        	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        
        posicionInicialX0=miObjFinal.position.x = -32;	
        posicionInicialZ0=miObjFinal.position.z = -30;
        miObjFinal.position.x = -32;	
        miObjFinal.position.z = -30;
        miObjFinal.rotation.y = THREE.Math.degToRad(30)
        miObjFinal.name = "0";

        // var verde_2 = miObjFinal.clone();
        // posicionInicialX7=verde_2.position.x = 12;	
        // posicionInicialZ7=verde_2.position.z = -30;
        // verde_2.position.x = 12; 
        // verde_2.position.z = -30; 
        // verde_2.name = "7";

        // var verde_3 = miObjFinal.clone();
        // verde_3.position.z = -30; 
    
         scene.add(miObjFinal);
        // scene.add(verde_2);
        // scene.add(verde_3);
    });

   
    //PLATAFORMA MORADA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_morada.mtl", (miObjFinal)=> {
        
        posicionInicialX1=miObjFinal.position.x = -20;
        posicionInicialZ1=miObjFinal.position.z = -10;
        miObjFinal.position.x = -20;	
        miObjFinal.position.z = -10 ;	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.rotation.y = THREE.Math.degToRad(30)

        // var morada_2 = miObjFinal.clone();
        // morada_2.position.x = -76;
        // morada_2.position.z = -30;

        miObjFinal.name = "1";	
    
        scene.add(miObjFinal);
        //scene.add(morada_2);
    });

    //PLATAFORMA ROJA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_roja.mtl", (miObjFinal)=> {
         
        posicionInicialX2=miObjFinal.position.x = -43;	
        posicionInicialZ2=miObjFinal.position.z = -10;
        miObjFinal.position.x = -43;	
        miObjFinal.position.z = -10 ;	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.rotation.y = THREE.Math.degToRad(30)
        miObjFinal.name = "2";

        scene.add(miObjFinal);

        objetosConColision.push(miObjFinal);
    });

    //PLATAFORMA NARANJA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_naranja.mtl", (miObjFinal)=> {
        
        posicionInicialX3=miObjFinal.position.x = -8;	
        posicionInicialZ3=miObjFinal.position.z = -30;
        miObjFinal.position.x = -8;	
        miObjFinal.position.z = -30;	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.rotation.y = THREE.Math.degToRad(30)
        miObjFinal.name = "3";

        // var naranja_2 = miObjFinal.clone();
        // naranja_2.position.x = -65;

        // var naranja_3 = miObjFinal.clone();
        // naranja_3.position.x = -43;
        // naranja_3.position.z = -10;

        scene.add(miObjFinal);
        //scene.add(naranja_2);
        //scene.add(naranja_3);
    });

   

    //PLATAFORMA ROSA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_rosa.mtl", (miObjFinal)=> {
        
        posicionInicialX4=miObjFinal.position.x = -56;	
        posicionInicialZ4=miObjFinal.position.z = -30;	
        miObjFinal.position.x = -56;	
        miObjFinal.position.z = -30;	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.rotation.y = THREE.Math.degToRad(30)
        miObjFinal.name = "4";

        // var rosa_2 = miObjFinal.clone();
        // rosa_2.position.x = -10; 
        // rosa_2.position.z = -70;

        // var rosa_3 = miObjFinal.clone();
        // rosa_3.position.x = -21; 
        // rosa_3.position.z = -10;
    
        scene.add(miObjFinal);
        //scene.add(rosa_2);
        //scene.add(rosa_3);
    });

    //PLATAFORMA AMARILLA
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_amarilla.mtl", (miObjFinal)=> {
        
        posicionInicialX5=miObjFinal.position.x = -17;	
        posicionInicialZ5=miObjFinal.position.z = -50;
        miObjFinal.position.x = -17;	
        miObjFinal.position.z = -50;	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.rotation.y = THREE.Math.degToRad(30)
        miObjFinal.name = "5";

        // var amarilla_2 = miObjFinal.clone();
        // amarilla_2.position.x = -10; 
        // amarilla_2.position.z = -30; 

        // var amarilla_3 = miObjFinal.clone();
        // amarilla_3.position.x = -65; 
        // amarilla_3.position.z = -10; 
    
        scene.add(miObjFinal);
        // scene.add(amarilla_2);
        // scene.add(amarilla_3);
    });

    
    
    //PLATAFORMA AZUL
    loadOBJWithMTL("../models/scenario/","plataforma.obj","plataforma_azul.mtl", (miObjFinal)=> {
        
        posicionInicialX6=miObjFinal.position.x = -43;	
        posicionInicialZ6=miObjFinal.position.z = -50;
        miObjFinal.position.x = -43;	
        miObjFinal.position.z = -50;	
        miObjFinal.scale.x=10;
        miObjFinal.scale.y=10;
        miObjFinal.scale.z=10;
        miObjFinal.rotation.y = THREE.Math.degToRad(30)
        miObjFinal.name = "6";

        // var azul_2 = miObjFinal.clone();
        // azul_2.position.x = -54; 
        // azul_2.position.z = -30;
        
        // var azul_3 = miObjFinal.clone();
        // azul_3.position.x = 1; 
        // azul_3.position.z = -10;
    
        scene.add(miObjFinal);
        // scene.add(azul_2);
        // scene.add(azul_3);
    });

     //RAYO ROJO
    loadOBJWithMTL("../models/scenario/","rayo.obj","rayo_rojo.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = -15;	
        miObjFinal.position.y = 1.5;	
        miObjFinal.position.z = 20;	
        miObjFinal.scale.set(1.5,1.5,1.5);
        miObjFinal.name = "rayo_rojo00";
    
        scene.add(miObjFinal);
        //isWorldReady[1] = true;
    });
    
    //RAYO VERDE
    loadOBJWithMTL("../models/scenario/","rayo.obj","rayo_verde.mtl", (miObjFinal)=> {
        
        miObjFinal.position.x = 15;	
        miObjFinal.position.y = 1.5;	
        miObjFinal.position.z = 20;	
        miObjFinal.scale.set(1.5,1.5,1.5);
        miObjFinal.name = "rayo_verde00";
    
        scene.add(miObjFinal);
    });

}


function onStartEnemy(){

    loader.load('../models/estrella/estrella_ex_base.fbx', (model) => {
        model.scale.set(1.95,1.95,1.95);
    
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
        loader.load('../models/estrella/estrella_ex_base@Attack.fbx',(asset)=>{
            const attackAnimation = asset.animations[0];
            enemy.action.attack = enemy.mixer.clipAction(attackAnimation);
            //enemy.action.attack.loop=THREE.LoopOnce;
            //enemy.action.attack.play();
            loadedAssets++;
        });
     model.position.x = 2;
     model.position.z = 25;

     model.name = "enemy_model";
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
     model.position.x = -9;
     model.position.z = 7;

     model.name = "patito_model";
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
    onStartEnemy();
    onStartPlayer();
setInterval(function(){
        color(0,6)
    },10000);
     camera.position.y = 60;
     camera.rotation.x = THREE.Math.degToRad(-40);
     camera.position.z = 95;
    // cargar_audio(camera);
    //  patito.rayos = [

    //  ];
}


let lastState = 'idle';
function onUpdatePlayer(dt){
    let state = 'idle';
    patito.mixer.update(dt);

//    patitoSpeed = 15;
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
        puntaje += 1;
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

 
let lastState3 = 'idle';
function onUpdateEnemy(dt){
    
    let state3 = 'idle';
    enemy.mixer.update(dt);

    const enemySpeed = 15;
    if(keys['8']){
        enemy.handler.position.z -= enemySpeed * dt;
        enemy.handler.rotation.y = THREE.Math.degToRad(180);
        state3 = 'run';
    }
    if(keys['5']){
        enemy.handler.position.z += enemySpeed * dt;
        enemy.handler.rotation.y = 0;
        state3 = 'run';
    }
    if(keys['4']){
        enemy.handler.position.x -= enemySpeed * dt;
        enemy.handler.rotation.y = THREE.Math.degToRad(-90);
        state3 = 'run';
    }
    if(keys['6']){
        enemy.handler.position.x += enemySpeed * dt;
        enemy.handler.rotation.y = THREE.Math.degToRad(90);
        state3 = 'run';
    }
    
    if(keys['1']){
        state3 = 'attack';
    }

    if(lastState3 != state3){

        const lastAnimation3 = enemy.action[lastState3];
        const newAnimation3 = enemy.action[state3];

        lastAnimation3.reset();
        newAnimation3.reset();

        const crossFadeTime = 0.3; //desvanecido entre animaciones
        lastAnimation3.crossFadeTo(newAnimation3, crossFadeTime).play(); // pasamos de la animacion anterior a la nueva
        lastState3 = state3; //el estado actual pase a ser el anterior 
    }
   
}

function onUpdate(dt){
    onUpdatePlayer(dt);
    onUpdateEnemy(dt);
}

function render(){
    requestAnimationFrame(render);

    const dt = clock.getDelta();
    collisions()
    if(loadedAssets >= totalAssets){
        onUpdate(dt);

        var pato = scene.getObjectByName("patito_model");
        pato.rayos = [
            new THREE.Vector3(1,0,0),
            new THREE.Vector3(-1,0,0),
            new THREE.Vector3(0,0,1),
            new THREE.Vector3(0,0,-1)
        ];

        for(var i = 0; i < pato.rayos.lenght; i++ ){
            var rayo = pato.rayos[i];
            rayCaster.set(patito.position, rayo);

            var collision = rayCaster.intersectObjects(objetosConColision, true);

            if(collision.lenght > 0 && collision[0].distance < 1){
                console.log("Si hay colision");
            }
        }

        renderer.render(scene,camera);
    }
}

function color(min, max){

    var rand= Math.floor((Math.random() * (max - min + 1)) + min);
    if(rand==5){
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

    }else if (rand==6 ){ 
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
    }else if(rand==1){
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
    }else if(rand==2){
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
    }else if(rand==4){
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
    }else if(rand==0){
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
    for (var i=0 ; i<18; i++ ){
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
    for (var i=0 ; i<18; i++ ){
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
