$(document).ready(function () {
    $('#btn-search-docente').on('click', function () {
        var locationstring = window.location.href.toString();
        var docente_id = document.getElementById("docente_id");
        if (docente_id.value.length === 0) {
            alert("Digite identificacion");
            return;
        }
        $(location).attr('href', locationstring.split("?")[0] + '?getdoc=' + docente_id.value);

    });
});