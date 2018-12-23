<?php 
session_start();
include('mysql.php');
	// initialize variables
$docente_id = "";
$docente_nombres = "";
$docente_apellidos = "";
$docente_genero = "";
$id = 0;
$update = false;
global $db;

if (isset($_POST['savedoc'])) {
	$docente_id = $_POST['docente_id'];
	$docente_nombres = $_POST['docente_nombres'];
	$docente_apellidos = $_POST['docente_apellidos'];
	$docente_genero = $_POST['docente_genero'];

	$record = mysqli_query($db, "SELECT * FROM docente WHERE identificacion=$docente_id");
	$n = mysqli_fetch_assoc($record);
	$aux_id = $n['identificacion'];
	if (isset($aux_id) && $aux_id != '') {
		mysqli_query($db, "UPDATE docente SET nombres='$docente_nombres', apellidos='$docente_apellidos', genero='$docente_genero' WHERE identificacion='$docente_id' ");
	} else {
		mysqli_query($db, "INSERT INTO docente VALUES (0,'$docente_id', '$docente_nombres', '$docente_apellidos', '$docente_genero')");
	}
	$_SESSION['message'] = "Docente guardado";
	header('location:../index.php');
}


if (isset($_POST['updatedoc'])) {
	$doc_id = $_POST['doc_id'];
	$docente_id = $_POST['docente_id'];
	$docente_nombres = $_POST['docente_nombres'];
	$docente_apellidos = $_POST['docente_apellidos'];
	$docente_genero = $_POST['docente_genero'];
	mysqli_query($db, "UPDATE docente SET identificacion='$docente_id', nombres='$docente_nombres', apellidos='$docente_apellidos', genero='$docente_genero' WHERE id=$doc_id");
	$_SESSION['message'] = "Docente actualizado!";
	header('location:../index.php');
}

if (isset($_POST['deldoc'])) {
	$id = intval($_POST['doc_id']);
	mysqli_query($db, "DELETE FROM docente_curso WHERE id_docente=$id ");
	mysqli_query($db, "DELETE FROM docente WHERE id=$id");
	$_SESSION['message'] = "Docente " . $id . " eliminado!";
	header('location:../index.php');

}
if (isset($_GET['getdoc'])) {
    $id = $_GET['getdoc'];
    $record = mysqli_query($db, "SELECT * FROM docente WHERE identificacion = '$id' ");
    if (count($record) == 1) {
        $n = mysqli_fetch_assoc($record);
        $docente_id = $n['identificacion'];
        $docente_nombres = $n['nombres'];
        $docente_apellidos = $n['apellidos'];
        $docente_genero = $n['genero'];
    } else {
        echo "<script type='text/javascript'>
                alert('Docente no encontrado');
            </script>";
    }
}

?>


