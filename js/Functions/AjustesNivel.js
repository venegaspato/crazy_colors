var Nivel1=false;
$(document).ready(function(){

        $("#n1").on("change", function (){
            if(this.checked){
                $("#yes").on("change", function (){
                    if(this.checked){
                        $("#group_3").addClass("solitarioLVL1");
                        $("#group_3").removeClass("solitarioLVL1_inactivo");
                        $("#group_1").addClass("multiJugadorLVL1_inactivo");
                        $("#group_4").addClass("solitarioLVL2_inactivo");
                        $("#group_2").addClass("multiJugadorLVL2_inactivo");
                        
                        $("#group_2").removeClass("multiJugadorLVL2");
        
                        
                        $("#group_1").removeClass("multiJugadorLVL1");
        
                    }else{
                        $("#group_3").removeClass("solitarioLVL1");
                        $("#group_3").addClass("solitarioLVL1_inactivo");
        
                    }
        
                });

                $("#no").on("change", function (){
                    if(this.checked){
                        $("#group_1").addClass("multiJugadorLVL1");
                        $("#group_1").removeClass("multiJugadorLVL1_inactivo");
                        $("#group_4").addClass("solitarioLVL2_inactivo");
                        $("#group_2").addClass("multiJugadorLVL2_inactivo");
        
                        $("#group_3").addClass("solitarioLVL1_inactivo");
                        
                        $("#group_3").removeClass("solitarioLVL1");
                        $("#group_4").removeClass("solitarioLVL2");
                        $("#group_2").removeClass("multiJugadorLVL2");
        
                    }else{
                        $("#group_1").removeClass("multiJugadorLVL1");
                        $("#group_1").addClass("multiJugadorLVL1_inactivo");
        
                    }
        
                });

            }else{
                Nivel1=false;
            }
        });
        $("#n2").on("change", function (){
            if(this.checked){
                $("#yes").on("change", function (){
                    if(this.checked){
                        $("#group_4").addClass("solitarioLVL2");
                        $("#group_4").removeClass("solitarioLVL2_inactivo");
                        $("#group_2").addClass("multiJugadorLVL2_inactivo");
                        
                        $("#group_3").addClass("solitarioLVL1_inactivo");
                        $("#group_1").addClass("multiJugadorLVL1_inactivo");
                        
                        $("#group_3").removeClass("solitarioLVL1");
                        $("#group_1").removeClass("multiJugadorLVL1");
        
                        
                        $("#group_2").removeClass("multiJugadorLVL2");
        
                    }else{
                        $("#group_4").removeClass("solitarioLVL2");
                        $("#group_4").addClass("solitarioLVL2_inactivo");
        
                    }
        
                });

                $("#no").on("change", function (){
                    if(this.checked){
                        $("#group_2").addClass("multiJugadorLVL2");
                        $("#group_2").removeClass("multiJugadorLVL2_inactivo");
                        $("#group_4").addClass("solitarioLVL2_inactivo");
                        $("#group_3").addClass("solitarioLVL1_inactivo");
                        $("#group_1").addClass("multiJugadorLVL1_inactivo");
                        $("#group_1").removeClass("multiJugadorLVL1");
                        $("#group_3").removeClass("solitarioLVL1");
                        
                        $("#group_4").removeClass("solitarioLVL2");
        
                    }else{
                        $("#group_2").removeClass("multiJugadorLVL2");
                        $("#group_2").addClass("multiJugadorLVL2_inactivo");
        
                    }
        
                });


            }else{
                Nivel1=true;
            }
        });
    
       
        console.log(Nivel1);
});