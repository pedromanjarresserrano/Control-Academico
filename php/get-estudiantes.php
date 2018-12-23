<?php
include("mysql.php");
global $db;
$id = intval($_GET['id']);
$result = mysqli_query($db, "SELECT * FROM curso inner join estudiante_curso on curso.id = estudiante_curso.id_curso inner join estudiante on estudiante.id = estudiante_curso.id_estudiante where curso.id=$id");
$json = array();
while ($row = mysqli_fetch_assoc($result)) {
    $json[] = $row;
}
echo json_encode($json); ?>