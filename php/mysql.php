
<?php
$servername = "localhost";
$username = "root";
$password = "123";

// Create connection
$db = mysqli_connect($servername, $username, $password, 'prueba');

// Check connection
if (mysqli_connect_error()) {
    die("Database connection failed: " . mysqli_connect_error());
}

?>