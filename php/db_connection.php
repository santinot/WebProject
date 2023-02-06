<?php

//Effettuare la connessione al database
function OpenConnection()
{
    $servername = "localhost";
    $username   = "root";
    $password   = "";
    $dbname     = "Locker";
    
    // Creazione connessione
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Controllo connessione
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    session_start();
    return $conn;
}

//Chiudere la connessione al database
function CloseConnection()
{
    $servername = "localhost";
    $username   = "root";
    $password   = "";
    $dbname     = "Locker";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->close();
}

?> 