// ----------------- Import de dependências ----------------- //
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const express = require('express');

const swaggerYaml = require('yamljs').load('./swagger.yaml');

// Inicialização e configuração do app
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));

//Definição do Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerYaml));

//Definição de rotas
app.post('/users', function (request, response, next) {
    return response.status(201).send({ 'message': 'Usuário criado.' });
});

app.get('/users', function (request, response, next) {
    return response.status(200).send({ 'message': 'Usuários listados.' });
});

app.get('/users/:id', function (request, response, next) {
    return response.status(200).send({ 'message': 'Usuário detalhado.' });
});

app.delete('/users/:id', function (request, response, next) {
    return response.status(200).send({ 'message': 'Usuário removido.' });
});

app.patch('/users/:id', function (request, response, next) {
    return response.status(200).send({ 'message': 'Usuário atualizado.' });
});

// Not Found Middleware
app.use((request, response, next) => {
    return response.status(404).send({ 'message': 'Rota não encontrada.' });
});

//Inicialização do APP
app.listen(3000, () => {
    console.log('Servidor inicializado na porta 3000.');
});

module.exports = app;