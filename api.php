<?php
require_once('php/db_connection.php');
$conn = OpenConnection();
$method = $_SERVER['REQUEST_METHOD'];

$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);
/*
if(isset($_POST)){
    $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($_POST));
    $values = array_map(function ($value) use ($conn) {
    if ($value===null) return null;
    return mysqli_real_escape_string($conn,(string)$value);
  },array_values($_POST));
  }

if(isset($_POST)){
    $set = '';
    for ($i=0;$i<count($columns);$i++) {
      $set.=($i>0?',':'').'`'.$columns[$i].'`=';
      $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
    }
  }
  */
  $set = '';
switch ($method) {
    case 'GET':
        $sql = "select * from `$table`".($key?" WHERE email=\"$key\"":''); break;
    case 'PUT':
        $sql = "update `$table` set $set where email=\"$key\""; break;
    case 'POST':
        $sql = "insert into `$table` set $set"; break;
    case 'DELETE':
        $sql = "delete from `$table` where email=\"$key\""; break;
    }
$result = mysqli_query($conn,$sql);

if (!$result) {
    http_response_code(404);
    die(mysqli_error($conn));
  }

if ($method == 'GET') {
if (!$key) echo '[';
for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
}
if (!$key) echo ']';
} elseif ($method == 'POST') {
//echo "INSERT ID: " . mysqli_insert_id($link);
echo "INSERT OK";
} else {
echo "AFFECTED ROWS: " . mysqli_affected_rows($conn);
}

CloseConnection();
  
?>