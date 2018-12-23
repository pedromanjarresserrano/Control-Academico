<?php 
session_start();
include('mysql.php');
	// initialize variables
$estudiante_id = "";
$estudiante_nombres = "";
$estudiante_apellidos = "";
$estudiante_genero = "";
$id = 0;
global $db;

if (isset($_POST['saveestu'])) {
	$estudiante_id = $_POST['estudiante_id'];
	$estudiante_nombres = $_POST['estudiante_nombres'];
	$estudiante_apellidos = $_POST['estudiante_apellidos'];
	$estudiante_genero = $_POST['estudiante_genero'];

	$record = mysqli_query($db, "SELECT * FROM estudiante WHERE identificacion=$estudiante_id");
	$n = mysqli_fetch_assoc($record);
	$aux_id = $n['identificacion'];
	if (isset($aux_estudiante_id) && $aux_estudiante_id != '') {
		mysqli_query($db, "UPDATE estudiante SET nombres='$estudiante_nombres', apellidos='$estudiante_apellidos', genero='$estudiante_genero' WHERE identificacion='$estudiante_id' ");
	} else {
		mysqli_query($db, "INSERT INTO estudiante VALUES (0,'$estudiante_id', '$estudiante_nombres', '$estudiante_apellidos', '$estudiante_genero')");
	}
	$_SESSION['message'] = "estudiante guardado";
	header('location:../index.php');
}


if (isset($_POST['updateestu'])) {
	$estu_id = $_POST['estu_id'];
	$estudiante_id = $_POST['estudiante_id'];
	$estudiante_nombres = $_POST['estudiante_nombres'];
	$estudiante_apellidos = $_POST['estudiante_apellidos'];
	$estudiante_genero = $_POST['estudiante_genero'];
	mysqli_query($db, "UPDATE estudiante SET identificacion='$estudiante_id', nombres='$estudiante_nombres', apellidos='$estudiante_apellidos', genero='$estudiante_genero' WHERE id=$estu_id");
	$_SESSION['message'] = "estudiante actualizado!";
	header('location:../index.php');
}

if (isset($_POST['delestu'])) {
	$id = intval($_POST['estu_id']);
	mysqli_query($db, "DELETE FROM estudiante WHERE id=$id");
	$_SESSION['message'] = "estudiante " . $id . " eliminado!";
	header('location:../index.php');

}
if (isset($_GET['getestu'])) {
	$id = intval($_GET['getestu']);
	$record = mysqli_query($db, "SELECT * FROM estudiante WHERE identificacion=$id");
	if (count($record) == 1) {
		$n = mysqli_fetch_assoc($record);
		$estudiante_id = $n['identificacion'];
		$estudiante_nombres = $n['nombres'];
		$estudiante_apellidos = $n['apellidos'];
		$estudiante_genero = $n['genero'];
	} else {
		echo "<script type='text/javascript'>
                alert('estudiante no encontrado');
            </script>";
	}
}
if (isset($_GET['addestu'])) {
	$id_estudiante = intval($_GET['id_ee']);
	$id_curso = intval($_GET['id_cc']);
	$record = mysqli_query($db, "SELECT * FROM estudiante_curso WHERE id_estudiante = $id_estudiante and id_curso = $id_curso ");
	$n = mysqli_fetch_assoc($record);
	$aux_id = $n['id_estudiante'];
	if (isset($aux_id) && $aux_id != '') {
		echo "Estudiante ya esta agregado a este curso";
	} else {
		mysqli_query($db, "INSERT INTO estudiante_curso VALUES ($id_estudiante,$id_curso) ");
	}

}

if (isset($_GET['getallestu'])) {
	$result = mysqli_query($db, "SELECT * FROM estudiante");
	$json = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$json[] = $row;
	}
	echo json_encode($json);
}

$results_estudiantes = mysqli_query($db, "SELECT * FROM estudiante");
?>


