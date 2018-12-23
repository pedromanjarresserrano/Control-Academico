$(document).ready(function () {
    $('#btn-search-estudiante').on('click', function () {
        var locationstring = window.location.href.toString();
        var estudiante_id = document.getElementById("estudiante_id");
        if (estudiante_id.value.length === 0) {
            alert("Digite identificacion");
            return;
        }
        console.log(locationstring);

        $(location).attr('href', locationstring.split("?")[0] + '?getestu=' + estudiante_id.value);

    });
});