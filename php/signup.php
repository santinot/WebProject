<?php
/*
require_once("db_connection.php");
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
*/
function Registration($conn,$_POST){
    if(isset($_POST)){
        $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($_POST));
        $values = array_map(function ($value) use ($conn) {
          if ($value===null) return null;
          return mysqli_real_escape_string($conn,(string)$value);
        },array_values($_POST));
        $set = '';
        for ($i=0;$i<count($columns);$i++) {
          $set.=($i>0?',':'').'`'.$columns[$i].'`=';
          $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
        }
        var_dump($set);
      }
    




}







?>