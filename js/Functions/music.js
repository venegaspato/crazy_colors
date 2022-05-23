var listener;
var listener2;
var volumen;
var volumen2;
var audio_fondo;
var audio_coin;
var audio_loader;
var audio_loader2;
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1,1000);


function cargar_audio(camera){

	listener = new THREE.AudioListener();
	volumen = 100;
	audio_fondo = new THREE.Audio(listener);
	audio_loader= new THREE.AudioLoader();
	audio_loader.load('../music/principal.mp3', function(buffer){
		audio_fondo.setBuffer(buffer);
		audio_fondo.setLoop(true);
		audio_fondo.setVolume(1);
		audio_fondo.play();

		camera.add(listener);
	});

}


function audio_moneda(camera){

	listener2 = new THREE.AudioListener();
	volumen = 100;
	audio_coin = new THREE.Audio(listener);
	audio_loader2= new THREE.AudioLoader();
	audio_loader2.load('../music/level.mp3', function(buffer){
		audio_coin.setBuffer(buffer);
		audio_coin.setVolume(1);
		audio_coin.play();

		camera.add(listener2);
	});

}

function actualizar_volumen(volumen){
	volumen /= 100;
	audio_fondo.setVolume(volumen);
	
}var listener;
var listener2;
var volumen;
var volumen2;
var audio_fondo;
var audio_coin;
var audio_loader;
var audio_loader2;

function cargar_audio(camera){

	listener = new THREE.AudioListener();
	volumen = 100;
	audio_fondo = new THREE.Audio(listener);
	audio_loader= new THREE.AudioLoader();
	audio_loader.load('../music/principal.mp3', function(buffer){
		audio_fondo.setBuffer(buffer);
		audio_fondo.setLoop(true);
		audio_fondo.setVolume(1);
		audio_fondo.play();

		camera.add(listener);
	});

}

function audio_moneda(camera){

	listener2 = new THREE.AudioListener();
	volumen = 100;
	audio_coin = new THREE.Audio(listener);
	audio_loader2= new THREE.AudioLoader();
	audio_loader2.load('music/obtener.mp3', function(buffer){
		audio_coin.setBuffer(buffer);
		audio_coin.setVolume(1);
		audio_coin.play();

		camera.add(listener2);
	});

}

function actualizar_volumen(volumen){
	volumen /= 100;
	audio_fondo.setVolume(volumen);
	
}

cargar_audio();