
let username = document.getElementById('username');
if (username == '' || username == null) {
    username = 'Visitante';
}

var welcome = document.getElementById('Welcome');
welcome.innerHTML = 'Olá, ' + username + '!';
