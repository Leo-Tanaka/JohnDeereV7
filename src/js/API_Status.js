// Importar módulos necessários
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conectar ao banco de dados
mongoose.connect('mongodb://localhost/carrinho', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir modelo do carrinho
const Carrinho = mongoose.model('Carrinho', {
    itens: [{ type: String, required: true }]
});

// Criar rota para verificar status do carrinho
app.get('/carrinho/status', async (req, res) => {
    try {
        // Buscar carrinho no banco de dados
        const carrinho = await Carrinho.findOne();

        // Verificar se o carrinho está cheio ou vazio
        if (carrinho.itens.length > 0) {
            res.json({ status: 'cheio' });
        } else {
            res.json({ status: 'vazio' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
});

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});