// Importe as bibliotecas necessárias
const express = require('express');
const axios = require('axios');
const tf = require('@tensorflow/tfjs');
const canvas = require('canvas');
const MongoClient = require('mongodb').MongoClient;

// Defina o modelo de aprendizado de máquina
const model = tf.sequential();
model.add(tf.layers.dense({ units: 2, inputShape: [2] }));
model.add(tf.layers.dense({ units: 2 }));
model.compile({ optimizer: tf.optimizers.adam(), loss: 'meanSquaredError' });

// Conecte-se ao banco de dados
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Conectado ao banco de dados');

    // Selecione a coleção de dados
    const db = client.db();
    const collection = db.collection('your_collection_name');

    // Busque os dados
    collection.find().toArray((err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Treine o modelo com os dados
        const trainingData = data.map(item => ({
            input: [item.latitude, item.longitude],
            output: [item.predictedLatitude, item.predictedLongitude]
        }));

        model.fit(tf.data.array(trainingData.map(data => data.input)), tf.data.array(trainingData.map(data => data.output)), { epochs: 100 });

        // Crie um servidor para enviar os dados
        const app = express();
        app.use(express.json()); // Adicione essa linha
        app.post('/send-data', (req, res) => {
            const data = req.body;
            console.log(`Dados recebidos: ${JSON.stringify(data)}`);
            res.send('Dados enviados com sucesso!');
        });
        const port = 3000;
        app.listen(port, () => {
            console.log(`Servidor iniciado na porta ${port}`);
        });

        // Obtenha a localização
        const position = {
            coords: {
                latitude: 37.7749,
                longitude: -122.4194
            }
        };

        // Utilize o modelo de aprendizado de máquina para prever a localização
        const prediction = model.predict(tf.tensor2d([position.coords.latitude, position.coords.longitude]));
        const predictedLocation = prediction.dataSync();
        console.log(`Localização prevista: (${predictedLocation[0]}, ${predictedLocation[1]})`);

        // Carregue a imagem
        const image = new canvas.Image();
        image.src = 'caminho/para/imagem.jpg'; // substitua com o caminho para sua imagem

        // Espere a imagem carregar
        image.onload = () => {
            // Crie o canvas
            const canvas = createCanvas(300, 200);
            const ctx = canvas.getContext('2d');

            // Desenhe a imagem no canvas
            ctx.drawImage(image, 0, 0, 300, 200);

            // Desenhe a matriz de 3 linhas e 5 colunas
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 5; j++) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(j * 50, i * 50, 50, 50);
                }
            }

            // Coloque o ESP32 na imagem com base na sua localização
            ctx.fillStyle = 'red';
            ctx.fillRect(position.coords.latitude * 50, position.coords.longitude * 50, 10, 10);

            // Imprima a imagem
            console.log(canvas.toBuffer());

            // Enviar os dados para o servidor
            const dataToSend = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                predictedLocation: predictedLocation
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