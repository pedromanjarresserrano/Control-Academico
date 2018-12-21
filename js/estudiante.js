$(document).ready(function () {
    var locationstring = window.location.href.toString();
    if (!(locationstring.endsWith("/")) && !(locationstring.endsWith("/index.html")))
        $(location).attr('href', '/login.html ');
    DAO.isLogged(localStorage);
    var localStorageKeyName = 'estudiante_data';

    loadFromLocalStorage();
    document.querySelector("#btn-buscar-estudiante").addEventListener('click', function () {
        var estudiante_id = document.getElementById("estudiante_id"),
            estudiante_nombres = document.getElementById("estudiante_nombres"),
            estudiante_apellidos = document.getElementById("estudiante_apellidos"),
            estudiante_genero = document.getElementById("estudiante_genero");
        if (estudiante_id.value.length === 0) {
            alert("Digite identificacion");
            return;
        }
        var obj = DAO.getObject(function (it) {
            return (it.estudiante_id == estudiante_id.value);
        }, "No hay estudiantes registrados", localStorage, localStorageKeyName);
        if (!obj) {
            estudiante_nombres.value = '';
            estudiante_apellidos.value = '';
            estudiante_genero.value = '';
            alert("Estudiante no encontrado");
        } else {
            estudiante_nombres.value = obj.estudiante_nombres;
            estudiante_apellidos.value = obj.estudiante_apellidos;
            estudiante_genero.value = obj.estudiante_genero;
        }

    })
    document.querySelector("#btn-add-estudiante").addEventListener('click', function () {
        var estudiante_id = document.getElementById("estudiante_id"),
            estudiante_nombres = document.getElementById("estudiante_nombres"),
            estudiante_apellidos = document.getElementById("estudiante_apellidos"),
            estudiante_genero = document.getElementById("estudiante_genero");

        if (estudiante_id.value.length === 0 || estudiante_nombres.value.length === 0 || estudiante_apellidos.value.length ===
            0 || estudiante_genero.value.length === 0) return;

        var estudiante = {
            estudiante_id: estudiante_id.value,
            estudiante_nombres: estudiante_nombres.value,
            estudiante_apellidos: estudiante_apellidos.value,
            estudiante_genero: estudiante_genero.value
        };

        estudiante_id.value = '';
        estudiante_nombres.value = '';
        estudiante_apellidos.value = '';
        estudiante_genero.value = '';

        DAO.addObjectToLocalStorage(localStorage, localStorageKeyName, estudiante, "estudiante_id");
        loadFromLocalStorage();
    })



    function loadFromLocalStorage() {
        var estudiantes = DAO.getAll(localStorage, localStorageKeyName);
        var gridBody = $('#grid_estudiantes tbody');
        gridBody.empty();

        estudiantes.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdestudiante_id = document.createElement("td"),
                tdestudiante_nombres = document.createElement("td"),
                tdestudiante_apellidos = document.createElement("td"),
                tdestudiante_genero = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");

            tdestudiante_id.innerHTML = x.estudiante_id;
            tdestudiante_nombres.innerHTML = x.estudiante_nombres;
            tdestudiante_apellidos.innerHTML = x.estudiante_apellidos;
            tdestudiante_genero.innerHTML = x.estudiante_genero;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click', function () {
                DAO.removeFromLocalStorage(i, localStorage, localStorageKeyName);
                loadFromLocalStorage();
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