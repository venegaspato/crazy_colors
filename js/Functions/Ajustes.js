import LocalStorage  from '../Functions/localStorage.js';

var music = new Audio();
music.src="../music/principal.mp3 ";
music.loop=true;

var efect = new Audio();
efect.src="../music/button .mp3 ";

var volum,varvol;

var audio_btn = $("#btnAudio")[0];
var volumeSlider=document.getElementById("volumSlider");
volumeSlider.addEventListener('mousemove',setvolume);

var musicSlider=document.getElementById("musicSlider");
musicSlider.addEventListener('mousemove',setmusic);

function setvolume(){

    efect.volume=volumeSlider.value/100
    volum=volumeSlider.value/100
    
localStorage.setItem('efectos',volumeSlider.value/100 );
}
function setmusic(){
music.volume=musicSlider.value/100
varvol=musicSlider.value/100
localStorage.setItem('volumen',musicSlider.value/100 );
}
$(document).ready(function(){
    
    let configuration = LocalStorage.read();
    if(configuration === null || (configuration !== null && configuration.Musica === 'true')){
        
        music.play();
        
        musicSlider.value=parseFloat(localStorage.getItem("volumen"))*100;
        music.volume = parseFloat(localStorage.getItem("volumen"));
        $("#music_checkbox").attr("checked", true);
    }
    $("#music_checkbox").on("change", function () {
        if(this.checked){
                music.play();
                musicSlider.value=parseFloat(localStorage.getItem("volumen"))*100;
                music.volume=parseFloat(localStorage.getItem("volumen"));
                let savedConfiguration = LocalStorage.read();

                if(savedConfiguration !== null) {
                    savedConfiguration.Musica = true;
                } else {
                    savedConfiguration = {}
                    savedConfiguration.Musica = true;
                }
                
                LocalStorage.save(savedConfiguration);
        }else{
            musicSlider.value=0;

                music.pause();

                let savedConfiguration = LocalStorage.read();

                if(savedConfiguration !== null) {
                    savedConfiguration.Musica = false;
                } else {
                    savedConfiguration = {};
                    savedConfiguration.Musica = false;
                }

                LocalStorage.save(savedConfiguration);
        }
   });

$(".btn-design_audio").hover(function(){
    efect.play();
    efect.volume = parseFloat(localStorage.getItem("efectos"));
    efect.playbackRate=8;
});



});