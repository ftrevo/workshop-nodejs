// ----------------- Import de dependências ----------------- //
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const express = require('express');
const swaggerYaml = require('yamljs').load('./swagger.yaml');

// --------------- Import de arquivos do core --------------- //
const routes = require('./routes');
const errorMiddleware = require('./helpers/error-middleware');
const notFoundMiddleware = require('./helpers/not-found-middleware');

// Conexão com o banco de dados
require('./helpers/datasource');

// Inicialização e configuração do app
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));

//Definição do Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerYaml));

//Definição de rotas
routes(app);

//Definição do middleware de erros
app.use(errorMiddleware);

// Not Found Middleware
app.use(notFoundMiddleware);

//Inicialização do APP
app.listen(process.env.PORT, () => {
    console.log(`Servidor inicializado na porta ${process.env.PORT}.`);
});

module.exports = app;