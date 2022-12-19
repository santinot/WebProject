<?php
include('db_connection.php');
$conn = OpenConnection();

class User {
    private $fname;
    private $lname;
    private $phone;
    private $email;
    private $password;
    private $token;

    function __construct($fname,$lname,$phone,$email,$password){
        $this->fname = $fname;
        $this->lname = $lname;
        $this->phone = $phone;
        $this->email = $email;
        $this->password = $password;
        $this->token = 123;
    }
}


#$user = new User($_POST['fname'],$_POST['lname'],$_POST['phone'],$_POST['email'],$_POST['password1']);
$sql1 = "INSERT INTO Info (fname,lname,phone,token) VALUES ('Santino','Moncata','1111','123')";
$conn->query($sql1);

/*
$sql2 = "INSERT INTO User (email,password) VALUES ('$user->email','$user->password')";


if($conn->query($sql1)){
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
if($conn->query($sql2)){
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
*/
?>