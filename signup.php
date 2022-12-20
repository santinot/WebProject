<?php
include("db_connection.php");
$conn = OpenConnection();

class User {
    public $fname;
    public $lname;
    public $phone;
    public $email;
    public $password;
    public $token;

    function __construct($fname,$lname,$phone,$email,$password){
        $this->fname = $fname;
        $this->lname = $lname;
        $this->phone = $phone;
        $this->email = $email;
        $this->password = $password;
    }
}


$user = new User($_POST['fname'],$_POST['lname'],$_POST['phone'],$_POST['email'],$_POST['password1']);
$user->password = password_hash($user->password, PASSWORD_DEFAULT);
$sql = "INSERT INTO Users (email,password) VALUES ('$user->email','$user->password');"; 
$sql .= "INSERT INTO Info (fname,lname,phone) VALUES ('$user->fname','$user->lname','$user->phone')";

$conn->multi_query($sql);

?>