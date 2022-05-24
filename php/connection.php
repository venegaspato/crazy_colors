<?php
// My database class 
class Database{

    // my database attributes
    private $server;
    private $user;
    private $password;
    private $database;
    private $port;
    public $connection;

    // Constructor
    public function __construct(){
        $this->server = "localhost";
        $this->user = "root";
        $this->password = "";
        $this->database = "CRAZYCOLORS_DB";
        $this->port = "3306";
    }

    // Connect to database class 
    public function ConnectDB(){
        $connection = new mysqli($this->server, $this->user, $this->password, $this->database, $this->port);
        if($connection->connect_errno){
            echo "Falló la conexión con MySQL: (" . $connection->connect_errno . ") " . $connection->connect_error;
            exit();
        }else{
            $connection->query("SET NAMES 'utf8'");
        }

        return $connection;
    }

}
?>