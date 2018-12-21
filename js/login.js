$(document).ready(function () {
  $('#iniciar_sesion').on('click', function () {
    var user = $('#user').val()
    var pass = $('#pass').val()
    if (!user || user.trim().lenth === 0 || !pass || pass.trim().lenth === 0) {
      alert('Digite usuario y contraseña')
      return
    }
    if (user !== 'admin' && pass !== 'admin') {
      alert('Usuario o Contraseña errada.')
      return
    } else {
      var userpass = {
        user: user,
        pass: pass
      };
      DAO.addObjectToLocalStorage(localStorage, 'user_data', user, 'user');
      $(location).attr('href', '/index.html ');
    }
  })
})