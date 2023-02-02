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
  $sql = "INSERT INTO `$table1` SET $set";
  if ($table1 === 'Folders') 
    $sql .= ",`ID_User` = " . $_SESSION['ID_User'] . ";";
  var_dump($sql);
  if($conn->query($sql))
    echo "Item Created";
  else
    echo "Item Creation Failed";
}


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

function ShowItems($conn,$set, $table1){
  switch ($table1){
    case 'ItemLogin':
      $sql = "SELECT DISTINCT `Folders`.`name`,`uri`,`username`,`password` FROM `ItemLogin` JOIN `Folders` ON $set;";
      break;
    case 'ItemNote':
      $sql = "SELECT DISTINCT `Folders`.`name`,`ItemNote`.`name` AS `title`,`text` FROM `ItemNote` JOIN `Folders` ON $set;";
      break;
    case 'ItemCard':
      $sql = "SELECT DISTINCT `Folders`.`name`,`number`,`term`,`cvv` FROM `ItemCard` JOIN `Folders` ON $set;";
      break;
  }
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

function InfoUser($conn, $set){
  $sql = "SELECT `Info`.`fname`, `Info`.`lname`, `Info`.`phone`, `Users`.`email` 
          FROM `Info` JOIN `Users` ON `Info`.`ID_User` = `Users`.`ID` AND $set;";
  if ($result = $conn->query($sql)) {
    $options = [];
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
      array_push($options, $row);
    }
    echo json_encode($options);
  } else
    echo "Query Failed";
}

function UpdateInfo($conn,$set,$table1){
  $sql = "UPDATE `$table1` SET $set;";
  var_dump($sql);
  if ($conn->query($sql))
    echo "Update Successful";
  else
    echo "Update Failed";
}

function DeleteUser($conn,$set){
  $sql= "DELETE FROM `Users` WHERE $set";
  if($conn->query($sql)){
    echo "Delete Successful";
    return true;
  }else{
    echo "Delete Failed";
    return false;
  }
    
}

function ValusInFolder($conn,$set){
  $sql = "SELECT `ID` FROM `Folders` WHERE $set;";
  $sql2 = "SELECT * FROM ItemLogin WHERE ItemLogin.ID_Folder in (3,4,5)";
}

?>