<?php
include 'connection.php';
session_start();
// Conexión a la BD
$db = new Database();
$connection = $db->ConnectDB();

$username = $_POST['username'];
$score = $_POST['score'];
//$_SESSION['username'] = $username;

// Procedure del Login
$sql = "INSERT INTO PUNTAJES(P_JUGADOR, P_PUNTAJE) VALUES('$username', '$score')";


// Ejecuta mi query o muere D: 
$result = mysqli_query($connection, $sql); 

if($result){
    echo'<script type="text/javascript">
    alert("Se ha guardado tu puntuación.");
    </script>';
}else{
    echo'<script type="text/javascript">
    alert("¡Bienvenido de vuelta!");
    </script>';
}

echo'<script type="text/javascript">

window.location.href="../screen/principal.html";
</script>';
//

?>