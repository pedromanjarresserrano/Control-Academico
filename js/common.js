  var DAO = {
    getObject: function (find, mensaje, localStorage, localStorageKeyName) {
      var list = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName)

      if (dataInLocalStorage !== null) {
        list = JSON.parse(dataInLocalStorage)
      } else {
        alert(mensaje)
      }
      return list.find(find)
    },

    addObjectToLocalStorage: function (localStorage, localStorageKeyName, obj, field_id) {
      var list = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName)

      if (dataInLocalStorage !== null && dataInLocalStorage.trim().lentgth !== 0 && dataInLocalStorage !== "") {
        list = JSON.parse(dataInLocalStorage)
      }
      var find = list.find(function (it) {
        return (it[field_id] == obj[field_id])
      })
      if (find) {
        var index = list.indexOf(find)
        list.splice(index, 1, obj)
      } else {
        list.push(obj)
      }

      localStorage.setItem(localStorageKeyName, JSON.stringify(list))
    },
    getAll: function (localStorage, localStorageKeyName) {
      var list = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);

      if (dataInLocalStorage !== null && dataInLocalStorage.trim().lentgth !== 0 && dataInLocalStorage !== "") {
        list = JSON.parse(dataInLocalStorage);
      }
      return list;
    },
    removeFromLocalStorage: function (index, localStorage, localStorageKeyName) {
      var users = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName)

      users = JSON.parse(dataInLocalStorage)

      users.splice(index, 1)

      localStorage.setItem(localStorageKeyName, JSON.stringify(users))
    },
    isLogged: function (localStorage) {
      var list = [],
        list = this.getAll(localStorage, "user_data"),
        bools = list.lentgth == 0;
      if (!list || bools) {
        $(location).attr('href', '/login.html ');
      }

    },
    logOut: function (localStorage) {
      localStorage.setItem("user_data", "");
      $(location).attr('href', '/login.html ');
    }
  }
  $(document).ready(function () {
    $('#cursos_page').load('./pages/cursos.html')
    $('#estudiantes_page').load('./pages/estudiantes.html')
    $('#docentes_page').load('./pages/docentes.html')
    $('#cerrar_sesion').on('click', function () {
      DAO.logOut(localStorage);
    });
  });