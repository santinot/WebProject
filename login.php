<?php
include('db_connection.php');
$conn = OpenConnection();

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "INSERT INTO Users(ID_User,email,password) VALUES (1,'$email','$password')";
if($conn->query($sql)){
    echo "New record is inserted sucessfully";
} else {
    echo "Error: " . $sql . " " . $conn->error;
}



?>