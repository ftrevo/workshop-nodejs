// ------------------- Funções Exportadas ------------------- //
const create = function (request, response, next) {
    if (!request.body.name || !request.body.phone || !request.body.email || !request.body.password) {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    if (request.body.password.length < 5) {
        return response.status(400).send({ 'message': 'A senha deve conter no mínimo 5 caracteres.' });
    }

    return response.status(201).send({ 'message': 'Usuário criado.' });
};

const list = function (request, response, next) {
    if (!request.query.limit || !request.query.page) {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    return response.status(200).send({ 'message': 'Usuários listados.' });
};

const detail = function (request, response, next) {
    if (!request.params._id || request.params._id === 'undefined') {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    return response.status(200).send({ 'message': 'Usuário detalhado.' });
};

const remove = function (request, response, next) {
    if (!request.params._id || request.params._id === 'undefined') {
        return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
    }

    return response.status(200).send({ 'message': 'Usuário removido.' });
};

const update = function (request, response, next) {
    if (
        (!request.params._id || request.params._id === 'undefined') ||
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
};

module.exports = {
    'detail': detail,
    'list': list,
    'remove': remove,
    'create': create,
    'update': update
}
