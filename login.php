<?php include('php/log-in.php'); ?>

<!DOCTYPE html>
<html lang="es-ES">

<head>
    <title>CRUD Cursos</title>
    <meta charset="utf-8" />

    <link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css">
    </link->
    <link rel="stylesheet" type="text/css" href="./css/login.css">
</link->
</head>
<body>
    <form class="login-form"  method="post" action="php/log-in.php">
        <div>
            <h2 class="text-center">Log in</h2>
            <div class="form-group">
                <input type="text" name="username" class="form-control" id="username" placeholder="Usuario" required="required">
            </div>
            <div class="form-group">
                <input type="password" name="password" class="form-control" id="password" placeholder="Contraseña" required="required">
            </div>
            <div class="form-group">
                <button type="submit" name="login" id="iniciar_sesion" class="btn btn-primary btn-block">Iniciar sesion</button>
            </div>
        </div>		
    </form>

</body>
</html>