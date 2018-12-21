$(document).ready(function () {
    var locationstring = window.location.href.toString();
    if (!(locationstring.endsWith("/")) && !(locationstring.endsWith("/index.html")))
        $(location).attr('href', '/login.html ');

    DAO.isLogged(localStorage);
    var localStorageKeyName = 'curso_data';

    loadDocentes();
    document.querySelector("#reload_docentes").addEventListener('click', function () {
        loadDocentes();
    });
    loadFromLocalStorage();
    document.querySelector("#btn-buscar-cursos").addEventListener('click', function () {
        var curso_id = document.getElementById("curso_id"),
            curso_codigo = document.getElementById("curso_codigo"),
            curso_nombre = document.getElementById("curso_nombre"),
            curso_observaciones = document.getElementById("curso_observaciones"),
            curso_docente = document.getElementById("curso_docente");
        if (curso_id.value.length === 0) {
            alert("Digite id");
            return;
        }
        var obj = DAO.getObject(function (it) {
            return (it.curso_id == curso_id.value);
        }, "No hay cursos registrados", localStorage, localStorageKeyName);
        if (!obj) {
            // Clean data
            curso_codigo.value = '';
            curso_nombre.value = '';
            curso_observaciones.value = '';
            curso_docente.value = '';
            alert("Curso no encontrado");
        } else {
            curso_codigo.value = obj.curso_codigo;
            curso_nombre.value = obj.curso_nombre;
            curso_observaciones.value = obj.curso_observaciones;
            curso_observaciones.value = obj.curso_observaciones;
            curso_docente.value = obj.curso_docente;
        }

    })
    document.querySelector("#btn-add-cursos").addEventListener('click', function () {
        var curso_id = document.getElementById("curso_id"),
            curso_codigo = document.getElementById("curso_codigo"),
            curso_nombre = document.getElementById("curso_nombre"),
            curso_observaciones = document.getElementById("curso_observaciones"),
            curso_docente = document.getElementById("curso_docente");

        // Validate
        if (curso_id.value.length === 0 || curso_codigo.value.length === 0 || curso_nombre.value.length ===
            0 || curso_observaciones.value.length === 0) return;

        var curso = {
            curso_id: curso_id.value,
            curso_codigo: curso_codigo.value,
            curso_nombre: curso_nombre.value,
            curso_observaciones: curso_observaciones.value,
            curso_docente: curso_docente.value,
            curso_estudiantes: []
        };

        // Clean data
        curso_id.value = '';
        curso_codigo.value = '';
        curso_nombre.value = '';
        curso_observaciones.value = '';
        curso_docente.value = '';

        // Append to my localStorage
        DAO.addObjectToLocalStorage(localStorage, localStorageKeyName, curso, 'curso_id');
        loadFromLocalStorage();
    })



    function loadFromLocalStorage() {
        var cursos = DAO.getAll(localStorage, localStorageKeyName);

        // Draw TR from TBODY
        var gridBody = $('#grid_cursos tbody');
        gridBody.empty();

        cursos.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdcurso_id = document.createElement("td"),
                tdcurso_codigo = document.createElement("td"),
                tdcurso_nombre = document.createElement("td"),
                tdcurso_docente = document.createElement("td"),
                tdcurso_observaciones = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");
            tdEstudiantes = document.createElement("td"),
                btnEstudiantes = document.createElement("button");

            tdcurso_id.innerHTML = x.curso_id;
            tdcurso_codigo.innerHTML = x.curso_codigo;
            tdcurso_nombre.innerHTML = x.curso_nombre;
            tdcurso_observaciones.innerHTML = x.curso_observaciones;
            var docente = DAO.getObject(function (it) {
                return (it.docente_id == x.curso_docente);
            }, "No hay docentes registrados", localStorage, 'docente_data');
            tdcurso_docente.innerHTML = docente.docente_nombres + ' ' + docente.docente_apellidos;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click', function () {
                DAO.removeFromLocalStorage(i, localStorage, localStorageKeyName);
                loadFromLocalStorage();
            });
            btnEstudiantes.textContent = "Ver Estudiantes";
            btnEstudiantes.className = 'btn btn-xs btn-primary';
            btnEstudiantes.addEventListener('click', function () {
                $("#estudiantesModal").modal('show');
                loadEstudiantes();
                $('#btn-add-curso-estudiante').off("click").click(function () {
                    var estudiante = document.getElementById("curso_estudiante");
                    var obj = DAO.getObject(function (it) {
                        return (it.estudiante_id == estudiante.value);
                    }, "No hay estudiantes registrados", localStorage, 'estudiante_data');
                    var find = x.curso_estudiantes.find(function (it) {
                        return (it.estudiante_id == estudiante.value);
                      })
                    console.log(x);
                    console.log(x.curso_estudiantes);
                    console.log(obj);
                    console.log(estudiante.value);
                    if (find) {
                        alert("Estudiante ya esta asignado a este curso");
                    } else {
                        x.curso_estudiantes.push(obj);
                        DAO.addObjectToLocalStorage(localStorage, localStorageKeyName, x, 'curso_id');
                        loadEstudiantesCurso(x);
                    }
                });
                loadEstudiantesCurso(x);
            });
            tdRemove.appendChild(btnRemove);
            tdEstudiantes.appendChild(btnEstudiantes);

            tr.appendChild(tdcurso_id);
            tr.appendChild(tdcurso_codigo);
            tr.appendChild(tdcurso_nombre);
            tr.appendChild(tdcurso_observaciones);
            tr.appendChild(tdcurso_docente);
            tr.appendChild(tdRemove);
            tr.appendChild(tdEstudiantes);

            gridBody.append(tr);
        });
    }

    function loadEstudiantesCurso(curso_id) {
        var gridBody = $('#grid_estudiantes_curso tbody');
        gridBody.empty();

        curso_id.curso_estudiantes.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdestudiante_id = document.createElement("td"),
                tdestudiante_nombres = document.createElement("td"),
                tdestudiante_apellidos = document.createElement("td"),
                tdestudiante_genero = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");
            console.log(x.estudiante_id);
            tdestudiante_id.innerHTML = x.estudiante_id;
            tdestudiante_nombres.innerHTML = x.estudiante_nombres;
            tdestudiante_apellidos.innerHTML = x.estudiante_apellidos;
            tdestudiante_genero.innerHTML = x.estudiante_genero;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click', function () {
                curso_id.curso_estudiantes.splice(i, 1);
                DAO.addObjectToLocalStorage(localStorage, localStorageKeyName, curso_id, 'curso_id');
                loadEstudiantesCurso(curso_id)
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

    function loadEstudiantes() {
        var estudiante = document.querySelector("#curso_estudiante");
        estudiante.innerHTML = "";
        var estudiantes = DAO.getAll(localStorage, 'estudiante_data');
        if (estudiantes) {
            estudiantes.forEach(function (x, i) {
                var option = document.createElement("option");
                option.value = x.estudiante_id;
                option.text = x.estudiante_id + " - " + x.estudiante_nombres + ' ' + x.estudiante_apellidos;
                estudiante.add(option);
            });
        }
    }

    function loadDocentes() {
        var docente = document.querySelector("#curso_docente");
        docente.innerHTML = "";
        var docentes = DAO.getAll(localStorage, 'docente_data');
        if (docentes) {
            docentes.forEach(function (x, i) {
                var option = document.createElement("option");
                option.value = x.docente_id;
                option.text = x.docente_nombres + ' ' + x.docente_apellidos;
                docente.add(option);
            });
        }
    }
});