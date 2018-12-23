<?php 
include('./php/session.php');
include('./php/mysql.php');
global $db;
include('./php/curso.php');

if (isset($_GET['getestudiantes'])) {
    $id = intval($_GET['getestudiantes']);
    $record = mysqli_query($db, "SELECT * FROM curso inner join estudiante_curso on curso.id = estudiante_curso.id_curso inner join estudiante on estudiante.id = estudiante_curso.id_estudiante where curso.codigo=$id");
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

?>
<!DOCTYPE html>
<html lang="es-ES">

<head>
    <title>CRUD Cursos</title>
    <meta charset="utf-8" />
    <script type="text/javascript" src="./js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="./js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../js/cursos.js"></script>

</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <h1 class="jumbotron">CRUD Cursos</h1>
                <?php $results_cursos = mysqli_query($db, "SELECT * FROM curso inner join docente_curso on curso.id = docente_curso.id_curso inner join docente on docente.id = docente_curso.id_docente"); ?>
                <?php $results_docentes = mysqli_query($db, "SELECT * FROM docente"); ?>

                <table id="grid_cursos" class="table table-striped">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Observaciones</th>
                            <th>Docente</th>
                            <th style="width:80px;">

                            </th>
                        </tr>
                        <tr>
                        <form method="post" action="php/curso.php" >
                             <th>
                                <input id="curso_codigo" name="curso_codigo" type="text" class="form-control"  value="<?php echo $curso_codigo; ?>"/>
                            </th>
                            <th>
                                <input id="curso_nombre" name="curso_nombre" type="text" class="form-control" value="<?php echo $curso_nombre; ?>"/>
                            </th>
                            <th>
                                <input id="curso_observaciones" name="curso_observaciones" type="text" class="form-control" value="<?php echo $curso_observaciones; ?>"/>
                            </th>
                            <th style="display:flex;">
                                <select id="curso_docente" name="curso_docente" class="form-control">
                                <?php while ($row = mysqli_fetch_assoc($results_docentes)) { ?>
                                    <option <?= $curso_docente == $row['id'] ? ' selected="selected"' : ''; ?>  value="<?php echo $row['id']; ?>" ><?php echo $row['identificacion'] . " - " . $row['nombres'] . " " . $row['apellidos']; ?></option>                    
                                <?php 
                            } ?>
                                </select>
                                <a  href="/index.php" class="btn btn-success"><i class="fas fa-lg fa-sync-alt"></i></button>
                            </th>
                            <th>
                                <button id="btn-add-curso" type="submit" name="savecurso" class="btn btn-default">Guardar</button>
                            </th>
                            </form>
                             <th>
                                <button id="btn-search-curso" class="btn btn-default">Buscar</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>   <?php while ($row = mysqli_fetch_assoc($results_cursos)) { ?>
                            <tr>
                                <td id="td-curso-codigo"><?php echo $row['codigo']; ?></td>
                                <td><?php echo $row['nombre']; ?></td>
                                <td><?php echo $row['observaciones']; ?></td>
                                <td><?php echo $row['identificacion'] . " - " . $row['nombres'] . " " . $row['apellidos']; ?></td>
                                <td>
                                <form method="post" action="php/curso.php" >
                                    <input name="curso_codigo" type="text" class="form-control" value="<?php echo $row['id_curso']; ?>" hidden="true" />
                                    <button type="submit" name="delcurso" class="btn btn-danger" >Eliminar</button>
                                </form>
                                </td>
                                <td>
                                    <button value="<?php echo $row['id_curso']; ?>" class="btn btn-xs btn-primary btn-ver-estudiantes-curso">Ver Estudiantes</button>
                                </td>
                            </tr>
                    <?php 
                } ?></tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="estudiantesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog  modal-lg"  style="width:600px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Estudiantes del curso</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table id="grid_estudiantes_curso" class="table table-striped">
                            <thead>

                                <tr>
                                    <th>
                                    </th>
                                    <th>
                                    </th>
                                    <th>Estudiante
                                    </th>
                                    <th>
                                        <select id="curso_estudiante" name="curso_estudiante" class="form-control">
                                        </select>
                                    </th>
                                    <th>
                                        <button id="btn-add-curso-estudiante" class="btn btn-default">Agregar</button>
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Identificiación</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Género</th>
                                    <th style="width:80px;">

                                    </th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    </div>


</body>

</html>