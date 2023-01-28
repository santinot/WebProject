<?php
require_once('php/db_connection.php');
require_once('php/functions.php');
session_start();

$conn = OpenConnection();

$method = $_SERVER['REQUEST_METHOD'];

$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$table1 = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
switch ($method) {
  case 'GET':
    if($table1 === 'Folders'){
      $set = '';
      $set = '`ID_User`=' . $_SESSION['ID_User'];
      ShowFolder($conn,$set);
    }

    if($table1 === 'Logout'){
      unset($_SESSION['ID_User']);
      session_destroy();
    }

    if($table1 === 'ItemLogin' || $table1 === 'ItemNote' || $table1 === 'ItemCard'){
      $set = '';
      $set = '`'.$table1.'`.`ID_Folder` = `Folders`.`ID` AND `Folders`.`ID_User`=' . $_SESSION['ID_User'];
      ShowItems($conn,$set, $table1);
    }

    if($table1 === 'Users'){
      $set = '';
      $set = '`Users`.`ID`=' . $_SESSION['ID_User'];
      InfoUser($conn,$set);
    }
    
    break;
  case 'PUT':
    break;
  case 'POST':
    if($_POST['action'] === 'Registration'){
        $table2 = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
        $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($_POST));
        $values = array_map(function ($value) use ($conn) {
          if ($value===null) return null;
            return mysqli_real_escape_string($conn,(string)$value);
        },array_values($_POST));
        $set1 = '';
        $set2 = '';
        for ($i=1;$i< 4;$i++) {
          $set1.=($i>1?',':'').'`'.$columns[$i].'`=';
          $set1.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
        }
        for ($i=4;$i<count($columns);$i++) {
          $set2.=($i>4?',':'').'`'.$columns[$i].'`=';
          $set2.=($values[$i]===null?'NULL':'"'.($i==5?(password_hash($values[$i],PASSWORD_DEFAULT).'"'):$values[$i].'"'));
        }
        InsertData($conn,$table1,$table2,$set1,$set2);
    }

    if ($_POST['action'] === 'Login') {
      $columns = preg_replace('/[^a-z0-9_]+/i', '', array_keys($_POST));
      $values = array_map(function ($value) use ($conn) {
        if ($value === null)
          return null;
        return mysqli_real_escape_string($conn, (string) $value);
      }, array_values($_POST));
      $set = '';
      $set = '`'. $columns[1] . '`=' . '"' . $values[1] . '"';
      $pwd = $values[2];
      CheckData($conn, $table1, $set, $pwd);
    }

    if ($_POST['action'] === 'AddItem') {
      $columns = preg_replace('/[^a-z0-9_]+/i', '', array_keys($_POST));
      $values = array_map(function ($value) use ($conn) {
        if ($value === null)
          return null;
        return mysqli_real_escape_string($conn, (string) $value);
      }, array_values($_POST));
      $set = '';
      for ($i = 1; $i < count($columns); $i++) {
        $set .= ($i > 1 ? ',' : '') . '`' . $columns[$i] . '`=';
        $set .= ($values[$i] === null ? 'NULL' : '"');
        if ($i == 2 && isset($_POST['password']))
          $set .= openssl_encrypt($values[2],"aes-128-cbc",$_POST['username']) .'"';
          else
          $set .= $values[$i].'"';
      }
    CreateItem($conn, $table1, $set);
    }
  break;

  case 'DELETE':
    break;
}


CloseConnection();
  
?>