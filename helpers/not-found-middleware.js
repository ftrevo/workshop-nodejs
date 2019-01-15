// ------------------- Funções Exportadas ------------------- //
module.exports = (request, response, next) => {
    return response.status(404).send({ 'message': 'Rota não encontrada.' });
};
