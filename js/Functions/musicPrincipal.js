import LocalStorage  from '../Functions/localStorage.js';

var music = new Audio();
music.src="../music/principal.mp3 ";
music.loop=true;

var efect = new Audio();
efect.src="../music/button .mp3 ";


var volum;

var audio_btn = $("#btnAudio")[0];


$(document).ready(function(){
    
    let configuration = LocalStorage.read();
    if(configuration === null || (configuration !== null && configuration.Musica === 'true')){
        music.play();
        music.volume =parseFloat(localStorage.getItem("volumen"));
        
    }
    

    $(".btn-design_audio").hover(function(){
        efect.play();
        efect.volume = parseFloat(localStorage.getItem("efectos"));
        efect.playbackRate=8;
    });



});