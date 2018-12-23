<?php
include("mysql.php");
global $db;
$id_estudiante = intval($_GET['id_e']);
$id_curso = intval($_GET['id_c']);
mysqli_query($db, "DELETE FROM estudiante_curso WHERE id_curso=$id_curso AND  id_estudiante=$id_estudiante ");
?>