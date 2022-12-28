<?php
require_once('php/db_connection.php');
require_once('php/functions.php');
$conn = OpenConnection();


$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST'){
  $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
  $table1 = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
  
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
        $set2.=($values[$i]===null?'NULL':'"'.($i==5?(password_hash($values[$i], PASSWORD_DEFAULT).'"'):$values[$i].'"'));
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
}


CloseConnection();
  
?>