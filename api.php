<?php
require_once('php/db_connection.php');
$conn = OpenConnection();

var_dump($_POST['action']);

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$table1 = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$table2 = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));

  var_dump($method);
  var_dump($table1);
  var_dump($table2);

if($method == 'POST' && $_POST['action'] === 'Registration'){
    $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($_POST));
    $values = array_map(function ($value) use ($conn) {
      if ($value===null) return null;
      return mysqli_real_escape_string($conn,(string)$value);
    },array_values($_POST));
    $set = '';
    for ($i=1;$i<count($columns);$i++) {
      $set.=($i>1?',':'').'`'.$columns[$i].'`=';
      $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
    }
  }

  var_dump($set);
 


CloseConnection();
  
?>