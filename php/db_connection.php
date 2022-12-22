<?php
function OpenConnection()
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Locker";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function CloseConnection()
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Locker";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->close();
}


?>