const User = require('../models/user');

// ------------------- Funções Exportadas ------------------- //
const create = async function (request, response, next) {
    try {
        if (!request.body.name || !request.body.phone || !request.body.email || !request.body.password) {
            return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
        }

        if (request.body.password.length < 5) {
            return response.status(400).send({ 'message': 'A senha deve conter no mínimo 5 caracteres.' });
        }

        await new User(request.body).save();

        return response.status(201).send({ 'message': 'Usuário criado.' });
    } catch (error) {
        next(error);
    }
};

const list = async function (request, response, next) {
    try {
        if (!request.query.limit || !request.query.page) {
            return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
        }

        let pagination = {
            'skip': parseInt(request.query.page) * parseInt(request.query.limit),
            'max': parseInt(request.query.limit)
        };

        let filter = request.query;

        delete filter.page;
        delete filter.limit;

        let promisseStack = [
            User.find(filter, { 'password': 0 })
                .skip(pagination.skip)
                .limit(pagination.max)
                .sort({ 'name': 1 })
                .exec(),

            User.find(filter).countDocuments().exec()
        ];

        let resolvedPromisses = await Promise.all(promisseStack);

        return response.status(200).send({ 'list': resolvedPromisses[0], 'count': resolvedPromisses[1] });
    } catch (error) {
        next(error);
    }
};

const detail = async function (request, response, next) {
    try {
        if (!request.params._id || request.params._id === 'undefined') {
            return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
        }

        let foundObject = await User.findById(request.params._id, { 'password': 0 });

        if (!foundObject) {
            return response.status(404).send({ 'message': 'Usuário não encontrado.' });
        }

        return response.status(200).send({ 'data': foundObject });
    } catch (error) {
        next(error);
    }
};

const remove = async function (request, response, next) {
    try {
        if (!request.params._id || request.params._id === 'undefined') {
            return response.status(400).send({ 'message': 'Dados obrigatórios não informados.' });
        }

        await User.deleteOne({ '_id': request.params._id }).exec();

        return response.status(200).send({ 'message': 'Usuário removido.' });
    } catch (error) {
        next(error);
    }
};

const update = async function (request, response, next) {
    try {
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

        let updated = await User.findOneAndUpdate({ '_id': request.params._id }, request.body, { 'new': true }).exec();

        if (!updated) {
            return response.status(404).send({ 'message': 'Usuário não encontrado.' });
        }

        return response.status(200).send({ 'message': 'Usuário atualizado.' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    'detail': detail,
    'list': list,
    'remove': remove,
    'create': create,
    'update': update
}
