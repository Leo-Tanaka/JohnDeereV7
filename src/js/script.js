
let username = document.getElementById('username');
if (username == '' || username == null) {
    username = 'Visitante';
}

var welcome = document.getElementById('Welcome');
welcome.innerHTML = 'Olá, ' + username + '!';

document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const payload = JSON.stringify({
      nome: nome,
      email: email,
      senha: senha
    });

    // Conectar ao HiveMQTT Broker (via WebSockets)
    const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt'); // Usando WebSocket

    client.on('connect', function() {
      console.log('Conectado ao HiveMQTT');

      // Publicar os dados no tópico de cadastro
      client.publish('cadastro/usuarios', payload, function() {
        alert('Cadastro enviado com sucesso!');
      });
    });
  });