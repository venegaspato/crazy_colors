<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Videojuego</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../style.css'>
    
</head>

<body>
    <div class="container">
      

        <div class="object score-box" data-value="1">
            <h3 class="object" data-value="-2">puntuaciones</h3>

                <?php  
                include "../php/connection.php";

                $db = new Database();
                 $connection = $db->ConnectDB();
                 $sql = "SELECT * FROM PUNTAJES ORDER BY P_PUNTAJE DESC;";
                 $result = mysqli_query($connection, $sql);

                 while($row = mysqli_fetch_assoc($result))  {
                
                ?>
                <div>
                    <input type="text" class="score-input name" value="<?php echo $row["P_JUGADOR"] ?>" readonly>
                    <input type="text" class="score-input number" value="<?php echo $row["P_PUNTAJE"] ?>" readonly>
                </div>
               
                <?php 
                 }
                 mysqli_close($connection);
                ?>
                <!--
                <div>
                    <input type="text" class="score-input name" value="Jugador2" readonly>
                    <input type="text" class="score-input number" value="00000" readonly>
                </div>

                <div>
                    <input type="text" class="score-input name" value="Jugador3" readonly>
                    <input type="text" class="score-input number" value="00000" readonly>
                </div>
               
                <div>
                    <input type="text" class="score-input name" value="Jugador4" readonly>
                    <input type="text" class="score-input number" value="00000" readonly>
                </div>
                <div>
                    <input type="text" class="score-input name" value="Jugador5" readonly>
                    <input type="text" class="score-input number" value="00000" readonly>
                </div> -->

                <div class="btn-contenedor">
                    <input  class="btn-design2 btn-design_audio uno"type="image" src="../img/back_btn.png" onclick="location.href='./principal.html'">
               </div>
                <!--<button class="btn uno back" onclick="location.href='./principal.html'" data-value="-6"><span>Regresar el menu</span></button> -->
            
        </div>

        <img src="../img/1.1.png" class="object" data-value="-50" alt="">
        <img src="../img/2.1.png" class="object" data-value="46" alt="">
        <img src="../img/3.1.png" class="object" data-value="55"  alt="">


    </div>

    <script type="text/javascript">
        document.addEventListener("mousemove", parallax);
        function parallax(e){
            document.querySelectorAll(".object").forEach(function(move){
                var moving_valor= move.getAttribute("data-value");
                var x=(e.clientX * moving_valor) / 150;
                var y=(e.clientY * moving_valor) / 250;
                
                move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
            });
        }

    </script>
    
   
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src = "https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.1/howler.js"></script>
    <script  type="module"  src="../js/Functions/musicPrincipal.js"></script>
    
</body>

</html>