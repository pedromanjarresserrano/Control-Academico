  var Util = {
    insertParam: function (key, value) {
      key = encodeURI(key);
      value = encodeURI(value);

      var kvp = document.location.search.substr(1).split('&');

      var i = kvp.length;
      var x;
      while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
          x[1] = value;
          kvp[i] = x.join('=');
          break;
        }
      }

      if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
      }

      //this will reload the page, it's likely better to store this until finished
      document.location.search = kvp.join('&');
    }
  };
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


    },
    logOut: function (localStorage) {

    }
  };

  $(document).ready(function () {
    $('#cursos_page_link').on('click', function () {
      localStorage.setItem('current_page', 'cursos_page');
    });

    $('#estudaintes_page_link').on('click', function () {
      localStorage.setItem('current_page', 'estudiante_page');
    });
    $('#docentes_page').on('click', function () {
      localStorage.setItem('current_page', 'docente_page');
    });
    var current_page = localStorage.getItem('current_page');
    if (current_page !== null && current_page.trim().lentgth !== 0 && current_page !== "") {
      switch (current_page) {
        case 'cursos_page':
          {
            $('#cursos_page_link').click();
            break;
          }
        case 'estudiante_page':
          {
            $('#estudaintes_page_link').click();
            break;
          }
        case 'docente_page':
          {
            $('#docentes_page_link').click();
            break;
          }
      }
    }
    $('#cerrar_sesion').on('click', function () {
      var locationstring = window.location.href.toString();
      $(location).attr('href', locationstring.split("?")[0] + '?logout');
    });
  });