// ------------------- Funções Exportadas ------------------- //
module.exports = (error, request, response, next) => {
    console.log(error);

    return response.status(500).send({ 'message': 'Erro interno do servidos.' });
};