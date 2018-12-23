<?php 
include('./php/session.php');
include('./php/mysql.php');
global $db;
include('./php/docente.php');

?>
<!DOCTYPE html>
<html lang="es-ES">

<head>
    <title>CRUD Docentes</title>
    <meta charset="utf-8" />
    <script type="text/javascript" src="../js/docentes.js"></script>

</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <h1 class="jumbotron">CRUD Docentes</h1>
                <?php $results_docentes = mysqli_query($db, "SELECT * FROM docente"); ?>
                <table id="grid_docentes" class="table table-striped">
                    <thead>
                        <tr>
                            <th>Identificiación</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Género</th>
                            <th style="width:80px;">

                            </th>
                        </tr>
                        <tr>
                            <form method="post" action="php/docente.php" >
                                <th>
                                <input id="docente_id" name="docente_id" type="text" class="form-control" value="<?php echo $docente_id; ?>" />
                            </th>
                            <th>
                                <input name="docente_nombres" type="text" class="form-control" value="<?php echo $docente_nombres; ?>" />
                            </th>
                            <th>
                                <input name="docente_apellidos" type="text" class="form-control" value="<?php echo $docente_apellidos; ?>"/>
                            </th>
                            <th>
                                <select name="docente_genero" name="Genero" class="form-control" value="<?php echo $docente_genero; ?>">
                                    <option value="Masculino" <?=$docente_genero == 'Masculino' ? ' selected="selected"' : '';?>>M</option>
                                    <option value="Femenino" <?=$docente_genero == 'Femenino' ? ' selected="selected"' : '';?>>F</option>
                                </select>
                            </th>
                            <th>		
                                <button id="btn-add-docente" type="submit" name="savedoc" class="btn btn-default">Guardar</button>
                            </th>
                            </form>
                            <th>
                            <button id="btn-search-docente" class="btn btn-default">Buscar</button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                       <?php while ($row = mysqli_fetch_assoc($results_docentes)) { ?>
                            <tr>
                                <td><?php echo $row['identificacion']; ?></td>
                                <td><?php echo $row['nombres']; ?></td>
                                <td><?php echo $row['apellidos']; ?></td>
                                <td><?php echo $row['genero']; ?></td>
                                <td>
                                <form method="post" action="php/docente.php" >
                                    <input name="doc_id" type="text" class="form-control" value="<?php echo $row['id']; ?>" hidden="true" />
                                    <button type="submit" name="deldoc" class="btn btn-danger" >Eliminar</button>
                                </form>
                                </td>
                            </tr>
                        <?php 
                    } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>

</html>