<?php
require_once('db_connection.php');
$conn = OpenConnection();

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT email, password FROM Users WHERE email = '$email'";

if ($result = $conn->query($sql)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    if (password_verify($password, $row['password'])) {
        echo "Login Successful";
    } else {
        echo "Login Failed";
    }
} else {
    echo "Query Failed";
}
?>