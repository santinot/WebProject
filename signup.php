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
        $this->token = rand(0,100000);
    }
}


$user = new User($_POST['fname'],$_POST['lname'],$_POST['phone'],$_POST['email'],$_POST['password1']);
$sql = "INSERT INTO Users (email,password) VALUES ('$user->email','$user->password');"; 
$sql .= "INSERT INTO Info (fname,lname,phone,token) VALUES ('$user->fname','$user->lname','$user->phone','$user->token')";

$conn->multi_query($sql);

?>