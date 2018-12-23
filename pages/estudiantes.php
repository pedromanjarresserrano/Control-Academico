<?php 
include('./php/session.php');
include('./php/mysql.php');
global $db;
include('./php/estudiante.php');

?>
<!DOCTYPE html>
<html lang="es-ES">

<head>
    <title>CRUD estudiantes</title>
    <meta charset="utf-8" />
    <script type="text/javascript" src="../js/estudiantes.js"></script>

</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <h1 class="jumbotron">CRUD estudiantes</h1>
                <?php $results_estudiantes = mysqli_query($db, "SELECT * FROM estudiante"); ?>
                <table id="grid_estudiantes" class="table table-striped">
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
                            <form method="post" action="php/estudiante.php" >
                                <th>
                                <input id="estudiante_id" name="estudiante_id" type="text" class="form-control" value="<?php echo $estudiante_id; ?>" />
                            </th>
                            <th>
                                <input name="estudiante_nombres" type="text" class="form-control" value="<?php echo $estudiante_nombres; ?>" />
                            </th>
                            <th>
                                <input name="estudiante_apellidos" type="text" class="form-control" value="<?php echo $estudiante_apellidos; ?>"/>
                            </th>
                            <th>
                                <select name="estudiante_genero" name="Genero" class="form-control" value="<?php echo $estudiante_genero; ?>">
                                    <option value="Masculino" <?=$estudiante_genero == 'Masculino' ? ' selected="selected"' : '';?>>M</option>
                                    <option value="Femenino" <?=$estudiante_genero == 'Femenino' ? ' selected="selected"' : '';?>>F</option>
                                </select>
                            </th>
                            <th>		
                                <button id="btn-add-estudiante" type="submit" name="saveestu" class="btn btn-default">Guardar</button>
                            </th>
                            </form>
                            <th>
                            <button id="btn-search-estudiante" class="btn btn-default">Buscar</button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                       <?php while ($row = mysqli_fetch_assoc($results_estudiantes)) { ?>
                            <tr>
                                <td><?php echo $row['identificacion']; ?></td>
                                <td><?php echo $row['nombres']; ?></td>
                                <td><?php echo $row['apellidos']; ?></td>
                                <td><?php echo $row['genero']; ?></td>
                                <td>
                                <form method="post" action="php/estudiante.php" >
                                    <input name="estu_id" type="text" class="form-control" value="<?php echo $row['id']; ?>" hidden="true" />
                                    <button type="submit" name="delestu" class="btn btn-danger" >Eliminar</button>
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