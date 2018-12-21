$(document).ready(function () {
    var locationstring = window.location.href.toString();
    if (!(locationstring.endsWith("/")) && !(locationstring.endsWith("/index.html")))
        $(location).attr('href', '/login.html ');
    DAO.isLogged(localStorage);
    var localStorageKeyName = 'docente_data';

    loadFromLocalStorage();
    document.querySelector("#btn-buscar-docente").addEventListener('click', function () {
        var docente_id = document.getElementById("docente_id"),
            docente_nombres = document.getElementById("docente_nombres"),
            docente_apellidos = document.getElementById("docente_apellidos"),
            docente_genero = document.getElementById("docente_genero");
        if (docente_id.value.length === 0) {
            alert("Digite identificacion");
            return;
        }
        var obj = DAO.getObject(function (it) {
            return (it.docente_id == docente_id.value);
        }, "No hay docentes registrados", localStorage, localStorageKeyName);
        if (!obj) {
            docente_nombres.value = '';
            docente_apellidos.value = '';
            docente_genero.value = '';
            alert("Docente no encontrado");
        } else {
            docente_nombres.value = obj.docente_nombres;
            docente_apellidos.value = obj.docente_apellidos;
            docente_genero.value = obj.docente_genero;
        }

    })
    document.querySelector("#btn-add-docente").addEventListener('click', function () {
        var docente_id = document.getElementById("docente_id"),
            docente_nombres = document.getElementById("docente_nombres"),
            docente_apellidos = document.getElementById("docente_apellidos"),
            docente_genero = document.getElementById("docente_genero");

        if (docente_id.value.length === 0 || docente_nombres.value.length === 0 || docente_apellidos.value.length ===
            0 || docente_genero.value.length === 0) return;

        var docente = {
            docente_id: docente_id.value,
            docente_nombres: docente_nombres.value,
            docente_apellidos: docente_apellidos.value,
            docente_genero: docente_genero.value
        };

        docente_id.value = '';
        docente_nombres.value = '';
        docente_apellidos.value = '';
        docente_genero.value = '';

        DAO.addObjectToLocalStorage(localStorage, localStorageKeyName, docente, "docente_id");
        loadFromLocalStorage();
    })



    function loadFromLocalStorage() {
        var docentes = DAO.getAll(localStorage, localStorageKeyName);
        var gridBody = $('#grid_docentes tbody');
        gridBody.empty();

        docentes.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tddocente_id = document.createElement("td"),
                tddocente_nombres = document.createElement("td"),
                tddocente_apellidos = document.createElement("td"),
                tddocente_genero = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");

            tddocente_id.innerHTML = x.docente_id;
            tddocente_nombres.innerHTML = x.docente_nombres;
            tddocente_apellidos.innerHTML = x.docente_apellidos;
            tddocente_genero.innerHTML = x.docente_genero;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click', function () {
                DAO.removeFromLocalStorage(i, localStorage, localStorageKeyName);
                loadFromLocalStorage();
            });

            tdRemove.appendChild(btnRemove);

            tr.appendChild(tddocente_id);
            tr.appendChild(tddocente_nombres);
            tr.appendChild(tddocente_apellidos);
            tr.appendChild(tddocente_genero);
            tr.appendChild(tdRemove);

            gridBody.append(tr);
        });
    }

});