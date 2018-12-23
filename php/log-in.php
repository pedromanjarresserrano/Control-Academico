<?php 
session_start();
include('mysql.php');

	// variable declaration
$username = "";
$email = "";
$errors = array();
$_SESSION['success'] = "";
global $db;

if (isset($_POST['login'])) {
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);

    if (empty($username)) {
        array_push($errors, "Username is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }
    echo "<script type='text/javascript'> console.log($username); console.log($password); console.log(SELECT * FROM usuario WHERE username = '$username' AND password = '$password'); </script>";

    $record = mysqli_query($db, "SELECT * FROM usuario WHERE username = '$username' AND password = '$password' ");
    $n = mysqli_fetch_assoc($record);
    $aux_username = $n['username'];
    if (isset($aux_username) && $aux_username != '') {
        $_SESSION['username'] = $username;
        $_SESSION['success'] = "You are now logged in";
        header('location: ../index.php');
    } else {
        array_push($errors, "Wrong username/password combination");
        header('location: ../login.php');
    }

}

?>