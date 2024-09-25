const express = require('express');
const axios = require('axios');
const { createCanvas, Image } = require('canvas');
const MongoClient = require('mongodb').MongoClient;

// Conecte-se ao banco de dados
MongoClient.connect('mongodb+srv://leonardotanaka0513:KunZuvo6B6qq3hFe@esp32db.cf2vc.mongodb.net/?retryWrites=true&w=majority&appName=esp32db', (err, client) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Conectado ao banco de dados');

    const db = client.db();
    const collection = db.collection('test.espdatas');

    const app = express();
    app.use(express.json());
    app.use(express.static('src/assets'));

    // Endpoint para buscar as coordenadas do banco de dados
    app.get('/coordenadas', (req, res) => {
        collection.find({}, { projection: { latitude: 1, longitude: 1, _id: 0 } }).toArray((err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erro ao buscar dados do banco de dados');
                return;
            }
            res.json(data);
        });
    });

    // Iniciar o servidor na porta 3000
    const port = 3000;
    app.listen(port, () => {
        console.log(`Servidor iniciado na porta ${port}`);
    });

    // Busque os dados
    collection.find().toArray((err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const trainingData = data.map(item => ({
            input: [item.latitude, item.longitude],
            output: [item.predictedLatitude, item.predictedLongitude]
        }));

        // Exemplo de criação de um canvas e carregamento de imagem
        const position = {
            coords: {
                latitude: 3,
                longitude: 2
            }
        };

        var image = L.imageOverlay('src/assets/JD_V2.png', bounds).addTo(map);
        image.src = 'src/assets/JD_V2.png'; // Substitua com o caminho correto

        image.onload = () => {
            const canvas = createCanvas(300, 200);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, 300, 200);

            // Exemplo de plotagem no canvas
            ctx.fillStyle = 'red';
            ctx.fillRect(position.coords.latitude * 50, position.coords.longitude * 50, 10, 10);

            const dataToSend = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                predictedLocation: trainingData[0].output // Exemplo de uso de `predictedLocation`
            };

            axios.post('http://localhost:3000/send-data', dataToSend)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
    });
});
