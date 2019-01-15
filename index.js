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

// Not Found Middleware
app.use((request, response, next) => {
    return response.status(404).send({ 'message': 'Rota não encontrada.' });
});

//Inicialização do APP
app.listen(3000, () => {
    console.log('Servidor inicializado na porta 3000.');
});

module.exports = app;