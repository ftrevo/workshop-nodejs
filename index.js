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

//Definição do middleware de erros
app.use(function (error, request, response, next) {
    console.log(error);

    return response.status(500).send({ 'message': 'Erro interno do servidos.' });
});

//Definição de rotas
app.post('/users', function (request, response, next) {
    if (!request.body.name || !request.body.phone || !request.body.email || !request.body.password) {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    if (request.body.password.length < 5) {
        return response.status(400).send({ 'message': 'A senha deve conter no mínimo 5 caracteres.' });
    }

    return response.status(201).send({ 'message': 'Usuário criado.' });
});

app.get('/users', function (request, response, next) {
    if (!request.query.limit || !request.query.page) {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    return response.status(200).send({ 'message': 'Usuários listados.' });
});

app.get('/users/:_id', function (request, response, next) {
    if (!request.params._id && request.params.id !== 'undefined') {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    return response.status(200).send({ 'message': 'Usuário detalhado.' });
});

app.delete('/users/:_id', function (request, response, next) {
    if (!request.params._id && request.params.id !== 'undefined') {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    return response.status(200).send({ 'message': 'Usuário removido.' });
});

app.patch('/users/:_id', function (request, response, next) {
    if (
        (!request.params._id && request.params.id !== 'undefined') ||
        (
            !request.body.name && !request.body.phone && !request.body.email && !request.body.password
        )
    ) {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    if (request.body.password && request.body.password.length < 5) {
        return response.status(400).send({ 'message': 'A senha deve conter no mínimo 5 caracteres.' });
    }

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