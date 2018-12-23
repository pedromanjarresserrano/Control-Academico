$(document).ready(function () {
    $('#btn-search-curso').on('click', function () {
        var locationstring = window.location.href.toString();
        var curso_id = document.getElementById("curso_codigo");
        if (curso_id.value.length === 0) {
            alert("Digite codigo");
            return;
        }
        console.log(locationstring);
        $(location).attr('href', locationstring.split("?")[0] + '?getcurso=' + curso_id.value);

    });

    $('.btn-ver-estudiantes-curso').each(function () {
        var curso_codigo = $(this).val();
        $(this).on('click', function () {
            $("#ajax_loader").show();
            $('#btn-add-curso-estudiante').off("click").click(function () {
                $("#ajax_loader").show();
                var estudiante = document.getElementById("curso_estudiante");
                console.log(estudiante);
                $.ajax({
                    type: 'GET',
                    url: '../php/estudiante.php?addestu',
                    datatype: "html",
                    data: {
                        'id_ee': estudiante.value,
                        'id_cc': curso_codigo
                    },
                    success: function (datainner) {
                        $("#ajax_loader").hide();
                        if (datainner.trim().length > 0) alert(datainner);
                        load(curso_codigo);
                    },
                    error: function (a, b, c) {
                        console.log('something went wrong:', a, b, c);
                    }
                });
            });
            load(curso_codigo);

        });
    });

    function loadEstudiantes() {
        var estudiante = document.querySelector("#curso_estudiante");
        $.ajax({
            type: 'GET',
            url: '../php/estudiante.php?getallestu',
            datatype: "html",

            success: function (data) {
                estudiante.innerHTML = "";
                data = JSON.parse(data);
                if (data) {
                    data.forEach(function (x, i) {
                        var option = document.createElement("option");
                        option.value = x.id;
                        option.text = x.identificacion + " - " + x.nombres + ' ' + x.apellidos;
                        estudiante.add(option);
                    });
                }
            },
            error: function (a, b, c) {
                console.log('something went wrong:', a, b, c);
            }
        });
    }

    function load(curso_codigo) {
        loadEstudiantes();
        $.ajax({
            type: 'GET',
            url: '../php/get-estudiantes.php',
            datatype: "html",
            data: {
                'id': curso_codigo
            },
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                $("#estudiantesModal").modal('show');
                loadEstudiante(data, curso_codigo);
                $("#ajax_loader").hide();

            },
            error: function (a, b, c) {
                console.log('something went wrong:', a, b, c);
            }
        });
    }

    function loadEstudiante(data, curso_codigo) {
        var gridBody = $('#grid_estudiantes_curso tbody');
        gridBody.empty();
        data.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdestudiante_id = document.createElement("td"),
                tdestudiante_nombres = document.createElement("td"),
                tdestudiante_apellidos = document.createElement("td"),
                tdestudiante_genero = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");

            tdestudiante_id.innerHTML = x.identificacion;
            tdestudiante_nombres.innerHTML = x.nombres;
            tdestudiante_apellidos.innerHTML = x.apellidos;
            tdestudiante_genero.innerHTML = x.genero;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click', function () {
                $.ajax({
                    type: 'GET',
                    url: '../php/remove-estudiante.php',
                    datatype: "html",
                    data: {
                        'id_e': x.id_estudiante,
                        'id_c': curso_codigo
                    },
                    success: function (datainner) {
                        load(curso_codigo);
                    }
                });
            });
            tdRemove.appendChild(btnRemove);

            tr.appendChild(tdestudiante_id);
            tr.appendChild(tdestudiante_nombres);
            tr.appendChild(tdestudiante_apellidos);
            tr.appendChild(tdestudiante_genero);
            tr.appendChild(tdRemove);

            gridBody.append(tr);
        });
    }
});