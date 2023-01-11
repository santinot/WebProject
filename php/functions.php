<?php

session_start();

function InsertData($conn,$table1,$table2,$set1,$set2){
  $sql = "INSERT INTO `$table1` SET $set2;";
  $sql.= "INSERT INTO `$table2` SET $set1, `ID_User` = LAST_INSERT_ID();";
  $sql.= "INSERT INTO `Folders` SET `ID_User` = LAST_INSERT_ID(), `name` = 'Default';";
  if($conn->multi_query($sql)){
    echo "Registration Successful";
  }
  else{
    echo "Registration Failed";
  }
}

function CheckData($conn,$table1,$set,$pwd){
  $sql = "SELECT * FROM `$table1` WHERE $set;";
  
  if ($result = $conn->query($sql)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $_SESSION['ID_User'] = $row['ID'];
    if (password_verify($pwd, $row['password']))
      echo "Login Successful";
    else
      echo "Login Failed";
    } else {
      echo "Query Failed";
    }
}

function CreateItem($conn,$table1,$set){
  $sql = "INSERT INTO `$table1` SET $set;";
  var_dump($sql);
  if($conn->query($sql))
    echo "Item created";
  else
    echo "Item Creation Failed";
}

/*
function ShowItem($conn,$set){
  $sql = "SELECT DISTINCT * FROM `ItemCard` JOIN `ItemNote` JOIN `ItemLogin` ON ItemCard.ID_Folder = $_SESSION[ID_User];";
  if ($result = $conn->query($sql)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    return $row;
  } else {
    echo "Query Failed";
  }
}
*/

function ShowFolder($conn,$set){
  $sql = "SELECT `ID`,`name` FROM `Folders` WHERE $set;";
  if ($result = $conn->query($sql)) {
    $options = [];
    while($row = $result->fetch_array(MYSQLI_ASSOC))
      array_push($options,$row);
    echo json_encode($options);
  } else
    echo "Query Failed";
}

function ShowItemsLogin($conn,$set){
  $sql = "SELECT DISTINCT `uri`,`username`,`password` FROM `ItemLogin` JOIN `Folders` ON $set;";
  if ($result = $conn->query($sql)) {
    $options = [];
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
      if ($row['password'] && $row['username'])
        $row['password'] = openssl_decrypt($row['password'],"aes-128-cbc",$row['username']);
      array_push($options, $row);
    }
    echo json_encode($options);
  } else
    echo "Query Failed";
}



?>