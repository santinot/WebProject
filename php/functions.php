<?php

session_start();
function InsertData($conn,$table1,$table2,$set1,$set2){
  $sql = "INSERT INTO `$table1` SET $set2;";
  $sql.= "INSERT INTO `$table2` SET $set1, `ID_User` = LAST_INSERT_ID();";
  $sql.= "INSERT INTO `Folder` SET `ID_User` = LAST_INSERT_ID(), `name` = 'Default';";
  
  if($conn->multi_query($sql)){
    return "Registration successful";
  }
  else{
    return "Registration failed";
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

function CreateItem($conn,$table1,$set, $id){
  $sql = "INSERT INTO `$table1` SET $set, `ID_Folder` = $id;"; //non funziona id
  echo $sql;
  /*
  if($conn->query($sql))
      return "Item created";
  else
    return "Item creation failed";*/
}




?>