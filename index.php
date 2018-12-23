<?php 
include('./php/session.php');
?>
<!DOCTYPE html>
<html lang="es-ES">

<head>
    <title>CRUD Cursos</title>
    <meta charset="utf-8" />

    <link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css">
    </link->
    <link rel="stylesheet" type="text/css" href="./css/fontawesome.min.css">
    </link->
    <script type="text/javascript" src="./js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="./js/fontawesome.js"></script>
    <script type="text/javascript" src="./js/popper.min.js"></script>
    <script type="text/javascript" src="./js/bootstrap.min.js"></script>
    <script type="text/javascript" src="./js/common.js"></script>
</head>

<body>
<div id='ajax_loader' style="position: fixed; left: 50%; top: 50%; display: none;">
    <img src="./resources/images/ajas-loader.gif" />
</div>

    <!-- Nav tabs -->
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <button class="nav-link active" data-toggle="tab" href="#cursos_page" id="cursos_page_link" >Cursos</button>
        </li>
        <li class="nav-item">
            <button class="nav-link" data-toggle="tab" href="#estudiantes_page" id="estudaintes_page_link" >Estudiantes</button>
        </li>
        <li class="nav-item">
            <button class="nav-link" data-toggle="tab" href="#docentes_page" id="docentes_page_link" >Docentes</button>
        </li>
        <li class="nav-item">
            <button id="cerrar_sesion" class="nav-link">Cerrar Sesion</button>
        </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
        <div class="tab-pane container active" id="cursos_page"><?php include("./pages/cursos.php"); ?></div>
        <div class="tab-pane container fade" id="estudiantes_page"><?php include("./pages/estudiantes.php"); ?></div>
        <div class="tab-pane container fade" id="docentes_page"><?php include("./pages/docentes.php"); ?></div>
    </div>
</body>

</html>
