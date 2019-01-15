// ----------------- Import de dependências ----------------- //
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const express = require('express');
const swaggerYaml = require('yamljs').load('./swagger.yaml');

// --------------- Import de arquivos do core --------------- //
const routes = require('./routes');
const errorMiddleware = require('./helpers/error-middleware');
const notFoundMiddleware = require('./helpers/not-found-middleware');

// Inicialização e configuração do app
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));

//Definição do Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerYaml));

//Definição do middleware de erros
app.use(errorMiddleware);

//Definição de rotas
routes(app);

// Not Found Middleware
app.use(notFoundMiddleware);

//Inicialização do APP
app.listen(3000, () => {
    console.log('Servidor inicializado na porta 3000.');
});

module.exports = app;