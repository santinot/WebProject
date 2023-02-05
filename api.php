<?php
require_once('php/db_connection.php');
require_once('php/functions.php');
parse_str(file_get_contents('php://input'), $_PUT);
parse_str(file_get_contents('php://input'), $_DELETE);
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

    if ($table1 === 'FolderItems'){
      $value = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
      $table2 = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
      $set = '';
      $set = '`' . $table2 . '`.`ID_Folder` = `Folders`.`ID` AND `Folders`.`ID`= ' . $value;
      ShowItems($conn, $set, $table2);
    }
    break;

  case 'PUT':
    if($table1 === 'Info' || $table1 === 'Users'){
      var_dump($_PUT);
      $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($_PUT));
      $values = array_map(function ($value) use ($conn) {
        if ($value===null) return null;
          return mysqli_real_escape_string($conn,(string)$value);
      },array_values($_PUT));
      $set = '';
      for ($i=0;$i<count($columns);$i++) {
        $set .= ($i === 1 ? '"' : '`'). $values[$i] . ($i === 1 ? '"' : '`=') ;
      }
      $set .= ' WHERE `' .($table1 === 'Info' ? 'ID_User' : 'ID' ). '` = ' . $_SESSION['ID_User'];
      UpdateInfo($conn,$set,$table1);
    }  
    break;
  
    case 'POST':
    if($_POST['action'] === 'Registration'){
        $info = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
        $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($_POST));
        $values = array_map(function ($value) use ($conn) {
          if ($value===null) return null;
            return mysqli_real_escape_string($conn,(string)$value);
        },array_values($_POST));
        $setUser = '';
        $setInfo = '';
        for ($i=1;$i< 4;$i++) {
          $setInfo.=($i>1?',':'').'`'.$columns[$i].'`=';
          $setInfo.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
        }
        for ($i=4;$i<count($columns);$i++) {
          $setUser.=($i>4?',':'').'`'.$columns[$i].'`=';
          $setUser.=($values[$i]===null?'NULL':'"'.($i==5?(password_hash($values[$i],PASSWORD_DEFAULT).'"'):$values[$i].'"'));
        }
        InsertData($conn,$table1,$info,$setUser,$setInfo);
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
    if ($table1 === 'Users') {
      $set = '';
      $set = '`ID`=' . $_SESSION['ID_User'];
      if (DeleteUser($conn, $set) === true)
        session_destroy();
    }

    if ($table1 === 'Folders'){
      $id = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
      $set = '';
      $set = '`ID`=' . $id;
      DeleteFolder($conn, $set);
    }

    if ($table1 === 'ItemLogin' || $table1 === 'ItemCard' || $table1 === 'ItemNote'){
      $id = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
      $set = '';
      $set = '`ID`=' . $id;
      DeleteItem($conn, $set, $table1);
    }
    break;
}


CloseConnection();
  
?>