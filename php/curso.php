<?php 
session_start();
include('mysql.php');
	// initialize variables
$curso_id = "";
$curso_codigo = "";
$curso_nombre = "";
$curso_observaciones = "";
$curso_docente = "";
$id = 0;
$update = false;
global $db;

if (isset($_POST['savecurso'])) {
	$curso_codigo = $_POST['curso_codigo'];
	$curso_nombre = $_POST['curso_nombre'];
	$curso_observaciones = $_POST['curso_observaciones'];
	$curso_docente = $_POST['curso_docente'];
	$record = mysqli_query($db, "SELECT * FROM curso WHERE codigo=$curso_codigo");
	$n = mysqli_fetch_assoc($record);
	$aux_id = $n['codigo'];
	if (isset($aux_id) && $aux_id != '') {
		mysqli_query($db, "UPDATE curso SET nombre='$curso_nombre', observaciones='$curso_observaciones' WHERE codigo='$curso_codigo' ");
	} else {
		mysqli_query($db, "INSERT INTO curso VALUES (0,'$curso_codigo', '$curso_nombre','$curso_observaciones')");
	}
	$_SESSION['message'] = "curso guardado";
	$record = mysqli_query($db, "SELECT * FROM curso WHERE codigo=$curso_codigo");
	$n = mysqli_fetch_assoc($record);
	$aux_id = $n['id'];
	$record = mysqli_query($db, "SELECT * FROM docente_curso WHERE id_curso=$aux_id");
	$n = mysqli_fetch_assoc($record);
	$id_curso = $n['id_curso'];
	if (isset($id_curso) && $id_curso != '') {

		mysqli_query($db, "UPDATE docente_curso SET id_docente ='$curso_docente' WHERE id_curso=$aux_id ");
	} else {

		mysqli_query($db, "INSERT INTO docente_curso  VALUES ($curso_docente , $aux_id)");
	}
	header('location:../index.php');
}


if (isset($_POST['updatcurso'])) {
	$curso_codigo = $_POST['curso_codigo'];
	$curso_nombre = $_POST['curso_nombres'];
	$curso_observaciones = $_POST['curso_observaciones'];
	mysqli_query($db, "UPDATE curso SET nombre='$curso_nombre', observaciones='$curso_observaciones' WHERE identificacion='$curso_id' ");
	$_SESSION['message'] = "curso actualizado!";
	header('location:../index.php');
}

if (isset($_POST['delcurso'])) {
	$id_curso = intval($_POST['curso_codigo']);
	mysqli_query($db, "DELETE FROM estudiante_curso WHERE id_curso=$id_curso ");
	mysqli_query($db, "DELETE FROM docente_curso WHERE id_curso=$id_curso ");
	mysqli_query($db, "DELETE FROM curso WHERE id=$id_curso");
	$_SESSION['message'] = "curso " . $id . " eliminado!";
	header('location:../index.php');

}

if (isset($_GET['getcurso'])) {
	$id = intval($_GET['getcurso']);
	$record = mysqli_query($db, "SELECT * FROM curso inner join docente_curso on curso.id = docente_curso.id_curso inner join docente on docente.id = docente_curso.id_docente where curso.codigo=$id");
	if (count($record) == 1) {
		$n = mysqli_fetch_assoc($record);
		$curso_codigo = $n['codigo'];
		$curso_nombre = $n['nombre'];
		$curso_observaciones = $n['observaciones'];
		$curso_docente = $n['id_docente'];
	} else {
		echo "<script type='text/javascript'>
                alert('Curso no encontrado');
            </script>";
	}
}

$results_cursos = mysqli_query($db, "SELECT * FROM curso inner join docente_curso on curso.id = docente_curso.id_curso inner join docente on docente.id = docente_curso.id_docente");
?>


